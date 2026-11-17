import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type RegistryFile = {
  name: string;
  content: string;
  path: string;
};

export type RegistryItem = {
  name: string;
  type: "registry:ui";
  title: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
};

export type Registry = {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
};

function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function extractDependencies(content: string): { external: string[]; internal: string[] } {
  const external = new Set<string>();
  const internal = new Set<string>();

  const importRegex = /import\s+(?:[\w*\s{},]*\s+from\s+)?['"]([^'"]+)['"]/g;
  let match: RegExpExecArray | null;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];

    if (importPath.startsWith(".")) {
      const boxMatch = importPath.match(/Layout\/Box/);
      if (boxMatch) {
        internal.add("box");
        continue;
      }
      const compMatch = importPath.match(/\.\.\/([A-Za-z0-9_-]+)/);
      if (compMatch && compMatch[1] && compMatch[1] !== "utils" && compMatch[1] !== "types" && compMatch[1] !== "providers") {
        internal.add(toKebabCase(compMatch[1]));
      }
    } else {
      if (importPath === "react" || importPath === "react-dom" || importPath === "react/jsx-runtime") {
        continue;
      }
      if (importPath.startsWith("@/")) {
        continue;
      }
      const pkgName = importPath.startsWith("@")
        ? importPath.split("/").slice(0, 2).join("/")
        : importPath.split("/")[0];
      external.add(pkgName);
    }
  }

  return {
    external: Array.from(external),
    internal: Array.from(internal),
  };
}

function main() {
  const rootDir = path.resolve(__dirname, "..");
  const componentsDir = path.join(rootDir, "src/components");
  const registryDir = path.join(rootDir, "registry");
  const binDir = path.join(rootDir, "bin");

  if (!fs.existsSync(registryDir)) fs.mkdirSync(registryDir, { recursive: true });
  if (!fs.existsSync(binDir)) fs.mkdirSync(binDir, { recursive: true });

  const entries = fs.readdirSync(componentsDir, { withFileTypes: true });
  const items: RegistryItem[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const compDir = path.join(componentsDir, entry.name);
    const files = fs.readdirSync(compDir).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));

    if (files.length === 0) continue;

    const allExternal = new Set<string>();
    const allInternal = new Set<string>();
    const registryFiles: RegistryFile[] = [];

    for (const f of files) {
      const filePath = path.join(compDir, f);
      const content = fs.readFileSync(filePath, "utf8");
      const { external, internal } = extractDependencies(content);

      for (const e of external) allExternal.add(e);
      for (const i of internal) {
        if (i !== toKebabCase(entry.name)) allInternal.add(i);
      }

      const destFileName = f === `${entry.name}.tsx`
        ? `${toKebabCase(entry.name)}.tsx`
        : toKebabCase(f.replace(/\.(tsx|ts)$/, "")) + path.extname(f);

      registryFiles.push({
        name: destFileName,
        content,
        path: `ui/${destFileName}`,
      });
    }

    const item: RegistryItem = {
      name: toKebabCase(entry.name),
      type: "registry:ui",
      title: entry.name,
      dependencies: Array.from(allExternal).sort(),
      registryDependencies: Array.from(allInternal).sort(),
      files: registryFiles,
    };

    items.push(item);

    const singleItemPath = path.join(registryDir, `${item.name}.json`);
    fs.writeFileSync(singleItemPath, JSON.stringify(item, null, 2), "utf8");
  }

  items.sort((a, b) => a.name.localeCompare(b.name));

  const registry: Registry = {
    $schema: "https://patiya-ui.vercel.app/schema.json",
    name: "patiya",
    homepage: "https://patiya-ui.vercel.app",
    items,
  };

  const indexPath = path.join(registryDir, "index.json");
  const binRegistryPath = path.join(binDir, "registry.json");

  fs.writeFileSync(indexPath, JSON.stringify(registry, null, 2), "utf8");
  fs.writeFileSync(binRegistryPath, JSON.stringify(registry), "utf8");

  process.stdout.write(`Successfully built registry for ${items.length} components.\n`);
}

main();

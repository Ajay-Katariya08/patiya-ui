import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const resolvedParams = await params;
  let rawName = resolvedParams.name;
  if (rawName.endsWith(".json")) {
    rawName = rawName.slice(0, -5);
  }
  const cleanName = toKebabCase(rawName);

  const rootDir = path.resolve(process.cwd(), "..");
  const componentsDir = path.join(rootDir, "src/components");

  if (!fs.existsSync(componentsDir)) {
    return NextResponse.json({ error: "Components source not found" }, { status: 404 });
  }

  const entries = fs.readdirSync(componentsDir, { withFileTypes: true });

  if (cleanName === "index" || cleanName === "all") {
    const items = entries
      .filter((e) => e.isDirectory())
      .map((entry) => ({
        name: toKebabCase(entry.name),
        title: entry.name,
        type: "registry:ui",
      }));
    return NextResponse.json(
      {
        $schema: "https://patiya-ui.vercel.app/schema.json",
        name: "patiya",
        items,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  }

  const matched = entries.find(
    (e) => e.isDirectory() && toKebabCase(e.name) === cleanName
  );

  if (!matched) {
    return NextResponse.json({ error: `Component "${cleanName}" not found` }, { status: 404 });
  }

  const compDir = path.join(componentsDir, matched.name);
  const files = fs.readdirSync(compDir).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));

  const allExternal = new Set<string>();
  const allInternal = new Set<string>();
  const registryFiles = [];

  for (const f of files) {
    const filePath = path.join(compDir, f);
    const content = fs.readFileSync(filePath, "utf8");
    const { external, internal } = extractDependencies(content);

    for (const e of external) allExternal.add(e);
    for (const i of internal) {
      if (i !== cleanName) allInternal.add(i);
    }

    const destFileName = f === `${matched.name}.tsx`
      ? `${cleanName}.tsx`
      : toKebabCase(f.replace(/\.(tsx|ts)$/, "")) + path.extname(f);

    registryFiles.push({
      name: destFileName,
      content,
      path: `ui/${destFileName}`,
    });
  }

  const item = {
    name: cleanName,
    type: "registry:ui",
    title: matched.name,
    dependencies: Array.from(allExternal).sort(),
    registryDependencies: Array.from(allInternal).sort(),
    files: registryFiles,
  };

  return NextResponse.json(item, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

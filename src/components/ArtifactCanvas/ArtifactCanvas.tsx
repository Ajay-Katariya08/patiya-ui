import React, { forwardRef, useState } from "react";
import { cn } from "../../utils/cn";

export type ArtifactStatus = "idle" | "generating" | "ready" | "error";
export type ArtifactType = "code" | "react" | "html" | "svg" | "markdown";

export type ArtifactVersion = {
  version: number;
  label?: string;
  code: string;
};

export type ArtifactCanvasProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  type?: ArtifactType;
  language?: string;
  code: string;
  preview?: React.ReactNode;
  status?: ArtifactStatus;
  versions?: ArtifactVersion[];
  activeVersion?: number;
  onVersionChange?: (version: number) => void;
  onCopy?: () => void;
  onDownload?: () => void;
};

export const ArtifactCanvas = forwardRef<HTMLDivElement, ArtifactCanvasProps>(
  (
    {
      className,
      title,
      type = "code",
      language = "typescript",
      code,
      preview,
      status = "ready",
      versions,
      activeVersion,
      onVersionChange,
      onCopy,
      onDownload,
      ...props
    },
    ref
  ) => {
    const [tab, setTab] = useState<"preview" | "code">(
      preview ? "preview" : "code"
    );
    const [copied, setCopied] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
      if (onDownload) {
        onDownload();
        return;
      }
      const ext =
        type === "react"
          ? "tsx"
          : type === "html"
            ? "html"
            : type === "svg"
              ? "svg"
              : type === "markdown"
                ? "md"
                : "txt";
      const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] overflow-hidden transition-all duration-200 flex flex-col",
          isFullscreen
            ? "fixed inset-4 z-50 shadow-2xl h-[calc(100vh-2rem)]"
            : "relative max-w-3xl",
          status === "generating" && "ring-2 ring-[var(--patiya-color-primary)]/40 ring-offset-2 ring-offset-[var(--patiya-color-background)]",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/30 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] flex items-center justify-center shrink-0 border border-[var(--patiya-color-primary)]/20">
              {type === "react" || type === "html" ? (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              ) : type === "svg" ? (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="12 8 8 12 12 16 16 12 12 8" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[var(--patiya-color-foreground)] truncate">
                  {title}
                </span>
                {status === "generating" && (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-[var(--patiya-color-primary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--patiya-color-primary)] animate-pulse" />
                    Generating...
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                {language}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {versions && versions.length > 1 && (
              <div className="flex items-center gap-1 mr-2 px-1.5 py-0.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
                {versions.map((v) => (
                  <button
                    key={v.version}
                    onClick={() => onVersionChange?.(v.version)}
                    className={cn(
                      "text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors",
                      activeVersion === v.version
                        ? "bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] font-bold"
                        : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                    )}
                  >
                    v{v.version}
                  </button>
                ))}
              </div>
            )}

            {preview && (
              <div className="flex items-center p-0.5 rounded-lg bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)]">
                <button
                  type="button"
                  onClick={() => setTab("preview")}
                  className={cn(
                    "px-2.5 py-1 text-xs font-medium rounded-md transition-all",
                    tab === "preview"
                      ? "bg-[var(--patiya-color-background)] text-[var(--patiya-color-foreground)] shadow-xs"
                      : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                  )}
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => setTab("code")}
                  className={cn(
                    "px-2.5 py-1 text-xs font-medium rounded-md transition-all",
                    tab === "code"
                      ? "bg-[var(--patiya-color-background)] text-[var(--patiya-color-foreground)] shadow-xs"
                      : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                  )}
                >
                  Code
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)] transition-colors"
              title="Copy code"
            >
              {copied ? (
                <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="p-1.5 rounded-lg text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)] transition-colors"
              title="Download file"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)] transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="4 14 10 14 10 20" />
                  <polyline points="20 10 14 10 14 4" />
                  <line x1="14" y1="10" x2="21" y2="3" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto min-h-[220px]">
          {tab === "preview" && preview ? (
            <div className="p-6 h-full flex items-center justify-center bg-[var(--patiya-color-background)]">
              {preview}
            </div>
          ) : (
            <pre className="p-4 text-xs font-mono text-[var(--patiya-color-foreground)] leading-relaxed overflow-x-auto selection:bg-[var(--patiya-color-primary)]/20">
              <code>{code}</code>
            </pre>
          )}
        </div>
      </div>
    );
  }
);
ArtifactCanvas.displayName = "ArtifactCanvas";

export type ToolCallState = "pending" | "running" | "completed" | "failed";

export type ToolCallCardProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  args?: Record<string, unknown> | string;
  result?: Record<string, unknown> | string;
  state?: ToolCallState;
  duration?: string;
};

export const ToolCallCard = forwardRef<HTMLDivElement, ToolCallCardProps>(
  (
    {
      className,
      name,
      args,
      result,
      state = "completed",
      duration,
      ...props
    },
    ref
  ) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-xl rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/70 text-xs overflow-hidden transition-all",
          className
        )}
        {...props}
      >
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-[var(--patiya-color-muted)]/40 transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                state === "running" && "bg-amber-500 animate-ping",
                state === "completed" && "bg-emerald-500",
                state === "failed" && "bg-rose-500",
                state === "pending" && "bg-slate-400"
              )}
            />
            <span className="font-mono font-semibold text-[var(--patiya-color-foreground)]">
              {name}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]">
              tool
            </span>
          </div>

          <div className="flex items-center gap-2 text-[var(--patiya-color-muted-foreground)]">
            {duration && <span className="font-mono text-[10px]">{duration}</span>}
            <svg
              className={cn(
                "w-3.5 h-3.5 transition-transform duration-200",
                expanded ? "rotate-180" : "rotate-0"
              )}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>

        {expanded && (
          <div className="p-3 border-t border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] space-y-2 font-mono text-[11px]">
            {args && (
              <div>
                <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] uppercase tracking-wider font-sans">
                  Arguments
                </span>
                <pre className="mt-1 p-2 rounded-lg bg-[var(--patiya-color-muted)]/30 overflow-x-auto text-[var(--patiya-color-foreground)]">
                  {typeof args === "string" ? args : JSON.stringify(args, null, 2)}
                </pre>
              </div>
            )}
            {result && (
              <div>
                <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] uppercase tracking-wider font-sans">
                  Result
                </span>
                <pre className="mt-1 p-2 rounded-lg bg-[var(--patiya-color-muted)]/30 overflow-x-auto text-emerald-600 dark:text-emerald-400">
                  {typeof result === "string" ? result : JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);
ToolCallCard.displayName = "ToolCallCard";

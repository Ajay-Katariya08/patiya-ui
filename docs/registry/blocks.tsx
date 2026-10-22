"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Box } from "patiya";

export type BlockItem = {
  title: string;
  description: string;
  category: string;
  badge?: string;
  preview: React.ReactNode;
  code: string;
};

export const ActionDockPreview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  const items = [
    {
      title: "Overview",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      title: "Metrics",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      title: "Activity",
      badge: "3",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      title: "Settings",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto py-4 sm:py-8 flex flex-col items-center">
      <div className="w-full flex justify-center  no-scrollbar py-1">
        <div className="relative inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none shrink-0">
          {items.map((item, idx) => {
            const isActive = activeTab === idx;
            const isHovered = hoveredTab === idx;

            return (
              <button
                key={item.title}
                onClick={() => setActiveTab(idx)}
                onMouseEnter={() => setHoveredTab(idx)}
                onMouseLeave={() => setHoveredTab(null)}
                className="relative px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 sm:gap-2 cursor-pointer z-10"
              >
                {isActive && (
                  <motion.div
                    layoutId="action-dock-pill"
                    className="absolute inset-0 rounded-xl bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/30"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="action-dock-hover"
                    className="absolute inset-0 rounded-xl bg-[var(--patiya-color-muted)]/50"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <motion.span
                  animate={{ scale: isHovered ? 1.15 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className={`relative z-10 ${
                    isActive
                      ? "text-[var(--patiya-color-primary)]"
                      : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                  }`}
                >
                  {item.icon}
                </motion.span>
                <span
                  className={`relative z-10 font-semibold text-xs ${
                    isActive
                      ? "text-[var(--patiya-color-primary)]"
                      : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                  }`}
                >
                  {item.title}
                </span>
                {item.badge && (
                  <span className="relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[var(--patiya-color-primary)] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 text-[11px] text-[var(--patiya-color-muted-foreground)] flex items-center gap-2">
        <span>Active module:</span>
        <span className="font-semibold text-[var(--patiya-color-foreground)]">
          {items[activeTab].title}
        </span>
      </div>
    </div>
  );
};

export const MetricCardPreview = () => {
  const [timeframe, setTimeframe] = useState<"1h" | "24h" | "7d">("24h");

  const datasets = {
    "1h": {
      latency: "18.4ms",
      uptime: "100%",
      bars: [30, 45, 40, 60, 55, 35, 45, 50, 40, 30],
    },
    "24h": {
      latency: "23.6ms",
      uptime: "99.98%",
      bars: [45, 60, 75, 40, 85, 65, 50, 90, 70, 55],
    },
    "7d": {
      latency: "21.1ms",
      uptime: "99.95%",
      bars: [60, 70, 50, 80, 95, 80, 65, 85, 75, 60],
    },
  };

  const current = datasets[timeframe];

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]/60 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-[var(--patiya-color-foreground)] truncate">
            API Latency Telemetry
          </span>
        </div>

        <div className="flex items-center p-0.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/50 shrink-0">
          {(["1h", "24h", "7d"] as const).map((t) => {
            const isSelected = timeframe === t;
            return (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className="relative px-1.5 sm:px-2 py-0.5 text-[10px] font-semibold transition-colors cursor-pointer"
              >
                {isSelected && (
                  <motion.div
                    layoutId="metric-time-pill"
                    className="absolute inset-0 rounded-md bg-[var(--patiya-color-background)] border border-[var(--patiya-color-border)]"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
                <span
                  className={`relative z-10 ${isSelected ? "text-[var(--patiya-color-foreground)]" : "text-[var(--patiya-color-muted-foreground)]"}`}
                >
                  {t}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 flex items-baseline justify-between">
        <div>
          <AnimatePresence mode="wait">
            <motion.span
              key={current.latency}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--patiya-color-foreground)] block"
            >
              {current.latency}
            </motion.span>
          </AnimatePresence>
          <span className="text-[11px] text-[var(--patiya-color-muted-foreground)]">
            p99 edge roundtrip
          </span>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-emerald-500 block">
            {current.uptime}
          </span>
          <span className="text-[11px] text-[var(--patiya-color-muted-foreground)]">
            Global SLA
          </span>
        </div>
      </div>

      <div className="mt-5 h-16 flex items-end gap-1.5 pt-2">
        {current.bars.map((bar, idx) => (
          <motion.div
            key={idx}
            initial={false}
            animate={{ height: `${bar}%` }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 22,
              delay: idx * 0.02,
            }}
            className="flex-1 rounded-sm bg-[var(--patiya-color-primary)]/80 hover:bg-[var(--patiya-color-primary)] transition-colors"
          />
        ))}
      </div>
    </div>
  );
};

export const NotificationStackPreview = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Production Build Succeeded",
      time: "1m ago",
      type: "success",
    },
    {
      id: 2,
      title: "Database Snapshot Completed",
      time: "12m ago",
      type: "info",
    },
    { id: 3, title: "New API Key Generated", time: "1h ago", type: "alert" },
  ]);

  const dismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const reset = () => {
    setNotifications([
      {
        id: 1,
        title: "Production Build Succeeded",
        time: "1m ago",
        type: "success",
      },
      {
        id: 2,
        title: "Database Snapshot Completed",
        time: "12m ago",
        type: "info",
      },
      { id: 3, title: "New API Key Generated", time: "1h ago", type: "alert" },
    ]);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-3 sm:p-4 flex flex-col items-center select-none">
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-bold text-[var(--patiya-color-foreground)] uppercase tracking-wider">
          Notifications ({notifications.length})
        </span>
        {notifications.length < 3 && (
          <button
            onClick={reset}
            className="text-[11px] text-[var(--patiya-color-primary)] font-semibold hover:underline cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>

      <div className="w-full space-y-2">
        <AnimatePresence mode="popLayout">
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              layout
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className="p-2.5 sm:p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    notif.type === "success"
                      ? "bg-emerald-500"
                      : notif.type === "info"
                        ? "bg-blue-500"
                        : "bg-amber-500"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-[var(--patiya-color-foreground)] truncate">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-[var(--patiya-color-muted-foreground)]">
                    {notif.time}
                  </span>
                </div>
              </div>
              <button
                onClick={() => dismiss(notif.id)}
                className="text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] p-1 rounded-md hover:bg-[var(--patiya-color-muted)] transition-colors cursor-pointer shrink-0"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const StepTrackerPreview = () => {
  const [steps, setSteps] = useState([
    { id: 1, title: "Install Package via Bun", done: true },
    { id: 2, title: "Configure Design Tokens", done: true },
    { id: 3, title: "Mount Root Provider", done: false },
    { id: 4, title: "Import Motion Components", done: false },
  ]);

  const toggle = (id: number) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === id ? { ...step, done: !step.done } : step,
      ),
    );
  };

  const completedCount = steps.filter((s) => s.done).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--patiya-color-foreground)]">
          Setup Progress
        </h3>
        <span className="text-xs font-mono font-bold text-[var(--patiya-color-primary)]">
          {progressPercent}%
        </span>
      </div>

      <div className="w-full h-1.5 rounded-full bg-[var(--patiya-color-muted)] overflow-hidden mb-4 border border-[var(--patiya-color-border)]/50">
        <motion.div
          animate={{ width: `${progressPercent}%` }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="h-full bg-[var(--patiya-color-primary)]"
        />
      </div>

      <div className="space-y-2">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => toggle(step.id)}
            className="w-full p-2 sm:p-2.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/60 hover:bg-[var(--patiya-color-muted)]/30 flex items-center justify-between text-left transition-colors cursor-pointer gap-2"
          >
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
              <div
                className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                  step.done
                    ? "bg-[var(--patiya-color-primary)] border-[var(--patiya-color-primary)] text-white"
                    : "border-[var(--patiya-color-border)] text-transparent"
                }`}
              >
                {step.done && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 stroke-current stroke-2 fill-none"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                )}
              </div>
              <span
                className={`text-xs font-medium truncate ${
                  step.done
                    ? "line-through text-[var(--patiya-color-muted-foreground)]"
                    : "text-[var(--patiya-color-foreground)]"
                }`}
              >
                {step.title}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] shrink-0">
              0{step.id}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export const SegmentedControlPreview = () => {
  const [selected, setSelected] = useState("components");

  const segments = [
    { id: "components", label: "Components", count: 48 },
    { id: "blocks", label: "Blocks", count: 6 },
    { id: "themes", label: "Themes", count: 4 },
  ];

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none">
      <div className="flex items-center p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/50 gap-0.5 sm:gap-1">
        {segments.map((seg) => {
          const isSelected = selected === seg.id;
          return (
            <button
              key={seg.id}
              onClick={() => setSelected(seg.id)}
              className="relative flex-1 py-1.5 px-1 sm:px-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer z-10"
            >
              {isSelected && (
                <motion.div
                  layoutId="segmented-control-bg"
                  className="absolute inset-0 rounded-lg bg-[var(--patiya-color-background)] border border-[var(--patiya-color-border)]"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${isSelected ? "text-[var(--patiya-color-foreground)]" : "text-[var(--patiya-color-muted-foreground)]"}`}
              >
                {seg.label}
              </span>
              <span
                className={`relative z-10 text-[8px] sm:text-[9px] font-bold px-1 sm:px-1.5 py-0.2 rounded-full ${
                  isSelected
                    ? "bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)]"
                    : "bg-[var(--patiya-color-border)]/50 text-[var(--patiya-color-muted-foreground)]"
                }`}
              >
                {seg.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 p-4 rounded-xl border border-[var(--patiya-color-border)]/60 bg-[var(--patiya-color-background)]/60 text-xs">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-between"
          >
            <span className="text-[var(--patiya-color-muted-foreground)]">
              Current view:
            </span>
            <span className="font-bold text-[var(--patiya-color-primary)] uppercase tracking-wider">
              {selected}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export const ExpandableCardPreview = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto select-none">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] flex items-center justify-center border border-[var(--patiya-color-primary)]/20 shrink-0">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)] truncate">
                Postgres Cluster Alpha
              </h4>
              <span className="text-[10px] text-emerald-500 font-medium">
                us-east-1 • Healthy
              </span>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] hover:bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] transition-colors cursor-pointer shrink-0"
          >
            {expanded ? "Close" : "Manage"}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-[var(--patiya-color-border)]/60 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
                    <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] block">
                      Storage
                    </span>
                    <span className="font-semibold text-[var(--patiya-color-foreground)]">
                      38.2 / 100 GB
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
                    <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] block">
                      Replication
                    </span>
                    <span className="font-semibold text-[var(--patiya-color-foreground)]">
                      Synchronous
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-(--patiya-color-muted-foreground)">
                    Automatic Backups
                  </span>
                  <span className="font-mono text-emerald-500 font-bold">
                    Daily 02:00 UTC
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const FloatingCommandDockPreview = () => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto py-4 sm:py-6 flex flex-col items-center">
      <div className="w-full max-w-md p-1.5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/90 flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 sm:gap-2 select-none">
        <div className="flex items-center gap-2 pl-2 sm:pl-3">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono text-[var(--patiya-color-muted-foreground)]">
            prod-node-01
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() =>
              setActiveAction(activeAction === "terminal" ? null : "terminal")
            }
            className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeAction === "terminal"
                ? "bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)] border border-[var(--patiya-color-primary)]/30"
                : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60"
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            <span>Logs</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-xs font-medium transition-colors text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60 flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <svg
                  className="w-3.5 h-3.5 text-emerald-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-emerald-500 font-medium">Copied</span>
              </>
            ) : (
              <>
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Endpoint</span>
              </>
            )}
          </button>

          <button className="px-2 py-1.5 rounded-xl text-[10px] font-mono border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer">
            ⌘K
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeAction === "terminal" && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="w-full max-w-md mt-2 p-3.5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] text-xs font-mono"
          >
            <div className="flex items-center justify-between text-[10px] text-[var(--patiya-color-muted-foreground)] pb-2 mb-2 border-b border-[var(--patiya-color-border)]/50">
              <span>Streaming stdout...</span>
              <span className="text-emerald-500">200 OK</span>
            </div>
            <div className="space-y-1 text-[11px] text-[var(--patiya-color-foreground)]/80">
              <p className="text-emerald-500/90">
                &gt; GET /api/v1/health 1.2ms
              </p>
              <p>&gt; Connection pool: 24 active / 4 idle</p>
              <p>&gt; Cache hit ratio: 98.4% (redis-cluster-iad)</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AnalyticsSparkCardPreview = () => {
  const [range, setRange] = useState<"24h" | "7d" | "30d">("7d");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const seriesData: Record<
    "24h" | "7d" | "30d",
    { val: string; delta: string; points: number[]; labels: string[] }
  > = {
    "24h": {
      val: "48,290",
      delta: "+14.8%",
      points: [24, 38, 30, 48, 42, 65, 58, 80],
      labels: [
        "00:00",
        "03:00",
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00",
        "21:00",
      ],
    },
    "7d": {
      val: "318,400",
      delta: "+22.4%",
      points: [120, 180, 150, 240, 210, 290, 318, 340],
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Today"],
    },
    "30d": {
      val: "1.42M",
      delta: "+31.2%",
      points: [420, 580, 510, 780, 890, 1100, 1280, 1420],
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
    },
  };

  const current = seriesData[range];
  const maxPoint = Math.max(...current.points);
  const minPoint = Math.min(...current.points);

  const svgPoints = current.points
    .map((pt, i) => {
      const x = (i / (current.points.length - 1)) * 260 + 10;
      const y = 80 - ((pt - minPoint) / (maxPoint - minPoint || 1)) * 60;
      return `${x},${y}`;
    })
    .join(" ");

  const activeIndex =
    hoveredIdx !== null ? hoveredIdx : current.points.length - 1;
  const activeValue = current.points[activeIndex];
  const activeLabel = current.labels[activeIndex];

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]/50 gap-2">
        <div className="min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">
            API Invocations
          </span>
          <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--patiya-color-foreground)]">
              {hoveredIdx !== null ? activeValue.toLocaleString() : current.val}
            </span>
            <span className="text-[10px] font-semibold text-emerald-500 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">
              {current.delta}
            </span>
          </div>
        </div>

        <div className="flex p-0.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] shrink-0">
          {(["24h", "7d", "30d"] as const).map((r) => (
            <button
              key={r}
              onClick={() => {
                setRange(r);
                setHoveredIdx(null);
              }}
              className="relative px-1.5 sm:px-2 py-1 text-[10px] font-semibold transition-colors cursor-pointer"
            >
              {range === r && (
                <motion.div
                  layoutId="spark-range-pill"
                  className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/15 border border-[var(--patiya-color-primary)]/30"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  range === r
                    ? "text-[var(--patiya-color-primary)]"
                    : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                }`}
              >
                {r}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative pt-4">
        <div className="flex items-center justify-between text-[10px] text-[var(--patiya-color-muted-foreground)] mb-1">
          <span>{activeLabel}</span>
          <span className="font-mono">{activeValue.toLocaleString()} reqs</span>
        </div>

        <svg
          viewBox="0 0 280 90"
          className="w-full h-20 sm:h-24 overflow-visible"
        >
          <polyline
            fill="none"
            stroke="var(--patiya-color-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={svgPoints}
            className="transition-all duration-300"
          />
          {current.points.map((pt, i) => {
            const cx = (i / (current.points.length - 1)) * 260 + 10;
            const cy = 80 - ((pt - minPoint) / (maxPoint - minPoint || 1)) * 60;
            const isPointActive = activeIndex === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                className="cursor-pointer"
              >
                <circle cx={cx} cy={cy} r="12" fill="transparent" />
                <circle
                  cx={cx}
                  cy={cy}
                  r={isPointActive ? "4.5" : "2.5"}
                  className={`transition-all duration-150 ${
                    isPointActive
                      ? "fill-[var(--patiya-color-primary)] stroke-4 stroke-[var(--patiya-color-background)]"
                      : "fill-[var(--patiya-color-muted-foreground)]/50"
                  }`}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export const InteractiveToastPillPreview = () => {
  const [status, setStatus] = useState<"idle" | "uploading" | "success">(
    "idle",
  );

  const startProcess = () => {
    setStatus("uploading");
    setTimeout(() => {
      setStatus("success");
    }, 1800);
  };

  return (
    <div className="w-full max-w-md mx-auto py-4 sm:py-6 flex flex-col items-center">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 32 }}
        className="w-full max-w-sm p-1.5 sm:p-2 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none"
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-between px-2 py-1 gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[var(--patiya-color-muted-foreground)]/60 shrink-0" />
                <span className="text-xs font-medium text-[var(--patiya-color-foreground)] truncate">
                  System Ready
                </span>
              </div>
              <button
                onClick={startProcess}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--patiya-color-primary)] text-white hover:opacity-90 transition-opacity cursor-pointer shrink-0"
              >
                Sync Database
              </button>
            </motion.div>
          )}

          {status === "uploading" && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-between px-2 py-1 gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <svg
                  className="w-4 h-4 animate-spin text-[var(--patiya-color-primary)] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span className="text-xs font-medium text-[var(--patiya-color-foreground)] truncate">
                  Syncing shards...
                </span>
              </div>
              <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] shrink-0">
                68%
              </span>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-between px-2 py-1 gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                  <svg
                    className="w-2.5 h-2.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-xs font-medium text-[var(--patiya-color-foreground)] truncate">
                  4,120 rows synced
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setStatus("idle")}
                  className="px-2 py-1 rounded-lg text-xs font-medium text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)] transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const CircularJourneyTrackerPreview = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Domain DNS verified", done: true },
    { id: 2, title: "SSL certificate issued", done: true },
    { id: 3, title: "Database migration applied", done: true },
    { id: 4, title: "Edge cache warmup", done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const completedCount = tasks.filter((t) => t.done).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progressPercent / 100) * circumference;

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--patiya-color-border)]/50 gap-2">
        <div className="min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">
            Deployment Readiness
          </span>
          <h4 className="text-sm font-bold text-[var(--patiya-color-foreground)] mt-0.5 truncate">
            Production Launch
          </h4>
        </div>

        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke="var(--patiya-color-border)"
              strokeWidth="5"
              fill="transparent"
            />
            <motion.circle
              cx="32"
              cy="32"
              r={radius}
              stroke="var(--patiya-color-primary)"
              strokeWidth="5"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <span className="absolute text-xs font-bold font-mono text-[var(--patiya-color-foreground)]">
            {progressPercent}%
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="w-full p-2 sm:p-2.5 rounded-xl border border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)]/50 hover:bg-[var(--patiya-color-muted)]/40 flex items-center justify-between text-xs transition-colors cursor-pointer gap-2"
          >
            <span
              className={`font-medium truncate ${
                task.done
                  ? "text-[var(--patiya-color-muted-foreground)] line-through"
                  : "text-[var(--patiya-color-foreground)]"
              }`}
            >
              {task.title}
            </span>
            <span
              className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                task.done
                  ? "bg-[var(--patiya-color-primary)] border-[var(--patiya-color-primary)] text-white"
                  : "border-[var(--patiya-color-border)]"
              }`}
            >
              {task.done && (
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export const AdaptiveFilterBarPreview = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTags, setActiveTags] = useState<string[]>(["Fast"]);

  const categories = [
    { label: "All", count: 28 },
    { label: "UI", count: 16 },
    { label: "Motion", count: 8 },
    { label: "Layouts", count: 4 },
  ];

  const tags = ["Fast", "Zero Shadow", "Spring", "Accessible"];

  const toggleTag = (tag: string) => {
    setActiveTags(
      activeTags.includes(tag)
        ? activeTags.filter((t) => t !== tag)
        : [...activeTags, tag],
    );
  };

  return (
    <div className="w-full max-w-md mx-auto p-3.5 sm:p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-3">
      <div className="flex p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] gap-1 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className="relative shrink-0 sm:shrink sm:flex-1 py-1 sm:py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap"
            >
              {isSelected && (
                <motion.div
                  layoutId="adaptive-tab-pill"
                  className="absolute inset-0 rounded-lg bg-[var(--patiya-color-card)] border border-[var(--patiya-color-border)]"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  isSelected
                    ? "text-[var(--patiya-color-foreground)]"
                    : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                }`}
              >
                {cat.label}
              </span>
              <span className="relative z-10 text-[9px] font-mono px-1.5 py-0.2 rounded-md bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]">
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {tags.map((tag) => {
          const isTagged = activeTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                isTagged
                  ? "bg-[var(--patiya-color-primary)]/15 border-[var(--patiya-color-primary)]/40 text-[var(--patiya-color-primary)]"
                  : "border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
              }`}
            >
              #{tag}
            </button>
          );
        })}

        {activeTags.length > 0 && (
          <button
            onClick={() => setActiveTags([])}
            className="px-2 py-1 text-[11px] font-medium text-[var(--patiya-color-muted-foreground)] hover:text-red-500 transition-colors cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export const LayeredFeatureCardPreview = () => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto py-3 sm:py-4 select-none">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] overflow-hidden"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[var(--patiya-color-primary)]/15 border border-[var(--patiya-color-primary)]/30 flex items-center justify-center text-[var(--patiya-color-primary)] shrink-0">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)] truncate">
                Serverless Worker
              </h4>
              <p className="text-[10px] text-[var(--patiya-color-muted-foreground)] font-mono truncate">
                us-east.edge.worker
              </p>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)] transition-colors cursor-pointer flex items-center gap-1 shrink-0"
          >
            <span>{expanded ? "Collapse" : "Inspect"}</span>
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : "rotate-0"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 pt-4 mt-4 border-t border-[var(--patiya-color-border)]/60 text-xs"
            >
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-[var(--patiya-color-muted-foreground)] font-mono">
                  <span>Memory Usage</span>
                  <span>142 MB / 512 MB</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--patiya-color-muted)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "28%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="h-full bg-[var(--patiya-color-primary)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px]">
                <div className="p-2 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
                  <span className="text-[var(--patiya-color-muted-foreground)] block">
                    Cold start
                  </span>
                  <span className="text-emerald-500 font-bold text-xs mt-0.5 block">
                    14 ms
                  </span>
                </div>
                <div className="p-2 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
                  <span className="text-[var(--patiya-color-muted-foreground)] block">
                    Invocations
                  </span>
                  <span className="text-[var(--patiya-color-foreground)] font-bold text-xs mt-0.5 block">
                    94.2k / hr
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-between font-mono text-[10px] gap-2">
                <span className="text-[var(--patiya-color-muted-foreground)] truncate min-w-0">
                  endpoint: https://api.worker.dev
                </span>
                <button
                  onClick={() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="shrink-0 text-[var(--patiya-color-primary)] hover:underline ml-2 cursor-pointer"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const ContextualToolPalettePreview = () => {
  const [activeTool, setActiveTool] = useState<
    "pointer" | "shape" | "pen" | "text" | "ai"
  >("shape");
  const [activeShape, setActiveShape] = useState<
    "rectangle" | "circle" | "triangle" | "star"
  >("rectangle");
  const [activeColor, setActiveColor] = useState("#6366f1");
  const [showSubMenu, setShowSubMenu] = useState(true);
  const [historyCount, setHistoryCount] = useState(1);
  const [sparkleActive, setSparkleActive] = useState(false);

  const colors = ["#6366f1", "#10b981", "#f43f5e", "#f59e0b", "#06b6d4"];

  const shapes = [
    {
      id: "rectangle",
      label: "Rectangle",
      icon: (
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      ),
    },
    {
      id: "circle",
      label: "Circle",
      icon: (
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
    },
    {
      id: "triangle",
      label: "Triangle",
      icon: (
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 3l9 16H3z" />
        </svg>
      ),
    },
    {
      id: "star",
      label: "Star",
      icon: (
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto pt-16 pb-4 sm:pt-20 sm:pb-6 flex flex-col items-center gap-4 sm:gap-5 select-none">
      <div className="relative flex flex-col items-center w-full">
        <AnimatePresence>
          {activeTool === "shape" && showSubMenu && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className="absolute -top-12 z-20 flex items-center gap-1 p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] backdrop-blur-md max-w-full overflow-x-auto"
            >
              {shapes.map((s) => {
                const isSelected = activeShape === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveShape(s.id as any)}
                    className="relative p-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center shrink-0"
                    title={s.label}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="active-shape-pill"
                        className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/15 border border-[var(--patiya-color-primary)]/30"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 30,
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        isSelected
                          ? "text-[var(--patiya-color-primary)]"
                          : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                      }`}
                    >
                      {s.icon}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full flex items-center justify-center overflow-x-auto no-scrollbar py-1">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] shrink-0">
            <button
              onClick={() => {
                setActiveTool("pointer");
                setShowSubMenu(false);
              }}
              className="relative p-1.5 sm:p-2 rounded-xl text-xs transition-colors cursor-pointer"
              title="Select"
            >
              {activeTool === "pointer" && (
                <motion.div
                  layoutId="canvas-active-tool"
                  className="absolute inset-0 rounded-xl bg-[var(--patiya-color-primary)]/15 border border-[var(--patiya-color-primary)]/30"
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                />
              )}
              <svg
                className={`w-4 h-4 relative z-10 ${
                  activeTool === "pointer"
                    ? "text-[var(--patiya-color-primary)]"
                    : "text-[var(--patiya-color-muted-foreground)]"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 3l7 18 3-7 7-3L3 3z" />
              </svg>
            </button>

            <button
              onClick={() => {
                setActiveTool("shape");
                setShowSubMenu((prev) =>
                  activeTool === "shape" ? !prev : true,
                );
              }}
              className="relative p-1.5 sm:p-2 rounded-xl text-xs transition-colors cursor-pointer"
              title="Shapes"
            >
              {activeTool === "shape" && (
                <motion.div
                  layoutId="canvas-active-tool"
                  className="absolute inset-0 rounded-xl bg-[var(--patiya-color-primary)]/15 border border-[var(--patiya-color-primary)]/30"
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                />
              )}
              <svg
                className={`w-4 h-4 relative z-10 ${
                  activeTool === "shape"
                    ? "text-[var(--patiya-color-primary)]"
                    : "text-[var(--patiya-color-muted-foreground)]"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            </button>

            <button
              onClick={() => {
                setActiveTool("pen");
                setShowSubMenu(false);
              }}
              className="relative p-1.5 sm:p-2 rounded-xl text-xs transition-colors cursor-pointer"
              title="Pen Tool"
            >
              {activeTool === "pen" && (
                <motion.div
                  layoutId="canvas-active-tool"
                  className="absolute inset-0 rounded-xl bg-[var(--patiya-color-primary)]/15 border border-[var(--patiya-color-primary)]/30"
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                />
              )}
              <svg
                className={`w-4 h-4 relative z-10 ${
                  activeTool === "pen"
                    ? "text-[var(--patiya-color-primary)]"
                    : "text-[var(--patiya-color-muted-foreground)]"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
              </svg>
            </button>

            <button
              onClick={() => {
                setActiveTool("text");
                setShowSubMenu(false);
              }}
              className="relative p-1.5 sm:p-2 rounded-xl text-xs transition-colors cursor-pointer"
              title="Typography"
            >
              {activeTool === "text" && (
                <motion.div
                  layoutId="canvas-active-tool"
                  className="absolute inset-0 rounded-xl bg-[var(--patiya-color-primary)]/15 border border-[var(--patiya-color-primary)]/30"
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                />
              )}
              <svg
                className={`w-4 h-4 relative z-10 ${
                  activeTool === "text"
                    ? "text-[var(--patiya-color-primary)]"
                    : "text-[var(--patiya-color-muted-foreground)]"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="4 7 4 4 20 4 20 7" />
                <line x1="9" y1="20" x2="15" y2="20" />
                <line x1="12" y1="4" x2="12" y2="20" />
              </svg>
            </button>

            <button
              onClick={() => {
                setActiveTool("ai");
                setShowSubMenu(false);
                setSparkleActive(true);
                setTimeout(() => setSparkleActive(false), 1200);
              }}
              className="relative p-1.5 sm:p-2 rounded-xl text-xs transition-colors cursor-pointer"
              title="AI Enhance"
            >
              {activeTool === "ai" && (
                <motion.div
                  layoutId="canvas-active-tool"
                  className="absolute inset-0 rounded-xl bg-[var(--patiya-color-primary)]/15 border border-[var(--patiya-color-primary)]/30"
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                />
              )}
              <motion.svg
                animate={
                  sparkleActive
                    ? { rotate: [0, 180, 360], scale: [1, 1.25, 1] }
                    : {}
                }
                transition={{ duration: 0.6 }}
                className={`w-4 h-4 relative z-10 ${
                  activeTool === "ai"
                    ? "text-[var(--patiya-color-primary)]"
                    : "text-[var(--patiya-color-muted-foreground)]"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3l1.912 5.885a2 2 0 001.203 1.203L21 12l-5.885 1.912a2 2 0 00-1.203 1.203L12 21l-1.912-5.885a2 2 0 00-1.203-1.203L3 12l5.885-1.912a2 2 0 001.203-1.203L12 3z" />
              </motion.svg>
            </button>

            <div className="w-[1px] h-4 sm:h-5 bg-[var(--patiya-color-border)] mx-0.5 sm:mx-1" />

            <div className="flex items-center gap-0.5 sm:gap-1 px-0.5 sm:px-1">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveColor(c)}
                  className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 shrink-0"
                >
                  <span
                    className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full"
                    style={{ backgroundColor: c }}
                  />
                  {activeColor === c && (
                    <motion.span
                      layoutId="active-color-ring"
                      className="absolute inset-0 rounded-full border border-[var(--patiya-color-foreground)]"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 28,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="w-[1px] h-4 sm:h-5 bg-[var(--patiya-color-border)] mx-0.5 sm:mx-1" />

            <div className="flex items-center gap-0.5">
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setHistoryCount((h) => Math.max(0, h - 1))}
                className="p-1 sm:p-1.5 rounded-lg text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer"
                title="Undo"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 7v6h6" />
                  <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
                </svg>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setHistoryCount((h) => h + 1)}
                className="p-1 sm:p-1.5 rounded-lg text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer"
                title="Redo"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 7v6h-6" />
                  <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-32 sm:h-36 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/60 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-2.5 left-3 flex items-center gap-2 text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: activeColor }}
          />
          <span className="uppercase">{activeTool}</span>
          <span>•</span>
          <span>History: {historyCount}</span>
        </div>

        <motion.div
          key={`${activeTool}-${activeShape}-${activeColor}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="flex flex-col items-center gap-2"
        >
          {activeTool === "shape" && activeShape === "rectangle" && (
            <div
              className="w-16 h-12 rounded-xl border-2"
              style={{
                borderColor: activeColor,
                backgroundColor: `${activeColor}20`,
              }}
            />
          )}
          {activeTool === "shape" && activeShape === "circle" && (
            <div
              className="w-14 h-14 rounded-full border-2"
              style={{
                borderColor: activeColor,
                backgroundColor: `${activeColor}20`,
              }}
            />
          )}
          {activeTool === "shape" && activeShape === "triangle" && (
            <div className="w-14 h-14 flex items-center justify-center">
              <svg
                className="w-14 h-14"
                viewBox="0 0 24 24"
                fill={`${activeColor}20`}
                stroke={activeColor}
                strokeWidth="2"
              >
                <path d="M12 3l9 16H3z" />
              </svg>
            </div>
          )}
          {activeTool === "shape" && activeShape === "star" && (
            <div className="w-14 h-14 flex items-center justify-center">
              <svg
                className="w-14 h-14"
                viewBox="0 0 24 24"
                fill={`${activeColor}20`}
                stroke={activeColor}
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          )}
          {activeTool === "pointer" && (
            <div className="text-xs font-medium text-[var(--patiya-color-muted-foreground)] flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[var(--patiya-color-primary)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 3l7 18 3-7 7-3L3 3z" />
              </svg>
              <span>Click any element to transform</span>
            </div>
          )}
          {activeTool === "pen" && (
            <svg
              className="w-32 h-10"
              viewBox="0 0 120 40"
              fill="none"
              stroke={activeColor}
              strokeWidth="3"
              strokeLinecap="round"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                d="M10 25 C 30 10, 50 35, 70 20 S 100 30, 110 15"
              />
            </svg>
          )}
          {activeTool === "text" && (
            <span
              className="text-sm font-semibold tracking-wide text-center px-2"
              style={{ color: activeColor }}
            >
              Double click to edit typography
            </span>
          )}
          {activeTool === "ai" && (
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--patiya-color-primary)]">
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeDasharray="30"
                  strokeDashoffset="10"
                />
              </svg>
              <span>Generating AI vector graphics...</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export const FacetedFilterSegmentPreview = () => {
  const [selectedView, setSelectedView] = useState("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const views = [
    { id: "all", label: "All Items", count: 24 },
    { id: "active", label: "Active", count: 14 },
    { id: "review", label: "In Review", count: 6 },
    { id: "archived", label: "Archived", count: 4 },
  ];

  const tags = ["High Priority", "API Gateway", "Core Auth", "Database"];

  const items = [
    {
      id: 1,
      title: "Next-gen Billing Service",
      status: "active",
      tag: "API Gateway",
      ping: "99.98%",
    },
    {
      id: 2,
      title: "OIDC Token Rotation Hook",
      status: "review",
      tag: "Core Auth",
      ping: "Pending",
    },
    {
      id: 3,
      title: "PostgreSQL Read Replica",
      status: "active",
      tag: "Database",
      ping: "14ms",
    },
    {
      id: 4,
      title: "Legacy Webhook Listener",
      status: "archived",
      tag: "API Gateway",
      ping: "Disabled",
    },
    {
      id: 5,
      title: "Distributed Lock Manager",
      status: "active",
      tag: "High Priority",
      ping: "1.2ms",
    },
  ];

  const filteredItems = items.filter((item) => {
    const matchesView = selectedView === "all" || item.status === selectedView;
    const matchesTag = !selectedTag || item.tag === selectedTag;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesView && matchesTag && matchesSearch;
  });

  return (
    <div className="w-full max-w-md mx-auto p-3.5 sm:p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="space-y-2">
        <div className="flex p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] gap-1 overflow-x-auto no-scrollbar">
          {views.map((v) => {
            const isSelected = selectedView === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedView(v.id)}
                className="relative shrink-0 sm:shrink sm:flex-1 py-1 sm:py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap"
              >
                {isSelected && (
                  <motion.div
                    layoutId="faceted-filter-active-pill"
                    className="absolute inset-0 rounded-lg bg-[var(--patiya-color-card)] border border-[var(--patiya-color-border)]"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    isSelected
                      ? "text-[var(--patiya-color-foreground)]"
                      : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                  }`}
                >
                  {v.label}
                </span>
                <motion.span
                  key={v.count}
                  layout
                  className={`relative z-10 text-[9px] font-mono px-1.5 py-0.5 rounded-md ${
                    isSelected
                      ? "bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)]"
                      : "bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]"
                  }`}
                >
                  {v.count}
                </motion.span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
          {tags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <motion.button
                key={tag}
                whileTap={{ scale: 0.94 }}
                onClick={() => setSelectedTag(isSelected ? null : tag)}
                className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors border cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[var(--patiya-color-primary)]/15 border-[var(--patiya-color-primary)]/40 text-[var(--patiya-color-primary)]"
                    : "border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected
                      ? "bg-[var(--patiya-color-primary)]"
                      : "bg-[var(--patiya-color-border)]"
                  }`}
                />
                <span>{tag}</span>
                {isSelected && (
                  <span className="text-[10px] ml-0.5 opacity-70">✕</span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-[var(--patiya-color-muted-foreground)] px-1">
          <span>Results ({filteredItems.length})</span>
          {(selectedTag || selectedView !== "all") && (
            <button
              onClick={() => {
                setSelectedTag(null);
                setSelectedView("all");
              }}
              className="text-[var(--patiya-color-primary)] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        <motion.div layout className="space-y-1.5">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="p-2 sm:p-2.5 rounded-xl border border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)]/60 flex items-center justify-between text-xs gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      item.status === "active"
                        ? "bg-emerald-500"
                        : item.status === "review"
                          ? "bg-amber-500"
                          : "bg-zinc-400"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[var(--patiya-color-foreground)] truncate">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-[var(--patiya-color-muted-foreground)]">
                      {item.tag}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-md bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)] shrink-0">
                  {item.ping}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-6 text-center text-xs text-[var(--patiya-color-muted-foreground)]"
            >
              No matching workflows found.
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export const InteractiveAlertCapsulePreview = () => {
  const [activeAlert, setActiveAlert] = useState<
    "deploy" | "security" | "success"
  >("deploy");
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const alerts = {
    deploy: {
      type: "deploy",
      title: "Production Deploy #429",
      subtitle: "Building edge container image",
      status: "In Progress",
      color: "var(--patiya-color-primary)",
      icon: (
        <svg
          className="w-3.5 h-3.5 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            strokeDasharray="32"
            strokeDashoffset="12"
          />
        </svg>
      ),
      meta: [
        { label: "Branch", value: "main" },
        { label: "Commit", value: "7f4c9a1" },
        { label: "Region", value: "iad1" },
      ],
      progress: 68,
      action: "Abort",
    },
    security: {
      type: "security",
      title: "Anomalous Login Attempt",
      subtitle: "IP: 198.51.100.24 (Frankfurt, DE)",
      status: "Needs Action",
      color: "#f59e0b",
      icon: (
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      meta: [
        { label: "Protocol", value: "SSH-v2" },
        { label: "Failures", value: "5 / min" },
        { label: "Rule", value: "Geo-Fence" },
      ],
      progress: 100,
      action: "Block IP",
    },
    success: {
      type: "success",
      title: "Database Backup Completed",
      subtitle: "14.2 GB snapshot synced to S3",
      status: "Ready",
      color: "#10b981",
      icon: (
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
      meta: [
        { label: "Duration", value: "1.4s" },
        { label: "Checksum", value: "sha256-ok" },
        { label: "Retention", value: "30 days" },
      ],
      progress: 100,
      action: "Download",
    },
  };

  const current = alerts[activeAlert];

  const switchAlert = (key: "deploy" | "security" | "success") => {
    setActiveAlert(key);
    setDismissed(false);
  };

  return (
    <div className="w-full max-w-md mx-auto py-3 sm:py-4 select-none space-y-4 flex flex-col items-center">
      <div className="flex p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] gap-1 max-w-full overflow-x-auto no-scrollbar">
        {(["deploy", "security", "success"] as const).map((key) => {
          const isSelected = activeAlert === key;
          return (
            <button
              key={key}
              onClick={() => switchAlert(key)}
              className="relative px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer shrink-0"
            >
              {isSelected && (
                <motion.div
                  layoutId="alert-type-pill"
                  className="absolute inset-0 rounded-lg bg-[var(--patiya-color-background)] border border-[var(--patiya-color-border)]"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  isSelected
                    ? "text-[var(--patiya-color-foreground)]"
                    : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                }`}
              >
                {key}
              </span>
            </button>
          );
        })}
      </div>

      <div className="w-full min-h-[140px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!dismissed ? (
            <motion.div
              key={activeAlert}
              layout
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className="w-full rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] overflow-hidden"
            >
              <div className="p-3 sm:p-3.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]"
                    style={{ color: current.color }}
                  >
                    {current.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[var(--patiya-color-foreground)] truncate">
                      {current.title}
                    </p>
                    <p className="text-[11px] text-[var(--patiya-color-muted-foreground)] truncate">
                      {current.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-medium border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)] transition-colors cursor-pointer shrink-0"
                  >
                    {expanded ? "Collapse" : "Inspect"}
                  </button>
                  <button
                    onClick={() => setDismissed(true)}
                    className="p-1 rounded-lg text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer shrink-0"
                    title="Dismiss"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              {activeAlert === "deploy" && (
                <div className="h-1 bg-[var(--patiya-color-muted)] overflow-hidden">
                  <motion.div
                    initial={{ width: "20%" }}
                    animate={{ width: "80%" }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    className="h-full bg-[var(--patiya-color-primary)]"
                  />
                </div>
              )}

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="px-3.5 pb-3.5 pt-2 border-t border-[var(--patiya-color-border)]/60 space-y-3"
                  >
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 font-mono text-[10px]">
                      {current.meta.map((m) => (
                        <div
                          key={m.label}
                          className="p-1.5 sm:p-2 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]"
                        >
                          <span className="text-[var(--patiya-color-muted-foreground)] block text-[9px] sm:text-[10px]">
                            {m.label}
                          </span>
                          <span className="text-[var(--patiya-color-foreground)] font-bold mt-0.5 block truncate">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] font-mono">
                        Status:{" "}
                        <strong className="text-[var(--patiya-color-foreground)]">
                          {current.status}
                        </strong>
                      </span>
                      <button className="px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--patiya-color-primary)] text-white hover:opacity-90 transition-opacity cursor-pointer">
                        {current.action}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setDismissed(false)}
              className="px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer"
            >
              Reopen Alert
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const TelemetryLiveStreamPreview = () => {
  const [metricMode, setMetricMode] = useState<
    "throughput" | "latency" | "errors"
  >("throughput");
  const [isPaused, setIsPaused] = useState(false);

  const modeData = {
    throughput: {
      value: "8.42",
      unit: "Gbps",
      delta: "+14.6%",
      sub: "Peak 10.2 Gbps",
      bars: [35, 48, 65, 82, 55, 74, 90, 68, 85, 70, 95, 60, 78, 88, 92, 75],
    },
    latency: {
      value: "13.8",
      unit: "ms",
      delta: "-4.2ms",
      sub: "P99 18.2 ms",
      bars: [22, 18, 25, 30, 20, 16, 28, 24, 19, 21, 35, 22, 18, 20, 24, 17],
    },
    errors: {
      value: "0.002",
      unit: "%",
      delta: "Healthy",
      sub: "0 / 128k requests",
      bars: [4, 6, 2, 8, 4, 2, 5, 2, 0, 4, 8, 2, 4, 6, 2, 4],
    },
  };

  const current = modeData[metricMode];

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4 sm:space-y-5">
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            {!isPaused && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isPaused ? "bg-amber-400" : "bg-emerald-500"
              }`}
            />
          </span>
          <span className="text-xs font-semibold text-[var(--patiya-color-foreground)]">
            {isPaused ? "Stream Paused" : "Live Ingress"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex p-0.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
            {(["throughput", "latency", "errors"] as const).map((mode) => {
              const active = metricMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => setMetricMode(mode)}
                  className="relative px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold capitalize transition-colors cursor-pointer"
                >
                  {active && (
                    <motion.div
                      layoutId="telemetry-mode-pill"
                      className="absolute inset-0 rounded-md bg-[var(--patiya-color-card)] border border-[var(--patiya-color-border)]"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      active
                        ? "text-[var(--patiya-color-foreground)]"
                        : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                    }`}
                  >
                    {mode}
                  </span>
                </button>
              );
            })}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer"
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? (
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <motion.span
            key={current.value}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--patiya-color-foreground)]"
          >
            {current.value}
          </motion.span>
          <span className="text-xs sm:text-sm font-semibold text-[var(--patiya-color-muted-foreground)]">
            {current.unit}
          </span>
          <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 shrink-0">
            {current.delta}
          </span>
        </div>
        <p className="text-[11px] text-[var(--patiya-color-muted-foreground)] mt-0.5">
          {current.sub}
        </p>
      </div>

      <div className="h-20 w-full flex items-end gap-1.5 pt-2">
        {current.bars.map((bar, i) => (
          <div
            key={i}
            className="flex-1 h-full flex items-end rounded-sm bg-[var(--patiya-color-muted)]/40 overflow-hidden"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{
                height: isPaused
                  ? `${bar}%`
                  : [
                      `${Math.max(15, bar - 15)}%`,
                      `${bar}%`,
                      `${Math.min(100, bar + 10)}%`,
                      `${bar}%`,
                    ],
              }}
              transition={
                isPaused
                  ? { duration: 0.2 }
                  : {
                      duration: 1.8 + (i % 3) * 0.4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }
              }
              className="w-full rounded-sm bg-[var(--patiya-color-primary)] opacity-85 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1 border-t border-[var(--patiya-color-border)]/60 text-left font-mono">
        <div className="p-1.5 sm:p-2 rounded-xl border border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)]/50 min-w-0">
          <span className="text-[9px] sm:text-[10px] text-[var(--patiya-color-muted-foreground)] block truncate">
            Active Edges
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-[var(--patiya-color-foreground)] mt-0.5 block truncate">
            142 PoPs
          </span>
        </div>
        <div className="p-1.5 sm:p-2 rounded-xl border border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)]/50 min-w-0">
          <span className="text-[9px] sm:text-[10px] text-[var(--patiya-color-muted-foreground)] block truncate">
            Uptime
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-emerald-500 mt-0.5 block truncate">
            99.995%
          </span>
        </div>
        <div className="p-1.5 sm:p-2 rounded-xl border border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)]/50 min-w-0">
          <span className="text-[9px] sm:text-[10px] text-[var(--patiya-color-muted-foreground)] block truncate">
            Protocol
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-[var(--patiya-color-foreground)] mt-0.5 block truncate">
            HTTP/3
          </span>
        </div>
      </div>
    </div>
  );
};

export const DeployPipelineStepperPreview = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [expandedLog, setExpandedLog] = useState<number | null>(2);

  const steps = [
    {
      id: 0,
      title: "Validate & Test",
      duration: "18s",
      status: "completed",
      log: "142 unit tests passed. 0 security alerts found in lockfile.",
    },
    {
      id: 1,
      title: "Compile Image",
      duration: "44s",
      status: "completed",
      log: "Docker multi-stage build finished. Image size: 48.2 MB.",
    },
    {
      id: 2,
      title: "Canary Deploy",
      duration: "Running",
      status: "active",
      log: "Promoting canary traffic: 4 of 10 edge regions synchronized.",
    },
    {
      id: 3,
      title: "Global Release",
      duration: "Queued",
      status: "pending",
      log: "Awaiting canary health threshold verification before release.",
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 border-b border-[var(--patiya-color-border)]/60 pb-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)] truncate">
            Release Pipeline v2.4.0
          </h4>
          <p className="text-[11px] text-[var(--patiya-color-muted-foreground)] font-mono truncate">
            commit: 9f12d8a • branch: main
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 0))}
            className="px-2 py-1 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[10px] font-semibold text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer"
          >
            Prev
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() =>
              setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))
            }
            className="px-2 py-1 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[10px] font-semibold text-[var(--patiya-color-primary)] hover:bg-[var(--patiya-color-muted)] cursor-pointer"
          >
            Advance
          </motion.button>
        </div>
      </div>

      <div className="space-y-2">
        {steps.map((step) => {
          const isDone = step.id < activeStep;
          const isCurrent = step.id === activeStep;
          const isExpanded = expandedLog === step.id;

          return (
            <motion.div
              key={step.id}
              layout
              className={`rounded-xl border transition-colors ${
                isCurrent
                  ? "border-[var(--patiya-color-primary)]/40 bg-[var(--patiya-color-primary)]/5"
                  : "border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)]/50"
              }`}
            >
              <button
                onClick={() => setExpandedLog(isExpanded ? null : step.id)}
                className="w-full p-2 sm:p-2.5 flex items-center justify-between text-xs text-left cursor-pointer gap-2"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                      isDone
                        ? "bg-emerald-500 text-white"
                        : isCurrent
                          ? "bg-[var(--patiya-color-primary)] text-white"
                          : "border border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)]"
                    }`}
                  >
                    {isDone ? (
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    ) : (
                      step.id + 1
                    )}
                  </div>

                  <span
                    className={`font-semibold truncate ${
                      isCurrent
                        ? "text-[var(--patiya-color-primary)]"
                        : isDone
                          ? "text-[var(--patiya-color-foreground)]"
                          : "text-[var(--patiya-color-muted-foreground)]"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                    {step.duration}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-[var(--patiya-color-muted-foreground)] transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-3 pb-3 pt-1 border-t border-[var(--patiya-color-border)]/40 font-mono text-[10px] text-[var(--patiya-color-muted-foreground)]"
                  >
                    {step.log}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export const MorphingSearchDockPreview = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Actions", "Docs", "Settings"];

  const suggestions = [
    { title: "Deploy to Production Edge", cat: "Actions", shortcut: "⌘D" },
    { title: "View System Telemetry", cat: "Docs", shortcut: "⌘T" },
    { title: "Rotate API Access Tokens", cat: "Settings", shortcut: "⌘R" },
    { title: "Create Webhook Endpoint", cat: "Actions", shortcut: "⌘W" },
  ];

  const filteredSuggestions = suggestions.filter((item) => {
    const matchesCat = activeCategory === "All" || item.cat === activeCategory;
    const matchesQuery =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="w-full max-w-md mx-auto py-4 sm:py-8 flex flex-col items-center select-none">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className={`rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] overflow-hidden transition-colors ${
          isExpanded
            ? "w-full p-2.5 sm:p-3.5 space-y-2.5 sm:space-y-3"
            : "inline-flex max-w-full overflow-x-auto no-scrollbar items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5"
        }`}
      >
        {!isExpanded ? (
          <>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsExpanded(true)}
              className="relative px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 sm:gap-2 text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60 transition-colors cursor-pointer shrink-0"
            >
              <svg
                className="w-4 h-4 text-[var(--patiya-color-primary)] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search</span>
              <span className="text-[10px] font-mono px-1 sm:px-1.5 py-0.5 rounded border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-muted-foreground)]">
                ⌘K
              </span>
            </motion.button>

            <div className="w-[1px] h-4 sm:h-5 bg-[var(--patiya-color-border)] mx-0.5 shrink-0" />

            <button
              onClick={() => {}}
              className="p-1.5 sm:p-2 rounded-xl text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60 transition-colors cursor-pointer shrink-0"
              title="Bookmarks"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>

            <button
              onClick={() => {}}
              className="p-1.5 sm:p-2 rounded-xl text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60 transition-colors cursor-pointer shrink-0"
              title="Activity"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </button>

            <button
              onClick={() => {}}
              className="p-1.5 sm:p-2 rounded-xl text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60 transition-colors cursor-pointer shrink-0"
              title="Settings"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 px-1">
              <svg
                className="w-4 h-4 text-[var(--patiya-color-primary)] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Search commands, docs, settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-[var(--patiya-color-foreground)] placeholder-[var(--patiya-color-muted-foreground)] focus:outline-none"
              />
              <button
                onClick={() => {
                  setIsExpanded(false);
                  setSearchQuery("");
                }}
                className="p-1 rounded-lg text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer shrink-0"
                title="Close"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-1 p-0.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] overflow-x-auto no-scrollbar">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="relative shrink-0 sm:shrink sm:flex-1 px-2.5 sm:px-1 py-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="morph-search-category-pill"
                        className="absolute inset-0 rounded-lg bg-[var(--patiya-color-card)] border border-[var(--patiya-color-border)]"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 30,
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        isSelected
                          ? "text-[var(--patiya-color-foreground)]"
                          : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                      }`}
                    >
                      {cat}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-1 pt-1 max-h-44 overflow-y-auto">
              {filteredSuggestions.map((item) => (
                <div
                  key={item.title}
                  className="p-2 rounded-xl border border-[var(--patiya-color-border)]/60 bg-[var(--patiya-color-background)]/50 hover:bg-[var(--patiya-color-muted)]/50 flex items-center justify-between text-xs transition-colors cursor-pointer gap-2"
                >
                  <span className="font-medium text-[var(--patiya-color-foreground)] truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] text-[var(--patiya-color-muted-foreground)] shrink-0">
                    {item.shortcut}
                  </span>
                </div>
              ))}
              {filteredSuggestions.length === 0 && (
                <p className="text-center py-4 text-[11px] text-[var(--patiya-color-muted-foreground)]">
                  No matching commands found.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export const LiveActivityBannerPreview = () => {
  const [status, setStatus] = useState<"syncing" | "paused" | "complete">(
    "syncing",
  );
  const [progress, setProgress] = useState(68);
  const [isExpanded, setIsExpanded] = useState(false);

  const files = [
    { name: "core-bundle.wasm", size: "12.4 MB", status: "100%", done: true },
    {
      name: "assets-manifest.json",
      size: "4.8 MB",
      status: `${progress}%`,
      done: false,
    },
    {
      name: "static-routes.map",
      size: "1.2 MB",
      status: "Queued",
      done: false,
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto py-3 sm:py-4 select-none">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className="rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] overflow-hidden"
      >
        <div className="p-3 sm:p-3.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="relative w-8 h-8 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-center shrink-0">
              {status === "syncing" && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-xl bg-[var(--patiya-color-primary)] opacity-20" />
              )}
              <svg
                className={`w-4 h-4 ${
                  status === "complete"
                    ? "text-emerald-500"
                    : status === "paused"
                      ? "text-amber-500"
                      : "text-[var(--patiya-color-primary)] animate-pulse"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <p className="text-xs font-bold text-[var(--patiya-color-foreground)] truncate">
                  Syncing to Edge CDN
                </p>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-muted-foreground)] shrink-0">
                  {status === "paused" ? "Paused" : "3.8 MB/s"}
                </span>
              </div>
              <p className="text-[11px] text-[var(--patiya-color-muted-foreground)] font-mono truncate">
                18.4 MB of 28.6 MB ({progress}%)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                setStatus((s) => (s === "syncing" ? "paused" : "syncing"))
              }
              className="px-2.5 py-1 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[10px] font-semibold text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)] transition-colors cursor-pointer shrink-0"
            >
              {status === "syncing" ? "Pause" : "Resume"}
            </motion.button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-lg text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer shrink-0"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>

        <div className="h-1 bg-[var(--patiya-color-muted)] overflow-hidden">
          <motion.div
            initial={{ width: "20%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`h-full ${
              status === "paused"
                ? "bg-amber-500"
                : "bg-[var(--patiya-color-primary)]"
            }`}
          />
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="p-3.5 border-t border-[var(--patiya-color-border)]/60 space-y-3"
            >
              <div className="space-y-1.5">
                {files.map((file) => (
                  <div
                    key={file.name}
                    className="p-2 rounded-xl border border-[var(--patiya-color-border)]/60 bg-[var(--patiya-color-background)]/50 flex items-center justify-between text-[11px] font-mono gap-2"
                  >
                    <div className="flex items-center gap-2 truncate min-w-0 flex-1">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          file.done
                            ? "bg-emerald-500"
                            : status === "paused"
                              ? "bg-amber-500"
                              : "bg-[var(--patiya-color-primary)]"
                        }`}
                      />
                      <span className="text-[var(--patiya-color-foreground)] truncate">
                        {file.name}
                      </span>
                    </div>
                    <span className="text-[var(--patiya-color-muted-foreground)] shrink-0 ml-2">
                      {file.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] pt-1 border-t border-[var(--patiya-color-border)]/40">
                <span>Target: Cloudflare R2</span>
                <span>Active Threads: 8</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const FluidEqualizerScrubberPreview = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(42);
  const [activePreset, setActivePreset] = useState("Bass");

  const presets = ["Flat", "Bass", "Vocal", "Synth"];
  const barHeights: Record<string, number[]> = {
    Flat: [
      40, 45, 50, 48, 52, 49, 45, 50, 52, 48, 46, 50, 52, 48, 45, 49, 51, 47,
      45, 42,
    ],
    Bass: [
      88, 95, 82, 75, 60, 45, 35, 40, 48, 52, 40, 36, 42, 48, 55, 60, 50, 40,
      35, 30,
    ],
    Vocal: [
      25, 30, 35, 50, 75, 90, 85, 92, 88, 70, 55, 45, 50, 60, 55, 45, 38, 32,
      28, 25,
    ],
    Synth: [
      50, 70, 90, 65, 40, 85, 95, 70, 45, 80, 90, 60, 40, 85, 75, 50, 80, 65,
      45, 35,
    ],
  };
  const bars = barHeights[activePreset] || barHeights.Flat;

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      <div className="p-3.5 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--patiya-color-border)]">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${isPlaying ? "bg-emerald-500 animate-pulse" : "bg-zinc-500"}`}
            />
            <div>
              <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
                Master Spectrum
              </h4>
              <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                48kHz • 24-bit PCM
              </p>
            </div>
          </div>
          <div className="flex p-0.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => setActivePreset(preset)}
                className="relative px-2 sm:px-2.5 py-1 text-[11px] font-semibold transition-colors"
              >
                {activePreset === preset && (
                  <motion.div
                    layoutId="equalizer-preset-pill"
                    className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/30"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${activePreset === preset ? "text-[var(--patiya-color-primary)]" : "text-[var(--patiya-color-muted-foreground)]"}`}
                >
                  {preset}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-20 sm:h-24 flex items-end justify-between gap-1 px-1 pt-2">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-[var(--patiya-color-primary)] to-[var(--patiya-color-primary)]/40 min-w-[3px]"
              animate={{
                height: isPlaying
                  ? [
                      `${Math.max(12, h - 18)}%`,
                      `${h}%`,
                      `${Math.min(100, h + 14)}%`,
                      `${h}%`,
                    ]
                  : `${Math.max(10, h * 0.35)}%`,
                opacity: isPlaying ? 1 : 0.45,
              }}
              transition={{
                duration: 0.8 + (i % 5) * 0.15,
                repeat: isPlaying ? Infinity : 0,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="space-y-1.5 pt-1">
          <div
            className="relative h-6 flex items-center cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const pct = Math.round(
                Math.max(0, Math.min(100, (clickX / rect.width) * 100)),
              );
              setProgress(pct);
            }}
          >
            <div className="w-full h-1.5 rounded-full bg-[var(--patiya-color-muted)] overflow-hidden">
              <motion.div
                className="h-full bg-[var(--patiya-color-primary)]"
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            </div>
            <motion.div
              className="absolute w-4 h-4 rounded-full border-2 border-[var(--patiya-color-background)] bg-[var(--patiya-color-primary)] -ml-2"
              animate={{ left: `${progress}%` }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            <span>
              01:{String(Math.floor((progress / 100) * 60)).padStart(2, "0")}
            </span>
            <span className="font-semibold text-[var(--patiya-color-foreground)]">
              {progress}%
            </span>
            <span>
              -02:
              {String(60 - Math.floor((progress / 100) * 60)).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setProgress(Math.max(0, progress - 10))}
            className="p-2 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] transition-colors text-xs text-[var(--patiya-color-foreground)]"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 19 2 12 11 5 11 19" />
              <polygon points="22 19 13 12 22 5 22 19" />
            </svg>
          </button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] font-semibold text-xs transition-opacity"
          >
            {isPlaying ? (
              <>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Play Live</span>
              </>
            )}
          </motion.button>
          <button
            onClick={() => setProgress(Math.min(100, progress + 10))}
            className="p-2 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] transition-colors text-xs text-[var(--patiya-color-foreground)]"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 19 22 12 13 5 13 19" />
              <polygon points="2 19 11 12 2 5 2 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export const TactileRotaryDialPreview = () => {
  const [value, setValue] = useState(65);
  const presets = [0, 25, 50, 75, 100];
  const angle = (value / 100) * 270 - 135;
  const ticks = Array.from({ length: 25 }, (_, i) => i * 4);

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] flex flex-col items-center space-y-5">
        <div className="w-full flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
          <div>
            <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
              Analog Rotary Drive
            </h4>
            <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
              360° Continuous Feedback
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[var(--patiya-color-primary)] px-2 py-0.5 rounded-md bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/20">
            +{(value * 0.24).toFixed(1)} dB
          </span>
        </div>

        <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--patiya-color-border)"
              strokeWidth="4"
              strokeDasharray="188.5"
              strokeDashoffset="47.1"
              strokeLinecap="round"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--patiya-color-primary)"
              strokeWidth="4"
              strokeDasharray="188.5"
              animate={{ strokeDashoffset: 188.5 - (value / 100) * 141.4 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              strokeLinecap="round"
            />
          </svg>

          {ticks.map((tickVal, i) => {
            const tickAngle = (tickVal / 100) * 270 - 135;
            const isTickActive = tickVal <= value;
            return (
              <div
                key={i}
                className="absolute w-full h-full flex justify-center items-start pointer-events-none"
                style={{ transform: `rotate(${tickAngle}deg)` }}
              >
                <div
                  className={`w-0.5 ${tickVal % 25 === 0 ? "h-3" : "h-1.5"} rounded-full transition-colors ${
                    isTickActive
                      ? "bg-[var(--patiya-color-primary)]"
                      : "bg-[var(--patiya-color-border)]"
                  }`}
                />
              </div>
            );
          })}

          <motion.div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-center relative cursor-grab active:cursor-grabbing shadow-inner"
            animate={{ rotate: angle }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute top-2 w-2 h-2 rounded-full bg-[var(--patiya-color-primary)] shadow-sm" />
            <div className="w-12 h-12 rounded-full border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] flex items-center justify-center">
              <span
                className="text-[10px] font-mono font-bold text-[var(--patiya-color-foreground)] pointer-events-none"
                style={{ transform: `rotate(${-angle}deg)` }}
              >
                {value}%
              </span>
            </div>
          </motion.div>
        </div>

        <div className="w-full flex items-center justify-between gap-1.5 pt-1">
          <button
            onClick={() => setValue(Math.max(0, value - 5))}
            className="px-2.5 py-1.5 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-xs font-mono font-bold transition-colors"
          >
            -5%
          </button>
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setValue(p)}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono font-semibold transition-colors ${
                  value === p
                    ? "bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)]"
                    : "border border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
          <button
            onClick={() => setValue(Math.min(100, value + 5))}
            className="px-2.5 py-1.5 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-xs font-mono font-bold transition-colors"
          >
            +5%
          </button>
        </div>
      </div>
    </div>
  );
};

export const SpatialCoordinatePadPreview = () => {
  const [pos, setPos] = useState({ x: 30, y: -25 });

  const presets = [
    { label: "Origin", x: 0, y: 0 },
    { label: "Top-R", x: 50, y: -40 },
    { label: "Bot-L", x: -50, y: 40 },
    { label: "Peak", x: 0, y: -55 },
  ];

  const magnitude = Math.sqrt(pos.x * pos.x + pos.y * pos.y).toFixed(1);

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      <div className="p-3.5 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--patiya-color-border)]">
          <div>
            <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
              2D Vector Surface
            </h4>
            <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
              Dual-Axis Elastic Physics
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)]">
              X: {pos.x > 0 ? `+${pos.x}` : pos.x}
            </span>
            <span className="px-2 py-0.5 rounded bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)]">
              Y: {pos.y > 0 ? `+${pos.y}` : pos.y}
            </span>
            <span className="px-2 py-0.5 rounded bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] font-bold">
              |V|: {magnitude}
            </span>
          </div>
        </div>

        <div className="relative w-full h-52 sm:h-60 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/80 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-px bg-[var(--patiya-color-border)]/70" />
            <div className="absolute h-full w-px bg-[var(--patiya-color-border)]/70" />
            <div className="absolute w-24 h-24 rounded-full border border-[var(--patiya-color-border)]/40" />
            <div className="absolute w-44 h-44 rounded-full border border-[var(--patiya-color-border)]/30" />
          </div>

          <motion.div
            drag
            dragConstraints={{ left: -85, right: 85, top: -75, bottom: 75 }}
            dragElastic={0.25}
            onDrag={(_, info) => {
              setPos({
                x: Math.round(info.offset.x + pos.x),
                y: Math.round(info.offset.y + pos.y),
              });
            }}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 w-11 h-11 rounded-full border-2 border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/20 backdrop-blur-md flex items-center justify-center cursor-grab active:cursor-grabbing shadow-sm"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--patiya-color-primary)] animate-ping" />
            <div className="absolute w-2 h-2 rounded-full bg-[var(--patiya-color-primary)]" />
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <span className="text-[11px] text-[var(--patiya-color-muted-foreground)]">
            Presets:
          </span>
          <div className="flex gap-1.5">
            {presets.map((pr) => (
              <button
                key={pr.label}
                onClick={() => setPos({ x: pr.x, y: pr.y })}
                className="px-2.5 py-1 rounded-lg border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-[11px] font-semibold transition-colors"
              >
                {pr.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ElasticSpringSliderPreview = () => {
  const [value, setValue] = useState(68);
  const detents = [0, 25, 50, 75, 100];

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      <div className="p-3.5 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
          <div>
            <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
              Elastic Fluid Fader
            </h4>
            <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
              Magnetic Detent Stops
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)]">
            {value}%
          </span>
        </div>

        <div className="space-y-4 pt-2">
          <div
            className="relative h-10 flex items-center cursor-pointer px-1"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const pct = Math.round(
                Math.max(0, Math.min(100, (clickX / rect.width) * 100)),
              );
              setValue(pct);
            }}
          >
            <div className="w-full h-3 rounded-full bg-[var(--patiya-color-muted)] overflow-hidden relative border border-[var(--patiya-color-border)]">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--patiya-color-primary)]/70 to-[var(--patiya-color-primary)]"
                animate={{ width: `${value}%` }}
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
              />
            </div>

            <motion.div
              className="absolute -top-7 -ml-3.5 px-1.5 py-0.5 rounded bg-[var(--patiya-color-foreground)] text-[var(--patiya-color-background)] text-[10px] font-mono font-bold pointer-events-none shadow-sm"
              animate={{ left: `${value}%` }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
            >
              {value}
            </motion.div>

            <motion.div
              className="absolute w-6 h-6 rounded-full border-2 border-[var(--patiya-color-background)] bg-[var(--patiya-color-primary)] -ml-3 shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing"
              animate={{ left: `${value}%` }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--patiya-color-background)]" />
            </motion.div>
          </div>

          <div className="flex justify-between items-center px-1">
            {detents.map((d) => (
              <button
                key={d}
                onClick={() => setValue(d)}
                className="flex flex-col items-center gap-1 group"
              >
                <div
                  className={`w-1 h-2 rounded-full transition-colors ${value >= d ? "bg-[var(--patiya-color-primary)]" : "bg-[var(--patiya-color-border)]"}`}
                />
                <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] group-hover:text-[var(--patiya-color-foreground)]">
                  {d}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={() => setValue(0)}
            className="px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-xs font-semibold text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors"
          >
            Mute
          </button>
          <div className="flex gap-1.5">
            <button
              onClick={() => setValue(Math.max(0, value - 10))}
              className="px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-xs font-mono font-bold transition-colors"
            >
              -10
            </button>
            <button
              onClick={() => setValue(Math.min(100, value + 10))}
              className="px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-xs font-mono font-bold transition-colors"
            >
              +10
            </button>
          </div>
          <button
            onClick={() => setValue(100)}
            className="px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-xs font-semibold text-[var(--patiya-color-foreground)] transition-colors"
          >
            Max
          </button>
        </div>
      </div>
    </div>
  );
};

export const MorphingArcMenuPreview = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Microphone");

  const actions = [
    { id: "mic", label: "Microphone", icon: "🎙" },
    { id: "cam", label: "Camera", icon: "📷" },
    { id: "screen", label: "Screen Share", icon: "🖥" },
    { id: "cast", label: "AirPlay Cast", icon: "📡" },
    { id: "snap", label: "Snapshot", icon: "⚡" },
  ];

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] flex flex-col items-center space-y-6">
        <div className="w-full flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
          <div>
            <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
              Radial Action Arc
            </h4>
            <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
              Staggered Spring Bloom
            </p>
          </div>
          <span className="text-[11px] font-semibold text-[var(--patiya-color-primary)]">
            Active: {activeItem}
          </span>
        </div>

        <div className="relative w-56 h-40 flex items-end justify-center pb-2">
          <AnimatePresence>
            {isOpen &&
              actions.map((act, idx) => {
                const total = actions.length;
                const angle = Math.PI + (Math.PI / (total - 1)) * idx;
                const radius = 78;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.button
                    key={act.id}
                    onClick={() => setActiveItem(act.label)}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, scale: 1, x, y }}
                    exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 24,
                      delay: idx * 0.04,
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.92 }}
                    className={`absolute w-10 h-10 rounded-full border flex items-center justify-center text-sm shadow-sm transition-colors ${
                      activeItem === act.label
                        ? "border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/20 text-[var(--patiya-color-primary)]"
                        : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] hover:border-[var(--patiya-color-primary)]/50"
                    }`}
                  >
                    <span>{act.icon}</span>
                  </motion.button>
                );
              })}
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-10 w-12 h-12 rounded-full bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] flex items-center justify-center shadow-md font-bold text-lg"
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              +
            </motion.span>
          </motion.button>
        </div>

        <div className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-xs">
          <span className="text-[var(--patiya-color-muted-foreground)]">
            Tap center button to toggle arc
          </span>
          <span className="font-mono text-[10px] font-semibold text-[var(--patiya-color-foreground)]">
            {isOpen ? "Expanded" : "Collapsed"}
          </span>
        </div>
      </div>
    </div>
  );
};

export const HapticKeypadMatrixPreview = () => {
  const [activePad, setActivePad] = useState<number | null>(null);
  const [bank, setBank] = useState("Bank A");
  const [lastTriggered, setLastTriggered] = useState("BD-01");

  const padsA = [
    { id: 1, code: "BD-01", name: "Sub Kick" },
    { id: 2, code: "SD-02", name: "Snap Snare" },
    { id: 3, code: "CH-03", name: "Closed Hat" },
    { id: 4, code: "OH-04", name: "Open Hat" },
    { id: 5, code: "CP-05", name: "Tight Clap" },
    { id: 6, code: "RS-06", name: "Rim Shot" },
    { id: 7, code: "808-07", name: "Deep Bass" },
    { id: 8, code: "FX-08", name: "Glitch Hit" },
    { id: 9, code: "VC-09", name: "Vox Chop" },
  ];

  const padsB = [
    { id: 1, code: "SYN-1", name: "Warm Pad" },
    { id: 2, code: "SYN-2", name: "Saw Lead" },
    { id: 3, code: "PLK-3", name: "Pluck" },
    { id: 4, code: "ARP-4", name: "Square Arp" },
    { id: 5, code: "STB-5", name: "Dub Chord" },
    { id: 6, code: "SUB-6", name: "Sine Sub" },
    { id: 7, code: "BEL-7", name: "FM Bell" },
    { id: 8, code: "NOI-8", name: "White Noise" },
    { id: 9, code: "SWP-9", name: "Filter Sweep" },
  ];

  const currentPads = bank === "Bank A" ? padsA : padsB;

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      <div className="p-3.5 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--patiya-color-border)]">
          <div>
            <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
              Haptic Velocity Pad
            </h4>
            <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
              3x3 Physical Depress Matrix
            </p>
          </div>
          <div className="flex p-0.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
            {["Bank A", "Bank B"].map((b) => (
              <button
                key={b}
                onClick={() => setBank(b)}
                className="relative px-2.5 py-1 text-[11px] font-semibold"
              >
                {bank === b && (
                  <motion.div
                    layoutId="pad-bank-pill"
                    className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/30"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${bank === b ? "text-[var(--patiya-color-primary)]" : "text-[var(--patiya-color-muted-foreground)]"}`}
                >
                  {b}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          {currentPads.map((pad) => {
            const isHit = activePad === pad.id;
            return (
              <motion.button
                key={pad.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.93, y: 2 }}
                onClick={() => {
                  setActivePad(pad.id);
                  setLastTriggered(pad.code);
                  setTimeout(() => setActivePad(null), 250);
                }}
                className={`relative p-3 sm:p-4 rounded-xl border flex flex-col justify-between h-20 sm:h-22 transition-all ${
                  isHit
                    ? "border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/20 shadow-sm"
                    : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] hover:border-[var(--patiya-color-primary)]/40"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                    {pad.id}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isHit ? "bg-[var(--patiya-color-primary)] animate-ping" : "bg-[var(--patiya-color-border)]"}`}
                  />
                </div>
                <div className="text-left">
                  <h5 className="text-xs font-mono font-bold text-[var(--patiya-color-foreground)] truncate">
                    {pad.code}
                  </h5>
                  <p className="text-[9px] text-[var(--patiya-color-muted-foreground)] truncate">
                    {pad.name}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--patiya-color-muted-foreground)]">
              Last:
            </span>
            <span className="font-bold text-[var(--patiya-color-primary)]">
              {lastTriggered}
            </span>
          </div>
          <span className="text-[var(--patiya-color-muted-foreground)]">
            128.0 BPM • MIDI CH 10
          </span>
        </div>
      </div>
    </div>
  );
};

export const InteractiveGestureDeckPreview = () => {
  const initialCards = [
    {
      id: 1,
      title: "Release v3.4.0",
      tag: "Production",
      desc: "Deploy canary container to us-east clusters",
      score: "99.8%",
    },
    {
      id: 2,
      title: "Database Re-index",
      tag: "Maintenance",
      desc: "Vacuum analyzed partition blocks on Postgres",
      score: "100%",
    },
    {
      id: 3,
      title: "Edge Cache Flush",
      tag: "CDN Network",
      desc: "Purge stale static assets across 300+ PoPs",
      score: "94.2%",
    },
    {
      id: 4,
      title: "SSL Certificate",
      tag: "Security",
      desc: "Auto-renew wildcard cert for *.patiya.io",
      score: "100%",
    },
  ];

  const [cards, setCards] = useState(initialCards);
  const [exitDirection, setExitDirection] = useState<"left" | "right">("right");

  const handleDismiss = (id: number, direction: "left" | "right" = "right") => {
    setExitDirection(direction);
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleReset = () => {
    setExitDirection("right");
    setCards(initialCards);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      <div className="p-3.5 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
          <div>
            <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
              Spatial Gesture Deck
            </h4>
            <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
              Swipe Horizon Discard
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)]">
            {cards.length} Remaining
          </span>
        </div>

        <div className="relative h-44 sm:h-48 w-full flex items-center justify-center">
          <AnimatePresence custom={exitDirection}>
            {cards.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-2"
              >
                <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                  All task cards completed!
                </p>
                <button
                  onClick={handleReset}
                  className="px-3.5 py-1.5 rounded-xl bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] text-xs font-semibold"
                >
                  Reset Deck
                </button>
              </motion.div>
            ) : (
              cards.map((card, idx) => {
                const isTop = idx === 0;
                return (
                  <motion.div
                    key={card.id}
                    layout
                    custom={exitDirection}
                    drag={isTop ? "x" : false}
                    dragConstraints={{ left: -140, right: 140 }}
                    dragElastic={0.4}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -80) {
                        handleDismiss(card.id, "left");
                      } else if (info.offset.x > 80) {
                        handleDismiss(card.id, "right");
                      }
                    }}
                    initial={{ scale: 0.9, y: 14 }}
                    animate={{
                      scale: 1 - idx * 0.04,
                      y: idx * 8,
                      zIndex: cards.length - idx,
                      opacity: idx > 2 ? 0 : 1 - idx * 0.15,
                    }}
                    variants={{
                      exit: (dir: "left" | "right") => ({
                        x: dir === "left" ? -300 : 300,
                        rotate: dir === "left" ? -20 : 20,
                        opacity: 0,
                        transition: { duration: 0.28, ease: "easeOut" },
                      }),
                    }}
                    exit="exit"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className={`absolute w-full p-4 rounded-xl border bg-[var(--patiya-color-background)] space-y-2 shadow-sm ${
                      isTop
                        ? "cursor-grab active:cursor-grabbing border-[var(--patiya-color-primary)]/50"
                        : "border-[var(--patiya-color-border)] pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)]">
                        {card.tag}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-500">
                        {card.score}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-[var(--patiya-color-foreground)] truncate">
                      {card.title}
                    </h5>
                    <p className="text-[11px] text-[var(--patiya-color-muted-foreground)] line-clamp-1">
                      {card.desc}
                    </p>
                    <div className="text-[10px] font-mono text-[var(--patiya-color-primary)] pt-1 flex justify-between">
                      <span>← Reject (left)</span>
                      <span>Approve (right) →</span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            disabled={cards.length === 0}
            onClick={() => cards[0] && handleDismiss(cards[0].id, "left")}
            className="px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-xs font-semibold text-rose-500 disabled:opacity-40 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={handleReset}
            className="px-2.5 py-1 text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors"
          >
            Reset
          </button>
          <button
            disabled={cards.length === 0}
            onClick={() => cards[0] && handleDismiss(cards[0].id, "right")}
            className="px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-xs font-semibold text-emerald-500 disabled:opacity-40 transition-colors"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export const BezierCurveSurfacePreview = () => {
  const [p1, setP1] = useState({ x: 0.25, y: 0.1 });
  const [p2, setP2] = useState({ x: 0.25, y: 1.0 });
  const [preset, setPreset] = useState("Ease");
  const [copied, setCopied] = useState(false);

  const presets = [
    { label: "Ease", p1: { x: 0.25, y: 0.1 }, p2: { x: 0.25, y: 1.0 } },
    { label: "Linear", p1: { x: 0.0, y: 0.0 }, p2: { x: 1.0, y: 1.0 } },
    { label: "Ease-In", p1: { x: 0.42, y: 0.0 }, p2: { x: 1.0, y: 1.0 } },
    { label: "Ease-Out", p1: { x: 0.0, y: 0.0 }, p2: { x: 0.58, y: 1.0 } },
    { label: "Spring", p1: { x: 0.34, y: 1.4 }, p2: { x: 0.64, y: 1.0 } },
  ];

  const applyPreset = (pr: (typeof presets)[0]) => {
    setPreset(pr.label);
    setP1(pr.p1);
    setP2(pr.p2);
  };

  const x1 = 20 + p1.x * 160;
  const y1 = 180 - p1.y * 160;
  const x2 = 20 + p2.x * 160;
  const y2 = 180 - p2.y * 160;
  const pathD = `M 20 180 C ${x1} ${y1}, ${x2} ${y2}, 180 20`;
  const bezierString = `cubic-bezier(${p1.x.toFixed(2)}, ${p1.y.toFixed(2)}, ${p2.x.toFixed(2)}, ${p2.y.toFixed(2)})`;

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      <div className="p-3.5 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--patiya-color-border)]">
          <div>
            <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
              Bezier Timing Curve
            </h4>
            <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
              Interactive Spline Inspector
            </p>
          </div>
          <button
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-2.5 py-1 rounded-lg border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-[10px] font-mono font-bold transition-colors"
          >
            {copied ? "Copied" : "Copy CSS"}
          </button>
        </div>

        <div className="relative w-full h-48 sm:h-52 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-center p-2">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <line
              x1="20"
              y1="180"
              x2="180"
              y2="180"
              stroke="var(--patiya-color-border)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <line
              x1="20"
              y1="20"
              x2="180"
              y2="20"
              stroke="var(--patiya-color-border)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <line
              x1="20"
              y1="20"
              x2="20"
              y2="180"
              stroke="var(--patiya-color-border)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <line
              x1="180"
              y1="20"
              x2="180"
              y2="180"
              stroke="var(--patiya-color-border)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            <line
              x1="20"
              y1="180"
              x2={x1}
              y2={y1}
              stroke="var(--patiya-color-primary)"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <line
              x1="180"
              y1="20"
              x2={x2}
              y2={y2}
              stroke="var(--patiya-color-primary)"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />

            <motion.path
              d={pathD}
              fill="none"
              stroke="var(--patiya-color-primary)"
              strokeWidth="3"
              strokeLinecap="round"
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            />

            <circle
              cx="20"
              cy="180"
              r="4"
              fill="var(--patiya-color-foreground)"
            />
            <circle
              cx="180"
              cy="20"
              r="4"
              fill="var(--patiya-color-foreground)"
            />

            <motion.circle
              cx={x1}
              cy={y1}
              r="6"
              fill="var(--patiya-color-background)"
              stroke="var(--patiya-color-primary)"
              strokeWidth="2.5"
              className="cursor-pointer"
            />
            <motion.circle
              cx={x2}
              cy={y2}
              r="6"
              fill="var(--patiya-color-primary)"
              stroke="var(--patiya-color-background)"
              strokeWidth="2"
              className="cursor-pointer"
            />
          </svg>
        </div>

        <div className="flex p-0.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] overflow-x-auto no-scrollbar">
          {presets.map((pr) => (
            <button
              key={pr.label}
              onClick={() => applyPreset(pr)}
              className="relative shrink-0 sm:flex-1 px-3 sm:px-2 py-1 text-[11px] font-semibold transition-colors"
            >
              {preset === pr.label && (
                <motion.div
                  layoutId="bezier-preset-pill"
                  className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/30"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${preset === pr.label ? "text-[var(--patiya-color-primary)]" : "text-[var(--patiya-color-muted-foreground)]"}`}
              >
                {pr.label}
              </span>
            </button>
          ))}
        </div>

        <div className="p-2.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--patiya-color-muted-foreground)] truncate pr-2">
            {bezierString}
          </span>
          <span className="text-[10px] font-bold text-[var(--patiya-color-primary)] shrink-0">
            CSS Ready
          </span>
        </div>
      </div>
    </div>
  );
};

export const PaletteGradientTunerPreview = () => {
  const [stops, setStops] = useState([
    { id: 1, pos: 0, color: "#6366f1" },
    { id: 2, pos: 50, color: "#a855f7" },
    { id: 3, pos: 100, color: "#ec4899" },
  ]);
  const [activeStop, setActiveStop] = useState(2);
  const [angle, setAngle] = useState(90);
  const [copied, setCopied] = useState(false);

  const colors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#a855f7",
    "#ec4899",
  ];

  const gradientCSS = `linear-gradient(${angle}deg, ${stops.map((s) => `${s.color} ${s.pos}%`).join(", ")})`;

  const updateColor = (newColor: string) => {
    setStops((prev) =>
      prev.map((s) => (s.id === activeStop ? { ...s, color: newColor } : s)),
    );
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      <div className="p-3.5 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--patiya-color-border)]">
          <div>
            <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
              Gradient Color Tuner
            </h4>
            <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
              Interactive Multi-Stop Ramp
            </p>
          </div>
          <button
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-2.5 py-1 rounded-lg border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-[10px] font-mono font-bold transition-colors"
          >
            {copied ? "Copied" : "Copy Token"}
          </button>
        </div>

        <div
          className="h-28 rounded-xl border border-[var(--patiya-color-border)] overflow-hidden shadow-inner"
          style={{ background: gradientCSS }}
        />

        <div className="space-y-2">
          <div className="relative h-6 flex items-center px-2">
            <div className="w-full h-2 rounded-full bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)]" />
            {stops.map((stop) => (
              <motion.button
                key={stop.id}
                onClick={() => setActiveStop(stop.id)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute w-5 h-5 rounded-full border-2 border-[var(--patiya-color-background)] -ml-2.5 shadow-md flex items-center justify-center ${
                  activeStop === stop.id
                    ? "ring-2 ring-[var(--patiya-color-primary)]"
                    : ""
                }`}
                style={{ left: `${stop.pos}%`, backgroundColor: stop.color }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar pt-1">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => updateColor(c)}
                className="w-6 h-6 rounded-lg border border-[var(--patiya-color-border)] shrink-0 transition-transform hover:scale-110 active:scale-95"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-1.5 pt-1 text-xs">
          <div className="flex gap-1">
            {[0, 45, 90, 135, 180].map((deg) => (
              <button
                key={deg}
                onClick={() => setAngle(deg)}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono font-semibold transition-colors ${
                  angle === deg
                    ? "bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)]"
                    : "border border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)]"
                }`}
              >
                {deg}°
              </button>
            ))}
          </div>
          <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            3 Stops Active
          </span>
        </div>
      </div>
    </div>
  );
};

export const LayerHierarchyTreePreview = () => {
  const [layers, setLayers] = useState([
    {
      id: "1",
      name: "Artboard Frame",
      type: "frame",
      expanded: true,
      visible: true,
      locked: false,
      depth: 0,
    },
    {
      id: "2",
      name: "Header Navigation",
      type: "group",
      expanded: true,
      visible: true,
      locked: false,
      depth: 1,
    },
    {
      id: "3",
      name: "Brand Logo SVG",
      type: "vector",
      expanded: false,
      visible: true,
      locked: false,
      depth: 2,
    },
    {
      id: "4",
      name: "Menu Links",
      type: "group",
      expanded: false,
      visible: true,
      locked: false,
      depth: 2,
    },
    {
      id: "5",
      name: "Hero Showcase",
      type: "frame",
      expanded: true,
      visible: true,
      locked: false,
      depth: 1,
    },
    {
      id: "6",
      name: "Display Heading",
      type: "text",
      expanded: false,
      visible: true,
      locked: false,
      depth: 2,
    },
    {
      id: "7",
      name: "Action Button CTA",
      type: "component",
      expanded: false,
      visible: true,
      locked: true,
      depth: 2,
    },
    {
      id: "8",
      name: "Backdrop Particle Glow",
      type: "vector",
      expanded: false,
      visible: false,
      locked: false,
      depth: 1,
    },
  ]);
  const [selectedId, setSelectedId] = useState("7");

  const toggleVisible = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)),
    );
  };

  const toggleLock = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, locked: !l.locked } : l)),
    );
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      <div className="p-3.5 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
          <div>
            <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
              Layer Hierarchy Tree
            </h4>
            <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
              Canvas Document Outline
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] font-bold">
            {layers.filter((l) => l.visible).length} Visible
          </span>
        </div>

        <div className="space-y-1 max-h-56 overflow-y-auto no-scrollbar">
          {layers.map((layer) => {
            const isSelected = selectedId === layer.id;
            return (
              <motion.div
                key={layer.id}
                onClick={() => setSelectedId(layer.id)}
                className={`relative flex items-center justify-between px-2.5 py-1.5 rounded-xl cursor-pointer text-xs transition-colors ${
                  !layer.visible ? "opacity-40" : "opacity-100"
                } ${isSelected ? "text-[var(--patiya-color-primary)]" : "text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/50"}`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-layer-pill"
                    className="absolute inset-0 rounded-xl bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/20"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <div
                  className="relative z-10 flex items-center gap-1.5 truncate"
                  style={{ paddingLeft: `${layer.depth * 14}px` }}
                >
                  <span className="text-[10px] text-[var(--patiya-color-muted-foreground)]">
                    {layer.type === "frame"
                      ? "⊡"
                      : layer.type === "text"
                        ? "T"
                        : layer.type === "component"
                          ? "❖"
                          : "◇"}
                  </span>
                  <span className="font-medium truncate">{layer.name}</span>
                </div>
                <div className="relative z-10 flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => toggleLock(layer.id, e)}
                    className="text-[11px] hover:text-[var(--patiya-color-foreground)]"
                  >
                    {layer.locked ? "🔒" : "🔓"}
                  </button>
                  <button
                    onClick={(e) => toggleVisible(layer.id, e)}
                    className="text-[11px] hover:text-[var(--patiya-color-foreground)]"
                  >
                    {layer.visible ? "👁" : "⎯"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-[var(--patiya-color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--patiya-color-muted-foreground)]">
          <span>Selected: {layers.find((l) => l.id === selectedId)?.name}</span>
          <span>Depth: 2</span>
        </div>
      </div>
    </div>
  );
};

export const StudioTrackArrangerPreview = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [loop, setLoop] = useState(true);
  const [tracks, setTracks] = useState([
    {
      id: 1,
      name: "01 Drums",
      muted: false,
      solo: false,
      color: "#3b82f6",
      clips: [
        { start: 0, width: 45 },
        { start: 50, width: 45 },
      ],
    },
    {
      id: 2,
      name: "02 Bassline",
      muted: false,
      solo: false,
      color: "#8b5cf6",
      clips: [
        { start: 10, width: 35 },
        { start: 55, width: 40 },
      ],
    },
    {
      id: 3,
      name: "03 Vocals",
      muted: false,
      solo: false,
      color: "#ec4899",
      clips: [
        { start: 20, width: 30 },
        { start: 60, width: 35 },
      ],
    },
  ]);

  const toggleMute = (id: number) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, muted: !t.muted } : t)),
    );
  };

  const toggleSolo = (id: number) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, solo: !t.solo } : t)),
    );
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      <div className="p-3.5 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--patiya-color-border)]">
          <div>
            <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
              Audio Stem Arranger
            </h4>
            <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
              Multi-Track Sequencer
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setLoop(!loop)}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-semibold transition-colors ${
                loop
                  ? "bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)]"
                  : "border border-[var(--patiya-color-border)]"
              }`}
            >
              Loop
            </button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1 rounded-lg bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] text-xs font-semibold"
            >
              {isPlaying ? "Pause" : "Play"}
            </motion.button>
          </div>
        </div>

        <div className="relative space-y-2 pt-1">
          {isPlaying && (
            <motion.div
              className="absolute top-0 bottom-0 w-0.5 bg-[var(--patiya-color-primary)] z-20 pointer-events-none shadow-sm"
              animate={{ left: ["0%", "100%"] }}
              transition={{
                duration: 4,
                repeat: loop ? Infinity : 0,
                ease: "linear",
              }}
            />
          )}

          {tracks.map((track) => (
            <div key={track.id} className="flex items-center gap-2">
              <div className="w-24 shrink-0 flex items-center justify-between p-1.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
                <span className="text-[10px] font-mono font-bold truncate pr-1">
                  {track.name}
                </span>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => toggleMute(track.id)}
                    className={`w-4 h-4 rounded text-[9px] font-bold ${
                      track.muted
                        ? "bg-rose-500 text-white"
                        : "bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]"
                    }`}
                  >
                    M
                  </button>
                  <button
                    onClick={() => toggleSolo(track.id)}
                    className={`w-4 h-4 rounded text-[9px] font-bold ${
                      track.solo
                        ? "bg-amber-500 text-white"
                        : "bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]"
                    }`}
                  >
                    S
                  </button>
                </div>
              </div>

              <div
                className={`relative flex-1 h-8 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] overflow-hidden transition-opacity ${
                  track.muted ? "opacity-30" : "opacity-100"
                }`}
              >
                {track.clips.map((clip, i) => (
                  <div
                    key={i}
                    className="absolute top-1 bottom-1 rounded-md border border-[var(--patiya-color-border)] flex items-center px-1.5"
                    style={{
                      left: `${clip.start}%`,
                      width: `${clip.width}%`,
                      backgroundColor: `${track.color}25`,
                    }}
                  >
                    <div className="w-full flex items-center gap-0.5 overflow-hidden">
                      {Array.from({ length: 8 }).map((_, j) => (
                        <div
                          key={j}
                          className="w-1 rounded-full shrink-0"
                          style={{
                            height: `${Math.max(20, ((j * 17) % 70) + 20)}%`,
                            backgroundColor: track.color,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] pt-1">
          <span>00:00:00</span>
          <span>124.0 BPM • 4/4 TIME</span>
          <span>00:04:00</span>
        </div>
      </div>
    </div>
  );
};

export const AssetPipelineDropzonePreview = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "hero-mesh-scene.glb",
      size: "14.2 MB",
      progress: 100,
      status: "ready",
    },
    {
      id: 2,
      name: "brand-vectors-master.svg",
      size: "480 KB",
      progress: 74,
      status: "uploading",
    },
    {
      id: 3,
      name: "motion-manifest.json",
      size: "64 KB",
      progress: 32,
      status: "uploading",
    },
  ]);

  const addFile = () => {
    const newId = Date.now();
    setFiles((prev) => [
      ...prev,
      {
        id: newId,
        name: `clip-render-${prev.length + 1}.mp4`,
        size: "6.8 MB",
        progress: 20,
        status: "uploading",
      },
    ]);
  };

  const removeFile = (id: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      <div className="p-3.5 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
          <div>
            <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
              Asset Intake Pipeline
            </h4>
            <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
              Cloud Ingestion Hub
            </p>
          </div>
          <button
            onClick={addFile}
            className="px-2.5 py-1 rounded-lg bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] text-[10px] font-semibold"
          >
            + Add Asset
          </button>
        </div>

        <div className="p-4 rounded-xl border border-dashed border-[var(--patiya-color-primary)]/50 bg-[var(--patiya-color-background)] flex flex-col items-center justify-center text-center space-y-1">
          <svg
            className="w-6 h-6 text-[var(--patiya-color-primary)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className="text-xs font-semibold text-[var(--patiya-color-foreground)]">
            Drag 3D assets or media here
          </p>
          <p className="text-[10px] text-[var(--patiya-color-muted-foreground)] font-mono">
            GLB, MP4, SVG up to 100MB
          </p>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
          <AnimatePresence>
            {files.map((file) => (
              <motion.div
                key={file.id}
                layout
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-2.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 truncate pr-2">
                    <span className="text-[10px]">📄</span>
                    <span className="font-mono font-bold text-[var(--patiya-color-foreground)] truncate">
                      {file.name}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-xs text-[var(--patiya-color-muted-foreground)] hover:text-rose-500"
                  >
                    ✕
                  </button>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--patiya-color-muted)] overflow-hidden">
                  <motion.div
                    className={`h-full ${file.progress === 100 ? "bg-emerald-500" : "bg-[var(--patiya-color-primary)]"}`}
                    animate={{ width: `${file.progress}%` }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                  <span>{file.size}</span>
                  <span
                    className={
                      file.progress === 100 ? "text-emerald-500 font-bold" : ""
                    }
                  >
                    {file.progress === 100 ? "Complete" : `${file.progress}%`}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const DynamicIslandHubPreview = () => {
  const [mode, setMode] = useState<"compact" | "call" | "timer" | "music">(
    "music",
  );
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none flex flex-col items-center space-y-5">
      <div className="w-full flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Morphing Dynamic Hub
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Fluid Island Multi-State Pill
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] uppercase">
          {mode}
        </span>
      </div>

      <div className="min-h-36 flex items-center justify-center w-full">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-3 text-[var(--patiya-color-foreground)] overflow-hidden shadow-lg"
          style={{
            width:
              mode === "compact"
                ? "200px"
                : mode === "call"
                  ? "300px"
                  : mode === "timer"
                    ? "260px"
                    : "320px",
          }}
        >
          <AnimatePresence mode="wait">
            {mode === "compact" && (
              <motion.div
                key="compact"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-between px-2 py-0.5 text-xs font-mono"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold">AirPods Pro</span>
                </div>
                <span className="text-emerald-500 font-bold">84%</span>
              </motion.div>
            )}

            {mode === "call" && (
              <motion.div
                key="call"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="space-y-3 p-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                      SC
                    </div>
                    <div>
                      <h5 className="text-xs font-bold">Sarah Connor</h5>
                      <p className="text-[10px] text-[var(--patiya-color-muted-foreground)] font-mono">
                        Incoming Audio Call...
                      </p>
                    </div>
                  </div>
                  <div className="flex items-end gap-0.5 h-4">
                    {[12, 18, 8, 20, 14].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [4, h, 4] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        className="w-1 bg-emerald-500 rounded-full"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <button className="flex-1 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-semibold">
                    Decline
                  </button>
                  <button className="flex-1 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-semibold">
                    Accept
                  </button>
                </div>
              </motion.div>
            )}

            {mode === "timer" && (
              <motion.div
                key="timer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-between p-1.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full border-2 border-amber-500 flex items-center justify-center text-[10px] font-mono text-amber-500 font-bold">
                    ⏱
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[var(--patiya-color-muted-foreground)]">
                      Focus Timer
                    </span>
                    <h5 className="text-sm font-mono font-bold text-amber-500">
                      14:28
                    </h5>
                  </div>
                </div>
                <button className="px-3 py-1 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-xs font-semibold">
                  Pause
                </button>
              </motion.div>
            )}

            {mode === "music" && (
              <motion.div
                key="music"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="space-y-2 p-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 shrink-0 flex items-center justify-center text-white text-xs">
                      ♫
                    </div>
                    <div className="truncate">
                      <h5 className="text-xs font-bold truncate">Starboy</h5>
                      <p className="text-[10px] text-[var(--patiya-color-muted-foreground)] truncate font-mono">
                        The Weeknd • Daft Punk
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-7 h-7 rounded-full bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] flex items-center justify-center text-xs font-bold"
                    >
                      {isPlaying ? "❚❚" : "▶"}
                    </button>
                  </div>
                </div>
                <div className="w-full h-1 bg-[var(--patiya-color-muted)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--patiya-color-primary)]"
                    animate={{
                      width: isPlaying ? ["30%", "75%", "30%"] : "45%",
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="w-full flex p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] gap-1 overflow-x-auto no-scrollbar">
        {(["compact", "call", "timer", "music"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="relative flex-1 py-1.5 px-2 text-xs font-semibold capitalize shrink-0 sm:shrink transition-colors"
          >
            {mode === m && (
              <motion.div
                layoutId="island-mode-pill"
                className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/30"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 ${mode === m ? "text-[var(--patiya-color-primary)] font-bold" : "text-[var(--patiya-color-muted-foreground)]"}`}
            >
              {m}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export const HolographicTiltCardPreview = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -14;
    const rotY = ((x - centerX) / centerX) * 14;
    setRotate({ x: rotX, y: rotY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none flex flex-col items-center space-y-4">
      <div className="w-full flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Holographic 3D Card
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Multi-Axis Gyro Parallax
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold text-emerald-500">
          Titanium Tier
        </span>
      </div>

      <div className="py-4 w-full flex justify-center">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ rotateX: rotate.x, rotateY: rotate.y }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-72 sm:w-80 h-44 sm:h-48 rounded-2xl border border-[var(--patiya-color-border)] bg-gradient-to-br from-zinc-900 via-neutral-900 to-black p-5 text-white overflow-hidden shadow-2xl cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            }}
          />

          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
              backgroundSize: "16px 16px",
            }}
          />

          <div
            className="relative h-full flex flex-col justify-between"
            style={{ transform: "translateZ(24px)" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 rounded-md border border-amber-400/80 bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center shadow-inner">
                  <div className="w-4 h-3 border border-amber-800/40 rounded-sm" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 font-semibold">
                  PATIYA VAULT
                </span>
              </div>
              <svg
                className="w-5 h-5 text-zinc-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
            </div>

            <div className="font-mono text-base tracking-widest font-bold text-zinc-200">
              •••• •••• •••• 8842
            </div>

            <div className="flex items-end justify-between text-xs font-mono">
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block">
                  Cardholder
                </span>
                <span className="font-bold tracking-wider text-zinc-300">
                  ALEXANDER R.
                </span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block">
                  Expires
                </span>
                <span className="font-bold text-zinc-300">09/29</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 opacity-80" />
            </div>
          </div>
        </motion.div>
      </div>

      <p className="text-[11px] font-mono text-[var(--patiya-color-muted-foreground)]">
        Hover or drag to inspect 3D metallic depth
      </p>
    </div>
  );
};

export const MagneticFluidMetaballPreview = () => {
  const [puck, setPuck] = useState({ x: 45, y: -25 });

  const dist = Math.sqrt(puck.x * puck.x + puck.y * puck.y);
  const tension = Math.min(100, Math.round((dist / 110) * 100));

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Fluid Membrane Node
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Viscous Elastic Spring Tether
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-[var(--patiya-color-primary)]">
          Tension: {tension}%
        </span>
      </div>

      <div className="relative w-full h-48 sm:h-52 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-center overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line
            x1="50%"
            y1="50%"
            x2={`calc(50% + ${puck.x}px)`}
            y2={`calc(50% + ${puck.y}px)`}
            stroke="var(--patiya-color-primary)"
            strokeWidth={Math.max(2, 10 - (dist / 110) * 8)}
            strokeLinecap="round"
            strokeOpacity={Math.max(0.2, 1 - dist / 120)}
          />
        </svg>

        <div className="absolute w-14 h-14 rounded-full border-2 border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] flex items-center justify-center shadow-inner pointer-events-none">
          <div className="w-3 h-3 rounded-full bg-[var(--patiya-color-foreground)]" />
        </div>

        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
          dragElastic={0.3}
          onDrag={(_, info) =>
            setPuck({
              x: Math.round(info.offset.x + puck.x),
              y: Math.round(info.offset.y + puck.y),
            })
          }
          animate={{ x: puck.x, y: puck.y }}
          transition={{ type: "spring", stiffness: 450, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 w-12 h-12 rounded-full border-2 border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] flex items-center justify-center font-bold text-xs cursor-grab active:cursor-grabbing shadow-lg"
        >
          ●
        </motion.div>
      </div>

      <div className="flex items-center justify-between text-xs pt-1">
        <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
          Drag node to stretch fluid membrane
        </span>
        <button
          onClick={() => setPuck({ x: 0, y: 0 })}
          className="px-2.5 py-1 rounded-lg border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] font-mono text-[10px] font-semibold"
        >
          Snap to Center
        </button>
      </div>
    </div>
  );
};

export const MatrixCodeDecryptorPreview = () => {
  const [level, setLevel] = useState<1 | 2 | 3>(2);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [displayText, setDisplayText] = useState("sk_live_9f8a2c1e4d0b");
  const [copied, setCopied] = useState(false);

  const finalKeys: Record<number, string> = {
    1: "pk_test_public_7741",
    2: "sk_live_9f8a2c1e4d0b",
    3: "root_auth_00x9f_omega",
  };

  const handleDecrypt = () => {
    setIsDecrypting(true);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const target = finalKeys[level];
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        target
          .split("")
          .map((c, index) => {
            if (index < iteration) return target[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (iteration >= target.length) {
        clearInterval(interval);
        setIsDecrypting(false);
      }
      iteration += 1;
    }, 45);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      <div className="p-3.5 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--patiya-color-border)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
                Matrix Token Vault
              </h4>
              <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                Cryptographic Unscrambler
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">
            ENCRYPTED AES-256
          </span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] space-y-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            <span>VAULT TOKEN KEY</span>
            <span>CLEARANCE L{level}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[var(--patiya-color-muted)]/50 border border-[var(--patiya-color-border)] font-mono text-sm font-bold text-[var(--patiya-color-foreground)] truncate flex items-center justify-between">
            <span className={isDecrypting ? "text-emerald-500" : ""}>
              {displayText}
            </span>
            <span className="text-[10px] font-normal text-[var(--patiya-color-muted-foreground)] ml-2">
              HASH
            </span>
          </div>
        </div>

        <div className="flex p-0.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
          {([1, 2, 3] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setLevel(lvl);
                setDisplayText(finalKeys[lvl]);
              }}
              className="relative flex-1 py-1.5 text-xs font-semibold"
            >
              {level === lvl && (
                <motion.div
                  layoutId="clearance-pill"
                  className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/30"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${level === lvl ? "text-[var(--patiya-color-primary)] font-bold" : "text-[var(--patiya-color-muted-foreground)]"}`}
              >
                L{lvl} Clearance
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleDecrypt}
            disabled={isDecrypting}
            className="px-3.5 py-1.5 rounded-xl bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] text-xs font-semibold disabled:opacity-50"
          >
            {isDecrypting ? "Unscrambling..." : "Decrypt Key"}
          </motion.button>
          <button
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-xs font-mono font-semibold transition-colors"
          >
            {copied ? "Copied ✓" : "Copy Token"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const OrbitalCommandHubPreview = () => {
  const [selected, setSelected] = useState("Deploy");
  const [rotation, setRotation] = useState(0);

  const satellites = [
    { id: "Deploy", icon: "🚀", status: "Active", latency: "14ms" },
    { id: "Database", icon: "🗄", status: "Healthy", latency: "1.2ms" },
    { id: "Security", icon: "🛡", status: "Guarded", latency: "0ms" },
    { id: "Analytics", icon: "⚡", status: "Streaming", latency: "8.4k/s" },
  ];

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none flex flex-col items-center space-y-4">
      <div className="w-full flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Orbital Command System
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Elliptical Satellite Hub
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold text-[var(--patiya-color-primary)]">
          4 Satellites Online
        </span>
      </div>

      <div className="relative w-64 h-52 flex items-center justify-center">
        <div className="absolute w-56 h-36 rounded-full border border-dashed border-[var(--patiya-color-border)] pointer-events-none" />

        <div className="relative z-10 w-16 h-16 rounded-full border-2 border-[var(--patiya-color-primary)] bg-[var(--patiya-color-card)] flex flex-col items-center justify-center shadow-lg">
          <span className="text-lg">❖</span>
          <span className="text-[8px] font-mono font-bold uppercase text-[var(--patiya-color-primary)]">
            Core
          </span>
        </div>

        {satellites.map((sat, idx) => {
          const total = satellites.length;
          const currentAngle =
            (rotation + (360 / total) * idx) * (Math.PI / 180);
          const x = Math.cos(currentAngle) * 105;
          const y = Math.sin(currentAngle) * 65;
          const isSelected = selected === sat.id;

          return (
            <motion.button
              key={sat.id}
              onClick={() => setSelected(sat.id)}
              animate={{ x, y }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              className={`absolute w-10 h-10 rounded-full border flex items-center justify-center text-sm shadow-md transition-colors ${
                isSelected
                  ? "border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/20 text-[var(--patiya-color-primary)] ring-2 ring-[var(--patiya-color-primary)]/30"
                  : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]"
              }`}
            >
              <span>{sat.icon}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="w-full flex items-center justify-between p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] text-xs">
        <div>
          <span className="font-bold text-[var(--patiya-color-foreground)]">
            {selected} Node
          </span>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Status: {satellites.find((s) => s.id === selected)?.status} •
            Latency: {satellites.find((s) => s.id === selected)?.latency}
          </p>
        </div>
        <button
          onClick={() => setRotation((r) => r + 45)}
          className="px-2.5 py-1 rounded-lg border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] font-mono text-[10px] font-bold"
        >
          Rotate Orbit ↻
        </button>
      </div>
    </div>
  );
};

export const TimeTravelScrubberPreview = () => {
  const [index, setIndex] = useState(3);

  const commits = [
    {
      hash: "8f4a1",
      label: "Initial Schema",
      author: "alex",
      changes: "+124 -0",
      time: "3d ago",
      status: "Clean",
    },
    {
      hash: "9c2e0",
      label: "Add Auth Stems",
      author: "jordan",
      changes: "+68 -12",
      time: "2d ago",
      status: "Clean",
    },
    {
      hash: "a41b7",
      label: "Spring Motion Engine",
      author: "alex",
      changes: "+312 -45",
      time: "1d ago",
      status: "Verified",
    },
    {
      hash: "d83e4",
      label: "Hairline Border System",
      author: "elena",
      changes: "+84 -19",
      time: "6h ago",
      status: "Verified",
    },
    {
      hash: "f99a2",
      label: "Production Release v2",
      author: "team",
      changes: "+12 -2",
      time: "Just now",
      status: "Deployed",
    },
  ];

  const current = commits[index];

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Time-Travel Git Scrubber
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Reversible History Inspector
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)]">
          {current.hash}
        </span>
      </div>

      <div className="relative pt-4 pb-2 px-2">
        <div className="h-1 bg-[var(--patiya-color-muted)] rounded-full relative">
          <motion.div
            className="h-full bg-[var(--patiya-color-primary)] rounded-full"
            animate={{ width: `${(index / (commits.length - 1)) * 100}%` }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
          />
        </div>

        <div className="flex justify-between -mt-2.5">
          {commits.map((c, i) => (
            <motion.button
              key={c.hash}
              onClick={() => setIndex(i)}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.9 }}
              className={`w-4 h-4 rounded-full border-2 transition-colors ${
                i <= index
                  ? "border-[var(--patiya-color-primary)] bg-[var(--patiya-color-background)]"
                  : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]"
              } ${i === index ? "ring-4 ring-[var(--patiya-color-primary)]/20" : ""}`}
            />
          ))}
        </div>
      </div>

      <motion.div
        key={current.hash}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-2 text-xs"
      >
        <div className="flex justify-between items-center">
          <h5 className="font-bold text-[var(--patiya-color-foreground)] truncate">
            {current.label}
          </h5>
          <span className="text-[10px] font-mono font-bold text-emerald-500">
            {current.status}
          </span>
        </div>
        <div className="flex justify-between text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
          <span>Author: @{current.author}</span>
          <span className="text-emerald-500 font-bold">{current.changes}</span>
          <span>{current.time}</span>
        </div>
      </motion.div>

      <div className="flex items-center justify-between text-xs pt-1">
        <button
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
          className="px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] disabled:opacity-40 font-semibold"
        >
          ← Undo Commit
        </button>
        <span className="font-mono text-[10px] text-[var(--patiya-color-muted-foreground)]">
          {index + 1} / {commits.length}
        </span>
        <button
          disabled={index === commits.length - 1}
          onClick={() => setIndex(index + 1)}
          className="px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] disabled:opacity-40 font-semibold"
        >
          Redo Commit →
        </button>
      </div>
    </div>
  );
};

export const PromptModelSwitcherPreview = () => {
  const [model, setModel] = useState("Claude 3.5");
  const [prompt, setPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const models = ["Claude 3.5", "GPT-4o", "Gemini 1.5"];
  const suggestions = [
    "Analyze bundle size",
    "Refactor to React hook",
    "Generate API schema",
  ];

  const handleSend = () => {
    if (!prompt.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPrompt("");
    }, 1200);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Prompt & Model Studio
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Adaptive AI Command Interface
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)]">
          Temp: {temperature}
        </span>
      </div>

      <div className="p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-3.5">
        <div className="flex p-0.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
          {models.map((m) => (
            <button
              key={m}
              onClick={() => setModel(m)}
              className="relative flex-1 py-1.5 text-xs font-semibold"
            >
              {model === m && (
                <motion.div
                  layoutId="active-ai-model-pill"
                  className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/30"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 truncate block ${model === m ? "text-[var(--patiya-color-primary)] font-bold" : "text-[var(--patiya-color-muted-foreground)]"}`}
              >
                {m}
              </span>
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask AI anything..."
            className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-xs text-[var(--patiya-color-foreground)] focus:outline-none focus:border-[var(--patiya-color-primary)]"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!prompt.trim() || isSubmitting}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] flex items-center justify-center text-xs disabled:opacity-40"
          >
            {isSubmitting ? "…" : "↑"}
          </motion.button>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setPrompt(s)}
              className="text-[10px] font-mono px-2 py-1 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] hover:bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)] transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-[var(--patiya-color-muted-foreground)] border-t border-[var(--patiya-color-border)]">
          <div className="flex items-center gap-2">
            <span>
              Tokens: {prompt.length ? Math.ceil(prompt.length / 3) : 0} / 8,192
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() =>
                setTemperature((t) =>
                  Number((t <= 0.2 ? 1.0 : t - 0.2).toFixed(1)),
                )
              }
              className="hover:text-[var(--patiya-color-foreground)]"
            >
              Adjust Temp ↻
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DynamicCheckoutVaultPreview = () => {
  const [method, setMethod] = useState<"card" | "apple" | "crypto">("card");
  const [sliderX, setSliderX] = useState(0);
  const [paid, setPaid] = useState(false);

  const reset = () => {
    setSliderX(0);
    setPaid(false);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Fluid Checkout Vault
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Interactive Payment Slider Pill
          </p>
        </div>
        <span className="text-xs font-bold text-[var(--patiya-color-primary)] font-mono">
          $89.00 / mo
        </span>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex p-0.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
          {(["card", "apple", "crypto"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMethod(m);
                reset();
              }}
              className="relative flex-1 py-1.5 text-xs font-semibold capitalize"
            >
              {method === m && (
                <motion.div
                  layoutId="checkout-method-pill"
                  className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/30"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${method === m ? "text-[var(--patiya-color-primary)] font-bold" : "text-[var(--patiya-color-muted-foreground)]"}`}
              >
                {m === "card"
                  ? "Credit Card"
                  : m === "apple"
                    ? "Apple Pay"
                    : "USDC Crypto"}
              </span>
            </button>
          ))}
        </div>

        <div className="p-3.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-6 rounded bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
              VISA
            </div>
            <div>
              <p className="font-bold text-[var(--patiya-color-foreground)]">
                •••• 4242
              </p>
              <p className="text-[10px] text-[var(--patiya-color-muted-foreground)]">
                Exp: 08/28
              </p>
            </div>
          </div>
          <span className="text-[10px] text-emerald-500 font-bold">
            Default
          </span>
        </div>

        <div className="relative h-12 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center px-1 overflow-hidden">
          <AnimatePresence>
            {paid ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold text-emerald-500"
              >
                <span>✓ Payment Dispatched</span>
                <button
                  onClick={reset}
                  className="underline text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]"
                >
                  Reset
                </button>
              </motion.div>
            ) : (
              <>
                <span className="w-full text-center text-xs font-semibold text-[var(--patiya-color-muted-foreground)] pointer-events-none">
                  Slide to Confirm →
                </span>
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 180 }}
                  dragElastic={0.1}
                  onDrag={(_, info) => setSliderX(info.offset.x)}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 140) setPaid(true);
                    else setSliderX(0);
                  }}
                  animate={{ x: paid ? 180 : sliderX }}
                  className="absolute left-1 w-10 h-10 rounded-xl bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] flex items-center justify-center font-bold text-sm cursor-grab active:cursor-grabbing shadow-md"
                >
                  →
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const CollaborationPresenceBarPreview = () => {
  const [reactions, setReactions] = useState<{ id: number; emoji: string }[]>(
    [],
  );
  const [micActive, setMicActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState("Elena");

  const users = [
    {
      name: "Elena",
      color: "from-purple-500 to-indigo-500",
      status: "Editing Navbar",
    },
    {
      name: "Marcus",
      color: "from-emerald-500 to-teal-500",
      status: "Reviewing Tokens",
    },
    {
      name: "Sara",
      color: "from-amber-500 to-rose-500",
      status: "Viewing Metrics",
    },
  ];

  const triggerReaction = (emoji: string) => {
    const newId = Date.now();
    setReactions((prev) => [...prev, { id: newId, emoji }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newId));
    }, 1500);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Live Presence & Co-Pilot
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Multi-User Active Session Bar
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold text-emerald-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          3 Peers Online
        </span>
      </div>

      <div className="relative p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center -space-x-2">
            {users.map((u) => (
              <motion.button
                key={u.name}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                onClick={() => setSelectedUser(u.name)}
                className={`relative w-8 h-8 rounded-full border-2 border-[var(--patiya-color-background)] bg-gradient-to-tr ${u.color} text-white font-bold text-xs flex items-center justify-center shadow-sm ${
                  selectedUser === u.name
                    ? "ring-2 ring-[var(--patiya-color-primary)]"
                    : ""
                }`}
              >
                {u.name[0]}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMicActive(!micActive)}
              className={`px-2.5 py-1 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                micActive
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
                  : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-muted-foreground)]"
              }`}
            >
              <span>{micActive ? "🎙 Voice Live" : "🔇 Mic Off"}</span>
            </button>
          </div>
        </div>

        <div className="p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-[var(--patiya-color-foreground)]">
              {selectedUser}
            </span>
            <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
              {users.find((u) => u.name === selectedUser)?.status}
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]">
            Viewing Frame #4
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Send Live Reaction:
          </span>
          <div className="flex gap-1.5">
            {["🔥", "❤️", "🚀", "🎉"].map((emoji) => (
              <motion.button
                key={emoji}
                whileTap={{ scale: 0.85 }}
                onClick={() => triggerReaction(emoji)}
                className="w-8 h-8 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] flex items-center justify-center text-sm"
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence>
            {reactions.map((r) => (
              <motion.div
                key={r.id}
                initial={{
                  opacity: 1,
                  y: 120,
                  x: 260 + (Math.random() * 40 - 20),
                }}
                animate={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute text-xl"
              >
                {r.emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const SmartCommandPalettePreview = () => {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);

  const commands = [
    {
      id: "1",
      title: "Create new React component",
      cat: "Actions",
      shortcut: "⌘N",
    },
    {
      id: "2",
      title: "Deploy to Production Edge",
      cat: "Actions",
      shortcut: "⌘D",
    },
    {
      id: "3",
      title: "Billing & Invoices Documentation",
      cat: "Docs",
      shortcut: "G B",
    },
    {
      id: "4",
      title: "API Authentication Tokens",
      cat: "Docs",
      shortcut: "G A",
    },
    {
      id: "5",
      title: "Invite team member to workspace",
      cat: "Users",
      shortcut: "⌘I",
    },
  ];

  const filtered = commands.filter((c) => {
    const matchCat = filter === "All" || c.cat === filter;
    const matchQuery =
      !query || c.title.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Command & Action Palette
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Fuzzy Filter & Hotkey Surface
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]">
          ⌘K
        </span>
      </div>

      <div className="p-3.5 sm:p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-3">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIdx(0);
          }}
          placeholder="Type a command or search..."
          className="w-full px-3 py-2 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-xs text-[var(--patiya-color-foreground)] focus:outline-none focus:border-[var(--patiya-color-primary)] font-mono"
        />

        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {["All", "Actions", "Docs", "Users"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setSelectedIdx(0);
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors shrink-0 ${
                filter === cat
                  ? "bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)]"
                  : "border border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)] hover:bg-[var(--patiya-color-muted)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-1 pt-1 min-h-36">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedIdx(idx)}
              className={`relative px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                selectedIdx === idx
                  ? "text-[var(--patiya-color-primary)] font-semibold"
                  : "text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/50"
              }`}
            >
              {selectedIdx === idx && (
                <motion.div
                  layoutId="palette-active-pill"
                  className="absolute inset-0 rounded-xl bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/20 pointer-events-none"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10 truncate pr-2">{item.title}</span>
              <span className="relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)] shrink-0">
                {item.shortcut}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const InteractiveKanbanPillPreview = () => {
  const [priority, setPriority] = useState<"Urgent" | "High" | "Normal">(
    "High",
  );
  const [status, setStatus] = useState<"Backlog" | "In Progress" | "Done">(
    "In Progress",
  );
  const [subtasks, setSubtasks] = useState([
    { id: 1, text: "Write Unit Test Suite", done: true },
    { id: 2, text: "Verify Mobile Breakpoints", done: false },
    { id: 3, text: "Publish npm package v2.1", done: false },
  ]);

  const toggleSubtask = (id: number) => {
    setSubtasks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s)),
    );
  };

  const nextStatus = () => {
    if (status === "Backlog") setStatus("In Progress");
    else if (status === "In Progress") setStatus("Done");
    else setStatus("Backlog");
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Interactive Issue Card
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Linear-Grade Task Workflow Pill
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold text-[var(--patiya-color-muted-foreground)]">
          ENG-409
        </span>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={nextStatus}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
              status === "Done"
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
                : status === "In Progress"
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-500"
                  : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-muted-foreground)]"
            }`}
          >
            ● {status}
          </button>

          <div className="flex gap-1">
            {(["Normal", "High", "Urgent"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition-colors ${
                  priority === p
                    ? p === "Urgent"
                      ? "border-rose-500 bg-rose-500/10 text-rose-500"
                      : "border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)]"
                    : "border-transparent text-[var(--patiya-color-muted-foreground)]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <h5 className="text-sm font-bold text-[var(--patiya-color-foreground)] leading-snug">
          Implement Adaptive Spring Gesture System for Motion Blocks
        </h5>

        <div className="space-y-1.5 pt-1">
          {subtasks.map((st) => (
            <motion.div
              key={st.id}
              onClick={() => toggleSubtask(st.id)}
              className="p-2 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-between text-xs cursor-pointer"
            >
              <span
                className={
                  st.done
                    ? "line-through text-[var(--patiya-color-muted-foreground)]"
                    : "font-medium text-[var(--patiya-color-foreground)]"
                }
              >
                {st.text}
              </span>
              <span
                className={`font-mono text-xs ${st.done ? "text-emerald-500 font-bold" : "text-[var(--patiya-color-muted-foreground)]"}`}
              >
                {st.done ? "✓" : "○"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FileStagingUploadTrayPreview = () => {
  const [files, setFiles] = useState([
    {
      id: "1",
      name: "figma_tokens_export.json",
      size: "142 KB",
      progress: 100,
      status: "Done",
    },
    {
      id: "2",
      name: "hero_scene_mesh.glb",
      size: "18.4 MB",
      progress: 68,
      status: "Uploading",
    },
    {
      id: "3",
      name: "production_bundle.js",
      size: "840 KB",
      progress: 34,
      status: "Uploading",
    },
  ]);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const uploadAll = () => {
    setFiles((prev) =>
      prev.map((f) => ({ ...f, progress: 100, status: "Done" })),
    );
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            File Staging & Delivery Tray
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Multi-Asset Pipeline Monitor
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold text-[var(--patiya-color-primary)]">
          {files.filter((f) => f.status === "Done").length} / {files.length}{" "}
          Ready
        </span>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-3">
        <div className="space-y-2">
          <AnimatePresence>
            {files.map((file) => (
              <motion.div
                key={file.id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="w-5 h-5 rounded bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] flex items-center justify-center font-mono text-[10px] font-bold">
                      ⊞
                    </span>
                    <span className="font-bold text-[var(--patiya-color-foreground)] truncate">
                      {file.name}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-[var(--patiya-color-muted-foreground)] hover:text-rose-500 font-bold shrink-0 ml-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                  <span>{file.size}</span>
                  <span
                    className={
                      file.status === "Done"
                        ? "text-emerald-500 font-bold"
                        : "text-[var(--patiya-color-primary)]"
                    }
                  >
                    {file.status === "Done"
                      ? "Uploaded ✓"
                      : `${file.progress}%`}
                  </span>
                </div>

                <div className="w-full h-1 rounded-full bg-[var(--patiya-color-muted)] overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--patiya-color-primary)]"
                    animate={{ width: `${file.progress}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setFiles([])}
            className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] hover:underline"
          >
            Clear All
          </button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={uploadAll}
            className="px-3.5 py-1.5 rounded-xl bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] text-xs font-semibold"
          >
            Complete Uploads
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export const AuditLogInspectorPreview = () => {
  type LogSeverity = "all" | "critical" | "warning" | "info";
  type LogItem = {
    id: string;
    event: string;
    actor: string;
    severity: "critical" | "warning" | "info";
    timestamp: string;
    ip: string;
    metadata: string;
  };

  const initialLogs: LogItem[] = [
    {
      id: "ev-9104",
      event: "api.key.rotated",
      actor: "alex@acme.dev",
      severity: "critical",
      timestamp: "Just now",
      ip: "192.241.14.88",
      metadata: '{"scope": "production_read_write", "exp": "30d"}',
    },
    {
      id: "ev-9103",
      event: "auth.mfa.verified",
      actor: "elena@acme.dev",
      severity: "info",
      timestamp: "2m ago",
      ip: "104.28.19.42",
      metadata: '{"method": "webauthn_fido2", "origin": "macos"}',
    },
    {
      id: "ev-9102",
      event: "rate_limit.exceeded",
      actor: "worker-svc-eu",
      severity: "warning",
      timestamp: "5m ago",
      ip: "185.199.108.153",
      metadata: '{"endpoint": "/v2/vector/query", "rpm": 1280}',
    },
    {
      id: "ev-9101",
      event: "vault.secret.accessed",
      actor: "ci-deployer",
      severity: "info",
      timestamp: "12m ago",
      ip: "35.184.21.90",
      metadata: '{"key": "STRIPE_SIGNING_SECRET"}',
    },
  ];

  const [logs, setLogs] = useState<LogItem[]>(initialLogs);
  const [filter, setFilter] = useState<LogSeverity>("all");
  const [expandedId, setExpandedId] = useState<string | null>("ev-9104");

  const filteredLogs = logs.filter((item) =>
    filter === "all" ? true : item.severity === filter,
  );

  const severityBadge = (sev: LogItem["severity"]) => {
    switch (sev) {
      case "critical":
        return "bg-red-500/15 text-red-500 border-red-500/30";
      case "warning":
        return "bg-amber-500/15 text-amber-500 border-amber-500/30";
      case "info":
        return "bg-blue-500/15 text-blue-500 border-blue-500/30";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Audit Stream
          </h4>
        </div>
        <div className="flex items-center gap-1 p-0.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
          {(["all", "critical", "warning", "info"] as const).map((sev) => {
            const active = filter === sev;
            return (
              <button
                key={sev}
                onClick={() => setFilter(sev)}
                className="relative px-2 py-0.5 text-[10px] font-medium capitalize transition-colors cursor-pointer"
              >
                {active && (
                  <motion.div
                    layoutId="audit-tab"
                    className="absolute inset-0 rounded-md bg-[var(--patiya-color-card)] border border-[var(--patiya-color-border)] shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active
                      ? "text-[var(--patiya-color-foreground)] font-semibold"
                      : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                  }`}
                >
                  {sev}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <AnimatePresence>
          {filteredLogs.map((log) => {
            const isExpanded = expandedId === log.id;
            return (
              <motion.div
                key={log.id}
                layout
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : log.id)}
                  className="w-full flex items-center justify-between p-2.5 text-left text-xs cursor-pointer hover:bg-[var(--patiya-color-muted)]/50 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${severityBadge(
                        log.severity,
                      )}`}
                    >
                      {log.severity}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[var(--patiya-color-foreground)] truncate">
                      {log.event}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                    <span className="hidden sm:inline">{log.actor}</span>
                    <span>{log.timestamp}</span>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-3 pb-2.5 pt-1 border-t border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/50 space-y-1.5"
                    >
                      <div className="flex justify-between text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                        <span>Actor: {log.actor}</span>
                        <span>IP: {log.ip}</span>
                      </div>
                      <pre className="p-2 rounded-lg bg-[var(--patiya-color-background)] border border-[var(--patiya-color-border)] text-[10px] font-mono text-emerald-400 overflow-x-auto">
                        {log.metadata}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] pt-1">
        <span>Displaying {filteredLogs.length} events</span>
        <button
          onClick={() => setLogs(initialLogs)}
          className="hover:underline text-[var(--patiya-color-primary)] font-semibold cursor-pointer"
        >
          Reset Stream
        </button>
      </div>
    </div>
  );
};

export const WorkspaceBillingMatrixPreview = () => {
  type BillingCycle = "monthly" | "annual";
  const [cycle, setCycle] = useState<BillingCycle>("annual");
  const [seats, setSeats] = useState<number>(8);
  const [plan, setPlan] = useState<"team" | "enterprise">("team");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const basePrice =
    plan === "team"
      ? cycle === "annual"
        ? 18
        : 24
      : cycle === "annual"
        ? 45
        : 59;
  const monthlyTotal = seats * basePrice;

  const handleUpgrade = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2400);
    }, 900);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">
            Subscription Tier
          </span>
          <h4 className="text-sm font-bold text-[var(--patiya-color-foreground)]">
            Workspace Seat Allocation
          </h4>
        </div>

        <div className="flex p-0.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
          {(["monthly", "annual"] as const).map((c) => {
            const active = cycle === c;
            return (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className="relative px-2 sm:px-2.5 py-1 text-[10px] font-semibold capitalize transition-colors cursor-pointer"
              >
                {active && (
                  <motion.div
                    layoutId="billing-pill"
                    className="absolute inset-0 rounded-lg bg-[var(--patiya-color-card)] border border-[var(--patiya-color-border)] shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active
                      ? "text-[var(--patiya-color-foreground)]"
                      : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                  }`}
                >
                  {c === "annual" ? "Annual -20%" : "Monthly"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          {
            id: "team",
            title: "Team Pro",
            desc: "Collaborative squads",
            rate: cycle === "annual" ? "$18" : "$24",
          },
          {
            id: "enterprise",
            title: "Enterprise",
            desc: "SSO, custom SLA & audit",
            rate: cycle === "annual" ? "$45" : "$59",
          },
        ].map((item) => {
          const selected = plan === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPlan(item.id as "team" | "enterprise")}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selected
                  ? "border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/10 ring-1 ring-[var(--patiya-color-primary)]/30"
                  : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] hover:border-[var(--patiya-color-primary)]/40"
              }`}
            >
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-[var(--patiya-color-foreground)]">
                  {item.title}
                </span>
                <span className="text-xs font-mono font-bold text-[var(--patiya-color-primary)]">
                  {item.rate}
                </span>
              </div>
              <p className="text-[10px] text-[var(--patiya-color-muted-foreground)] mt-0.5 truncate">
                {item.desc}
              </p>
            </motion.button>
          );
        })}
      </div>

      <div className="space-y-1.5 p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-[var(--patiya-color-foreground)]">
            Seats ({seats})
          </span>
          <span className="font-mono text-[var(--patiya-color-primary)]">
            ${monthlyTotal}/mo
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="32"
          value={seats}
          onChange={(e) => setSeats(parseInt(e.target.value))}
          className="w-full h-1.5 bg-[var(--patiya-color-muted)] rounded-lg appearance-none cursor-pointer accent-[var(--patiya-color-primary)]"
        />
        <div className="flex justify-between text-[9px] font-mono text-[var(--patiya-color-muted-foreground)]">
          <span>1 Seat</span>
          <span>16 Seats</span>
          <span>32 Seats</span>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleUpgrade}
        disabled={isSubmitting}
        className="w-full py-2.5 rounded-xl bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] font-semibold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="inline-block w-3.5 h-3.5 border-2 border-[var(--patiya-color-primary-foreground)] border-t-transparent rounded-full"
          />
        ) : isSuccess ? (
          <span>✓ Workspace Updated Successfully</span>
        ) : (
          <span>
            Confirm {seats} Seats • ${monthlyTotal}/mo
          </span>
        )}
      </motion.button>
    </div>
  );
};

export const NotificationInboxCenterPreview = () => {
  type NotificationItem = {
    id: string;
    title: string;
    description: string;
    time: string;
    category: "mentions" | "system";
    read: boolean;
  };

  const initialItems: NotificationItem[] = [
    {
      id: "n-1",
      title: "@alex tagged you in PR #412",
      description:
        "Added unit tests for token streaming decoder and gesture friction.",
      time: "3m ago",
      category: "mentions",
      read: false,
    },
    {
      id: "n-2",
      title: "Edge Node eu-west-1 scale event",
      description:
        "Auto-scaled ingress from 4 to 12 micro-containers due to load peak.",
      time: "18m ago",
      category: "system",
      read: false,
    },
    {
      id: "n-3",
      title: "@sarah approved production release",
      description:
        "Staging gate pipeline passed all 42 automated regression checks.",
      time: "1h ago",
      category: "mentions",
      read: true,
    },
  ];

  const [items, setItems] = useState<NotificationItem[]>(initialItems);
  const [tab, setTab] = useState<"all" | "mentions" | "system">("all");

  const unreadCount = items.filter((n) => !n.read).length;

  const filtered = items.filter((item) =>
    tab === "all" ? true : item.category === tab,
  );

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismissItem = (id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">🔔</span>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Activity Inbox
          </h4>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)]">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={markAllRead}
          className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer"
        >
          Mark all read
        </button>
      </div>

      <div className="flex p-0.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
        {(["all", "mentions", "system"] as const).map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative flex-1 py-1 text-[10px] font-semibold capitalize transition-colors cursor-pointer text-center"
            >
              {active && (
                <motion.div
                  layoutId="inbox-pill"
                  className="absolute inset-0 rounded-md bg-[var(--patiya-color-card)] border border-[var(--patiya-color-border)] shadow-xs"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  active
                    ? "text-[var(--patiya-color-foreground)] font-bold"
                    : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                }`}
              >
                {t}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-1.5 min-h-[160px]">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-10 text-center space-y-1.5"
            >
              <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                No notifications in {tab}
              </p>
              <button
                onClick={() => setItems(initialItems)}
                className="text-[10px] text-[var(--patiya-color-primary)] font-semibold underline cursor-pointer"
              >
                Reset notifications
              </button>
            </motion.div>
          ) : (
            filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: 20 }}
                className={`p-2.5 rounded-xl border transition-all ${
                  item.read
                    ? "border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/60 opacity-80"
                    : "border-[var(--patiya-color-primary)]/40 bg-[var(--patiya-color-background)] shadow-xs"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p
                      className={`text-xs truncate ${item.read ? "text-[var(--patiya-color-foreground)]" : "font-bold text-[var(--patiya-color-foreground)]"}`}
                    >
                      {item.title}
                    </p>
                    <p className="text-[10px] text-[var(--patiya-color-muted-foreground)] mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <button
                    onClick={() => dismissItem(item.id)}
                    className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] hover:text-red-500 shrink-0 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex justify-between items-center pt-1.5 text-[9px] font-mono text-[var(--patiya-color-muted-foreground)]">
                  <span className="capitalize">{item.category}</span>
                  <span>{item.time}</span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const AgentVoiceOrbPreview = () => {
  const [state, setState] = useState<
    "idle" | "listening" | "thinking" | "speaking"
  >("speaking");
  const [isMuted, setIsMuted] = useState(false);
  const [gain, setGain] = useState(72);

  const states = [
    { id: "idle", label: "Idle" },
    { id: "listening", label: "Listening" },
    { id: "thinking", label: "Thinking" },
    { id: "speaking", label: "Speaking" },
  ] as const;

  const barHeights = [
    [15, 25, 40, 20, 60, 35, 50, 25, 45, 20, 30, 15],
    [30, 50, 75, 45, 90, 65, 80, 50, 70, 40, 55, 30],
    [20, 35, 45, 30, 50, 40, 45, 30, 40, 25, 35, 20],
    [40, 70, 95, 60, 100, 80, 90, 65, 85, 50, 70, 35],
  ];

  const currentBars =
    state === "idle"
      ? barHeights[0]
      : state === "listening"
        ? barHeights[1]
        : state === "thinking"
          ? barHeights[2]
          : barHeights[3];

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Multimodal Voice & Neural Orb
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Realtime Audio Spectrum & Agent Core
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>124ms edge</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex items-center justify-center p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] gap-1">
          {states.map((s) => {
            const active = state === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setState(s.id)}
                className="relative flex-1 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {active && (
                  <motion.div
                    layoutId="orb-mode-pill"
                    className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/15 border border-[var(--patiya-color-primary)]/30"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 capitalize ${
                    active
                      ? "text-[var(--patiya-color-primary)]"
                      : "text-[var(--patiya-color-muted-foreground)]"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative h-44 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/70 overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-radial from-[var(--patiya-color-primary)]/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{
                scale: isMuted
                  ? 0.8
                  : state === "speaking"
                    ? [1, 1.25, 1.05, 1.2, 1]
                    : state === "listening"
                      ? [1, 1.15, 1]
                      : state === "thinking"
                        ? [1, 1.08, 1]
                        : [1, 1.04, 1],
                rotate: state === "thinking" ? 360 : 0,
              }}
              transition={{
                duration: state === "thinking" ? 3 : 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-20 h-20 rounded-full bg-gradient-to-tr from-[var(--patiya-color-primary)] via-indigo-500 to-cyan-400 blur-sm opacity-80"
            />
            <motion.div
              animate={{
                scale: isMuted
                  ? 0.9
                  : state === "speaking"
                    ? [0.95, 1.1, 0.95]
                    : [1, 1.02, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-14 h-14 rounded-full border border-white/40 bg-[var(--patiya-color-background)]/80 backdrop-blur-md flex items-center justify-center shadow-inner"
            >
              <span className="text-base font-bold">
                {isMuted
                  ? "🔇"
                  : state === "speaking"
                    ? "⚡"
                    : state === "listening"
                      ? "🎙️"
                      : "✨"}
              </span>
            </motion.div>
          </div>

          <div className="absolute bottom-3 left-0 right-0 px-6 flex items-end justify-center gap-1.5 h-8">
            {currentBars.map((h, i) => (
              <motion.div
                key={i}
                animate={{
                  height: isMuted ? 4 : `${Math.round(h * (gain / 100))}%`,
                  opacity: isMuted ? 0.3 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                  delay: i * 0.02,
                }}
                className="w-1.5 rounded-full bg-gradient-to-t from-[var(--patiya-color-primary)]/40 to-[var(--patiya-color-primary)]"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              isMuted
                ? "border-red-500/40 bg-red-500/10 text-red-500"
                : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-foreground)]"
            }`}
          >
            <span>{isMuted ? "Unmute Mic" : "Mute Mic"}</span>
          </button>

          <div className="flex-1 flex items-center gap-2">
            <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] shrink-0">
              Gain: {gain}%
            </span>
            <input
              type="range"
              min="20"
              max="100"
              value={gain}
              onChange={(e) => setGain(Number(e.target.value))}
              className="w-full accent-[var(--patiya-color-primary)] h-1.5 bg-[var(--patiya-color-muted)] rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AgenticFlowPipelinePreview = () => {
  type Step = {
    id: string;
    title: string;
    tool: string;
    ms: number;
    tokens: number;
  };

  const steps: Step[] = [
    {
      id: "s-1",
      title: "Query Intent Parser",
      tool: "Semantics v2",
      ms: 42,
      tokens: 128,
    },
    {
      id: "s-2",
      title: "Pinecone Context Recall",
      tool: "Dense Vector",
      ms: 96,
      tokens: 840,
    },
    {
      id: "s-3",
      title: "Autonomous Tool Dispatch",
      tool: "GitHub Graph API",
      ms: 210,
      tokens: 460,
    },
    {
      id: "s-4",
      title: "Output CoT Synthesis",
      tool: "DeepSeek R1",
      ms: 145,
      tokens: 1024,
    },
  ];

  const [activeStep, setActiveStep] = useState(2);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Step | null>(steps[2]);

  const handleRun = () => {
    setIsRunning(true);
    setActiveStep(0);
    let cur = 0;
    const interval = setInterval(() => {
      cur += 1;
      if (cur >= steps.length) {
        clearInterval(interval);
        setIsRunning(false);
        setActiveStep(steps.length - 1);
        setSelectedNode(steps[steps.length - 1]);
      } else {
        setActiveStep(cur);
        setSelectedNode(steps[cur]);
      }
    }, 650);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Agentic Execution Graph
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Autonomous Multi-Step Reasoning Pipeline
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleRun}
          disabled={isRunning}
          className="px-2.5 py-1 rounded-lg bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] text-[10px] font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
        >
          {isRunning ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
              className="inline-block w-2.5 h-2.5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <span>▶ Run Flow</span>
          )}
        </motion.button>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-3">
        <div className="space-y-2">
          {steps.map((st, idx) => {
            const isDone =
              idx < activeStep ||
              (!isRunning && activeStep === steps.length - 1);
            const isCurrent = idx === activeStep && isRunning;
            const isSelected = selectedNode?.id === st.id;

            return (
              <motion.div
                key={st.id}
                layout
                onClick={() => setSelectedNode(st)}
                whileHover={{ x: 2 }}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "border-[var(--patiya-color-primary)] bg-[var(--patiya-color-background)] ring-1 ring-[var(--patiya-color-primary)]/40"
                    : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/60"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold shrink-0 transition-colors ${
                      isDone
                        ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/40"
                        : isCurrent
                          ? "bg-[var(--patiya-color-primary)]/20 text-[var(--patiya-color-primary)] border border-[var(--patiya-color-primary)]/40 animate-pulse"
                          : "bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]"
                    }`}
                  >
                    {isDone ? "✓" : idx + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[var(--patiya-color-foreground)] truncate">
                      {st.title}
                    </p>
                    <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                      {st.tool}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono font-bold text-[var(--patiya-color-foreground)] block">
                    {st.ms}ms
                  </span>
                  <span className="text-[9px] font-mono text-[var(--patiya-color-muted-foreground)]">
                    {st.tokens} tok
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {selectedNode && (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                <span>INSPECT NODE: {selectedNode.id}</span>
                <span className="text-emerald-500 font-bold">
                  STATUS: READY
                </span>
              </div>
              <p className="text-xs font-mono text-[var(--patiya-color-foreground)]">
                payload: &#123; engine: &quot;{selectedNode.tool}&quot;,
                latency: &quot;{selectedNode.ms}ms&quot;, tokens:{" "}
                {selectedNode.tokens} &#125;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const SemanticPatchReviewerPreview = () => {
  type DiffLine = {
    id: string;
    type: "delete" | "add";
    code: string;
    status: "pending" | "accepted" | "rejected";
  };

  const initialDiff: DiffLine[] = [
    {
      id: "d-1",
      type: "delete",
      code: "- const token = await syncStorage.get('auth');",
      status: "pending",
    },
    {
      id: "d-2",
      type: "add",
      code: "+ const { token } = await agentSession.useToken();",
      status: "pending",
    },
    {
      id: "d-3",
      type: "delete",
      code: "- return streamHandler(token, { retry: 3 });",
      status: "pending",
    },
    {
      id: "d-4",
      type: "add",
      code: "+ return streamHandler(token, { fallback: 'local-llm' });",
      status: "pending",
    },
  ];

  const [lines, setLines] = useState<DiffLine[]>(initialDiff);
  const [viewMode, setViewMode] = useState<"unified" | "split">("unified");

  const handleAction = (id: string, status: "accepted" | "rejected") => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const acceptAll = () => {
    setLines((prev) => prev.map((l) => ({ ...l, status: "accepted" })));
  };

  const resetAll = () => {
    setLines(initialDiff);
  };

  const pendingCount = lines.filter((l) => l.status === "pending").length;

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            AI Semantic Diff & Patch Lens
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Agentic Code Mutation Reviewer
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] border border-[var(--patiya-color-primary)]/20">
          <span>98.6% Confidence</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[11px] text-[var(--patiya-color-foreground)] font-bold truncate">
            src/hooks/use-agent-stream.ts
          </span>
          <div className="flex items-center p-0.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/50 shrink-0">
            {(["unified", "split"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`relative px-2 py-0.5 text-[10px] font-semibold capitalize rounded-md transition-colors cursor-pointer ${
                  viewMode === m
                    ? "text-[var(--patiya-color-foreground)] bg-[var(--patiya-color-background)] shadow-xs"
                    : "text-[var(--patiya-color-muted-foreground)]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 font-mono text-[11px] overflow-hidden rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] p-2">
          {lines.map((l) => {
            const isAdd = l.type === "add";
            return (
              <motion.div
                key={l.id}
                layout
                className={`p-1.5 rounded-lg flex items-center justify-between gap-2 transition-all ${
                  l.status === "accepted"
                    ? "opacity-40 line-through"
                    : l.status === "rejected"
                      ? "opacity-30 grayscale"
                      : isAdd
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                }`}
              >
                <span className="truncate">{l.code}</span>
                <div className="flex items-center gap-1 shrink-0">
                  {l.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAction(l.id, "accepted")}
                        className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors flex items-center justify-center text-[10px] cursor-pointer"
                        title="Accept"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handleAction(l.id, "rejected")}
                        className="w-5 h-5 rounded bg-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors flex items-center justify-center text-[10px] cursor-pointer"
                        title="Reject"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <span className="text-[10px] font-bold uppercase">
                      {l.status}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            {pendingCount} pending decisions
          </span>
          <div className="flex gap-2">
            <button
              onClick={resetAll}
              className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] underline cursor-pointer"
            >
              Reset
            </button>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={acceptAll}
              disabled={pendingCount === 0}
              className="px-2.5 py-1 rounded-lg bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] text-xs font-bold disabled:opacity-40 cursor-pointer"
            >
              Accept All
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NeuralVectorClusterPreview = () => {
  type MemoryNode = {
    id: string;
    label: string;
    score: number;
    dim: string;
    category: "Auth" | "Memory" | "Pipeline";
  };

  const initialNodes: MemoryNode[] = [
    {
      id: "m-1",
      label: "JWT Session Claim",
      score: 0.94,
      dim: "1536-d",
      category: "Auth",
    },
    {
      id: "m-2",
      label: "Workspace Access Policy",
      score: 0.89,
      dim: "1536-d",
      category: "Auth",
    },
    {
      id: "m-3",
      label: "Recent User Prompt Cache",
      score: 0.82,
      dim: "3072-d",
      category: "Memory",
    },
    {
      id: "m-4",
      label: "Tool Sandbox Container",
      score: 0.77,
      dim: "1536-d",
      category: "Pipeline",
    },
    {
      id: "m-5",
      label: "Rate Limit Token Bucket",
      score: 0.69,
      dim: "768-d",
      category: "Pipeline",
    },
  ];

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("m-1");
  const [nodes] = useState(initialNodes);

  const filtered = nodes.filter((n) =>
    !query ? true : n.label.toLowerCase().includes(query.toLowerCase()),
  );

  const selectedNode = nodes.find((n) => n.id === selectedId) || nodes[0];

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Neural Vector Context Vault
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Embedding Semantic Distance Matrix
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]">
          Cosine Sim
        </span>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-3">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Semantic query filter..."
            className="w-full px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-xs text-[var(--patiya-color-foreground)] placeholder:text-[var(--patiya-color-muted-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--patiya-color-primary)] font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-2 text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
            >
              ✕
            </button>
          )}
        </div>

        <div className="space-y-1.5 min-h-[140px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((node) => {
              const isSelected = node.id === selectedId;
              return (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedId(node.id)}
                  whileHover={{ scale: 1.01 }}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "border-[var(--patiya-color-primary)] bg-[var(--patiya-color-background)] shadow-xs"
                      : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/60"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        node.score > 0.85
                          ? "bg-emerald-500"
                          : node.score > 0.75
                            ? "bg-amber-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[var(--patiya-color-foreground)] truncate">
                        {node.label}
                      </p>
                      <p className="text-[9px] font-mono text-[var(--patiya-color-muted-foreground)]">
                        {node.category} • {node.dim}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-16 h-1.5 bg-[var(--patiya-color-muted)] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[var(--patiya-color-primary)] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${node.score * 100}%` }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[var(--patiya-color-primary)]">
                      {node.score.toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="p-2.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/80 flex items-center justify-between text-[10px] font-mono">
          <span className="text-[var(--patiya-color-muted-foreground)]">
            Active:{" "}
            <strong className="text-[var(--patiya-color-foreground)]">
              {selectedNode.label}
            </strong>
          </span>
          <span className="text-emerald-500 font-bold">
            Sim {(selectedNode.score * 100).toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export const ModelArenaBenchmarkPreview = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [progressA, setProgressA] = useState(100);
  const [progressB, setProgressB] = useState(100);
  const [winner, setWinner] = useState<"alpha" | "tie" | "beta" | null>(
    "alpha",
  );

  const runRace = () => {
    setIsStreaming(true);
    setProgressA(0);
    setProgressB(0);
    setWinner(null);

    let pA = 0;
    let pB = 0;

    const interval = setInterval(() => {
      pA += Math.floor(Math.random() * 18) + 8;
      pB += Math.floor(Math.random() * 14) + 6;

      setProgressA(Math.min(100, pA));
      setProgressB(Math.min(100, pB));

      if (pA >= 100 && pB >= 100) {
        clearInterval(interval);
        setIsStreaming(false);
        setWinner(pA >= pB ? "alpha" : "beta");
      }
    }, 120);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Model Arena & Inference Gauge
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Side-by-Side Dual Engine Velocity
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={runRace}
          disabled={isStreaming}
          className="px-2.5 py-1 rounded-lg bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] text-[10px] font-bold cursor-pointer disabled:opacity-50"
        >
          {isStreaming ? "Streaming..." : "⚡ Race Models"}
        </motion.button>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="space-y-3">
          <div className="p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--patiya-color-foreground)]">
                Model Alpha (Reasoning 32B)
              </span>
              <span className="font-mono text-[10px] text-emerald-500 font-bold">
                84 tok/s • 118ms TTFT
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--patiya-color-muted)] overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                animate={{ width: `${progressA}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--patiya-color-foreground)]">
                Model Beta (Flash 8B)
              </span>
              <span className="font-mono text-[10px] text-amber-500 font-bold">
                62 tok/s • 176ms TTFT
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--patiya-color-muted)] overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-rose-400 rounded-full"
                animate={{ width: `${progressB}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </div>

        <div className="pt-1">
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] mb-2">
            Vote Output Quality:
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { id: "alpha", label: "Alpha Wins" },
                { id: "tie", label: "Tie" },
                { id: "beta", label: "Beta Wins" },
              ] as const
            ).map((v) => {
              const selected = winner === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setWinner(v.id)}
                  className={`py-1.5 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                    selected
                      ? "border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] shadow-xs"
                      : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                  }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const BiometricPasskeyVaultPreview = () => {
  const [authStatus, setAuthStatus] = useState<
    "idle" | "scanning" | "verified" | "failed"
  >("idle");
  const [credentialType, setCredentialType] = useState<
    "passkey" | "fido2" | "yubikey"
  >("passkey");

  const startScan = () => {
    if (authStatus === "scanning") return;
    setAuthStatus("scanning");
    setTimeout(() => {
      setAuthStatus("verified");
    }, 1400);
  };

  const reset = () => {
    setAuthStatus("idle");
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Passkey & Biometric Scanner
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            FIDO2 WebAuthn Hardware Authenticator
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>FIPS 140-3</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex items-center justify-center p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] gap-1">
          {(["passkey", "fido2", "yubikey"] as const).map((t) => {
            const active = credentialType === t;
            return (
              <button
                key={t}
                onClick={() => setCredentialType(t)}
                className="relative flex-1 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer capitalize"
              >
                {active && (
                  <motion.div
                    layoutId="cred-type-pill"
                    className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/15 border border-[var(--patiya-color-primary)]/30"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active
                      ? "text-[var(--patiya-color-primary)]"
                      : "text-[var(--patiya-color-muted-foreground)]"
                  }`}
                >
                  {t}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative h-44 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/70 overflow-hidden flex flex-col items-center justify-center">
          <div className="relative w-20 h-20 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] flex items-center justify-center overflow-hidden">
            <svg
              className={`w-12 h-12 transition-colors duration-300 ${
                authStatus === "verified"
                  ? "text-emerald-500"
                  : authStatus === "scanning"
                    ? "text-[var(--patiya-color-primary)]"
                    : "text-[var(--patiya-color-muted-foreground)]"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
              <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
              <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
              <path d="M2 12a10 10 0 0 1 18-6" />
              <path d="M2 16h.01" />
              <path d="M21.8 16c.2-2 .131-5.354 0-6" />
              <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
              <path d="M8.65 22c.21-.66.45-1.32.57-2" />
              <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
            </svg>

            {authStatus === "scanning" && (
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: ["0%", "95%", "0%"] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-0 right-0 h-0.5 bg-[var(--patiya-color-primary)] shadow-[0_0_8px_var(--patiya-color-primary)]"
              />
            )}

            {authStatus === "verified" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute inset-0 bg-emerald-500/15 flex items-center justify-center backdrop-blur-xs"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
              </motion.div>
            )}
          </div>

          <p className="mt-3 text-xs font-mono font-bold text-[var(--patiya-color-foreground)]">
            {authStatus === "idle" && "Ready to Verify"}
            {authStatus === "scanning" &&
              "Validating Cryptographic Attestation..."}
            {authStatus === "verified" && "✓ Hardware Key Attested & Bound"}
          </p>

          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] mt-0.5">
            sha256: 4f8a...c92b • secp256r1
          </p>
        </div>

        <div className="flex gap-2">
          {authStatus === "verified" ? (
            <button
              onClick={reset}
              className="w-full py-2 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-xs font-semibold cursor-pointer"
            >
              Reset Session
            </button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={startScan}
              disabled={authStatus === "scanning"}
              className="w-full py-2 rounded-xl bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {authStatus === "scanning" ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      ease: "linear",
                    }}
                    className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Verifying Token...</span>
                </>
              ) : (
                <span>⚡ Touch Biometric Sensor</span>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export const TotpAuthenticatorRingPreview = () => {
  type Account = {
    id: string;
    name: string;
    issuer: string;
    token: string;
  };

  const accounts: Account[] = [
    {
      id: "1",
      name: "dev-cluster@github.com",
      issuer: "GitHub",
      token: "849 201",
    },
    {
      id: "2",
      name: "root@aws-production",
      issuer: "AWS IAM",
      token: "412 995",
    },
    {
      id: "3",
      name: "sre-ops@cloudflare",
      issuer: "Cloudflare",
      token: "603 148",
    },
  ];

  const [activeAccount, setActiveAccount] = useState(accounts[0]);
  const [seconds, setSeconds] = useState(24);
  const [copied, setCopied] = useState(false);

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (seconds / 30) * circumference;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Radial TOTP Authenticator
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Time-Decay Multi-Factor Security Ring
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]">
          RFC 6238
        </span>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
          {accounts.map((acc) => {
            const active = activeAccount.id === acc.id;
            return (
              <button
                key={acc.id}
                onClick={() => setActiveAccount(acc)}
                className="relative flex-1 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer truncate"
              >
                {active && (
                  <motion.div
                    layoutId="totp-acc-pill"
                    className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/15 border border-[var(--patiya-color-primary)]/30"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active
                      ? "text-[var(--patiya-color-primary)]"
                      : "text-[var(--patiya-color-muted-foreground)]"
                  }`}
                >
                  {acc.issuer}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-4 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] block truncate">
              {activeAccount.name}
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-extrabold tracking-widest text-[var(--patiya-color-foreground)] block mt-0.5">
              {activeAccount.token}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  className="stroke-[var(--patiya-color-muted)]"
                  strokeWidth="3"
                  fill="none"
                />
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  className="stroke-[var(--patiya-color-primary)] transition-all duration-300"
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span className="absolute text-[10px] font-mono font-bold text-[var(--patiya-color-foreground)]">
                {seconds}s
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="p-2 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] hover:text-[var(--patiya-color-primary)] text-xs cursor-pointer"
              title="Copy Token"
            >
              {copied ? "✓" : "📋"}
            </motion.button>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] pt-0.5">
          <span>HMAC-SHA1 Algorithm</span>
          <button
            onClick={() => setSeconds((s) => (s <= 5 ? 30 : s - 5))}
            className="hover:text-[var(--patiya-color-foreground)] underline cursor-pointer"
          >
            Advance Decay ↻
          </button>
        </div>
      </div>
    </div>
  );
};

export const CryptographicKeyVaultPreview = () => {
  type KeySpec = {
    id: string;
    algorithm: string;
    fingerprint: string;
    entropy: string;
    status: "active" | "rotated" | "shredded";
  };

  const [activeSpec, setActiveSpec] = useState<KeySpec>({
    id: "kms_live_890af2",
    algorithm: "AES-256-GCM",
    fingerprint: "e3:b0:c4:42:98:fc:1c:14",
    entropy: "256.0 bits",
    status: "active",
  });
  const [isRotating, setIsRotating] = useState(false);

  const rotateKey = () => {
    setIsRotating(true);
    setTimeout(() => {
      const hex = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 16).toString(16),
      ).join("");
      setActiveSpec({
        id: `kms_live_${hex}`,
        algorithm: activeSpec.algorithm,
        fingerprint: `${hex.slice(0, 2)}:${hex.slice(2, 4)}:${hex.slice(4, 6)}:c4:98:fc`,
        entropy: "256.0 bits",
        status: "active",
      });
      setIsRotating(false);
    }, 700);
  };

  const shredKey = () => {
    setActiveSpec((prev) => ({ ...prev, status: "shredded" }));
  };

  const restoreKey = () => {
    setActiveSpec({
      id: "kms_live_890af2",
      algorithm: "AES-256-GCM",
      fingerprint: "e3:b0:c4:42:98:fc:1c:14",
      entropy: "256.0 bits",
      status: "active",
    });
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Cryptographic Key Rotator & Vault
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Hardware Security Module Key Lifecycle
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)]">
          HSM Level 3
        </span>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-3">
        <div className="p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--patiya-color-foreground)]">
              {activeSpec.algorithm}
            </span>
            <span
              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                activeSpec.status === "active"
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                  : "bg-red-500/10 text-red-500 border border-red-500/20"
              }`}
            >
              {activeSpec.status}
            </span>
          </div>

          <div className="space-y-1 font-mono text-[10px]">
            <div className="flex justify-between text-[var(--patiya-color-muted-foreground)]">
              <span>KEY ID:</span>
              <span className="text-[var(--patiya-color-foreground)] font-bold">
                {activeSpec.id}
              </span>
            </div>
            <div className="flex justify-between text-[var(--patiya-color-muted-foreground)]">
              <span>FINGERPRINT:</span>
              <span className="text-[var(--patiya-color-foreground)]">
                {activeSpec.fingerprint}
              </span>
            </div>
            <div className="flex justify-between text-[var(--patiya-color-muted-foreground)]">
              <span>ENTROPY POOL:</span>
              <span className="text-emerald-500 font-bold">
                {activeSpec.entropy}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={rotateKey}
            disabled={isRotating || activeSpec.status === "shredded"}
            className="py-1.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
          >
            {isRotating ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                className="inline-block w-3 h-3 border-2 border-[var(--patiya-color-foreground)] border-t-transparent rounded-full"
              />
            ) : (
              <span>↻ Rotate Key</span>
            )}
          </motion.button>

          {activeSpec.status === "shredded" ? (
            <button
              onClick={restoreKey}
              className="py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-xs font-semibold cursor-pointer"
            >
              Restore Key
            </button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={shredKey}
              className="py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-semibold cursor-pointer"
            >
              ⚠️ Shred Key
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export const ZeroTrustAccessRadarPreview = () => {
  type SessionNode = {
    id: string;
    city: string;
    device: string;
    ip: string;
    active: boolean;
  };

  const initialSessions: SessionNode[] = [
    {
      id: "s-1",
      city: "San Francisco, US",
      device: "MacBook Pro M3",
      ip: "198.51.100.4",
      active: true,
    },
    {
      id: "s-2",
      city: "Tokyo, JP",
      device: "iPhone 16 Pro",
      ip: "203.0.113.19",
      active: true,
    },
    {
      id: "s-3",
      city: "Frankfurt, DE",
      device: "Linux Node v2",
      ip: "192.0.2.82",
      active: true,
    },
  ];

  const [sessions, setSessions] = useState(initialSessions);
  const [selectedSession, setSelectedSession] = useState(sessions[0]);

  const revoke = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (selectedSession.id === id) {
      setSelectedSession(sessions.find((s) => s.id !== id) || sessions[0]);
    }
  };

  const resetSessions = () => {
    setSessions(initialSessions);
    setSelectedSession(initialSessions[0]);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Zero-Trust Session Radar
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Realtime Perimeter Threat & Device Graph
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <span>0.02 Low Risk</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-3">
        <div className="relative h-36 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/80 flex items-center justify-center overflow-hidden">
          <div className="absolute w-28 h-28 rounded-full border border-[var(--patiya-color-border)]/60" />
          <div className="absolute w-20 h-20 rounded-full border border-[var(--patiya-color-border)]/40" />
          <div className="absolute w-12 h-12 rounded-full border border-[var(--patiya-color-border)]/30" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-[var(--patiya-color-primary)] origin-right" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--patiya-color-primary)] ring-4 ring-[var(--patiya-color-primary)]/20" />
          </div>

          <div className="absolute top-3 left-4 text-[9px] font-mono text-[var(--patiya-color-muted-foreground)]">
            NODES ACTIVE: {sessions.length}
          </div>
        </div>

        <div className="space-y-1.5">
          <AnimatePresence mode="popLayout">
            {sessions.map((sess) => (
              <motion.div
                key={sess.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => setSelectedSession(sess)}
                className={`p-2 rounded-xl border flex items-center justify-between text-xs cursor-pointer ${
                  selectedSession.id === sess.id
                    ? "border-[var(--patiya-color-primary)] bg-[var(--patiya-color-background)] shadow-xs"
                    : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/60"
                }`}
              >
                <div className="min-w-0">
                  <p className="font-bold text-[var(--patiya-color-foreground)] truncate">
                    {sess.city}
                  </p>
                  <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] truncate">
                    {sess.device} • {sess.ip}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    revoke(sess.id);
                  }}
                  className="px-2 py-0.5 rounded text-[10px] font-mono text-red-500 hover:bg-red-500/10 cursor-pointer shrink-0"
                >
                  Revoke
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {sessions.length === 0 && (
            <div className="py-6 text-center space-y-1">
              <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                All sessions revoked
              </p>
              <button
                onClick={resetSessions}
                className="text-[10px] font-mono text-[var(--patiya-color-primary)] underline cursor-pointer"
              >
                Reset sessions
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const StealthSecretMaskerPreview = () => {
  type SecretItem = {
    key: string;
    value: string;
    revealed: boolean;
  };

  const initialSecrets: SecretItem[] = [
    {
      key: "DATABASE_URL",
      value: "postgresql://usr:k89x2@edge-pg.internal:5432/db",
      revealed: false,
    },
    {
      key: "STRIPE_SECRET_KEY",
      value: "sk_live_51N8xZ9021qLk9912",
      revealed: false,
    },
    {
      key: "JWT_HMAC_SECRET",
      value: "x9f2_auth_sig_88920194bc0281",
      revealed: false,
    },
  ];

  const [secrets, setSecrets] = useState(initialSecrets);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleReveal = (key: string) => {
    setSecrets((prev) =>
      prev.map((s) => (s.key === key ? { ...s, revealed: !s.revealed } : s)),
    );
  };

  const copyVal = (s: SecretItem) => {
    setCopiedKey(s.key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
            Stealth Secret Masker
          </h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Zero-Leak Environment Variable Vault
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]">
          Auto-Mask
        </span>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-2.5">
        {secrets.map((s) => (
          <div
            key={s.key}
            className="p-2.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] space-y-1.5"
          >
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="font-bold text-[var(--patiya-color-foreground)]">
                {s.key}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleReveal(s.key)}
                  className="px-1.5 py-0.5 rounded text-[10px] text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)] cursor-pointer"
                >
                  {s.revealed ? "Hide" : "Reveal"}
                </button>
                <button
                  onClick={() => copyVal(s)}
                  className="px-1.5 py-0.5 rounded text-[10px] text-[var(--patiya-color-primary)] hover:bg-[var(--patiya-color-primary)]/10 cursor-pointer"
                >
                  {copiedKey === s.key ? "Copied ✓" : "Copy"}
                </button>
              </div>
            </div>

            <div className="p-1.5 rounded-lg bg-[var(--patiya-color-muted)]/50 font-mono text-[10px] text-[var(--patiya-color-foreground)] overflow-hidden">
              <AnimatePresence mode="wait">
                {s.revealed ? (
                  <motion.div
                    key="clear"
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    className="truncate text-emerald-500 font-semibold"
                  >
                    {s.value}
                  </motion.div>
                ) : (
                  <motion.div
                    key="dots"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="tracking-widest text-[var(--patiya-color-muted-foreground)]"
                  >
                    ••••••••••••••••••••••••••••••••
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const blocksRegistry: Record<string, BlockItem> = {
  "action-dock": {
    title: "Floating Action Dock",
    description:
      "A dynamic floating dock widget featuring spring magnification, layoutId pill indicators, and unread notification alerts.",
    category: "Toolbars & Docks",
    badge: "motion.dev",
    preview: <ActionDockPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function ActionDock() {
  const [active, setActive] = useState(0);
  const items = ['Overview', 'Metrics', 'Activity', 'Settings'];

  return (
    <div className="max-w-full overflow-x-auto no-scrollbar inline-flex gap-1.5 p-1.5 rounded-2xl border bg-card">
      {items.map((item, idx) => (
        <button key={item} onClick={() => setActive(idx)} className="relative shrink-0 px-3 sm:px-3.5 py-2 text-xs font-medium">
          {active === idx && (
            <motion.div layoutId="dock-pill" className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/30" />
          )}
          <span className="relative z-10">{item}</span>
        </button>
      ))}
    </div>
  );
}`,
  },
  "metric-card": {
    title: "Live Metric Card",
    description:
      "Compact telemetry card featuring animated spring bar graphs, live health pulse indicators, and interactive timeframe controls.",
    category: "Metrics & Stats",
    badge: "motion.dev",
    preview: <MetricCardPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function LiveMetricCard() {
  const [time, setTime] = useState<'1h' | '24h'>('24h');
  const bars = time === '24h' ? [40, 70, 55, 90, 60] : [30, 50, 40, 65, 45];

  return (
    <div className="w-full p-4 sm:p-5 rounded-2xl border bg-card max-w-sm">
      <div className="flex justify-between items-center pb-3 border-b">
        <span className="text-xs font-semibold">Latency</span>
        <button onClick={() => setTime(time === '24h' ? '1h' : '24h')} className="text-xs font-mono">{time}</button>
      </div>
      <div className="mt-4 h-16 flex items-end gap-1.5">
        {bars.map((b, i) => (
          <motion.div key={i} animate={{ height: \`\${b}%\` }} className="flex-1 bg-primary/80 rounded-sm" />
        ))}
      </div>
    </div>
  );
}`,
  },
  "notification-stack": {
    title: "Interactive Notification Stack",
    description:
      "Modular stacked notifications card with smooth AnimatePresence exit transitions and spring layout reordering.",
    category: "Notifications",
    badge: "motion.dev",
    preview: <NotificationStackPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function NotificationStack() {
  const [items, setItems] = useState(['Build Succeeded', 'Snapshot Completed', 'API Key Created']);

  return (
    <div className="w-full space-y-2 max-w-sm">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            key={item}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="p-3 rounded-xl border bg-card flex justify-between items-center text-xs font-semibold"
          >
            <span className="truncate pr-2">{item}</span>
            <button onClick={() => setItems(items.filter((i) => i !== item))} className="shrink-0">✕</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}`,
  },
  "step-tracker": {
    title: "Morphing Step Progress Tracker",
    description:
      "Checklist component block with interactive checkmarks that trigger spring SVG path reveals and dynamic progress bar fills.",
    category: "Progress & Steps",
    badge: "motion.dev",
    preview: <StepTrackerPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function StepTracker() {
  const [completed, setCompleted] = useState<number[]>([1, 2]);
  const steps = [1, 2, 3, 4];

  return (
    <div className="w-full p-4 sm:p-5 rounded-2xl border bg-card max-w-sm">
      <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-4">
        <motion.div animate={{ width: \`\${(completed.length / steps.length) * 100}%\` }} className="h-full bg-primary" />
      </div>
      <div className="space-y-2">
        {steps.map((s) => (
          <button
            key={s}
            onClick={() => setCompleted(completed.includes(s) ? completed.filter((c) => c !== s) : [...completed, s])}
            className="w-full p-2.5 rounded-xl border flex justify-between text-xs"
          >
            <span>Step {s}</span>
            <span>{completed.includes(s) ? '✓' : '○'}</span>
          </button>
        ))}
      </div>
    </div>
  );
}`,
  },
  "segmented-control": {
    title: "Fluid Segmented Switcher",
    description:
      "Tactile multi-option segmented controller with spring physics sliding pill, count chips, and crossfade panel transitions.",
    category: "Segmented Controls",
    badge: "motion.dev",
    preview: <SegmentedControlPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function SegmentedControl() {
  const [selected, setSelected] = useState('Components');
  const tabs = ['Components', 'Blocks', 'Themes'];

  return (
    <div className="w-full flex p-1 rounded-xl border bg-muted/50 max-w-sm">
      {tabs.map((tab) => (
        <button key={tab} onClick={() => setSelected(tab)} className="relative flex-1 py-1.5 px-1 sm:px-2 text-xs font-semibold">
          {selected === tab && (
            <motion.div layoutId="pill" className="absolute inset-0 rounded-lg bg-background border" />
          )}
          <span className="relative z-10 truncate">{tab}</span>
        </button>
      ))}
    </div>
  );
}`,
  },
  "expandable-card": {
    title: "Morphing Detail Card",
    description:
      "Compact cluster card that smoothly morphs open into an extended configuration drawer with FLIP spring transitions.",
    category: "Expandable Cards",
    badge: "motion.dev",
    preview: <ExpandableCardPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function MorphingDetailCard() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout className="w-full p-4 sm:p-5 rounded-2xl border bg-card max-w-sm">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-bold">Postgres Cluster</h4>
        <button onClick={() => setOpen(!open)} className="px-2.5 py-1 text-xs font-semibold rounded-lg border">
          {open ? 'Close' : 'Manage'}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pt-4 mt-4 border-t text-xs">
            Storage: 38.2 / 100 GB
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}`,
  },
  "floating-command-dock": {
    title: "Floating Command Dock",
    description:
      "Floating status and command dock with status indicator, interactive terminal preview, and quick endpoint copying.",
    category: "Toolbars & Docks",
    badge: "motion.dev",
    preview: <FloatingCommandDockPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingCommandDock() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto select-none">
      <div className="p-1.5 rounded-2xl border bg-card flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 pl-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground truncate">prod-cluster</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => setOpen(!open)} className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium border">
            Logs
          </button>
          <button
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium border"
          >
            {copied ? 'Copied' : 'Copy URL'}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-2 p-3 rounded-2xl border bg-card text-xs font-mono break-all">
            &gt; Status: 200 OK | Latency: 1.2ms
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`,
  },
  "analytics-spark-card": {
    title: "Analytics Spark Card",
    description:
      "Interactive KPI metrics block with interactive timeframe selector, animated SVG trend curves, and cursor scrubber points.",
    category: "Metrics & Stats",
    badge: "motion.dev",
    preview: <AnalyticsSparkCardPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function AnalyticsSparkCard() {
  const [range, setRange] = useState<'24h' | '7d'>('7d');
  const points = range === '7d' ? [120, 180, 150, 240, 210, 290, 340] : [24, 38, 30, 48, 42, 65, 80];

  return (
    <div className="w-full p-4 sm:p-5 rounded-2xl border bg-card max-w-sm select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b">
        <div>
          <span className="text-[10px] uppercase font-bold text-muted-foreground">Requests</span>
          <h3 className="text-2xl font-bold mt-1">{range === '7d' ? '318.4k' : '48.2k'}</h3>
        </div>
        <div className="flex p-0.5 rounded-xl border bg-background shrink-0">
          {(['24h', '7d'] as const).map((r) => (
            <button key={r} onClick={() => setRange(r)} className="relative px-2.5 py-1 text-xs font-medium">
              {range === r && <motion.div layoutId="range-pill" className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20" />}
              <span className="relative z-10">{r}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  },
  "interactive-toast-pill": {
    title: "Interactive Toast Pill",
    description:
      "Dynamic island-style status capsule with live progress spinners, success checks, and undo recovery triggers.",
    category: "Notifications",
    badge: "motion.dev",
    preview: <InteractiveToastPillPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function InteractiveToastPill() {
  const [syncing, setSyncing] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <motion.div layout className="w-full p-2 rounded-2xl border bg-card max-w-sm flex items-center justify-between gap-2">
      <span className="text-xs font-medium px-2 truncate">
        {syncing ? 'Syncing cluster...' : done ? 'Sync Complete' : 'Worker Ready'}
      </span>
      <button
        onClick={() => {
          setSyncing(true);
          setTimeout(() => {
            setSyncing(false);
            setDone(true);
          }, 1500);
        }}
        className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground"
      >
        {done ? 'Done' : 'Sync'}
      </button>
    </motion.div>
  );
}`,
  },
  "circular-journey-tracker": {
    title: "Circular Journey Tracker",
    description:
      "Milestone completion card with animated circular SVG stroke progress and interactive step toggles.",
    category: "Progress & Steps",
    badge: "motion.dev",
    preview: <CircularJourneyTrackerPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function CircularJourneyTracker() {
  const [completed, setCompleted] = useState([1, 2]);
  const tasks = ['DNS Configured', 'SSL Issued', 'Database Ready', 'Cache Warm'];

  return (
    <div className="w-full p-4 sm:p-5 rounded-2xl border bg-card max-w-sm">
      <h4 className="text-xs font-bold text-muted-foreground uppercase">Launch Readiness</h4>
      <div className="mt-4 space-y-2">
        {tasks.map((task, i) => (
          <button
            key={task}
            onClick={() => setCompleted(completed.includes(i) ? completed.filter((c) => c !== i) : [...completed, i])}
            className="w-full p-2.5 rounded-xl border flex justify-between text-xs"
          >
            <span>{task}</span>
            <span>{completed.includes(i) ? '✓' : '○'}</span>
          </button>
        ))}
      </div>
    </div>
  );
}`,
  },
  "adaptive-filter-bar": {
    title: "Adaptive Filter Bar",
    description:
      "Compact multi-category filter bar with animated sliding pill indicators, item counts, and tag toggles.",
    category: "Segmented Controls",
    badge: "motion.dev",
    preview: <AdaptiveFilterBarPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function AdaptiveFilterBar() {
  const [cat, setCat] = useState('All');
  const tabs = ['All', 'UI', 'Motion', 'Layouts'];

  return (
    <div className="w-full p-4 rounded-2xl border bg-card max-w-md space-y-3">
      <div className="flex overflow-x-auto no-scrollbar p-1 rounded-xl border bg-background gap-1">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setCat(tab)} className="relative shrink-0 sm:flex-1 px-3 sm:px-2 py-1.5 text-xs font-semibold">
            {cat === tab && <motion.div layoutId="pill" className="absolute inset-0 rounded-lg bg-card border" />}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>
    </div>
  );
}`,
  },
  "layered-feature-card": {
    title: "Layered Feature Card",
    description:
      "Multi-layer service card that expands with FLIP motion into an interactive specs and key-value inspect drawer.",
    category: "Expandable Cards",
    badge: "motion.dev",
    preview: <LayeredFeatureCardPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function LayeredFeatureCard() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout className="w-full p-4 sm:p-5 rounded-2xl border bg-card max-w-sm">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-bold">Edge Worker</h4>
        <button onClick={() => setOpen(!open)} className="px-2.5 py-1 text-xs font-semibold rounded-lg border">
          {open ? 'Hide' : 'Inspect'}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pt-4 mt-4 border-t text-xs font-mono">
            Memory: 142 MB / 512 MB
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}`,
  },
  "contextual-tool-palette": {
    title: "Contextual Tool Palette",
    description:
      "Interactive floating canvas toolbar with sub-palette flyouts, spring tooltips, active tool indicator, and quick undo/redo.",
    category: "Toolbars & Docks",
    badge: "motion.dev",
    preview: <ContextualToolPalettePreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function ContextualToolPalette() {
  const [tool, setTool] = useState('shape');
  const [shape, setShape] = useState('rectangle');

  return (
    <div className="relative max-w-full overflow-x-auto no-scrollbar inline-flex items-center gap-1.5 p-1.5 rounded-2xl border bg-card">
      <button onClick={() => setTool('pointer')} className="relative shrink-0 p-2 rounded-xl text-xs">
        {tool === 'pointer' && (
          <motion.div layoutId="tool-pill" className="absolute inset-0 rounded-xl bg-primary/15 border border-primary/30" />
        )}
        <span className="relative z-10">Pointer</span>
      </button>
      <button onClick={() => setTool('shape')} className="relative shrink-0 p-2 rounded-xl text-xs">
        {tool === 'shape' && (
          <motion.div layoutId="tool-pill" className="absolute inset-0 rounded-xl bg-primary/15 border border-primary/30" />
        )}
        <span className="relative z-10">Shape</span>
      </button>
    </div>
  );
}`,
  },
  "faceted-filter-segment": {
    title: "Faceted Filter Segment",
    description:
      "Interactive multi-facet segmented controller with animated indicator pill, live status filter tags, and layout transitions.",
    category: "Segmented Controls",
    badge: "motion.dev",
    preview: <FacetedFilterSegmentPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function FacetedFilterSegment() {
  const [view, setView] = useState('all');
  const tabs = [
    { id: 'all', label: 'All', count: 24 },
    { id: 'active', label: 'Active', count: 14 },
    { id: 'review', label: 'In Review', count: 6 },
  ];

  return (
    <div className="w-full p-4 rounded-2xl border bg-card max-w-md space-y-3">
      <div className="flex overflow-x-auto no-scrollbar p-1 rounded-xl border bg-background gap-1">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setView(tab.id)} className="relative shrink-0 sm:flex-1 px-3 sm:px-2 py-1.5 text-xs font-semibold">
            {view === tab.id && <motion.div layoutId="faceted-pill" className="absolute inset-0 rounded-lg bg-card border" />}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}`,
  },
  "interactive-alert-capsule": {
    title: "Dynamic Alert Capsule",
    description:
      "Interactive dynamic-island notification capsule with collapsible status details, countdown progress bar, and action controls.",
    category: "Notifications",
    badge: "motion.dev",
    preview: <InteractiveAlertCapsulePreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function DynamicAlertCapsule() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div layout className="w-full p-3.5 rounded-2xl border bg-card max-w-md">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold truncate">Production Deploy #429</span>
        <button onClick={() => setExpanded(!expanded)} className="shrink-0 px-2.5 py-1 text-xs rounded-lg border">
          {expanded ? 'Collapse' : 'Inspect'}
        </button>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pt-3 mt-3 border-t text-xs">
            Region: iad1 • Commit: 7f4c9a1
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}`,
  },
  "telemetry-live-stream": {
    title: "Realtime Telemetry Monitor",
    description:
      "Live streaming system telemetry card featuring animated frequency bars, latency health indicators, and mode switching.",
    category: "Metrics & Stats",
    badge: "motion.dev",
    preview: <TelemetryLiveStreamPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function RealtimeTelemetryMonitor() {
  const [mode, setMode] = useState('throughput');
  const bars = [35, 48, 65, 82, 55, 74, 90, 68, 85, 70, 95, 60, 78, 88];

  return (
    <div className="w-full p-4 sm:p-5 rounded-2xl border bg-card max-w-md space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold">Live Telemetry</span>
        <span className="text-xs font-mono text-emerald-500 font-bold">8.42 Gbps</span>
      </div>
      <div className="h-16 flex items-end gap-1">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            animate={{ height: [\`\${bar - 10}%\`, \`\${bar}%\`, \`\${bar + 10}%\`] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
            className="flex-1 rounded-sm bg-primary"
          />
        ))}
      </div>
    </div>
  );
}`,
  },
  "deploy-pipeline-stepper": {
    title: "Pipeline Release Stepper",
    description:
      "Multi-stage deployment pipeline with animated progress track, expandable step logs, and interactive stage controls.",
    category: "Progress & Steps",
    badge: "motion.dev",
    preview: <DeployPipelineStepperPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function PipelineReleaseStepper() {
  const [active, setActive] = useState(2);
  const steps = ['Validate & Test', 'Compile Image', 'Canary Deploy', 'Global Release'];

  return (
    <div className="w-full p-4 sm:p-5 rounded-2xl border bg-card max-w-md space-y-3">
      {steps.map((step, idx) => (
        <motion.div key={step} layout className="p-3 rounded-xl border flex items-center justify-between gap-2 text-xs">
          <span className={active === idx ? 'truncate font-bold text-primary' : 'truncate text-muted-foreground'}>{step}</span>
          <span className="shrink-0 text-xs font-mono">{active > idx ? 'Done' : active === idx ? 'Running' : 'Queued'}</span>
        </motion.div>
      ))}
    </div>
  );
}`,
  },
  "morphing-search-dock": {
    title: "Morphing Search Dock",
    description:
      "Compact floating dock that seamlessly morphs into an expanded search command bar with filters and keyboard navigation.",
    category: "Toolbars & Docks",
    badge: "motion.dev",
    preview: <MorphingSearchDockPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function MorphingSearchDock() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout className="w-full max-w-xs sm:max-w-sm rounded-2xl border bg-card p-1.5 flex items-center justify-center">
      {!open ? (
        <button onClick={() => setOpen(true)} className="px-3.5 py-2 text-xs flex items-center gap-2">
          <span>Search</span>
          <span className="font-mono text-[10px] px-1 rounded border">⌘K</span>
        </button>
      ) : (
        <div className="p-3 w-full space-y-2">
          <input autoFocus placeholder="Type a command..." className="w-full bg-transparent text-xs outline-none" />
          <button onClick={() => setOpen(false)} className="text-xs text-muted-foreground">Close</button>
        </div>
      )}
    </motion.div>
  );
}`,
  },
  "live-activity-banner": {
    title: "Live Activity Banner",
    description:
      "Real-time activity notification banner with live progress track, transfer velocity, and collapsible task telemetry.",
    category: "Notifications",
    badge: "motion.dev",
    preview: <LiveActivityBannerPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function LiveActivityBanner() {
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div layout className="w-full rounded-2xl border bg-card p-3.5 max-w-md">
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-2">
        <div className="min-w-0">
          <h4 className="text-xs font-bold truncate">Syncing to Edge CDN</h4>
          <p className="text-[11px] text-muted-foreground font-mono truncate">18.4 MB / 28.6 MB (64%)</p>
        </div>
        <button onClick={() => setPaused(!paused)} className="shrink-0 px-2.5 py-1 text-xs rounded-lg border">
          {paused ? 'Resume' : 'Pause'}
        </button>
      </div>
      <div className="h-1 bg-muted rounded-full mt-3 overflow-hidden">
        <motion.div animate={{ width: '64%' }} className="h-full bg-primary" />
      </div>
    </motion.div>
  );
}`,
  },
  "fluid-equalizer-scrubber": {
    title: "Fluid Equalizer Scrubber",
    description:
      "Interactive audio spectrum visualizer with animated frequency bars, draggable playhead scrubber, and preset band toggles.",
    category: "Tactile Surfaces & Controls",
    badge: "motion.dev",
    preview: <FluidEqualizerScrubberPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function FluidEqualizerScrubber() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(42);
  const bars = [88, 95, 82, 75, 60, 45, 35, 40, 48, 52, 40, 36, 42, 48, 55, 60, 50, 40, 35, 30];

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto p-4 sm:p-5 rounded-2xl border bg-card space-y-4">
      <div className="flex justify-between items-center pb-3 border-b">
        <span className="text-xs font-bold">Master Spectrum</span>
        <span className="text-[10px] font-mono text-muted-foreground">48kHz • 24-bit</span>
      </div>
      <div className="h-20 flex items-end justify-between gap-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm bg-primary"
            animate={{
              height: isPlaying ? [Math.max(12, h - 18) + '%', h + '%', Math.min(100, h + 14) + '%'] : Math.max(10, h * 0.35) + '%',
            }}
            transition={{ duration: 0.8 + (i % 5) * 0.15, repeat: isPlaying ? Infinity : 0, repeatType: 'reverse' }}
          />
        ))}
      </div>
      <div className="relative h-6 flex items-center cursor-pointer" onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setProgress(Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))));
      }}>
        <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div className="h-full bg-primary" animate={{ width: progress + '%' }} />
        </div>
      </div>
      <div className="flex justify-between items-center text-xs">
        <button onClick={() => setIsPlaying(!isPlaying)} className="px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <span className="font-mono text-xs">{progress}%</span>
      </div>
    </div>
  );
}`,
  },
  "tactile-rotary-dial": {
    title: "Tactile Rotary Dial",
    description:
      "Precision circular rotary controller with continuous radial degree rotation, spring value readout, and step preset stops.",
    category: "Tactile Surfaces & Controls",
    badge: "motion.dev",
    preview: <TactileRotaryDialPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function TactileRotaryDial() {
  const [value, setValue] = useState(65);
  const angle = (value / 100) * 270 - 135;

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border bg-card flex flex-col items-center space-y-4 select-none">
      <div className="w-full flex justify-between items-center pb-3 border-b">
        <span className="text-xs font-bold">Rotary Drive</span>
        <span className="text-xs font-mono font-bold text-primary">+{((value * 0.24)).toFixed(1)} dB</span>
      </div>
      <div className="relative w-40 h-40 flex items-center justify-center">
        <motion.div
          className="w-24 h-24 rounded-full border-2 bg-background flex items-center justify-center relative cursor-grab active:cursor-grabbing"
          animate={{ rotate: angle }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        >
          <div className="absolute top-2 w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs font-mono font-bold">{value}%</span>
        </motion.div>
      </div>
      <div className="w-full flex justify-between gap-1 text-xs">
        {[0, 25, 50, 75, 100].map((p) => (
          <button key={p} onClick={() => setValue(p)} className="px-2 py-1 rounded-lg border font-mono">
            {p}%
          </button>
        ))}
      </div>
    </div>
  );
}`,
  },
  "spatial-coordinate-pad": {
    title: "Spatial Coordinate Pad",
    description:
      "Dual-axis XY vector pad with spring inertia rubber-banding, real-time coordinate telemetry, and vector crosshairs.",
    category: "Tactile Surfaces & Controls",
    badge: "motion.dev",
    preview: <SpatialCoordinatePadPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function SpatialCoordinatePad() {
  const [pos, setPos] = useState({ x: 30, y: -25 });

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto p-4 sm:p-5 rounded-2xl border bg-card space-y-4 select-none">
      <div className="flex justify-between items-center pb-3 border-b text-xs">
        <span className="font-bold">2D Vector Surface</span>
        <span className="font-mono text-primary font-bold">X: {pos.x} | Y: {pos.y}</span>
      </div>
      <div className="relative w-full h-52 rounded-xl border bg-background flex items-center justify-center overflow-hidden">
        <motion.div
          drag
          dragConstraints={{ left: -80, right: 80, top: -70, bottom: 70 }}
          dragElastic={0.2}
          onDrag={(_, info) => setPos({ x: Math.round(info.offset.x + pos.x), y: Math.round(info.offset.y + pos.y) })}
          animate={{ x: pos.x, y: pos.y }}
          className="w-10 h-10 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <div className="w-2 h-2 rounded-full bg-primary" />
        </motion.div>
      </div>
      <div className="flex justify-end gap-1.5 text-xs">
        <button onClick={() => setPos({ x: 0, y: 0 })} className="px-2.5 py-1 rounded-lg border">Origin</button>
        <button onClick={() => setPos({ x: 45, y: -35 })} className="px-2.5 py-1 rounded-lg border">Top-R</button>
      </div>
    </div>
  );
}`,
  },
  "elastic-spring-slider": {
    title: "Elastic Spring Slider",
    description:
      "Tactile rubber-banding slider with magnetic snap detents, floating numeric tooltip pill, and dynamic spring response.",
    category: "Tactile Surfaces & Controls",
    badge: "motion.dev",
    preview: <ElasticSpringSliderPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function ElasticSpringSlider() {
  const [value, setValue] = useState(68);

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto p-4 sm:p-5 rounded-2xl border bg-card space-y-4 select-none">
      <div className="flex justify-between items-center pb-3 border-b text-xs">
        <span className="font-bold">Elastic Fluid Fader</span>
        <span className="font-mono text-primary font-bold">{value}%</span>
      </div>
      <div
        className="relative h-10 flex items-center cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setValue(Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))));
        }}
      >
        <div className="w-full h-3 rounded-full bg-muted overflow-hidden border">
          <motion.div className="h-full bg-primary" animate={{ width: value + '%' }} />
        </div>
        <motion.div
          className="absolute w-6 h-6 rounded-full border-2 border-background bg-primary -ml-3 shadow-md flex items-center justify-center cursor-grab"
          animate={{ left: value + '%' }}
          transition={{ type: 'spring', stiffness: 350, damping: 26 }}
        />
      </div>
      <div className="flex justify-between text-xs">
        <button onClick={() => setValue(0)} className="px-2.5 py-1 rounded-lg border">Mute</button>
        <button onClick={() => setValue(100)} className="px-2.5 py-1 rounded-lg border">Max</button>
      </div>
    </div>
  );
}`,
  },
  "morphing-arc-menu": {
    title: "Morphing Arc Radial Menu",
    description:
      "Circular floating action hub that blooms into a fan arc of staggered action controls with spring magnification and fluid collapse.",
    category: "Tactile Surfaces & Controls",
    badge: "motion.dev",
    preview: <MorphingArcMenuPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function MorphingArcMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const actions = ['🎙', '📷', '🖥', '📡', '⚡'];

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border bg-card flex flex-col items-center space-y-6 select-none">
      <div className="w-full flex justify-between items-center pb-3 border-b text-xs">
        <span className="font-bold">Radial Action Arc</span>
        <span className="text-muted-foreground">{isOpen ? 'Expanded' : 'Collapsed'}</span>
      </div>
      <div className="relative w-56 h-36 flex items-end justify-center pb-2">
        <AnimatePresence>
          {isOpen && actions.map((icon, idx) => {
            const angle = Math.PI + (Math.PI / (actions.length - 1)) * idx;
            const x = Math.cos(angle) * 75;
            const y = Math.sin(angle) * 75;
            return (
              <motion.button
                key={icon}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24, delay: idx * 0.04 }}
                className="absolute w-10 h-10 rounded-full border bg-background flex items-center justify-center text-sm"
              >
                {icon}
              </motion.button>
            );
          })}
        </AnimatePresence>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold"
        >
          <motion.span animate={{ rotate: isOpen ? 45 : 0 }}>+</motion.span>
        </motion.button>
      </div>
    </div>
  );
}`,
  },
  "haptic-keypad-matrix": {
    title: "Haptic Keypad Matrix",
    description:
      "Tactile multi-pad velocity controller matrix with physical press depth simulation, active LED pulse indicators, and bank switching.",
    category: "Tactile Surfaces & Controls",
    badge: "motion.dev",
    preview: <HapticKeypadMatrixPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function HapticKeypadMatrix() {
  const [active, setActive] = useState<number | null>(null);
  const pads = ['BD-01', 'SD-02', 'CH-03', 'OH-04', 'CP-05', 'RS-06', '808-07', 'FX-08', 'VC-09'];

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border bg-card space-y-4 select-none">
      <div className="flex justify-between items-center pb-3 border-b text-xs">
        <span className="font-bold">Haptic Velocity Pad</span>
        <span className="font-mono text-muted-foreground">128 BPM</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {pads.map((code, idx) => (
          <motion.button
            key={code}
            whileTap={{ scale: 0.93, y: 2 }}
            onClick={() => {
              setActive(idx);
              setTimeout(() => setActive(null), 250);
            }}
            className={
              'p-3 rounded-xl border flex flex-col justify-between h-20 text-left transition-colors ' +
              (active === idx ? 'border-primary bg-primary/20' : 'border-border bg-background')
            }
          >
            <span className="text-[10px] font-mono text-muted-foreground">{idx + 1}</span>
            <span className="text-xs font-mono font-bold truncate">{code}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}`,
  },
  "interactive-gesture-deck": {
    title: "Interactive Gesture Deck",
    description:
      "Stacked spatial card deck with drag-to-dismiss gesture physics, rotational velocity tilt, spring deck promotion, and instant restore.",
    category: "Tactile Surfaces & Controls",
    badge: "motion.dev",
    preview: <InteractiveGestureDeckPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function InteractiveGestureDeck() {
  const [cards, setCards] = useState([
    { id: 1, title: 'Release v3.4.0', tag: 'Production' },
    { id: 2, title: 'Database Vacuum', tag: 'Maintenance' },
    { id: 3, title: 'Edge Cache Purge', tag: 'Network' },
  ]);
  const [exitDirection, setExitDirection] = useState<'left' | 'right'>('right');

  const handleDismiss = (id: number, direction: 'left' | 'right') => {
    setExitDirection(direction);
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border bg-card space-y-4 select-none">
      <div className="flex justify-between items-center pb-3 border-b text-xs">
        <span className="font-bold">Spatial Gesture Deck</span>
        <span className="font-mono text-primary font-bold">{cards.length} Left</span>
      </div>
      <div className="relative h-40 flex items-center justify-center">
        <AnimatePresence custom={exitDirection}>
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              layout
              custom={exitDirection}
              drag={idx === 0 ? 'x' : false}
              dragConstraints={{ left: -120, right: 120 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) handleDismiss(card.id, 'left');
                else if (info.offset.x > 80) handleDismiss(card.id, 'right');
              }}
              animate={{ scale: 1 - idx * 0.05, y: idx * 8, zIndex: cards.length - idx }}
              variants={{
                exit: (dir: 'left' | 'right') => ({
                  x: dir === 'left' ? -280 : 280,
                  rotate: dir === 'left' ? -20 : 20,
                  opacity: 0,
                  transition: { duration: 0.28 },
                }),
              }}
              exit="exit"
              className="absolute w-full p-4 rounded-xl border bg-background space-y-1 shadow-sm cursor-grab active:cursor-grabbing"
            >
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted">{card.tag}</span>
              <h5 className="text-xs font-bold">{card.title}</h5>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex justify-between text-xs pt-1">
        <button onClick={() => cards[0] && handleDismiss(cards[0].id, 'left')} className="px-3 py-1.5 rounded-xl border text-rose-500 font-semibold">Reject</button>
        <button onClick={() => cards[0] && handleDismiss(cards[0].id, 'right')} className="px-3 py-1.5 rounded-xl border text-emerald-500 font-semibold">Approve</button>
      </div>
    </div>
  );
}`,
  },
  "bezier-curve-surface": {
    title: "Interactive Bezier Curve Surface",
    description:
      "Visual cubic-bezier curve editor with draggable anchor control points, live SVG spline rendering, and real-time timing function output.",
    category: "Interactive Studio Surfaces",
    badge: "motion.dev",
    preview: <BezierCurveSurfacePreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function BezierCurveSurface() {
  const [p1, setP1] = useState({ x: 0.25, y: 0.1 });
  const [p2, setP2] = useState({ x: 0.25, y: 1.0 });

  const x1 = 20 + p1.x * 160;
  const y1 = 180 - p1.y * 160;
  const x2 = 20 + p2.x * 160;
  const y2 = 180 - p2.y * 160;
  const pathD = 'M 20 180 C ' + x1 + ' ' + y1 + ', ' + x2 + ' ' + y2 + ', 180 20';
  const bezier = 'cubic-bezier(' + p1.x.toFixed(2) + ', ' + p1.y.toFixed(2) + ', ' + p2.x.toFixed(2) + ', ' + p2.y.toFixed(2) + ')';

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto p-4 sm:p-5 rounded-2xl border bg-card space-y-4 select-none">
      <div className="flex justify-between items-center pb-3 border-b text-xs">
        <span className="font-bold">Bezier Curve Inspector</span>
        <span className="font-mono text-primary font-bold text-[10px]">CSS Ready</span>
      </div>
      <div className="h-48 rounded-xl border bg-background flex items-center justify-center p-2">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <line x1="20" y1="180" x2={x1} y2={y1} stroke="currentColor" strokeOpacity="0.2" />
          <line x1="180" y1="20" x2={x2} y2={y2} stroke="currentColor" strokeOpacity="0.2" />
          <motion.path d={pathD} fill="none" stroke="currentColor" strokeWidth="3" className="text-primary" />
          <circle cx={x1} cy={y1} r="5" className="fill-primary" />
          <circle cx={x2} cy={y2} r="5" className="fill-primary" />
        </svg>
      </div>
      <div className="p-2.5 rounded-xl border bg-background font-mono text-xs truncate text-muted-foreground">
        {bezier}
      </div>
    </div>
  );
}`,
  },
  "palette-gradient-tuner": {
    title: "Palette & Gradient Tuner",
    description:
      "Interactive color stop gradient arranger with draggable slider markers, real-time CSS gradient preview, and hex token copy.",
    category: "Interactive Studio Surfaces",
    badge: "motion.dev",
    preview: <PaletteGradientTunerPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function PaletteGradientTuner() {
  const [stops, setStops] = useState([
    { id: 1, pos: 0, color: '#6366f1' },
    { id: 2, pos: 50, color: '#a855f7' },
    { id: 3, pos: 100, color: '#ec4899' },
  ]);
  const [angle, setAngle] = useState(90);

  const gradient = 'linear-gradient(' + angle + 'deg, ' + stops.map((s) => s.color + ' ' + s.pos + '%').join(', ') + ')';

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto p-4 sm:p-5 rounded-2xl border bg-card space-y-4 select-none">
      <div className="flex justify-between items-center pb-3 border-b text-xs">
        <span className="font-bold">Gradient Color Tuner</span>
        <span className="font-mono text-primary font-bold">{angle}°</span>
      </div>
      <div className="h-24 rounded-xl border" style={{ background: gradient }} />
      <div className="flex justify-between text-xs">
        {[0, 45, 90, 135, 180].map((deg) => (
          <button key={deg} onClick={() => setAngle(deg)} className="px-2 py-1 rounded-lg border font-mono">
            {deg}°
          </button>
        ))}
      </div>
    </div>
  );
}`,
  },
  "layer-hierarchy-tree": {
    title: "Layer Hierarchy Tree",
    description:
      "Design canvas layer tree with expandable nested groups, visibility eye toggles, lock spring switches, and active selection pill.",
    category: "Interactive Studio Surfaces",
    badge: "motion.dev",
    preview: <LayerHierarchyTreePreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function LayerHierarchyTree() {
  const [selected, setSelected] = useState('2');
  const layers = [
    { id: '1', name: 'Artboard Frame', depth: 0 },
    { id: '2', name: 'Header Navigation', depth: 1 },
    { id: '3', name: 'Brand Logo SVG', depth: 2 },
    { id: '4', name: 'Action Button CTA', depth: 2 },
  ];

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-2xl border bg-card space-y-2 select-none">
      <div className="flex justify-between items-center pb-2 border-b text-xs">
        <span className="font-bold">Layer Tree</span>
        <span className="font-mono text-muted-foreground">{layers.length} Layers</span>
      </div>
      {layers.map((layer) => (
        <motion.div
          key={layer.id}
          onClick={() => setSelected(layer.id)}
          className={
            'relative px-3 py-1.5 rounded-xl text-xs cursor-pointer flex justify-between items-center transition-colors ' +
            (selected === layer.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground')
          }
        >
          {selected === layer.id && (
            <motion.div layoutId="layer-pill" className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20" />
          )}
          <span className="relative z-10" style={{ paddingLeft: layer.depth * 16 + 'px' }}>
            {layer.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}`,
  },
  "studio-track-arranger": {
    title: "Studio Track Arranger",
    description:
      "Multi-track audio timeline sequencer with draggable sound blocks, solo/mute spring toggles, and animated playhead line.",
    category: "Interactive Studio Surfaces",
    badge: "motion.dev",
    preview: <StudioTrackArrangerPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function StudioTrackArranger() {
  const [playing, setPlaying] = useState(true);
  const tracks = [
    { id: 1, name: 'Drums', color: '#3b82f6', width: '70%' },
    { id: 2, name: 'Bass', color: '#8b5cf6', width: '85%' },
    { id: 3, name: 'Vocals', color: '#ec4899', width: '60%' },
  ];

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto p-4 sm:p-5 rounded-2xl border bg-card space-y-4 select-none">
      <div className="flex justify-between items-center pb-3 border-b text-xs">
        <span className="font-bold">Stem Arranger</span>
        <button onClick={() => setPlaying(!playing)} className="px-2.5 py-1 rounded-lg bg-primary text-primary-foreground font-semibold">
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
      <div className="relative space-y-2">
        {playing && (
          <motion.div
            className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {tracks.map((t) => (
          <div key={t.id} className="flex items-center gap-2 text-xs">
            <span className="w-14 font-mono font-bold truncate">{t.name}</span>
            <div className="relative flex-1 h-7 rounded-lg border bg-background overflow-hidden">
              <div className="h-full rounded-md opacity-30" style={{ width: t.width, backgroundColor: t.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  "asset-pipeline-dropzone": {
    title: "Asset Pipeline Dropzone",
    description:
      "Studio file ingestion dropzone with animated dashed perimeter beam, active upload progress queue, and spring completion checks.",
    category: "Interactive Studio Surfaces",
    badge: "motion.dev",
    preview: <AssetPipelineDropzonePreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function AssetPipelineDropzone() {
  const [files, setFiles] = useState([
    { id: 1, name: 'hero-mesh-scene.glb', size: '14.2 MB', progress: 100 },
    { id: 2, name: 'vectors-master.svg', size: '480 KB', progress: 74 },
  ]);

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto p-4 sm:p-5 rounded-2xl border bg-card space-y-4 select-none">
      <div className="p-4 rounded-xl border border-dashed border-primary/50 bg-background text-center space-y-1">
        <p className="text-xs font-semibold">Drag studio assets here</p>
        <p className="text-[10px] text-muted-foreground font-mono">GLB, MP4, SVG up to 100MB</p>
      </div>
      <div className="space-y-2">
        <AnimatePresence>
          {files.map((file) => (
            <motion.div key={file.id} layout className="p-2.5 rounded-xl border bg-background space-y-1.5 text-xs">
              <div className="flex justify-between font-mono font-bold">
                <span className="truncate pr-2">{file.name}</span>
                <span className="shrink-0">{file.progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div className="h-full bg-primary" animate={{ width: file.progress + '%' }} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}`,
  },
  "dynamic-island-hub": {
    title: "Morphing Dynamic Island Hub",
    description:
      "Multi-state dynamic capsule with FLIP spring morphing across idle, incoming call, focus timer, and music player states.",
    category: "Spatial Dynamic Hubs",
    badge: "motion.dev",
    preview: <DynamicIslandHubPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function DynamicIslandHub() {
  const [mode, setMode] = useState<'compact' | 'call' | 'timer' | 'music'>('music');
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none flex flex-col items-center space-y-5">
      <div className="w-full flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">Morphing Dynamic Hub</h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">Fluid Island Multi-State Pill</p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] uppercase">
          {mode}
        </span>
      </div>

      <div className="min-h-36 flex items-center justify-center w-full">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-3 text-[var(--patiya-color-foreground)] overflow-hidden shadow-lg"
          style={{ width: mode === 'compact' ? '200px' : mode === 'call' ? '300px' : mode === 'timer' ? '260px' : '320px' }}
        >
          <AnimatePresence mode="wait">
            {mode === 'compact' && (
              <motion.div
                key="compact"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-between px-2 py-0.5 text-xs font-mono"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold">AirPods Pro</span>
                </div>
                <span className="text-emerald-500 font-bold">84%</span>
              </motion.div>
            )}

            {mode === 'call' && (
              <motion.div
                key="call"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="space-y-3 p-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                      SC
                    </div>
                    <div>
                      <h5 className="text-xs font-bold">Sarah Connor</h5>
                      <p className="text-[10px] text-[var(--patiya-color-muted-foreground)] font-mono">Incoming Audio Call...</p>
                    </div>
                  </div>
                  <div className="flex items-end gap-0.5 h-4">
                    {[12, 18, 8, 20, 14].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [4, h, 4] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1 bg-emerald-500 rounded-full"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <button className="flex-1 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-semibold">Decline</button>
                  <button className="flex-1 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-semibold">Accept</button>
                </div>
              </motion.div>
            )}

            {mode === 'timer' && (
              <motion.div
                key="timer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-between p-1.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full border-2 border-amber-500 flex items-center justify-center text-[10px] font-mono text-amber-500 font-bold">
                    ⏱
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[var(--patiya-color-muted-foreground)]">Focus Timer</span>
                    <h5 className="text-sm font-mono font-bold text-amber-500">14:28</h5>
                  </div>
                </div>
                <button className="px-3 py-1 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-xs font-semibold">
                  Pause
                </button>
              </motion.div>
            )}

            {mode === 'music' && (
              <motion.div
                key="music"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="space-y-2 p-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 shrink-0 flex items-center justify-center text-white text-xs">
                      ♫
                    </div>
                    <div className="truncate">
                      <h5 className="text-xs font-bold truncate">Starboy</h5>
                      <p className="text-[10px] text-[var(--patiya-color-muted-foreground)] truncate font-mono">The Weeknd • Daft Punk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-7 h-7 rounded-full bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] flex items-center justify-center text-xs font-bold"
                    >
                      {isPlaying ? '❚❚' : '▶'}
                    </button>
                  </div>
                </div>
                <div className="w-full h-1 bg-[var(--patiya-color-muted)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--patiya-color-primary)]"
                    animate={{ width: isPlaying ? ['30%', '75%', '30%'] : '45%' }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="w-full flex p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] gap-1 overflow-x-auto no-scrollbar">
        {(['compact', 'call', 'timer', 'music'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="relative flex-1 py-1.5 px-2 text-xs font-semibold capitalize shrink-0 sm:shrink transition-colors"
          >
            {mode === m && (
              <motion.div
                layoutId="island-mode-pill"
                className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/30"
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              />
            )}
            <span className={'relative z-10 ' + (mode === m ? 'text-[var(--patiya-color-primary)] font-bold' : 'text-[var(--patiya-color-muted-foreground)]')}>
              {m}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}`,
  },
  "holographic-tilt-card": {
    title: "Holographic 3D Tilt Card",
    description:
      "Interactive 3D perspective metallic card with mouse multi-axis tilt, dynamic radial holographic glare, and EMV depth.",
    category: "Spatial Dynamic Hubs",
    badge: "motion.dev",
    preview: <HolographicTiltCardPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function HolographicTiltCard() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -14;
    const rotY = ((x - centerX) / centerX) * 14;
    setRotate({ x: rotX, y: rotY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.35 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none flex flex-col items-center space-y-4">
      <div className="w-full flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">Holographic 3D Card</h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">Multi-Axis Gyro Parallax</p>
        </div>
        <span className="text-[10px] font-mono font-bold text-emerald-500">Titanium Tier</span>
      </div>

      <div className="py-4 w-full flex justify-center">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ rotateX: rotate.x, rotateY: rotate.y }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-72 sm:w-80 h-44 sm:h-48 rounded-2xl border border-[var(--patiya-color-border)] bg-gradient-to-br from-zinc-900 via-neutral-900 to-black p-5 text-white overflow-hidden shadow-2xl cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: 'radial-gradient(circle at ' + glare.x + '% ' + glare.y + '%, rgba(255,255,255,0.4) 0%, transparent 60%)',
            }}
          />

          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
              backgroundSize: '16px 16px',
            }}
          />

          <div className="relative h-full flex flex-col justify-between" style={{ transform: 'translateZ(24px)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 rounded-md border border-amber-400/80 bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center shadow-inner">
                  <div className="w-4 h-3 border border-amber-800/40 rounded-sm" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 font-semibold">PATIYA VAULT</span>
              </div>
              <svg className="w-5 h-5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
            </div>

            <div className="font-mono text-base tracking-widest font-bold text-zinc-200">
              •••• •••• •••• 8842
            </div>

            <div className="flex items-end justify-between text-xs font-mono">
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block">Cardholder</span>
                <span className="font-bold tracking-wider text-zinc-300">ALEXANDER R.</span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block">Expires</span>
                <span className="font-bold text-zinc-300">09/29</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 opacity-80" />
            </div>
          </div>
        </motion.div>
      </div>

      <p className="text-[11px] font-mono text-[var(--patiya-color-muted-foreground)]">Hover or drag to inspect 3D metallic depth</p>
    </div>
  );
}`,
  },
  "magnetic-fluid-metaball": {
    title: "Magnetic Fluid Tether Node",
    description:
      "Interactive elastic fluid membrane node with dynamic SVG spring tether line and live surface tension readout.",
    category: "Spatial Dynamic Hubs",
    badge: "motion.dev",
    preview: <MagneticFluidMetaballPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function MagneticFluidMetaball() {
  const [puck, setPuck] = useState({ x: 45, y: -25 });

  const dist = Math.sqrt(puck.x * puck.x + puck.y * puck.y);
  const tension = Math.min(100, Math.round((dist / 110) * 100));

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">Fluid Membrane Node</h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">Viscous Elastic Spring Tether</p>
        </div>
        <span className="text-xs font-mono font-bold text-[var(--patiya-color-primary)]">
          Tension: {tension}%
        </span>
      </div>

      <div className="relative w-full h-48 sm:h-52 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-center overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line
            x1="50%"
            y1="50%"
            x2={'calc(50% + ' + puck.x + 'px)'}
            y2={'calc(50% + ' + puck.y + 'px)'}
            stroke="var(--patiya-color-primary)"
            strokeWidth={Math.max(2, 10 - (dist / 110) * 8)}
            strokeLinecap="round"
            strokeOpacity={Math.max(0.2, 1 - dist / 120)}
          />
        </svg>

        <div className="absolute w-14 h-14 rounded-full border-2 border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] flex items-center justify-center shadow-inner pointer-events-none">
          <div className="w-3 h-3 rounded-full bg-[var(--patiya-color-foreground)]" />
        </div>

        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
          dragElastic={0.3}
          onDrag={(_, info) => setPuck({ x: Math.round(info.offset.x + puck.x), y: Math.round(info.offset.y + puck.y) })}
          animate={{ x: puck.x, y: puck.y }}
          transition={{ type: 'spring', stiffness: 450, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 w-12 h-12 rounded-full border-2 border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] flex items-center justify-center font-bold text-xs cursor-grab active:cursor-grabbing shadow-lg"
        >
          ●
        </motion.div>
      </div>

      <div className="flex items-center justify-between text-xs pt-1">
        <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">Drag node to stretch fluid membrane</span>
        <button
          onClick={() => setPuck({ x: 0, y: 0 })}
          className="px-2.5 py-1 rounded-lg border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] font-mono text-[10px] font-semibold"
        >
          Snap to Center
        </button>
      </div>
    </div>
  );
}`,
  },
  "matrix-code-decryptor": {
    title: "Matrix Token Decryptor",
    description:
      "Rolling matrix cipher character unscrambler with clearance level switcher and token copy feedback.",
    category: "Spatial Dynamic Hubs",
    badge: "motion.dev",
    preview: <MatrixCodeDecryptorPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function MatrixCodeDecryptor() {
  const [level, setLevel] = useState<1 | 2 | 3>(2);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [displayText, setDisplayText] = useState('sk_live_9f8a2c1e4d0b');
  const [copied, setCopied] = useState(false);

  const finalKeys: Record<number, string> = {
    1: 'pk_test_public_7741',
    2: 'sk_live_9f8a2c1e4d0b',
    3: 'root_auth_00x9f_omega',
  };

  const handleDecrypt = () => {
    setIsDecrypting(true);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const target = finalKeys[level];
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        target
          .split('')
          .map((c, index) => {
            if (index < iteration) return target[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= target.length) {
        clearInterval(interval);
        setIsDecrypting(false);
      }
      iteration += 1;
    }, 45);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      <div className="p-3.5 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--patiya-color-border)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">Matrix Token Vault</h4>
              <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">Cryptographic Unscrambler</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">
            ENCRYPTED AES-256
          </span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] space-y-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            <span>VAULT TOKEN KEY</span>
            <span>CLEARANCE L{level}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[var(--patiya-color-muted)]/50 border border-[var(--patiya-color-border)] font-mono text-sm font-bold text-[var(--patiya-color-foreground)] truncate flex items-center justify-between">
            <span className={isDecrypting ? 'text-emerald-500' : ''}>{displayText}</span>
            <span className="text-[10px] font-normal text-[var(--patiya-color-muted-foreground)] ml-2">HASH</span>
          </div>
        </div>

        <div className="flex p-0.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
          {([1, 2, 3] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setLevel(lvl);
                setDisplayText(finalKeys[lvl]);
              }}
              className="relative flex-1 py-1.5 text-xs font-semibold"
            >
              {level === lvl && (
                <motion.div
                  layoutId="clearance-pill"
                  className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/30"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <span className={'relative z-10 ' + (level === lvl ? 'text-[var(--patiya-color-primary)] font-bold' : 'text-[var(--patiya-color-muted-foreground)]')}>
                L{lvl} Clearance
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleDecrypt}
            disabled={isDecrypting}
            className="px-3.5 py-1.5 rounded-xl bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] text-xs font-semibold disabled:opacity-50"
          >
            {isDecrypting ? 'Unscrambling...' : 'Decrypt Key'}
          </motion.button>
          <button
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] text-xs font-mono font-semibold transition-colors"
          >
            {copied ? 'Copied ✓' : 'Copy Token'}
          </button>
        </div>
      </div>
    </div>
  );
}`,
  },
  "orbital-command-hub": {
    title: "Orbital Command System",
    description:
      "Elliptical satellite hub system with rotating nodes, depth perspective scaling, and active node inspector.",
    category: "Spatial Dynamic Hubs",
    badge: "motion.dev",
    preview: <OrbitalCommandHubPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function OrbitalCommandHub() {
  const [selected, setSelected] = useState('Deploy');
  const [rotation, setRotation] = useState(0);

  const satellites = [
    { id: 'Deploy', icon: '🚀', status: 'Active', latency: '14ms' },
    { id: 'Database', icon: '🗄', status: 'Healthy', latency: '1.2ms' },
    { id: 'Security', icon: '🛡', status: 'Guarded', latency: '0ms' },
    { id: 'Analytics', icon: '⚡', status: 'Streaming', latency: '8.4k/s' },
  ];

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none flex flex-col items-center space-y-4">
      <div className="w-full flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">Orbital Command System</h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">Elliptical Satellite Hub</p>
        </div>
        <span className="text-[10px] font-mono font-bold text-[var(--patiya-color-primary)]">4 Satellites Online</span>
      </div>

      <div className="relative w-64 h-52 flex items-center justify-center">
        <div className="absolute w-56 h-36 rounded-full border border-dashed border-[var(--patiya-color-border)] pointer-events-none" />

        <div className="relative z-10 w-16 h-16 rounded-full border-2 border-[var(--patiya-color-primary)] bg-[var(--patiya-color-card)] flex flex-col items-center justify-center shadow-lg">
          <span className="text-lg">❖</span>
          <span className="text-[8px] font-mono font-bold uppercase text-[var(--patiya-color-primary)]">Core</span>
        </div>

        {satellites.map((sat, idx) => {
          const total = satellites.length;
          const currentAngle = (rotation + (360 / total) * idx) * (Math.PI / 180);
          const x = Math.cos(currentAngle) * 105;
          const y = Math.sin(currentAngle) * 65;
          const isSelected = selected === sat.id;

          return (
            <motion.button
              key={sat.id}
              onClick={() => setSelected(sat.id)}
              animate={{ x, y }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              className={'absolute w-10 h-10 rounded-full border flex items-center justify-center text-sm shadow-md transition-colors ' +
                (isSelected
                  ? 'border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/20 text-[var(--patiya-color-primary)] ring-2 ring-[var(--patiya-color-primary)]/30'
                  : 'border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]')}
            >
              <span>{sat.icon}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="w-full flex items-center justify-between p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] text-xs">
        <div>
          <span className="font-bold text-[var(--patiya-color-foreground)]">{selected} Node</span>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
            Status: {satellites.find((s) => s.id === selected)?.status} • Latency: {satellites.find((s) => s.id === selected)?.latency}
          </p>
        </div>
        <button
          onClick={() => setRotation((r) => r + 45)}
          className="px-2.5 py-1 rounded-lg border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] font-mono text-[10px] font-bold"
        >
          Rotate Orbit ↻
        </button>
      </div>
    </div>
  );
}`,
  },
  "time-travel-scrubber": {
    title: "Time-Travel History Scrubber",
    description:
      "Reversible commit history scrubber with milestone nodes, diff inspection card, and undo/redo navigation.",
    category: "Spatial Dynamic Hubs",
    badge: "motion.dev",
    preview: <TimeTravelScrubberPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function TimeTravelScrubber() {
  const [index, setIndex] = useState(3);

  const commits = [
    { hash: '8f4a1', label: 'Initial Schema', author: 'alex', changes: '+124 -0', time: '3d ago', status: 'Clean' },
    { hash: '9c2e0', label: 'Add Auth Stems', author: 'jordan', changes: '+68 -12', time: '2d ago', status: 'Clean' },
    { hash: 'a41b7', label: 'Spring Motion Engine', author: 'alex', changes: '+312 -45', time: '1d ago', status: 'Verified' },
    { hash: 'd83e4', label: 'Hairline Border System', author: 'elena', changes: '+84 -19', time: '6h ago', status: 'Verified' },
    { hash: 'f99a2', label: 'Production Release v2', author: 'team', changes: '+12 -2', time: 'Just now', status: 'Deployed' },
  ];

  const current = commits[index];

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">Time-Travel Git Scrubber</h4>
          <p className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">Reversible History Inspector</p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)]">
          {current.hash}
        </span>
      </div>

      <div className="relative pt-4 pb-2 px-2">
        <div className="h-1 bg-[var(--patiya-color-muted)] rounded-full relative">
          <motion.div
            className="h-full bg-[var(--patiya-color-primary)] rounded-full"
            animate={{ width: (index / (commits.length - 1)) * 100 + '%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
          />
        </div>

        <div className="flex justify-between -mt-2.5">
          {commits.map((c, i) => (
            <motion.button
              key={c.hash}
              onClick={() => setIndex(i)}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.9 }}
              className={'w-4 h-4 rounded-full border-2 transition-colors ' +
                (i <= index
                  ? 'border-[var(--patiya-color-primary)] bg-[var(--patiya-color-background)]'
                  : 'border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]') +
                (i === index ? ' ring-4 ring-[var(--patiya-color-primary)]/20' : '')}
            />
          ))}
        </div>
      </div>

      <motion.div
        key={current.hash}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-2 text-xs"
      >
        <div className="flex justify-between items-center">
          <h5 className="font-bold text-[var(--patiya-color-foreground)] truncate">{current.label}</h5>
          <span className="text-[10px] font-mono font-bold text-emerald-500">{current.status}</span>
        </div>
        <div className="flex justify-between text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
          <span>Author: @{current.author}</span>
          <span className="text-emerald-500 font-bold">{current.changes}</span>
          <span>{current.time}</span>
        </div>
      </motion.div>

      <div className="flex items-center justify-between text-xs pt-1">
        <button
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
          className="px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] disabled:opacity-40 font-semibold"
        >
          ← Undo Commit
        </button>
        <span className="font-mono text-[10px] text-[var(--patiya-color-muted-foreground)]">
          {index + 1} / {commits.length}
        </span>
        <button
          disabled={index === commits.length - 1}
          onClick={() => setIndex(index + 1)}
          className="px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted)] disabled:opacity-40 font-semibold"
        >
          Redo Commit →
        </button>
      </div>
    </div>
  );
}`,
  },
  "prompt-model-switcher": {
    title: "AI Prompt & Model Tuner",
    description:
      "Responsive LLM model selector with interactive parameter sliders, context window metrics, and spring tokens counter.",
    category: "Smart Interactive Workspaces",
    badge: "motion.dev",
    preview: <PromptModelSwitcherPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Model = {
  id: string;
  name: string;
  provider: string;
  speed: string;
  tokens: string;
};

const models: Model[] = [
  { id: 'gpt-4o', name: 'GPT-4o Omniverse', provider: 'OpenAI', speed: '98 t/s', tokens: '128k' },
  { id: 'claude-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Anthropic', speed: '84 t/s', tokens: '200k' },
  { id: 'gemini-pro', name: 'Gemini 2.5 Flash', provider: 'Google', speed: '142 t/s', tokens: '1M' },
];

export function PromptModelSwitcher() {
  const [selected, setSelected] = useState<Model>(models[0]);
  const [temp, setTemp] = useState(0.7);
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('Analyze system latency and optimize edge caching patterns...');

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] hover:border-[var(--patiya-color-primary)] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2.5 text-left min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] flex items-center justify-center font-bold text-xs shrink-0">
              {selected.provider[0]}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-[var(--patiya-color-foreground)] truncate">{selected.name}</p>
              <p className="text-[10px] text-[var(--patiya-color-muted-foreground)]">{selected.provider} • {selected.tokens} ctx</p>
            </div>
          </div>
          <span className="text-xs font-mono text-[var(--patiya-color-muted-foreground)] shrink-0">{isOpen ? '▲' : '▼'}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="absolute top-full left-0 right-0 mt-1.5 p-1.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] shadow-xl z-20 space-y-1"
            >
              {models.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelected(m);
                    setIsOpen(false);
                  }}
                  className={'w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ' +
                    (selected.id === m.id
                      ? 'bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)] font-bold'
                      : 'hover:bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)]')}
                >
                  <div>
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-[10px] opacity-70">{m.tokens} window</p>
                  </div>
                  <span className="text-[10px] font-mono opacity-80">{m.speed}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="font-medium text-[var(--patiya-color-muted-foreground)]">Creativity (Temp)</span>
          <span className="font-mono font-bold text-[var(--patiya-color-foreground)]">{temp.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={temp}
          onChange={(e) => setTemp(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-[var(--patiya-color-muted)] rounded-lg appearance-none cursor-pointer accent-[var(--patiya-color-primary)]"
        />
      </div>

      <div className="p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] space-y-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          className="w-full text-xs bg-transparent border-none outline-none resize-none text-[var(--patiya-color-foreground)] placeholder:text-[var(--patiya-color-muted-foreground)]"
        />
        <div className="flex items-center justify-between pt-1 border-t border-[var(--patiya-color-border)] text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
          <span>{prompt.length} chars</span>
          <span className="text-emerald-500 font-semibold">{Math.ceil(prompt.length / 4)} tokens</span>
        </div>
      </div>
    </div>
  );
}`,
  },
  "dynamic-checkout-vault": {
    title: "Dynamic Payment Vault & Slide Pay",
    description:
      "Multi-method payment selector with dynamic card switching and interactive slide-to-confirm authorization.",
    category: "Smart Interactive Workspaces",
    badge: "motion.dev",
    preview: <DynamicCheckoutVaultPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Method = {
  id: string;
  label: string;
  last4: string;
  icon: string;
  color: string;
};

const methods: Method[] = [
  { id: 'apple', label: 'Apple Pay', last4: '8821', icon: '', color: 'bg-black text-white' },
  { id: 'visa', label: 'Visa Corporate', last4: '4192', icon: '💳', color: 'bg-blue-600 text-white' },
  { id: 'crypto', label: 'USDC Vault', last4: '0x3F..B1', icon: '⚡', color: 'bg-emerald-600 text-white' },
];

export function DynamicCheckoutVault() {
  const [selected, setSelected] = useState<Method>(methods[0]);
  const [status, setStatus] = useState<'idle' | 'authorizing' | 'success'>('idle');

  const handleAuthorize = () => {
    setStatus('authorizing');
    setTimeout(() => setStatus('success'), 1200);
  };

  const handleReset = () => setStatus('idle');

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">Total Due</span>
          <h4 className="text-xl font-bold text-[var(--patiya-color-foreground)]">$249.00 <span className="text-xs font-normal text-[var(--patiya-color-muted-foreground)]">/yr</span></h4>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-500">20% Off Applied</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {methods.map((m) => {
          const active = selected.id === m.id;
          return (
            <motion.button
              key={m.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setSelected(m); handleReset(); }}
              className={'relative p-2.5 rounded-xl border text-center transition-all cursor-pointer ' +
                (active
                  ? 'border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/10 font-bold'
                  : 'border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] hover:border-[var(--patiya-color-primary)]/50')}
            >
              <span className="text-lg block mb-0.5">{m.icon}</span>
              <p className="text-[11px] font-semibold truncate text-[var(--patiya-color-foreground)]">{m.label.split(' ')[0]}</p>
              <p className="text-[9px] font-mono text-[var(--patiya-color-muted-foreground)]">{m.last4}</p>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        key={selected.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={'p-3 rounded-xl flex items-center justify-between text-xs ' + selected.color}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{selected.icon}</span>
          <span className="font-semibold">{selected.label}</span>
        </div>
        <span className="font-mono text-[11px] opacity-90">Ending in {selected.last4}</span>
      </motion.div>

      <div className="pt-1">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.button
              key="btn-idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAuthorize}
              className="w-full py-2.5 rounded-xl bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] font-semibold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Slide to Pay $249.00</span>
              <span>→</span>
            </motion.button>
          )}

          {status === 'authorizing' && (
            <motion.div
              key="btn-auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full py-2.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)] text-center text-xs font-semibold flex items-center justify-center gap-2"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                className="inline-block w-3.5 h-3.5 border-2 border-[var(--patiya-color-primary)] border-t-transparent rounded-full"
              />
              <span>Authorizing Encrypted Token...</span>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="btn-done"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-500 text-xs font-semibold flex items-center justify-between px-3"
            >
              <span>✓ Payment Authorized</span>
              <button onClick={handleReset} className="underline text-[10px]">Reset</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}`,
  },
  "collaboration-presence-bar": {
    title: "Real-Time Collaboration Presence Stack",
    description:
      "Dynamic multi-collaborator avatar stack with status pings, activity state badges, and live floating reaction emitter.",
    category: "Smart Interactive Workspaces",
    badge: "motion.dev",
    preview: <CollaborationPresenceBarPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Peer = {
  id: string;
  name: string;
  color: string;
  role: string;
  online: boolean;
};

const initialPeers: Peer[] = [
  { id: '1', name: 'Sarah Chen', color: 'bg-emerald-500', role: 'Design Lead', online: true },
  { id: '2', name: 'Marcus Fox', color: 'bg-blue-500', role: 'Staff Eng', online: true },
  { id: '3', name: 'Aria Stark', color: 'bg-purple-500', role: 'Product', online: true },
  { id: '4', name: 'Devin K.', color: 'bg-amber-500', role: 'Reviewer', online: false },
];

export function CollaborationPresenceBar() {
  const [peers, setPeers] = useState<Peer[]>(initialPeers);
  const [reactions, setReactions] = useState<{ id: number; emoji: string; x: number }[]>([]);
  const [activePeer, setActivePeer] = useState<Peer | null>(peers[0]);

  const sendReaction = (emoji: string) => {
    const id = Date.now();
    const x = Math.floor(Math.random() * 80) - 40;
    setReactions((prev) => [...prev, { id, emoji, x }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 1400);
  };

  const toggleStatus = (id: string) => {
    setPeers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, online: !p.online } : p))
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">Document Session</span>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">3 Editors Active</h4>
        </div>
        <div className="flex items-center -space-x-2">
          {peers.map((peer) => (
            <motion.button
              key={peer.id}
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePeer(peer)}
              className={'relative w-8 h-8 rounded-full border-2 border-[var(--patiya-color-card)] text-white text-xs font-bold flex items-center justify-center ' + peer.color}
            >
              {peer.name[0]}
              {peer.online && (
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-white" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {activePeer && (
        <motion.div
          key={activePeer.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-[var(--patiya-color-foreground)]">{activePeer.name}</p>
            <p className="text-[10px] text-[var(--patiya-color-muted-foreground)]">{activePeer.role}</p>
          </div>
          <button
            onClick={() => toggleStatus(activePeer.id)}
            className={'text-[10px] font-mono px-2 py-0.5 rounded-full border ' +
              (activePeer.online
                ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10'
                : 'border-zinc-500/30 text-zinc-500 bg-zinc-500/10')}
          >
            {activePeer.online ? 'Online' : 'Offline'}
          </button>
        </motion.div>
      )}

      <div className="relative pt-2">
        <div className="absolute inset-x-0 bottom-12 flex justify-center pointer-events-none overflow-hidden h-24">
          <AnimatePresence>
            {reactions.map((r) => (
              <motion.span
                key={r.id}
                initial={{ opacity: 1, y: 20, x: r.x, scale: 0.7 }}
                animate={{ opacity: 0, y: -70, scale: 1.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute bottom-0 text-2xl"
              >
                {r.emoji}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2">
          {['🔥', '✨', '🚀', '❤️', '👀'].map((emoji) => (
            <motion.button
              key={emoji}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => sendReaction(emoji)}
              className="w-8 h-8 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-center text-sm cursor-pointer hover:bg-[var(--patiya-color-muted)]"
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  },
  "smart-command-palette": {
    title: "Spotlight Smart Command Palette",
    description:
      "Modern Spotlight & Raycast style fuzzy search launcher with dynamic action categories and keyboard hotkey navigation badges.",
    category: "Smart Interactive Workspaces",
    badge: "motion.dev",
    preview: <SmartCommandPalettePreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Command = {
  id: string;
  title: string;
  category: 'Workspace' | 'Git' | 'AI';
  hotkey: string;
  icon: string;
};

const commands: Command[] = [
  { id: 'new-doc', title: 'Create Smart Canvas Document', category: 'Workspace', hotkey: '⌘N', icon: '📝' },
  { id: 'git-pr', title: 'Open Pull Request Review', category: 'Git', hotkey: '⌘⇧P', icon: '🔀' },
  { id: 'ai-summary', title: 'Generate Executive Briefing', category: 'AI', hotkey: '⌘J', icon: '✨' },
  { id: 'invite-collab', title: 'Invite Teammate via Email', category: 'Workspace', hotkey: '⌘I', icon: '👥' },
  { id: 'deploy-prod', title: 'Deploy to Edge Production', category: 'Git', hotkey: '⌘⇧D', icon: '🚀' },
];

export function SmartCommandPalette() {
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(commands[0].id);
  const [lastExecuted, setLastExecuted] = useState<string | null>(null);

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cmd: Command) => {
    setActiveId(cmd.id);
    setLastExecuted(cmd.title);
    setTimeout(() => setLastExecuted(null), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-3">
      <div className="flex items-center gap-2 p-2.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] focus-within:border-[var(--patiya-color-primary)] transition-all">
        <span className="text-xs font-mono text-[var(--patiya-color-muted-foreground)]">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search commands, docs, or actions..."
          className="w-full bg-transparent text-xs outline-none text-[var(--patiya-color-foreground)] placeholder:text-[var(--patiya-color-muted-foreground)]"
        />
        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono border border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)]">ESC</span>
      </div>

      <div className="space-y-1">
        {filtered.map((cmd) => {
          const isSelected = activeId === cmd.id;
          return (
            <motion.button
              key={cmd.id}
              onClick={() => handleSelect(cmd)}
              className={'w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all text-left cursor-pointer ' +
                (isSelected
                  ? 'bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] font-semibold shadow-sm'
                  : 'hover:bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)]')}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-sm shrink-0">{cmd.icon}</span>
                <span className="truncate">{cmd.title}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={'text-[10px] font-mono ' + (isSelected ? 'opacity-80' : 'text-[var(--patiya-color-muted-foreground)]')}>{cmd.category}</span>
                <span className={'px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ' +
                  (isSelected
                    ? 'bg-white/20 text-white'
                    : 'border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-foreground)]')}>
                  {cmd.hotkey}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {lastExecuted && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[11px] font-mono text-center"
          >
            Executed: {lastExecuted}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`,
  },
  "interactive-kanban-pill": {
    title: "Linear Priority Task Flow",
    description:
      "Sleek issue tracker card with priority toggling, subtask checkbox progression, and animated status transitions.",
    category: "Smart Interactive Workspaces",
    badge: "motion.dev",
    preview: <InteractiveKanbanPillPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Subtask = {
  id: string;
  label: string;
  done: boolean;
};

const priorities = [
  { level: 'Urgent', color: 'text-red-500 border-red-500/30 bg-red-500/10' },
  { level: 'High', color: 'text-amber-500 border-amber-500/30 bg-amber-500/10' },
  { level: 'Medium', color: 'text-blue-500 border-blue-500/30 bg-blue-500/10' },
];

export function InteractiveKanbanPill() {
  const [priorityIdx, setPriorityIdx] = useState(0);
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    { id: '1', label: 'Draft token specification', done: true },
    { id: '2', label: 'Verify high contrast colors', done: false },
    { id: '3', label: 'Run mobile viewport audit', done: false },
  ]);

  const toggleSubtask = (id: string) => {
    setSubtasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completedCount = subtasks.filter((t) => t.done).length;
  const progressPct = Math.round((completedCount / subtasks.length) * 100);

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">PAT-4092</span>
        <button
          onClick={() => setPriorityIdx((priorityIdx + 1) % priorities.length)}
          className={'px-2 py-0.5 rounded-full border text-[10px] font-semibold cursor-pointer transition-colors ' + priorities[priorityIdx].color}
        >
          {priorities[priorityIdx].level} Priority ↻
        </button>
      </div>

      <div>
        <h4 className="text-sm font-bold text-[var(--patiya-color-foreground)]">Design System Fluid Scale</h4>
        <p className="text-xs text-[var(--patiya-color-muted-foreground)] mt-0.5">Adapt spring easing variables across desktop and mobile sheets.</p>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-mono text-[var(--patiya-color-muted-foreground)]">
          <span>Subtasks Completed</span>
          <span className="font-bold text-[var(--patiya-color-foreground)]">{completedCount} of {subtasks.length} ({progressPct}%)</span>
        </div>
        <div className="h-1.5 w-full bg-[var(--patiya-color-muted)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--patiya-color-primary)] rounded-full"
            animate={{ width: progressPct + '%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          />
        </div>
      </div>

      <div className="space-y-1.5 pt-1">
        {subtasks.map((task) => (
          <button
            key={task.id}
            onClick={() => toggleSubtask(task.id)}
            className="w-full flex items-center gap-2.5 p-2 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] hover:bg-[var(--patiya-color-muted)] transition-colors text-left cursor-pointer"
          >
            <div className={'w-4 h-4 rounded-md border flex items-center justify-center text-[10px] font-bold ' +
              (task.done
                ? 'border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)]'
                : 'border-[var(--patiya-color-border)] text-transparent')}>
              ✓
            </div>
            <span className={'text-xs ' + (task.done ? 'line-through text-[var(--patiya-color-muted-foreground)]' : 'text-[var(--patiya-color-foreground)] font-medium')}>
              {task.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}`,
  },
  "file-staging-upload-tray": {
    title: "Multi-Asset Staging Upload Tray",
    description:
      "Responsive asset staging drawer with per-file progress animations, format identification pills, and instant batch actions.",
    category: "Smart Interactive Workspaces",
    badge: "motion.dev",
    preview: <FileStagingUploadTrayPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type StagedFile = {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: 'uploading' | 'complete' | 'ready';
};

const initialFiles: StagedFile[] = [
  { id: '1', name: 'hero-banner-4k.webp', size: '2.4 MB', progress: 100, status: 'complete' },
  { id: '2', name: 'app-tokens-v2.json', size: '42 KB', progress: 68, status: 'uploading' },
  { id: '3', name: 'brand-guidelines.pdf', size: '8.1 MB', progress: 15, status: 'uploading' },
];

export function FileStagingUploadTray() {
  const [files, setFiles] = useState<StagedFile[]>(initialFiles);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const uploadAll = () => {
    setFiles((prev) => prev.map((f) => ({ ...f, progress: 100, status: 'complete' })));
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">Asset Staging Tray</span>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">{files.length} Files Queued</h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] font-semibold">
          Cloud Ingress
        </span>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, height: 0, margin: 0 }}
              className="p-2.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--patiya-color-foreground)] truncate max-w-[170px]">{file.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[var(--patiya-color-muted-foreground)]">{file.size}</span>
                  <button onClick={() => removeFile(file.id)} className="text-[var(--patiya-color-muted-foreground)] hover:text-red-500 font-mono text-[10px]">✕</button>
                </div>
              </div>
              <div className="h-1.5 w-full bg-[var(--patiya-color-muted)] rounded-full overflow-hidden">
                <motion.div
                  className={'h-full rounded-full ' + (file.progress === 100 ? 'bg-emerald-500' : 'bg-[var(--patiya-color-primary)]')}
                  animate={{ width: file.progress + '%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setFiles([])}
          className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] hover:underline"
        >
          Clear All
        </button>
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={uploadAll}
          className="px-3.5 py-1.5 rounded-xl bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] text-xs font-semibold cursor-pointer"
        >
          Complete Uploads
        </motion.button>
      </div>
    </div>
  );
}`,
  },
  "audit-log-inspector": {
    title: "Audit & Security Event Stream",
    description:
      "Real-time event stream viewer with severity badges, search filter chips, live event telemetry, and expandable payload inspector.",
    category: "Smart Interactive Workspaces",
    badge: "motion.dev",
    preview: <AuditLogInspectorPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type LogSeverity = 'all' | 'critical' | 'warning' | 'info';
type LogItem = {
  id: string;
  event: string;
  actor: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  ip: string;
  metadata: string;
};

const initialLogs: LogItem[] = [
  { id: 'ev-9104', event: 'api.key.rotated', actor: 'alex@acme.dev', severity: 'critical', timestamp: 'Just now', ip: '192.241.14.88', metadata: '{"scope": "production_read_write", "exp": "30d"}' },
  { id: 'ev-9103', event: 'auth.mfa.verified', actor: 'elena@acme.dev', severity: 'info', timestamp: '2m ago', ip: '104.28.19.42', metadata: '{"method": "webauthn_fido2", "origin": "macos"}' },
  { id: 'ev-9102', event: 'rate_limit.exceeded', actor: 'worker-svc-eu', severity: 'warning', timestamp: '5m ago', ip: '185.199.108.153', metadata: '{"endpoint": "/v2/vector/query", "rpm": 1280}' },
  { id: 'ev-9101', event: 'vault.secret.accessed', actor: 'ci-deployer', severity: 'info', timestamp: '12m ago', ip: '35.184.21.90', metadata: '{"key": "STRIPE_SIGNING_SECRET"}' },
];

export function AuditLogInspector() {
  const [logs, setLogs] = useState<LogItem[]>(initialLogs);
  const [filter, setFilter] = useState<LogSeverity>('all');
  const [expandedId, setExpandedId] = useState<string | null>('ev-9104');

  const filteredLogs = logs.filter((item) =>
    filter === 'all' ? true : item.severity === filter
  );

  const severityBadge = (sev: LogItem['severity']) => {
    switch (sev) {
      case 'critical':
        return 'bg-red-500/15 text-red-500 border-red-500/30';
      case 'warning':
        return 'bg-amber-500/15 text-amber-500 border-amber-500/30';
      case 'info':
        return 'bg-blue-500/15 text-blue-500 border-blue-500/30';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">Audit Stream</h4>
        </div>
        <div className="flex items-center gap-1 p-0.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
          {(['all', 'critical', 'warning', 'info'] as const).map((sev) => {
            const active = filter === sev;
            return (
              <button
                key={sev}
                onClick={() => setFilter(sev)}
                className="relative px-2 py-0.5 text-[10px] font-medium capitalize transition-colors cursor-pointer"
              >
                {active && (
                  <motion.div
                    layoutId="audit-tab"
                    className="absolute inset-0 rounded-md bg-[var(--patiya-color-card)] border border-[var(--patiya-color-border)] shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span
                  className={'relative z-10 ' +
                    (active
                      ? 'text-[var(--patiya-color-foreground)] font-semibold'
                      : 'text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]')}
                >
                  {sev}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <AnimatePresence>
          {filteredLogs.map((log) => {
            const isExpanded = expandedId === log.id;
            return (
              <motion.div
                key={log.id}
                layout
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : log.id)}
                  className="w-full flex items-center justify-between p-2.5 text-left text-xs cursor-pointer hover:bg-[var(--patiya-color-muted)]/50 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={'px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ' + severityBadge(log.severity)}>
                      {log.severity}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[var(--patiya-color-foreground)] truncate">
                      {log.event}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                    <span className="hidden sm:inline">{log.actor}</span>
                    <span>{log.timestamp}</span>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-3 pb-2.5 pt-1 border-t border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/50 space-y-1.5"
                    >
                      <div className="flex justify-between text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                        <span>Actor: {log.actor}</span>
                        <span>IP: {log.ip}</span>
                      </div>
                      <pre className="p-2 rounded-lg bg-[var(--patiya-color-background)] border border-[var(--patiya-color-border)] text-[10px] font-mono text-emerald-400 overflow-x-auto">
                        {log.metadata}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] pt-1">
        <span>Displaying {filteredLogs.length} events</span>
        <button
          onClick={() => setLogs(initialLogs)}
          className="hover:underline text-[var(--patiya-color-primary)] font-semibold cursor-pointer"
        >
          Reset Stream
        </button>
      </div>
    </div>
  );
}`,
  },
  "workspace-billing-matrix": {
    title: "SaaS Tier & Seat Allocation Matrix",
    description:
      "Dynamic pricing tier matrix with monthly/annual toggle, seats allocation slider, and real-time total calculator.",
    category: "Smart Interactive Workspaces",
    badge: "motion.dev",
    preview: <WorkspaceBillingMatrixPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

type BillingCycle = 'monthly' | 'annual';

export function WorkspaceBillingMatrix() {
  const [cycle, setCycle] = useState<BillingCycle>('annual');
  const [seats, setSeats] = useState<number>(8);
  const [plan, setPlan] = useState<'team' | 'enterprise'>('team');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const basePrice = plan === 'team' ? (cycle === 'annual' ? 18 : 24) : (cycle === 'annual' ? 45 : 59);
  const monthlyTotal = seats * basePrice;

  const handleUpgrade = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2400);
    }, 900);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">Subscription Tier</span>
          <h4 className="text-sm font-bold text-[var(--patiya-color-foreground)]">Workspace Seat Allocation</h4>
        </div>

        <div className="flex p-0.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
          {(['monthly', 'annual'] as const).map((c) => {
            const active = cycle === c;
            return (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className="relative px-2 sm:px-2.5 py-1 text-[10px] font-semibold capitalize transition-colors cursor-pointer"
              >
                {active && (
                  <motion.div
                    layoutId="billing-pill"
                    className="absolute inset-0 rounded-lg bg-[var(--patiya-color-card)] border border-[var(--patiya-color-border)] shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className={'relative z-10 ' + (active ? 'text-[var(--patiya-color-foreground)]' : 'text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]')}>
                  {c === 'annual' ? 'Annual -20%' : 'Monthly'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { id: 'team', title: 'Team Pro', desc: 'Collaborative squads', rate: cycle === 'annual' ? '$18' : '$24' },
          { id: 'enterprise', title: 'Enterprise', desc: 'SSO, custom SLA & audit', rate: cycle === 'annual' ? '$45' : '$59' },
        ].map((item) => {
          const selected = plan === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPlan(item.id as 'team' | 'enterprise')}
              className={'p-3 rounded-xl border text-left transition-all cursor-pointer ' +
                (selected
                  ? 'border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/10 ring-1 ring-[var(--patiya-color-primary)]/30'
                  : 'border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] hover:border-[var(--patiya-color-primary)]/40')}
            >
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-[var(--patiya-color-foreground)]">{item.title}</span>
                <span className="text-xs font-mono font-bold text-[var(--patiya-color-primary)]">{item.rate}</span>
              </div>
              <p className="text-[10px] text-[var(--patiya-color-muted-foreground)] mt-0.5 truncate">{item.desc}</p>
            </motion.button>
          );
        })}
      </div>

      <div className="space-y-1.5 p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-[var(--patiya-color-foreground)]">Seats ({seats})</span>
          <span className="font-mono text-[var(--patiya-color-primary)]">\\\${monthlyTotal}/mo</span>
        </div>
        <input
          type="range"
          min="1"
          max="32"
          value={seats}
          onChange={(e) => setSeats(parseInt(e.target.value))}
          className="w-full h-1.5 bg-[var(--patiya-color-muted)] rounded-lg appearance-none cursor-pointer accent-[var(--patiya-color-primary)]"
        />
        <div className="flex justify-between text-[9px] font-mono text-[var(--patiya-color-muted-foreground)]">
          <span>1 Seat</span>
          <span>16 Seats</span>
          <span>32 Seats</span>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleUpgrade}
        disabled={isSubmitting}
        className="w-full py-2.5 rounded-xl bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] font-semibold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            className="inline-block w-3.5 h-3.5 border-2 border-[var(--patiya-color-primary-foreground)] border-t-transparent rounded-full"
          />
        ) : isSuccess ? (
          <span>✓ Workspace Updated Successfully</span>
        ) : (
          <span>Confirm {seats} Seats • \\\${monthlyTotal}/mo</span>
        )}
      </motion.button>
    </div>
  );
}`,
  },
  "notification-inbox-center": {
    title: "Interactive Notification Hub & Inbox",
    description:
      "Interactive multi-filter activity inbox with category tabs, unread badge counters, and individual dismiss animations.",
    category: "Smart Interactive Workspaces",
    badge: "motion.dev",
    preview: <NotificationInboxCenterPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  category: 'mentions' | 'system';
  read: boolean;
};

const initialItems: NotificationItem[] = [
  { id: 'n-1', title: '@alex tagged you in PR #412', description: 'Added unit tests for token streaming decoder and gesture friction.', time: '3m ago', category: 'mentions', read: false },
  { id: 'n-2', title: 'Edge Node eu-west-1 scale event', description: 'Auto-scaled ingress from 4 to 12 micro-containers due to load peak.', time: '18m ago', category: 'system', read: false },
  { id: 'n-3', title: '@sarah approved production release', description: 'Staging gate pipeline passed all 42 automated regression checks.', time: '1h ago', category: 'mentions', read: true },
];

export function NotificationInboxCenter() {
  const [items, setItems] = useState<NotificationItem[]>(initialItems);
  const [tab, setTab] = useState<'all' | 'mentions' | 'system'>('all');

  const unreadCount = items.filter((n) => !n.read).length;
  const filtered = items.filter((item) => (tab === 'all' ? true : item.category === tab));

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismissItem = (id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">🔔</span>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">Activity Inbox</h4>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)]">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={markAllRead}
          className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer"
        >
          Mark all read
        </button>
      </div>

      <div className="flex p-0.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
        {(['all', 'mentions', 'system'] as const).map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative flex-1 py-1 text-[10px] font-semibold capitalize transition-colors cursor-pointer text-center"
            >
              {active && (
                <motion.div
                  layoutId="inbox-pill"
                  className="absolute inset-0 rounded-md bg-[var(--patiya-color-card)] border border-[var(--patiya-color-border)] shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <span className={'relative z-10 ' + (active ? 'text-[var(--patiya-color-foreground)] font-bold' : 'text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]')}>
                {t}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-1.5 min-h-[160px]">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-10 text-center space-y-1.5"
            >
              <p className="text-xs text-[var(--patiya-color-muted-foreground)]">No notifications in {tab}</p>
              <button
                onClick={() => setItems(initialItems)}
                className="text-[10px] text-[var(--patiya-color-primary)] font-semibold underline cursor-pointer"
              >
                Reset notifications
              </button>
            </motion.div>
          ) : (
            filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: 20 }}
                className={'p-2.5 rounded-xl border transition-all ' +
                  (item.read
                    ? 'border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/60 opacity-80'
                    : 'border-[var(--patiya-color-primary)]/40 bg-[var(--patiya-color-background)] shadow-xs')}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className={'text-xs truncate ' + (item.read ? 'text-[var(--patiya-color-foreground)]' : 'font-bold text-[var(--patiya-color-foreground)]')}>
                      {item.title}
                    </p>
                    <p className="text-[10px] text-[var(--patiya-color-muted-foreground)] mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <button
                    onClick={() => dismissItem(item.id)}
                    className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] hover:text-red-500 shrink-0 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex justify-between items-center pt-1.5 text-[9px] font-mono text-[var(--patiya-color-muted-foreground)]">
                  <span className="capitalize">{item.category}</span>
                  <span>{item.time}</span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}`,
  },
  "agent-voice-orb": {
    title: "Multimodal Voice & Neural Orb",
    description:
      "Interactive AI agent voice sphere with dynamic frequency waves, speech mode state transitions, and responsive audio gain control.",
    category: "Agentic AI & Neural Surfaces",
    badge: "motion.dev",
    preview: <AgentVoiceOrbPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function AgentVoiceOrb() {
  const [state, setState] = useState<'idle' | 'listening' | 'speaking'>('speaking');
  const [gain, setGain] = useState(75);

  const bars = [25, 45, 70, 95, 60, 100, 80, 90, 65, 85, 50, 30];

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl border bg-card space-y-4">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold">Neural Voice Core</span>
        <span className="font-mono text-[10px] text-emerald-500 font-bold">● Active 124ms</span>
      </div>

      <div className="relative h-40 rounded-xl border bg-background/80 flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          animate={{
            scale: state === 'speaking' ? [1, 1.25, 1.05, 1.2, 1] : [1, 1.05, 1],
            rotate: state === 'listening' ? 360 : 0,
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary via-indigo-500 to-cyan-400 blur-sm opacity-80"
        />

        <div className="absolute bottom-3 inset-x-0 px-6 flex items-end justify-center gap-1.5 h-7">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: \`\${Math.round(h * (gain / 100))}%\` }}
              transition={{ type: 'spring', stiffness: 320, damping: 20, delay: i * 0.02 }}
              className="w-1.5 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {(['idle', 'listening', 'speaking'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            className={\`flex-1 py-1 text-xs font-semibold rounded-lg capitalize border \${
              state === s ? 'bg-primary/10 border-primary text-primary' : 'border-border text-muted-foreground'
            }\`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}`,
  },
  "agentic-flow-pipeline": {
    title: "Agentic Execution Graph",
    description:
      "Visual multi-step agent reasoning workflow with live state transitions, animated data streams, and expandable node inspect drawers.",
    category: "Agentic AI & Neural Surfaces",
    badge: "motion.dev",
    preview: <AgenticFlowPipelinePreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Step = { id: string; title: string; tool: string; ms: number };

export function AgenticFlowPipeline() {
  const steps: Step[] = [
    { id: '1', title: 'Intent Classifier', tool: 'Semantics v2', ms: 42 },
    { id: '2', title: 'Context Retrieval', tool: 'Vector DB', ms: 96 },
    { id: '3', title: 'Autonomous Action', tool: 'GitHub API', ms: 210 },
    { id: '4', title: 'Synthesis & CoT', tool: 'DeepSeek R1', ms: 145 },
  ];

  const [active, setActive] = useState(2);
  const [selected, setSelected] = useState<Step>(steps[2]);

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-2xl border bg-card space-y-3">
      <div className="flex items-center justify-between pb-2 border-b">
        <span className="text-xs font-bold">Agent Reasoning Graph</span>
        <button
          onClick={() => setActive((a) => (a + 1) % steps.length)}
          className="px-2 py-0.5 rounded bg-primary text-primary-foreground text-[10px] font-bold"
        >
          Step Next
        </button>
      </div>

      <div className="space-y-2">
        {steps.map((st, idx) => {
          const isDone = idx <= active;
          const isCurrent = idx === active;
          return (
            <motion.div
              key={st.id}
              layout
              onClick={() => setSelected(st)}
              className={\`p-2 rounded-xl border flex items-center justify-between text-xs cursor-pointer \${
                selected.id === st.id ? 'border-primary bg-background' : 'border-border bg-background/50'
              }\`}
            >
              <div className="flex items-center gap-2">
                <span className={\`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold \${
                  isDone ? 'bg-emerald-500/20 text-emerald-500' : 'bg-muted text-muted-foreground'
                }\`}>
                  {isDone ? '✓' : idx + 1}
                </span>
                <div>
                  <p className="font-bold">{st.title}</p>
                  <p className="text-[10px] text-muted-foreground">{st.tool}</p>
                </div>
              </div>
              <span className="font-mono text-[10px]">{st.ms}ms</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}`,
  },
  "semantic-patch-reviewer": {
    title: "AI Semantic Diff & Patch Lens",
    description:
      "Interactive code mutation reviewer with spring-loaded line approvals, confidence score radar pill, and instant reject/accept animations.",
    category: "Agentic AI & Neural Surfaces",
    badge: "motion.dev",
    preview: <SemanticPatchReviewerPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

type Diff = { id: string; type: 'add' | 'del'; text: string; done: boolean };

export function SemanticPatchReviewer() {
  const [diffs, setDiffs] = useState<Diff[]>([
    { id: '1', type: 'del', text: "- const auth = syncStorage.get('token');", done: false },
    { id: '2', type: 'add', text: "+ const { auth } = useAgentSession();", done: false },
    { id: '3', type: 'del', text: '- return dispatchStream(auth, { retry: 3 });', done: false },
    { id: '4', type: 'add', text: \"+ return dispatchStream(auth, { fallback: 'local' });\", done: false },
  ]);

  const toggle = (id: string) => {
    setDiffs((prev) => prev.map((d) => (d.id === id ? { ...d, done: !d.done } : d)));
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-2xl border bg-card space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="font-mono text-[11px] font-bold">src/agent/stream.ts</span>
        <span className="text-[10px] font-mono text-primary font-bold">98.6% Confidence</span>
      </div>

      <div className="space-y-1.5 font-mono text-[11px] p-2 rounded-xl border bg-background">
        {diffs.map((d) => (
          <motion.div
            key={d.id}
            layout
            onClick={() => toggle(d.id)}
            className={\`p-1.5 rounded-lg flex justify-between items-center cursor-pointer transition-opacity \${
              d.done ? 'opacity-30 line-through' : d.type === 'add' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
            }\`}
          >
            <span className="truncate">{d.text}</span>
            <span className="text-[10px] ml-2 font-bold">{d.done ? '✓' : '○'}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}`,
  },
  "neural-vector-cluster": {
    title: "Neural Vector Context Vault",
    description:
      "Spatial semantic memory cluster explorer with distance-spring physics, interactive pin selection, and live relevance scoring.",
    category: "Agentic AI & Neural Surfaces",
    badge: "motion.dev",
    preview: <NeuralVectorClusterPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Memory = { id: string; label: string; score: number };

export function NeuralVectorCluster() {
  const [items] = useState<Memory[]>([
    { id: '1', label: 'JWT Session Claim', score: 0.94 },
    { id: '2', label: 'Workspace Policy Matrix', score: 0.89 },
    { id: '3', label: 'Prompt Context Window', score: 0.82 },
    { id: '4', label: 'Tool Dispatch Sandbox', score: 0.77 },
  ]);

  const [active, setActive] = useState('1');

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-2xl border bg-card space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold">Neural Vector Memory</span>
        <span className="font-mono text-[10px] text-muted-foreground">Cosine Sim</span>
      </div>

      <div className="space-y-1.5">
        {items.map((m) => {
          const isSelected = active === m.id;
          return (
            <motion.div
              key={m.id}
              layout
              onClick={() => setActive(m.id)}
              className={\`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer \${
                isSelected ? 'border-primary bg-background shadow-xs' : 'border-border bg-background/50'
              }\`}
            >
              <span className="font-medium">{m.label}</span>
              <div className="flex items-center gap-2">
                <div className="w-14 h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: \`\${m.score * 100}%\` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-primary font-bold">{m.score.toFixed(2)}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}`,
  },
  "model-arena-benchmark": {
    title: "Model Arena & Inference Gauge",
    description:
      "Side-by-side comparative LLM benchmark with dynamic token stream velocity gauges, real-time TTFT telemetry, and blind vote selection.",
    category: "Agentic AI & Neural Surfaces",
    badge: "motion.dev",
    preview: <ModelArenaBenchmarkPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function ModelArenaBenchmark() {
  const [running, setRunning] = useState(false);
  const [progressA, setProgressA] = useState(100);
  const [progressB, setProgressB] = useState(100);
  const [vote, setVote] = useState<'a' | 'b' | null>('a');

  const startRace = () => {
    setRunning(true);
    setProgressA(0);
    setProgressB(0);
    let pA = 0;
    let pB = 0;
    const interval = setInterval(() => {
      pA += Math.floor(Math.random() * 20) + 10;
      pB += Math.floor(Math.random() * 16) + 8;
      setProgressA(Math.min(100, pA));
      setProgressB(Math.min(100, pB));
      if (pA >= 100 && pB >= 100) {
        clearInterval(interval);
        setRunning(false);
      }
    }, 120);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-2xl border bg-card space-y-4">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold">Dual LLM Velocity Gauge</span>
        <button
          onClick={startRace}
          disabled={running}
          className="px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold"
        >
          {running ? 'Streaming...' : 'Race Engines'}
        </button>
      </div>

      <div className="space-y-3">
        <div className="p-2.5 rounded-xl border bg-background space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="font-bold">Model Alpha (32B)</span>
            <span className="font-mono text-[10px] text-emerald-500 font-bold">84 tok/s</span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
              animate={{ width: \`\${progressA}%\` }}
            />
          </div>
        </div>

        <div className="p-2.5 rounded-xl border bg-background space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="font-bold">Model Beta (8B)</span>
            <span className="font-mono text-[10px] text-amber-500 font-bold">62 tok/s</span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-rose-400"
              animate={{ width: \`\${progressB}%\` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={() => setVote('a')}
          className={\`py-1.5 rounded-lg border text-xs font-semibold \${
            vote === 'a' ? 'bg-primary/10 border-primary text-primary' : 'border-border text-muted-foreground'
          }\`}
        >
          Vote Alpha
        </button>
        <button
          onClick={() => setVote('b')}
          className={\`py-1.5 rounded-lg border text-xs font-semibold \${
            vote === 'b' ? 'bg-primary/10 border-primary text-primary' : 'border-border text-muted-foreground'
          }\`}
        >
          Vote Beta
        </button>
      </div>
    </div>
  );
}`,
  },
  "biometric-passkey-vault": {
    title: "Passkey & Biometric Scanner",
    description:
      "Interactive FIDO2 WebAuthn credential authenticator with laser fingerprint scanning beam, challenge verification, and cryptographic hash telemetry.",
    category: "Biometric & Cryptographic Vaults",
    badge: "motion.dev",
    preview: <BiometricPasskeyVaultPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function BiometricPasskeyVault() {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verified'>('idle');

  const authenticate = () => {
    setStatus('scanning');
    setTimeout(() => setStatus('verified'), 1400);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl border bg-card space-y-4">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold">Passkey WebAuthn</span>
        <span className="font-mono text-[10px] text-emerald-500 font-bold">● Hardware Level</span>
      </div>

      <div className="relative h-36 rounded-xl border bg-background flex flex-col items-center justify-center overflow-hidden">
        <div className="relative w-16 h-16 rounded-xl border flex items-center justify-center">
          <svg className={\`w-10 h-10 \${status === 'verified' ? 'text-emerald-500' : 'text-muted-foreground'}\`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
            <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
            <path d="M2 12a10 10 0 0 1 18-6" />
          </svg>
          {status === 'scanning' && (
            <motion.div
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-0 right-0 h-0.5 bg-primary shadow-sm"
            />
          )}
        </div>
        <span className="text-xs font-mono font-bold mt-2">
          {status === 'idle' ? 'Ready to Scan' : status === 'scanning' ? 'Verifying Challenge...' : '✓ Hardware Attested'}
        </span>
      </div>

      <button
        onClick={status === 'verified' ? () => setStatus('idle') : authenticate}
        className="w-full py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
      >
        {status === 'verified' ? 'Reset' : 'Touch Biometric'}
      </button>
    </div>
  );
}`,
  },
  "totp-authenticator-ring": {
    title: "Radial TOTP Authenticator",
    description:
      "Multi-account 2FA security authenticator with circular time-decay ring, animated 6-digit rolling token codes, and copy-to-clipboard micro-interactions.",
    category: "Biometric & Cryptographic Vaults",
    badge: "motion.dev",
    preview: <TotpAuthenticatorRingPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function TotpAuthenticatorRing() {
  const [copied, setCopied] = useState(false);
  const token = '849 201';

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-2xl border bg-card space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold">2FA Rolling Token</span>
        <span className="font-mono text-[10px] text-muted-foreground">RFC 6238</span>
      </div>

      <div className="p-4 rounded-xl border bg-background flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono text-muted-foreground">dev-cluster@github.com</span>
          <span className="text-2xl font-mono font-extrabold tracking-widest block mt-0.5">{token}</span>
        </div>

        <button
          onClick={copy}
          className="px-3 py-1.5 rounded-lg border text-xs font-bold"
        >
          {copied ? '✓' : 'Copy'}
        </button>
      </div>
    </div>
  );
}`,
  },
  "cryptographic-key-vault": {
    title: "Cryptographic Key Rotator & Vault",
    description:
      "Hardware-security-module key management surface with live rotation triggers, entropy visualizer, and hold-to-shred progress bar.",
    category: "Biometric & Cryptographic Vaults",
    badge: "motion.dev",
    preview: <CryptographicKeyVaultPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function CryptographicKeyVault() {
  const [keyId, setKeyId] = useState('kms_live_890af2');
  const [rotating, setRotating] = useState(false);

  const rotate = () => {
    setRotating(true);
    setTimeout(() => {
      setKeyId(\`kms_live_\${Math.random().toString(16).slice(2, 8)}\`);
      setRotating(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-2xl border bg-card space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold">HSM Key Lifecycle</span>
        <span className="font-mono text-[10px] text-primary font-bold">AES-256-GCM</span>
      </div>

      <div className="p-3 rounded-xl border bg-background font-mono text-xs space-y-1">
        <p className="text-muted-foreground text-[10px]">CURRENT KEY:</p>
        <p className="font-bold">{keyId}</p>
        <p className="text-emerald-500 text-[10px]">Entropy: 256.0 bits</p>
      </div>

      <button
        onClick={rotate}
        disabled={rotating}
        className="w-full py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
      >
        {rotating ? 'Rotating Key...' : 'Rotate Key ↻'}
      </button>
    </div>
  );
}`,
  },
  "zero-trust-access-radar": {
    title: "Zero-Trust Session Radar",
    description:
      "Live distributed device perimeter radar with spinning sweep beam, threat score indicator, and instant session revoking.",
    category: "Biometric & Cryptographic Vaults",
    badge: "motion.dev",
    preview: <ZeroTrustAccessRadarPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function ZeroTrustAccessRadar() {
  const [nodes, setNodes] = useState(['San Francisco (MacBook)', 'Tokyo (iPhone 16)']);

  const revoke = (name: string) => {
    setNodes((n) => n.filter((x) => x !== name));
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-2xl border bg-card space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold">Zero-Trust Device Radar</span>
        <span className="font-mono text-[10px] text-emerald-500 font-bold">Threat: 0.02</span>
      </div>

      <div className="relative h-28 rounded-xl border bg-background/80 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-primary origin-right" />
        </motion.div>
        <span className="w-2 h-2 rounded-full bg-primary ring-4 ring-primary/20" />
      </div>

      <div className="space-y-1">
        {nodes.map((node) => (
          <div key={node} className="p-2 rounded-lg border bg-background flex justify-between items-center text-xs">
            <span>{node}</span>
            <button onClick={() => revoke(node)} className="text-[10px] font-mono text-red-500">Revoke</button>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  "stealth-secret-masker": {
    title: "Stealth Secret Masker",
    description:
      "Zero-leak environment variable inspector with matrix character scramble, temporary peek timer, and auto-mask countdown.",
    category: "Biometric & Cryptographic Vaults",
    badge: "motion.dev",
    preview: <StealthSecretMaskerPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function StealthSecretMasker() {
  const [revealed, setRevealed] = useState(false);
  const secret = 'sk_live_51N8xZ9021qLk9912';

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-2xl border bg-card space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold">STRIPE_SECRET_KEY</span>
        <button
          onClick={() => setRevealed(!revealed)}
          className="px-2 py-0.5 rounded border text-[10px] font-mono"
        >
          {revealed ? 'Mask' : 'Reveal'}
        </button>
      </div>

      <div className="p-2 rounded-lg bg-muted/50 font-mono text-xs overflow-hidden">
        {revealed ? <span className="text-emerald-500">{secret}</span> : <span>••••••••••••••••••••</span>}
      </div>
    </div>
  );
}`,
  },
};

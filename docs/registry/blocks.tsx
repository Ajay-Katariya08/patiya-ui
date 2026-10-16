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
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      title: "Metrics",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      title: "Settings",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto py-8 flex flex-col items-center">
      <div className="relative inline-flex items-center gap-1.5 p-1.5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none">
        {items.map((item, idx) => {
          const isActive = activeTab === idx;
          const isHovered = hoveredTab === idx;

          return (
            <button
              key={item.title}
              onClick={() => setActiveTab(idx)}
              onMouseEnter={() => setHoveredTab(idx)}
              onMouseLeave={() => setHoveredTab(null)}
              className="relative px-3.5 py-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer z-10"
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

      <div className="mt-4 text-[11px] text-[var(--patiya-color-muted-foreground)] flex items-center gap-2">
        <span>Active module:</span>
        <span className="font-semibold text-[var(--patiya-color-foreground)]">{items[activeTab].title}</span>
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
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]/60">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-[var(--patiya-color-foreground)]">API Latency Telemetry</span>
        </div>

        <div className="flex items-center p-0.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/50">
          {(["1h", "24h", "7d"] as const).map((t) => {
            const isSelected = timeframe === t;
            return (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className="relative px-2 py-0.5 text-[10px] font-semibold transition-colors cursor-pointer"
              >
                {isSelected && (
                  <motion.div
                    layoutId="metric-time-pill"
                    className="absolute inset-0 rounded-md bg-[var(--patiya-color-background)] border border-[var(--patiya-color-border)]"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
                <span className={`relative z-10 ${isSelected ? "text-[var(--patiya-color-foreground)]" : "text-[var(--patiya-color-muted-foreground)]"}`}>
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
              className="text-3xl font-extrabold tracking-tight text-[var(--patiya-color-foreground)] block"
            >
              {current.latency}
            </motion.span>
          </AnimatePresence>
          <span className="text-[11px] text-[var(--patiya-color-muted-foreground)]">p99 edge roundtrip</span>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-emerald-500 block">{current.uptime}</span>
          <span className="text-[11px] text-[var(--patiya-color-muted-foreground)]">Global SLA</span>
        </div>
      </div>

      <div className="mt-5 h-16 flex items-end gap-1.5 pt-2">
        {current.bars.map((bar, idx) => (
          <motion.div
            key={idx}
            initial={false}
            animate={{ height: `${bar}%` }}
            transition={{ type: "spring", stiffness: 350, damping: 22, delay: idx * 0.02 }}
            className="flex-1 rounded-sm bg-[var(--patiya-color-primary)]/80 hover:bg-[var(--patiya-color-primary)] transition-colors"
          />
        ))}
      </div>
    </div>
  );
};

export const NotificationStackPreview = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Production Build Succeeded", time: "1m ago", type: "success" },
    { id: 2, title: "Database Snapshot Completed", time: "12m ago", type: "info" },
    { id: 3, title: "New API Key Generated", time: "1h ago", type: "alert" },
  ]);

  const dismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const reset = () => {
    setNotifications([
      { id: 1, title: "Production Build Succeeded", time: "1m ago", type: "success" },
      { id: 2, title: "Database Snapshot Completed", time: "12m ago", type: "info" },
      { id: 3, title: "New API Key Generated", time: "1h ago", type: "alert" },
    ]);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex flex-col items-center select-none">
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
              className="p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    notif.type === "success"
                      ? "bg-emerald-500"
                      : notif.type === "info"
                      ? "bg-blue-500"
                      : "bg-amber-500"
                  }`}
                />
                <div>
                  <h4 className="text-xs font-semibold text-[var(--patiya-color-foreground)]">{notif.title}</h4>
                  <span className="text-[10px] text-[var(--patiya-color-muted-foreground)]">{notif.time}</span>
                </div>
              </div>
              <button
                onClick={() => dismiss(notif.id)}
                className="text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] p-1 rounded-md hover:bg-[var(--patiya-color-muted)] transition-colors cursor-pointer"
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
      prev.map((step) => (step.id === id ? { ...step, done: !step.done } : step))
    );
  };

  const completedCount = steps.filter((s) => s.done).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--patiya-color-foreground)]">Setup Progress</h3>
        <span className="text-xs font-mono font-bold text-[var(--patiya-color-primary)]">{progressPercent}%</span>
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
            className="w-full p-2.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/60 hover:bg-[var(--patiya-color-muted)]/30 flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
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
                className={`text-xs font-medium transition-colors ${
                  step.done
                    ? "line-through text-[var(--patiya-color-muted-foreground)]"
                    : "text-[var(--patiya-color-foreground)]"
                }`}
              >
                {step.title}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">0{step.id}</span>
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
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none">
      <div className="flex items-center p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/50">
        {segments.map((seg) => {
          const isSelected = selected === seg.id;
          return (
            <button
              key={seg.id}
              onClick={() => setSelected(seg.id)}
              className="relative flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer z-10"
            >
              {isSelected && (
                <motion.div
                  layoutId="segmented-control-bg"
                  className="absolute inset-0 rounded-lg bg-[var(--patiya-color-background)] border border-[var(--patiya-color-border)]"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${isSelected ? "text-[var(--patiya-color-foreground)]" : "text-[var(--patiya-color-muted-foreground)]"}`}>
                {seg.label}
              </span>
              <span
                className={`relative z-10 text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
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
            <span className="text-[var(--patiya-color-muted-foreground)]">Current view:</span>
            <span className="font-bold text-[var(--patiya-color-primary)] uppercase tracking-wider">{selected}</span>
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
        className="p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] flex items-center justify-center border border-[var(--patiya-color-primary)]/20">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">Postgres Cluster Alpha</h4>
              <span className="text-[10px] text-emerald-500 font-medium">us-east-1 • Healthy</span>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] hover:bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] transition-colors cursor-pointer"
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
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
                    <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] block">Storage</span>
                    <span className="font-semibold text-[var(--patiya-color-foreground)]">38.2 / 100 GB</span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
                    <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] block">Replication</span>
                    <span className="font-semibold text-[var(--patiya-color-foreground)]">Synchronous</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[var(--patiya-color-muted-foreground)]">Automatic Backups</span>
                  <span className="font-mono text-emerald-500 font-bold">Daily 02:00 UTC</span>
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
    <div className="w-full max-w-lg mx-auto py-6 flex flex-col items-center">
      <div className="w-full max-w-md p-1.5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/90 flex items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-2 pl-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono text-[var(--patiya-color-muted-foreground)]">prod-node-01</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveAction(activeAction === "terminal" ? null : "terminal")}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeAction === "terminal"
                ? "bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)] border border-[var(--patiya-color-primary)]/30"
                : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60"
            }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            <span>Logs</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60 flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-emerald-500 font-medium">Copied</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <p className="text-emerald-500/90">&gt; GET /api/v1/health 1.2ms</p>
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

  const seriesData: Record<"24h" | "7d" | "30d", { val: string; delta: string; points: number[]; labels: string[] }> = {
    "24h": {
      val: "48,290",
      delta: "+14.8%",
      points: [24, 38, 30, 48, 42, 65, 58, 80],
      labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
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

  const activeIndex = hoveredIdx !== null ? hoveredIdx : current.points.length - 1;
  const activeValue = current.points[activeIndex];
  const activeLabel = current.labels[activeIndex];

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]/50">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">
            API Invocations
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold tracking-tight text-[var(--patiya-color-foreground)]">
              {hoveredIdx !== null ? activeValue.toLocaleString() : current.val}
            </span>
            <span className="text-[10px] font-semibold text-emerald-500 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              {current.delta}
            </span>
          </div>
        </div>

        <div className="flex p-0.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
          {(["24h", "7d", "30d"] as const).map((r) => (
            <button
              key={r}
              onClick={() => {
                setRange(r);
                setHoveredIdx(null);
              }}
              className="relative px-2 py-1 text-[10px] font-semibold transition-colors cursor-pointer"
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

        <svg viewBox="0 0 280 90" className="w-full h-24 overflow-visible">
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
              <g key={i} onMouseEnter={() => setHoveredIdx(i)} className="cursor-pointer">
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
  const [status, setStatus] = useState<"idle" | "uploading" | "success">("idle");

  const startProcess = () => {
    setStatus("uploading");
    setTimeout(() => {
      setStatus("success");
    }, 1800);
  };

  return (
    <div className="w-full max-w-md mx-auto py-6 flex flex-col items-center">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 32 }}
        className="w-full max-w-sm p-2 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none"
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-between px-2 py-1"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--patiya-color-muted-foreground)]/60" />
                <span className="text-xs font-medium text-[var(--patiya-color-foreground)]">System Ready</span>
              </div>
              <button
                onClick={startProcess}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--patiya-color-primary)] text-white hover:opacity-90 transition-opacity cursor-pointer"
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
              className="flex items-center justify-between px-2 py-1"
            >
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 animate-spin text-[var(--patiya-color-primary)]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span className="text-xs font-medium text-[var(--patiya-color-foreground)]">Syncing shards...</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">68%</span>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-between px-2 py-1"
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-xs font-medium text-[var(--patiya-color-foreground)]">4,120 rows synced</span>
              </div>
              <div className="flex items-center gap-1.5">
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
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--patiya-color-border)]/50">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">
            Deployment Readiness
          </span>
          <h4 className="text-sm font-bold text-[var(--patiya-color-foreground)] mt-0.5">Production Launch</h4>
        </div>

        <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
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
            className="w-full p-2.5 rounded-xl border border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)]/50 hover:bg-[var(--patiya-color-muted)]/40 flex items-center justify-between text-xs transition-colors cursor-pointer"
          >
            <span
              className={`font-medium ${
                task.done
                  ? "text-[var(--patiya-color-muted-foreground)] line-through"
                  : "text-[var(--patiya-color-foreground)]"
              }`}
            >
              {task.title}
            </span>
            <span
              className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                task.done
                  ? "bg-[var(--patiya-color-primary)] border-[var(--patiya-color-primary)] text-white"
                  : "border-[var(--patiya-color-border)]"
              }`}
            >
              {task.done && (
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
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
    setActiveTags(activeTags.includes(tag) ? activeTags.filter((t) => t !== tag) : [...activeTags, tag]);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-3">
      <div className="flex p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] gap-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className="relative flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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
    <div className="w-full max-w-sm mx-auto py-4 select-none">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className="p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[var(--patiya-color-primary)]/15 border border-[var(--patiya-color-primary)]/30 flex items-center justify-center text-[var(--patiya-color-primary)]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">Serverless Worker</h4>
              <p className="text-[10px] text-[var(--patiya-color-muted-foreground)] font-mono">us-east.edge.worker</p>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)] transition-colors cursor-pointer flex items-center gap-1"
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
                  <span className="text-[var(--patiya-color-muted-foreground)] block">Cold start</span>
                  <span className="text-emerald-500 font-bold text-xs mt-0.5 block">14 ms</span>
                </div>
                <div className="p-2 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
                  <span className="text-[var(--patiya-color-muted-foreground)] block">Invocations</span>
                  <span className="text-[var(--patiya-color-foreground)] font-bold text-xs mt-0.5 block">94.2k / hr</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-between font-mono text-[10px]">
                <span className="text-[var(--patiya-color-muted-foreground)] truncate">endpoint: https://api.worker.dev</span>
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
  const [activeTool, setActiveTool] = useState<"pointer" | "shape" | "pen" | "text" | "ai">("shape");
  const [activeShape, setActiveShape] = useState<"rectangle" | "circle" | "triangle" | "star">("rectangle");
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
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      ),
    },
    {
      id: "circle",
      label: "Circle",
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
    },
    {
      id: "triangle",
      label: "Triangle",
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3l9 16H3z" />
        </svg>
      ),
    },
    {
      id: "star",
      label: "Star",
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto py-6 flex flex-col items-center gap-5 select-none">
      <div className="relative flex flex-col items-center">
        <AnimatePresence>
          {activeTool === "shape" && showSubMenu && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className="absolute -top-12 z-20 flex items-center gap-1 p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] backdrop-blur-md"
            >
              {shapes.map((s) => {
                const isSelected = activeShape === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveShape(s.id as any)}
                    className="relative p-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center"
                    title={s.label}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="active-shape-pill"
                        className="absolute inset-0 rounded-lg bg-[var(--patiya-color-primary)]/15 border border-[var(--patiya-color-primary)]/30"
                        transition={{ type: "spring", stiffness: 450, damping: 30 }}
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

        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]">
          <button
            onClick={() => {
              setActiveTool("pointer");
              setShowSubMenu(false);
            }}
            className="relative p-2 rounded-xl text-xs transition-colors cursor-pointer"
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
              setShowSubMenu((prev) => (activeTool === "shape" ? !prev : true));
            }}
            className="relative p-2 rounded-xl text-xs transition-colors cursor-pointer"
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
            className="relative p-2 rounded-xl text-xs transition-colors cursor-pointer"
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
            className="relative p-2 rounded-xl text-xs transition-colors cursor-pointer"
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
            className="relative p-2 rounded-xl text-xs transition-colors cursor-pointer"
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
              animate={sparkleActive ? { rotate: [0, 180, 360], scale: [1, 1.25, 1] } : {}}
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

          <div className="w-[1px] h-5 bg-[var(--patiya-color-border)] mx-1" />

          <div className="flex items-center gap-1 px-1">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setActiveColor(c)}
                className="relative w-5 h-5 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
              >
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: c }} />
                {activeColor === c && (
                  <motion.span
                    layoutId="active-color-ring"
                    className="absolute inset-0 rounded-full border border-[var(--patiya-color-foreground)]"
                    transition={{ type: "spring", stiffness: 450, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="w-[1px] h-5 bg-[var(--patiya-color-border)] mx-1" />

          <div className="flex items-center gap-0.5">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setHistoryCount((h) => Math.max(0, h - 1))}
              className="p-1.5 rounded-lg text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer"
              title="Undo"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 7v6h6" />
                <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
              </svg>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setHistoryCount((h) => h + 1)}
              className="p-1.5 rounded-lg text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer"
              title="Redo"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 7v6h-6" />
                <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="w-full h-36 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/60 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-2.5 left-3 flex items-center gap-2 text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeColor }} />
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
              style={{ borderColor: activeColor, backgroundColor: `${activeColor}20` }}
            />
          )}
          {activeTool === "shape" && activeShape === "circle" && (
            <div
              className="w-14 h-14 rounded-full border-2"
              style={{ borderColor: activeColor, backgroundColor: `${activeColor}20` }}
            />
          )}
          {activeTool === "shape" && activeShape === "triangle" && (
            <div className="w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14" viewBox="0 0 24 24" fill={`${activeColor}20`} stroke={activeColor} strokeWidth="2">
                <path d="M12 3l9 16H3z" />
              </svg>
            </div>
          )}
          {activeTool === "shape" && activeShape === "star" && (
            <div className="w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14" viewBox="0 0 24 24" fill={`${activeColor}20`} stroke={activeColor} strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          )}
          {activeTool === "pointer" && (
            <div className="text-xs font-medium text-[var(--patiya-color-muted-foreground)] flex items-center gap-2">
              <svg className="w-4 h-4 text-[var(--patiya-color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3l7 18 3-7 7-3L3 3z" />
              </svg>
              <span>Click any element to transform</span>
            </div>
          )}
          {activeTool === "pen" && (
            <svg className="w-32 h-10" viewBox="0 0 120 40" fill="none" stroke={activeColor} strokeWidth="3" strokeLinecap="round">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                d="M10 25 C 30 10, 50 35, 70 20 S 100 30, 110 15"
              />
            </svg>
          )}
          {activeTool === "text" && (
            <span className="text-sm font-semibold tracking-wide" style={{ color: activeColor }}>
              Double click to edit typography
            </span>
          )}
          {activeTool === "ai" && (
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--patiya-color-primary)]">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" strokeDasharray="30" strokeDashoffset="10" />
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
    { id: 1, title: "Next-gen Billing Service", status: "active", tag: "API Gateway", ping: "99.98%" },
    { id: 2, title: "OIDC Token Rotation Hook", status: "review", tag: "Core Auth", ping: "Pending" },
    { id: 3, title: "PostgreSQL Read Replica", status: "active", tag: "Database", ping: "14ms" },
    { id: 4, title: "Legacy Webhook Listener", status: "archived", tag: "API Gateway", ping: "Disabled" },
    { id: 5, title: "Distributed Lock Manager", status: "active", tag: "High Priority", ping: "1.2ms" },
  ];

  const filteredItems = items.filter((item) => {
    const matchesView = selectedView === "all" || item.status === selectedView;
    const matchesTag = !selectedTag || item.tag === selectedTag;
    const matchesSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesView && matchesTag && matchesSearch;
  });

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="space-y-2">
        <div className="flex p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] gap-1">
          {views.map((v) => {
            const isSelected = selectedView === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedView(v.id)}
                className="relative flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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
                    isSelected ? "bg-[var(--patiya-color-primary)]" : "bg-[var(--patiya-color-border)]"
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
                className="p-2.5 rounded-xl border border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)]/60 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      item.status === "active"
                        ? "bg-emerald-500"
                        : item.status === "review"
                        ? "bg-amber-500"
                        : "bg-zinc-400"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="font-medium text-[var(--patiya-color-foreground)] truncate">{item.title}</p>
                    <p className="text-[10px] text-[var(--patiya-color-muted-foreground)]">{item.tag}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)] shrink-0">
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
  const [activeAlert, setActiveAlert] = useState<"deploy" | "security" | "success">("deploy");
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
        <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
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
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
    <div className="w-full max-w-md mx-auto py-4 select-none space-y-4 flex flex-col items-center">
      <div className="flex p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] gap-1">
        {(["deploy", "security", "success"] as const).map((key) => {
          const isSelected = activeAlert === key;
          return (
            <button
              key={key}
              onClick={() => switchAlert(key)}
              className="relative px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer"
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
              <div className="p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]"
                    style={{ color: current.color }}
                  >
                    {current.icon}
                  </div>
                  <div className="min-w-0">
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
                    className="px-2.5 py-1 rounded-lg text-[11px] font-medium border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)] transition-colors cursor-pointer"
                  >
                    {expanded ? "Collapse" : "Inspect"}
                  </button>
                  <button
                    onClick={() => setDismissed(true)}
                    className="p-1 rounded-lg text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer"
                    title="Dismiss"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
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
                    <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
                      {current.meta.map((m) => (
                        <div
                          key={m.label}
                          className="p-2 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]"
                        >
                          <span className="text-[var(--patiya-color-muted-foreground)] block">{m.label}</span>
                          <span className="text-[var(--patiya-color-foreground)] font-bold mt-0.5 block truncate">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] font-mono">
                        Status: <strong className="text-[var(--patiya-color-foreground)]">{current.status}</strong>
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
  const [metricMode, setMetricMode] = useState<"throughput" | "latency" | "errors">("throughput");
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
    <div className="w-full max-w-md mx-auto p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
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

        <div className="flex items-center gap-1.5">
          <div className="flex p-0.5 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
            {(["throughput", "latency", "errors"] as const).map((mode) => {
              const active = metricMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => setMetricMode(mode)}
                  className="relative px-2 py-1 text-[10px] font-semibold capitalize transition-colors cursor-pointer"
                >
                  {active && (
                    <motion.div
                      layoutId="telemetry-mode-pill"
                      className="absolute inset-0 rounded-md bg-[var(--patiya-color-card)] border border-[var(--patiya-color-border)]"
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
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
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
            className="text-3xl font-extrabold tracking-tight text-[var(--patiya-color-foreground)]"
          >
            {current.value}
          </motion.span>
          <span className="text-sm font-semibold text-[var(--patiya-color-muted-foreground)]">
            {current.unit}
          </span>
          <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
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
                height: isPaused ? `${bar}%` : [`${Math.max(15, bar - 15)}%`, `${bar}%`, `${Math.min(100, bar + 10)}%`, `${bar}%`],
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

      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[var(--patiya-color-border)]/60 text-left font-mono">
        <div className="p-2 rounded-xl border border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)]/50">
          <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] block">Active Edges</span>
          <span className="text-xs font-bold text-[var(--patiya-color-foreground)] mt-0.5 block">142 PoPs</span>
        </div>
        <div className="p-2 rounded-xl border border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)]/50">
          <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] block">Uptime</span>
          <span className="text-xs font-bold text-emerald-500 mt-0.5 block">99.995%</span>
        </div>
        <div className="p-2 rounded-xl border border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)]/50">
          <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] block">Protocol</span>
          <span className="text-xs font-bold text-[var(--patiya-color-foreground)] mt-0.5 block">HTTP/3</span>
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
    <div className="w-full max-w-md mx-auto p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none space-y-4">
      <div className="flex items-center justify-between border-b border-[var(--patiya-color-border)]/60 pb-3">
        <div>
          <h4 className="text-xs font-bold text-[var(--patiya-color-foreground)]">Release Pipeline v2.4.0</h4>
          <p className="text-[11px] text-[var(--patiya-color-muted-foreground)] font-mono">commit: 9f12d8a • branch: main</p>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 0))}
            className="px-2 py-1 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[10px] font-semibold text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer"
          >
            Prev
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
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
                className="w-full p-2.5 flex items-center justify-between text-xs text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
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
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
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
    const matchesQuery = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="w-full max-w-md mx-auto py-8 flex flex-col items-center select-none">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className={`rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] overflow-hidden transition-colors ${
          isExpanded ? "w-full p-3.5 space-y-3" : "inline-flex items-center gap-1.5 p-1.5"
        }`}
      >
        {!isExpanded ? (
          <>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsExpanded(true)}
              className="relative px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-[var(--patiya-color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-muted-foreground)]">
                ⌘K
              </span>
            </motion.button>

            <div className="w-[1px] h-5 bg-[var(--patiya-color-border)] mx-0.5" />

            <button
              onClick={() => {}}
              className="p-2 rounded-xl text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60 transition-colors cursor-pointer"
              title="Bookmarks"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>

            <button
              onClick={() => {}}
              className="p-2 rounded-xl text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60 transition-colors cursor-pointer"
              title="Activity"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </button>

            <button
              onClick={() => {}}
              className="p-2 rounded-xl text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60 transition-colors cursor-pointer"
              title="Settings"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <svg className="w-4 h-4 text-[var(--patiya-color-primary)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                className="p-1 rounded-lg text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer"
                title="Close"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-1 p-0.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="relative flex-1 py-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer"
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="morph-search-category-pill"
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
                  className="p-2 rounded-xl border border-[var(--patiya-color-border)]/60 bg-[var(--patiya-color-background)]/50 hover:bg-[var(--patiya-color-muted)]/50 flex items-center justify-between text-xs transition-colors cursor-pointer"
                >
                  <span className="font-medium text-[var(--patiya-color-foreground)] truncate">{item.title}</span>
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
  const [status, setStatus] = useState<"syncing" | "paused" | "complete">("syncing");
  const [progress, setProgress] = useState(68);
  const [isExpanded, setIsExpanded] = useState(false);

  const files = [
    { name: "core-bundle.wasm", size: "12.4 MB", status: "100%", done: true },
    { name: "assets-manifest.json", size: "4.8 MB", status: `${progress}%`, done: false },
    { name: "static-routes.map", size: "1.2 MB", status: "Queued", done: false },
  ];

  return (
    <div className="w-full max-w-md mx-auto py-4 select-none">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className="rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] overflow-hidden"
      >
        <div className="p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
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

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-[var(--patiya-color-foreground)] truncate">
                  Syncing to Edge CDN
                </p>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-muted-foreground)]">
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
              onClick={() => setStatus((s) => (s === "syncing" ? "paused" : "syncing"))}
              className="px-2.5 py-1 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[10px] font-semibold text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)] transition-colors cursor-pointer"
            >
              {status === "syncing" ? "Pause" : "Resume"}
            </motion.button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-lg text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] cursor-pointer"
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
              status === "paused" ? "bg-amber-500" : "bg-[var(--patiya-color-primary)]"
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
                    className="p-2 rounded-xl border border-[var(--patiya-color-border)]/60 bg-[var(--patiya-color-background)]/50 flex items-center justify-between text-[11px] font-mono"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          file.done ? "bg-emerald-500" : status === "paused" ? "bg-amber-500" : "bg-[var(--patiya-color-primary)]"
                        }`}
                      />
                      <span className="text-[var(--patiya-color-foreground)] truncate">{file.name}</span>
                    </div>
                    <span className="text-[var(--patiya-color-muted-foreground)] shrink-0 ml-2">{file.status}</span>
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

export const blocksRegistry: Record<string, BlockItem> = {
  "action-dock": {
    title: "Floating Action Dock",
    description: "A dynamic floating dock widget featuring spring magnification, layoutId pill indicators, and unread notification alerts.",
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
    <div className="inline-flex gap-1.5 p-1.5 rounded-2xl border bg-card">
      {items.map((item, idx) => (
        <button key={item} onClick={() => setActive(idx)} className="relative px-3.5 py-2 text-xs font-medium">
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
    description: "Compact telemetry card featuring animated spring bar graphs, live health pulse indicators, and interactive timeframe controls.",
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
    <div className="p-5 rounded-2xl border bg-card max-w-sm">
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
    description: "Modular stacked notifications card with smooth AnimatePresence exit transitions and spring layout reordering.",
    category: "Notifications",
    badge: "motion.dev",
    preview: <NotificationStackPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function NotificationStack() {
  const [items, setItems] = useState(['Build Succeeded', 'Snapshot Completed', 'API Key Created']);

  return (
    <div className="space-y-2 max-w-sm">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            key={item}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="p-3 rounded-xl border bg-card flex justify-between text-xs font-semibold"
          >
            <span>{item}</span>
            <button onClick={() => setItems(items.filter((i) => i !== item))}>✕</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}`,
  },
  "step-tracker": {
    title: "Morphing Step Progress Tracker",
    description: "Checklist component block with interactive checkmarks that trigger spring SVG path reveals and dynamic progress bar fills.",
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
    <div className="p-5 rounded-2xl border bg-card max-w-sm">
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
    description: "Tactile multi-option segmented controller with spring physics sliding pill, count chips, and crossfade panel transitions.",
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
    <div className="flex p-1 rounded-xl border bg-muted/50 max-w-sm">
      {tabs.map((tab) => (
        <button key={tab} onClick={() => setSelected(tab)} className="relative flex-1 py-1.5 text-xs font-semibold">
          {selected === tab && (
            <motion.div layoutId="pill" className="absolute inset-0 rounded-lg bg-background border" />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
}`,
  },
  "expandable-card": {
    title: "Morphing Detail Card",
    description: "Compact cluster card that smoothly morphs open into an extended configuration drawer with FLIP spring transitions.",
    category: "Expandable Cards",
    badge: "motion.dev",
    preview: <ExpandableCardPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function MorphingDetailCard() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout className="p-5 rounded-2xl border bg-card max-w-sm">
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
    description: "Floating status and command dock with status indicator, interactive terminal preview, and quick endpoint copying.",
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
      <div className="p-1.5 rounded-2xl border bg-card flex items-center justify-between">
        <div className="flex items-center gap-2 pl-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">prod-cluster</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setOpen(!open)} className="px-3 py-1.5 rounded-xl text-xs font-medium border">
            Logs
          </button>
          <button
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border"
          >
            {copied ? 'Copied' : 'Copy URL'}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-2 p-3 rounded-2xl border bg-card text-xs font-mono">
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
    description: "Interactive KPI metrics block with interactive timeframe selector, animated SVG trend curves, and cursor scrubber points.",
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
    <div className="p-5 rounded-2xl border bg-card max-w-sm select-none">
      <div className="flex justify-between items-center pb-3 border-b">
        <div>
          <span className="text-[10px] uppercase font-bold text-muted-foreground">Requests</span>
          <h3 className="text-2xl font-bold mt-1">{range === '7d' ? '318.4k' : '48.2k'}</h3>
        </div>
        <div className="flex p-0.5 rounded-xl border bg-background">
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
    description: "Dynamic island-style status capsule with live progress spinners, success checks, and undo recovery triggers.",
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
    <motion.div layout className="p-2 rounded-2xl border bg-card max-w-sm flex items-center justify-between">
      <span className="text-xs font-medium px-2">
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
        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground"
      >
        {done ? 'Done' : 'Sync'}
      </button>
    </motion.div>
  );
}`,
  },
  "circular-journey-tracker": {
    title: "Circular Journey Tracker",
    description: "Milestone completion card with animated circular SVG stroke progress and interactive step toggles.",
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
    <div className="p-5 rounded-2xl border bg-card max-w-sm">
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
    description: "Compact multi-category filter bar with animated sliding pill indicators, item counts, and tag toggles.",
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
    <div className="p-4 rounded-2xl border bg-card max-w-md space-y-3">
      <div className="flex p-1 rounded-xl border bg-background gap-1">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setCat(tab)} className="relative flex-1 py-1.5 text-xs font-semibold">
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
    description: "Multi-layer service card that expands with FLIP motion into an interactive specs and key-value inspect drawer.",
    category: "Expandable Cards",
    badge: "motion.dev",
    preview: <LayeredFeatureCardPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function LayeredFeatureCard() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout className="p-5 rounded-2xl border bg-card max-w-sm">
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
    description: "Interactive floating canvas toolbar with sub-palette flyouts, spring tooltips, active tool indicator, and quick undo/redo.",
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
    <div className="relative inline-flex items-center gap-1.5 p-1.5 rounded-2xl border bg-card">
      <button onClick={() => setTool('pointer')} className="relative p-2 rounded-xl text-xs">
        {tool === 'pointer' && (
          <motion.div layoutId="tool-pill" className="absolute inset-0 rounded-xl bg-primary/15 border border-primary/30" />
        )}
        <span className="relative z-10">Pointer</span>
      </button>
      <button onClick={() => setTool('shape')} className="relative p-2 rounded-xl text-xs">
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
    description: "Interactive multi-facet segmented controller with animated indicator pill, live status filter tags, and layout transitions.",
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
    <div className="p-4 rounded-2xl border bg-card max-w-md space-y-3">
      <div className="flex p-1 rounded-xl border bg-background gap-1">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setView(tab.id)} className="relative flex-1 py-1.5 text-xs font-semibold">
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
    description: "Interactive dynamic-island notification capsule with collapsible status details, countdown progress bar, and action controls.",
    category: "Notifications",
    badge: "motion.dev",
    preview: <InteractiveAlertCapsulePreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function DynamicAlertCapsule() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div layout className="p-3.5 rounded-2xl border bg-card max-w-md">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold">Production Deploy #429</span>
        <button onClick={() => setExpanded(!expanded)} className="px-2.5 py-1 text-xs rounded-lg border">
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
    description: "Live streaming system telemetry card featuring animated frequency bars, latency health indicators, and mode switching.",
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
    <div className="p-5 rounded-2xl border bg-card max-w-md space-y-4">
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
    description: "Multi-stage deployment pipeline with animated progress track, expandable step logs, and interactive stage controls.",
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
    <div className="p-5 rounded-2xl border bg-card max-w-md space-y-3">
      {steps.map((step, idx) => (
        <motion.div key={step} layout className="p-3 rounded-xl border flex items-center justify-between text-xs">
          <span className={active === idx ? 'font-bold text-primary' : 'text-muted-foreground'}>{step}</span>
          <span className="text-xs font-mono">{active > idx ? 'Done' : active === idx ? 'Running' : 'Queued'}</span>
        </motion.div>
      ))}
    </div>
  );
}`,
  },
  "morphing-search-dock": {
    title: "Morphing Search Dock",
    description: "Compact floating dock that seamlessly morphs into an expanded search command bar with filters and keyboard navigation.",
    category: "Toolbars & Docks",
    badge: "motion.dev",
    preview: <MorphingSearchDockPreview />,
    code: `'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export function MorphingSearchDock() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout className="rounded-2xl border bg-card p-1.5 inline-flex items-center">
      {!open ? (
        <button onClick={() => setOpen(true)} className="px-3.5 py-2 text-xs flex items-center gap-2">
          <span>Search</span>
          <span className="font-mono text-[10px] px-1 rounded border">⌘K</span>
        </button>
      ) : (
        <div className="p-3 w-80 space-y-2">
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
    description: "Real-time activity notification banner with live progress track, transfer velocity, and collapsible task telemetry.",
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
    <motion.div layout className="rounded-2xl border bg-card p-3.5 max-w-md">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xs font-bold">Syncing to Edge CDN</h4>
          <p className="text-[11px] text-muted-foreground font-mono">18.4 MB / 28.6 MB (64%)</p>
        </div>
        <button onClick={() => setPaused(!paused)} className="px-2.5 py-1 text-xs rounded-lg border">
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
};

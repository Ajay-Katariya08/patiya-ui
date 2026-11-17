"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
} from "react";
import { cn } from "../../utils/cn";

export type OptimisticStatus = "idle" | "optimistic" | "committed" | "rolled-back";

export type UseOptimisticActionOptions<T> = {
  timeoutMs?: number;
  onSuccess?: (result: unknown) => void;
  onError?: (error: unknown, revertedState: T) => void;
  onUndo?: (revertedState: T) => void;
};

export type UseOptimisticActionReturn<T> = {
  state: T;
  status: OptimisticStatus;
  isPending: boolean;
  countdown: number;
  execute: (
    optimisticValue: T | ((prev: T) => T),
    action: () => Promise<unknown>
  ) => Promise<void>;
  undo: () => void;
  reset: () => void;
};

export function useOptimisticAction<T>(
  initialState: T,
  options: UseOptimisticActionOptions<T> = {}
): UseOptimisticActionReturn<T> {
  const { timeoutMs = 4000, onSuccess, onError, onUndo } = options;

  const [state, setState] = useState<T>(initialState);
  const [status, setStatus] = useState<OptimisticStatus>("idle");
  const [countdown, setCountdown] = useState<number>(0);

  const previousStateRef = useRef<T>(initialState);
  const actionPromiseRef = useRef<Promise<unknown> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timerRef.current = null;
    intervalRef.current = null;
    setCountdown(0);
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const undo = useCallback(() => {
    clearTimers();
    const reverted = previousStateRef.current;
    setState(reverted);
    setStatus("rolled-back");
    onUndo?.(reverted);
  }, [clearTimers, onUndo]);

  const reset = useCallback(() => {
    clearTimers();
    setStatus("idle");
  }, [clearTimers]);

  const execute = useCallback(
    async (
      optimisticValue: T | ((prev: T) => T),
      action: () => Promise<unknown>
    ) => {
      clearTimers();
      previousStateRef.current = state;

      const nextState =
        typeof optimisticValue === "function"
          ? (optimisticValue as (prev: T) => T)(state)
          : optimisticValue;

      setState(nextState);
      setStatus("optimistic");
      setCountdown(timeoutMs / 1000);

      const startTime = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, Math.ceil((timeoutMs - elapsed) / 1000));
        setCountdown(remaining);
      }, 100);

      try {
        const promise = action();
        actionPromiseRef.current = promise;

        timerRef.current = setTimeout(async () => {
          clearInterval(intervalRef.current!);
          try {
            const res = await promise;
            setStatus("committed");
            onSuccess?.(res);
          } catch (err) {
            const reverted = previousStateRef.current;
            setState(reverted);
            setStatus("rolled-back");
            onError?.(err, reverted);
          }
        }, timeoutMs);
      } catch (err) {
        clearTimers();
        const reverted = previousStateRef.current;
        setState(reverted);
        setStatus("rolled-back");
        onError?.(err, reverted);
      }
    },
    [state, timeoutMs, clearTimers, onSuccess, onError]
  );

  return {
    state,
    status,
    isPending: status === "optimistic",
    countdown,
    execute,
    undo,
    reset,
  };
}

export type OptimisticButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    onAction: () => Promise<unknown>;
    optimisticText?: string;
    undoTimeoutMs?: number;
    showUndo?: boolean;
    onUndo?: () => void;
    onSuccess?: (res: unknown) => void;
    onError?: (err: unknown) => void;
  };

export const OptimisticButton = forwardRef<
  HTMLButtonElement,
  OptimisticButtonProps
>(
  (
    {
      children,
      className,
      onAction,
      optimisticText = "Done",
      undoTimeoutMs = 4000,
      showUndo = true,
      onUndo,
      onSuccess,
      onError,
      disabled,
      ...props
    },
    ref
  ) => {
    const { status, countdown, execute, undo } = useOptimisticAction(false, {
      timeoutMs: undoTimeoutMs,
      onUndo,
      onSuccess,
      onError,
    });

    const isOptimistic = status === "optimistic";
    const isRolledBack = status === "rolled-back";

    return (
      <div className="relative inline-flex items-center gap-2">
        <button
          ref={ref}
          type="button"
          disabled={disabled || isOptimistic}
          onClick={() => execute(true, onAction)}
          className={cn(
            "relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer overflow-hidden",
            isOptimistic
              ? "bg-emerald-500 text-white border border-emerald-400/30"
              : isRolledBack
              ? "bg-red-500 text-white border border-red-400/30"
              : "bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] hover:opacity-90 active:scale-95",
            disabled && "opacity-50 cursor-not-allowed pointer-events-none",
            className
          )}
          {...props}
        >
          {isOptimistic ? (
            <span className="inline-flex items-center gap-1.5 animate-in fade-in duration-200">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {optimisticText}
            </span>
          ) : (
            children
          )}
        </button>

        {isOptimistic && showUndo && (
          <button
            type="button"
            onClick={undo}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-[var(--patiya-color-muted)] hover:bg-[var(--patiya-color-muted)]/80 text-[var(--patiya-color-foreground)] border border-[var(--patiya-color-border)] cursor-pointer transition-colors animate-in fade-in slide-in-from-left-2 duration-200"
          >
            <span>Undo</span>
            {countdown > 0 && (
              <span className="font-mono text-[10px] opacity-75">
                ({countdown}s)
              </span>
            )}
          </button>
        )}
      </div>
    );
  }
);
OptimisticButton.displayName = "OptimisticButton";

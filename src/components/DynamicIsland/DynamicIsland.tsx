"use client";

import React, {
  createContext,
  useContext,
  useState,
  forwardRef,
} from "react";
import { cn } from "../../utils/cn";

export type DynamicIslandMode = "minimal" | "compact" | "expanded" | "ultra";

export type DynamicIslandPosition = "top" | "bottom";

export type DynamicIslandContextType = {
  mode: DynamicIslandMode;
  setMode: (mode: DynamicIslandMode) => void;
  position: DynamicIslandPosition;
  isHovered: boolean;
};

const DynamicIslandContext = createContext<DynamicIslandContextType>({
  mode: "compact",
  setMode: () => {},
  position: "top",
  isHovered: false,
});

export const useDynamicIsland = () => useContext(DynamicIslandContext);

export type DynamicIslandProps = React.HTMLAttributes<HTMLDivElement> & {
  mode?: DynamicIslandMode;
  defaultMode?: DynamicIslandMode;
  onModeChange?: (mode: DynamicIslandMode) => void;
  position?: DynamicIslandPosition;
  glow?: boolean;
  interactive?: boolean;
};

export const DynamicIsland = forwardRef<HTMLDivElement, DynamicIslandProps>(
  (
    {
      className,
      children,
      mode: controlledMode,
      defaultMode = "compact",
      onModeChange,
      position = "top",
      glow = true,
      interactive = true,
      ...props
    },
    ref
  ) => {
    const [uncontrolledMode, setUncontrolledMode] =
      useState<DynamicIslandMode>(defaultMode);
    const [isHovered, setIsHovered] = useState(false);

    const mode = controlledMode ?? uncontrolledMode;

    const handleSetMode = (next: DynamicIslandMode) => {
      if (controlledMode === undefined) {
        setUncontrolledMode(next);
      }
      onModeChange?.(next);
    };

    const modeSizes: Record<DynamicIslandMode, string> = {
      minimal: "min-w-[56px] h-9 px-3 rounded-full",
      compact: "min-w-[210px] sm:min-w-[260px] h-10 px-4 rounded-full",
      expanded: "w-[92vw] sm:w-[380px] min-h-[140px] p-4 rounded-3xl",
      ultra: "w-[94vw] sm:w-[440px] min-h-[220px] p-5 rounded-[2rem]",
    };

    return (
      <DynamicIslandContext.Provider
        value={{
          mode,
          setMode: handleSetMode,
          position,
          isHovered,
        }}
      >
        <div
          ref={ref}
          onMouseEnter={() => {
            setIsHovered(true);
            if (interactive && mode === "compact") {
              handleSetMode("expanded");
            }
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            if (interactive && mode === "expanded") {
              handleSetMode("compact");
            }
          }}
          style={{
            transition:
              "width 0.45s cubic-bezier(0.16, 1, 0.3, 1), min-width 0.45s cubic-bezier(0.16, 1, 0.3, 1), height 0.45s cubic-bezier(0.16, 1, 0.3, 1), min-height 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className={cn(
            "relative flex items-center justify-between bg-black text-white select-none",
            "border border-white/20",
            "backdrop-blur-2xl transition-all duration-300",
            modeSizes[mode],
            glow &&
              "before:absolute before:-inset-0.5 before:rounded-[inherit] before:bg-gradient-to-r before:from-primary/30 before:via-cyan-500/20 before:to-primary/30 before:-z-10 before:blur-md before:opacity-75 before:transition-opacity",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </DynamicIslandContext.Provider>
    );
  }
);
DynamicIsland.displayName = "DynamicIsland";

export type DynamicIslandSlotProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export const DynamicIslandCompact = ({
  children,
  className,
  ...props
}: DynamicIslandSlotProps) => {
  const { mode } = useDynamicIsland();
  if (mode !== "compact") return null;
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full h-full gap-3 animate-in fade-in zoom-in-95 duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const DynamicIslandMinimal = ({
  children,
  className,
  ...props
}: DynamicIslandSlotProps) => {
  const { mode } = useDynamicIsland();
  if (mode !== "minimal") return null;
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-full animate-in fade-in zoom-in-90 duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const DynamicIslandExpanded = ({
  children,
  className,
  ...props
}: DynamicIslandSlotProps) => {
  const { mode } = useDynamicIsland();
  if (mode !== "expanded") return null;
  return (
    <div
      className={cn(
        "flex flex-col justify-between w-full h-full gap-3 animate-in fade-in slide-in-from-top-2 duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const DynamicIslandUltra = ({
  children,
  className,
  ...props
}: DynamicIslandSlotProps) => {
  const { mode } = useDynamicIsland();
  if (mode !== "ultra") return null;
  return (
    <div
      className={cn(
        "flex flex-col justify-between w-full h-full gap-4 animate-in fade-in slide-in-from-top-3 duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export type DynamicIslandLeadingProps = React.HTMLAttributes<HTMLDivElement> & {
  pulse?: boolean;
};

export const DynamicIslandLeading = forwardRef<
  HTMLDivElement,
  DynamicIslandLeadingProps
>(({ className, children, pulse, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-2 shrink-0 text-white font-medium text-xs",
      className
    )}
    {...props}
  >
    {pulse && (
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
    )}
    {children}
  </div>
));
DynamicIslandLeading.displayName = "DynamicIslandLeading";

export type DynamicIslandTrailingProps =
  React.HTMLAttributes<HTMLDivElement>;

export const DynamicIslandTrailing = forwardRef<
  HTMLDivElement,
  DynamicIslandTrailingProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-2 shrink-0 text-white/80 font-mono text-xs",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
DynamicIslandTrailing.displayName = "DynamicIslandTrailing";

export type DynamicIslandTitleProps =
  React.HTMLAttributes<HTMLHeadingElement>;

export const DynamicIslandTitle = forwardRef<
  HTMLHeadingElement,
  DynamicIslandTitleProps
>(({ className, children, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("text-sm font-semibold tracking-tight text-white", className)}
    {...props}
  >
    {children}
  </h4>
));
DynamicIslandTitle.displayName = "DynamicIslandTitle";

export type DynamicIslandDescriptionProps =
  React.HTMLAttributes<HTMLParagraphElement>;

export const DynamicIslandDescription = forwardRef<
  HTMLParagraphElement,
  DynamicIslandDescriptionProps
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-white/60 leading-relaxed", className)}
    {...props}
  >
    {children}
  </p>
));
DynamicIslandDescription.displayName = "DynamicIslandDescription";

export type DynamicIslandActionProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "solid" | "glass" | "ghost";
    size?: "sm" | "md";
  };

export const DynamicIslandAction = forwardRef<
  HTMLButtonElement,
  DynamicIslandActionProps
>(({ className, children, variant = "glass", size = "sm", ...props }, ref) => {
  const variantStyles = {
    solid: "bg-white text-black hover:bg-white/90 active:scale-95",
    glass:
      "bg-white/10 hover:bg-white/20 text-white border border-white/15 active:scale-95",
    ghost: "bg-transparent hover:bg-white/10 text-white active:scale-95",
  };
  const sizeStyles = {
    sm: "h-7 px-3 text-xs rounded-full",
    md: "h-8 px-4 text-xs font-semibold rounded-full",
  };

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
DynamicIslandAction.displayName = "DynamicIslandAction";

export type DynamicIslandProgressProps =
  React.HTMLAttributes<HTMLDivElement> & {
    value: number;
    max?: number;
    color?: string;
  };

export const DynamicIslandProgress = forwardRef<
  HTMLDivElement,
  DynamicIslandProgressProps
>(({ className, value, max = 100, color, ...props }, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      ref={ref}
      className={cn(
        "w-full h-1.5 bg-white/15 rounded-full overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full transition-all duration-300 rounded-full",
          color || "bg-gradient-to-r from-cyan-400 to-primary"
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
});
DynamicIslandProgress.displayName = "DynamicIslandProgress";

import React, { forwardRef, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export type PointerFollowerProps = React.HTMLAttributes<HTMLDivElement> & {
  name?: string;
  avatar?: string;
  badge?: string;
  color?: string;
  variant?: "badge" | "dot" | "pill";
  pillText?: string;
  disabled?: boolean;
};

export const PointerFollower = forwardRef<HTMLDivElement, PointerFollowerProps>(
  (
    {
      className,
      children,
      name = "Alex Rivera",
      avatar,
      badge = "Designing",
      color = "#6366f1",
      variant = "badge",
      pillText,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const lastPosRef = useRef({ x: 0, y: 0, time: Date.now() });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const now = Date.now();
      const dt = Math.max(1, now - lastPosRef.current.time);
      const dx = x - lastPosRef.current.x;
      const velocityX = dx / dt;

      const targetRotation = Math.max(-18, Math.min(18, velocityX * 14));
      setRotation(targetRotation);

      lastPosRef.current = { x, y, time: now };
      setPos({ x, y });
    };

    const handleMouseEnter = () => {
      if (!disabled) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setRotation(0);
    };

    return (
      <div
        ref={(el) => {
          containerRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as any).current = el;
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative overflow-hidden",
          !disabled && isHovered && "cursor-none",
          className,
        )}
        {...props}
      >
        {children}

        {!disabled && isHovered && (
          <div
            className="pointer-events-none absolute z-50 transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${rotation}deg)`,
              transformOrigin: "top left",
            }}
          >
            {variant === "dot" ? (
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <div
                  className="h-4 w-4 rounded-full shadow-lg"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 16px ${color}`,
                  }}
                />
                <div
                  className="absolute inset-0 h-4 w-4 animate-ping rounded-full opacity-60"
                  style={{ backgroundColor: color }}
                />
              </div>
            ) : variant === "pill" ? (
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <div
                  className="flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 8px 24px ${color}50`,
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  <span>{pillText || name}</span>
                </div>
              </div>
            ) : (
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="drop-shadow-md"
                >
                  <path
                    d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                    fill={color}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>

                <div
                  className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/20 bg-neutral-900/90 px-2.5 py-1 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-black/90"
                  style={{
                    boxShadow: `0 8px 24px ${color}35`,
                  }}
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={name}
                      className="h-4 w-4 rounded-full object-cover ring-1 ring-white/30"
                    />
                  ) : (
                    <div
                      className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
                      style={{ backgroundColor: color }}
                    >
                      {name.charAt(0)}
                    </div>
                  )}

                  <span className="text-[11px] font-semibold text-white whitespace-nowrap">
                    {name}
                  </span>

                  {badge && (
                    <span
                      className="rounded-full px-1.5 py-0.2 text-[9px] font-medium text-white/90"
                      style={{ backgroundColor: `${color}80` }}
                    >
                      {badge}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);
PointerFollower.displayName = "PointerFollower";

import { useRef, useState, useEffect } from "react";
import { cn } from "../../utils/cn";

export interface TextHoverEffectProps {
  text: string;
  className?: string;
  duration?: number;
}

export const TextHoverEffect = ({ text, className, duration = 0.5 }: TextHoverEffectProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 600 150"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none w-full h-full cursor-default", className)}
    >
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--patiya-color-primary, #3b82f6)" />
          <stop offset="25%" stopColor="var(--patiya-color-accent, #8b5cf6)" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="75%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>

        <radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="15%"
          cx={maskPosition.cx}
          cy={maskPosition.cy}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1.5"
        className={cn(
          "font-bold stroke-neutral-300 dark:stroke-neutral-800 fill-transparent text-6xl",
          `transition-opacity duration-[${duration}s]`
        )}
        style={{ opacity: hovered ? 0.3 : 1 }}
      >
        {text}
      </text>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="2"
        mask="url(#textMask)"
        className={cn(
          "font-bold fill-transparent text-6xl stroke-[url(#textGradient)]",
          `transition-opacity duration-[${duration}s]`
        )}
        style={{ opacity: hovered ? 1 : 0 }}
      >
        {text}
      </text>
    </svg>
  );
};

import { useState } from "react";
import { cn } from "../../utils/cn";

export interface TooltipItem {
  id: number | string;
  name: string;
  designation: string;
  image: string;
}

export interface AnimatedTooltipProps {
  items: TooltipItem[];
  className?: string;
}

export const AnimatedTooltip = ({ items, className }: AnimatedTooltipProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | string | null>(null);

  return (
    <div className={cn("flex flex-row items-center justify-center gap-2", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="relative group cursor-pointer"
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === item.id && (
            <div
              className="absolute -top-16 -left-1/2 translate-x-1/4 flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in-75 duration-300 slide-in-from-bottom-2"
              style={{
                transformOrigin: "bottom center",
              }}
            >
              <div className="bg-black/90 dark:bg-white/90 text-white dark:text-black text-xs font-semibold px-4 py-2 rounded-xl shadow-xl flex flex-col items-center whitespace-nowrap border border-white/10">
                <span className="text-sm font-bold">{item.name}</span>
                <span className="text-xs opacity-70 font-medium mt-0.5">{item.designation}</span>
              </div>
              <div className="w-3 h-3 bg-black/90 dark:bg-white/90 rotate-45 -mt-1.5 border-r border-b border-white/10"></div>
            </div>
          )}
          <img
            src={item.image}
            alt={item.name}
            className={cn(
              "w-12 h-12 object-cover rounded-full border-2 border-white dark:border-neutral-800 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:z-30 relative",
              hoveredIndex === item.id ? "z-30" : "z-10"
            )}
          />
        </div>
      ))}
    </div>
  );
};

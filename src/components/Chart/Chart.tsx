import React, { forwardRef } from 'react';
import { ResponsiveContainer } from 'recharts';
import { cn } from '../../utils/cn';

export const ChartContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { config?: Record<string, { label: string; color: string }> }>(
  ({ className, children, config = {}, ...props }, ref) => {
    // Generate CSS variables for the chart colors based on config
    const style = Object.entries(config).reduce((acc, [key, value]) => {
      acc[`--color-${key}`] = value.color;
      return acc;
    }, {} as Record<string, string>);

    return (
      <div ref={ref} className={cn("w-full h-full min-h-[300px]", className)} style={style as React.CSSProperties} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    );
  }
);
ChartContainer.displayName = "ChartContainer";

export const ChartTooltipContent = ({ active, payload, label, className }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={cn("rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] p-3 shadow-md", className)}>
        <p className="font-semibold text-sm mb-1">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm text-(--patiya-color-muted-foreground)">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color || entry.payload.fill }} />
              <span>{entry.name}:</span>
              <span className="font-medium text-[var(--patiya-color-foreground)]">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

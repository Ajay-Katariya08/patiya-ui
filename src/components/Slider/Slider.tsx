import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: number | number[];
  defaultValue?: number | number[];
  min?: number;
  max?: number;
  step?: number;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  onChange?: (value: number | number[]) => void;
  showTooltip?: boolean;
  marks?: { value: number; label?: string }[];
  trackColor?: string;
  thumbColor?: string;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      orientation = 'horizontal',
      disabled = false,
      onChange,
      showTooltip = false,
      marks,
      trackColor,
      thumbColor,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<number | number[]>(
      isControlled ? value : defaultValue
    );

    const currentValue = isControlled ? value : internalValue;
    const values = Array.isArray(currentValue) ? currentValue : [currentValue];

    const trackRef = useRef<HTMLDivElement>(null);
    const [activeThumb, setActiveThumb] = useState<number | null>(null);

    // Sync if controlled changes
    useEffect(() => {
      if (isControlled) {
        setInternalValue(value);
      }
    }, [isControlled, value]);

    const getPercentage = (val: number) => {
      return ((val - min) / (max - min)) * 100;
    };

    const getValueFromPointer = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
      if (!trackRef.current) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      let percentage;
      if (orientation === 'horizontal') {
        percentage = (clientX - rect.left) / rect.width;
      } else {
        percentage = (rect.bottom - clientY) / rect.height; // vertical goes bottom to top
      }

      percentage = Math.max(0, Math.min(1, percentage));
      let rawValue = percentage * (max - min) + min;
      
      if (step > 0) {
        rawValue = Math.round((rawValue - min) / step) * step + min;
      }
      return Math.max(min, Math.min(max, rawValue));
    };

    const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.preventDefault();
      const newValue = getValueFromPointer(e);

      let closestThumbIndex = 0;
      if (values.length > 1) {
        let minDiff = Infinity;
        values.forEach((v, idx) => {
          const diff = Math.abs(v - newValue);
          if (diff < minDiff) {
            minDiff = diff;
            closestThumbIndex = idx;
          }
        });
      }

      setActiveThumb(closestThumbIndex);
      updateValue(closestThumbIndex, newValue);
    };

    const updateValue = (index: number, newValue: number) => {
      let newValues = [...values];
      newValues[index] = newValue;
      
      if (values.length === 2) {
        if (index === 0 && newValues[0] > newValues[1]) {
           newValues[0] = newValues[1];
        } else if (index === 1 && newValues[1] < newValues[0]) {
           newValues[1] = newValues[0];
        }
      }

      const nextVal = newValues.length === 1 ? newValues[0] : newValues;
      if (!isControlled) {
        setInternalValue(nextVal);
      }
      if (onChange) {
        onChange(nextVal);
      }
    };

    useEffect(() => {
      if (activeThumb === null || disabled) return;

      const handlePointerMove = (e: MouseEvent | TouchEvent) => {
        const newValue = getValueFromPointer(e);
        updateValue(activeThumb, newValue);
      };

      const handlePointerUp = () => {
        setActiveThumb(null);
      };

      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('touchmove', handlePointerMove, { passive: false });
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchend', handlePointerUp);

      return () => {
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('touchmove', handlePointerMove);
        window.removeEventListener('mouseup', handlePointerUp);
        window.removeEventListener('touchend', handlePointerUp);
      };
    }, [activeThumb, disabled, values, min, max, step, orientation]);

    const isHorizontal = orientation === 'horizontal';

    const resolveColor = (color?: string) => {
      if (!color) return undefined;
      const themeColors = ['primary', 'secondary', 'light', 'accent', 'destructive', 'warning', 'info', 'dark', 'link'];
      if (themeColors.includes(color)) {
        return `var(--patiya-color-${color})`;
      }
      return color;
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex items-center justify-center touch-none select-none group',
          isHorizontal ? 'w-full h-4' : 'h-full w-4 flex-col',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        {...props}
      >
        <div
          ref={trackRef}
          className={cn(
            'relative bg-[var(--patiya-color-border)] rounded-full overflow-hidden transition-colors duration-200',
            isHorizontal ? 'w-full h-1.5' : 'h-full w-1.5'
          )}
        >
          <div
            className={cn(
              'absolute bg-[var(--patiya-color-primary)] rounded-full',
              !trackColor && 'group-hover:bg-[var(--patiya-color-primary)]/80'
            )}
            style={{
              [isHorizontal ? 'left' : 'bottom']: values.length > 1 ? `${getPercentage(values[0])}%` : '0%',
              [isHorizontal ? 'width' : 'height']: values.length > 1 ? `${getPercentage(values[1]) - getPercentage(values[0])}%` : `${getPercentage(values[0])}%`,
              [isHorizontal ? 'height' : 'width']: '100%',
              ...(trackColor && { backgroundColor: resolveColor(trackColor) })
            }}
          />
        </div>

        {marks && marks.map((mark, idx) => (
          <div
            key={idx}
            className="absolute flex flex-col items-center justify-center"
            style={{
              [isHorizontal ? 'left' : 'bottom']: `${getPercentage(mark.value)}%`,
              [isHorizontal ? 'transform' : 'transform']: isHorizontal ? 'translateX(-50%)' : 'translateY(50%)',
              ...(isHorizontal ? { top: '100%', marginTop: '6px' } : { left: '100%', marginLeft: '12px' })
            }}
          >
            <div className="w-1 h-1 bg-[var(--patiya-color-muted-foreground)] rounded-full" />
            {mark.label && (
              <span className="text-[10px] font-medium text-[var(--patiya-color-muted-foreground)] mt-1 whitespace-nowrap">
                {mark.label}
              </span>
            )}
          </div>
        ))}

        {values.map((val, index) => (
          <div
            key={index}
            className={cn(
              'absolute w-4 h-4 bg-[var(--patiya-color-background)] border-2 border-[var(--patiya-color-primary)] rounded-full shadow-sm hover:scale-125 hover:shadow-md cursor-grab active:cursor-grabbing focus:outline-none focus:ring-4 focus:ring-[var(--patiya-color-primary)]/20',
              activeThumb === index && 'scale-125 shadow-md ring-4 ring-[var(--patiya-color-primary)]/20 cursor-grabbing',
              thumbColor && `border-transparent`
            )}
            style={{
              [isHorizontal ? 'left' : 'bottom']: `calc(${getPercentage(val)}%)`,
              [isHorizontal ? 'transform' : 'transform']: isHorizontal ? 'translateX(-50%)' : 'translateY(50%)',
              ...(thumbColor && { borderColor: resolveColor(thumbColor), backgroundColor: resolveColor(thumbColor) })
            }}
          >
            {showTooltip && (activeThumb === index) && (
              <div
                className={cn(
                  'absolute bg-[var(--patiya-color-foreground)] text-[var(--patiya-color-background)] text-xs font-semibold px-2 py-1 rounded shadow-xl whitespace-nowrap pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95',
                  isHorizontal ? 'bottom-full left-1/2 -translate-x-1/2 mb-3' : 'right-full top-1/2 -translate-y-1/2 mr-3'
                )}
              >
                {val}
                <div className={cn(
                  'absolute w-2 h-2 bg-[var(--patiya-color-foreground)] rotate-45',
                  isHorizontal ? 'bottom-[-4px] left-1/2 -translate-x-1/2' : 'right-[-4px] top-1/2 -translate-y-1/2'
                )} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
);
Slider.displayName = 'Slider';

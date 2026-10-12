import React, { useRef, useState, useEffect, useCallback } from 'react';
import { cn } from '../../utils/cn';

export interface ScratchToRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
  minScratchPercentage?: number;
  onComplete?: () => void;
  coverImage?: string;
  coverColor?: string;
  brushSize?: number;
}

export const ScratchToReveal = React.forwardRef<HTMLDivElement, ScratchToRevealProps>(
  (
    {
      className,
      children,
      width,
      height,
      minScratchPercentage = 50,
      onComplete,
      coverImage,
      coverColor = '#cbd5e1', // slate-300
      brushSize = 40,
      style,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScratching, setIsScratching] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const renderCover = () => {
        if (coverImage) {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
          };
          img.src = coverImage;
        } else {
          ctx.fillStyle = coverColor;
          ctx.fillRect(0, 0, width, height);
        }
      };

      renderCover();
    }, [width, height, coverImage, coverColor]);

    const getMousePos = (canvas: HTMLCanvasElement, evt: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      let clientX, clientY;

      if ('touches' in evt) {
        clientX = evt.touches[0].clientX;
        clientY = evt.touches[0].clientY;
      } else {
        clientX = (evt as MouseEvent).clientX;
        clientY = (evt as MouseEvent).clientY;
      }

      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const scratch = useCallback((e: MouseEvent | TouchEvent) => {
      if (!isScratching || isComplete) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { x, y } = getMousePos(canvas, e);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();

      // Check percentage scratched
      checkScratchPercentage(ctx, canvas);
    }, [isScratching, isComplete, brushSize]);

    const checkScratchPercentage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) {
          transparentPixels++;
        }
      }

      const totalPixels = pixels.length / 4;
      const percentage = (transparentPixels / totalPixels) * 100;

      if (percentage >= minScratchPercentage) {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    };

    const handleScratchStart = (e: React.MouseEvent | React.TouchEvent) => {
      if (isComplete) return;
      setIsScratching(true);
      scratch(e.nativeEvent as MouseEvent | TouchEvent);
    };

    const handleScratchEnd = () => {
      setIsScratching(false);
    };

    const handleScratchMove = (e: React.MouseEvent | React.TouchEvent) => {
      scratch(e.nativeEvent as MouseEvent | TouchEvent);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden select-none",
          className
        )}
        style={{
          width,
          height,
          ...style
        }}
        {...props}
      >
        <div className="absolute inset-0 z-0">
          {children}
        </div>
        
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={handleScratchStart}
          onMouseUp={handleScratchEnd}
          onMouseLeave={handleScratchEnd}
          onMouseMove={handleScratchMove}
          onTouchStart={handleScratchStart}
          onTouchEnd={handleScratchEnd}
          onTouchMove={handleScratchMove}
          className={cn(
            "absolute inset-0 z-10 touch-none transition-opacity duration-1000 ease-in-out cursor-pointer",
            isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        />
      </div>
    );
  }
);

ScratchToReveal.displayName = 'ScratchToReveal';

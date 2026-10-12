import { forwardRef, useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Button, ButtonProps } from '../Button/Button';

export interface CopyButtonProps extends Omit<ButtonProps, 'onClick' | 'onCopy'> {
  value: string;
  timeout?: number;
  onCopy?: (value: string) => void;
}

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ value, timeout = 2000, onCopy, className, size = 'sm', variant = 'ghost', children, ...props }, ref) => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
      let timeoutId: ReturnType<typeof setTimeout>;
      if (isCopied) {
        timeoutId = setTimeout(() => {
          setIsCopied(false);
        }, timeout);
      }
      return () => clearTimeout(timeoutId);
    }, [isCopied, timeout]);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setIsCopied(true);
        onCopy?.(value);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    };

    const CopyIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
      </svg>
    );

    const CheckIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--patiya-color-success)]">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
    );

    return (
      <Button
        ref={ref}
        size={size}
        variant={variant}
        className={cn(className)}
        onClick={handleCopy}
        leftIcon={!children ? (isCopied ? <CheckIcon /> : <CopyIcon />) : undefined}
        {...props}
      >
        {children || (isCopied ? 'Copied!' : 'Copy')}
      </Button>
    );
  }
);

CopyButton.displayName = 'CopyButton';

import React, { forwardRef, useState, useRef } from 'react';
import { Box } from '../Layout/Box';
import { cn } from '../../utils/cn';
import { Button } from '../Button/Button';

export type PromptInputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  onValueSubmit?: (val: string) => void;
  actions?: React.ReactNode;
  attachments?: React.ReactNode;
  maxRows?: number;
};

export const PromptInput = forwardRef<HTMLTextAreaElement, PromptInputProps>(
  ({ className, onValueSubmit, actions, attachments, maxRows = 6, value, onChange, placeholder = 'Type a message...', ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textAreaRef = (ref as React.MutableRefObject<HTMLTextAreaElement>) || internalRef;
    const [internalVal, setInternalVal] = useState('');

    const isControlled = value !== undefined;
    const val = isControlled ? value : internalVal;

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInternalVal(e.target.value);
      onChange?.(e);
      const target = e.target;
      target.style.height = 'auto';
      target.style.height = `${Math.min(target.scrollHeight, maxRows * 24 + 16)}px`;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const v = val as string;
        if (v.trim() && onValueSubmit) {
          onValueSubmit(v);
          if (!isControlled) setInternalVal('');
          if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
          }
        }
      }
    };

    return (
      <Box className={cn("relative flex flex-col w-full border border-[var(--patiya-color-border)] rounded-2xl bg-[var(--patiya-color-background)] focus-within:ring-2 focus-within:ring-[var(--patiya-color-primary)]/20 focus-within:border-[var(--patiya-color-primary)] transition-all overflow-hidden shadow-sm", className)}>
        {attachments && (
          <Box className="flex flex-wrap gap-2 p-3 pb-0">
            {attachments}
          </Box>
        )}
        <textarea
          ref={textAreaRef}
          value={val}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full min-h-[56px] max-h-[200px] resize-none bg-transparent px-4 py-4 outline-none text-sm placeholder:text-[var(--patiya-color-muted-foreground)] custom-scrollbar"
          rows={1}
          {...props}
        />
        <Box className="flex items-center justify-between px-3 pb-3 pt-1">
          <Box className="flex items-center gap-2">
            {actions}
          </Box>
          <Button 
            size="sm" 
            color="primary" 
            className="rounded-xl px-3 h-8 shrink-0" 
            aria-label="Send message"
            disabled={!val || !(val as string).trim()}
            onClick={() => {
              if (onValueSubmit && val) {
                onValueSubmit(val as string);
                if (!isControlled) setInternalVal('');
                if (textAreaRef.current) textAreaRef.current.style.height = 'auto';
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </Button>
        </Box>
      </Box>
    );
  }
);
PromptInput.displayName = 'PromptInput';

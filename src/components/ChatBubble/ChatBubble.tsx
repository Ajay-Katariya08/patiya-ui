import React, { forwardRef } from 'react';
import { Box } from '../Layout/Box';
import { cn } from '../../utils/cn';

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'user' | 'assistant';
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
  time?: string;
  error?: boolean;
}

export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant = 'assistant', avatar, actions, time, error, children, ...props }, ref) => {
    const isUser = variant === 'user';
    return (
      <Box
        ref={ref}
        className={cn(
          "flex w-full gap-4 p-4 rounded-xl transition-colors",
          isUser ? "flex-row-reverse" : "flex-row",
          isUser ? "bg-transparent" : "bg-[var(--patiya-color-muted)]/10 hover:bg-[var(--patiya-color-muted)]/20",
          error && "bg-[var(--patiya-color-destructive)]/5 border border-[var(--patiya-color-destructive)]/20",
          className
        )}
        {...props}
      >
        {avatar && (
          <Box className={cn("shrink-0", isUser ? "ml-2" : "mr-2")}>
            {avatar}
          </Box>
        )}
        <Box className={cn("flex flex-col gap-2 max-w-[80%]", isUser ? "items-end" : "items-start")}>
          <Box
            className={cn(
              "px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
              isUser
                ? "bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] rounded-tr-sm"
                : "bg-[var(--patiya-color-background)] border border-[var(--patiya-color-border)] text-[var(--patiya-color-foreground)] rounded-tl-sm",
              error && !isUser && "border-[var(--patiya-color-destructive)] text-[var(--patiya-color-destructive)]"
            )}
          >
            {children}
          </Box>
          {(actions || time) && (
            <Box className={cn("flex items-center gap-2 mt-1", isUser ? "flex-row-reverse" : "flex-row")}>
              {time && <span className="text-xs text-[var(--patiya-color-muted-foreground)] px-1">{time}</span>}
              {actions && <Box className="flex items-center gap-1">{actions}</Box>}
            </Box>
          )}
        </Box>
      </Box>
    );
  }
);
ChatBubble.displayName = 'ChatBubble';

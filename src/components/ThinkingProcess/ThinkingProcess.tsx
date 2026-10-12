import React, { forwardRef, useState } from 'react';
import { Box } from '../Layout/Box';
import { cn } from '../../utils/cn';
import { Collapse } from '../Collapse/Collapse';

export interface ThinkingProcessProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  isThinking?: boolean;
  time?: string;
  defaultExpanded?: boolean;
}

export const ThinkingProcess = forwardRef<HTMLDivElement, ThinkingProcessProps>(
  ({ className, title = 'Thinking process', isThinking = false, time, defaultExpanded = false, children, ...props }, ref) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
      <Box ref={ref} className={cn("flex flex-col w-full max-w-2xl my-2", className)} {...props}>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors w-fit rounded-lg hover:bg-[var(--patiya-color-muted)]/30"
        >
          {isThinking ? (
            <svg className="animate-spin h-4 w-4 text-[var(--patiya-color-primary)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-transform duration-200 text-[var(--patiya-color-muted-foreground)]", expanded ? "rotate-90" : "rotate-0")}><path d="m9 18 6-6-6-6"/></svg>
          )}
          <span className="font-medium font-sans">{title}</span>
          {time && !isThinking && <span className="text-xs opacity-70">({time})</span>}
        </button>
        <Collapse isOpen={expanded}>
          <Box className="mt-2 pl-4 ml-[22px] border-l-2 border-[var(--patiya-color-border)] py-1">
            <Box className="text-sm text-[var(--patiya-color-muted-foreground)] space-y-2">
              {children}
            </Box>
          </Box>
        </Collapse>
      </Box>
    );
  }
);
ThinkingProcess.displayName = 'ThinkingProcess';

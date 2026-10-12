import { Box } from 'patiya';

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="10" fill="currentColor" />
      {/* P shape */}
      <path 
        d="M11 9H17.5C20.5376 9 23 11.4624 23 14.5C23 17.5376 20.5376 20 17.5 20H11V9Z" 
        fill="var(--patiya-color-background, white)" 
      />
      <rect x="11" y="19" width="4" height="6" fill="var(--patiya-color-background, white)" />
      <circle cx="16.5" cy="14.5" r="2.5" fill="currentColor" />
    </svg>
  );
}

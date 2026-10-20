export type PatiyaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type PatiyaVariant = 'solid' | 'outline' | 'ghost' | 'soft' | 'link';
export type PatiyaColor = 'primary' | 'secondary' | 'accent' | 'destructive' | 'success' | 'warning' | 'info' | 'muted';
export type PatiyaRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export type PatiyaTheme = 'light' | 'dark' | 'system';
export type PatiyaResolvedTheme = 'light' | 'dark';

export type PatiyaThemeContextType = {
  theme: PatiyaTheme;
  resolvedTheme: PatiyaResolvedTheme;
  setTheme: (theme: PatiyaTheme) => void;
};

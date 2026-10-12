export type PatiyaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type PatiyaVariant = 'solid' | 'outline' | 'ghost' | 'soft' | 'link';
export type PatiyaColor = 'primary' | 'secondary' | 'accent' | 'destructive' | 'success' | 'warning' | 'info' | 'muted';
export type PatiyaRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface PatiyaThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

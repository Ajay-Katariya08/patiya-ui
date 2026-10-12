import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Slider',
  description: 'Documentation and interactive examples for the Slider component in Patiya UI. Free, accessible, and customizable React component built with Tailwind CSS.',
  alternates: {
    canonical: '/docs/components/slider',
  }
};

export default function SliderLayout({ children }: { children: React.ReactNode }) {
  return children;
}

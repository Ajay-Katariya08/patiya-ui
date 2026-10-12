import type { Metadata } from 'next';

function formatTitle(slug: string) {
  const words = slug.replace(/([A-Z])/g, ' $1').replace(/-/g, ' ').trim().split(' ');
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = formatTitle(slug);
  
  return {
    title,
    description: `Documentation and interactive examples for the ${title} component in Patiya UI. Free, accessible, and customizable React component built with Tailwind CSS.`,
    alternates: {
      canonical: `/docs/components/${slug}`,
    }
  };
}

export default function ComponentLayout({ children }: { children: React.ReactNode }) {
  return children;
}

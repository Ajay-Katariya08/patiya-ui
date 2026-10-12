"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Box } from 'patiya';

export const docsNav = [
  {
    title: 'Getting Started',
    items: [{ title: 'Installation', href: '/docs' }]
  },
  {
    title: 'Elements',
    items: [
      { title: 'Button', href: '/docs/components/button' },
      { title: 'Badge', href: '/docs/components/badge' },
      { title: 'Spinner', href: '/docs/components/spinner' },
    ]
  },
  {
    title: 'Forms',
    items: [
      { title: 'Input', href: '/docs/components/input' },
      { title: 'Textarea', href: '/docs/components/textarea' },
      { title: 'Switch', href: '/docs/components/switch' },
      { title: 'Checkbox', href: '/docs/components/checkbox' },
      { title: 'Radio', href: '/docs/components/radio' },
      { title: 'Select', href: '/docs/components/select' },
      { title: 'Slider', href: '/docs/components/slider' },
    ]
  },
  {
    title: 'Feedback',
    items: [
      { title: 'Alert', href: '/docs/components/alert' },
      { title: 'Progress', href: '/docs/components/progress' },
      { title: 'Skeleton', href: '/docs/components/skeleton' },
    ]
  },
  {
    title: 'Overlays',
    items: [
      { title: 'Modal', href: '/docs/components/modal' },
      { title: 'Drawer', href: '/docs/components/drawer' },
      { title: 'Tooltip', href: '/docs/components/tooltip' },
      { title: 'Popover', href: '/docs/components/popover' },
      { title: 'Dropdown Menu', href: '/docs/components/dropdown-menu' },
      { title: 'Toast', href: '/docs/components/toast' },
      { title: 'Spotlight Card', href: '/docs/components/spotlightCard' },
      { title: 'Tilt Card', href: '/docs/components/tiltCard' },
    ]
  },
  {
    title: 'Data Display',
    items: [
      { title: 'Card', href: '/docs/components/card' },
      { title: 'Avatar', href: '/docs/components/avatar' },
      { title: 'Chip', href: '/docs/components/chip' },
      { title: 'Table', href: '/docs/components/table' },
      { title: 'Timeline', href: '/docs/components/timeline' },
      { title: 'Stepper', href: '/docs/components/stepper' },
    ]
  },
  {
    title: 'Interactive',
    items: [
      { title: 'Scratch To Reveal', href: '/docs/components/scratchToReveal' },
      { title: 'Magnetic', href: '/docs/components/magnetic' },
      { title: 'Dock', href: '/docs/components/dock' },
      { title: 'Flip Card', href: '/docs/components/flipCard' },
      { title: 'Direction Aware Hover', href: '/docs/components/directionAwareHover' },
      { title: 'Shimmer Button', href: '/docs/components/shimmerButton' },
    ]
  },
  {
    title: 'Media',
    items: [
      { title: 'Compare Slider', href: '/docs/components/compareSlider' },
      { title: 'Carousel', href: '/docs/components/carousel' },
      { title: 'Video Modal', href: '/docs/components/videoModal' },
      { title: 'Image Zoom', href: '/docs/components/imageZoom' },
    ]
  },
  {
    title: 'Text Effects',
    items: [
      { title: 'Gradient Text', href: '/docs/components/gradientText' },
      { title: 'Typing Text', href: '/docs/components/typingText' },
      { title: 'Flip Text', href: '/docs/components/flipText' },
      { title: 'Blur Text', href: '/docs/components/blurText' },
    ]
  },
  {
    title: 'Backgrounds & Effects',
    items: [
      { title: 'Meteor Shower', href: '/docs/components/meteorShower' },
      { title: 'Aurora Background', href: '/docs/components/auroraBackground' },
      { title: 'Border Beam', href: '/docs/components/borderBeam' },
      { title: 'Spotlight', href: '/docs/components/spotlight' },
      { title: 'Sparkles', href: '/docs/components/sparkles' },
    ]
  },
  {
    title: 'AI Interfaces',
    items: [
      { title: 'Chat Bubble', href: '/docs/components/chatBubble' },
      { title: 'Prompt Input', href: '/docs/components/promptInput' },
      { title: 'Typing Indicator', href: '/docs/components/typingIndicator' },
      { title: 'Thinking Process', href: '/docs/components/thinkingProcess' },
      { title: 'Typewriter Text', href: '/docs/components/typewriterText' },
      { title: 'Prompt Suggestion', href: '/docs/components/promptSuggestion' },
    ]
  },
  {
    title: 'Auth & Security',
    items: [
      { title: 'OTP Input', href: '/docs/components/otpInput' },
      { title: 'Password Strength', href: '/docs/components/passwordStrength' },
      { title: 'Social Login Button', href: '/docs/components/socialLoginButton' },
      { title: 'User Button', href: '/docs/components/userButton' },
      { title: 'Security Badge', href: '/docs/components/securityBadge' },
    ]
  },
  {
    title: 'Navigation',
    items: [
      { title: 'Tabs', href: '/docs/components/tabs' },
      { title: 'Accordion', href: '/docs/components/accordion' },
      { title: 'Collapse', href: '/docs/components/collapse' },
      { title: 'Breadcrumb', href: '/docs/components/breadcrumb' },
      { title: 'Pagination', href: '/docs/components/pagination' },
      { title: 'Navbar', href: '/docs/components/navbar' },
      { title: 'Command', href: '/docs/components/command' },
    ]
  },
  {
    title: 'Utilities',
    items: [
      { title: 'Kbd', href: '/docs/components/kbd' },
      { title: 'Divider', href: '/docs/components/divider' },
      { title: 'Rating', href: '/docs/components/rating' },
      { title: 'Status Dot', href: '/docs/components/status-dot' },
      { title: 'Copy Button', href: '/docs/components/copy-button' },
    ]
  },
  {
    title: 'Advanced',
    items: [
      { title: 'Chart', href: '/docs/components/chart' },
      { title: 'Rich Text Editor', href: '/docs/components/rich-text-editor' },
    ]
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, []);

  return (
    <Box className="w-[240px] shrink-0 border-r border-[var(--patiya-color-border)] hidden md:block bg-[var(--patiya-color-background)]">
      <Box className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 pl-4 md:pl-6 pr-4 custom-scrollbar">
        <Box className="space-y-6">
          {docsNav.map((section) => (
            <Box key={section.title} className="space-y-2">
              <h4 className="font-bold text-sm  text-[var(--patiya-color-foreground)] opacity-80 px-3">
                {section.title}
              </h4>
              <Box className="flex flex-col space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      ref={isActive ? activeRef : null}
                      className={`relative flex items-center justify-between px-3 py-1.5 text-sm rounded-lg transition-all duration-200 group overflow-hidden ${
                        isActive 
                          ? 'bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] font-medium' 
                          : 'text-[var(--patiya-color-muted-foreground)] hover:bg-[var(--patiya-color-muted)] hover:text-[var(--patiya-color-foreground)]'
                      }`}
                    >
                      <span className={`relative z-10 transition-transform duration-200 ${!isActive ? 'group-hover:translate-x-1' : ''}`}>
                        {item.title}
                      </span>
                      {isActive && (
                        <span className="absolute left-0 w-1 h-4 bg-[var(--patiya-color-primary)] rounded-r-full top-1/2 -translate-y-1/2" />
                      )}
                    </Link>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

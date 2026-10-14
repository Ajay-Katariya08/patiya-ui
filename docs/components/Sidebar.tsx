"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useMemo } from "react";
import { Box } from "patiya";

export type NavItem = {
  title: string;
  href: string;
  badge?: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const docsNav: NavSection[] = [
  {
    title: "Getting Started",
    items: [{ title: "Installation", href: "/docs" }],
  },
  {
    title: "Elements",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Spinner", href: "/docs/components/spinner" },
    ],
  },
  {
    title: "Forms",
    items: [
      { title: "Input", href: "/docs/components/input" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Radio", href: "/docs/components/radio" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Slider", href: "/docs/components/slider" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { title: "Modal", href: "/docs/components/modal" },
      { title: "Drawer", href: "/docs/components/drawer" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Spotlight Card", href: "/docs/components/spotlightCard" },
      { title: "Tilt Card", href: "/docs/components/tiltCard" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { title: "Card", href: "/docs/components/card" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Chip", href: "/docs/components/chip" },
      { title: "Table", href: "/docs/components/table" },
      { title: "Timeline", href: "/docs/components/timeline" },
      { title: "Stepper", href: "/docs/components/stepper" },
      { title: "Stat", href: "/docs/components/stat", badge: "New" },
      { title: "Data List", href: "/docs/components/data-list", badge: "New" },
      { title: "Tree View", href: "/docs/components/tree-view", badge: "New" },
    ],
  },
  {
    title: "Interactive",
    items: [
      { title: "Scratch To Reveal", href: "/docs/components/scratchToReveal" },
      { title: "Magnetic", href: "/docs/components/magnetic" },
      { title: "Dock", href: "/docs/components/dock" },
      { title: "Flip Card", href: "/docs/components/flipCard" },
      {
        title: "Direction Aware Hover",
        href: "/docs/components/directionAwareHover",
      },
      { title: "Shimmer Button", href: "/docs/components/shimmerButton" },
      { title: "Confetti", href: "/docs/components/confetti", badge: "New" },
      {
        title: "Pointer Follower",
        href: "/docs/components/pointerFollower",
        badge: "New",
      },
    ],
  },
  {
    title: "Media",
    items: [
      { title: "Compare Slider", href: "/docs/components/compareSlider" },
      { title: "Carousel", href: "/docs/components/carousel" },
      { title: "Video Modal", href: "/docs/components/videoModal" },
      { title: "Image Zoom", href: "/docs/components/imageZoom" },
    ],
  },
  {
    title: "Text Effects",
    items: [
      { title: "Gradient Text", href: "/docs/components/gradientText" },
      { title: "Typing Text", href: "/docs/components/typingText" },
      { title: "Flip Text", href: "/docs/components/flipText" },
      { title: "Blur Text", href: "/docs/components/blurText" },
    ],
  },
  {
    title: "Backgrounds",
    items: [
      { title: "Meteor Shower", href: "/docs/components/meteorShower" },
      { title: "Aurora Background", href: "/docs/components/auroraBackground" },
      { title: "Border Beam", href: "/docs/components/borderBeam" },
      { title: "Spotlight", href: "/docs/components/spotlight" },
      { title: "Sparkles", href: "/docs/components/sparkles" },
    ],
  },
  {
    title: "AI Interfaces",
    items: [
      { title: "Chat Bubble", href: "/docs/components/chatBubble" },
      { title: "Prompt Input", href: "/docs/components/promptInput" },
      { title: "Typing Indicator", href: "/docs/components/typingIndicator" },
      { title: "Thinking Process", href: "/docs/components/thinkingProcess" },
      { title: "Typewriter Text", href: "/docs/components/typewriterText" },
      { title: "Prompt Suggestion", href: "/docs/components/promptSuggestion" },
      {
        title: "Source Citation",
        href: "/docs/components/sourceCitation",
        badge: "New",
      },
      {
        title: "Model Selector",
        href: "/docs/components/modelSelector",
        badge: "New",
      },
    ],
  },
  {
    title: "Auth & Security",
    items: [
      { title: "OTP Input", href: "/docs/components/otpInput" },
      { title: "Password Strength", href: "/docs/components/passwordStrength" },
      {
        title: "Social Login Button",
        href: "/docs/components/socialLoginButton",
      },
      { title: "User Button", href: "/docs/components/userButton" },
      {
        title: "Security Badge",
        href: "/docs/components/securityBadge",
        badge: "New",
      },
      {
        title: "Passkey Auth",
        href: "/docs/components/passkeyAuth",
        badge: "New",
      },
      {
        title: "Active Sessions",
        href: "/docs/components/activeSessions",
        badge: "New",
      },
    ],
  },
  {
    title: "Navigation",
    items: [
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Collapse", href: "/docs/components/collapse" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Navbar", href: "/docs/components/navbar" },
      { title: "Command", href: "/docs/components/command" },
    ],
  },
  {
    title: "Utilities",
    items: [
      { title: "Kbd", href: "/docs/components/kbd" },
      { title: "Divider", href: "/docs/components/divider" },
      { title: "Rating", href: "/docs/components/rating" },
      { title: "Status Dot", href: "/docs/components/status-dot" },
      { title: "Copy Button", href: "/docs/components/copy-button" },
      {
        title: "Scroll Progress",
        href: "/docs/components/scroll-progress",
        badge: "New",
      },
      {
        title: "Browser Mockup",
        href: "/docs/components/browser-mockup",
        badge: "New",
      },
    ],
  },
  {
    title: "Advanced",
    items: [
      { title: "Chart", href: "/docs/components/chart" },
      { title: "Rich Text Editor", href: "/docs/components/rich-text-editor" },
    ],
  },
];

export const renderSectionIcon = (title: string) => {
  switch (title) {
    case "Getting Started":
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "Elements":
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "Forms":
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case "Feedback":
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case "Overlays":
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case "Data Display":
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "Interactive":
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        </svg>
      );
    case "Media":
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="15" x="2" y="4.5" rx="2" />
          <polygon points="10 9 15 12 10 15 10 9" />
        </svg>
      );
    case "Text Effects":
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 7 4 4 20 4 20 7" />
          <line x1="9" y1="20" x2="15" y2="20" />
          <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
      );
    case "Backgrounds & Effects":
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
        </svg>
      );
    case "AI Interfaces":
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a4 4 0 0 0-4 4v1H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
          <circle cx="9" cy="13" r="1" />
          <circle cx="15" cy="13" r="1" />
        </svg>
      );
    case "Auth & Security":
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case "Navigation":
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
      );
    case "Utilities":
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    default:
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
  }
};

export function Sidebar() {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const scrollToActive = () => {
      const container = scrollContainerRef.current;
      const activeEl = activeRef.current;
      if (!container || !activeEl) return;

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      const offset =
        activeRect.top -
        containerRect.top +
        container.scrollTop -
        container.clientHeight / 2 +
        activeRect.height / 2;

      container.scrollTo({
        top: Math.max(0, offset),
        behavior: "smooth",
      });
    };

    const t1 = setTimeout(scrollToActive, 80);
    const t2 = setTimeout(scrollToActive, 280);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  const toggleSection = (title: string) => {
    setCollapsed((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const filteredNav = useMemo(() => {
    if (!filter.trim()) return docsNav;
    const query = filter.toLowerCase().trim();
    return docsNav
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.title.toLowerCase().includes(query),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [filter]);

  return (
    <Box className="w-[260px] shrink-0 border-r border-[var(--patiya-color-border)]/70 hidden md:block bg-[var(--patiya-color-background)]/70 backdrop-blur-xl select-none">
      <div
        ref={scrollContainerRef}
        className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-4 py-5 custom-scrollbar"
      >
        <Box className="sticky top-0 z-20 pb-3 bg-[var(--patiya-color-background)]/90 backdrop-blur-md">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--patiya-color-muted-foreground)] pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
            </svg>
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Quick search..."
              className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/80 text-[var(--patiya-color-foreground)] placeholder:text-[var(--patiya-color-muted-foreground)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--patiya-color-primary)]/20 focus:border-[var(--patiya-color-primary)] transition-all shadow-xs"
            />
            {filter && (
              <button
                onClick={() => setFilter("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] p-1 transition-colors"
                aria-label="Clear filter"
              >
                ✕
              </button>
            )}
          </div>
        </Box>

        <Box className="space-y-4 pt-1">
          {filteredNav.map((section) => {
            const hasActiveItem = section.items.some(
              (item) => pathname === item.href,
            );
            const isClosed = !filter && !!collapsed[section.title];

            return (
              <Box key={section.title} className="group/section">
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer ${
                    hasActiveItem
                      ? "bg-[var(--patiya-color-primary)]/8 text-[var(--patiya-color-primary)]"
                      : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`transition-colors duration-200 ${
                        hasActiveItem
                          ? "text-[var(--patiya-color-primary)]"
                          : "text-[var(--patiya-color-muted-foreground)]"
                      }`}
                    >
                      {renderSectionIcon(section.title)}
                    </span>
                    <span className="truncate">{section.title}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-normal px-1.5 py-0.2 rounded-md transition-colors ${
                        hasActiveItem
                          ? "bg-[var(--patiya-color-primary)]/20 text-[var(--patiya-color-primary)] font-medium"
                          : "bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]"
                      }`}
                    >
                      {section.items.length}
                    </span>
                    <svg
                      className={`w-3 h-3 transition-transform duration-250 ease-out ${
                        isClosed ? "-rotate-90 opacity-60" : "rotate-0"
                      } ${
                        hasActiveItem
                          ? "text-[var(--patiya-color-primary)]"
                          : "text-[var(--patiya-color-muted-foreground)]"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <polyline
                        points="6 9 12 15 18 9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
                    isClosed
                      ? "grid-rows-[0fr] opacity-0 pointer-events-none"
                      : "grid-rows-[1fr] opacity-100"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="relative ml-4 pl-3.5 border-l border-[var(--patiya-color-border)]/60 my-1 flex flex-col space-y-0.5">
                      {section.items.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            ref={isActive ? activeRef : null}
                            className={`group relative flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg font-medium transition-all duration-150 select-none ${
                              isActive
                                ? "bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] font-semibold border border-[var(--patiya-color-primary)]/20"
                                : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60"
                            }`}
                          >
                            {isActive && (
                              <span
                                aria-hidden="true"
                                className="absolute -left-[15px] top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--patiya-color-primary)] ring-[2.5px] ring-[var(--patiya-color-background)] shadow-[0_0_8px_var(--patiya-color-primary)] z-10"
                              />
                            )}
                            <span className="truncate">{item.title}</span>
                            {item.badge && (
                              <span className="shrink-0 text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)] border border-[var(--patiya-color-primary)]/20 shadow-xs">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Box>
            );
          })}

          {filteredNav.length === 0 && (
            <Box className="py-8 text-center text-xs text-[var(--patiya-color-muted-foreground)] space-y-1">
              <p>No components found.</p>
              <button
                onClick={() => setFilter("")}
                className="text-[var(--patiya-color-primary)] hover:underline font-medium cursor-pointer"
              >
                Clear filter
              </button>
            </Box>
          )}
        </Box>
      </div>
    </Box>
  );
}

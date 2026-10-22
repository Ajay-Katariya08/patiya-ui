"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  Switch,
  Badge,
  Checkbox,
  Radio,
  Select,
  Alert,
  Progress,
  Skeleton,
  Spinner,
  Tooltip,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  useToast,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
  Stepper,
  Step,
  StepIndicator,
  StepTitle,
  StepSeparator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Collapse,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  Navbar,
  NavbarContainer,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarActions,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  ChartContainer,
  ChartTooltipContent,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  RechartsTooltip,
  RichTextEditor,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  SpotlightCard,
  TiltCard,
  CompareSlider,
  ScratchToReveal,
  Magnetic,
  Dock,
  DockItem,
  FlipCard,
  DirectionAwareHover,
  ShimmerButton,
  Confetti,
  ConfettiButton,
  PointerFollower,
  Carousel,
  VideoModal,
  ImageZoom,
  GradientText,
  TypingText,
  FlipText,
  BlurText,
  MeteorShower,
  AuroraBackground,
  BorderBeam,
  Spotlight,
  Sparkles,
  Kbd,
  Divider,
  Rating,
  StatusDot,
  CopyButton,
  ChatBubble,
  PromptInput,
  TypingIndicator,
  ThinkingProcess,
  TypewriterText,
  PromptSuggestion,
  OTPInput,
  PasswordStrength,
  SocialLoginButton,
  UserButton,
  SecurityBadge,
  PasskeyAuth,
  ActiveSessions,
  Stat,
  StatLabel,
  StatValue,
  StatTrend,
  StatHelpText,
  StatGroup,
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
  TreeView,
  TreeItem,
  SourceCitation,
  SourceCitationList,
  ModelSelector,
  type AIModel,
  ScrollProgress,
  BrowserMockup,
  type BrowserMockupTab,
  BentoGrid,
  BentoGridItem,
  GlassSurface,
  HoloCard,
  VoiceVisualizer,
  MatrixRain,
  TextHoverEffect,
  PricingTable,
  PricingCard,
  BillingToggle,
  type BillingInterval,
  UsageMeter,
  AnimatedTooltip,
  FeatureComparison,
  cn,
} from "patiya";

export const AnimatedTooltipPreview = () => {
  const team = [
    {
      id: 1,
      name: "Sophia Martinez",
      designation: "Principal Motion Architect",
      badge: "Core",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 2,
      name: "Marcus Vance",
      designation: "Founding GPU Engineer",
      badge: "WebGL",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 3,
      name: "Aria Chen",
      designation: "AI Interaction Specialist",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 4,
      name: "David Kim",
      designation: "Design Systems Lead",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      <AnimatedTooltip items={team} size="md" />
      <span className="text-xs text-[var(--patiya-color-muted-foreground)] mt-2 font-mono">
        Hover to trigger kinetic tilt tooltip
      </span>
    </div>
  );
};

export const FeatureComparisonPreview = () => {
  const plans = [
    { id: "starter", name: "Starter" },
    {
      id: "pro",
      name: "Professional",
      highlighted: true,
      badge: "Most Popular",
    },
    { id: "enterprise", name: "Enterprise" },
  ];

  const features = [
    {
      category: "Core Engine",
      name: "Active 60fps Shaders",
      values: {
        starter: "3 Shaders",
        pro: "Unlimited",
        enterprise: "Unlimited",
      },
    },
    {
      category: "Core Engine",
      name: "WebGL Hardware Acceleration",
      values: { starter: true, pro: true, enterprise: true },
    },
    {
      category: "Architecture",
      name: "Custom Motion Tokens",
      values: { starter: false, pro: true, enterprise: true },
    },
    {
      category: "Architecture",
      name: "Dedicated Engineering SLA",
      values: { starter: false, pro: false, enterprise: "15-minute response" },
    },
  ];

  return (
    <div className="w-full max-w-4xl py-6 mx-auto">
      <FeatureComparison plans={plans} features={features} />
    </div>
  );
};

export const PricingTablePreview = () => {
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl py-6 mx-auto">
      <BillingToggle interval={interval} onChange={setInterval} />
      <PricingTable columns={2} className="w-full">
        <PricingCard
          title="Pro Developer"
          description="Everything you need to ship world-class animated interfaces."
          price={interval === "monthly" ? 29 : 24}
          period={interval === "monthly" ? "/mo" : "/mo billed annually"}
          buttonText="Start Free Trial"
          features={[
            "Unlimited component variants",
            "Full 60fps canvas shaders",
            "Commercial license",
            "Priority GitHub & Discord access",
          ]}
        />
        <PricingCard
          title="Enterprise Scale"
          description="Dedicated design tokens, custom motion choreography, and SLA."
          price={interval === "monthly" ? 99 : 79}
          period={interval === "monthly" ? "/mo" : "/mo billed annually"}
          popular
          badge="Scale Fast"
          buttonText="Upgrade to Enterprise"
          features={[
            "Everything in Pro Developer",
            "Custom shader & WebGL pipelines",
            "Tailored motion system",
            "99.99% uptime guarantee",
          ]}
        />
      </PricingTable>
    </div>
  );
};

export const UsageMeterPreview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl py-6 mx-auto">
      <UsageMeter
        label="Monthly API Compute"
        used={7840}
        limit={10000}
        unit="reqs"
      />
      <UsageMeter
        label="Vector Storage"
        used={920}
        limit={1000}
        unit="MB"
        dangerThreshold={90}
      />
    </div>
  );
};

export const MatrixRainPreview = () => {
  return (
    <div className="w-full max-w-2xl h-[320px] rounded-2xl overflow-hidden border border-[var(--patiya-color-border)] shadow-2xl mx-auto">
      <MatrixRain color="matrix" charset="matrix" speed={1.1} fontSize={15}>
        <div className="bg-black/60 backdrop-blur-md border border-green-500/30 rounded-xl p-6 text-center shadow-2xl max-w-xs">
          <Badge variant="soft" color="success" size="sm">
            TERMINAL • ACTIVE
          </Badge>
          <h4 className="text-white font-mono font-bold text-lg mt-3">
            Patiya Neural Stream
          </h4>
          <p className="text-green-400/80 font-mono text-xs mt-1">
            60FPS Canvas Matrix Rain
          </p>
        </div>
      </MatrixRain>
    </div>
  );
};

export const TextHoverEffectPreview = () => {
  return (
    // <div className="flex items-center justify-center w-full max-w-2xl h-[200px] bg-[var(--patiya-color-card)]/70 dark:bg-[#0a0a0f] rounded-2xl border border-[var(--patiya-color-border)] p-4 mx-auto shadow-lg overflow-hidden">
    <TextHoverEffect text="PATIYA" />
    // </div>
  );
};

export const ToastPreview = () => {
  const { toast } = useToast();
  return (
    <Box className="flex gap-4 flex-wrap">
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Success",
            description: "Your profile has been updated successfully.",
            type: "success",
          })
        }
      >
        Success Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Error",
            description: "Failed to save changes. Please try again.",
            type: "error",
          })
        }
      >
        Error Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Message Received",
            description: "You have a new message from Sarah.",
          })
        }
      >
        Default Toast
      </Button>
    </Box>
  );
};

export const SpotlightCardPreview = () => {
  return (
    <Box className="flex w-full items-center justify-center py-10">
      <SpotlightCard className="w-full max-w-sm text-center">
        <h3 className="text-xl font-semibold mb-2">Spotlight Card</h3>
        <p className="text-(--patiya-color-muted-foreground) text-sm">
          Hover over me to see the beautiful glowing spotlight effect tracking
          your cursor.
        </p>
      </SpotlightCard>
    </Box>
  );
};

export const CardPreview = () => {
  return (
    <Box className="flex flex-wrap gap-6 items-start justify-center">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="flex flex-col space-y-4">
            <Input placeholder="Name of your project" />
          </Box>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>

      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-4">
            <Box className="flex items-center gap-4">
              <Avatar initials="JD" />
              <Box>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-(--patiya-color-muted-foreground)">
                  2 mins ago
                </p>
              </Box>
            </Box>
            <Box className="flex items-center gap-4">
              <Avatar
                initials="AS"
                color="accent"
                className="bg-[var(--patiya-color-accent)] text-white"
              />
              <Box>
                <p className="text-sm font-medium">Alice Smith</p>
                <p className="text-xs text-(--patiya-color-muted-foreground)">
                  1 hour ago
                </p>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card className="w-[300px]">
        <CardContent className="pt-6">
          <Box className="flex flex-col items-center justify-center space-y-3 text-center">
            <Avatar src="https://i.pravatar.cc/150?img=4" size="xl" />
            <Box>
              <h3 className="font-semibold text-lg">Sarah Jenkins</h3>
              <p className="text-sm text-(--patiya-color-muted-foreground)">
                Software Engineer
              </p>
            </Box>
            <Box className="flex gap-2">
              <Badge variant="soft" color="primary">
                React
              </Badge>
              <Badge variant="soft" color="secondary">
                Design
              </Badge>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export const AvatarPreview = () => {
  return (
    <Box className="flex flex-wrap items-center gap-6">
      <Avatar src="https://i.pravatar.cc/150?u=1" size="sm" />
      <Avatar src="https://i.pravatar.cc/150?u=1" size="md" />
      <Avatar src="https://i.pravatar.cc/150?u=1" size="lg" />
      <Avatar src="https://i.pravatar.cc/150?u=1" size="xl" />
      <Avatar
        initials="AK"
        size="lg"
        className="bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)]"
      />
      <Avatar shape="square" src="https://i.pravatar.cc/150?u=2" size="lg" />
      <Avatar
        shape="square"
        initials="JD"
        size="xl"
        className="bg-[var(--patiya-color-accent)] text-[var(--patiya-color-primary-foreground)]"
      />
    </Box>
  );
};

export const ChipPreview = () => {
  return (
    <Box className="flex gap-4 flex-wrap">
      <Chip color="primary" variant="solid">
        Primary
      </Chip>
      <Chip color="accent" variant="soft" onClose={() => {}}>
        Removable
      </Chip>
      <Chip color="secondary" variant="outline">
        Outline
      </Chip>
      <Chip color="destructive" variant="soft" onClose={() => {}}>
        Error
      </Chip>
      <Chip color="muted" variant="solid">
        Default
      </Chip>
    </Box>
  );
};

export const TablePreview = () => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export const TimelinePreview = () => {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="solid" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <h4 className="font-semibold text-sm">Order Placed</h4>
          <p className="text-sm text-(--patiya-color-muted-foreground)">
            Your order #12345 has been placed.
          </p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="accent" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <h4 className="font-semibold text-sm">Processing</h4>
          <p className="text-sm text-(--patiya-color-muted-foreground)">
            We are preparing your items.
          </p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="muted" />
        </TimelineSeparator>
        <TimelineContent>
          <h4 className="font-semibold text-sm">Shipped</h4>
          <p className="text-sm text-(--patiya-color-muted-foreground)">
            Pending carrier pickup.
          </p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export const StepperPreview = () => {
  return (
    <Box className="w-full max-w-xl mx-auto overflow-x-auto pb-4 custom-scrollbar">
      <Stepper className="w-full min-w-[400px]">
        <Step completed className="flex-1">
          <StepIndicator completed>1</StepIndicator>
          <StepTitle>Account</StepTitle>
          <StepSeparator />
        </Step>
        <Step active className="flex-1">
          <StepIndicator active>2</StepIndicator>
          <StepTitle>Shipping</StepTitle>
          <StepSeparator />
        </Step>
        <Step>
          <StepIndicator>3</StepIndicator>
          <StepTitle>Payment</StepTitle>
        </Step>
      </Stepper>
    </Box>
  );
};

export const StatPreview = () => {
  return (
    <StatGroup columns={3} className="max-w-4xl w-full mx-auto">
      <Stat variant="card">
        <StatLabel>Total Revenue</StatLabel>
        <StatValue prefix="$">45,231.89</StatValue>
        <div className="flex items-center gap-2 mt-1">
          <StatTrend direction="up">+20.1%</StatTrend>
          <StatHelpText>from last month</StatHelpText>
        </div>
      </Stat>
      <Stat variant="card">
        <StatLabel>Active Subscriptions</StatLabel>
        <StatValue prefix="+">2,350</StatValue>
        <div className="flex items-center gap-2 mt-1">
          <StatTrend direction="up">+180.1%</StatTrend>
          <StatHelpText>from last quarter</StatHelpText>
        </div>
      </Stat>
      <Stat variant="card">
        <StatLabel>Churn Rate</StatLabel>
        <StatValue suffix="%">1.2</StatValue>
        <div className="flex items-center gap-2 mt-1">
          <StatTrend direction="down">-0.4%</StatTrend>
          <StatHelpText>all-time low</StatHelpText>
        </div>
      </Stat>
    </StatGroup>
  );
};

export const DataListPreview = () => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <DataList variant="bordered">
        <DataListItem>
          <DataListLabel>Order ID</DataListLabel>
          <DataListValue copyable copyText="#ORD-98231">
            <span className="font-mono text-xs font-semibold">#ORD-98231</span>
          </DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Customer</DataListLabel>
          <DataListValue>
            <div className="flex flex-col">
              <span className="font-medium">Sarah Jenkins</span>
              <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                sarah.j@example.com
              </span>
            </div>
          </DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Payment</DataListLabel>
          <DataListValue>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Visa ending in 4242
            </span>
          </DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Amount</DataListLabel>
          <DataListValue>
            <span className="font-semibold text-base">$349.00 USD</span>
          </DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Status</DataListLabel>
          <DataListValue>
            <Badge
              variant="outline"
              className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10"
            >
              Fulfilled
            </Badge>
          </DataListValue>
        </DataListItem>
      </DataList>
    </div>
  );
};

export const TreeViewPreview = () => {
  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] shadow-xs">
      <TreeView defaultExpandedKeys={["root", "src", "components"]}>
        <TreeItem
          id="root"
          label="patiya-ui"
          icon={
            <svg
              className="w-4 h-4 text-amber-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
            </svg>
          }
        >
          <TreeItem
            id="src"
            label="src"
            icon={
              <svg
                className="w-4 h-4 text-amber-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
              </svg>
            }
          >
            <TreeItem
              id="components"
              label="components"
              icon={
                <svg
                  className="w-4 h-4 text-amber-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                </svg>
              }
            >
              <TreeItem
                id="stat"
                label="Stat.tsx"
                icon={
                  <svg
                    className="w-4 h-4 text-sky-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                }
                badge={
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1 py-0 h-4"
                  >
                    New
                  </Badge>
                }
              />
              <TreeItem
                id="datalist"
                label="DataList.tsx"
                icon={
                  <svg
                    className="w-4 h-4 text-sky-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                }
                badge={
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1 py-0 h-4"
                  >
                    New
                  </Badge>
                }
              />
              <TreeItem
                id="treeview"
                label="TreeView.tsx"
                icon={
                  <svg
                    className="w-4 h-4 text-sky-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                }
                badge={
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1 py-0 h-4"
                  >
                    New
                  </Badge>
                }
              />
            </TreeItem>
            <TreeItem
              id="index"
              label="index.ts"
              icon={
                <svg
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              }
            />
          </TreeItem>
          <TreeItem
            id="package"
            label="package.json"
            icon={
              <svg
                className="w-4 h-4 text-emerald-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            }
          />
        </TreeItem>
      </TreeView>
    </div>
  );
};

export const TabsPreview = () => {
  return (
    <Tabs defaultValue="account" className="w-full max-w-[400px]">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input defaultValue="Ajay Katariya" />
            <Input defaultValue="@ajay" />
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input type="password" placeholder="Current password" />
            <Input type="password" placeholder="New password" />
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export const AccordionPreview = () => {
  return (
    <Accordion type="single" className="w-full max-w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const BreadcrumbPreview = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const PaginationPreview = () => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export const CommandPreview = () => {
  return (
    <Box className="w-full max-w-[450px] border border-[var(--patiya-color-border)] rounded-xl overflow-hidden shadow-sm">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Mail</span>
            </CommandItem>
            <CommandItem>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h.01" />
                <path d="M17 7h.01" />
                <path d="M7 17h.01" />
                <path d="M17 17h.01" />
              </svg>
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
              </svg>
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </Box>
  );
};

export const NavbarPreview = () => {
  return (
    <Box className="w-full relative border border-[var(--patiya-color-border)] rounded-xl overflow-hidden bg-[var(--patiya-color-muted)]/20 min-h-[300px]">
      <Navbar className="absolute">
        <NavbarContainer>
          <NavbarBrand>
            <Box className="w-8 h-8 rounded-xl bg-[var(--patiya-color-foreground)] text-[var(--patiya-color-background)] flex items-center justify-center mr-2 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </Box>
            <span className="font-extrabold text-xl tracking-tight">
              Patiya
            </span>
          </NavbarBrand>
          <NavbarContent>
            <NavbarItem href="#" isActive>
              Products
            </NavbarItem>
            <NavbarItem href="#">Solutions</NavbarItem>
            <NavbarItem href="#">Pricing</NavbarItem>
            <NavbarItem href="#">Documentation</NavbarItem>
          </NavbarContent>
          <NavbarActions>
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button size="sm" className="hidden sm:inline-flex">
              Get Started
            </Button>
            <NavbarMenuToggle />
          </NavbarActions>
        </NavbarContainer>
        <NavbarMenu>
          <NavbarMenuItem href="#" isActive>
            Products
          </NavbarMenuItem>
          <NavbarMenuItem href="#">Solutions</NavbarMenuItem>
          <NavbarMenuItem href="#">Pricing</NavbarMenuItem>
          <NavbarMenuItem href="#">Documentation</NavbarMenuItem>
          <Box className="flex flex-col gap-2 mt-4 pt-4 border-t border-[var(--patiya-color-border)]">
            <Button variant="outline" fullWidth>
              Sign In
            </Button>
            <Button fullWidth>Get Started</Button>
          </Box>
        </NavbarMenu>
      </Navbar>
    </Box>
  );
};

export const ChartPreview = () => {
  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 550 },
    { name: "Apr", value: 450 },
    { name: "May", value: 700 },
    { name: "Jun", value: 650 },
  ];

  return (
    <Box className="w-full h-[350px] p-4 border border-[var(--patiya-color-border)] rounded-xl bg-[var(--patiya-color-background)]">
      <ChartContainer
        config={{
          value: { label: "Sales", color: "var(--patiya-color-primary)" },
        }}
      >
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--patiya-color-border)"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--patiya-color-muted-foreground)",
              fontSize: 12,
            }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--patiya-color-muted-foreground)",
              fontSize: 12,
            }}
          />
          <RechartsTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-value)"
            strokeWidth={3}
            dot={{ r: 4, fill: "var(--color-value)" }}
            activeDot={{ r: 6, fill: "var(--color-value)" }}
          />
        </LineChart>
      </ChartContainer>
    </Box>
  );
};

export const RichTextEditorPreview = () => {
  return (
    <Box className="w-full">
      <RichTextEditor placeholder="Type your beautiful content here..." />
    </Box>
  );
};

export const PopoverPreview = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Box className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-(--patiya-color-muted-foreground)">
            Set the dimensions for the layer.
          </p>
          <Box className="grid gap-2 pt-2">
            <Box className="grid grid-cols-3 items-center gap-4">
              <span className="text-sm">Width</span>
              <Input className="col-span-2 h-8" defaultValue="100%" />
            </Box>
            <Box className="grid grid-cols-3 items-center gap-4">
              <span className="text-sm">Height</span>
              <Input className="col-span-2 h-8" defaultValue="25px" />
            </Box>
          </Box>
        </Box>
      </PopoverContent>
    </Popover>
  );
};

export const ProfilePopoverPreview = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="inline-block cursor-pointer">
          <Avatar src="https://i.pravatar.cc/130" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <Box className="flex flex-col gap-2 p-2">
          <h4 className="font-semibold text-sm">John Doe</h4>
          <p className="text-xs text-(--patiya-color-muted-foreground)">
            john@example.com
          </p>
        </Box>
      </PopoverContent>
    </Popover>
  );
};

export const DropdownPreview = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <Box className="my-1 h-px bg-[var(--patiya-color-border)]" />
        <DropdownMenuItem className="text-[var(--patiya-color-destructive)] focus:text-[var(--patiya-color-destructive)] focus:bg-[var(--patiya-color-destructive)]/10">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const DropdownWithIconsPreview = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Settings</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const DropdownAvatarPreview = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="inline-block cursor-pointer">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <Box className="flex flex-col gap-1 p-2 border-b border-[var(--patiya-color-border)] mb-1">
          <span className="font-semibold text-sm leading-none">Jane Smith</span>
          <span className="text-xs text-(--patiya-color-muted-foreground)">
            jane@example.com
          </span>
        </Box>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <Box className="my-1 h-px bg-[var(--patiya-color-border)]" />
        <DropdownMenuItem className="text-[var(--patiya-color-destructive)] focus:text-[var(--patiya-color-destructive)] focus:bg-[var(--patiya-color-destructive)]/10">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const DismissibleAlertPreview = () => {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <Button variant="outline" onClick={() => setOpen(true)}>
        Show Alert
      </Button>
    );
  }

  return (
    <Alert
      color="primary"
      variant="soft"
      title="Note"
      onClose={() => setOpen(false)}
    >
      This alert can be dismissed.
    </Alert>
  );
};

export const ModalPreview = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalHeader>
          <ModalTitle>Edit Profile</ModalTitle>
          <ModalDescription>
            Make changes to your profile here. Click save when you're done.
          </ModalDescription>
        </ModalHeader>
        <Box className="py-4">
          <Input placeholder="Name" defaultValue="Ajay Katariya" />
        </Box>
        <ModalFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save changes</Button>
        </ModalFooter>
      </Modal>
    </Box>
  );
};

export const ModalSizePreview = () => {
  const [open, setOpen] = useState(false);
  type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  const [size, setSize] = useState<ModalSize>("md");

  const openWithSize = (s: ModalSize) => {
    setSize(s);
    setOpen(true);
  };

  return (
    <Box className="flex gap-2 flex-wrap justify-center">
      <Button variant="outline" onClick={() => openWithSize("xs")}>
        XS
      </Button>
      <Button variant="outline" onClick={() => openWithSize("sm")}>
        SM
      </Button>
      <Button variant="outline" onClick={() => openWithSize("md")}>
        MD
      </Button>
      <Button variant="outline" onClick={() => openWithSize("lg")}>
        LG
      </Button>
      <Button variant="outline" onClick={() => openWithSize("xl")}>
        XL
      </Button>
      <Button variant="outline" onClick={() => openWithSize("xxl")}>
        XXL
      </Button>

      <Modal open={open} onOpenChange={setOpen} size={size}>
        <ModalHeader>
          <ModalTitle>Modal Size: {size.toUpperCase()}</ModalTitle>
          <ModalDescription>
            This modal is using size="{size}".
          </ModalDescription>
        </ModalHeader>
        <Box className="py-4">
          <p className="text-sm text-(--patiya-color-muted-foreground)">
            Adjust the size prop to control the maximum width of the modal
            dialog.
          </p>
        </Box>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </Box>
  );
};

export const DrawerPreview = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Button color="secondary" onClick={() => setOpen(true)}>
        Open Settings Drawer
      </Button>
      <Drawer open={open} onOpenChange={setOpen} side="right">
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>
            Manage preferences and notifications.
          </DrawerDescription>
        </DrawerHeader>
        <Box className="flex-1 py-4 space-y-5">
          <Box className="flex items-center justify-between">
            <Box>
              <p className="text-sm font-medium">Push Notifications</p>
              <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                Receive real-time alerts
              </p>
            </Box>
            <Switch defaultChecked />
          </Box>
          <Box className="flex items-center justify-between">
            <Box>
              <p className="text-sm font-medium">Auto Updates</p>
              <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                Keep app up to date
              </p>
            </Box>
            <Switch defaultChecked />
          </Box>
          <Box className="flex items-center justify-between">
            <Box>
              <p className="text-sm font-medium">Telemetry Sharing</p>
              <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                Share anonymous crash logs
              </p>
            </Box>
            <Switch />
          </Box>
        </Box>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save Changes</Button>
        </DrawerFooter>
      </Drawer>
    </Box>
  );
};

export const DrawerLeftPreview = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Navigation Drawer
      </Button>
      <Drawer open={open} onOpenChange={setOpen} side="left">
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Explore workspace sections.</DrawerDescription>
        </DrawerHeader>
        <Box className="flex-1 py-4 space-y-2">
          <Button variant="ghost" fullWidth className="justify-start">
            Dashboard
          </Button>
          <Button variant="ghost" fullWidth className="justify-start">
            Analytics
          </Button>
          <Button variant="ghost" fullWidth className="justify-start">
            Projects
          </Button>
          <Button variant="ghost" fullWidth className="justify-start">
            Team Members
          </Button>
          <Button variant="ghost" fullWidth className="justify-start">
            Security & Billing
          </Button>
        </Box>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)} fullWidth>
            Close Menu
          </Button>
        </DrawerFooter>
      </Drawer>
    </Box>
  );
};

export const DrawerTopPreview = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Top Announcement
      </Button>
      <Drawer open={open} onOpenChange={setOpen} side="top">
        <DrawerHeader>
          <DrawerTitle>System Maintenance Notice</DrawerTitle>
          <DrawerDescription>
            Scheduled maintenance is planned for Sunday at 02:00 UTC.
          </DrawerDescription>
        </DrawerHeader>
        <Box className="py-2 text-sm text-[var(--patiya-color-muted-foreground)]">
          All API endpoints and dashboards will experience up to 15 minutes of
          intermittent downtime. Please plan deployments accordingly.
        </Box>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Dismiss
          </Button>
          <Button onClick={() => setOpen(false)}>View Status Page</Button>
        </DrawerFooter>
      </Drawer>
    </Box>
  );
};

export const BottomSheetPreview = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Button color="secondary" onClick={() => setOpen(true)}>
        Open Bottom Sheet
      </Button>
      <Drawer open={open} onOpenChange={setOpen} side="bottom">
        <Box className="w-12 h-1.5 bg-[var(--patiya-color-muted-foreground)]/30 rounded-full mx-auto mb-3" />
        <DrawerHeader>
          <DrawerTitle>Quick Actions</DrawerTitle>
          <DrawerDescription>
            Choose an action to perform on this document.
          </DrawerDescription>
        </DrawerHeader>
        <Box className="grid grid-cols-2 gap-3 py-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Copy Link
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Send via Email
          </Button>
          <Button
            color="destructive"
            variant="soft"
            onClick={() => setOpen(false)}
          >
            Move to Trash
          </Button>
        </Box>
        <DrawerFooter>
          <Button onClick={() => setOpen(false)} fullWidth>
            Done
          </Button>
        </DrawerFooter>
      </Drawer>
    </Box>
  );
};

export const DrawerFormPreview = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Button onClick={() => setOpen(true)}>Edit User Profile</Button>
      <Drawer open={open} onOpenChange={setOpen} side="right">
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>
            Update public credentials and role.
          </DrawerDescription>
        </DrawerHeader>
        <Box className="flex-1 py-4 space-y-4">
          <Box className="space-y-1.5">
            <span className="text-xs font-semibold">Full Name</span>
            <Input defaultValue="Sarah Connor" placeholder="Enter name" />
          </Box>
          <Box className="space-y-1.5">
            <span className="text-xs font-semibold">Email</span>
            <Input
              defaultValue="sarah@example.com"
              type="email"
              placeholder="Enter email"
            />
          </Box>
          <Box className="space-y-1.5">
            <span className="text-xs font-semibold">Workspace Role</span>
            <Select defaultValue="editor">
              <option value="admin">Administrator</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </Select>
          </Box>
          <Box className="space-y-1.5">
            <span className="text-xs font-semibold">Bio</span>
            <Textarea
              defaultValue="Staff engineer building modern design systems."
              rows={3}
            />
          </Box>
        </Box>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save Profile</Button>
        </DrawerFooter>
      </Drawer>
    </Box>
  );
};

export const DrawerCartPreview = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Button variant="outline" onClick={() => setOpen(true)}>
        View Cart (2 Items)
      </Button>
      <Drawer open={open} onOpenChange={setOpen} side="right">
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
          <DrawerDescription>You have 2 items in your cart.</DrawerDescription>
        </DrawerHeader>
        <Box className="flex-1 py-4 space-y-4">
          <Box className="flex justify-between items-center pb-3 border-b border-[var(--patiya-color-border)]">
            <Box>
              <p className="text-sm font-semibold">Mechanical Keyboard</p>
              <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                Custom Linear Switches
              </p>
            </Box>
            <span className="text-sm font-medium">$149.00</span>
          </Box>
          <Box className="flex justify-between items-center pb-3 border-b border-[var(--patiya-color-border)]">
            <Box>
              <p className="text-sm font-semibold">Ergonomic Wrist Rest</p>
              <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                Walnut Wood
              </p>
            </Box>
            <span className="text-sm font-medium">$39.00</span>
          </Box>
          <Box className="pt-2 flex justify-between items-center">
            <span className="text-base font-semibold">Total</span>
            <span className="text-base font-bold">$188.00</span>
          </Box>
        </Box>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Continue Shopping
          </Button>
          <Button onClick={() => setOpen(false)}>Checkout Now</Button>
        </DrawerFooter>
      </Drawer>
    </Box>
  );
};

export const SwitchPreview = () => {
  const [checked, setChecked] = useState(true);
  return (
    <Box className="flex items-center gap-4">
      <Switch
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <span className="text-sm font-medium text-[var(--patiya-color-foreground)]">
        Interactive ({checked ? "On" : "Off"})
      </span>
    </Box>
  );
};

export const SwitchSizesPreview = () => {
  return (
    <Box className="flex flex-wrap items-center gap-6">
      <Box className="flex items-center gap-2">
        <Switch size="xs" defaultChecked />
        <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
          xs
        </span>
      </Box>
      <Box className="flex items-center gap-2">
        <Switch size="sm" defaultChecked />
        <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
          sm
        </span>
      </Box>
      <Box className="flex items-center gap-2">
        <Switch size="md" defaultChecked />
        <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
          md
        </span>
      </Box>
      <Box className="flex items-center gap-2">
        <Switch size="lg" defaultChecked />
        <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
          lg
        </span>
      </Box>
      <Box className="flex items-center gap-2">
        <Switch size="xl" defaultChecked />
        <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
          xl
        </span>
      </Box>
    </Box>
  );
};

export const SwitchVariantsPreview = () => {
  return (
    <Box className="flex flex-wrap items-center gap-8">
      <Box className="flex items-center gap-3">
        <Switch variant="solid" color="primary" defaultChecked />
        <span className="text-sm font-medium text-[var(--patiya-color-foreground)]">
          Solid
        </span>
      </Box>
      <Box className="flex items-center gap-3">
        <Switch variant="soft" color="primary" defaultChecked />
        <span className="text-sm font-medium text-[var(--patiya-color-foreground)]">
          Soft
        </span>
      </Box>
      <Box className="flex items-center gap-3">
        <Switch variant="outline" color="primary" defaultChecked />
        <span className="text-sm font-medium text-[var(--patiya-color-foreground)]">
          Outline
        </span>
      </Box>
    </Box>
  );
};

export const SwitchColorsPreview = () => {
  return (
    <Box className="flex flex-wrap items-center gap-6">
      <Box className="flex items-center gap-2">
        <Switch color="primary" defaultChecked />
        <span className="text-xs capitalize text-[var(--patiya-color-muted-foreground)]">
          primary
        </span>
      </Box>
      <Box className="flex items-center gap-2">
        <Switch color="secondary" defaultChecked />
        <span className="text-xs capitalize text-[var(--patiya-color-muted-foreground)]">
          secondary
        </span>
      </Box>
      <Box className="flex items-center gap-2">
        <Switch color="success" defaultChecked />
        <span className="text-xs capitalize text-[var(--patiya-color-muted-foreground)]">
          success
        </span>
      </Box>
      <Box className="flex items-center gap-2">
        <Switch color="warning" defaultChecked />
        <span className="text-xs capitalize text-[var(--patiya-color-muted-foreground)]">
          warning
        </span>
      </Box>
      <Box className="flex items-center gap-2">
        <Switch color="destructive" defaultChecked />
        <span className="text-xs capitalize text-[var(--patiya-color-muted-foreground)]">
          destructive
        </span>
      </Box>
      <Box className="flex items-center gap-2">
        <Switch color="info" defaultChecked />
        <span className="text-xs capitalize text-[var(--patiya-color-muted-foreground)]">
          info
        </span>
      </Box>
      <Box className="flex items-center gap-2">
        <Switch color="accent" defaultChecked />
        <span className="text-xs capitalize text-[var(--patiya-color-muted-foreground)]">
          accent
        </span>
      </Box>
    </Box>
  );
};

export const SwitchCardPreview = () => {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <Box className="w-full max-w-md rounded-xl border border-[var(--patiya-color-border)] p-4 space-y-4 bg-[var(--patiya-color-card)]">
      <Box className="flex items-center justify-between">
        <Box>
          <p className="text-sm font-medium text-[var(--patiya-color-foreground)]">
            Wi-Fi Connection
          </p>
          <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
            Connect to known wireless networks
          </p>
        </Box>
        <Switch
          checked={wifi}
          onChange={(e) => setWifi(e.target.checked)}
          color="primary"
        />
      </Box>
      <Box className="border-t border-[var(--patiya-color-border)] pt-3 flex items-center justify-between">
        <Box>
          <p className="text-sm font-medium text-[var(--patiya-color-foreground)]">
            Bluetooth
          </p>
          <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
            Pair accessories and nearby devices
          </p>
        </Box>
        <Switch
          checked={bluetooth}
          onChange={(e) => setBluetooth(e.target.checked)}
          color="info"
        />
      </Box>
      <Box className="border-t border-[var(--patiya-color-border)] pt-3 flex items-center justify-between">
        <Box>
          <p className="text-sm font-medium text-[var(--patiya-color-foreground)]">
            Security Alerts
          </p>
          <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
            Receive real-time push notifications
          </p>
        </Box>
        <Switch
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
          color="success"
        />
      </Box>
    </Box>
  );
};

export const CheckboxSizesPreview = () => {
  return (
    <Box className="flex flex-wrap items-center gap-6">
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-xs" size="xs" defaultChecked />
        <label
          htmlFor="cb-xs"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          xs
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-sm" size="sm" defaultChecked />
        <label
          htmlFor="cb-sm"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          sm
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-md" size="md" defaultChecked />
        <label
          htmlFor="cb-md"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          md
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-lg" size="lg" defaultChecked />
        <label
          htmlFor="cb-lg"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          lg
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-xl" size="xl" defaultChecked />
        <label
          htmlFor="cb-xl"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          xl
        </label>
      </Box>
    </Box>
  );
};

export const CheckboxVariantsPreview = () => {
  return (
    <Box className="flex flex-wrap items-center gap-8">
      <Box className="flex items-center gap-2.5">
        <Checkbox
          id="cb-var-solid"
          variant="solid"
          color="primary"
          defaultChecked
        />
        <label
          htmlFor="cb-var-solid"
          className="text-sm font-medium text-[var(--patiya-color-foreground)] cursor-pointer"
        >
          Solid
        </label>
      </Box>
      <Box className="flex items-center gap-2.5">
        <Checkbox
          id="cb-var-soft"
          variant="soft"
          color="primary"
          defaultChecked
        />
        <label
          htmlFor="cb-var-soft"
          className="text-sm font-medium text-[var(--patiya-color-foreground)] cursor-pointer"
        >
          Soft
        </label>
      </Box>
      <Box className="flex items-center gap-2.5">
        <Checkbox
          id="cb-var-outline"
          variant="outline"
          color="primary"
          defaultChecked
        />
        <label
          htmlFor="cb-var-outline"
          className="text-sm font-medium text-[var(--patiya-color-foreground)] cursor-pointer"
        >
          Outline
        </label>
      </Box>
    </Box>
  );
};

export const CheckboxColorsPreview = () => {
  return (
    <Box className="flex flex-wrap items-center gap-6">
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-col-primary" color="primary" defaultChecked />
        <label
          htmlFor="cb-col-primary"
          className="text-xs capitalize text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          primary
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-col-secondary" color="secondary" defaultChecked />
        <label
          htmlFor="cb-col-secondary"
          className="text-xs capitalize text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          secondary
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-col-success" color="success" defaultChecked />
        <label
          htmlFor="cb-col-success"
          className="text-xs capitalize text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          success
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-col-warning" color="warning" defaultChecked />
        <label
          htmlFor="cb-col-warning"
          className="text-xs capitalize text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          warning
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-col-destructive" color="destructive" defaultChecked />
        <label
          htmlFor="cb-col-destructive"
          className="text-xs capitalize text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          destructive
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-col-info" color="info" defaultChecked />
        <label
          htmlFor="cb-col-info"
          className="text-xs capitalize text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          info
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-col-accent" color="accent" defaultChecked />
        <label
          htmlFor="cb-col-accent"
          className="text-xs capitalize text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          accent
        </label>
      </Box>
    </Box>
  );
};

export const CheckboxRadiusPreview = () => {
  return (
    <Box className="flex flex-wrap items-center gap-6">
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-rad-none" radius="none" defaultChecked />
        <label
          htmlFor="cb-rad-none"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          Square (none)
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-rad-sm" radius="sm" defaultChecked />
        <label
          htmlFor="cb-rad-sm"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          Small (sm)
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-rad-md" radius="md" defaultChecked />
        <label
          htmlFor="cb-rad-md"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          Rounded (md)
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-rad-lg" radius="lg" defaultChecked />
        <label
          htmlFor="cb-rad-lg"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          Large (lg)
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Checkbox id="cb-rad-full" radius="full" defaultChecked />
        <label
          htmlFor="cb-rad-full"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          Circular (full)
        </label>
      </Box>
    </Box>
  );
};

export const CheckboxIndeterminatePreview = () => {
  const [items, setItems] = useState([true, false, false]);
  const allChecked = items.every(Boolean);
  const isIndeterminate = items.some(Boolean) && !allChecked;

  return (
    <Box className="space-y-3 p-4 rounded-xl border border-[var(--patiya-color-border)] max-w-sm bg-[var(--patiya-color-card)]">
      <Box className="flex items-center gap-3 pb-3 border-b border-[var(--patiya-color-border)]">
        <Checkbox
          id="cb-parent"
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={(e) =>
            setItems([e.target.checked, e.target.checked, e.target.checked])
          }
        />
        <label
          htmlFor="cb-parent"
          className="text-sm font-semibold text-[var(--patiya-color-foreground)] cursor-pointer"
        >
          Select All Tasks
        </label>
      </Box>
      <Box className="space-y-2 pl-6">
        {[
          "Review pull request",
          "Deploy to staging",
          "Run integration tests",
        ].map((task, i) => (
          <Box key={task} className="flex items-center gap-2.5">
            <Checkbox
              id={`task-${i}`}
              checked={items[i]}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.checked;
                setItems(next);
              }}
            />
            <label
              htmlFor={`task-${i}`}
              className="text-xs text-[var(--patiya-color-foreground)] cursor-pointer"
            >
              {task}
            </label>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const CheckboxCardPreview = () => {
  const [selected, setSelected] = useState<string[]>(["email"]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <Box className="w-full max-w-md space-y-3">
      {[
        {
          id: "email",
          title: "Email Notifications",
          desc: "Receive daily summary and system alerts.",
        },
        {
          id: "slack",
          title: "Slack Integration",
          desc: "Post deployment status updates directly to channels.",
        },
        {
          id: "sms",
          title: "SMS Two-Factor",
          desc: "Fallback authentication codes via mobile network.",
        },
      ].map((item) => {
        const isChecked = selected.includes(item.id);
        return (
          <label
            key={item.id}
            htmlFor={`opt-${item.id}`}
            className={cn(
              "flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer",
              isChecked
                ? "border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/5"
                : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] hover:border-[var(--patiya-color-muted-foreground)]/30",
            )}
          >
            <Checkbox
              id={`opt-${item.id}`}
              checked={isChecked}
              onChange={() => toggle(item.id)}
              className="mt-0.5"
            />
            <Box className="space-y-0.5">
              <p className="text-sm font-medium text-[var(--patiya-color-foreground)]">
                {item.title}
              </p>
              <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                {item.desc}
              </p>
            </Box>
          </label>
        );
      })}
    </Box>
  );
};

export const RadioSizesPreview = () => {
  return (
    <Box className="flex flex-wrap items-center gap-6">
      <Box className="flex items-center gap-2">
        <Radio id="r-size-xs" name="r-size" size="xs" />
        <label
          htmlFor="r-size-xs"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          xs
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Radio id="r-size-sm" name="r-size" size="sm" />
        <label
          htmlFor="r-size-sm"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          sm
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Radio id="r-size-md" name="r-size" size="md" defaultChecked />
        <label
          htmlFor="r-size-md"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          md
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Radio id="r-size-lg" name="r-size" size="lg" />
        <label
          htmlFor="r-size-lg"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          lg
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Radio id="r-size-xl" name="r-size" size="xl" />
        <label
          htmlFor="r-size-xl"
          className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          xl
        </label>
      </Box>
    </Box>
  );
};

export const RadioVariantsPreview = () => {
  return (
    <Box className="flex flex-wrap items-center gap-8">
      <Box className="flex items-center gap-2.5">
        <Radio
          id="r-var-solid"
          name="r-var"
          variant="solid"
          color="primary"
          defaultChecked
        />
        <label
          htmlFor="r-var-solid"
          className="text-sm font-medium text-[var(--patiya-color-foreground)] cursor-pointer"
        >
          Solid
        </label>
      </Box>
      <Box className="flex items-center gap-2.5">
        <Radio id="r-var-soft" name="r-var" variant="soft" color="primary" />
        <label
          htmlFor="r-var-soft"
          className="text-sm font-medium text-[var(--patiya-color-foreground)] cursor-pointer"
        >
          Soft
        </label>
      </Box>
      <Box className="flex items-center gap-2.5">
        <Radio
          id="r-var-outline"
          name="r-var"
          variant="outline"
          color="primary"
        />
        <label
          htmlFor="r-var-outline"
          className="text-sm font-medium text-[var(--patiya-color-foreground)] cursor-pointer"
        >
          Outline
        </label>
      </Box>
    </Box>
  );
};

export const RadioColorsPreview = () => {
  return (
    <Box className="flex flex-wrap items-center gap-6">
      <Box className="flex items-center gap-2">
        <Radio
          id="r-col-primary"
          name="r-col-1"
          color="primary"
          defaultChecked
        />
        <label
          htmlFor="r-col-primary"
          className="text-xs capitalize text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          primary
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Radio
          id="r-col-secondary"
          name="r-col-2"
          color="secondary"
          defaultChecked
        />
        <label
          htmlFor="r-col-secondary"
          className="text-xs capitalize text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          secondary
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Radio
          id="r-col-success"
          name="r-col-3"
          color="success"
          defaultChecked
        />
        <label
          htmlFor="r-col-success"
          className="text-xs capitalize text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          success
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Radio
          id="r-col-warning"
          name="r-col-4"
          color="warning"
          defaultChecked
        />
        <label
          htmlFor="r-col-warning"
          className="text-xs capitalize text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          warning
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Radio
          id="r-col-destructive"
          name="r-col-5"
          color="destructive"
          defaultChecked
        />
        <label
          htmlFor="r-col-destructive"
          className="text-xs capitalize text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          destructive
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Radio id="r-col-info" name="r-col-6" color="info" defaultChecked />
        <label
          htmlFor="r-col-info"
          className="text-xs capitalize text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          info
        </label>
      </Box>
      <Box className="flex items-center gap-2">
        <Radio id="r-col-accent" name="r-col-7" color="accent" defaultChecked />
        <label
          htmlFor="r-col-accent"
          className="text-xs capitalize text-[var(--patiya-color-muted-foreground)] cursor-pointer"
        >
          accent
        </label>
      </Box>
    </Box>
  );
};

export const RadioCardPreview = () => {
  const [selectedPlan, setSelectedPlan] = useState("starter");

  const plans = [
    {
      id: "starter",
      title: "Starter Plan",
      desc: "For small teams and side projects.",
      price: "$9/mo",
    },
    {
      id: "pro",
      title: "Pro Plan",
      desc: "Advanced features and dedicated support.",
      price: "$29/mo",
    },
    {
      id: "enterprise",
      title: "Enterprise",
      desc: "Custom SLA and unlimited deployments.",
      price: "$99/mo",
    },
  ];

  return (
    <Box className="w-full max-w-md space-y-3">
      {plans.map((plan) => {
        const isSelected = selectedPlan === plan.id;
        return (
          <label
            key={plan.id}
            htmlFor={`plan-${plan.id}`}
            className={cn(
              "flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer",
              isSelected
                ? "border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/5"
                : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] hover:border-[var(--patiya-color-muted-foreground)]/30",
            )}
          >
            <Box className="flex items-start gap-3">
              <Radio
                id={`plan-${plan.id}`}
                name="subscription-plan"
                checked={isSelected}
                onChange={() => setSelectedPlan(plan.id)}
                className="mt-0.5"
              />
              <Box className="space-y-0.5">
                <p className="text-sm font-medium text-[var(--patiya-color-foreground)]">
                  {plan.title}
                </p>
                <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                  {plan.desc}
                </p>
              </Box>
            </Box>
            <span className="text-sm font-semibold text-[var(--patiya-color-foreground)]">
              {plan.price}
            </span>
          </label>
        );
      })}
    </Box>
  );
};

export const CollapseDefaultPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box className="w-full max-w-sm mx-auto space-y-4">
      <Button onClick={() => setIsOpen(!isOpen)} fullWidth variant="outline">
        {isOpen ? "Close" : "Open"} Details
      </Button>
      <Collapse isOpen={isOpen}>
        <Box className="border border-[var(--patiya-color-border)] rounded-md p-4 bg-[var(--patiya-color-muted)]/20 text-sm">
          This is the default collapse behavior. It uses CSS grid to smoothly
          transition between hidden and visible states. It is a lightweight
          primitive for any expanding content.
        </Box>
      </Collapse>
    </Box>
  );
};

export const CollapseCardPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle>Project Settings</CardTitle>
        <CardDescription>Manage your deployment settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--patiya-color-muted-foreground)] mb-4">
          General settings are configured by default. Advanced settings can be
          modified below.
        </p>
        <Collapse isOpen={isOpen}>
          <Box className="space-y-4 pt-2 pb-4 border-t border-[var(--patiya-color-border)]">
            <Box>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">
                Build Command
              </label>
              <Input defaultValue="npm run build" className="mt-1" />
            </Box>
            <Box>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">
                Install Command
              </label>
              <Input defaultValue="npm install" className="mt-1" />
            </Box>
          </Box>
        </Collapse>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="soft"
          color="primary"
          fullWidth
          size="sm"
        >
          {isOpen ? "Hide Advanced Settings" : "Show Advanced Settings"}
        </Button>
      </CardContent>
    </Card>
  );
};

export const CollapseNestedPreview = () => {
  const [isOuterOpen, setIsOuterOpen] = useState(false);
  const [isInnerOpen, setIsInnerOpen] = useState(false);
  return (
    <Box className="w-full max-w-sm mx-auto space-y-4">
      <Button
        onClick={() => setIsOuterOpen(!isOuterOpen)}
        fullWidth
        color="secondary"
      >
        Toggle Outer Content
      </Button>
      <Collapse isOpen={isOuterOpen}>
        <Box className="border border-[var(--patiya-color-border)] rounded-md p-4 space-y-4">
          <p className="text-sm">This is the outer collapse container.</p>
          <Button
            onClick={() => setIsInnerOpen(!isInnerOpen)}
            fullWidth
            variant="outline"
            size="sm"
          >
            Toggle Inner Content
          </Button>
          <Collapse isOpen={isInnerOpen}>
            <Box className="bg-[var(--patiya-color-muted)]/20 rounded-md p-3 text-sm text-[var(--patiya-color-muted-foreground)]">
              This is deeply nested content that dynamically resizes the outer
              container when expanded!
            </Box>
          </Collapse>
        </Box>
      </Collapse>
    </Box>
  );
};

export const CollapseHorizontalPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box className="w-full max-w-sm mx-auto">
      <Box className="flex items-center justify-between p-4 border border-[var(--patiya-color-border)] rounded-t-md bg-[var(--patiya-color-muted)]/10">
        <span className="font-medium text-sm">Notifications</span>
        <Switch
          checked={isOpen}
          onChange={(e) => setIsOpen(e.target.checked)}
        />
      </Box>
      <Collapse isOpen={isOpen}>
        <Box className="border border-t-0 border-[var(--patiya-color-border)] rounded-b-md p-4 space-y-3 bg-[var(--patiya-color-background)]">
          <Box className="flex items-center gap-3">
            <Checkbox defaultChecked />{" "}
            <span className="text-sm">Email alerts</span>
          </Box>
          <Box className="flex items-center gap-3">
            <Checkbox /> <span className="text-sm">SMS alerts</span>
          </Box>
          <Box className="flex items-center gap-3">
            <Checkbox defaultChecked />{" "}
            <span className="text-sm">Push notifications</span>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export const ScrollProgressContainerPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <Box className="w-full max-w-lg border border-[var(--patiya-color-border)] rounded-xl overflow-hidden bg-[var(--patiya-color-card)] shadow-sm">
      <div className="relative">
        <ScrollProgress containerRef={containerRef} height={4} />
      </div>
      <Box className="p-3 border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/20 flex items-center justify-between text-xs text-[var(--patiya-color-muted-foreground)]">
        <span className="font-medium text-[var(--patiya-color-foreground)]">
          Reading Container
        </span>
        <span>Scroll inside container ↓</span>
      </Box>
      <div
        ref={containerRef}
        className="h-44 overflow-y-auto p-4 space-y-3 text-sm text-[var(--patiya-color-muted-foreground)]"
      >
        <p className="font-semibold text-[var(--patiya-color-foreground)]">
          1. Introduction to ScrollProgress
        </p>
        <p>
          In modern web applications, subtle feedback cues elevate everyday user
          interactions into intuitive experiences. Scroll progress indicators
          inform users of their reading depth in long articles, documentation
          guides, and onboarding flows.
        </p>
        <p className="font-semibold text-[var(--patiya-color-foreground)]">
          2. Spring Micro-interactions
        </p>
        <p>
          Micro-interactions provide visual confirmation of state changes.
          Combined with smooth CSS transitions, reading indicators feel alive
          and responsive.
        </p>
        <p className="font-semibold text-[var(--patiya-color-foreground)]">
          3. Targeted Container Binding
        </p>
        <p>
          Whether tracking the entire browser window or targeted scrollable
          containers like modal dialogues, code blocks, or nested sidebars,
          ScrollProgress binds effortlessly to any target via containerRef.
        </p>
        <p className="text-xs text-[var(--patiya-color-primary)] font-medium">
          ✓ You have reached the bottom!
        </p>
      </div>
    </Box>
  );
};

export const ScrollProgressCirclePreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <Box className="relative w-full max-w-lg border border-[var(--patiya-color-border)] rounded-xl overflow-hidden bg-[var(--patiya-color-card)] shadow-sm">
      <Box className="p-3 border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/20 flex items-center justify-between text-xs text-[var(--patiya-color-muted-foreground)]">
        <span className="font-medium text-[var(--patiya-color-foreground)]">
          Circular Gauge with Scroll-To-Top
        </span>
        <span>Scroll down & click circle</span>
      </Box>
      <div
        ref={containerRef}
        className="h-48 overflow-y-auto p-4 space-y-3 text-sm text-[var(--patiya-color-muted-foreground)]"
      >
        <p className="font-semibold text-[var(--patiya-color-foreground)]">
          Executive Summary
        </p>
        <p>
          Patiya UI delivers crafted primitives optimized for speed, precision,
          and beauty. Every component is designed to harmonize with your design
          system while reducing developer friction.
        </p>
        <p>
          As you scroll down through this report, notice how the circular gauge
          at the bottom-right animates smoothly showing the exact completion
          percentage.
        </p>
        <p>
          Hover over the circular gauge to reveal the quick "Back to Top" arrow
          indicator. Clicking the gauge instantly and smoothly glides your view
          right back to the top of the container.
        </p>
        <p className="font-semibold text-[var(--patiya-color-foreground)]">
          Key Performance Metrics
        </p>
        <p>
          Zero external heavy dependencies, lightweight DOM footprint, native
          passive scroll listeners, and responsive mobile adaptation make it
          production-ready out of the box.
        </p>
        <p className="text-xs text-[var(--patiya-color-primary)] font-medium">
          ✓ End of report.
        </p>
      </div>
      <div className="absolute bottom-4 right-4 z-10 pointer-events-auto">
        <ScrollProgress
          variant="circle"
          containerRef={containerRef}
          className="static shadow-lg"
        />
      </div>
    </Box>
  );
};

export const BrowserMockupInteractivePreview = () => {
  const [activeTab, setActiveTab] = useState("preview");
  return (
    <BrowserMockup
      url="https://patiya-ui.dev/dashboard"
      tabs={[
        { id: "preview", title: "Live Preview" },
        { id: "analytics", title: "Analytics" },
        { id: "settings", title: "Config" },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      className="w-full max-w-xl shadow-lg"
    >
      {activeTab === "preview" && (
        <Box className="p-6 space-y-4 bg-gradient-to-br from-[var(--patiya-color-card)] to-[var(--patiya-color-muted)]/30">
          <Box className="flex items-center justify-between">
            <Box>
              <Badge variant="soft" color="primary" size="sm">
                v2.4 Production
              </Badge>
              <h3 className="text-base font-bold text-[var(--patiya-color-foreground)] mt-1.5">
                Design System Dashboard
              </h3>
            </Box>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </Box>
          <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
            Real-time metrics and component telemetry updated across all
            connected client applications.
          </p>
          <Box className="grid grid-cols-3 gap-3 pt-1">
            <Box className="p-3 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]">
              <p className="text-[10px] text-[var(--patiya-color-muted-foreground)] uppercase font-semibold">
                Uptime
              </p>
              <p className="text-base font-bold text-[var(--patiya-color-foreground)] mt-0.5">
                99.99%
              </p>
            </Box>
            <Box className="p-3 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]">
              <p className="text-[10px] text-[var(--patiya-color-muted-foreground)] uppercase font-semibold">
                Latency
              </p>
              <p className="text-base font-bold text-[var(--patiya-color-foreground)] mt-0.5">
                18ms
              </p>
            </Box>
            <Box className="p-3 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]">
              <p className="text-[10px] text-[var(--patiya-color-muted-foreground)] uppercase font-semibold">
                Active Nodes
              </p>
              <p className="text-base font-bold text-[var(--patiya-color-foreground)] mt-0.5">
                42
              </p>
            </Box>
          </Box>
        </Box>
      )}
      {activeTab === "analytics" && (
        <Box className="p-6 space-y-4">
          <p className="text-sm font-semibold text-[var(--patiya-color-foreground)]">
            Traffic & Conversion Metrics
          </p>
          <Box className="space-y-2">
            <Box className="flex justify-between text-xs text-[var(--patiya-color-muted-foreground)]">
              <span>Conversion Rate</span>
              <span className="font-mono font-medium text-[var(--patiya-color-foreground)]">
                4.82% (+1.2%)
              </span>
            </Box>
            <Box className="w-full h-2 rounded-full bg-[var(--patiya-color-muted)] overflow-hidden">
              <Box className="h-full bg-[var(--patiya-color-primary)] rounded-full w-[68%]" />
            </Box>
          </Box>
        </Box>
      )}
      {activeTab === "settings" && (
        <Box className="p-6 space-y-3">
          <p className="text-sm font-semibold text-[var(--patiya-color-foreground)]">
            Mockup Configuration
          </p>
          <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
            Configure custom certificates, dark mode palettes, and title-bar
            controls.
          </p>
        </Box>
      )}
    </BrowserMockup>
  );
};

export const componentsRegistry: Record<string, any> = {
  button: {
    title: "Button",
    description: "Displays a button or a component that looks like a button.",
    props: [
      {
        name: "variant",
        type: "'solid' | 'outline' | 'ghost' | 'soft' | 'link'",
        default: "'solid'",
        description: "The visual style of the button.",
      },
      {
        name: "color",
        type: "PatiyaColor",
        default: "'primary'",
        description: "The color theme of the button.",
      },
      {
        name: "size",
        type: "PatiyaSize",
        default: "'md'",
        description: "The sizing of the button.",
      },
      {
        name: "radius",
        type: "PatiyaRadius",
        default: "'md'",
        description: "The border radius of the button.",
      },
      {
        name: "fullWidth",
        type: "boolean",
        default: "false",
        description:
          "Whether the button should take up the full width of its container.",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        description: "Shows a loading spinner and disables the button.",
      },
      {
        name: "leftIcon",
        type: "React.ReactNode",
        default: "-",
        description: "Icon to display on the left side of the button.",
      },
      {
        name: "rightIcon",
        type: "React.ReactNode",
        default: "-",
        description: "Icon to display on the right side of the button.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Whether the button is disabled.",
      },
    ],
    examples: [
      {
        title: "Primary",
        description: "The default solid primary button.",
        preview: <Button color="primary">Primary Button</Button>,
        code: `<Button color="primary">Primary Button</Button>`,
      },
      {
        title: "Variants",
        description: "Buttons come in various visual styles.",
        preview: (
          <Box className="flex flex-wrap gap-4 justify-center w-full">
            <Button variant="solid" color="primary">
              Solid
            </Button>
            <Button variant="outline" color="secondary">
              Outline
            </Button>
            <Button variant="ghost" color="accent">
              Ghost
            </Button>
            <Button variant="soft" color="destructive">
              Soft
            </Button>
            <Button variant="link" color="primary">
              Link
            </Button>
          </Box>
        ),
        code: `<Button variant="solid" color="primary">Solid</Button>\n<Button variant="outline" color="secondary">Outline</Button>\n<Button variant="ghost" color="accent">Ghost</Button>\n<Button variant="soft" color="destructive">Soft</Button>\n<Button variant="link" color="primary">Link</Button>`,
      },
      {
        title: "Sizes",
        description: "Buttons come in multiple sizes.",
        preview: (
          <Box className="flex flex-wrap items-center gap-4 justify-center w-full">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Box>
        ),
        code: `<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>`,
      },
      {
        title: "Rounded Variants",
        description: "Buttons support various border radius settings.",
        preview: (
          <Box className="flex flex-wrap items-center gap-4 justify-center w-full">
            <Button radius="none">Square</Button>
            <Button radius="sm">Small</Button>
            <Button radius="md">Medium</Button>
            <Button radius="lg">Large</Button>
            <Button radius="full">Pill</Button>
          </Box>
        ),
        code: `<Button radius="none">Square</Button>\n<Button radius="sm">Small</Button>\n<Button radius="md">Medium</Button>\n<Button radius="lg">Large</Button>\n<Button radius="full">Pill</Button>`,
      },
    ],
  },
  input: {
    title: "Input",
    description:
      "Displays a form input field or a component that looks like an input field.",
    props: [
      {
        name: "inputSize",
        type: "PatiyaSize",
        default: "-",
        description: "The size of the input element.",
      },
      {
        name: "variant",
        type: "'outline' | 'filled' | 'soft'",
        default: "-",
        description: "The visual style of the component.",
      },
      {
        name: "invalid",
        type: "boolean",
        default: "-",
        description: "Whether the input is in an invalid or error state.",
      },
      {
        name: "leftIcon",
        type: "React.ReactNode",
        default: "-",
        description: "Icon element to display on the left side.",
      },
      {
        name: "rightIcon",
        type: "React.ReactNode",
        default: "-",
        description: "Icon element to display on the right side.",
      },
      {
        name: "showPasswordToggle",
        type: "boolean",
        default: "false",
        description:
          "Whether to display a built-in eye/eye-off toggle button when type='password'.",
      },
      {
        name: "eyeIcon",
        type: "React.ReactNode",
        default: "-",
        description: "Custom icon when password is hidden.",
      },
      {
        name: "eyeOffIcon",
        type: "React.ReactNode",
        default: "-",
        description: "Custom icon when password is visible.",
      },
      {
        name: "clearable",
        type: "boolean",
        default: "false",
        description:
          "Whether to display a clear button when the input has content.",
      },
      {
        name: "onClear",
        type: "() => void",
        default: "-",
        description: "Callback fired when the clear button is pressed.",
      },
    ],
    examples: [
      {
        title: "Default",
        description: "The default outline input field.",
        preview: (
          <Input
            placeholder="Email address"
            className="max-w-sm w-full"
            aria-label="Email address"
          />
        ),
        code: `<Input placeholder="Email address" />`,
      },
      {
        title: "Variants",
        description: "Available in outline, filled, and soft styling variants.",
        preview: (
          <Box className="flex flex-col gap-3 max-w-sm w-full">
            <Input
              variant="outline"
              placeholder="Outline variant (default)"
              aria-label="Outline variant"
            />
            <Input
              variant="filled"
              placeholder="Filled variant"
              aria-label="Filled variant"
            />
            <Input
              variant="soft"
              placeholder="Soft variant"
              aria-label="Soft variant"
            />
          </Box>
        ),
        code: `<Input variant="outline" placeholder="Outline variant (default)" />\n<Input variant="filled" placeholder="Filled variant" />\n<Input variant="soft" placeholder="Soft variant" />`,
      },
      {
        title: "Sizes",
        description:
          "Inputs come in sm, md, and lg sizes to match any form layout.",
        preview: (
          <Box className="flex flex-col gap-3 max-w-sm w-full">
            <Input
              inputSize="sm"
              placeholder="Small size (sm)"
              aria-label="Small input"
            />
            <Input
              inputSize="md"
              placeholder="Medium size (md - default)"
              aria-label="Medium input"
            />
            <Input
              inputSize="lg"
              placeholder="Large size (lg)"
              aria-label="Large input"
            />
          </Box>
        ),
        code: `<Input inputSize="sm" placeholder="Small size (sm)" />\n<Input inputSize="md" placeholder="Medium size (md)" />\n<Input inputSize="lg" placeholder="Large size (lg)" />`,
      },
      {
        title: "With Left Icon",
        description: "Leading icon for visual hints such as search or email.",
        preview: (
          <Input
            placeholder="Search components..."
            className="max-w-sm w-full"
            aria-label="Search components"
            leftIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            }
          />
        ),
        code: `<Input\n  placeholder="Search components..."\n  leftIcon={\n    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>\n  }\n/>`,
      },
      {
        title: "With Right Icon & Shortcut",
        description: "Trailing icon or keyboard shortcut badge.",
        preview: (
          <Input
            placeholder="Quick search..."
            className="max-w-sm w-full"
            aria-label="Quick search"
            leftIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            }
            rightIcon={<Kbd size="sm">⌘K</Kbd>}
          />
        ),
        code: `<Input\n  placeholder="Quick search..."\n  leftIcon={<SearchIcon />}\n  rightIcon={<Kbd size="sm">⌘K</Kbd>}\n/>`,
      },
      {
        title: "Password with Toggle",
        description:
          "Built-in visibility toggle handled internally without manual state.",
        preview: (
          <Input
            type="password"
            showPasswordToggle
            placeholder="Enter your password..."
            className="max-w-sm w-full"
            aria-label="Password"
          />
        ),
        code: `<Input\n  type="password"\n  showPasswordToggle\n  placeholder="Enter your password..."\n/>`,
      },
      {
        title: "Clearable Input",
        description:
          "Built-in clear button handled internally without manual state.",
        preview: (
          <Input
            clearable
            defaultValue="Search documentation"
            placeholder="Type query..."
            className="max-w-sm w-full"
            aria-label="Clearable search"
            leftIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            }
          />
        ),
        code: `<Input\n  clearable\n  placeholder="Type query..."\n  leftIcon={<SearchIcon />}\n/>`,
      },
      {
        title: "Invalid State",
        description:
          "Error boundary styling with descriptive validation message.",
        preview: (
          <Box className="flex flex-col gap-1.5 max-w-sm w-full">
            <Input
              defaultValue="invalid-email@"
              invalid={true}
              placeholder="Email address"
              aria-label="Email address with error"
            />
            <span className="text-xs text-[var(--patiya-color-destructive)]">
              Please enter a valid email address.
            </span>
          </Box>
        ),
        code: `<Box className="flex flex-col gap-1.5">\n  <Input defaultValue="invalid-email@" invalid={true} />\n  <span className="text-xs text-[var(--patiya-color-destructive)]">\n    Please enter a valid email address.\n  </span>\n</Box>`,
      },
      {
        title: "With Label & Helper Text",
        description:
          "Structured form field with top label and bottom helper instructions.",
        preview: (
          <Box className="flex flex-col gap-1.5 max-w-sm w-full">
            <label className="text-xs font-semibold text-[var(--patiya-color-foreground)] flex items-center justify-between">
              <span>Workspace Identifier</span>
              <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] font-normal">
                Optional
              </span>
            </label>
            <Input placeholder="acme-corp" aria-label="Workspace Identifier" />
            <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
              Your public workspace URL will be patiya.ui/acme-corp
            </span>
          </Box>
        ),
        code: `<Box className="flex flex-col gap-1.5">\n  <label className="text-xs font-semibold flex justify-between">\n    <span>Workspace Identifier</span>\n    <span className="text-xs text-muted-foreground">Optional</span>\n  </label>\n  <Input placeholder="acme-corp" />\n  <span className="text-xs text-muted-foreground">\n    Your public workspace URL will be patiya.ui/acme-corp\n  </span>\n</Box>`,
      },
      {
        title: "Disabled",
        description: "A disabled input field preventing user interaction.",
        preview: (
          <Input
            placeholder="Disabled input"
            disabled
            className="max-w-sm w-full"
            aria-label="Disabled input"
          />
        ),
        code: `<Input placeholder="Disabled input" disabled />`,
      },
    ],
  },
  card: {
    title: "Card",
    description: "Displays a card with header, content, and footer.",
    installation: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'patiya';`,
    examples: [
      {
        title: "Project Form",
        preview: <CardPreview />,
        code: `<Card className="w-[350px]">\n  <CardHeader>\n    <CardTitle>Create project</CardTitle>\n    <CardDescription>Deploy your new project.</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <Input placeholder="Name of your project" />\n  </CardContent>\n  <CardFooter className="flex justify-between">\n    <Button variant="outline">Cancel</Button>\n    <Button>Deploy</Button>\n  </CardFooter>\n</Card>`,
      },
      {
        title: "Login Card",
        preview: (
          <Card className="w-[350px] mx-auto">
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Email" type="email" />
              <Input placeholder="Password" type="password" />
            </CardContent>
            <CardFooter>
              <Button fullWidth>Sign In</Button>
            </CardFooter>
          </Card>
        ),
        code: `<Card>\n  <CardHeader>\n    <CardTitle>Welcome back</CardTitle>\n  </CardHeader>\n  <CardContent>\n    <Input placeholder="Email" />\n  </CardContent>\n  <CardFooter>\n    <Button fullWidth>Sign In</Button>\n  </CardFooter>\n</Card>`,
      },
    ],
  },
  avatar: {
    title: "Avatar",
    description: "An image element with a fallback for representing the user.",
    props: [
      {
        name: "src",
        type: "string",
        default: "-",
        description: "The URL of the avatar image.",
      },
      {
        name: "alt",
        type: "string",
        default: "'Avatar'",
        description: "The alt text for the image.",
      },
      {
        name: "initials",
        type: "string",
        default: "-",
        description:
          "Initials to show if the image fails to load or no src is provided.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: "The size of the avatar.",
      },
      {
        name: "shape",
        type: "'circle' | 'square'",
        default: "'circle'",
        description: "The shape of the avatar.",
      },
    ],
    examples: [
      {
        title: "With Image",
        preview: <AvatarPreview />,
        code: `<Avatar src="https://github.com/shadcn.png" alt="u-avatar" size="lg" />`,
      },
      {
        title: "Initials Fallback",
        preview: (
          <Box className="flex gap-4 items-center">
            <Avatar
              initials="AK"
              size="md"
              className="bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)]"
            />
            <Avatar
              initials="JD"
              size="lg"
              className="bg-[var(--patiya-color-accent)] text-[var(--patiya-color-accent-foreground)]"
            />
          </Box>
        ),
        code: `<Avatar initials="AK" className="bg-blue-500 text-white" />`,
      },
      {
        title: "Square Shape",
        preview: (
          <Avatar
            shape="square"
            src="https://i.pravatar.cc/150?u=2"
            size="lg"
          />
        ),
        code: `<Avatar shape="square" src="https://i.pravatar.cc/150" />`,
      },
      {
        title: "Avatar Group",
        preview: (
          <Box className="flex -space-x-3">
            <Avatar
              src="https://i.pravatar.cc/150?u=1"
              className="ring-2 ring-white dark:ring-zinc-950"
            />
            <Avatar
              src="https://i.pravatar.cc/150?u=2"
              className="ring-2 ring-white dark:ring-zinc-950"
            />
            <Avatar
              src="https://i.pravatar.cc/150?u=3"
              className="ring-2 ring-white dark:ring-zinc-950"
            />
            <Avatar
              initials="+3"
              className="ring-2 ring-white dark:ring-zinc-950 bg-gray-100 text-gray-600"
            />
          </Box>
        ),
        code: `<Box className="flex -space-x-3">\n  <Avatar src="https://i.pravatar.cc/150" className="ring-2 ring-white" />\n  <Avatar initials="+3" className="ring-2 ring-white" />\n</Box>`,
      },
    ],
  },
  chip: {
    title: "Chip",
    description:
      "A compact element that represents an input, attribute, or action.",
    installation: `import { Chip } from 'patiya';`,
    props: [
      {
        name: "color",
        type: "PatiyaColor",
        default: "-",
        description: "The semantic color theme of the component.",
      },
      {
        name: "variant",
        type: "PatiyaVariant",
        default: "-",
        description: "The visual style of the component.",
      },
      {
        name: "size",
        type: "PatiyaSize",
        default: "-",
        description: "The size of the component.",
      },
      {
        name: "radius",
        type: "PatiyaRadius",
        default: "-",
        description: "The border radius of the component.",
      },
      {
        name: "onClose",
        type: "() => void",
        default: "-",
        description:
          "Callback function triggered when the component is closed or dismissed.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "-",
        description: "Whether the component is disabled.",
      },
    ],
    examples: [
      {
        title: "Solid",
        preview: <ChipPreview />,
        code: `<Chip color="primary" variant="solid">Primary</Chip>`,
      },
      {
        title: "Removable",
        preview: (
          <Chip color="accent" variant="soft" onClose={() => alert("close")}>
            Removable Chip
          </Chip>
        ),
        code: `<Chip color="accent" variant="soft" onClose={() => alert('close')}>Removable</Chip>`,
      },
      {
        title: "Outline",
        preview: (
          <Chip color="secondary" variant="outline">
            Outline
          </Chip>
        ),
        code: `<Chip color="secondary" variant="outline">Outline</Chip>`,
      },
      {
        title: "Sizes",
        preview: (
          <Box className="flex gap-4 items-center flex-wrap">
            <Chip className="text-xs px-2 py-0.5">Small</Chip>
            <Chip>Default</Chip>
            <Chip className="text-base px-4 py-1.5">Large</Chip>
          </Box>
        ),
        code: `<Chip className="text-xs">Small</Chip>\n<Chip>Default</Chip>\n<Chip className="text-base">Large</Chip>`,
      },
    ],
  },
  table: {
    title: "Table",
    description: "A responsive table component for displaying data.",
    installation: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from 'patiya';`,
    examples: [
      {
        title: "Invoice Table",
        preview: <TablePreview />,
        code: `<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Head</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell>Cell</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
      },
      {
        title: "Simple Data",
        preview: (
          <Table className="max-w-md w-full">
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Alice</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob</TableCell>
                <TableCell>Editor</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ),
        code: `<Table className="max-w-md w-full">\n  <TableHeader>\n    <TableRow>\n      <TableHead>User</TableHead>\n      <TableHead>Role</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell>Alice</TableCell>\n      <TableCell>Admin</TableCell>\n    </TableRow>\n    <TableRow>\n      <TableCell>Bob</TableCell>\n      <TableCell>Editor</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
      },
      {
        title: "Hoverable Rows",
        preview: (
          <Table className="max-w-md w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>System</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors">
                <TableCell>Online</TableCell>
                <TableCell>API</TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors">
                <TableCell>Degraded</TableCell>
                <TableCell>Database</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ),
        code: `<TableRow className="hover:bg-gray-50 cursor-pointer transition-colors">\n  <TableCell>Online</TableCell>\n  <TableCell>API</TableCell>\n</TableRow>`,
      },
    ],
  },
  timeline: {
    title: "Timeline",
    description: "Displays a list of events in chronological order.",
    installation: `import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineDot, TimelineContent } from 'patiya';`,
    examples: [
      {
        title: "Order Tracking",
        preview: <TimelinePreview />,
        code: `<Timeline>\n  <TimelineItem>\n    <TimelineSeparator>\n      <TimelineDot />\n      <TimelineConnector />\n    </TimelineSeparator>\n    <TimelineContent>Event 1</TimelineContent>\n  </TimelineItem>\n</Timeline>`,
      },
      {
        title: "Minimal",
        preview: (
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="solid" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="pb-4">Step 1</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="muted" />
              </TimelineSeparator>
              <TimelineContent>Step 2</TimelineContent>
            </TimelineItem>
          </Timeline>
        ),
        code: `<Timeline>\n  <TimelineItem>\n    <TimelineSeparator>\n      <TimelineDot color="primary" variant="solid" />\n      <TimelineConnector />\n    </TimelineSeparator>\n    <TimelineContent className="pb-4">Step 1</TimelineContent>\n  </TimelineItem>\n  <TimelineItem>\n    <TimelineSeparator>\n      <TimelineDot color="muted" />\n    </TimelineSeparator>\n    <TimelineContent>Step 2</TimelineContent>\n  </TimelineItem>\n</Timeline>`,
      },
      {
        title: "With Status Colors",
        preview: (
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="solid" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="pb-6 text-sm">
                Created
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="accent" variant="solid" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="pb-6 text-sm">
                Shipped
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="destructive" variant="solid" />
              </TimelineSeparator>
              <TimelineContent className="text-sm">Delayed</TimelineContent>
            </TimelineItem>
          </Timeline>
        ),
        code: `<TimelineDot color="primary" />\n<TimelineDot color="accent" />\n<TimelineDot color="destructive" />`,
      },
    ],
  },
  stepper: {
    title: "Stepper",
    description:
      "A component that displays progress through a sequence of logical and numbered steps.",
    installation: `import { Stepper, Step, StepIndicator, StepTitle, StepSeparator } from 'patiya';`,
    examples: [
      {
        title: "Checkout Steps",
        preview: <StepperPreview />,
        code: `<Stepper>\n  <Step completed className="flex-1">\n    <StepIndicator completed>1</StepIndicator>\n    <StepTitle>Account</StepTitle>\n    <StepSeparator />\n  </Step>\n  <Step active>\n    <StepIndicator active>2</StepIndicator>\n    <StepTitle>Shipping</StepTitle>\n  </Step>\n</Stepper>`,
      },
      {
        title: "Simple Form Steps",
        preview: (
          <Stepper className="max-w-md w-full mx-auto">
            <Step completed className="flex-1">
              <StepIndicator completed>1</StepIndicator>
              <StepSeparator />
            </Step>
            <Step completed className="flex-1">
              <StepIndicator completed>2</StepIndicator>
              <StepSeparator />
            </Step>
            <Step active>
              <StepIndicator active>3</StepIndicator>
            </Step>
          </Stepper>
        ),
        code: `<Stepper className="max-w-md w-full mx-auto">\n  <Step completed className="flex-1">\n    <StepIndicator completed>1</StepIndicator>\n    <StepSeparator />\n  </Step>\n  <Step completed className="flex-1">\n    <StepIndicator completed>2</StepIndicator>\n    <StepSeparator />\n  </Step>\n  <Step active>\n    <StepIndicator active>3</StepIndicator>\n  </Step>\n</Stepper>`,
      },
      {
        title: "Error State Step",
        preview: (
          <Stepper className="max-w-md w-full mx-auto">
            <Step completed className="flex-1">
              <StepIndicator completed>1</StepIndicator>
              <StepTitle>User</StepTitle>
              <StepSeparator />
            </Step>
            <Step active className="flex-1 text-red-500">
              <StepIndicator className="border-red-500 bg-red-50 text-red-500">
                2
              </StepIndicator>
              <StepTitle className="text-red-500">Payment Failed</StepTitle>
              <StepSeparator />
            </Step>
            <Step>
              <StepIndicator>3</StepIndicator>
              <StepTitle>Confirm</StepTitle>
            </Step>
          </Stepper>
        ),
        code: `<Stepper className="max-w-md w-full mx-auto">\n  <Step completed className="flex-1">\n    <StepIndicator completed>1</StepIndicator>\n    <StepTitle>User</StepTitle>\n    <StepSeparator />\n  </Step>\n  <Step active className="flex-1 text-red-500">\n    <StepIndicator className="border-red-500 bg-red-50 text-red-500">2</StepIndicator>\n    <StepTitle className="text-red-500">Payment Failed</StepTitle>\n    <StepSeparator />\n  </Step>\n  <Step>\n    <StepIndicator>3</StepIndicator>\n    <StepTitle>Confirm</StepTitle>\n  </Step>\n</Stepper>`,
      },
    ],
  },
  stat: {
    title: "Stat",
    description:
      "Displays statistics, metrics, KPIs, and quantitative indicators with trend badges.",
    installation: `import { Stat, StatLabel, StatValue, StatTrend, StatHelpText, StatGroup } from 'patiya';`,
    examples: [
      {
        title: "KPI Dashboard Cards",
        description:
          "Standard card-style metric displays with trend indicators and comparison subtitles.",
        preview: <StatPreview />,
        code: `<StatGroup columns={3}>\n  <Stat variant="card">\n    <StatLabel>Total Revenue</StatLabel>\n    <StatValue prefix="$">45,231.89</StatValue>\n    <div className="flex items-center gap-2 mt-1">\n      <StatTrend direction="up">+20.1%</StatTrend>\n      <StatHelpText>from last month</StatHelpText>\n    </div>\n  </Stat>\n  <Stat variant="card">\n    <StatLabel>Active Subscriptions</StatLabel>\n    <StatValue prefix="+">2,350</StatValue>\n    <div className="flex items-center gap-2 mt-1">\n      <StatTrend direction="up">+180.1%</StatTrend>\n      <StatHelpText>from last quarter</StatHelpText>\n    </div>\n  </Stat>\n  <Stat variant="card">\n    <StatLabel>Churn Rate</StatLabel>\n    <StatValue suffix="%">1.2</StatValue>\n    <div className="flex items-center gap-2 mt-1">\n      <StatTrend direction="down">-0.4%</StatTrend>\n      <StatHelpText>all-time low</StatHelpText>\n    </div>\n  </Stat>\n</StatGroup>`,
      },
      {
        title: "System Performance & Telemetry",
        description:
          "Compact telemetry stats with contextual icons and inline trends.",
        preview: (
          <div className="w-full max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Stat variant="bordered">
              <StatLabel
                icon={
                  <svg
                    className="w-3.5 h-3.5 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                }
              >
                CPU Usage
              </StatLabel>
              <StatValue suffix="%">38.4</StatValue>
              <div className="flex items-center gap-2 mt-1">
                <StatTrend direction="neutral" variant="text">
                  Stable
                </StatTrend>
                <StatHelpText>8 cores allocated</StatHelpText>
              </div>
            </Stat>
            <Stat variant="bordered">
              <StatLabel
                icon={
                  <svg
                    className="w-3.5 h-3.5 text-emerald-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                }
              >
                API Latency
              </StatLabel>
              <StatValue suffix="ms">24</StatValue>
              <div className="flex items-center gap-2 mt-1">
                <StatTrend direction="down" variant="badge">
                  -14ms
                </StatTrend>
                <StatHelpText>p99 response</StatHelpText>
              </div>
            </Stat>
            <Stat variant="bordered">
              <StatLabel
                icon={
                  <svg
                    className="w-3.5 h-3.5 text-sky-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                }
              >
                Cost per 1k req
              </StatLabel>
              <StatValue prefix="$">0.002</StatValue>
              <div className="flex items-center gap-2 mt-1">
                <StatTrend direction="down" variant="badge">
                  -8.2%
                </StatTrend>
                <StatHelpText>optimized caching</StatHelpText>
              </div>
            </Stat>
          </div>
        ),
        code: `<Stat variant="bordered">\n  <StatLabel icon={<CpuIcon />}>CPU Usage</StatLabel>\n  <StatValue suffix="%">38.4</StatValue>\n  <div className="flex items-center gap-2 mt-1">\n    <StatTrend direction="neutral" variant="text">Stable</StatTrend>\n    <StatHelpText>8 cores allocated</StatHelpText>\n  </div>\n</Stat>`,
      },
      {
        title: "Inline Minimal Display",
        description:
          "Borderless stats designed for user profile banners or hero stat counters.",
        preview: (
          <div className="flex flex-wrap items-center justify-around gap-8 p-6 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/20 w-full max-w-xl mx-auto">
            <Stat size="sm">
              <StatLabel>Repositories</StatLabel>
              <StatValue>128</StatValue>
              <StatHelpText>Public & private</StatHelpText>
            </Stat>
            <div className="w-px h-10 bg-[var(--patiya-color-border)] hidden sm:block" />
            <Stat size="sm">
              <StatLabel>Followers</StatLabel>
              <StatValue>14.2k</StatValue>
              <StatHelpText>+342 this week</StatHelpText>
            </Stat>
            <div className="w-px h-10 bg-[var(--patiya-color-border)] hidden sm:block" />
            <Stat size="sm">
              <StatLabel>Contributions</StatLabel>
              <StatValue>2,841</StatValue>
              <StatHelpText>in the last year</StatHelpText>
            </Stat>
          </div>
        ),
        code: `<div className="flex items-center gap-8">\n  <Stat size="sm">\n    <StatLabel>Followers</StatLabel>\n    <StatValue>14.2k</StatValue>\n    <StatHelpText>+342 this week</StatHelpText>\n  </Stat>\n</div>`,
      },
    ],
    props: [
      {
        name: "variant",
        type: "'default' | 'card' | 'bordered'",
        default: "'default'",
        description: "Visual container style for the stat metric.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: "Scale preset controlling typography size and spacing.",
      },
      {
        name: "className",
        type: "string",
        default: "-",
        description: "Additional CSS classes to apply.",
      },
      {
        name: "StatLabel.icon",
        type: "React.ReactNode",
        default: "-",
        description: "Optional leading icon next to the stat title.",
      },
      {
        name: "StatValue.prefix",
        type: "React.ReactNode",
        default: "-",
        description:
          "Currency symbol or prefix placed before the metric value.",
      },
      {
        name: "StatValue.suffix",
        type: "React.ReactNode",
        default: "-",
        description: "Unit or percentage suffix placed after the metric value.",
      },
      {
        name: "StatTrend.direction",
        type: "'up' | 'down' | 'neutral'",
        default: "'neutral'",
        description:
          "Directional indicator with arrow icon and semantic coloring.",
      },
      {
        name: "StatTrend.variant",
        type: "'badge' | 'text'",
        default: "'badge'",
        description: "Style mode as a rounded pill badge or plain inline text.",
      },
      {
        name: "StatGroup.columns",
        type: "1 | 2 | 3 | 4",
        default: "3",
        description:
          "Responsive grid columns count for grouping multiple stats.",
      },
    ],
  },
  "data-list": {
    title: "Data List",
    description:
      "Displays structured key-value pairs, metadata, and technical specifications with customizable layouts.",
    installation: `import { DataList, DataListItem, DataListLabel, DataListValue } from 'patiya';`,
    examples: [
      {
        title: "Bordered Order Details",
        description:
          "Card-style divided metadata list with copyable values and status chips.",
        preview: <DataListPreview />,
        code: `<DataList variant="bordered">\n  <DataListItem>\n    <DataListLabel>Order ID</DataListLabel>\n    <DataListValue copyable copyText="#ORD-98231">\n      #ORD-98231\n    </DataListValue>\n  </DataListItem>\n  <DataListItem>\n    <DataListLabel>Customer</DataListLabel>\n    <DataListValue>Sarah Jenkins (sarah.j@example.com)</DataListValue>\n  </DataListItem>\n  <DataListItem>\n    <DataListLabel>Amount</DataListLabel>\n    <DataListValue>$349.00 USD</DataListValue>\n  </DataListItem>\n  <DataListItem>\n    <DataListLabel>Status</DataListLabel>\n    <DataListValue>\n      <Badge variant="outline">Fulfilled</Badge>\n    </DataListValue>\n  </DataListItem>\n</DataList>`,
      },
      {
        title: "Striped Server Specifications",
        description: "Zebra-striped horizontal technical spec sheet.",
        preview: (
          <div className="w-full max-w-xl mx-auto">
            <DataList variant="striped" size="sm">
              <DataListItem>
                <DataListLabel>Host Name</DataListLabel>
                <DataListValue
                  copyable
                  copyText="aws-us-east-cluster-01.internal"
                >
                  <span className="font-mono text-xs">
                    aws-us-east-cluster-01.internal
                  </span>
                </DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListLabel>Runtime</DataListLabel>
                <DataListValue>Node.js v22.14 LTS (Bun 1.2)</DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListLabel>Memory Allocated</DataListLabel>
                <DataListValue>
                  32 GB / 64 GB DDR5 (50% utilization)
                </DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListLabel>SSL Certificate</DataListLabel>
                <DataListValue>
                  <span className="flex items-center gap-1.5 text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    Valid (Renews in 78 days)
                  </span>
                </DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListLabel>Egress IP</DataListLabel>
                <DataListValue copyable copyText="54.210.142.89">
                  <span className="font-mono text-xs">54.210.142.89</span>
                </DataListValue>
              </DataListItem>
            </DataList>
          </div>
        ),
        code: `<DataList variant="striped" size="sm">\n  <DataListItem>\n    <DataListLabel>Host Name</DataListLabel>\n    <DataListValue copyable>aws-us-east-cluster-01.internal</DataListValue>\n  </DataListItem>\n  <DataListItem>\n    <DataListLabel>Runtime</DataListLabel>\n    <DataListValue>Node.js v22.14 LTS</DataListValue>\n  </DataListItem>\n</DataList>`,
      },
      {
        title: "Vertical Alignment Form Style",
        description:
          "Vertical stacked metadata list suitable for sidebar panels or compact dialogs.",
        preview: (
          <div className="w-full max-w-sm mx-auto p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]">
            <DataList orientation="vertical" size="sm">
              <DataListItem>
                <DataListLabel>Workspace Slug</DataListLabel>
                <DataListValue copyable copyText="acme-corp-hq">
                  <span className="font-mono text-xs">acme-corp-hq</span>
                </DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListLabel>Primary Domain</DataListLabel>
                <DataListValue>
                  <span className="text-[var(--patiya-color-primary)] underline cursor-pointer">
                    acme.example.com
                  </span>
                </DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListLabel>Billing Plan</DataListLabel>
                <DataListValue>Enterprise Tier ($1,200/mo)</DataListValue>
              </DataListItem>
            </DataList>
          </div>
        ),
        code: `<DataList orientation="vertical" size="sm">\n  <DataListItem>\n    <DataListLabel>Workspace Slug</DataListLabel>\n    <DataListValue copyable>acme-corp-hq</DataListValue>\n  </DataListItem>\n  <DataListItem>\n    <DataListLabel>Primary Domain</DataListLabel>\n    <DataListValue>acme.example.com</DataListValue>\n  </DataListItem>\n</DataList>`,
      },
    ],
    props: [
      {
        name: "orientation",
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description:
          "Layout direction aligning labels and values side-by-side or stacked.",
      },
      {
        name: "variant",
        type: "'plain' | 'striped' | 'divided' | 'bordered'",
        default: "'plain'",
        description:
          "Styling variant with dividing lines, alternating stripes, or card border.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: "Typography size and vertical row padding density.",
      },
      {
        name: "className",
        type: "string",
        default: "-",
        description: "Additional CSS classes to apply.",
      },
      {
        name: "DataListItem.align",
        type: "'start' | 'center' | 'baseline'",
        default: "'center'",
        description:
          "Cross-axis alignment between the label and value columns.",
      },
      {
        name: "DataListLabel.icon",
        type: "React.ReactNode",
        default: "-",
        description: "Optional icon element preceding the label.",
      },
      {
        name: "DataListValue.copyable",
        type: "boolean",
        default: "false",
        description:
          "Whether to render a one-click copy button next to the value.",
      },
      {
        name: "DataListValue.copyText",
        type: "string",
        default: "-",
        description: "Custom text string to write to clipboard when copied.",
      },
    ],
  },
  dataList: {
    title: "Data List",
    description:
      "Displays structured key-value pairs, metadata, and technical specifications with customizable layouts.",
    installation: `import { DataList, DataListItem, DataListLabel, DataListValue } from 'patiya';`,
    examples: [
      {
        title: "Bordered Order Details",
        description:
          "Card-style divided metadata list with copyable values and status chips.",
        preview: <DataListPreview />,
        code: `<DataList variant="bordered">\n  <DataListItem>\n    <DataListLabel>Order ID</DataListLabel>\n    <DataListValue copyable copyText="#ORD-98231">\n      #ORD-98231\n    </DataListValue>\n  </DataListItem>\n  <DataListItem>\n    <DataListLabel>Customer</DataListLabel>\n    <DataListValue>Sarah Jenkins (sarah.j@example.com)</DataListValue>\n  </DataListItem>\n  <DataListItem>\n    <DataListLabel>Amount</DataListLabel>\n    <DataListValue>$349.00 USD</DataListValue>\n  </DataListItem>\n</DataList>`,
      },
    ],
    props: [
      {
        name: "orientation",
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description:
          "Layout direction aligning labels and values side-by-side or stacked.",
      },
      {
        name: "variant",
        type: "'plain' | 'striped' | 'divided' | 'bordered'",
        default: "'plain'",
        description:
          "Styling variant with dividing lines, alternating stripes, or card border.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: "Typography size and vertical row padding density.",
      },
      {
        name: "className",
        type: "string",
        default: "-",
        description: "Additional CSS classes to apply.",
      },
      {
        name: "DataListItem.align",
        type: "'start' | 'center' | 'baseline'",
        default: "'center'",
        description:
          "Cross-axis alignment between the label and value columns.",
      },
      {
        name: "DataListLabel.icon",
        type: "React.ReactNode",
        default: "-",
        description: "Optional icon element preceding the label.",
      },
      {
        name: "DataListValue.copyable",
        type: "boolean",
        default: "false",
        description:
          "Whether to render a one-click copy button next to the value.",
      },
      {
        name: "DataListValue.copyText",
        type: "string",
        default: "-",
        description: "Custom text string to write to clipboard when copied.",
      },
    ],
  },
  "tree-view": {
    title: "Tree View",
    description:
      "Hierarchical interactive data display with collapsible folder nodes, custom icons, and guide lines.",
    installation: `import { TreeView, TreeItem } from 'patiya';`,
    examples: [
      {
        title: "Project File Explorer",
        description:
          "Collapsible directory tree with branch connector lines, badges, and file type icons.",
        preview: <TreeViewPreview />,
        code: `<TreeView defaultExpandedKeys={["root", "src", "components"]}>\n  <TreeItem id="root" label="patiya-ui" icon={<FolderIcon />}>\n    <TreeItem id="src" label="src" icon={<FolderIcon />}>\n      <TreeItem id="components" label="components" icon={<FolderIcon />}>\n        <TreeItem id="stat" label="Stat.tsx" icon={<CodeIcon />} badge={<Badge>New</Badge>} />\n        <TreeItem id="datalist" label="DataList.tsx" icon={<CodeIcon />} badge={<Badge>New</Badge>} />\n        <TreeItem id="treeview" label="TreeView.tsx" icon={<CodeIcon />} badge={<Badge>New</Badge>} />\n      </TreeItem>\n    </TreeItem>\n  </TreeItem>\n</TreeView>`,
      },
      {
        title: "Organizational Teams Hierarchy",
        description:
          "Multi-department organizational structure with member count badges.",
        preview: (
          <div className="w-full max-w-md mx-auto p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]">
            <TreeView defaultExpandedKeys={["org", "eng"]}>
              <TreeItem
                id="org"
                label="Acme Technologies"
                badge={
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-4"
                  >
                    42 members
                  </Badge>
                }
              >
                <TreeItem
                  id="eng"
                  label="Engineering & Ops"
                  badge={
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 h-4"
                    >
                      26
                    </Badge>
                  }
                >
                  <TreeItem
                    id="fe"
                    label="Frontend Core (React, Next.js)"
                    badge={
                      <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                        8
                      </span>
                    }
                  />
                  <TreeItem
                    id="be"
                    label="Platform Services (Go, Rust)"
                    badge={
                      <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                        12
                      </span>
                    }
                  />
                  <TreeItem
                    id="devops"
                    label="Cloud Infrastructure (Kubernetes, AWS)"
                    badge={
                      <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                        6
                      </span>
                    }
                  />
                </TreeItem>
                <TreeItem
                  id="design"
                  label="Design & Product"
                  badge={
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 h-4"
                    >
                      16
                    </Badge>
                  }
                >
                  <TreeItem
                    id="uiux"
                    label="Product Designers"
                    badge={
                      <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                        10
                      </span>
                    }
                  />
                  <TreeItem
                    id="research"
                    label="UX Research & Analytics"
                    badge={
                      <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                        6
                      </span>
                    }
                  />
                </TreeItem>
              </TreeItem>
            </TreeView>
          </div>
        ),
        code: `<TreeView defaultExpandedKeys={["org", "eng"]}>\n  <TreeItem id="org" label="Acme Technologies" badge={<Badge>42 members</Badge>}>\n    <TreeItem id="eng" label="Engineering & Ops" badge={<Badge>26</Badge>}>\n      <TreeItem id="fe" label="Frontend Core" />\n      <TreeItem id="be" label="Platform Services" />\n    </TreeItem>\n  </TreeItem>\n</TreeView>`,
      },
      {
        title: "API Endpoints & Routing",
        description:
          "Interactive REST endpoint tree with HTTP method badges and route parameters.",
        preview: (
          <div className="w-full max-w-lg mx-auto p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]">
            <TreeView defaultExpandedKeys={["api", "v1", "users"]}>
              <TreeItem
                id="api"
                label="api.gateway.io"
                badge={
                  <Badge
                    variant="outline"
                    className="text-[10px] text-emerald-600 bg-emerald-500/10 border-emerald-500/20 px-1.5 py-0 h-4"
                  >
                    v2.4 Active
                  </Badge>
                }
              >
                <TreeItem id="v1" label="/v1">
                  <TreeItem id="users" label="/users">
                    <TreeItem
                      id="get-users"
                      label="listAllUsers()"
                      badge={
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          GET
                        </span>
                      }
                    />
                    <TreeItem
                      id="post-users"
                      label="createUser()"
                      badge={
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-600 dark:text-blue-400">
                          POST
                        </span>
                      }
                    />
                    <TreeItem id="user-by-id" label="/:id">
                      <TreeItem
                        id="get-user-id"
                        label="getUserProfile()"
                        badge={
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                            GET
                          </span>
                        }
                      />
                      <TreeItem
                        id="delete-user-id"
                        label="deleteUser()"
                        badge={
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400">
                            DELETE
                          </span>
                        }
                      />
                    </TreeItem>
                  </TreeItem>
                  <TreeItem id="auth" label="/auth">
                    <TreeItem
                      id="post-login"
                      label="loginWithPassword()"
                      badge={
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-600 dark:text-blue-400">
                          POST
                        </span>
                      }
                    />
                    <TreeItem
                      id="post-passkey"
                      label="verifyPasskey()"
                      badge={
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-600 dark:text-blue-400">
                          POST
                        </span>
                      }
                    />
                  </TreeItem>
                </TreeItem>
              </TreeItem>
            </TreeView>
          </div>
        ),
        code: `<TreeView defaultExpandedKeys={["api", "v1", "users"]}>\n  <TreeItem id="api" label="api.gateway.io">\n    <TreeItem id="v1" label="/v1">\n      <TreeItem id="users" label="/users">\n        <TreeItem id="get-users" label="listAllUsers()" badge={<span className="bg-emerald-500/15 text-emerald-600 px-1.5 py-0.5 rounded font-mono text-[10px] font-bold">GET</span>} />\n        <TreeItem id="post-users" label="createUser()" badge={<span className="bg-blue-500/15 text-blue-600 px-1.5 py-0.5 rounded font-mono text-[10px] font-bold">POST</span>} />\n      </TreeItem>\n    </TreeItem>\n  </TreeItem>\n</TreeView>`,
      },
      {
        title: "Access Permissions & Security",
        description:
          "Multi-level RBAC role permission tree with access status indicators.",
        preview: (
          <div className="w-full max-w-md mx-auto p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]">
            <TreeView defaultExpandedKeys={["security", "auth-settings"]}>
              <TreeItem
                id="security"
                label="Security & Governance"
                icon={
                  <svg
                    className="w-4 h-4 text-emerald-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                }
              >
                <TreeItem id="auth-settings" label="Authentication Policies">
                  <TreeItem
                    id="mfa"
                    label="Multi-Factor Authentication"
                    badge={
                      <Badge
                        variant="outline"
                        className="text-[10px] text-emerald-600 border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0 h-4"
                      >
                        Enforced
                      </Badge>
                    }
                  />
                  <TreeItem
                    id="sso"
                    label="SAML 2.0 Single Sign-On"
                    badge={
                      <Badge
                        variant="outline"
                        className="text-[10px] text-sky-600 border-sky-500/30 bg-sky-500/10 px-1.5 py-0 h-4"
                      >
                        Active
                      </Badge>
                    }
                  />
                  <TreeItem
                    id="session-timeout"
                    label="Idle Session Expiry (15m)"
                    badge={
                      <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                        Enabled
                      </span>
                    }
                  />
                </TreeItem>
                <TreeItem id="data-governance" label="Data Governance">
                  <TreeItem
                    id="audit-logs"
                    label="Immutable Audit Logs"
                    badge={
                      <Badge
                        variant="outline"
                        className="text-[10px] text-amber-600 border-amber-500/30 bg-amber-500/10 px-1.5 py-0 h-4"
                      >
                        Admin Only
                      </Badge>
                    }
                  />
                  <TreeItem
                    id="backup"
                    label="Automated Daily Backups"
                    badge={
                      <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                        02:00 UTC
                      </span>
                    }
                  />
                </TreeItem>
              </TreeItem>
            </TreeView>
          </div>
        ),
        code: `<TreeView defaultExpandedKeys={["security", "auth-settings"]}>\n  <TreeItem id="security" label="Security & Governance" icon={<ShieldIcon />}>\n    <TreeItem id="auth-settings" label="Authentication Policies">\n      <TreeItem id="mfa" label="Multi-Factor Authentication" badge={<Badge>Enforced</Badge>} />\n      <TreeItem id="sso" label="SAML 2.0 SSO" badge={<Badge>Active</Badge>} />\n    </TreeItem>\n  </TreeItem>\n</TreeView>`,
      },
      {
        title: "Cloud Storage Bucket",
        description:
          "Cloud storage object directory with file-type icons and size badges.",
        preview: (
          <div className="w-full max-w-lg mx-auto p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]">
            <TreeView defaultExpandedKeys={["bucket", "images"]}>
              <TreeItem
                id="bucket"
                label="s3://production-cdn-assets"
                icon={
                  <svg
                    className="w-4 h-4 text-violet-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
                    <path d="M3 12A9 3 0 0 0 21 12" />
                  </svg>
                }
                badge={
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-4"
                  >
                    3.4 GB total
                  </Badge>
                }
              >
                <TreeItem id="images" label="images/">
                  <TreeItem
                    id="hero"
                    label="hero-banner-dark.webp"
                    icon={
                      <svg
                        className="w-4 h-4 text-emerald-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="3"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    }
                    badge={
                      <span className="text-xs font-mono text-[var(--patiya-color-muted-foreground)]">
                        1.2 MB
                      </span>
                    }
                  />
                  <TreeItem
                    id="avatar"
                    label="user-avatar-placeholder.png"
                    icon={
                      <svg
                        className="w-4 h-4 text-emerald-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="3"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    }
                    badge={
                      <span className="text-xs font-mono text-[var(--patiya-color-muted-foreground)]">
                        48 KB
                      </span>
                    }
                  />
                </TreeItem>
                <TreeItem id="docs" label="reports/">
                  <TreeItem
                    id="q4-audit"
                    label="q4-financial-audit.pdf"
                    icon={
                      <svg
                        className="w-4 h-4 text-rose-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    }
                    badge={
                      <span className="text-xs font-mono text-[var(--patiya-color-muted-foreground)]">
                        4.8 MB
                      </span>
                    }
                  />
                </TreeItem>
                <TreeItem id="media" label="video/">
                  <TreeItem
                    id="demo-video"
                    label="launch-announcement.mp4"
                    icon={
                      <svg
                        className="w-4 h-4 text-sky-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect
                          width="14"
                          height="14"
                          x="1"
                          y="5"
                          rx="2"
                          ry="2"
                        />
                      </svg>
                    }
                    badge={
                      <span className="text-xs font-mono text-[var(--patiya-color-muted-foreground)]">
                        240 MB
                      </span>
                    }
                  />
                </TreeItem>
              </TreeItem>
            </TreeView>
          </div>
        ),
        code: `<TreeView defaultExpandedKeys={["bucket", "images"]}>\n  <TreeItem id="bucket" label="s3://production-cdn-assets" icon={<BucketIcon />}>\n    <TreeItem id="images" label="images/">\n      <TreeItem id="hero" label="hero-banner.webp" icon={<ImageIcon />} badge={<span className="font-mono text-xs">1.2 MB</span>} />\n    </TreeItem>\n    <TreeItem id="docs" label="reports/">\n      <TreeItem id="pdf" label="audit.pdf" icon={<DocIcon />} badge={<span className="font-mono text-xs">4.8 MB</span>} />\n    </TreeItem>\n  </TreeItem>\n</TreeView>`,
      },
    ],
    props: [
      {
        name: "defaultExpandedKeys",
        type: "string[]",
        default: "[]",
        description: "List of item IDs that are expanded on initial render.",
      },
      {
        name: "selectedKey",
        type: "string",
        default: "-",
        description: "Controlled ID of the currently selected tree item.",
      },
      {
        name: "onSelect",
        type: "(key: string) => void",
        default: "-",
        description: "Callback triggered when a tree item is selected.",
      },
      {
        name: "showGuides",
        type: "boolean",
        default: "true",
        description:
          "Whether to draw vertical branch connector lines for nested items.",
      },
      {
        name: "className",
        type: "string",
        default: "-",
        description: "Additional CSS classes to apply.",
      },
      {
        name: "TreeItem.id",
        type: "string",
        default: "-",
        description: "Unique string key identifying the item in the tree.",
      },
      {
        name: "TreeItem.label",
        type: "React.ReactNode",
        default: "-",
        description: "Title or node content rendered for the tree item.",
      },
      {
        name: "TreeItem.icon",
        type: "React.ReactNode",
        default: "-",
        description: "Leading icon element (e.g. folder, file, shield).",
      },
      {
        name: "TreeItem.badge",
        type: "React.ReactNode",
        default: "-",
        description:
          "Trailing badge or counter element aligned to the right edge.",
      },
      {
        name: "TreeItem.defaultExpanded",
        type: "boolean",
        default: "false",
        description: "Whether this individual item is initially expanded.",
      },
      {
        name: "TreeItem.disabled",
        type: "boolean",
        default: "false",
        description: "Whether interactions and clicks are disabled.",
      },
    ],
  },
  treeView: {
    title: "Tree View",
    description:
      "Hierarchical interactive data display with collapsible folder nodes, custom icons, and guide lines.",
    installation: `import { TreeView, TreeItem } from 'patiya';`,
    examples: [
      {
        title: "Project File Explorer",
        description:
          "Collapsible directory tree with branch connector lines, badges, and file type icons.",
        preview: <TreeViewPreview />,
        code: `<TreeView defaultExpandedKeys={["root", "src", "components"]}>\n  <TreeItem id="root" label="patiya-ui" icon={<FolderIcon />}>\n    <TreeItem id="src" label="src" icon={<FolderIcon />}>\n      <TreeItem id="components" label="components" icon={<FolderIcon />}>\n        <TreeItem id="stat" label="Stat.tsx" icon={<CodeIcon />} badge={<Badge>New</Badge>} />\n        <TreeItem id="datalist" label="DataList.tsx" icon={<CodeIcon />} badge={<Badge>New</Badge>} />\n        <TreeItem id="treeview" label="TreeView.tsx" icon={<CodeIcon />} badge={<Badge>New</Badge>} />\n      </TreeItem>\n    </TreeItem>\n  </TreeItem>\n</TreeView>`,
      },
    ],
    props: [
      {
        name: "defaultExpandedKeys",
        type: "string[]",
        default: "[]",
        description: "List of item IDs that are expanded on initial render.",
      },
      {
        name: "selectedKey",
        type: "string",
        default: "-",
        description: "Controlled ID of the currently selected tree item.",
      },
      {
        name: "onSelect",
        type: "(key: string) => void",
        default: "-",
        description: "Callback triggered when a tree item is selected.",
      },
      {
        name: "showGuides",
        type: "boolean",
        default: "true",
        description:
          "Whether to draw vertical branch connector lines for nested items.",
      },
      {
        name: "className",
        type: "string",
        default: "-",
        description: "Additional CSS classes to apply.",
      },
      {
        name: "TreeItem.id",
        type: "string",
        default: "-",
        description: "Unique string key identifying the item in the tree.",
      },
      {
        name: "TreeItem.label",
        type: "React.ReactNode",
        default: "-",
        description: "Title or node content rendered for the tree item.",
      },
      {
        name: "TreeItem.icon",
        type: "React.ReactNode",
        default: "-",
        description: "Leading icon element (e.g. folder, file, shield).",
      },
      {
        name: "TreeItem.badge",
        type: "React.ReactNode",
        default: "-",
        description:
          "Trailing badge or counter element aligned to the right edge.",
      },
      {
        name: "TreeItem.defaultExpanded",
        type: "boolean",
        default: "false",
        description: "Whether this individual item is initially expanded.",
      },
      {
        name: "TreeItem.disabled",
        type: "boolean",
        default: "false",
        description: "Whether interactions and clicks are disabled.",
      },
    ],
  },
  tabs: {
    title: "Tabs",
    description:
      "A set of layered sections of content-known as tab panels-that are displayed one at a time.",
    installation: `import { Tabs, TabsList, TabsTrigger, TabsContent } from 'patiya';`,
    examples: [
      {
        title: "Settings Form",
        preview: <TabsPreview />,
        code: `<Tabs defaultValue="account">\n  <TabsList>\n    <TabsTrigger value="account">Account</TabsTrigger>\n    <TabsTrigger value="password">Password</TabsTrigger>\n  </TabsList>\n  <TabsContent value="account">Make changes to your account here.</TabsContent>\n  <TabsContent value="password">Change your password here.</TabsContent>\n</Tabs>`,
      },
      {
        title: "Minimal Navigation",
        preview: (
          <Tabs defaultValue="1" className="w-[300px]">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="1">Home</TabsTrigger>
              <TabsTrigger value="2">Docs</TabsTrigger>
              <TabsTrigger value="3">Blog</TabsTrigger>
            </TabsList>
            <TabsContent
              value="1"
              className="p-4 border border-[var(--patiya-color-border)] rounded-md mt-2"
            >
              Home Content
            </TabsContent>
            <TabsContent
              value="2"
              className="p-4 border border-[var(--patiya-color-border)] rounded-md mt-2"
            >
              Docs Content
            </TabsContent>
            <TabsContent
              value="3"
              className="p-4 border border-[var(--patiya-color-border)] rounded-md mt-2"
            >
              Blog Content
            </TabsContent>
          </Tabs>
        ),
        code: `<Tabs defaultValue="1" className="w-[300px]">\n  <TabsList className="w-full grid grid-cols-3">\n    <TabsTrigger value="1">Home</TabsTrigger>\n    <TabsTrigger value="2">Docs</TabsTrigger>\n    <TabsTrigger value="3">Blog</TabsTrigger>\n  </TabsList>\n  <TabsContent value="1" className="p-4 border rounded-md mt-2">Home Content</TabsContent>\n  <TabsContent value="2" className="p-4 border rounded-md mt-2">Docs Content</TabsContent>\n  <TabsContent value="3" className="p-4 border rounded-md mt-2">Blog Content</TabsContent>\n</Tabs>`,
      },
      {
        title: "Fitted Tabs",
        preview: (
          <Tabs defaultValue="1" className="w-[400px]">
            <TabsList className="w-full flex">
              <TabsTrigger value="1" className="flex-1">
                Overview
              </TabsTrigger>
              <TabsTrigger value="2" className="flex-1">
                Integrations
              </TabsTrigger>
              <TabsTrigger value="3" className="flex-1">
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="1">Overview panel</TabsContent>
            <TabsContent value="2">Integrations panel</TabsContent>
            <TabsContent value="3">Settings panel</TabsContent>
          </Tabs>
        ),
        code: `<TabsList className="w-full flex">\n  <TabsTrigger className="flex-1" value="1">Overview</TabsTrigger>\n  <TabsTrigger className="flex-1" value="2">Integrations</TabsTrigger>\n  <TabsTrigger className="flex-1" value="3">Settings</TabsTrigger>\n</TabsList>`,
      },
      {
        title: "Dashboard & Analytics",
        description:
          "Segmented tab controls with icons and live metric previews.",
        preview: (
          <div className="w-full max-w-xl p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] shadow-xs">
            <Tabs defaultValue="metrics" className="w-full">
              <TabsList className="grid grid-cols-3 w-full bg-[var(--patiya-color-muted)]/70 p-1 rounded-xl">
                <TabsTrigger
                  value="overview"
                  className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg data-[state=active]:bg-[var(--patiya-color-background)] data-[state=active]:text-[var(--patiya-color-foreground)] data-[state=active]:shadow-xs"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="metrics"
                  className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg data-[state=active]:bg-[var(--patiya-color-background)] data-[state=active]:text-[var(--patiya-color-foreground)] data-[state=active]:shadow-xs"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  Metrics
                </TabsTrigger>
                <TabsTrigger
                  value="logs"
                  className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg data-[state=active]:bg-[var(--patiya-color-background)] data-[state=active]:text-[var(--patiya-color-foreground)] data-[state=active]:shadow-xs"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                  </svg>
                  Live Logs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-[var(--patiya-color-border)]/80 bg-[var(--patiya-color-background)]">
                    <div className="text-[11px] font-medium text-[var(--patiya-color-muted-foreground)]">
                      CPU Utilization
                    </div>
                    <div className="mt-1 text-xl font-bold font-mono text-[var(--patiya-color-foreground)]">
                      28.4%
                    </div>
                    <div className="mt-2 w-full bg-[var(--patiya-color-muted)] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[var(--patiya-color-primary)] h-full rounded-full w-[28%]" />
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-[var(--patiya-color-border)]/80 bg-[var(--patiya-color-background)]">
                    <div className="text-[11px] font-medium text-[var(--patiya-color-muted-foreground)]">
                      Memory Allocated
                    </div>
                    <div className="mt-1 text-xl font-bold font-mono text-[var(--patiya-color-foreground)]">
                      1.4 / 4.0 GB
                    </div>
                    <div className="mt-2 w-full bg-[var(--patiya-color-muted)] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full w-[35%]" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="metrics" className="mt-4 space-y-3">
                <div className="p-4 rounded-xl border border-[var(--patiya-color-border)]/80 bg-[var(--patiya-color-background)] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--patiya-color-foreground)]">
                      Latency Distribution
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-medium">
                      99.9% Normal
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="p-2 rounded-lg bg-[var(--patiya-color-muted)]/40">
                      <div className="text-[10px] text-[var(--patiya-color-muted-foreground)]">
                        p50
                      </div>
                      <div className="text-sm font-bold font-mono text-[var(--patiya-color-foreground)]">
                        14ms
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-[var(--patiya-color-muted)]/40">
                      <div className="text-[10px] text-[var(--patiya-color-muted-foreground)]">
                        p95
                      </div>
                      <div className="text-sm font-bold font-mono text-[var(--patiya-color-foreground)]">
                        42ms
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-[var(--patiya-color-muted)]/40">
                      <div className="text-[10px] text-[var(--patiya-color-muted-foreground)]">
                        p99
                      </div>
                      <div className="text-sm font-bold font-mono text-[var(--patiya-color-primary)]">
                        86ms
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="logs" className="mt-4">
                <div className="p-3.5 rounded-xl border border-[var(--patiya-color-border)]/80 bg-[var(--patiya-color-background)] font-mono text-[11px] space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <span className="text-[var(--patiya-color-muted-foreground)]">
                      14:22:01
                    </span>
                    <span className="font-bold">[200]</span>
                    <span>GET /api/v1/auth/session</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <span className="text-[var(--patiya-color-muted-foreground)]">
                      14:22:04
                    </span>
                    <span className="font-bold">[201]</span>
                    <span>POST /api/v1/telemetry/event</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--patiya-color-primary)]">
                    <span className="text-[var(--patiya-color-muted-foreground)]">
                      14:22:10
                    </span>
                    <span className="font-bold">[101]</span>
                    <span>UPGRADE ws://api.patiya.io/stream</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ),
        code: `<Tabs defaultValue="metrics" className="w-full">\n  <TabsList className="grid grid-cols-3 w-full bg-[var(--patiya-color-muted)]/70 p-1 rounded-xl">\n    <TabsTrigger value="overview">Overview</TabsTrigger>\n    <TabsTrigger value="metrics">Metrics</TabsTrigger>\n    <TabsTrigger value="logs">Live Logs</TabsTrigger>\n  </TabsList>\n\n  <TabsContent value="overview" className="mt-4 space-y-3">\n    <div className="grid grid-cols-2 gap-3">\n      <div className="p-3.5 rounded-xl border border-[var(--patiya-color-border)]/80 bg-[var(--patiya-color-background)]">\n        <div className="text-[11px] font-medium text-[var(--patiya-color-muted-foreground)]">CPU Utilization</div>\n        <div className="mt-1 text-xl font-bold font-mono text-[var(--patiya-color-foreground)]">28.4%</div>\n        <div className="mt-2 w-full bg-[var(--patiya-color-muted)] h-1.5 rounded-full overflow-hidden">\n          <div className="bg-[var(--patiya-color-primary)] h-full rounded-full w-[28%]" />\n        </div>\n      </div>\n      <div className="p-3.5 rounded-xl border border-[var(--patiya-color-border)]/80 bg-[var(--patiya-color-background)]">\n        <div className="text-[11px] font-medium text-[var(--patiya-color-muted-foreground)]">Memory Allocated</div>\n        <div className="mt-1 text-xl font-bold font-mono text-[var(--patiya-color-foreground)]">1.4 / 4.0 GB</div>\n        <div className="mt-2 w-full bg-[var(--patiya-color-muted)] h-1.5 rounded-full overflow-hidden">\n          <div className="bg-emerald-500 h-full rounded-full w-[35%]" />\n        </div>\n      </div>\n    </div>\n  </TabsContent>\n\n  <TabsContent value="metrics" className="mt-4 space-y-3">\n    <div className="p-4 rounded-xl border border-[var(--patiya-color-border)]/80 bg-[var(--patiya-color-background)] space-y-3">\n      <div className="flex items-center justify-between text-xs">\n        <span className="font-semibold text-[var(--patiya-color-foreground)]">Latency Distribution</span>\n        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 font-medium">99.9% Normal</span>\n      </div>\n      <div className="grid grid-cols-3 gap-2 text-center pt-1">\n        <div className="p-2 rounded-lg bg-[var(--patiya-color-muted)]/40">\n          <div className="text-[10px] text-[var(--patiya-color-muted-foreground)]">p50</div>\n          <div className="text-sm font-bold font-mono text-[var(--patiya-color-foreground)]">14ms</div>\n        </div>\n        <div className="p-2 rounded-lg bg-[var(--patiya-color-muted)]/40">\n          <div className="text-[10px] text-[var(--patiya-color-muted-foreground)]">p95</div>\n          <div className="text-sm font-bold font-mono text-[var(--patiya-color-foreground)]">42ms</div>\n        </div>\n        <div className="p-2 rounded-lg bg-[var(--patiya-color-muted)]/40">\n          <div className="text-[10px] text-[var(--patiya-color-muted-foreground)]">p99</div>\n          <div className="text-sm font-bold font-mono text-[var(--patiya-color-primary)]">86ms</div>\n        </div>\n      </div>\n    </div>\n  </TabsContent>\n\n  <TabsContent value="logs" className="mt-4">\n    <div className="p-3.5 rounded-xl border border-[var(--patiya-color-border)]/80 bg-[var(--patiya-color-background)] font-mono text-[11px] space-y-1.5">\n      <div className="flex items-center gap-2 text-emerald-600">\n        <span className="text-[var(--patiya-color-muted-foreground)]">14:22:01</span>\n        <span className="font-bold">[200]</span>\n        <span>GET /api/v1/auth/session</span>\n      </div>\n      <div className="flex items-center gap-2 text-emerald-600">\n        <span className="text-[var(--patiya-color-muted-foreground)]">14:22:04</span>\n        <span className="font-bold">[201]</span>\n        <span>POST /api/v1/telemetry/event</span>\n      </div>\n      <div className="flex items-center gap-2 text-[var(--patiya-color-primary)]">\n        <span className="text-[var(--patiya-color-muted-foreground)]">14:22:10</span>\n        <span className="font-bold">[101]</span>\n        <span>UPGRADE ws://api.patiya.io/stream</span>\n      </div>\n    </div>\n  </TabsContent>\n</Tabs>`,
      },
      {
        title: "Underline Navigation with Badges",
        description:
          "Minimal border-bottom indicator tabs with status count chips.",
        preview: (
          <div className="w-full max-w-xl p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] shadow-xs">
            <Tabs defaultValue="prs" className="w-full">
              <TabsList className="w-full flex justify-start gap-4 border-b border-[var(--patiya-color-border)] bg-transparent p-0 h-auto rounded-none">
                <TabsTrigger
                  value="prs"
                  className="relative pb-2.5 pt-1 px-1 text-xs font-semibold text-[var(--patiya-color-muted-foreground)] rounded-none bg-transparent shadow-none hover:text-[var(--patiya-color-foreground)] data-[state=active]:text-[var(--patiya-color-primary)] data-[state=active]:bg-transparent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-transparent data-[state=active]:after:bg-[var(--patiya-color-primary)]"
                >
                  <span className="flex items-center gap-1.5">
                    Pull Requests
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)] font-bold">
                      4
                    </span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="issues"
                  className="relative pb-2.5 pt-1 px-1 text-xs font-semibold text-[var(--patiya-color-muted-foreground)] rounded-none bg-transparent shadow-none hover:text-[var(--patiya-color-foreground)] data-[state=active]:text-[var(--patiya-color-primary)] data-[state=active]:bg-transparent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-transparent data-[state=active]:after:bg-[var(--patiya-color-primary)]"
                >
                  <span className="flex items-center gap-1.5">
                    Issues
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)] font-medium">
                      12
                    </span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="deployments"
                  className="relative pb-2.5 pt-1 px-1 text-xs font-semibold text-[var(--patiya-color-muted-foreground)] rounded-none bg-transparent shadow-none hover:text-[var(--patiya-color-foreground)] data-[state=active]:text-[var(--patiya-color-primary)] data-[state=active]:bg-transparent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-transparent data-[state=active]:after:bg-[var(--patiya-color-primary)]"
                >
                  <span className="flex items-center gap-1.5">
                    Deployments
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="prs" className="mt-4 space-y-2">
                <div className="p-3 rounded-xl border border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)] flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-[var(--patiya-color-foreground)] hover:text-[var(--patiya-color-primary)] transition-colors cursor-pointer">
                      feat: add animated Tabs and Accordion presets
                    </div>
                    <div className="text-[11px] text-[var(--patiya-color-muted-foreground)]">
                      #142 opened 2 hours ago by ajaykatariya
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-600 dark:text-purple-400">
                    Needs Review
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)] flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-[var(--patiya-color-foreground)] hover:text-[var(--patiya-color-primary)] transition-colors cursor-pointer">
                      fix(theme): optimize color token contrast in dark mode
                    </div>
                    <div className="text-[11px] text-[var(--patiya-color-muted-foreground)]">
                      #141 merged yesterday
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    Merged
                  </span>
                </div>
              </TabsContent>

              <TabsContent
                value="issues"
                className="mt-4 text-xs text-[var(--patiya-color-muted-foreground)] p-4 text-center"
              >
                12 active issues tracking improvements and bugfixes.
              </TabsContent>

              <TabsContent
                value="deployments"
                className="mt-4 text-xs text-[var(--patiya-color-muted-foreground)] p-4 text-center"
              >
                Production deployment live on edge cluster (v2.0.4).
              </TabsContent>
            </Tabs>
          </div>
        ),
        code: `<Tabs defaultValue="prs" className="w-full">\n  <TabsList className="w-full flex justify-start gap-4 border-b border-[var(--patiya-color-border)] bg-transparent p-0 h-auto rounded-none">\n    <TabsTrigger value="prs" className="relative pb-2.5 pt-1 px-1 text-xs font-semibold">\n      Pull Requests <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)]">4</span>\n    </TabsTrigger>\n    <TabsTrigger value="issues" className="relative pb-2.5 pt-1 px-1 text-xs font-semibold">\n      Issues <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--patiya-color-muted)]">12</span>\n    </TabsTrigger>\n  </TabsList>\n\n  <TabsContent value="prs" className="mt-4 space-y-2">\n    <div className="p-3 rounded-xl border bg-[var(--patiya-color-background)] flex items-center justify-between text-xs">\n      <div>\n        <div className="font-semibold">feat: add animated Tabs presets</div>\n        <div className="text-[11px] text-[var(--patiya-color-muted-foreground)]">#142 opened by ajaykatariya</div>\n      </div>\n      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-600">Needs Review</span>\n    </div>\n  </TabsContent>\n  <TabsContent value="issues">12 active issues</TabsContent>\n</Tabs>`,
      },
      {
        title: "Vertical Settings Navigation",
        description:
          "Side-by-side tab layout for multi-section configuration views.",
        preview: (
          <div className="w-full max-w-xl p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] shadow-xs">
            <Tabs
              defaultValue="security"
              className="flex flex-col sm:flex-row gap-5"
            >
              <TabsList className="flex flex-col h-auto bg-transparent p-0 gap-1 w-full sm:w-40 shrink-0">
                <TabsTrigger
                  value="general"
                  className="w-full justify-start px-3 py-2 text-xs font-semibold rounded-lg text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/50 data-[state=active]:bg-[var(--patiya-color-primary)]/10 data-[state=active]:text-[var(--patiya-color-primary)] transition-all"
                >
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="w-full justify-start px-3 py-2 text-xs font-semibold rounded-lg text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/50 data-[state=active]:bg-[var(--patiya-color-primary)]/10 data-[state=active]:text-[var(--patiya-color-primary)] transition-all"
                >
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="w-full justify-start px-3 py-2 text-xs font-semibold rounded-lg text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/50 data-[state=active]:bg-[var(--patiya-color-primary)]/10 data-[state=active]:text-[var(--patiya-color-primary)] transition-all"
                >
                  Notifications
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 min-w-0 sm:border-l sm:border-[var(--patiya-color-border)] sm:pl-5">
                <TabsContent value="general" className="mt-0 space-y-3">
                  <div className="text-xs font-bold text-[var(--patiya-color-foreground)]">
                    General Profile
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <label className="text-[11px] font-medium text-[var(--patiya-color-muted-foreground)]">
                      Display Name
                    </label>
                    <input
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] focus:outline-none"
                      defaultValue="Ajay Katariya"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="security" className="mt-0 space-y-3.5">
                  <div>
                    <div className="text-xs font-bold text-[var(--patiya-color-foreground)]">
                      Security & Authentication
                    </div>
                    <div className="text-[11px] text-[var(--patiya-color-muted-foreground)] mt-0.5">
                      Manage authentication protocols and session policies.
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border border-[var(--patiya-color-border)]/80 bg-[var(--patiya-color-background)] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[var(--patiya-color-foreground)]">
                        Two-Factor Authentication
                      </div>
                      <div className="text-[11px] text-[var(--patiya-color-muted-foreground)]">
                        Secured with WebAuthn security key
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-end pt-1">
                    <Button size="sm">Update Keys</Button>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="mt-0 space-y-3">
                  <div className="text-xs font-bold text-[var(--patiya-color-foreground)]">
                    Notification Preferences
                  </div>
                  <div className="p-3 rounded-xl border border-[var(--patiya-color-border)]/80 bg-[var(--patiya-color-background)] flex items-center justify-between">
                    <span className="text-xs font-medium text-[var(--patiya-color-foreground)]">
                      Critical Security Alerts
                    </span>
                    <Switch defaultChecked />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        ),
        code: `<Tabs defaultValue="security" className="flex flex-col sm:flex-row gap-5">\n  <TabsList className="flex flex-col h-auto bg-transparent p-0 gap-1 w-full sm:w-40 shrink-0">\n    <TabsTrigger value="general" className="w-full justify-start">General</TabsTrigger>\n    <TabsTrigger value="security" className="w-full justify-start">Security</TabsTrigger>\n    <TabsTrigger value="notifications" className="w-full justify-start">Notifications</TabsTrigger>\n  </TabsList>\n\n  <div className="flex-1 sm:border-l sm:pl-5">\n    <TabsContent value="general" className="space-y-3">\n      <label className="text-xs font-medium">Display Name</label>\n      <input className="w-full px-3 py-1.5 text-xs rounded-lg border bg-[var(--patiya-color-background)]" defaultValue="Ajay Katariya" />\n    </TabsContent>\n    <TabsContent value="security" className="space-y-3.5">\n      <div className="p-3 rounded-xl border bg-[var(--patiya-color-background)] flex items-center justify-between">\n        <div>Two-Factor Authentication</div>\n        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">Active</span>\n      </div>\n    </TabsContent>\n  </div>\n</Tabs>`,
      },
      {
        title: "Billing Frequency Switcher",
        description:
          "Interactive pill tabs toggling between annual and monthly pricing.",
        preview: (
          <div className="w-full max-w-xl flex flex-col items-center p-6 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] shadow-xs">
            <Tabs
              defaultValue="annually"
              className="w-full flex flex-col items-center"
            >
              <TabsList className="bg-[var(--patiya-color-muted)]/70 p-1 rounded-full border border-[var(--patiya-color-border)]/60">
                <TabsTrigger
                  value="monthly"
                  className="px-4 py-1.5 text-xs font-semibold rounded-full data-[state=active]:bg-[var(--patiya-color-background)] data-[state=active]:text-[var(--patiya-color-foreground)] data-[state=active]:shadow-xs transition-all"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="annually"
                  className="px-4 py-1.5 text-xs font-semibold rounded-full data-[state=active]:bg-[var(--patiya-color-background)] data-[state=active]:text-[var(--patiya-color-foreground)] data-[state=active]:shadow-xs transition-all flex items-center gap-1.5"
                >
                  Annually
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)]">
                    -20%
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="monthly" className="w-full mt-5">
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] space-y-3">
                    <div>
                      <div className="text-xs font-bold text-[var(--patiya-color-foreground)]">
                        Starter
                      </div>
                      <div className="text-2xl font-black font-mono text-[var(--patiya-color-foreground)] mt-1">
                        $24
                        <span className="text-xs font-normal text-[var(--patiya-color-muted-foreground)]">
                          /mo
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                    >
                      Choose Starter
                    </Button>
                  </div>
                  <div className="p-4 rounded-xl border-2 border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/5 space-y-3 relative">
                    <span className="absolute -top-2.5 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--patiya-color-primary)] text-white">
                      Popular
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[var(--patiya-color-primary)]">
                        Pro Team
                      </div>
                      <div className="text-2xl font-black font-mono text-[var(--patiya-color-foreground)] mt-1">
                        $59
                        <span className="text-xs font-normal text-[var(--patiya-color-muted-foreground)]">
                          /mo
                        </span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full text-xs">
                      Choose Pro
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="annually" className="w-full mt-5">
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] space-y-3">
                    <div>
                      <div className="text-xs font-bold text-[var(--patiya-color-foreground)]">
                        Starter
                      </div>
                      <div className="text-2xl font-black font-mono text-[var(--patiya-color-foreground)] mt-1">
                        $19
                        <span className="text-xs font-normal text-[var(--patiya-color-muted-foreground)]">
                          /mo
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                    >
                      Choose Starter
                    </Button>
                  </div>
                  <div className="p-4 rounded-xl border-2 border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/5 space-y-3 relative">
                    <span className="absolute -top-2.5 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--patiya-color-primary)] text-white">
                      Popular
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[var(--patiya-color-primary)]">
                        Pro Team
                      </div>
                      <div className="text-2xl font-black font-mono text-[var(--patiya-color-foreground)] mt-1">
                        $47
                        <span className="text-xs font-normal text-[var(--patiya-color-muted-foreground)]">
                          /mo
                        </span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full text-xs">
                      Choose Pro
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ),
        code: `<Tabs defaultValue="annually" className="w-full flex flex-col items-center">\n  <TabsList className="bg-[var(--patiya-color-muted)]/70 p-1 rounded-full border">\n    <TabsTrigger value="monthly" className="px-4 py-1.5 text-xs rounded-full">Monthly</TabsTrigger>\n    <TabsTrigger value="annually" className="px-4 py-1.5 text-xs rounded-full">Annually -20%</TabsTrigger>\n  </TabsList>\n\n  <TabsContent value="annually" className="w-full mt-5">\n    <div className="grid grid-cols-2 gap-3.5">\n      <div className="p-4 rounded-xl border bg-[var(--patiya-color-background)] space-y-3">\n        <div className="text-xs font-bold">Starter</div>\n        <div className="text-2xl font-black font-mono">$19<span className="text-xs font-normal text-[var(--patiya-color-muted-foreground)]">/mo</span></div>\n        <Button variant="outline" size="sm" className="w-full text-xs">Choose Starter</Button>\n      </div>\n      <div className="p-4 rounded-xl border-2 border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/5 space-y-3">\n        <div className="text-xs font-bold text-[var(--patiya-color-primary)]">Pro Team</div>\n        <div className="text-2xl font-black font-mono">$47<span className="text-xs font-normal text-[var(--patiya-color-muted-foreground)]">/mo</span></div>\n        <Button size="sm" className="w-full text-xs">Choose Pro</Button>\n      </div>\n    </div>\n  </TabsContent>\n</Tabs>`,
      },
    ],
    props: [
      {
        name: "defaultValue",
        type: "string",
        default: "''",
        description:
          "The value of the tab to activate by default on initial render.",
      },
      {
        name: "value",
        type: "string",
        default: "-",
        description: "Controlled value of the active tab.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        default: "-",
        description: "Callback invoked when the selected tab changes.",
      },
      {
        name: "className",
        type: "string",
        default: "-",
        description:
          "Additional CSS classes applied to the tabs root container.",
      },
      {
        name: "TabsList.className",
        type: "string",
        default: "-",
        description: "CSS classes applied to the tab trigger list bar.",
      },
      {
        name: "TabsTrigger.value",
        type: "string",
        default: "required",
        description: "Unique string value identifying this tab trigger.",
      },
      {
        name: "TabsTrigger.disabled",
        type: "boolean",
        default: "false",
        description:
          "Whether the tab trigger is disabled from user interactions.",
      },
      {
        name: "TabsTrigger.className",
        type: "string",
        default: "-",
        description: "Additional CSS classes for the tab trigger button.",
      },
      {
        name: "TabsContent.value",
        type: "string",
        default: "required",
        description:
          "Value matching the TabsTrigger that activates this panel.",
      },
      {
        name: "TabsContent.className",
        type: "string",
        default: "-",
        description:
          "Additional CSS classes applied to the tab panel container.",
      },
    ],
  },
  collapse: {
    title: "Collapse",
    description:
      "A structural component that smoothly toggles the visibility of its content.",
    props: [
      {
        name: "isOpen",
        type: "boolean",
        default: "false",
        description: "Whether the content is currently visible.",
      },
      {
        name: "onAnimationEnd",
        type: "() => void",
        default: "-",
        description: "Callback fired when the transition finishes.",
      },
    ],
    examples: [
      {
        title: "Basic Collapse",
        description: "A simple collapse toggle controlled by a button.",
        preview: <CollapseDefaultPreview />,
        code: `import { useState } from 'react';
import { Button, Collapse, Box } from 'patiya';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Box className="w-full max-w-sm mx-auto space-y-4">
      <Button onClick={() => setIsOpen(!isOpen)} fullWidth variant="outline">
        {isOpen ? "Close" : "Open"} Details
      </Button>
      <Collapse isOpen={isOpen}>
        <Box className="border border-[var(--patiya-color-border)] rounded-md p-4 bg-[var(--patiya-color-muted)]/20 text-sm">
          This is the default collapse behavior. It uses CSS grid to smoothly transition between hidden and visible states. It is a lightweight primitive for any expanding content.
        </Box>
      </Collapse>
    </Box>
  );
}`,
      },
      {
        title: "With Form / Card",
        description:
          "Collapse can be used to hide advanced settings or secondary forms within cards.",
        preview: <CollapseCardPreview />,
        code: `import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Collapse, Box, Input, Button } from 'patiya';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle>Project Settings</CardTitle>
        <CardDescription>Manage your deployment settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--patiya-color-muted-foreground)] mb-4">
          General settings are configured by default. Advanced settings can be modified below.
        </p>
        <Collapse isOpen={isOpen}>
          <Box className="space-y-4 pt-2 pb-4 border-t border-[var(--patiya-color-border)]">
            <Box>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">Build Command</label>
              <Input defaultValue="npm run build" className="mt-1" />
            </Box>
            <Box>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">Install Command</label>
              <Input defaultValue="npm install" className="mt-1" />
            </Box>
          </Box>
        </Collapse>
        <Button onClick={() => setIsOpen(!isOpen)} variant="soft" color="primary" fullWidth size="sm">
          {isOpen ? "Hide Advanced Settings" : "Show Advanced Settings"}
        </Button>
      </CardContent>
    </Card>
  );
}`,
      },
      {
        title: "Nested Collapse",
        description:
          "Collapse components automatically adjust when nested content height changes.",
        preview: <CollapseNestedPreview />,
        code: `import { useState } from 'react';
import { Collapse, Box, Button } from 'patiya';

export default function App() {
  const [isOuterOpen, setIsOuterOpen] = useState(false);
  const [isInnerOpen, setIsInnerOpen] = useState(false);
  
  return (
    <Box className="w-full max-w-sm mx-auto space-y-4">
      <Button onClick={() => setIsOuterOpen(!isOuterOpen)} fullWidth color="secondary">
        Toggle Outer Content
      </Button>
      <Collapse isOpen={isOuterOpen}>
        <Box className="border border-[var(--patiya-color-border)] rounded-md p-4 space-y-4">
          <p className="text-sm">This is the outer collapse container.</p>
          <Button onClick={() => setIsInnerOpen(!isInnerOpen)} fullWidth variant="outline" size="sm">
            Toggle Inner Content
          </Button>
          <Collapse isOpen={isInnerOpen}>
            <Box className="bg-[var(--patiya-color-muted)]/20 rounded-md p-3 text-sm text-[var(--patiya-color-muted-foreground)]">
              This is deeply nested content that dynamically resizes the outer container when expanded!
            </Box>
          </Collapse>
        </Box>
      </Collapse>
    </Box>
  );
}`,
      },
      {
        title: "Switch Trigger",
        description:
          "Triggering collapse state via other inputs, like a Switch.",
        preview: <CollapseHorizontalPreview />,
        code: `import { useState } from 'react';
import { Box, Switch, Checkbox, Collapse } from 'patiya';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Box className="w-full max-w-sm mx-auto">
      <Box className="flex items-center justify-between p-4 border border-[var(--patiya-color-border)] rounded-t-md bg-[var(--patiya-color-muted)]/10">
        <span className="font-medium text-sm">Notifications</span>
        <Switch checked={isOpen} onChange={(e) => setIsOpen(e.target.checked)} />
      </Box>
      <Collapse isOpen={isOpen}>
        <Box className="border border-t-0 border-[var(--patiya-color-border)] rounded-b-md p-4 space-y-3 bg-[var(--patiya-color-background)]">
          <Box className="flex items-center gap-3">
            <Checkbox defaultChecked /> <span className="text-sm">Email alerts</span>
          </Box>
          <Box className="flex items-center gap-3">
            <Checkbox /> <span className="text-sm">SMS alerts</span>
          </Box>
          <Box className="flex items-center gap-3">
            <Checkbox defaultChecked /> <span className="text-sm">Push notifications</span>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}`,
      },
    ],
  },
  accordion: {
    title: "Accordion",
    description:
      "A vertically stacked set of interactive headings that each reveal a section of content.",
    installation: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'patiya';`,
    examples: [
      {
        title: "Default",
        description: "A standard accordion with multiple items.",
        preview: <AccordionPreview />,
        code: `<Accordion type="single">\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>Yes.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
      },
      {
        title: "Flush",
        description: "An accordion without outer borders.",
        preview: (
          <Accordion type="single" className="w-[400px] border-none">
            <AccordionItem
              value="item-1"
              className="border-t-0 border-b border-[var(--patiya-color-border)]"
            >
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="border-t-0 border-b border-[var(--patiya-color-border)]"
            >
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
        code: `<Accordion type="single" className="border-none">\n  <AccordionItem value="item-1" className="border-t-0 border-b border-[var(--patiya-color-border)]">\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>Yes.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
      },
      {
        title: "Card-Style Elevated FAQ",
        description:
          "Independent card accordion items with category badges and soft hover states.",
        preview: (
          <div className="w-full max-w-xl">
            <Accordion type="single" className="w-full border-none space-y-3">
              <AccordionItem
                value="faq-1"
                className="border border-[var(--patiya-color-border)] rounded-2xl bg-[var(--patiya-color-card)] px-5 shadow-xs transition-colors hover:border-[var(--patiya-color-primary)]/40 overflow-hidden"
              >
                <AccordionTrigger className="py-4 text-xs font-semibold hover:no-underline text-[var(--patiya-color-foreground)]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400">
                      Billing
                    </span>
                    <span>How does team seat and member billing work?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[var(--patiya-color-muted-foreground)] leading-relaxed pb-4 pt-1">
                  Team seats are billed monthly on a prorated basis. You can add
                  or remove contributors at any time directly through the
                  organization workspace settings.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-2"
                className="border border-[var(--patiya-color-border)] rounded-2xl bg-[var(--patiya-color-card)] px-5 shadow-xs transition-colors hover:border-[var(--patiya-color-primary)]/40 overflow-hidden"
              >
                <AccordionTrigger className="py-4 text-xs font-semibold hover:no-underline text-[var(--patiya-color-foreground)]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      Security
                    </span>
                    <span>
                      Is customer data encrypted at rest and in transit?
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[var(--patiya-color-muted-foreground)] leading-relaxed pb-4 pt-1">
                  All stored payloads are encrypted using AES-256 at rest and
                  TLS 1.3 in transit with automated rotation for
                  customer-managed encryption keys.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-3"
                className="border border-[var(--patiya-color-border)] rounded-2xl bg-[var(--patiya-color-card)] px-5 shadow-xs transition-colors hover:border-[var(--patiya-color-primary)]/40 overflow-hidden"
              >
                <AccordionTrigger className="py-4 text-xs font-semibold hover:no-underline text-[var(--patiya-color-foreground)]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400">
                      Telemetry
                    </span>
                    <span>Can I export historical logs and audit events?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[var(--patiya-color-muted-foreground)] leading-relaxed pb-4 pt-1">
                  Yes, historical logs can be exported directly to AWS S3,
                  Google Cloud Storage, or streamed in real-time to Datadog and
                  OpenTelemetry collectors.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ),
        code: `<Accordion type="single" className="w-full border-none space-y-3">\n  <AccordionItem value="faq-1" className="border border-[var(--patiya-color-border)] rounded-2xl bg-[var(--patiya-color-card)] px-5 shadow-xs overflow-hidden">\n    <AccordionTrigger className="py-4 text-xs font-semibold hover:no-underline text-[var(--patiya-color-foreground)]">\n      <div className="flex items-center gap-2.5">\n        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600">Billing</span>\n        <span>How does team seat and member billing work?</span>\n      </div>\n    </AccordionTrigger>\n    <AccordionContent className="text-xs text-[var(--patiya-color-muted-foreground)] leading-relaxed pb-4 pt-1">\n      Team seats are billed monthly on a prorated basis. You can add or remove contributors at any time directly through workspace settings.\n    </AccordionContent>\n  </AccordionItem>\n\n  <AccordionItem value="faq-2" className="border border-[var(--patiya-color-border)] rounded-2xl bg-[var(--patiya-color-card)] px-5 shadow-xs overflow-hidden">\n    <AccordionTrigger className="py-4 text-xs font-semibold hover:no-underline text-[var(--patiya-color-foreground)]">\n      <div className="flex items-center gap-2.5">\n        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">Security</span>\n        <span>Is customer data encrypted at rest and in transit?</span>\n      </div>\n    </AccordionTrigger>\n    <AccordionContent className="text-xs text-[var(--patiya-color-muted-foreground)] leading-relaxed pb-4 pt-1">\n      All stored payloads are encrypted using AES-256 at rest and TLS 1.3 in transit with automated rotation for customer-managed encryption keys.\n    </AccordionContent>\n  </AccordionItem>\n\n  <AccordionItem value="faq-3" className="border border-[var(--patiya-color-border)] rounded-2xl bg-[var(--patiya-color-card)] px-5 shadow-xs overflow-hidden">\n    <AccordionTrigger className="py-4 text-xs font-semibold hover:no-underline text-[var(--patiya-color-foreground)]">\n      <div className="flex items-center gap-2.5">\n        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600">Telemetry</span>\n        <span>Can I export historical logs and audit events?</span>\n      </div>\n    </AccordionTrigger>\n    <AccordionContent className="text-xs text-[var(--patiya-color-muted-foreground)] leading-relaxed pb-4 pt-1">\n      Yes, historical logs can be exported directly to AWS S3, Google Cloud Storage, or streamed in real-time to Datadog and OpenTelemetry collectors.\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>`,
      },
      {
        title: "Multi-Selection System Status",
        description:
          "Accordion allowing multiple sections open simultaneously with live indicators.",
        preview: (
          <div className="w-full max-w-xl">
            <Accordion
              type="multiple"
              defaultValue={["api-gateway", "db-cluster"]}
              className="w-full border border-[var(--patiya-color-border)] rounded-2xl bg-[var(--patiya-color-card)] divide-y divide-[var(--patiya-color-border)] overflow-hidden shadow-xs"
            >
              <AccordionItem value="api-gateway" className="border-none px-5">
                <AccordionTrigger className="py-4 text-xs font-semibold hover:no-underline text-[var(--patiya-color-foreground)]">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>Production API Gateway (v2.4.1)</span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      99.98% Uptime
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs pb-4 pt-1">
                  <div className="p-3 rounded-xl border border-[var(--patiya-color-border)]/80 bg-[var(--patiya-color-background)] grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-[10px] text-[var(--patiya-color-muted-foreground)]">
                        Active Nodes
                      </div>
                      <div className="text-sm font-bold font-mono text-[var(--patiya-color-foreground)]">
                        12 / 12
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--patiya-color-muted-foreground)]">
                        Avg Latency
                      </div>
                      <div className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                        22ms
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--patiya-color-muted-foreground)]">
                        Error Rate
                      </div>
                      <div className="text-sm font-bold font-mono text-[var(--patiya-color-foreground)]">
                        0.002%
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="db-cluster" className="border-none px-5">
                <AccordionTrigger className="py-4 text-xs font-semibold hover:no-underline text-[var(--patiya-color-foreground)]">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Primary PostgreSQL Cluster</span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      Synchronized
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs pb-4 pt-1 space-y-2">
                  <div className="text-[11px] text-[var(--patiya-color-muted-foreground)]">
                    Leader node located in us-east-1. Zero replication lag
                    detected across EU read-replicas.
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="vector-search" className="border-none px-5">
                <AccordionTrigger className="py-4 text-xs font-semibold hover:no-underline text-[var(--patiya-color-foreground)]">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    <span>Vector Search Index (2.4M items)</span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.2 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400">
                      Re-indexing
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs pb-4 pt-1">
                  <div className="text-[11px] text-[var(--patiya-color-muted-foreground)]">
                    Background index compaction running. Expected completion in
                    4 minutes.
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ),
        code: `<Accordion type="multiple" defaultValue={["api-gateway", "db-cluster"]} className="w-full border rounded-2xl divide-y overflow-hidden">\n  <AccordionItem value="api-gateway" className="border-none px-5">\n    <AccordionTrigger className="py-4 text-xs font-semibold">\n      <div className="flex items-center gap-2.5">\n        <span className="h-2 w-2 rounded-full bg-emerald-500" />\n        <span>Production API Gateway (v2.4.1)</span>\n        <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600">99.98% Uptime</span>\n      </div>\n    </AccordionTrigger>\n    <AccordionContent className="text-xs pb-4 pt-1">\n      <div className="p-3 rounded-xl border grid grid-cols-3 gap-2 text-center">\n        <div>\n          <div className="text-[10px] text-[var(--patiya-color-muted-foreground)]">Active Nodes</div>\n          <div className="text-sm font-bold font-mono">12 / 12</div>\n        </div>\n        <div>\n          <div className="text-[10px] text-[var(--patiya-color-muted-foreground)]">Avg Latency</div>\n          <div className="text-sm font-bold font-mono text-emerald-600">22ms</div>\n        </div>\n        <div>\n          <div className="text-[10px] text-[var(--patiya-color-muted-foreground)]">Error Rate</div>\n          <div className="text-sm font-bold font-mono">0.002%</div>\n        </div>\n      </div>\n    </AccordionContent>\n  </AccordionItem>\n\n  <AccordionItem value="db-cluster" className="border-none px-5">\n    <AccordionTrigger className="py-4 text-xs font-semibold">\n      <div className="flex items-center gap-2.5">\n        <span className="h-2 w-2 rounded-full bg-emerald-500" />\n        <span>Primary PostgreSQL Cluster</span>\n      </div>\n    </AccordionTrigger>\n    <AccordionContent className="text-xs pb-4 pt-1">\n      Leader node located in us-east-1. Zero replication lag.\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>`,
      },
      {
        title: "Developer Setup Guide",
        description:
          "Numbered onboarding accordion with code instructions and actionable steps.",
        preview: (
          <div className="w-full max-w-xl">
            <Accordion
              type="single"
              defaultValue="step-1"
              className="w-full border-none space-y-2.5"
            >
              <AccordionItem
                value="step-1"
                className="border border-[var(--patiya-color-border)] rounded-2xl bg-[var(--patiya-color-card)] px-5 shadow-xs overflow-hidden"
              >
                <AccordionTrigger className="py-4 text-xs font-bold hover:no-underline text-[var(--patiya-color-foreground)]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] flex items-center justify-center text-[10px] font-bold">
                      1
                    </span>
                    <span>Install Core Package via Bun or NPM</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1">
                  <div className="p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-between font-mono text-xs">
                    <span className="text-[var(--patiya-color-primary)]">
                      bun add patiya
                    </span>
                    <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] px-2 py-0.5 rounded-md border border-[var(--patiya-color-border)]">
                      Copy
                    </span>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="step-2"
                className="border border-[var(--patiya-color-border)] rounded-2xl bg-[var(--patiya-color-card)] px-5 shadow-xs overflow-hidden"
              >
                <AccordionTrigger className="py-4 text-xs font-bold hover:no-underline text-[var(--patiya-color-foreground)]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] flex items-center justify-center text-[10px] font-bold">
                      2
                    </span>
                    <span>Import Tokens & CSS Theme File</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1">
                  <div className="p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] font-mono text-xs text-[var(--patiya-color-muted-foreground)]">
                    @import &quot;patiya/dist/index.css&quot;;
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="step-3"
                className="border border-[var(--patiya-color-border)] rounded-2xl bg-[var(--patiya-color-card)] px-5 shadow-xs overflow-hidden"
              >
                <AccordionTrigger className="py-4 text-xs font-bold hover:no-underline text-[var(--patiya-color-foreground)]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] flex items-center justify-center text-[10px] font-bold">
                      3
                    </span>
                    <span>Mount Your First Component</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1">
                  <div className="p-3.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-between">
                    <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                      Ready to build! Try the interactive button:
                    </span>
                    <Button size="sm">Explore UI</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ),
        code: `<Accordion type="single" defaultValue="step-1" className="w-full border-none space-y-2.5">\n  <AccordionItem value="step-1" className="border rounded-2xl bg-[var(--patiya-color-card)] px-5">\n    <AccordionTrigger className="py-4 text-xs font-bold">\n      <div className="flex items-center gap-2.5">\n        <span className="w-5 h-5 rounded-full bg-[var(--patiya-color-primary)] text-white flex items-center justify-center text-[10px]">1</span>\n        <span>Install Core Package</span>\n      </div>\n    </AccordionTrigger>\n    <AccordionContent className="pb-4 pt-1 font-mono text-xs text-[var(--patiya-color-primary)]">\n      bun add patiya\n    </AccordionContent>\n  </AccordionItem>\n\n  <AccordionItem value="step-2" className="border rounded-2xl bg-[var(--patiya-color-card)] px-5">\n    <AccordionTrigger className="py-4 text-xs font-bold">\n      <div className="flex items-center gap-2.5">\n        <span className="w-5 h-5 rounded-full bg-[var(--patiya-color-muted)] flex items-center justify-center text-[10px]">2</span>\n        <span>Import Tokens & CSS File</span>\n      </div>\n    </AccordionTrigger>\n    <AccordionContent className="pb-4 pt-1 font-mono text-xs">\n      @import "patiya/dist/index.css";\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>`,
      },
      {
        title: "Pricing Tier Breakdown",
        description:
          "Accordion revealing detailed feature sets and inclusions for plan tiers.",
        preview: (
          <div className="w-full max-w-xl">
            <Accordion
              type="single"
              defaultValue="pro"
              className="w-full border-none space-y-3"
            >
              <AccordionItem
                value="starter"
                className="border border-[var(--patiya-color-border)] rounded-2xl bg-[var(--patiya-color-card)] px-5 shadow-xs overflow-hidden"
              >
                <AccordionTrigger className="py-4 text-xs font-bold hover:no-underline text-[var(--patiya-color-foreground)]">
                  <div className="flex items-center justify-between w-full pr-3">
                    <span className="text-sm">Starter Community</span>
                    <span className="font-mono text-xs font-semibold text-[var(--patiya-color-muted-foreground)]">
                      $0 / month
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[var(--patiya-color-muted-foreground)] pb-4 pt-1 space-y-2">
                  <div>
                    Includes 5 hosted projects, community forum support, and
                    public git repositories.
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Get Started Free
                  </Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="pro"
                className="border-2 border-[var(--patiya-color-primary)] rounded-2xl bg-[var(--patiya-color-primary)]/5 px-5 shadow-xs overflow-hidden"
              >
                <AccordionTrigger className="py-4 text-xs font-bold hover:no-underline text-[var(--patiya-color-primary)]">
                  <div className="flex items-center justify-between w-full pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Pro Team</span>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[var(--patiya-color-primary)] text-white">
                        Popular
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[var(--patiya-color-foreground)]">
                      $29 / month
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[var(--patiya-color-foreground)] pb-4 pt-1 space-y-3">
                  <div className="space-y-1.5 text-[11px] text-[var(--patiya-color-muted-foreground)]">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ Unlimited team members & projects
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ Real-time WebSocket sync & custom domains
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ Priority 1-hour SLA response time
                    </div>
                  </div>
                  <Button size="sm" className="w-full">
                    Upgrade to Pro
                  </Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="enterprise"
                className="border border-[var(--patiya-color-border)] rounded-2xl bg-[var(--patiya-color-card)] px-5 shadow-xs overflow-hidden"
              >
                <AccordionTrigger className="py-4 text-xs font-bold hover:no-underline text-[var(--patiya-color-foreground)]">
                  <div className="flex items-center justify-between w-full pr-3">
                    <span className="text-sm">Enterprise Dedicated</span>
                    <span className="text-xs font-semibold text-[var(--patiya-color-muted-foreground)]">
                      Custom Quote
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[var(--patiya-color-muted-foreground)] pb-4 pt-1 space-y-2">
                  <div>
                    Custom SLAs, dedicated VPC deployment, SOC2 Type II
                    compliance reports, and SAML/SSO integration.
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Contact Sales
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ),
        code: `<Accordion type="single" defaultValue="pro" className="w-full border-none space-y-3">\n  <AccordionItem value="starter" className="border rounded-2xl bg-[var(--patiya-color-card)] px-5">\n    <AccordionTrigger className="py-4 text-xs font-bold">\n      <div className="flex items-center justify-between w-full pr-3">\n        <span className="text-sm">Starter Community</span>\n        <span className="font-mono text-xs font-semibold">$0 / month</span>\n      </div>\n    </AccordionTrigger>\n    <AccordionContent className="text-xs pb-4 pt-1">\n      <div>Includes 5 hosted projects, community forum support, and public git repositories.</div>\n      <Button variant="outline" size="sm" className="w-full mt-2">Get Started Free</Button>\n    </AccordionContent>\n  </AccordionItem>\n\n  <AccordionItem value="pro" className="border-2 border-[var(--patiya-color-primary)] rounded-2xl bg-[var(--patiya-color-primary)]/5 px-5">\n    <AccordionTrigger className="py-4 text-xs font-bold text-[var(--patiya-color-primary)]">\n      <div className="flex items-center justify-between w-full pr-3">\n        <div className="flex items-center gap-2">\n          <span className="text-sm">Pro Team</span>\n          <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[var(--patiya-color-primary)] text-white">Popular</span>\n        </div>\n        <span className="font-mono text-xs font-bold">$29 / month</span>\n      </div>\n    </AccordionTrigger>\n    <AccordionContent className="text-xs pb-4 pt-1 space-y-3">\n      <div className="space-y-1.5 text-[11px] text-[var(--patiya-color-muted-foreground)]">\n        <div>✓ Unlimited team members & projects</div>\n        <div>✓ Real-time WebSocket sync & custom domains</div>\n        <div>✓ Priority 1-hour SLA response time</div>\n      </div>\n      <Button size="sm" className="w-full">Upgrade to Pro</Button>\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>`,
      },
    ],
    props: [
      {
        name: "type",
        type: "'single' | 'multiple'",
        default: "'single'",
        description:
          "Controls whether one or multiple accordion panels can be open simultaneously.",
      },
      {
        name: "defaultValue",
        type: "string | string[]",
        default: "[]",
        description:
          "The initial value(s) of the item(s) to expand on initial render.",
      },
      {
        name: "className",
        type: "string",
        default: "-",
        description:
          "Additional CSS classes applied to the root accordion container.",
      },
      {
        name: "AccordionItem.value",
        type: "string",
        default: "required",
        description:
          "Unique string value identifying this collapsible section.",
      },
      {
        name: "AccordionItem.className",
        type: "string",
        default: "-",
        description:
          "Additional CSS classes applied to the item boundary wrapper.",
      },
      {
        name: "AccordionTrigger.className",
        type: "string",
        default: "-",
        description:
          "Additional CSS classes applied to the interactive trigger button.",
      },
      {
        name: "AccordionTrigger.children",
        type: "React.ReactNode",
        default: "-",
        description:
          "Content displayed inside the header trigger (title, badges, leading icons).",
      },
      {
        name: "AccordionContent.className",
        type: "string",
        default: "-",
        description: "CSS classes applied to the collapsible content section.",
      },
      {
        name: "AccordionContent.children",
        type: "React.ReactNode",
        default: "-",
        description:
          "The expanded content revealed when the trigger is toggled open.",
      },
    ],
  },
  breadcrumb: {
    title: "Breadcrumb",
    description:
      "Displays the path to the current resource using a hierarchy of links.",
    installation: `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from 'patiya';`,
    examples: [
      {
        title: "Default",
        preview: <BreadcrumbPreview />,
        code: `<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/">Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Components</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`,
      },
      {
        title: "Minimal Path",
        preview: (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Analytics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ),
        code: `<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Analytics</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`,
      },
      {
        title: "With Ellipsis",
        preview: (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="flex h-9 w-9 items-center justify-center">
                  ...
                </span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Current Page</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ),
        code: `<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/">Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <span className="flex h-9 w-9 items-center justify-center">...</span>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Current Page</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`,
      },
    ],
  },
  pagination: {
    title: "Pagination",
    description: "Pagination with page navigation, next and previous links.",
    installation: `import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from 'patiya';`,
    examples: [
      {
        title: "Standard List",
        preview: <PaginationPreview />,
        code: `<Pagination>\n  <PaginationContent>\n    <PaginationItem>\n      <PaginationPrevious href="#" />\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink href="#" isActive>1</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationNext href="#" />\n    </PaginationItem>\n  </PaginationContent>\n</Pagination>`,
      },
      {
        title: "Simple",
        preview: (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ),
        code: `<Pagination>\n  <PaginationContent>\n    <PaginationItem>\n      <PaginationPrevious href="#" />\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationNext href="#" />\n    </PaginationItem>\n  </PaginationContent>\n</Pagination>`,
      },
      {
        title: "With Ellipsis",
        preview: (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <span className="flex h-9 w-9 items-center justify-center">
                  ...
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ),
        code: `<PaginationItem>\n  <PaginationEllipsis />\n</PaginationItem>`,
      },
    ],
  },
  navbar: {
    title: "Navbar",
    description:
      "A responsive top navigation bar with branding, links, and actions.",
    installation: `import { Navbar, NavbarContainer, NavbarBrand, NavbarContent, NavbarItem, NavbarActions } from 'patiya';`,
    examples: [
      {
        title: "Full Marketing Header",
        preview: <NavbarPreview />,
        code: `<Navbar>\n  <NavbarContainer>\n    <NavbarBrand>Acme Corp</NavbarBrand>\n    <NavbarContent>\n      <NavbarItem href="#">Products</NavbarItem>\n    </NavbarContent>\n    <NavbarActions>\n      <Button>Log in</Button>\n    </NavbarActions>\n  </NavbarContainer>\n</Navbar>`,
      },
      {
        title: "Centered Navigation",
        preview: (
          <Navbar>
            <NavbarContainer className="justify-center">
              <NavbarContent>
                <NavbarItem href="#">Home</NavbarItem>
                <NavbarItem href="#">About</NavbarItem>
                <NavbarItem href="#">Contact</NavbarItem>
              </NavbarContent>
            </NavbarContainer>
          </Navbar>
        ),
        code: `<NavbarContainer className="justify-center">\n  <NavbarContent>\n    <NavbarItem href="#">Home</NavbarItem>\n    <NavbarItem href="#">About</NavbarItem>\n  </NavbarContent>\n</NavbarContainer>`,
      },
    ],
  },
  command: {
    title: "Command",
    description: "Fast, composable, unstyled command menu for React.",
    installation: `import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut } from 'patiya';`,
    examples: [
      {
        title: "macOS Spotlight Style",
        preview: <CommandPreview />,
        code: `<Command>\n  <CommandInput placeholder="Type a command or search..." />\n  <CommandList>\n    <CommandEmpty>No results found.</CommandEmpty>\n    <CommandGroup heading="Suggestions">\n      <CommandItem>Calendar</CommandItem>\n      <CommandItem>Search Emoji</CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>`,
      },
      {
        title: "Command Dialog Overlay",
        preview: (
          <Box className="flex justify-center w-full relative">
            <Command className="rounded-lg border border-[var(--patiya-color-border)] shadow-md max-w-[450px]">
              <CommandInput placeholder="Search settings..." />
              <CommandList>
                <CommandEmpty>No settings found.</CommandEmpty>
                <CommandGroup heading="General">
                  <CommandItem>Profile</CommandItem>
                  <CommandItem>Billing</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </Box>
        ),
        code: `<Command className="rounded-lg border shadow-md">\n  <CommandInput placeholder="Search settings..." />\n  <CommandList>\n    <CommandEmpty>No settings found.</CommandEmpty>\n    <CommandGroup heading="General">\n      <CommandItem>Profile</CommandItem>\n      <CommandItem>Billing</CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>`,
      },
    ],
  },
  chart: {
    title: "Chart",
    description:
      "Beautiful, responsive charts built with Recharts and customized with our design system.",
    installation: `import { ChartContainer, ChartTooltipContent, LineChart, Line, XAxis, YAxis, RechartsTooltip } from 'patiya';`,
    examples: [
      {
        title: "Line Chart",
        preview: <ChartPreview />,
        code: `<ChartContainer config={{ value: { label: "Sales", color: "var(--patiya-color-primary)" } }}>\n  <LineChart data={data}>\n    <XAxis dataKey="name" />\n    <YAxis />\n    <RechartsTooltip content={<ChartTooltipContent />} />\n    <Line type="monotone" dataKey="value" stroke="var(--color-value)" />\n  </LineChart>\n</ChartContainer>`,
      },
      {
        title: "Customized Axes",
        preview: (
          <Box className="w-full">
            <ChartPreview />
          </Box>
        ),
        code: `<ChartContainer config={{ value: { label: "Sales", color: "var(--patiya-color-primary)" } }}>\n  <LineChart data={data}>\n    <XAxis dataKey="name" tickLine={false} axisLine={false} />\n    <YAxis tickLine={false} axisLine={false} />\n    <RechartsTooltip content={<ChartTooltipContent />} />\n    <Line type="monotone" dataKey="value" stroke="var(--color-value)" />\n  </LineChart>\n</ChartContainer>`,
      },
    ],
  },
  "rich-text-editor": {
    title: "Rich Text Editor",
    description: "A powerful, customizable rich text editor powered by Tiptap.",
    installation: `import { RichTextEditor } from 'patiya';`,
    examples: [
      {
        title: "Notion-like Editor",
        preview: <RichTextEditorPreview />,
        code: `<RichTextEditor \n  placeholder="Type your beautiful content here..." \n  onChange={(html) => console.log(html)}\n/>`,
      },
      {
        title: "Read-only Mode",
        preview: (
          <Box className="opacity-70 pointer-events-none w-full">
            <RichTextEditorPreview />
          </Box>
        ),
        code: `<RichTextEditor readOnly />`,
      },
    ],
  },
  textarea: {
    title: "Textarea",
    description: "Displays a multi-line text input field.",
    props: [
      {
        name: "variant",
        type: "'outline' | 'filled' | 'soft'",
        default: "-",
        description: "The visual style of the component.",
      },
      {
        name: "invalid",
        type: "boolean",
        default: "-",
        description: "Whether the input is in an invalid or error state.",
      },
    ],
    examples: [
      {
        title: "Default",
        preview: (
          <Textarea
            placeholder="Type your message here..."
            rows={4}
            className="max-w-md w-full"
          />
        ),
        code: `<Textarea placeholder="Type your message here..." rows={4} />`,
      },
      {
        title: "Disabled",
        preview: (
          <Textarea
            placeholder="Disabled..."
            disabled
            rows={2}
            className="max-w-md w-full"
          />
        ),
        code: `<Textarea placeholder="Disabled..." disabled rows={2} />`,
      },
    ],
  },
  switch: {
    title: "Switch",
    description:
      "A control that allows the user to toggle between checked and not checked with multiple sizes, variants, and colors.",
    installation: `import { Switch } from 'patiya';`,
    props: [
      {
        name: "size",
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: "The sizing of the switch component.",
      },
      {
        name: "variant",
        type: "'solid' | 'outline' | 'soft'",
        default: "'solid'",
        description: "The visual style variant of the switch.",
      },
      {
        name: "color",
        type: "PatiyaColor",
        default: "'primary'",
        description: "The color theme when checked.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Whether the switch is disabled and non-interactive.",
      },
      {
        name: "checked",
        type: "boolean",
        default: "false",
        description: "Controlled checked state.",
      },
      {
        name: "defaultChecked",
        type: "boolean",
        default: "false",
        description: "Default state when uncontrolled.",
      },
    ],
    examples: [
      {
        title: "Default",
        description: "Standard interactive switch with status label.",
        preview: <SwitchPreview />,
        code: `<Switch defaultChecked />`,
      },
      {
        title: "Sizes",
        description: "Switches are available in xs, sm, md, lg, and xl sizes.",
        preview: <SwitchSizesPreview />,
        code: `<Switch size="xs" defaultChecked />\n<Switch size="sm" defaultChecked />\n<Switch size="md" defaultChecked />\n<Switch size="lg" defaultChecked />\n<Switch size="xl" defaultChecked />`,
      },
      {
        title: "Variants",
        description: "Support for solid, soft, and outline styling variants.",
        preview: <SwitchVariantsPreview />,
        code: `<Switch variant="solid" color="primary" defaultChecked />\n<Switch variant="soft" color="primary" defaultChecked />\n<Switch variant="outline" color="primary" defaultChecked />`,
      },
      {
        title: "Color Themes",
        description: "Switches adapt to all system theme colors when active.",
        preview: <SwitchColorsPreview />,
        code: `<Switch color="primary" defaultChecked />\n<Switch color="secondary" defaultChecked />\n<Switch color="success" defaultChecked />\n<Switch color="warning" defaultChecked />\n<Switch color="destructive" defaultChecked />\n<Switch color="info" defaultChecked />\n<Switch color="accent" defaultChecked />`,
      },
      {
        title: "Settings Pattern",
        description:
          "Toggle list with titles and descriptions for settings dashboards.",
        preview: <SwitchCardPreview />,
        code: `<Box className="flex items-center justify-between p-4 border rounded-xl">\n  <Box>\n    <p className="text-sm font-medium">Wi-Fi Connection</p>\n    <p className="text-xs text-muted-foreground">Connect to known wireless networks</p>\n  </Box>\n  <Switch defaultChecked color="primary" />\n</Box>`,
      },
      {
        title: "Disabled States",
        description: "Disabled switches in both unchecked and checked states.",
        preview: (
          <Box className="flex items-center gap-6">
            <Box className="flex items-center gap-2">
              <Switch disabled />
              <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                Disabled Off
              </span>
            </Box>
            <Box className="flex items-center gap-2">
              <Switch disabled defaultChecked />
              <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                Disabled On
              </span>
            </Box>
            <Box className="flex items-center gap-2">
              <Switch disabled defaultChecked variant="soft" color="success" />
              <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                Disabled Soft
              </span>
            </Box>
          </Box>
        ),
        code: `<Switch disabled />\n<Switch disabled defaultChecked />\n<Switch disabled defaultChecked variant="soft" color="success" />`,
      },
    ],
  },
  checkbox: {
    title: "Checkbox",
    description:
      "A control that allows the user to toggle between checked and not checked with multiple sizes, variants, colors, and shapes.",
    installation: `import { Checkbox } from 'patiya';`,
    props: [
      {
        name: "size",
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: "The size of the checkbox element.",
      },
      {
        name: "variant",
        type: "'solid' | 'outline' | 'soft'",
        default: "'solid'",
        description: "The visual style variant of the checkbox.",
      },
      {
        name: "color",
        type: "PatiyaColor",
        default: "'primary'",
        description: "The color theme when checked or indeterminate.",
      },
      {
        name: "radius",
        type: "'none' | 'sm' | 'md' | 'lg' | 'full'",
        default: "'md'",
        description: "The border radius shape of the checkbox.",
      },
      {
        name: "indeterminate",
        type: "boolean",
        default: "false",
        description:
          "Whether the checkbox is in an indeterminate (partially checked) state.",
      },
      {
        name: "invalid",
        type: "boolean",
        default: "false",
        description: "Whether the checkbox indicates an error state.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Whether the checkbox is non-interactive.",
      },
      {
        name: "checked",
        type: "boolean",
        default: "false",
        description: "Controlled checked state.",
      },
    ],
    examples: [
      {
        title: "Default",
        description: "Standard checkbox with label.",
        preview: (
          <Box className="flex items-center gap-3">
            <Checkbox id="terms" defaultChecked />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              Accept terms and conditions
            </label>
          </Box>
        ),
        code: `<Checkbox id="terms" defaultChecked />\n<label htmlFor="terms">Accept terms and conditions</label>`,
      },
      {
        title: "Sizes",
        description:
          "Checkboxes are available in xs, sm, md, lg, and xl sizes.",
        preview: <CheckboxSizesPreview />,
        code: `<Checkbox size="xs" defaultChecked />\n<Checkbox size="sm" defaultChecked />\n<Checkbox size="md" defaultChecked />\n<Checkbox size="lg" defaultChecked />\n<Checkbox size="xl" defaultChecked />`,
      },
      {
        title: "Variants",
        description: "Support for solid, soft, and outline styling variants.",
        preview: <CheckboxVariantsPreview />,
        code: `<Checkbox variant="solid" color="primary" defaultChecked />\n<Checkbox variant="soft" color="primary" defaultChecked />\n<Checkbox variant="outline" color="primary" defaultChecked />`,
      },
      {
        title: "Color Themes",
        description: "Checkboxes adapt to all system theme colors when active.",
        preview: <CheckboxColorsPreview />,
        code: `<Checkbox color="primary" defaultChecked />\n<Checkbox color="secondary" defaultChecked />\n<Checkbox color="success" defaultChecked />\n<Checkbox color="warning" defaultChecked />\n<Checkbox color="destructive" defaultChecked />\n<Checkbox color="info" defaultChecked />\n<Checkbox color="accent" defaultChecked />`,
      },
      {
        title: "Border Radius",
        description:
          "Custom border radius shapes including square and circular checkboxes.",
        preview: <CheckboxRadiusPreview />,
        code: `<Checkbox radius="none" defaultChecked />\n<Checkbox radius="sm" defaultChecked />\n<Checkbox radius="md" defaultChecked />\n<Checkbox radius="lg" defaultChecked />\n<Checkbox radius="full" defaultChecked />`,
      },
      {
        title: "Indeterminate",
        description:
          "Partially selected state commonly used for nested item selections.",
        preview: <CheckboxIndeterminatePreview />,
        code: `<Checkbox indeterminate checked={false} onChange={handleParentToggle} />`,
      },
      {
        title: "Card Pattern",
        description:
          "Checkboxes inside interactive setting cards with descriptions.",
        preview: <CheckboxCardPreview />,
        code: `<label className="flex items-start gap-3 p-3.5 border rounded-xl">\n  <Checkbox defaultChecked />\n  <div>\n    <p className="font-medium text-sm">Email Notifications</p>\n    <p className="text-xs text-muted-foreground">Receive daily summary alerts</p>\n  </div>\n</label>`,
      },
      {
        title: "States",
        description: "Error and disabled states for form validations.",
        preview: (
          <Box className="flex flex-wrap items-center gap-6">
            <Box className="flex items-center gap-2">
              <Checkbox id="cb-inv" invalid />
              <label
                htmlFor="cb-inv"
                className="text-xs text-[var(--patiya-color-destructive)] cursor-pointer"
              >
                Invalid Error
              </label>
            </Box>
            <Box className="flex items-center gap-2">
              <Checkbox id="cb-dis" disabled />
              <label
                htmlFor="cb-dis"
                className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
              >
                Disabled
              </label>
            </Box>
            <Box className="flex items-center gap-2">
              <Checkbox id="cb-dis-chk" disabled defaultChecked />
              <label
                htmlFor="cb-dis-chk"
                className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
              >
                Disabled Checked
              </label>
            </Box>
          </Box>
        ),
        code: `<Checkbox invalid />\n<Checkbox disabled />\n<Checkbox disabled defaultChecked />`,
      },
    ],
  },
  radio: {
    title: "Radio",
    description: "A set of checkable buttons, known as radio buttons.",
    props: [
      {
        name: "size",
        type: "PatiyaSize",
        default: "'md'",
        description: "The size of the radio button (xs, sm, md, lg, xl).",
      },
      {
        name: "variant",
        type: "'solid' | 'outline' | 'soft'",
        default: "'solid'",
        description: "Visual appearance style variant.",
      },
      {
        name: "color",
        type: "PatiyaColor",
        default: "'primary'",
        description: "Theme accent color applied when selected.",
      },
      {
        name: "invalid",
        type: "boolean",
        default: "false",
        description: "Whether the radio is in an invalid or error state.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Whether the radio button is disabled.",
      },
    ],
    examples: [
      {
        title: "Default",
        description: "Standard radio group selection.",
        preview: (
          <Box className="flex gap-8">
            <Box className="flex items-center gap-3">
              <Radio name="plan" id="free" defaultChecked />
              <label
                htmlFor="free"
                className="text-sm font-medium cursor-pointer"
              >
                Free Plan
              </label>
            </Box>
            <Box className="flex items-center gap-3">
              <Radio name="plan" id="pro" />
              <label
                htmlFor="pro"
                className="text-sm font-medium cursor-pointer"
              >
                Pro Plan
              </label>
            </Box>
          </Box>
        ),
        code: `<Radio name="plan" id="free" defaultChecked />\n<Radio name="plan" id="pro" />`,
      },
      {
        title: "Sizes",
        description:
          "Radio buttons are available in xs, sm, md, lg, and xl sizes.",
        preview: <RadioSizesPreview />,
        code: `<Radio size="xs" name="size" />\n<Radio size="sm" name="size" />\n<Radio size="md" name="size" defaultChecked />\n<Radio size="lg" name="size" />\n<Radio size="xl" name="size" />`,
      },
      {
        title: "Variants",
        description: "Support for solid, soft, and outline styling variants.",
        preview: <RadioVariantsPreview />,
        code: `<Radio variant="solid" color="primary" defaultChecked />\n<Radio variant="soft" color="primary" />\n<Radio variant="outline" color="primary" />`,
      },
      {
        title: "Color Themes",
        description:
          "Radio buttons adapt to all system theme colors when selected.",
        preview: <RadioColorsPreview />,
        code: `<Radio color="primary" defaultChecked />\n<Radio color="secondary" defaultChecked />\n<Radio color="success" defaultChecked />\n<Radio color="warning" defaultChecked />\n<Radio color="destructive" defaultChecked />\n<Radio color="info" defaultChecked />\n<Radio color="accent" defaultChecked />`,
      },
      {
        title: "Card Pattern",
        description:
          "Radio options embedded inside interactive selection cards.",
        preview: <RadioCardPreview />,
        code: `<label className="flex items-center justify-between p-3.5 border rounded-xl cursor-pointer">\n  <div className="flex items-start gap-3">\n    <Radio name="plan" defaultChecked />\n    <div>\n      <p className="text-sm font-medium">Starter Plan</p>\n      <p className="text-xs text-muted-foreground">For small teams</p>\n    </div>\n  </div>\n  <span className="text-sm font-semibold">$9/mo</span>\n</label>`,
      },
      {
        title: "States",
        description: "Error and disabled states for radio inputs.",
        preview: (
          <Box className="flex flex-wrap items-center gap-6">
            <Box className="flex items-center gap-2">
              <Radio id="r-inv" invalid />
              <label
                htmlFor="r-inv"
                className="text-xs text-[var(--patiya-color-destructive)] cursor-pointer"
              >
                Invalid Error
              </label>
            </Box>
            <Box className="flex items-center gap-2">
              <Radio id="r-dis" disabled />
              <label
                htmlFor="r-dis"
                className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
              >
                Disabled
              </label>
            </Box>
            <Box className="flex items-center gap-2">
              <Radio id="r-dis-chk" disabled defaultChecked />
              <label
                htmlFor="r-dis-chk"
                className="text-xs text-[var(--patiya-color-muted-foreground)] cursor-pointer"
              >
                Disabled Checked
              </label>
            </Box>
          </Box>
        ),
        code: `<Radio invalid />\n<Radio disabled />\n<Radio disabled defaultChecked />`,
      },
    ],
  },
  select: {
    title: "Select",
    description: "Displays a list of options for the user to pick from.",
    props: [
      {
        name: "inputSize",
        type: "PatiyaSize",
        default: "'md'",
        description: "The size of the select element (xs, sm, md, lg, xl).",
      },
      {
        name: "variant",
        type: "'outline' | 'filled' | 'soft'",
        default: "'outline'",
        description: "The visual style of the select component.",
      },
      {
        name: "leftIcon",
        type: "React.ReactNode",
        default: "-",
        description: "Icon element to display on the left side.",
      },
      {
        name: "invalid",
        type: "boolean",
        default: "false",
        description: "Whether the select is in an invalid or error state.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Whether the select input is disabled.",
      },
    ],
    examples: [
      {
        title: "Default",
        description: "Basic select with placeholder and option choices.",
        preview: (
          <Select
            defaultValue=""
            className="max-w-xs w-full"
            aria-label="Select framework"
          >
            <option value="" disabled>
              Select a framework
            </option>
            <option value="nextjs">Next.js</option>
            <option value="react">React</option>
            <option value="vue">Vue</option>
            <option value="svelte">Svelte</option>
          </Select>
        ),
        code: `<Select defaultValue="">\n  <option value="" disabled>Select a framework</option>\n  <option value="nextjs">Next.js</option>\n  <option value="react">React</option>\n  <option value="vue">Vue</option>\n  <option value="svelte">Svelte</option>\n</Select>`,
      },
      {
        title: "Variants",
        description: "Available in outline, filled, and soft visual styles.",
        preview: (
          <Box className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
            <Box className="flex-1 space-y-1.5">
              <span className="text-xs font-medium text-[var(--patiya-color-muted-foreground)]">
                Outline (Default)
              </span>
              <Select
                variant="outline"
                defaultValue="outline"
                aria-label="Outline variant"
              >
                <option value="outline">Outline</option>
                <option value="option2">Option 2</option>
              </Select>
            </Box>
            <Box className="flex-1 space-y-1.5">
              <span className="text-xs font-medium text-[var(--patiya-color-muted-foreground)]">
                Filled
              </span>
              <Select
                variant="filled"
                defaultValue="filled"
                aria-label="Filled variant"
              >
                <option value="filled">Filled</option>
                <option value="option2">Option 2</option>
              </Select>
            </Box>
            <Box className="flex-1 space-y-1.5">
              <span className="text-xs font-medium text-[var(--patiya-color-muted-foreground)]">
                Soft
              </span>
              <Select
                variant="soft"
                defaultValue="soft"
                aria-label="Soft variant"
              >
                <option value="soft">Soft</option>
                <option value="option2">Option 2</option>
              </Select>
            </Box>
          </Box>
        ),
        code: `<Select variant="outline" defaultValue="outline">\n  <option value="outline">Outline</option>\n</Select>\n\n<Select variant="filled" defaultValue="filled">\n  <option value="filled">Filled</option>\n</Select>\n\n<Select variant="soft" defaultValue="soft">\n  <option value="soft">Soft</option>\n</Select>`,
      },
      {
        title: "Sizes",
        description:
          "Supports xs, sm, md, lg, and xl sizes to fit different layouts.",
        preview: (
          <Box className="flex flex-col gap-3 w-full max-w-sm">
            <Select
              inputSize="xs"
              defaultValue="xs"
              aria-label="Extra small select"
            >
              <option value="xs">Extra Small (xs)</option>
            </Select>
            <Select inputSize="sm" defaultValue="sm" aria-label="Small select">
              <option value="sm">Small (sm)</option>
            </Select>
            <Select inputSize="md" defaultValue="md" aria-label="Medium select">
              <option value="md">Medium (md)</option>
            </Select>
            <Select inputSize="lg" defaultValue="lg" aria-label="Large select">
              <option value="lg">Large (lg)</option>
            </Select>
            <Select
              inputSize="xl"
              defaultValue="xl"
              aria-label="Extra large select"
            >
              <option value="xl">Extra Large (xl)</option>
            </Select>
          </Box>
        ),
        code: `<Select inputSize="xs">...</Select>\n<Select inputSize="sm">...</Select>\n<Select inputSize="md">...</Select>\n<Select inputSize="lg">...</Select>\n<Select inputSize="xl">...</Select>`,
      },
      {
        title: "With Left Icon",
        description:
          "Includes a decorative or contextual icon inside the select.",
        preview: (
          <Box className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
            <Select
              defaultValue="us"
              aria-label="Country or region"
              className="flex-1"
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              }
            >
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="de">Germany</option>
              <option value="jp">Japan</option>
            </Select>
            <Select
              defaultValue="usd"
              aria-label="Billing currency"
              className="flex-1"
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              }
            >
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="gbp">GBP (£)</option>
              <option value="jpy">JPY (¥)</option>
            </Select>
          </Box>
        ),
        code: `<Select leftIcon={<GlobeIcon />} defaultValue="us">\n  <option value="us">United States</option>\n  <option value="uk">United Kingdom</option>\n</Select>\n\n<Select leftIcon={<CreditCardIcon />} defaultValue="usd">\n  <option value="usd">USD ($)</option>\n  <option value="eur">EUR (€)</option>\n</Select>`,
      },
      {
        title: "Grouped Options",
        description: "Organize related options into categories using optgroup.",
        preview: (
          <Select
            defaultValue=""
            className="max-w-xs w-full"
            aria-label="Select tech stack"
          >
            <option value="" disabled>
              Select technology...
            </option>
            <optgroup label="Frontend">
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="svelte">Svelte</option>
            </optgroup>
            <optgroup label="Backend">
              <option value="node">Node.js</option>
              <option value="go">Go</option>
              <option value="python">Python</option>
            </optgroup>
            <optgroup label="Database">
              <option value="postgres">PostgreSQL</option>
              <option value="redis">Redis</option>
            </optgroup>
          </Select>
        ),
        code: `<Select defaultValue="">\n  <option value="" disabled>Select technology...</option>\n  <optgroup label="Frontend">\n    <option value="react">React</option>\n    <option value="vue">Vue</option>\n  </optgroup>\n  <optgroup label="Backend">\n    <option value="node">Node.js</option>\n    <option value="go">Go</option>\n  </optgroup>\n</Select>`,
      },
      {
        title: "With Label & Helper Text",
        description:
          "Structured form field with top label and bottom helper instructions.",
        preview: (
          <Box className="flex flex-col gap-1.5 max-w-sm w-full">
            <label className="text-xs font-semibold text-[var(--patiya-color-foreground)] flex items-center justify-between">
              <span>Member Role</span>
              <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] font-normal">
                Required
              </span>
            </label>
            <Select defaultValue="editor" aria-label="Member Role">
              <option value="admin">Admin (Full permissions)</option>
              <option value="editor">Editor (Can edit content)</option>
              <option value="viewer">Viewer (Read-only)</option>
            </Select>
            <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
              Determines permission level across project workspaces.
            </span>
          </Box>
        ),
        code: `<Box className="flex flex-col gap-1.5">\n  <label className="text-xs font-semibold flex justify-between">\n    <span>Member Role</span>\n    <span className="text-xs text-muted-foreground">Required</span>\n  </label>\n  <Select defaultValue="editor">\n    <option value="admin">Admin</option>\n    <option value="editor">Editor</option>\n    <option value="viewer">Viewer</option>\n  </Select>\n  <span className="text-xs text-muted-foreground">\n    Determines permission level across project workspaces.\n  </span>\n</Box>`,
      },
      {
        title: "Invalid State",
        description:
          "Error boundary styling with descriptive validation message.",
        preview: (
          <Box className="flex flex-col gap-1.5 max-w-sm w-full">
            <Select
              invalid
              defaultValue=""
              aria-label="Department selection with error"
            >
              <option value="" disabled>
                Select department...
              </option>
              <option value="eng">Engineering</option>
              <option value="design">Design</option>
              <option value="product">Product</option>
            </Select>
            <span className="text-xs text-[var(--patiya-color-destructive)]">
              Please select a department to proceed.
            </span>
          </Box>
        ),
        code: `<Box className="flex flex-col gap-1.5">\n  <Select invalid defaultValue="">\n    <option value="" disabled>Select department...</option>\n    <option value="eng">Engineering</option>\n  </Select>\n  <span className="text-xs text-[var(--patiya-color-destructive)]">\n    Please select a department to proceed.\n  </span>\n</Box>`,
      },
      {
        title: "Disabled",
        description:
          "A disabled select element or individual disabled option items.",
        preview: (
          <Box className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
            <Box className="flex-1 space-y-1.5">
              <span className="text-xs font-medium text-[var(--patiya-color-muted-foreground)]">
                Disabled Select
              </span>
              <Select disabled defaultValue="pro" aria-label="Disabled select">
                <option value="pro">Pro Plan (Locked)</option>
              </Select>
            </Box>
            <Box className="flex-1 space-y-1.5">
              <span className="text-xs font-medium text-[var(--patiya-color-muted-foreground)]">
                Disabled Options
              </span>
              <Select
                defaultValue="starter"
                aria-label="Select with disabled options"
              >
                <option value="starter">Starter Plan</option>
                <option value="team" disabled>
                  Team Plan (Sold Out)
                </option>
                <option value="enterprise" disabled>
                  Enterprise (Waitlist)
                </option>
              </Select>
            </Box>
          </Box>
        ),
        code: `<Select disabled defaultValue="pro">\n  <option value="pro">Pro Plan (Locked)</option>\n</Select>\n\n<Select defaultValue="starter">\n  <option value="starter">Starter Plan</option>\n  <option value="team" disabled>Team Plan (Sold Out)</option>\n</Select>`,
      },
    ],
  },
  alert: {
    title: "Alert",
    description: "Displays a callout for user attention.",
    props: [
      {
        name: "color",
        type: "PatiyaColor",
        default: "-",
        description: "The semantic color theme of the component.",
      },
      {
        name: "variant",
        type: "'solid' | 'soft' | 'outline'",
        default: "-",
        description: "The visual style of the component.",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        default: "-",
        description: "Icon element to display within the component.",
      },
      {
        name: "title",
        type: "React.ReactNode",
        default: "-",
        description: "The title or heading content.",
      },
      {
        name: "onClose",
        type: "() => void",
        default: "-",
        description:
          "Callback function triggered when the component is closed or dismissed.",
      },
    ],
    examples: [
      {
        title: "Default",
        preview: (
          <Alert color="primary" variant="soft" title="Information">
            This is an informational alert.
          </Alert>
        ),
        code: `<Alert color="primary" variant="soft" title="Information">This is an informational alert.</Alert>`,
      },
      {
        title: "Success",
        preview: (
          <Alert color="accent" variant="solid" title="Success">
            Your changes have been saved successfully.
          </Alert>
        ),
        code: `<Alert color="accent" variant="solid" title="Success">Your changes have been saved successfully.</Alert>`,
      },
      {
        title: "Error Outline",
        preview: (
          <Alert color="destructive" variant="outline" title="Error">
            Something went wrong. Please try again.
          </Alert>
        ),
        code: `<Alert color="destructive" variant="outline" title="Error">Something went wrong. Please try again.</Alert>`,
      },
      {
        title: "Action Alert",
        preview: (
          <Alert
            color="secondary"
            variant="soft"
            title="Update Available"
            className="w-full"
          >
            <Box className="flex justify-between items-center w-full">
              <span>A new version is available.</span>
              <Button size="sm" variant="outline">
                Update
              </Button>
            </Box>
          </Alert>
        ),
        code: `<Alert title="Update Available">\n  <Box className="flex justify-between items-center w-full">\n    <span>A new version is available.</span>\n    <Button size="sm" variant="outline">Update</Button>\n  </Box>\n</Alert>`,
      },
      {
        title: "Dismissible",
        preview: <DismissibleAlertPreview />,
        code: `const [open, setOpen] = useState(true);\n\nif (!open) return null;\n\n<Alert color="primary" variant="soft" title="Note" onClose={() => setOpen(false)}>\n  This alert can be dismissed.\n</Alert>`,
      },
    ],
  },
  progress: {
    title: "Progress",
    description:
      "Displays an indicator showing the completion progress of a task.",
    props: [
      {
        name: "value",
        type: "number",
        default: "-",
        description: "The current value.",
      },
      {
        name: "max",
        type: "number",
        default: "-",
        description: "The maximum allowed value.",
      },
      {
        name: "progressSize",
        type: "PatiyaSize",
        default: "-",
        description: "The size of the progress indicator.",
      },
      {
        name: "color",
        type: "PatiyaColor",
        default: "-",
        description: "The semantic color theme of the component.",
      },
      {
        name: "isIndeterminate",
        type: "boolean",
        default: "-",
        description:
          "Whether the progress state is indeterminate (e.g. unknown duration).",
      },
    ],
    examples: [
      {
        title: "Default",
        preview: (
          <Progress value={45} color="primary" className="w-full max-w-md" />
        ),
        code: `<Progress value={45} color="primary" />`,
      },
      {
        title: "Accent Color",
        preview: (
          <Progress value={80} color="accent" className="w-full max-w-md" />
        ),
        code: `<Progress value={80} color="accent" />`,
      },
      {
        title: "Indeterminate",
        preview: (
          <Progress
            isIndeterminate
            color="secondary"
            className="w-full max-w-md"
          />
        ),
        code: `<Progress isIndeterminate color="secondary" />`,
      },
      {
        title: "Custom Height",
        preview: (
          <Box className="w-full max-w-md">
            <Progress value={60} color="primary" className="h-4" />
          </Box>
        ),
        code: `<Progress value={60} color="primary" className="h-4" />`,
      },
    ],
  },
  skeleton: {
    title: "Skeleton",
    description: "Use to show a placeholder while content is loading.",
    props: [
      {
        name: "isLoaded",
        type: "boolean",
        default: "-",
        description: "Whether the skeleton has finished loading.",
      },
    ],
    examples: [
      {
        title: "Profile Layout",
        preview: (
          <Box className="flex items-center space-x-4 w-full max-w-md">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Box className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </Box>
          </Box>
        ),
        code: `<Box className="flex items-center space-x-4">\n  <Skeleton className="h-12 w-12 rounded-full" />\n  <Box className="space-y-2">\n    <Skeleton className="h-4 w-[200px]" />\n    <Skeleton className="h-4 w-[150px]" />\n  </Box>\n</Box>`,
      },
      {
        title: "Card Layout",
        preview: (
          <Box className="space-y-3 w-full max-w-xs">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </Box>
        ),
        code: `<Box className="space-y-3">\n  <Skeleton className="h-[125px] w-[250px] rounded-xl" />\n  <Skeleton className="h-4 w-[200px]" />\n  <Skeleton className="h-4 w-[150px]" />\n</Box>`,
      },
      {
        title: "List Layout",
        preview: (
          <Box className="space-y-3 w-full max-w-md">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </Box>
        ),
        code: `<Box className="space-y-3">\n  <Skeleton className="h-4 w-full" />\n  <Skeleton className="h-4 w-full" />\n  <Skeleton className="h-4 w-[80%]" />\n</Box>`,
      },
      {
        title: "Form Layout",
        preview: (
          <Box className="space-y-4 w-full max-w-md">
            <Box className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full rounded-md" />
            </Box>
            <Box className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-md" />
            </Box>
            <Skeleton className="h-10 w-full rounded-md mt-6" />
          </Box>
        ),
        code: `<Box className="space-y-4">\n  <Skeleton className="h-10 w-full" />\n  <Skeleton className="h-10 w-full" />\n</Box>`,
      },
    ],
  },
  badge: {
    title: "Badge",
    description: "Displays a badge or a component that looks like a badge.",
    props: [
      {
        name: "variant",
        type: "PatiyaVariant",
        default: "-",
        description: "The visual style of the component.",
      },
      {
        name: "color",
        type: "PatiyaColor",
        default: "-",
        description: "The semantic color theme of the component.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        default: "-",
        description: "The size of the component.",
      },
      {
        name: "radius",
        type: "PatiyaRadius",
        default: "-",
        description: "The border radius of the component.",
      },
    ],
    examples: [
      {
        title: "Solid Colors",
        preview: (
          <Box className="flex flex-wrap gap-4">
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="accent">Accent</Badge>
            <Badge color="destructive">Error</Badge>
          </Box>
        ),
        code: `<Badge color="primary">Primary</Badge>\n<Badge color="secondary">Secondary</Badge>`,
      },
      {
        title: "Soft Variants",
        preview: (
          <Box className="flex flex-wrap gap-4">
            <Badge color="primary" variant="soft">
              Primary
            </Badge>
            <Badge color="secondary" variant="soft">
              Secondary
            </Badge>
            <Badge color="accent" variant="soft">
              Accent
            </Badge>
            <Badge color="destructive" variant="soft">
              Error
            </Badge>
          </Box>
        ),
        code: `<Badge color="primary" variant="soft">Primary</Badge>`,
      },
      {
        title: "Outline Variants",
        preview: (
          <Box className="flex flex-wrap gap-4">
            <Badge color="primary" variant="outline">
              Primary
            </Badge>
            <Badge color="secondary" variant="outline">
              Secondary
            </Badge>
            <Badge color="accent" variant="outline">
              Accent
            </Badge>
            <Badge color="destructive" variant="outline">
              Error
            </Badge>
          </Box>
        ),
        code: `<Badge color="primary" variant="outline">Primary</Badge>`,
      },
      {
        title: "Pill Shaped",
        preview: (
          <Box className="flex flex-wrap gap-4">
            <Badge color="primary" className="rounded-full px-3">
              Primary
            </Badge>
            <Badge color="accent" className="rounded-full px-3">
              Accent
            </Badge>
          </Box>
        ),
        code: `<Badge className="rounded-full">Primary</Badge>`,
      },
    ],
  },
  spinner: {
    title: "Spinner",
    description: "Indicates a loading state.",
    props: [
      {
        name: "size",
        type: "PatiyaSize",
        default: "-",
        description: "The size of the component.",
      },
      {
        name: "color",
        type: "PatiyaColor | 'current'",
        default: "-",
        description: "The semantic color theme of the component.",
      },
      {
        name: "label",
        type: "string",
        default: "-",
        description: "The accessible label or text.",
      },
    ],
    examples: [
      {
        title: "Sizes",
        preview: (
          <Box className="flex gap-8 items-center">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </Box>
        ),
        code: `<Spinner size="sm" />\n<Spinner size="md" />\n<Spinner size="lg" />`,
      },
      {
        title: "Colors",
        preview: (
          <Box className="flex gap-8 items-center">
            <Spinner color="primary" />
            <Spinner color="accent" />
            <Spinner color="destructive" />
            <Spinner color="secondary" />
          </Box>
        ),
        code: `<Spinner color="primary" />\n<Spinner color="accent" />`,
      },
      {
        title: "With Text",
        preview: (
          <Box className="flex items-center gap-3 text-sm text-(--patiya-color-muted-foreground)">
            <Spinner size="sm" color="primary" />
            Loading data...
          </Box>
        ),
        code: `<Box className="flex items-center gap-3">\n  <Spinner size="sm" />\n  Loading data...\n</Box>`,
      },
      {
        title: "Button Loading",
        preview: (
          <Box className="flex gap-4 items-center w-full">
            <Button disabled>
              <Spinner size="sm" className="mr-2" />
              Please wait
            </Button>
            <Button variant="outline" disabled>
              <Spinner size="sm" className="mr-2" />
              Processing
            </Button>
          </Box>
        ),
        code: `<Button disabled>\n  <Spinner size="sm" className="mr-2" />\n  Please wait\n</Button>`,
      },
    ],
  },
  tooltip: {
    title: "Tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    props: [
      {
        name: "content",
        type: "React.ReactNode",
        default: "-",
        description: "The content to display.",
      },
      {
        name: "children",
        type: "React.ReactElement",
        default: "-",
        description: "The content of the component.",
      },
      {
        name: "placement",
        type: "Placement",
        default: "-",
        description: "The preferred placement of the component.",
      },
      {
        name: "className",
        type: "string",
        default: "-",
        description: "Additional CSS classes to apply to the component.",
      },
      {
        name: "delay",
        type: "number",
        default: "-",
        description: "The delay in milliseconds before the component appears.",
      },
    ],
    examples: [
      {
        title: "Positions",
        preview: (
          <Box className="flex gap-8">
            <Tooltip content="Add to library" placement="top">
              <Button variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="Settings" placement="bottom">
              <Button variant="outline">Bottom</Button>
            </Tooltip>
          </Box>
        ),
        code: `<Tooltip content="Add to library" placement="top">\n  <Button variant="outline">Top</Button>\n</Tooltip>`,
      },
      {
        title: "With Delay",
        preview: (
          <Box className="flex gap-8">
            <Tooltip
              content="I appeared after 500ms!"
              delay={500}
              placement="top"
            >
              <Button variant="outline">Hover me slowly</Button>
            </Tooltip>
          </Box>
        ),
        code: `<Tooltip content="I appeared after 500ms!" delay={500}>\n  <Button>Hover me slowly</Button>\n</Tooltip>`,
      },
    ],
  },
  modal: {
    title: "Modal / Dialog",
    description:
      "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.",
    installation: `import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from 'patiya';`,
    props: [
      {
        name: "open",
        type: "boolean",
        default: "false",
        description: "The controlled open state of the modal.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        default: "-",
        description: "Event handler called when the open state changes.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        default: "-",
        description:
          "The content of the modal, typically ModalHeader and ModalFooter.",
      },
      {
        name: "size",
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'",
        default: "'md'",
        description: "The size of the modal.",
      },
    ],
    examples: [
      {
        title: "Standard Modal",
        preview: <ModalPreview />,
        code: `<Modal open={open} onOpenChange={setOpen}>\n  <ModalHeader>\n    <ModalTitle>Edit Profile</ModalTitle>\n    <ModalDescription>Make changes.</ModalDescription>\n  </ModalHeader>\n  <ModalFooter>\n    <Button onClick={() => setOpen(false)}>Save</Button>\n  </ModalFooter>\n</Modal>`,
      },
      {
        title: "Sizes",
        preview: <ModalSizePreview />,
        code: `<Modal open={open} onOpenChange={setOpen} size="xl">\n  <ModalHeader>\n    <ModalTitle>Extra Large Modal</ModalTitle>\n    <ModalDescription>This modal uses size="xl".</ModalDescription>\n  </ModalHeader>\n</Modal>`,
      },
      {
        title: "Confirmation Dialog",
        // Reusing for preview simplicity, imagine it says "Delete Account"
        preview: <ModalPreview />,
        code: `<Modal open={open} onOpenChange={setOpen}>\n  <ModalHeader>\n    <ModalTitle>Delete Account</ModalTitle>\n    <ModalDescription>Are you sure you want to delete your account? This action cannot be undone.</ModalDescription>\n  </ModalHeader>\n  <ModalFooter>\n    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>\n    <Button color="destructive">Delete</Button>\n  </ModalFooter>\n</Modal>`,
      },
    ],
  },
  drawer: {
    title: "Drawer / Sheet",
    description:
      "A panel that slides smoothly in from any edge of the screen with customizable backdrop and hardware-accelerated transitions.",
    props: [
      {
        name: "open",
        type: "boolean",
        default: "false",
        description: "The controlled open state of the drawer.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        default: "-",
        description: "Event handler called when the open state changes.",
      },
      {
        name: "side",
        type: "'right' | 'left' | 'top' | 'bottom'",
        default: "'right'",
        description:
          "The edge of the viewport where the drawer slides in from.",
      },
      {
        name: "className",
        type: "string",
        default: "-",
        description:
          "Additional CSS classes to customize drawer panel size and styling.",
      },
      {
        name: "overlayClassName",
        type: "string",
        default: "-",
        description: "Additional CSS classes for custom backdrop styling.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        default: "-",
        description: "Content rendered inside the drawer.",
      },
    ],
    examples: [
      {
        title: "Right-side Drawer (Default)",
        description:
          "Standard slide-over drawer from the right edge with form settings.",
        preview: <DrawerPreview />,
        code: `<Drawer open={open} onOpenChange={setOpen} side="right">\n  <DrawerHeader>\n    <DrawerTitle>Settings</DrawerTitle>\n    <DrawerDescription>Manage preferences and notifications.</DrawerDescription>\n  </DrawerHeader>\n  <Box className="flex-1 py-4 space-y-4">\n    <Box className="flex justify-between items-center">\n      <span>Push Notifications</span>\n      <Switch defaultChecked />\n    </Box>\n  </Box>\n  <DrawerFooter>\n    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>\n    <Button onClick={() => setOpen(false)}>Save Changes</Button>\n  </DrawerFooter>\n</Drawer>`,
      },
      {
        title: "Left-side Navigation Menu",
        description:
          "Drawer sliding in from the left edge, ideal for mobile or sidebar navigation.",
        preview: <DrawerLeftPreview />,
        code: `<Drawer open={open} onOpenChange={setOpen} side="left">\n  <DrawerHeader>\n    <DrawerTitle>Navigation</DrawerTitle>\n    <DrawerDescription>Explore workspace sections.</DrawerDescription>\n  </DrawerHeader>\n  <Box className="flex-1 py-4 space-y-2">\n    <Button variant="ghost" fullWidth className="justify-start">Dashboard</Button>\n    <Button variant="ghost" fullWidth className="justify-start">Projects</Button>\n    <Button variant="ghost" fullWidth className="justify-start">Team Members</Button>\n  </Box>\n  <DrawerFooter>\n    <Button variant="outline" onClick={() => setOpen(false)} fullWidth>Close Menu</Button>\n  </DrawerFooter>\n</Drawer>`,
      },
      {
        title: "Bottom Sheet",
        description:
          "Slides up from the bottom with drag handle indicator, perfect for mobile quick actions.",
        preview: (
          <Box className="text-center w-full">
            <BottomSheetPreview />
          </Box>
        ),
        code: `<Drawer open={open} onOpenChange={setOpen} side="bottom">\n  <Box className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mb-3" />\n  <DrawerHeader>\n    <DrawerTitle>Quick Actions</DrawerTitle>\n    <DrawerDescription>Choose an action to perform on this document.</DrawerDescription>\n  </DrawerHeader>\n  <Box className="grid grid-cols-2 gap-3 py-4">\n    <Button variant="outline">Copy Link</Button>\n    <Button variant="outline">Export PDF</Button>\n  </Box>\n  <DrawerFooter>\n    <Button onClick={() => setOpen(false)} fullWidth>Done</Button>\n  </DrawerFooter>\n</Drawer>`,
      },
      {
        title: "Top Drawer",
        description:
          "Slides down from the top edge for system announcements and maintenance banners.",
        preview: <DrawerTopPreview />,
        code: `<Drawer open={open} onOpenChange={setOpen} side="top">\n  <DrawerHeader>\n    <DrawerTitle>System Maintenance Notice</DrawerTitle>\n    <DrawerDescription>Scheduled maintenance is planned for Sunday at 02:00 UTC.</DrawerDescription>\n  </DrawerHeader>\n  <Box className="py-2 text-sm text-muted-foreground">\n    All API endpoints and dashboards will experience up to 15 minutes of downtime.\n  </Box>\n  <DrawerFooter>\n    <Button variant="outline" onClick={() => setOpen(false)}>Dismiss</Button>\n    <Button onClick={() => setOpen(false)}>View Status Page</Button>\n  </DrawerFooter>\n</Drawer>`,
      },
      {
        title: "Form in Drawer",
        description:
          "Edit profile slide-over with inputs, select dropdown, and bio textarea.",
        preview: <DrawerFormPreview />,
        code: `<Drawer open={open} onOpenChange={setOpen} side="right">\n  <DrawerHeader>\n    <DrawerTitle>Edit Profile</DrawerTitle>\n    <DrawerDescription>Update public credentials and role.</DrawerDescription>\n  </DrawerHeader>\n  <Box className="flex-1 py-4 space-y-4">\n    <Input placeholder="Enter name" defaultValue="Sarah Connor" />\n    <Input type="email" placeholder="Enter email" defaultValue="sarah@example.com" />\n    <Select defaultValue="editor">\n      <option value="admin">Administrator</option>\n      <option value="editor">Editor</option>\n    </Select>\n    <Textarea defaultValue="Staff engineer building modern design systems." />\n  </Box>\n  <DrawerFooter>\n    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>\n    <Button onClick={() => setOpen(false)}>Save Profile</Button>\n  </DrawerFooter>\n</Drawer>`,
      },
      {
        title: "Shopping Cart Slide-Over",
        description:
          "E-commerce cart drawer with item breakdown, pricing, and checkout button.",
        preview: <DrawerCartPreview />,
        code: `<Drawer open={open} onOpenChange={setOpen} side="right">\n  <DrawerHeader>\n    <DrawerTitle>Shopping Cart</DrawerTitle>\n    <DrawerDescription>You have 2 items in your cart.</DrawerDescription>\n  </DrawerHeader>\n  <Box className="flex-1 py-4 space-y-4">\n    <Box className="flex justify-between items-center pb-3 border-b">\n      <span>Mechanical Keyboard</span>\n      <span>$149.00</span>\n    </Box>\n  </Box>\n  <DrawerFooter>\n    <Button variant="outline" onClick={() => setOpen(false)}>Continue Shopping</Button>\n    <Button onClick={() => setOpen(false)}>Checkout Now</Button>\n  </DrawerFooter>\n</Drawer>`,
      },
    ],
  },
  popover: {
    title: "Popover",
    description: "Displays rich content in a portal, triggered by a button.",
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        default: "-",
        description: "The content of the component.",
      },
      {
        name: "placement",
        type: "Placement",
        default: "-",
        description: "The preferred placement of the component.",
      },
      {
        name: "open",
        type: "boolean",
        default: "-",
        description: "The controlled open state of the component.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        default: "-",
        description: "Event handler called when the open state changes.",
      },
    ],
    examples: [
      {
        title: "Default",
        preview: <PopoverPreview />,
        code: `<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">Open</Button>\n  </PopoverTrigger>\n  <PopoverContent>\n    <p>Place content here.</p>\n  </PopoverContent>\n</Popover>`,
      },
      {
        title: "Profile Popover",
        preview: (
          <Box className="flex justify-center w-full">
            <ProfilePopoverPreview />
          </Box>
        ),
        code: `<Popover>\n  <PopoverTrigger asChild>\n    <Avatar src="https://i.pravatar.cc/150" className="cursor-pointer" />\n  </PopoverTrigger>\n  <PopoverContent className="w-56">\n    <Box className="flex flex-col gap-2 p-2">\n      <h4 className="font-semibold text-sm">John Doe</h4>\n      <p className="text-xs text-muted-foreground">john@example.com</p>\n    </Box>\n  </PopoverContent>\n</Popover>`,
      },
    ],
  },
  "dropdown-menu": {
    title: "Dropdown Menu",
    description:
      "Displays a menu to the user-such as a set of actions or functions-triggered by a button.",
    installation: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from 'patiya';`,
    props: [
      {
        name: "placement",
        type: "Placement",
        default: "'bottom-start'",
        description: "The preferred placement of the dropdown menu.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        default: "-",
        description: "The trigger and content of the dropdown menu.",
      },
      {
        name: "asChild (Trigger)",
        type: "boolean",
        default: "false",
        description:
          "Whether to merge the trigger props onto its child element.",
      },
    ],
    examples: [
      {
        title: "User Profile Menu",
        preview: <DropdownPreview />,
        code: `<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant="outline">Open</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem>Profile</DropdownMenuItem>\n    <DropdownMenuItem>Billing</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
      },
      {
        title: "With Icons",
        preview: (
          <Box className="flex justify-center w-full">
            <DropdownWithIconsPreview />
          </Box>
        ),
        code: `<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant="outline">Settings</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem>\n      <svg className="mr-2 h-4 w-4">...</svg> Profile\n    </DropdownMenuItem>\n    <DropdownMenuItem>\n      <svg className="mr-2 h-4 w-4">...</svg> Billing\n    </DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
      },
      {
        title: "Avatar Trigger",
        preview: (
          <Box className="flex justify-center w-full">
            <DropdownAvatarPreview />
          </Box>
        ),
        code: `<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Avatar src="https://i.pravatar.cc/150" className="cursor-pointer" />\n  </DropdownMenuTrigger>\n  <DropdownMenuContent className="w-48">\n    <DropdownMenuItem>Profile</DropdownMenuItem>\n    <DropdownMenuItem>Settings</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
      },
    ],
  },
  toast: {
    title: "Toast",
    description: "A succinct message that is displayed temporarily.",
    installation: `import { useToast } from 'patiya';`,
    props: [
      {
        name: "title",
        type: "string",
        default: "-",
        description: "The title of the toast message.",
      },
      {
        name: "description",
        type: "string",
        default: "-",
        description: "The description or body of the toast.",
      },
      {
        name: "type",
        type: "'default' | 'success' | 'error' | 'warning' | 'info'",
        default: "'default'",
        description: "The semantic color type of the toast.",
      },
      {
        name: "duration",
        type: "number",
        default: "5000",
        description: "Time in milliseconds before the toast auto-dismisses.",
      },
    ],
    examples: [
      {
        title: "Different Types",
        preview: <ToastPreview />,
        code: `const { toast } = useToast();\n\ntoast({\n  title: 'Success!',\n  description: 'Your changes were saved.',\n  type: 'success'\n});`,
      },
      {
        title: "Action Toast",
        preview: (
          <Box className="flex justify-center w-full">
            <Button variant="outline" onClick={() => alert("Toast triggered")}>
              Undo Action
            </Button>
          </Box>
        ),
        code: `toast({\n  title: 'Deleted',\n  action: <Button>Undo</Button>\n});`,
      },
    ],
  },
  spotlightCard: {
    title: "Spotlight Card",
    description:
      "A beautiful card that tracks the mouse and reveals a soft spotlight behind its content.",
    installation: `import { SpotlightCard } from 'patiya';`,
    props: [
      {
        name: "spotlightColor",
        type: "'primary' | 'secondary' | 'accent' | 'destructive' | 'success' | 'warning' | 'info' | 'spotlight'",
        default: "'spotlight'",
        description: "The color of the spotlight effect.",
      },
      {
        name: "spotlightSize",
        type: "number",
        default: "250",
        description: "The radius size of the spotlight.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: <SpotlightCardPreview />,
        code: `<SpotlightCard className="w-full max-w-sm text-center">\n  <h3 className="text-xl font-semibold mb-2">Spotlight Card</h3>\n  <p className="text-(--patiya-color-muted-foreground) text-sm">\n    Hover over me to see the beautiful glowing spotlight effect tracking your cursor.\n  </p>\n</SpotlightCard>`,
      },
      {
        title: "Primary Color Spotlight",
        preview: (
          <Box className="flex w-full items-center justify-center py-10">
            <SpotlightCard
              spotlightColor="primary"
              className="w-full max-w-sm text-center"
            >
              <h3 className="text-xl font-semibold mb-2">Primary Spotlight</h3>
              <p className="text-(--patiya-color-muted-foreground) text-sm">
                This card uses the primary brand color for its spotlight effect.
              </p>
            </SpotlightCard>
          </Box>
        ),
        code: `<SpotlightCard spotlightColor="primary" className="w-full max-w-sm text-center">\n  <h3 className="text-xl font-semibold mb-2">Primary Spotlight</h3>\n  <p className="text-(--patiya-color-muted-foreground) text-sm">\n    This card uses the primary brand color for its spotlight effect.\n  </p>\n</SpotlightCard>`,
      },
    ],
  },
  tiltCard: {
    title: "Tilt Card",
    description:
      "A 3D hover card that tilts smoothly towards your cursor, complete with a beautiful glare effect for a realistic look.",
    installation: `import { TiltCard } from 'patiya';`,
    props: [
      {
        name: "tiltMaxAngleX",
        type: "number",
        default: "20",
        description: "Maximum rotation angle around the X-axis.",
      },
      {
        name: "tiltMaxAngleY",
        type: "number",
        default: "20",
        description: "Maximum rotation angle around the Y-axis.",
      },
      {
        name: "perspective",
        type: "number",
        default: "1000",
        description: "3D perspective value in pixels.",
      },
      {
        name: "glareOpacity",
        type: "number",
        default: "0.5",
        description: "Maximum opacity of the radial glare effect (0 to 1).",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "If true, disables the hover and tilt effects entirely.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-10">
            <TiltCard className="w-full max-w-[300px] h-[400px]">
              <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[var(--patiya-color-card)] rounded-xl relative overflow-hidden group border border-[var(--patiya-color-border)] shadow-sm">
                <div className="absolute inset-0 bg-grid-[var(--patiya-color-border)]/[0.2] bg-[size:20px_20px]" />
                <div className="relative z-10">
                  <Avatar
                    src="https://i.pravatar.cc/200"
                    alt="@avatar"
                    size="xl"
                    className="mx-auto mb-6 shadow-lg"
                  />
                  <h3 className="text-2xl font-bold mb-2">Tilt Card</h3>
                  <p className="text-[var(--patiya-color-muted-foreground)]">
                    Hover over this card to see it tilt in 3D space with a
                    dynamic glare effect.
                  </p>
                </div>
              </div>
            </TiltCard>
          </Box>
        ),
        code: `<TiltCard className="w-full max-w-[300px] h-[400px]">
  <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[var(--patiya-color-card)] rounded-xl relative overflow-hidden border border-[var(--patiya-color-border)]">
    <div className="absolute inset-0 bg-grid-[var(--patiya-color-border)]/[0.2] bg-[size:20px_20px]" />
    <div className="relative z-10">
      <Avatar src="https://i.pravatar.cc/200" alt="u-avatar" size="xl" className="mx-auto mb-6 shadow-lg" />
      <h3 className="text-2xl font-bold mb-2">Tilt Card</h3>
      <p className="text-[var(--patiya-color-muted-foreground)]">
        Hover over this card to see it tilt in 3D space with a dynamic glare effect.
      </p>
    </div>
  </div>
</TiltCard>`,
      },
    ],
  },
  compareSlider: {
    title: "Compare Slider",
    description:
      "An interactive slider to compare two images (Before/After) side by side.",
    installation: `import { CompareSlider } from 'patiya';`,
    props: [
      {
        name: "beforeImage",
        type: "string",
        default: "''",
        description: "The source URL for the before image.",
      },
      {
        name: "afterImage",
        type: "string",
        default: "''",
        description: "The source URL for the after image.",
      },
      {
        name: "beforeLabel",
        type: "string",
        default: "'Before'",
        description: "Label shown over the before image.",
      },
      {
        name: "afterLabel",
        type: "string",
        default: "'After'",
        description: "Label shown over the after image.",
      },
      {
        name: "initialPosition",
        type: "number",
        default: "50",
        description: "Initial percentage position of the slider (0-100).",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center">
            <CompareSlider
              className="max-w-3xl"
              beforeImage="https://images.unsplash.com/photo-1542317148-8b4bdccb33ea?q=80&w=1200&auto=format&fit=crop"
              afterImage="https://images.unsplash.com/photo-1542317148-8b4bdccb33ea?q=80&w=1200&auto=format&fit=crop&sat=-100"
              beforeLabel="Original"
              afterLabel="Grayscale"
            />
          </Box>
        ),
        code: `<CompareSlider\n  className="max-w-3xl"\n  beforeImage="https://images.unsplash.com/photo-1542317148-8b4bdccb33ea?q=80&w=1200&auto=format&fit=crop"\n  afterImage="https://images.unsplash.com/photo-1542317148-8b4bdccb33ea?q=80&w=1200&auto=format&fit=crop&sat=-100"\n  beforeLabel="Original"\n  afterLabel="Grayscale"\n/>`,
      },
    ],
  },
  scratchToReveal: {
    title: "Scratch To Reveal",
    description:
      'A highly interactive and fun component that lets users "scratch" away a top layer (using mouse or touch) to reveal the hidden content underneath.',
    installation: `import { ScratchToReveal } from 'patiya';`,
    props: [
      {
        name: "width",
        type: "number",
        default: "-",
        description: "Width of the scratch area in pixels.",
      },
      {
        name: "height",
        type: "number",
        default: "-",
        description: "Height of the scratch area in pixels.",
      },
      {
        name: "minScratchPercentage",
        type: "number",
        default: "50",
        description:
          "Percentage of the area that must be scratched to trigger completion.",
      },
      {
        name: "coverImage",
        type: "string",
        default: "''",
        description: "Optional image to use as the scratch-off cover.",
      },
      {
        name: "coverColor",
        type: "string",
        default: "'#cbd5e1'",
        description: "Solid color to use as the cover if no image is provided.",
      },
      {
        name: "brushSize",
        type: "number",
        default: "40",
        description: "Size of the scratch brush.",
      },
      {
        name: "onComplete",
        type: "() => void",
        default: "undefined",
        description: "Callback fired when the scratch percentage is met.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-10 px-4 flex-col gap-4">
            <p className="text-sm text-gray-500 mb-2">
              Scratch the card to reveal the secret!
            </p>
            <ScratchToReveal
              width={300}
              height={300}
              minScratchPercentage={60}
              coverColor="#94a3b8"
              className="rounded-2xl shadow-xl border border-gray-200"
            >
              <div className="w-full h-full flex flex-col items-center justify-center bg-white p-6 text-center">
                <span className="text-6xl mb-4">🎉</span>
                <h3 className="text-2xl font-bold text-gray-800">You Won!</h3>
                <p className="text-gray-500 mt-2">
                  Claim your 50% discount code: <strong>PATIYA50</strong>
                </p>
              </div>
            </ScratchToReveal>
          </Box>
        ),
        code: `<ScratchToReveal\n  width={300}\n  height={300}\n  minScratchPercentage={60}\n  coverColor="#94a3b8"\n  className="rounded-2xl shadow-xl"\n>\n  <div className="w-full h-full flex flex-col items-center justify-center bg-white p-6 text-center">\n    <span className="text-6xl mb-4">🎉</span>\n    <h3 className="text-2xl font-bold text-gray-800">You Won!</h3>\n    <p className="text-gray-500 mt-2">Claim your 50% discount code: <strong>PATIYA50</strong></p>\n  </div>\n</ScratchToReveal>`,
      },
    ],
  },
  magnetic: {
    title: "Magnetic",
    description:
      "A component wrapper that smoothly pulls its children towards the user's mouse cursor when hovered, creating a magnetic field effect.",
    installation: `import { Magnetic } from 'patiya';`,
    props: [
      {
        name: "intensity",
        type: "number",
        default: "0.5",
        description: "The strength of the magnetic pull.",
      },
      {
        name: "range",
        type: "number",
        default: "100",
        description:
          "The distance in pixels at which the magnetic pull activates.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-10 px-4">
            <Magnetic intensity={0.5} range={120}>
              <Button
                size="lg"
                className="rounded-full h-16 px-8 text-lg bg-black text-white hover:bg-black/90 hover:text-white dark:bg-white dark:text-black"
              >
                Hover Me
              </Button>
            </Magnetic>
          </Box>
        ),
        code: `<Magnetic intensity={0.5} range={120}>\n  <Button size="lg" className="rounded-full h-16 px-8 text-lg bg-black text-white hover:bg-black/90 hover:text-white dark:bg-white dark:text-black">\n    Hover Me\n  </Button>\n</Magnetic>`,
      },
    ],
  },
  dock: {
    title: "Dock",
    description:
      "A Mac OS style interactive dock. Items magnify dynamically based on their proximity to the mouse cursor.",
    installation: `import { Dock, DockItem } from 'patiya';`,
    props: [
      {
        name: "magnification",
        type: "number",
        default: "60",
        description: "Maximum pixel size an item reaches when fully hovered.",
      },
      {
        name: "distance",
        type: "number",
        default: "140",
        description: "The interaction distance in pixels for magnification.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-10 px-4">
            <Dock magnification={60} distance={140}>
              <DockItem className="bg-blue-500 text-white">1</DockItem>
              <DockItem className="bg-red-500 text-white">2</DockItem>
              <DockItem className="bg-green-500 text-white">3</DockItem>
              <DockItem className="bg-yellow-500 text-white">4</DockItem>
              <DockItem className="bg-purple-500 text-white">5</DockItem>
            </Dock>
          </Box>
        ),
        code: `<Dock magnification={60} distance={140}>\n  <DockItem className="bg-blue-500 text-white">1</DockItem>\n  <DockItem className="bg-red-500 text-white">2</DockItem>\n  <DockItem className="bg-green-500 text-white">3</DockItem>\n  <DockItem className="bg-yellow-500 text-white">4</DockItem>\n  <DockItem className="bg-purple-500 text-white">5</DockItem>\n</Dock>`,
      },
    ],
  },
  flipCard: {
    title: "Flip Card",
    description:
      "An interactive 3D card that flips over when clicked to reveal the back side.",
    installation: `import { FlipCard } from 'patiya';`,
    props: [
      {
        name: "front",
        type: "ReactNode",
        default: "-",
        description: "The content for the front face of the card.",
      },
      {
        name: "back",
        type: "ReactNode",
        default: "-",
        description: "The content for the back face of the card.",
      },
      {
        name: "direction",
        type: "horizontal | vertical",
        default: "horizontal",
        description: "The axis on which the card flips.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-10 px-4">
            <FlipCard
              className="w-[300px] h-[400px]"
              direction="horizontal"
              front={
                <div className="w-full h-full bg-[var(--patiya-color-card)] rounded-[1.5rem] shadow-lg flex flex-col items-center justify-center border border-[var(--patiya-color-border)] p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--patiya-color-primary)]/10 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-150" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />

                  <div className="w-16 h-16 rounded-full bg-[var(--patiya-color-primary)]/10 flex items-center justify-center mb-6 text-[var(--patiya-color-primary)] ring-1 ring-[var(--patiya-color-primary)]/20 shadow-inner">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--patiya-color-foreground)]">
                    Premium Pass
                  </h3>
                  <p className="text-sm text-[var(--patiya-color-muted-foreground)] mt-2 font-medium tracking-wide">
                    Click to Reveal
                  </p>
                </div>
              }
              back={
                <div className="w-full h-full bg-gradient-to-br from-[var(--patiya-color-primary)] via-[var(--patiya-color-primary)] to-purple-600 rounded-[1.5rem] shadow-xl flex flex-col p-8 text-[var(--patiya-color-primary-foreground)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                  <div className="relative z-10 flex justify-between items-center mb-6 pb-4 border-b border-white/20">
                    <span className="font-bold tracking-widest text-lg">
                      VIP
                    </span>
                    <span className="font-mono text-xs font-bold bg-white/20 text-white px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-sm">
                      LIFETIME
                    </span>
                  </div>
                  <div className="relative z-10 mt-auto space-y-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-2xl tracking-tight leading-none">
                        Unlocked
                      </h4>
                      <p className="text-sm text-white/80 leading-relaxed pt-2">
                        Full access to all premium components, priority updates,
                        and exclusive templates.
                      </p>
                    </div>
                  </div>
                </div>
              }
            />
          </Box>
        ),
        code: `<FlipCard\n  className="w-[300px] h-[400px]"\n  direction="horizontal"\n  front={\n    <div className="w-full h-full bg-[var(--patiya-color-card)] rounded-[1.5rem] shadow-lg flex flex-col items-center justify-center border border-[var(--patiya-color-border)] p-6 relative overflow-hidden group">\n      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--patiya-color-primary)]/10 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-150" />\n      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />\n      \n      <div className="w-16 h-16 rounded-full bg-[var(--patiya-color-primary)]/10 flex items-center justify-center mb-6 text-[var(--patiya-color-primary)] ring-1 ring-[var(--patiya-color-primary)]/20 shadow-inner">\n        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />\n        </svg>\n      </div>\n      <h3 className="text-2xl font-bold text-[var(--patiya-color-foreground)]">Premium Pass</h3>\n      <p className="text-sm text-[var(--patiya-color-muted-foreground)] mt-2 font-medium tracking-wide">Click to Reveal</p>\n    </div>\n  }\n  back={\n    <div className="w-full h-full bg-gradient-to-br from-[var(--patiya-color-primary)] via-[var(--patiya-color-primary)] to-purple-600 rounded-[1.5rem] shadow-xl flex flex-col p-8 text-[var(--patiya-color-primary-foreground)] relative overflow-hidden">\n      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />\n      <div className="relative z-10 flex justify-between items-center mb-6 pb-4 border-b border-white/20">\n        <span className="font-bold tracking-widest text-lg">VIP</span>\n        <span className="font-mono text-xs font-bold bg-white/20 text-white px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-sm">LIFETIME</span>\n      </div>\n      <div className="relative z-10 mt-auto space-y-4">\n        <div className="space-y-1">\n          <h4 className="font-bold text-2xl tracking-tight leading-none">Unlocked</h4>\n          <p className="text-sm text-white/80 leading-relaxed pt-2">Full access to all premium components, priority updates, and exclusive templates.</p>\n        </div>\n      </div>\n    </div>\n  }\n/>`,
      },
    ],
  },
  directionAwareHover: {
    title: "Direction Aware Hover",
    description:
      "An interactive image card where the overlay slides in from the exact direction (top, right, bottom, left) that your mouse enters it from.",
    installation: `import { DirectionAwareHover } from 'patiya';`,
    props: [
      {
        name: "imageUrl",
        type: "string",
        default: "''",
        description: "The source URL for the background image.",
      },
      {
        name: "children",
        type: "ReactNode",
        default: "-",
        description: "Content rendered inside the overlay.",
      },
      {
        name: "overlayClassName",
        type: "string",
        default: "''",
        description: "Additional classes for the overlay container.",
      },
      {
        name: "imageClassName",
        type: "string",
        default: "''",
        description: "Additional classes for the background image.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-10 px-4">
            <DirectionAwareHover
              className="w-80 h-96"
              imageUrl="https://images.unsplash.com/photo-1542317148-8b4bdccb33ea?q=80&w=1200&auto=format&fit=crop"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                Beautiful Scenery
              </h3>
              <p className="text-gray-200">
                The overlay knows where you came from.
              </p>
            </DirectionAwareHover>
          </Box>
        ),
        code: `<DirectionAwareHover\n  className="w-80 h-96"\n  imageUrl="https://images.unsplash.com/photo-1542317148-8b4bdccb33ea?q=80&w=1200&auto=format&fit=crop"\n>\n  <h3 className="text-2xl font-bold text-white mb-2">Beautiful Scenery</h3>\n  <p className="text-gray-200">The overlay knows where you came from.</p>\n</DirectionAwareHover>`,
      },
    ],
  },
  shimmerButton: {
    title: "Shimmer Button",
    description:
      "A premium button component with a beautiful rotating conic-gradient border shimmer effect.",
    installation: `import { ShimmerButton } from 'patiya';`,
    props: [
      {
        name: "shimmerColor",
        type: "string",
        default: "'#ffffff'",
        description: "Color of the shimmer ray.",
      },
      {
        name: "shimmerSize",
        type: "string",
        default: "'0.05em'",
        description: "Thickness of the shimmering border.",
      },
      {
        name: "shimmerDuration",
        type: "string",
        default: "'3s'",
        description: "Time taken for one full rotation.",
      },
      {
        name: "background",
        type: "string",
        default: "'var(--patiya-color-primary)'",
        description: "Background color of the button.",
      },
      {
        name: "borderRadius",
        type: "string",
        default: "'100px'",
        description: "Border radius for pill or rounded shapes.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex flex-col sm:flex-row w-full items-center justify-center py-10 px-4 gap-4">
            <ShimmerButton background="#0f172a" shimmerColor="#38bdf8">
              Start Building
            </ShimmerButton>
            <ShimmerButton background="#fff" shimmerColor="#f43f5e">
              <span className="text-slate-900">Subscribe Now</span>
            </ShimmerButton>
          </Box>
        ),
        code: `<ShimmerButton background="#0f172a" shimmerColor="#38bdf8">\n  Start Building\n</ShimmerButton>\n\n<ShimmerButton background="#fff" shimmerColor="#f43f5e">\n  <span className="text-slate-900">Subscribe Now</span>\n</ShimmerButton>`,
      },
    ],
  },
  confetti: {
    title: "Confetti",
    description:
      "A high-performance physics-based particle confetti system with customizable bursts, shapes, velocities, and celebratory buttons.",
    installation: `import { Confetti, ConfettiButton } from 'patiya';`,
    props: [
      {
        name: "particleCount",
        type: "number",
        default: "70",
        description: "Number of confetti particles spawned in the burst.",
      },
      {
        name: "spread",
        type: "number",
        default: "75",
        description: "Angular spread of the burst in degrees.",
      },
      {
        name: "startVelocity",
        type: "number",
        default: "42",
        description: "Initial velocity of ejected particles.",
      },
      {
        name: "shapes",
        type: "('square' | 'circle' | 'star' | 'ribbon')[]",
        default: "['square', 'circle', 'ribbon']",
        description: "Particle shapes rendered during explosion.",
      },
      {
        name: "variant",
        type: "'solid' | 'outline' | 'soft' | 'ghost'",
        default: "'solid'",
        description: "Button appearance style variant.",
      },
      {
        name: "color",
        type: "'primary' | 'secondary' | 'accent' | 'destructive' | 'success' | 'warning' | 'info' | 'muted'",
        default: "'primary'",
        description: "Theme color for the confetti button and particles.",
      },
      {
        name: "size",
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: "Size of the button.",
      },
    ],
    examples: [
      {
        title: "Celebration Buttons & Variants",
        description:
          "Interactive buttons that trigger confetti bursts using PatiyaColor themes and variants.",
        preview: (
          <Box className="flex flex-wrap items-center justify-center gap-4 py-8">
            <ConfettiButton variant="solid" color="primary">
              🎉 Primary Solid
            </ConfettiButton>
            <ConfettiButton variant="soft" color="secondary">
              ✨ Soft Secondary
            </ConfettiButton>
            <ConfettiButton variant="outline" color="success">
              🏆 Outline Success
            </ConfettiButton>
            <ConfettiButton variant="ghost" color="destructive">
              💥 Ghost Destructive
            </ConfettiButton>
          </Box>
        ),
        code: `<ConfettiButton variant="solid" color="primary">\n  🎉 Primary Solid\n</ConfettiButton>\n\n<ConfettiButton variant="soft" color="secondary">\n  ✨ Soft Secondary\n</ConfettiButton>\n\n<ConfettiButton variant="outline" color="success">\n  🏆 Outline Success\n</ConfettiButton>\n\n<ConfettiButton variant="ghost" color="destructive">\n  💥 Ghost Destructive\n</ConfettiButton>`,
      },
      {
        title: "Custom Shapes & Stars",
        description:
          "Confetti burst configured with custom star and ribbon particles and velocity.",
        preview: (
          <Box className="flex flex-wrap items-center justify-center gap-4 py-8">
            <ConfettiButton
              variant="soft"
              color="accent"
              options={{
                shapes: ["star", "circle"],
                particleCount: 90,
                colors: ["#f59e0b", "#ec4899", "#8b5cf6", "#10b981"],
                spread: 90,
                startVelocity: 48,
              }}
            >
              ⭐ Star Burst
            </ConfettiButton>
          </Box>
        ),
        code: `<ConfettiButton\n  variant="soft"\n  color="accent"\n  options={{\n    shapes: ['star', 'circle'],\n    particleCount: 90,\n    colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981'],\n    spread: 90,\n    startVelocity: 48,\n  }}\n>\n  ⭐ Star Burst\n</ConfettiButton>`,
      },
      {
        title: "Reward Card Trigger",
        description:
          "Interactive milestone unlock card paired with celebratory confetti.",
        preview: (
          <Box className="w-full max-w-md mx-auto p-6 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] text-center space-y-4 shadow-xl">
            <Box className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--patiya-color-accent)]/15 text-2xl text-[var(--patiya-color-accent)]">
              🏆
            </Box>
            <Box className="space-y-1">
              <h3 className="text-lg font-bold text-[var(--patiya-color-foreground)]">
                Pro Milestone Unlocked
              </h3>
              <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                You completed 100 design reviews this month.
              </p>
            </Box>
            <ConfettiButton
              variant="solid"
              color="primary"
              className="w-full"
              options={{
                particleCount: 100,
                spread: 100,
              }}
            >
              Collect 500 Credits 🚀
            </ConfettiButton>
          </Box>
        ),
        code: `<div className="p-6 rounded-2xl border text-center space-y-4">\n  <div className="h-14 w-14 mx-auto rounded-2xl bg-accent/15 text-2xl">🏆</div>\n  <h3 className="text-lg font-bold">Pro Milestone Unlocked</h3>\n  <p className="text-xs text-muted-foreground">You completed 100 reviews this month.</p>\n  <ConfettiButton variant="solid" color="primary" className="w-full">\n    Collect 500 Credits 🚀\n  </ConfettiButton>\n</div>`,
      },
    ],
  },
  pointerFollower: {
    title: "Pointer Follower",
    description:
      "A multiplayer and Figma-inspired interactive cursor companion that smoothly tracks the user's pointer with spring physics, dynamic rotation, and customizable tags.",
    installation: `import { PointerFollower } from 'patiya';`,
    props: [
      {
        name: "name",
        type: "string",
        default: "'Alex Rivera'",
        description: "Name or label displayed on the collaborator cursor tag.",
      },
      {
        name: "avatar",
        type: "string",
        default: "undefined",
        description: "Optional URL for the collaborator's avatar picture.",
      },
      {
        name: "badge",
        type: "string",
        default: "'Designing'",
        description: "Tag label for current activity or role.",
      },
      {
        name: "color",
        type: "string",
        default: "'#6366f1'",
        description: "Hex or CSS color for pointer arrow and glow badges.",
      },
      {
        name: "variant",
        type: "'badge' | 'dot' | 'pill'",
        default: "'badge'",
        description:
          "Visual appearance style: full badge, glow dot, or action pill.",
      },
      {
        name: "pillText",
        type: "string",
        default: "undefined",
        description: "Custom label displayed when variant is 'pill'.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description:
          "Whether the interactive pointer follow effect is disabled.",
      },
    ],
    examples: [
      {
        title: "Collaborative Canvas (Figma Style)",
        description:
          "Move your mouse across the interactive canvas to see live collaborator pointer physics with tilt rotation.",
        preview: (
          <PointerFollower
            name="Alex Rivera"
            badge="Lead Designer"
            color="#6366f1"
            className="w-full h-72 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/40 p-8 flex flex-col justify-between"
          >
            <Box className="flex items-center justify-between">
              <Badge variant="soft" color="primary">
                Canvas Mode
              </Badge>
              <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                Move cursor anywhere inside
              </span>
            </Box>
            <Box className="space-y-2 text-center">
              <h4 className="text-2xl font-bold tracking-tight text-[var(--patiya-color-foreground)]">
                Multiplayer Design Canvas
              </h4>
              <p className="text-sm text-[var(--patiya-color-muted-foreground)] max-w-sm mx-auto">
                Real-time cursor companion with momentum physics and dynamic
                angle tilt based on velocity.
              </p>
            </Box>
            <Box className="flex items-center justify-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-[var(--patiya-color-muted-foreground)]">
                1 Live Collaborator Active
              </span>
            </Box>
          </PointerFollower>
        ),
        code: `<PointerFollower\n  name="Alex Rivera"\n  badge="Lead Designer"\n  color="#6366f1"\n  className="w-full h-72 rounded-2xl border p-8"\n>\n  <h4>Multiplayer Design Canvas</h4>\n  <p>Move cursor anywhere inside.</p>\n</PointerFollower>`,
      },
      {
        title: "Action Pill Follower",
        description:
          "Floating action pill that tracks the cursor over showcase project cards.",
        preview: (
          <PointerFollower
            variant="pill"
            pillText="Explore Project →"
            color="#ec4899"
            className="w-full h-64 rounded-2xl border border-[var(--patiya-color-border)] bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent p-6 flex flex-col justify-end"
          >
            <Box className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-pink-500">
                Case Study
              </span>
              <h4 className="text-xl font-bold text-[var(--patiya-color-foreground)]">
                Modern Design System 2.0
              </h4>
              <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                Hover to see smooth magnetic pill tracker following your
                pointer.
              </p>
            </Box>
          </PointerFollower>
        ),
        code: `<PointerFollower\n  variant="pill"\n  pillText="Explore Project →"\n  color="#ec4899"\n  className="w-full h-64 rounded-2xl border p-6"\n>\n  <h4>Modern Design System 2.0</h4>\n</PointerFollower>`,
      },
      {
        title: "Glowing Dot Tracer",
        description:
          "Minimalist neon glow dot that smoothly follows your cursor.",
        preview: (
          <PointerFollower
            variant="dot"
            color="#10b981"
            className="w-full h-56 rounded-2xl border border-emerald-500/20 bg-neutral-950 p-6 flex items-center justify-center text-center"
          >
            <Box className="space-y-2">
              <h4 className="text-lg font-bold text-white">
                Neon Tracker Area
              </h4>
              <p className="text-xs text-neutral-400 max-w-xs">
                Minimalist luminous dot with trailing pulse wave.
              </p>
            </Box>
          </PointerFollower>
        ),
        code: `<PointerFollower\n  variant="dot"\n  color="#10b981"\n  className="w-full h-56 rounded-2xl bg-neutral-950"\n>\n  <h4>Neon Tracker Area</h4>\n</PointerFollower>`,
      },
    ],
  },
  carousel: {
    title: "Carousel",
    description:
      "A stunning, touch-friendly image carousel with autoplay and smooth transitions.",
    installation: `import { Carousel } from 'patiya';`,
    props: [
      {
        name: "images",
        type: "{ src: string, alt?: string }[]",
        default: "-",
        description: "Array of image objects to display.",
      },
      {
        name: "autoPlay",
        type: "boolean",
        default: "true",
        description: "Whether the carousel should automatically cycle.",
      },
      {
        name: "interval",
        type: "number",
        default: "5000",
        description: "Autoplay interval in milliseconds.",
      },
      {
        name: "showArrows",
        type: "boolean",
        default: "true",
        description: "Show next and previous navigation arrows.",
      },
      {
        name: "showDots",
        type: "boolean",
        default: "true",
        description: "Show navigation dots at the bottom.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center">
            <Carousel
              className="w-full max-w-2xl aspect-video shadow-2xl"
              images={[
                {
                  src: "https://picsum.photos/seed/picsum1/1200/800",
                  alt: "Beautiful landscape",
                },
                {
                  src: "https://picsum.photos/seed/picsum2/1200/800",
                  alt: "City sunset",
                },
                {
                  src: "https://picsum.photos/seed/picsum3/1200/800",
                  alt: "Ocean waves",
                },
              ]}
            />
          </Box>
        ),
        code: `<Carousel \n  className="w-full max-w-2xl aspect-video"\n  images={[\n    { src: 'https://picsum.photos/seed/picsum1/1200/800' },\n    { src: 'https://picsum.photos/seed/picsum2/1200/800' },\n    { src: 'https://picsum.photos/seed/picsum3/1200/800' }\n  ]} \n/>`,
      },
      {
        title: "No Autoplay",
        description: "Disable automatic cycling by setting autoPlay to false.",
        preview: (
          <Box className="flex w-full items-center justify-center">
            <Carousel
              autoPlay={false}
              className="w-full max-w-2xl aspect-video shadow-2xl"
              images={[
                {
                  src: "https://picsum.photos/seed/nature1/1200/800",
                  alt: "Forest",
                },
                {
                  src: "https://picsum.photos/seed/nature2/1200/800",
                  alt: "Mountains",
                },
                {
                  src: "https://picsum.photos/seed/nature3/1200/800",
                  alt: "River",
                },
              ]}
            />
          </Box>
        ),
        code: `<Carousel \n  autoPlay={false}\n  className="w-full max-w-2xl aspect-video"\n  images={[\n    { src: 'https://picsum.photos/seed/nature1/1200/800' },\n    { src: 'https://picsum.photos/seed/nature2/1200/800' },\n    { src: 'https://picsum.photos/seed/nature3/1200/800' }\n  ]} \n/>`,
      },
      {
        title: "Fast Interval",
        description:
          "Change the speed of the autoplay using the interval prop (in milliseconds).",
        preview: (
          <Box className="flex w-full items-center justify-center">
            <Carousel
              interval={2000}
              className="w-full max-w-2xl aspect-video shadow-2xl"
              images={[
                {
                  src: "https://picsum.photos/seed/fast1/1200/800",
                  alt: "Car",
                },
                {
                  src: "https://picsum.photos/seed/fast2/1200/800",
                  alt: "Train",
                },
                {
                  src: "https://picsum.photos/seed/fast3/1200/800",
                  alt: "Plane",
                },
              ]}
            />
          </Box>
        ),
        code: `<Carousel \n  interval={2000}\n  className="w-full max-w-2xl aspect-video"\n  images={[\n    { src: 'https://picsum.photos/seed/fast1/1200/800' },\n    { src: 'https://picsum.photos/seed/fast2/1200/800' },\n    { src: 'https://picsum.photos/seed/fast3/1200/800' }\n  ]} \n/>`,
      },
      {
        title: "Hide Navigation Arrows",
        description: "Remove the next/previous arrows for a cleaner look.",
        preview: (
          <Box className="flex w-full items-center justify-center">
            <Carousel
              showArrows={false}
              className="w-full max-w-2xl aspect-video shadow-2xl"
              images={[
                {
                  src: "https://picsum.photos/seed/arch1/1200/800",
                  alt: "Architecture 1",
                },
                {
                  src: "https://picsum.photos/seed/arch2/1200/800",
                  alt: "Architecture 2",
                },
                {
                  src: "https://picsum.photos/seed/arch3/1200/800",
                  alt: "Architecture 3",
                },
              ]}
            />
          </Box>
        ),
        code: `<Carousel \n  showArrows={false}\n  className="w-full max-w-2xl aspect-video"\n  images={[\n    { src: 'https://picsum.photos/seed/arch1/1200/800' },\n    { src: 'https://picsum.photos/seed/arch2/1200/800' },\n    { src: 'https://picsum.photos/seed/arch3/1200/800' }\n  ]} \n/>`,
      },
      {
        title: "Hide Pagination Dots",
        description: "Remove the bottom navigation dots.",
        preview: (
          <Box className="flex w-full items-center justify-center">
            <Carousel
              showDots={false}
              className="w-full max-w-2xl aspect-video shadow-2xl"
              images={[
                {
                  src: "https://picsum.photos/seed/space1/1200/800",
                  alt: "Space 1",
                },
                {
                  src: "https://picsum.photos/seed/space2/1200/800",
                  alt: "Space 2",
                },
                {
                  src: "https://picsum.photos/seed/space3/1200/800",
                  alt: "Space 3",
                },
              ]}
            />
          </Box>
        ),
        code: `<Carousel \n  showDots={false}\n  className="w-full max-w-2xl aspect-video"\n  images={[\n    { src: 'https://picsum.photos/seed/space1/1200/800' },\n    { src: 'https://picsum.photos/seed/space2/1200/800' },\n    { src: 'https://picsum.photos/seed/space3/1200/800' }\n  ]} \n/>`,
      },
      {
        title: "Portrait / Mobile Layout",
        description:
          "The carousel adapts to any aspect ratio using CSS classes like aspect-[3/4].",
        preview: (
          <Box className="flex w-full items-center justify-center">
            <Carousel
              className="w-full max-w-sm aspect-[3/4] shadow-2xl rounded-[2rem]"
              images={[
                {
                  src: "https://picsum.photos/seed/port1/800/1200",
                  alt: "Portrait 1",
                },
                {
                  src: "https://picsum.photos/seed/port2/800/1200",
                  alt: "Portrait 2",
                },
                {
                  src: "https://picsum.photos/seed/port3/800/1200",
                  alt: "Portrait 3",
                },
              ]}
            />
          </Box>
        ),
        code: `<Carousel \n  className="w-full max-w-sm aspect-[3/4] rounded-[2rem]"\n  images={[\n    { src: 'https://picsum.photos/seed/port1/800/1200' },\n    { src: 'https://picsum.photos/seed/port2/800/1200' },\n    { src: 'https://picsum.photos/seed/port3/800/1200' }\n  ]} \n/>`,
      },
    ],
  },
  videoModal: {
    title: "Video Modal",
    description:
      "An elegant media wrapper that displays a thumbnail and expands a video player into a cinematic modal overlay when clicked.",
    installation: `import { VideoModal } from 'patiya';`,
    props: [
      {
        name: "videoSrc",
        type: "string",
        default: "-",
        description: "URL of the video to play (e.g. YouTube embed URL).",
      },
      {
        name: "thumbnailUrl",
        type: "string",
        default: "-",
        description: "URL of the thumbnail image.",
      },
      {
        name: "title",
        type: "string",
        default: "'Play Video'",
        description: "Title of the video (used for alt text and iframe title).",
      },
      {
        name: "playIcon",
        type: "ReactNode",
        default: "-",
        description: "Custom play icon to display.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center">
            <VideoModal
              className="w-full max-w-xl shadow-xl ring-1 ring-white/10"
              videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
              thumbnailUrl="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop"
              title="Never Gonna Give You Up"
            />
          </Box>
        ),
        code: `<VideoModal \n  className="w-full max-w-xl"\n  videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"\n  thumbnailUrl="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop"\n  title="Never Gonna Give You Up"\n/>`,
      },
    ],
  },
  imageZoom: {
    title: "Image Zoom",
    description:
      "A smooth, accessible click-to-zoom image component that expands media to fill the viewport seamlessly.",
    installation: `import { ImageZoom } from 'patiya';`,
    props: [
      {
        name: "src",
        type: "string",
        default: "-",
        description: "URL of the image.",
      },
      {
        name: "zoomSrc",
        type: "string",
        default: "-",
        description: "Optional high-resolution URL to load when zoomed.",
      },
      {
        name: "alt",
        type: "string",
        default: "-",
        description: "Alternative text for the image.",
      },
      {
        name: "isOpen",
        type: "boolean",
        default: "-",
        description: "Controlled open state for the zoomed image.",
      },
      {
        name: "onOpenChange",
        type: "(isOpen: boolean) => void",
        default: "-",
        description: "Callback fired when the zoom state changes.",
      },
      {
        name: "onNext",
        type: "() => void",
        default: "-",
        description:
          'If provided, renders a "Next" arrow button that calls this function.',
      },
      {
        name: "onPrev",
        type: "() => void",
        default: "-",
        description:
          'If provided, renders a "Previous" arrow button that calls this function.',
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-4 px-4">
            <ImageZoom
              src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1200&auto=format&fit=crop"
              className="w-64 h-64 object-cover rounded-3xl shadow-lg ring-1 ring-[var(--patiya-color-border)]"
              alt="Beautiful Abstract"
            />
          </Box>
        ),
        code: `<ImageZoom \n  src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1200&auto=format&fit=crop"\n  className="w-64 h-64 object-cover rounded-3xl shadow-lg"\n  alt="Beautiful Abstract"\n/>`,
      },
      {
        title: "High Resolution Zoom (zoomSrc)",
        description:
          "Provide a lower-resolution thumbnail for fast loading, and specify a high-resolution version in zoomSrc for the zoomed view.",
        preview: (
          <Box className="flex w-full items-center justify-center py-4 px-4">
            <ImageZoom
              src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80"
              zoomSrc="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=2000&q=100"
              className="w-full max-w-sm aspect-video object-cover rounded-xl shadow-lg ring-1 ring-[var(--patiya-color-border)]"
              alt="Beautiful Landscape"
            />
          </Box>
        ),
        code: `<ImageZoom \n  src="/thumbnail-landscape.jpg" // Fast loading, small size\n  zoomSrc="/hires-landscape.jpg" // Loads dynamically on click\n  className="w-full max-w-sm aspect-video object-cover rounded-xl shadow-lg"\n  alt="Beautiful Landscape"\n/>`,
      },
      {
        title: "Portrait View",
        description:
          "The zoom animation flawlessly adapts to vertical layouts and non-standard aspect ratios.",
        preview: (
          <Box className="flex w-full items-center justify-center py-4 px-4">
            <ImageZoom
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop"
              className="w-48 h-72 object-cover rounded-[2rem] shadow-xl"
              alt="Portrait Portrait Dog"
            />
          </Box>
        ),
        code: `<ImageZoom \n  src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800"\n  className="w-48 h-72 object-cover rounded-[2rem] shadow-xl"\n  alt="Cute Dog"\n/>`,
      },
      {
        title: "Sharp Corners",
        description:
          "Styles are respected seamlessly between thumbnail and zoomed states. No rounding applied here.",
        preview: (
          <Box className="flex w-full items-center justify-center py-4 px-4">
            <ImageZoom
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
              className="w-64 h-64 object-cover shadow-lg"
              alt="Sharp Edge Abstract"
            />
          </Box>
        ),
        code: `<ImageZoom \n  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200"\n  className="w-64 h-64 object-cover shadow-lg"\n  alt="Sharp Edge Abstract"\n/>`,
      },
      {
        title: "Image Gallery Group",
        description:
          "ImageZoom is perfect for rendering grids and masonry layouts where users can click individual pieces to inspect them.",
        preview: React.createElement(() => {
          const [activeIndex, setActiveIndex] = useState<number | null>(null);
          const images = [
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=600&auto=format&fit=crop",
          ];
          return (
            <Box className="w-full py-4 px-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((src, i) => (
                  <ImageZoom
                    key={i}
                    src={src}
                    className="w-full aspect-square object-cover rounded-xl"
                    alt={`Gallery ${i + 1}`}
                    isOpen={activeIndex === i}
                    onOpenChange={(open) => setActiveIndex(open ? i : null)}
                    onNext={
                      i < images.length - 1
                        ? () => setActiveIndex(i + 1)
                        : undefined
                    }
                    onPrev={i > 0 ? () => setActiveIndex(i - 1) : undefined}
                  />
                ))}
              </div>
            </Box>
          );
        }),
        code: `import { useState } from 'react';\n\nconst [activeIndex, setActiveIndex] = useState<number | null>(null);\nconst images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg'];\n\n<div className="grid grid-cols-2 md:grid-cols-3 gap-4">\n  {images.map((src, i) => (\n    <ImageZoom \n      key={i} \n      src={src} \n      className="w-full aspect-square object-cover rounded-xl" \n      isOpen={activeIndex === i}\n      onOpenChange={(open) => setActiveIndex(open ? i : null)}\n      onNext={i < images.length - 1 ? () => setActiveIndex(i + 1) : undefined}\n      onPrev={i > 0 ? () => setActiveIndex(i - 1) : undefined}\n    />\n  ))}\n</div>`,
      },
    ],
  },
  gradientText: {
    title: "Gradient Text",
    description:
      "An elegant animated gradient text effect using background clipping. Perfect for catching attention.",
    installation: `import { GradientText } from 'patiya';`,
    props: [
      {
        name: "colors",
        type: "string[]",
        default: "['#ffaa40', '#9c40ff', '#ffaa40']",
        description: "Array of colors for the gradient.",
      },
      {
        name: "animationSpeed",
        type: "number",
        default: "8",
        description: "Duration of the gradient animation in seconds.",
      },
      {
        name: "showBorder",
        type: "boolean",
        default: "false",
        description: "Whether to show a glassmorphic border.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-10 px-4">
            <GradientText
              className="text-3xl font-bold tracking-tight px-6 py-2"
              showBorder
            >
              Experience the Magic
            </GradientText>
          </Box>
        ),
        code: `<GradientText \n  className="text-3xl font-bold tracking-tight px-6 py-2"\n  showBorder\n>\n  Experience the Magic\n</GradientText>`,
      },
      {
        title: "Custom Colors",
        preview: (
          <Box className="flex w-full items-center justify-center py-10 px-4">
            <GradientText
              className="text-4xl font-extrabold px-6 py-2"
              colors={["#00f2fe", "#4facfe", "#00f2fe"]}
              animationSpeed={4}
            >
              Ultra Fast
            </GradientText>
          </Box>
        ),
        code: `<GradientText \n  className="text-4xl font-extrabold"\n  colors={['#00f2fe', '#4facfe', '#00f2fe']}\n  animationSpeed={4}\n>\n  Ultra Fast\n</GradientText>`,
      },
    ],
  },
  typingText: {
    title: "Typing Text",
    description:
      "A realistic typewriter effect that can optionally loop and feature a blinking cursor.",
    installation: `import { TypingText } from 'patiya';`,
    props: [
      {
        name: "text",
        type: "string",
        default: "-",
        description: "The text to type out.",
      },
      {
        name: "speed",
        type: "number",
        default: "50",
        description: "Base typing speed in milliseconds per character.",
      },
      {
        name: "cursor",
        type: "string",
        default: "'|'",
        description: "The cursor character.",
      },
      {
        name: "loop",
        type: "boolean",
        default: "false",
        description: "Whether the animation loops infinitely.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-10 px-4 text-center">
            <h2 className="text-3xl font-semibold">
              <TypingText text="Design components at the speed of thought." />
            </h2>
          </Box>
        ),
        code: `<h2 className="text-3xl font-semibold">\n  <TypingText text="Design components at the speed of thought." />\n</h2>`,
      },
      {
        title: "Looping",
        preview: (
          <Box className="flex w-full items-center justify-center py-10 px-4">
            <span className="text-2xl font-mono text-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/10 px-4 py-2 rounded-lg">
              <TypingText
                text="$ pnpm create patiya-app"
                loop
                speed={80}
                cursorClassName="text-[var(--patiya-color-primary)]"
              />
            </span>
          </Box>
        ),
        code: `<span className="text-2xl font-mono text-primary bg-primary/10 px-4 py-2 rounded-lg">\n  <TypingText \n    text="$ pnpm create patiya-app" \n    loop \n    speed={80} \n  />\n</span>`,
      },
    ],
  },
  flipText: {
    title: "Flip Text",
    description:
      "A playful 3D character flipping animation for impactful headlines.",
    installation: `import { FlipText } from 'patiya';`,
    props: [
      {
        name: "word",
        type: "string",
        default: "-",
        description: "The word or phrase to animate.",
      },
      {
        name: "duration",
        type: "number",
        default: "0.5",
        description: "Animation duration per character.",
      },
      {
        name: "delayMultiple",
        type: "number",
        default: "0.08",
        description: "Delay between consecutive characters.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-10 px-4 overflow-hidden">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl xl:text-8xl/none">
              <FlipText word="BEAUTIFUL" />
            </h1>
          </Box>
        ),
        code: `<h1 className="text-5xl font-bold tracking-tighter">\n  <FlipText word="BEAUTIFUL" />\n</h1>`,
      },
      {
        title: "With Delay",
        preview: (
          <Box className="flex w-full items-center justify-center py-10 px-4 overflow-hidden">
            <div className="text-3xl font-bold text-[var(--patiya-color-muted-foreground)] uppercase">
              <FlipText word="AWESOME" duration={0.8} delayMultiple={0.15} />
            </div>
          </Box>
        ),
        code: `<div className="text-3xl font-bold text-muted-foreground uppercase">\n  <FlipText word="AWESOME" duration={0.8} delayMultiple={0.15} />\n</div>`,
      },
    ],
  },
  blurText: {
    title: "Blur Text",
    description:
      "A cinematic text reveal effect that transitions from a heavy blur into focus.",
    installation: `import { BlurText } from 'patiya';`,
    props: [
      {
        name: "text",
        type: "string",
        default: "-",
        description: "The text to reveal.",
      },
      {
        name: "duration",
        type: "number",
        default: "1.5",
        description: "Duration of the blur transition.",
      },
      {
        name: "delay",
        type: "number",
        default: "0",
        description: "Delay before the animation starts.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-16 px-4">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter">
              <BlurText text="Clarity." duration={2} />
            </h2>
          </Box>
        ),
        code: `<h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter">\n  <BlurText text="Clarity." duration={2} />\n</h2>`,
      },
      {
        title: "Delayed Reveal",
        preview: (
          <Box className="flex flex-col w-full items-center justify-center py-16 px-4 gap-4">
            <p className="text-xl font-medium text-[var(--patiya-color-muted-foreground)]">
              The future is
            </p>
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              <BlurText text="Here." delay={1000} />
            </h1>
          </Box>
        ),
        code: `<p className="text-xl text-muted-foreground">The future is</p>\n<h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r">\n  <BlurText text="Here." delay={1000} />\n</h1>`,
      },
    ],
  },
  meteorShower: {
    title: "Meteor Shower",
    description:
      "A beautiful animated meteor effect to use inside cards or hero sections.",
    installation: `import { MeteorShower } from 'patiya';`,
    props: [
      {
        name: "count",
        type: "number",
        default: "20",
        description: "Number of meteors to render.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-10 px-4">
            <div className="relative w-full max-w-sm h-64 bg-slate-950 overflow-hidden rounded-2xl shadow-xl flex items-center justify-center border border-white/10">
              <MeteorShower count={15} />
              <div className="relative z-10 text-center">
                <h3 className="text-white font-bold text-2xl mb-2">
                  Space Card
                </h3>
                <p className="text-slate-400 text-sm">
                  Watch the meteors fall behind me.
                </p>
              </div>
            </div>
          </Box>
        ),
        code: `<div className="relative w-full max-w-sm h-64 bg-slate-950 overflow-hidden rounded-2xl shadow-xl border border-white/10 flex items-center justify-center">\n  <MeteorShower count={15} />\n  <div className="relative z-10 text-center">\n    <h3 className="text-white font-bold text-2xl mb-2">Space Card</h3>\n    <p className="text-slate-400 text-sm">Watch the meteors fall behind me.</p>\n  </div>\n</div>`,
      },
    ],
  },
  auroraBackground: {
    title: "Aurora Background",
    description:
      "A stunning, smoothly animating aurora borealis gradient background.",
    installation: `import { AuroraBackground } from 'patiya';`,
    props: [
      {
        name: "showRadialGradient",
        type: "boolean",
        default: "true",
        description: "Whether to show a radial mask for depth.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-10 px-4">
            <div className="relative w-full h-[400px] overflow-hidden rounded-3xl ring-1 ring-[var(--patiya-color-border)]">
              <AuroraBackground className="h-full rounded-3xl">
                <div className="flex flex-col items-center justify-center px-4 text-center">
                  <h1 className="text-3xl md:text-5xl font-bold dark:text-white mb-4">
                    Aurora Background
                  </h1>
                  <p className="text-base md:text-lg dark:text-neutral-200">
                    Breathe life into your landing pages.
                  </p>
                </div>
              </AuroraBackground>
            </div>
          </Box>
        ),
        code: `<AuroraBackground className="h-[400px] rounded-3xl">\n  <div className="flex flex-col items-center justify-center text-center px-4">\n    <h1 className="text-3xl md:text-5xl font-bold dark:text-white mb-4">\n      Aurora Background\n    </h1>\n    <p className="text-base md:text-lg dark:text-neutral-200">\n      Breathe life into your landing pages.\n    </p>\n  </div>\n</AuroraBackground>`,
      },
    ],
  },
  borderBeam: {
    title: "Border Beam",
    description:
      "An animated gradient beam that seamlessly travels along the border of its container.",
    installation: `import { BorderBeam } from 'patiya';`,
    props: [
      {
        name: "size",
        type: "number",
        default: "200",
        description: "Length of the gradient beam in pixels.",
      },
      {
        name: "duration",
        type: "number",
        default: "15",
        description: "Duration of one full cycle in seconds.",
      },
      {
        name: "colorFrom",
        type: "string",
        default: "'#0ea5e9'",
        description: "Starting color of the gradient.",
      },
      {
        name: "colorTo",
        type: "string",
        default: "'#8b5cf6'",
        description: "Ending color of the gradient.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-16 px-4">
            <div className="relative flex h-[250px] w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] shadow-sm">
              <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                Border Beam
              </span>
              <BorderBeam size={250} duration={12} delay={9} />
            </div>
          </Box>
        ),
        code: `<div className="relative flex h-[250px] w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-xl border bg-background shadow-sm">\n  <span className="text-6xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-black to-gray-300/80 dark:from-white dark:to-slate-900/10">\n    Border Beam\n  </span>\n  <BorderBeam size={250} duration={12} delay={9} />\n</div>`,
      },
    ],
  },
  spotlight: {
    title: "Spotlight",
    description:
      "A beautiful, sweeping gradient spotlight effect for hero sections and dramatic backgrounds.",
    installation: `import { Spotlight } from 'patiya';`,
    props: [
      {
        name: "fill",
        type: "string",
        default: "'white'",
        description: "The color of the spotlight.",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-10 px-4">
            <div className="h-[350px] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden border border-white/10">
              <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
              />
              <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                  Spotlight <br /> is the new trend.
                </h1>
                <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                  Spotlight effect is a great way to draw attention to a
                  specific part of the page. Here, we are drawing the attention
                  towards the text section of the page.
                </p>
              </div>
            </div>
          </Box>
        ),
        code: `<div className="h-[350px] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">\n  <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />\n  <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">\n    <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">\n      Spotlight <br /> is the new trend.\n    </h1>\n    <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">\n      Spotlight effect is a great way to draw attention to a specific part of the page.\n    </p>\n  </div>\n</div>`,
      },
    ],
  },
  sparkles: {
    title: "Sparkles",
    description:
      "A magical particle system that generates tiny, floating, glowing stars.",
    installation: `import { Sparkles } from 'patiya';`,
    props: [
      {
        name: "particleCount",
        type: "number",
        default: "50",
        description: "Number of particles to render.",
      },
      {
        name: "particleColor",
        type: "string",
        default: "'#FFF'",
        description: "Color of the glowing particles.",
      },
      {
        name: "speed",
        type: "string",
        default: "'medium'",
        description: "Speed of the float animation (slow, medium, fast).",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        preview: (
          <Box className="flex w-full items-center justify-center py-16 px-4">
            <div className="relative h-[250px] w-full max-w-lg bg-black flex items-center justify-center overflow-hidden rounded-xl border border-white/10">
              <h1 className="md:text-5xl text-3xl font-bold text-white relative z-20">
                Sparkles
              </h1>
              <div className="w-full h-full absolute inset-0">
                <Sparkles particleCount={150} speed="fast" />
              </div>
            </div>
          </Box>
        ),
        code: `<div className="relative h-[250px] w-full max-w-lg bg-black flex items-center justify-center overflow-hidden rounded-xl border border-white/10">\n  <h1 className="md:text-5xl text-3xl font-bold text-white relative z-20">\n    Sparkles\n  </h1>\n  <div className="w-full h-full absolute inset-0">\n    <Sparkles particleCount={150} speed="fast" />\n  </div>\n</div>`,
      },
    ],
  },
  kbd: {
    title: "Kbd",
    description: "Displays a keyboard key.",
    installation: `import { Kbd } from 'patiya';`,
    props: [
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: "The size of the keyboard key.",
      },
      {
        name: "variant",
        type: "'solid' | 'outline' | 'soft'",
        default: "'soft'",
        description: "The visual variant of the key.",
      },
    ],
    examples: [
      { title: "Default", preview: <Kbd>Ctrl</Kbd>, code: `<Kbd>Ctrl</Kbd>` },
      {
        title: "Sizes",
        preview: (
          <Box className="flex gap-2 items-center">
            <Kbd size="sm">A</Kbd>
            <Kbd size="md">B</Kbd>
            <Kbd size="lg">C</Kbd>
          </Box>
        ),
        code: `<Kbd size="sm">A</Kbd>\n<Kbd size="md">B</Kbd>\n<Kbd size="lg">C</Kbd>`,
      },
      {
        title: "Variants",
        preview: (
          <Box className="flex gap-2">
            <Kbd variant="soft">Soft</Kbd>
            <Kbd variant="outline">Outline</Kbd>
            <Kbd variant="solid">Solid</Kbd>
          </Box>
        ),
        code: `<Kbd variant="soft">Soft</Kbd>\n<Kbd variant="outline">Outline</Kbd>\n<Kbd variant="solid">Solid</Kbd>`,
      },
      {
        title: "Combination",
        preview: (
          <Box className="flex gap-1 items-center">
            <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>K</Kbd>
          </Box>
        ),
        code: `<Box className="flex gap-1 items-center"><Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>K</Kbd></Box>`,
      },
      {
        title: "Mac Symbols",
        preview: (
          <Box className="flex gap-2">
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>⌥</Kbd>
          </Box>
        ),
        code: `<Kbd>⌘</Kbd>\n<Kbd>⇧</Kbd>\n<Kbd>⌥</Kbd>`,
      },
    ],
  },
  divider: {
    title: "Divider",
    description: "Visually or semantically separates content.",
    installation: `import { Divider } from 'patiya';`,
    props: [
      {
        name: "orientation",
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: "The orientation of the divider.",
      },
      {
        name: "variant",
        type: "'solid' | 'dashed' | 'dotted'",
        default: "'solid'",
        description: "The stroke style of the divider.",
      },
      {
        name: "label",
        type: "React.ReactNode",
        default: "-",
        description: "Optional text or element to display inside the divider.",
      },
      {
        name: "labelPosition",
        type: "'start' | 'center' | 'end'",
        default: "'center'",
        description: "Alignment of the label.",
      },
    ],
    examples: [
      { title: "Default", preview: <Divider />, code: `<Divider />` },
      {
        title: "Dashed & Dotted",
        preview: (
          <Box className="space-y-4 w-full">
            <Divider variant="dashed" />
            <Divider variant="dotted" />
          </Box>
        ),
        code: `<Divider variant="dashed" />\n<Divider variant="dotted" />`,
      },
      {
        title: "With Label",
        preview: <Divider label="OR" />,
        code: `<Divider label="OR" />`,
      },
      {
        title: "Label Position",
        preview: (
          <Box className="space-y-4 w-full">
            <Divider label="Start" labelPosition="start" />
            <Divider label="End" labelPosition="end" />
          </Box>
        ),
        code: `<Divider label="Start" labelPosition="start" />\n<Divider label="End" labelPosition="end" />`,
      },
      {
        title: "Vertical",
        preview: (
          <Box className="flex h-12 items-center">
            <Box>Left</Box>
            <Divider orientation="vertical" className="mx-4" />
            <Box>Right</Box>
          </Box>
        ),
        code: `<Box className="flex h-12 items-center">\n  <Box>Left</Box>\n  <Divider orientation="vertical" className="mx-4" />\n  <Box>Right</Box>\n</Box>`,
      },
    ],
  },
  rating: {
    title: "Rating",
    description: "A component to allow users to provide rating.",
    installation: `import { Rating } from 'patiya';`,
    props: [
      {
        name: "value",
        type: "number",
        default: "-",
        description: "The controlled rating value.",
      },
      {
        name: "defaultValue",
        type: "number",
        default: "0",
        description: "The default rating value when uncontrolled.",
      },
      {
        name: "max",
        type: "number",
        default: "5",
        description: "The maximum rating value.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: "The size of the rating icons.",
      },
      {
        name: "color",
        type: "string",
        default: "-",
        description: "Custom CSS color for active icons.",
      },
      {
        name: "readOnly",
        type: "boolean",
        default: "false",
        description: "Prevents interaction when true.",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        default: "-",
        description: "Custom icon for unselected states.",
      },
      {
        name: "activeIcon",
        type: "React.ReactNode",
        default: "-",
        description: "Custom icon for selected states.",
      },
      {
        name: "onChange",
        type: "(value: number) => void",
        default: "-",
        description: "Callback fired when rating changes.",
      },
    ],
    examples: [
      {
        title: "Default",
        preview: <Rating defaultValue={3} />,
        code: `<Rating defaultValue={3} />`,
      },
      {
        title: "Sizes",
        preview: (
          <Box className="space-y-4 flex flex-col items-center">
            <Rating size="sm" defaultValue={2} />
            <Rating size="md" defaultValue={3} />
            <Rating size="lg" defaultValue={4} />
          </Box>
        ),
        code: `<Rating size="sm" defaultValue={2} />\n<Rating size="md" defaultValue={3} />\n<Rating size="lg" defaultValue={4} />`,
      },
      {
        title: "Read Only",
        preview: <Rating defaultValue={4} readOnly />,
        code: `<Rating defaultValue={4} readOnly />`,
      },
      {
        title: "Custom Max",
        preview: <Rating max={10} defaultValue={7} />,
        code: `<Rating max={10} defaultValue={7} />`,
      },
      {
        title: "Custom Color",
        preview: <Rating defaultValue={3} color="#f43f5e" />,
        code: `<Rating defaultValue={3} color="#f43f5e" />`,
      },
    ],
  },
  "status-dot": {
    title: "StatusDot",
    description: "Displays a status indicator dot.",
    installation: `import { StatusDot } from 'patiya';`,
    props: [
      {
        name: "status",
        type: "'online' | 'offline' | 'busy' | 'away' | 'primary' | 'secondary' | 'accent'",
        default: "'online'",
        description: "The current status represented by a specific color.",
      },
      {
        name: "ping",
        type: "boolean",
        default: "false",
        description: "If true, adds a pulsing ping animation.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: "The size of the dot.",
      },
      {
        name: "label",
        type: "React.ReactNode",
        default: "-",
        description: "Optional text label displayed next to the dot.",
      },
    ],
    examples: [
      {
        title: "Default",
        preview: (
          <Box className="flex gap-4">
            <StatusDot status="online" />
            <StatusDot status="offline" />
            <StatusDot status="busy" />
            <StatusDot status="away" />
          </Box>
        ),
        code: `<StatusDot status="online" />\n<StatusDot status="offline" />\n<StatusDot status="busy" />\n<StatusDot status="away" />`,
      },
      {
        title: "With Label",
        preview: (
          <Box className="flex flex-col gap-2">
            <StatusDot status="online" label="Online" />
            <StatusDot status="offline" label="Offline" />
          </Box>
        ),
        code: `<StatusDot status="online" label="Online" />\n<StatusDot status="offline" label="Offline" />`,
      },
      {
        title: "Pinging",
        preview: <StatusDot status="online" ping label="System Operational" />,
        code: `<StatusDot status="online" ping label="System Operational" />`,
      },
      {
        title: "Sizes",
        preview: (
          <Box className="flex items-center gap-4">
            <StatusDot size="sm" />
            <StatusDot size="md" />
            <StatusDot size="lg" />
          </Box>
        ),
        code: `<StatusDot size="sm" />\n<StatusDot size="md" />\n<StatusDot size="lg" />`,
      },
      {
        title: "Theme Colors",
        preview: (
          <Box className="flex gap-4">
            <StatusDot status="primary" />
            <StatusDot status="secondary" />
            <StatusDot status="accent" />
          </Box>
        ),
        code: `<StatusDot status="primary" />\n<StatusDot status="secondary" />\n<StatusDot status="accent" />`,
      },
    ],
  },
  "copy-button": {
    title: "CopyButton",
    description: "A button specifically designed for copying text.",
    installation: `import { CopyButton } from 'patiya';`,
    props: [
      {
        name: "value",
        type: "string",
        default: "-",
        description: "The text value to copy to clipboard.",
      },
      {
        name: "timeout",
        type: "number",
        default: "2000",
        description:
          "Duration in milliseconds before resetting the success state.",
      },
      {
        name: "onCopy",
        type: "(value: string) => void",
        default: "-",
        description: "Callback fired when the text is successfully copied.",
      },
      {
        name: "size",
        type: "PatiyaSize",
        default: "'sm'",
        description: "The size of the copy button.",
      },
      {
        name: "variant",
        type: "PatiyaVariant",
        default: "'ghost'",
        description: "The visual variant of the button.",
      },
    ],
    examples: [
      {
        title: "Default",
        preview: <CopyButton value="npm install patiya" />,
        code: `<CopyButton value="npm install patiya" />`,
      },
      {
        title: "Icon Only",
        preview: <CopyButton value="secret_token" aria-label="Copy token" />,
        code: `<CopyButton value="secret_token" aria-label="Copy token" />`,
      },
      {
        title: "Variants",
        preview: (
          <Box className="flex gap-4">
            <CopyButton value="text" variant="solid" />
            <CopyButton value="text" variant="outline" />
          </Box>
        ),
        code: `<CopyButton value="text" variant="solid" />\n<CopyButton value="text" variant="outline" />`,
      },
      {
        title: "Sizes",
        preview: (
          <Box className="flex items-center gap-4">
            <CopyButton value="1" size="sm" />
            <CopyButton value="2" size="md" />
            <CopyButton value="3" size="lg" />
          </Box>
        ),
        code: `<CopyButton value="1" size="sm" />\n<CopyButton value="2" size="md" />\n<CopyButton value="3" size="lg" />`,
      },
      {
        title: "Custom Timeout",
        preview: <CopyButton value="Quick reset" timeout={500} />,
        code: `<CopyButton value="Quick reset" timeout={500} />`,
      },
    ],
  },
  chatBubble: {
    title: "Chat Bubble",
    description:
      "A component for displaying conversational messages in AI chat interfaces.",
    installation: `import { ChatBubble } from 'patiya';`,
    props: [
      {
        name: "variant",
        type: "'user' | 'assistant'",
        default: "'assistant'",
        description: "The role of the message sender.",
      },
      {
        name: "avatar",
        type: "React.ReactNode",
        default: "-",
        description: "Optional avatar element to display next to the bubble.",
      },
      {
        name: "actions",
        type: "React.ReactNode",
        default: "-",
        description:
          "Optional actions (like copy, thumbs up) to display below the message.",
      },
      {
        name: "time",
        type: "string",
        default: "-",
        description: "Optional timestamp to display.",
      },
      {
        name: "error",
        type: "boolean",
        default: "false",
        description: "If true, styles the bubble as an error state.",
      },
    ],
    examples: [
      {
        title: "Assistant Message",
        preview: (
          <ChatBubble variant="assistant">
            Hello! How can I help you today?
          </ChatBubble>
        ),
        code: `<ChatBubble variant="assistant">Hello! How can I help you today?</ChatBubble>`,
      },
      {
        title: "User Message",
        preview: (
          <ChatBubble variant="user">
            Can you write a React component for me?
          </ChatBubble>
        ),
        code: `<ChatBubble variant="user">Can you write a React component for me?</ChatBubble>`,
      },
      {
        title: "With Avatar",
        preview: (
          <ChatBubble
            variant="assistant"
            avatar={
              <Avatar
                initials="AI"
                className="bg-[var(--patiya-color-primary)] text-white"
              />
            }
          >
            I have generated the code for you.
          </ChatBubble>
        ),
        code: `<ChatBubble \n  variant="assistant" \n  avatar={<Avatar initials="AI" className="bg-[var(--patiya-color-primary)] text-white" />}\n>\n  I have generated the code for you.\n</ChatBubble>`,
      },
      {
        title: "With Actions & Time",
        preview: (
          <ChatBubble
            variant="assistant"
            time="10:42 AM"
            actions={
              <Box className="flex gap-1">
                <CopyButton
                  value="Here is some info"
                  variant="ghost"
                  size="sm"
                />
              </Box>
            }
          >
            Here is the information you requested.
          </ChatBubble>
        ),
        code: `<ChatBubble \n  variant="assistant" \n  time="10:42 AM"\n  actions={<CopyButton value="Here is the information you requested." variant="ghost" size="sm" />}\n>\n  Here is the information you requested.\n</ChatBubble>`,
      },
      {
        title: "Error State",
        preview: (
          <ChatBubble variant="assistant" error>
            An error occurred while generating the response.
          </ChatBubble>
        ),
        code: `<ChatBubble variant="assistant" error>An error occurred while generating the response.</ChatBubble>`,
      },
    ],
  },
  promptInput: {
    title: "Prompt Input",
    description:
      "An auto-resizing text area designed for user prompts and chat interfaces.",
    installation: `import { PromptInput } from 'patiya';`,
    props: [
      {
        name: "onValueSubmit",
        type: "(val: string) => void",
        default: "-",
        description:
          "Callback fired when the user submits the prompt (via Enter key or submit button).",
      },
      {
        name: "actions",
        type: "React.ReactNode",
        default: "-",
        description:
          "Optional action buttons (like attach, mic) to display in the bottom left.",
      },
      {
        name: "attachments",
        type: "React.ReactNode",
        default: "-",
        description:
          "Optional attachments (like chips or images) to display above the input.",
      },
      {
        name: "maxRows",
        type: "number",
        default: "6",
        description: "Maximum number of rows before the textarea scrolls.",
      },
    ],
    examples: [
      {
        title: "Default",
        preview: (
          <Box className="w-full max-w-lg">
            <PromptInput
              placeholder="Ask anything..."
              onValueSubmit={(v) => alert(v)}
            />
          </Box>
        ),
        code: `<PromptInput placeholder="Ask anything..." onValueSubmit={(val) => console.log(val)} />`,
      },
      {
        title: "With Actions",
        preview: (
          <Box className="w-full max-w-lg">
            <PromptInput
              placeholder="Message AI..."
              actions={
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    +
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    mic
                  </Button>
                </>
              }
            />
          </Box>
        ),
        code: `<PromptInput \n  placeholder="Message AI..." \n  actions={\n    <>\n      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">+</Button>\n      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">mic</Button>\n    </>\n  } \n/>`,
      },
      {
        title: "With Attachments",
        preview: (
          <Box className="w-full max-w-lg">
            <PromptInput
              placeholder="Describe this image..."
              attachments={<Chip onClose={() => {}}>image.png</Chip>}
            />
          </Box>
        ),
        code: `<PromptInput \n  placeholder="Describe this image..." \n  attachments={<Chip onClose={() => {}}>image.png</Chip>} \n/>`,
      },
      {
        title: "Custom Max Rows",
        preview: (
          <Box className="w-full max-w-lg">
            <PromptInput
              placeholder="Type a long prompt..."
              maxRows={10}
              aria-label="Long prompt input"
            />
          </Box>
        ),
        code: `<PromptInput placeholder="Type a long prompt..." maxRows={10} />`,
      },
      {
        title: "With Suggestions",
        description: "Prompt input paired with starter suggestion chips.",
        preview: (
          <Box className="w-full max-w-lg space-y-3">
            <Box className="flex flex-wrap gap-2">
              <Chip variant="outline" className="text-xs cursor-pointer">
                Explain quantum computing
              </Chip>
              <Chip variant="outline" className="text-xs cursor-pointer">
                Refactor React hook
              </Chip>
            </Box>
            <PromptInput
              placeholder="Ask anything or pick a suggestion..."
              aria-label="AI prompt with suggestions"
            />
          </Box>
        ),
        code: `<Box className="space-y-3">\n  <Box className="flex flex-wrap gap-2">\n    <Chip variant="outline">Explain quantum computing</Chip>\n    <Chip variant="outline">Refactor React hook</Chip>\n  </Box>\n  <PromptInput placeholder="Ask anything or pick a suggestion..." />\n</Box>`,
      },
    ],
  },
  typingIndicator: {
    title: "Typing Indicator",
    description:
      "Animated indicators to show that an AI is generating a response.",
    installation: `import { TypingIndicator } from 'patiya';`,
    props: [
      {
        name: "variant",
        type: "'dots' | 'pulse' | 'wave'",
        default: "'dots'",
        description: "The animation style.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: "The size of the indicator.",
      },
      {
        name: "color",
        type: "PatiyaColor | string",
        default: "'primary'",
        description:
          "Color of the indicator (e.g. primary, secondary, or custom HEX).",
      },
    ],
    examples: [
      {
        title: "Dots Variant (Default)",
        preview: (
          <Box className="p-4 rounded-xl bg-[var(--patiya-color-muted)]/10">
            <TypingIndicator />
          </Box>
        ),
        code: `<TypingIndicator />`,
      },
      {
        title: "Pulse Variant",
        preview: (
          <Box className="p-4 rounded-xl bg-[var(--patiya-color-muted)]/10">
            <TypingIndicator variant="pulse" />
          </Box>
        ),
        code: `<TypingIndicator variant="pulse" />`,
      },
      {
        title: "Wave Variant",
        preview: (
          <Box className="p-4 rounded-xl bg-[var(--patiya-color-muted)]/10">
            <TypingIndicator variant="wave" />
          </Box>
        ),
        code: `<TypingIndicator variant="wave" />`,
      },
      {
        title: "Sizes",
        preview: (
          <Box className="flex flex-col gap-4 items-start">
            <TypingIndicator size="sm" />
            <TypingIndicator size="md" />
            <TypingIndicator size="lg" />
          </Box>
        ),
        code: `<TypingIndicator size="sm" />\n<TypingIndicator size="md" />\n<TypingIndicator size="lg" />`,
      },
      {
        title: "Colors",
        preview: (
          <Box className="p-4 rounded-xl flex gap-4">
            <TypingIndicator color="primary" />
            <TypingIndicator color="secondary" />
            <TypingIndicator color="accent" />
            <TypingIndicator color="#10b981" />
          </Box>
        ),
        code: `<TypingIndicator color="primary" />\n<TypingIndicator color="secondary" />\n<TypingIndicator color="accent" />\n<TypingIndicator color="#10b981" />`,
      },
    ],
  },
  thinkingProcess: {
    title: "Thinking Process",
    description:
      "A collapsible section to display an AI intermediate reasoning steps.",
    installation: `import { ThinkingProcess } from 'patiya';`,
    props: [
      {
        name: "title",
        type: "string",
        default: "'Thinking process'",
        description: "The title of the collapsible section.",
      },
      {
        name: "isThinking",
        type: "boolean",
        default: "false",
        description:
          "If true, displays a loading spinner instead of the chevron.",
      },
      {
        name: "time",
        type: "string",
        default: "-",
        description: "Optional time taken, displayed when not thinking.",
      },
      {
        name: "defaultExpanded",
        type: "boolean",
        default: "false",
        description: "Whether the section is expanded by default.",
      },
    ],
    examples: [
      {
        title: "Default",
        preview: (
          <ThinkingProcess>
            1. Analyze the request.
            <br />
            2. Retrieve data.
            <br />
            3. Format response.
          </ThinkingProcess>
        ),
        code: `<ThinkingProcess>\n  1. Analyze the request.<br/>\n  2. Retrieve data.<br/>\n  3. Format response.\n</ThinkingProcess>`,
      },
      {
        title: "Thinking State",
        preview: (
          <ThinkingProcess
            isThinking
            title="Searching knowledge base..."
            defaultExpanded
          >
            Querying database for latest documentation...
          </ThinkingProcess>
        ),
        code: `<ThinkingProcess isThinking title="Searching knowledge base..." defaultExpanded>\n  Querying database for latest documentation...\n</ThinkingProcess>`,
      },
      {
        title: "Completed with Time",
        preview: (
          <ThinkingProcess time="2.4s">
            Successfully completed 3 intermediate steps.
          </ThinkingProcess>
        ),
        code: `<ThinkingProcess time="2.4s">\n  Successfully completed 3 intermediate steps.\n</ThinkingProcess>`,
      },
      {
        title: "Custom Title",
        preview: (
          <ThinkingProcess title="Verification steps">
            Checked types, validated props, and ran tests.
          </ThinkingProcess>
        ),
        code: `<ThinkingProcess title="Verification steps">\n  Checked types, validated props, and ran tests.\n</ThinkingProcess>`,
      },
    ],
  },
  typewriterText: {
    title: "Typewriter Text",
    description:
      "An animated component that simulates real-time typing for AI responses.",
    installation: `import { TypewriterText } from 'patiya';`,
    props: [
      {
        name: "text",
        type: "string",
        default: "-",
        description: "The text content to animate.",
      },
      {
        name: "speed",
        type: "number",
        default: "30",
        description: "Typing speed in milliseconds per character.",
      },
      {
        name: "delay",
        type: "number",
        default: "0",
        description: "Initial delay before typing starts.",
      },
      {
        name: "cursor",
        type: "boolean",
        default: "true",
        description: "Whether to show the blinking cursor.",
      },
      {
        name: "onComplete",
        type: "() => void",
        default: "-",
        description: "Callback fired when typing finishes.",
      },
      {
        name: "as",
        type: "React.ElementType",
        default: "'span'",
        description: "The HTML element or React component to render as.",
      },
    ],
    examples: [
      {
        title: "Default",
        preview: <TypewriterText text="Hello, how can I help you today?" />,
        code: `<TypewriterText text="Hello, how can I help you today?" />`,
      },
      {
        title: "Fast Speed",
        preview: (
          <TypewriterText text="This text is typing very fast!" speed={10} />
        ),
        code: `<TypewriterText text="This text is typing very fast!" speed={10} />`,
      },
      {
        title: "Slow Speed",
        preview: <TypewriterText text="Taking... my... time..." speed={150} />,
        code: `<TypewriterText text="Taking... my... time..." speed={150} />`,
      },
      {
        title: "Delayed Start",
        preview: (
          <TypewriterText
            text="I waited 2 seconds before saying this."
            delay={2000}
          />
        ),
        code: `<TypewriterText text="I waited 2 seconds before saying this." delay={2000} />`,
      },
      {
        title: "No Cursor",
        preview: (
          <TypewriterText
            text="I am typing without a cursor indicator."
            cursor={false}
          />
        ),
        code: `<TypewriterText text="I am typing without a cursor indicator." cursor={false} />`,
      },
      {
        title: "Custom Element",
        preview: (
          <TypewriterText
            text="I am a heading!"
            as="h3"
            className="text-2xl font-bold text-[var(--patiya-color-primary)]"
          />
        ),
        code: `<TypewriterText \n  text="I am a heading!" \n  as="h3" \n  className="text-2xl font-bold text-[var(--patiya-color-primary)]" \n/>`,
      },
    ],
  },
  promptSuggestion: {
    title: "Prompt Suggestion",
    description:
      "Interactive cards or chips to present suggested actions or prompts to the user.",
    installation: `import { PromptSuggestion } from 'patiya';`,
    props: [
      {
        name: "title",
        type: "string",
        default: "-",
        description: "The main title or prompt text.",
      },
      {
        name: "description",
        type: "string",
        default: "-",
        description: "Optional description or context.",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        default: "-",
        description: "Optional icon element.",
      },
      {
        name: "variant",
        type: "'card' | 'chip'",
        default: "'card'",
        description: "Visual style variant.",
      },
      {
        name: "color",
        type: "PatiyaColor",
        default: "'primary'",
        description: "Theme color for hover effects and icons.",
      },
    ],
    examples: [
      {
        title: "Default (Card)",
        preview: (
          <Box className="w-full max-w-sm">
            <PromptSuggestion
              title="Summarize document"
              description="Create a concise summary of the active file"
              className="w-full"
            />
          </Box>
        ),
        code: `<PromptSuggestion \n  title="Summarize document" \n  description="Create a concise summary of the active file" \n/>`,
      },
      {
        title: "With Icon",
        preview: (
          <Box className="w-full max-w-sm">
            <PromptSuggestion
              title="Generate Image"
              description="Create an image from text"
              icon={<span>🎨</span>}
              className="w-full"
            />
          </Box>
        ),
        code: `<PromptSuggestion \n  title="Generate Image" \n  description="Create an image from text" \n  icon={<span>🎨</span>} \n/>`,
      },
      {
        title: "Chip Variant",
        preview: (
          <Box className="flex gap-2 flex-wrap">
            <PromptSuggestion variant="chip" title="Write an email" />
            <PromptSuggestion variant="chip" title="Fix grammar" />
          </Box>
        ),
        code: `<PromptSuggestion variant="chip" title="Write an email" />\n<PromptSuggestion variant="chip" title="Fix grammar" />`,
      },
      {
        title: "Chip With Icon",
        preview: (
          <PromptSuggestion
            variant="chip"
            title="Explain code"
            icon={<span>💡</span>}
          />
        ),
        code: `<PromptSuggestion variant="chip" title="Explain code" icon={<span>💡</span>} />`,
      },
      {
        title: "Grid Layout (Cards)",
        preview: (
          <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
            <PromptSuggestion title="Plan trip" description="To Hawaii" />
            <PromptSuggestion
              title="Write poem"
              description="About the ocean"
            />
          </Box>
        ),
        code: `<Box className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">\n  <PromptSuggestion title="Plan trip" description="To Hawaii" />\n  <PromptSuggestion title="Write poem" description="About the ocean" />\n</Box>`,
      },
      {
        title: "Semantic Colors",
        preview: (
          <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
            <PromptSuggestion
              title="Delete all"
              description="Remove all files"
              color="destructive"
              icon={<span>🗑️</span>}
            />
            <PromptSuggestion
              title="Deploy app"
              description="Ship to production"
              color="success"
              icon={<span>🚀</span>}
            />
          </Box>
        ),
        code: `<PromptSuggestion title="Delete all" color="destructive" icon={<span>🗑️</span>} />\n<PromptSuggestion title="Deploy app" color="success" icon={<span>🚀</span>} />`,
      },
    ],
  },
  sourceCitation: {
    title: "Source Citation",
    description:
      "Grounded source citation badges and cards for RAG search results, AI fact-checking, and research assistants.",
    installation: `import { SourceCitation, SourceCitationList } from 'patiya';`,
    props: [
      {
        name: "title",
        type: "string",
        default: "-",
        description: "Title of the cited reference or web page.",
      },
      {
        name: "url",
        type: "string",
        default: "-",
        description: "Direct URL to the external cited resource.",
      },
      {
        name: "variant",
        type: "'badge' | 'chip' | 'card'",
        default: "'badge'",
        description:
          "Display mode as an inline superscript badge, chip pill, or full card.",
      },
      {
        name: "index",
        type: "number | string",
        default: "-",
        description: "Citation index or numerical identifier (e.g. 1, 2).",
      },
      {
        name: "domain",
        type: "string",
        default: "Extracted from url",
        description: "Optional custom domain name displayed in the preview.",
      },
      {
        name: "snippet",
        type: "string",
        default: "-",
        description:
          "Excerpt or quotation text displayed inside hover popup or card.",
      },
      {
        name: "favicon",
        type: "string | React.ReactNode",
        default: "-",
        description: "Favicon image URL or custom icon element.",
      },
      {
        name: "SourceCitationList.layout",
        type: "'row' | 'grid'",
        default: "'row'",
        description:
          "Arrangement for multiple citations (flex row or multi-column grid).",
      },
    ],
    examples: [
      {
        title: "Inline RAG Citations with Hover Preview",
        description:
          "Inline superscript badges that reveal rich source metadata on hover.",
        preview: (
          <div className="w-full max-w-xl mx-auto p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] text-sm leading-relaxed space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--patiya-color-primary)]">
              <span>✦</span> RAG Synthesized Answer
            </div>
            <div className="text-[var(--patiya-color-foreground)]">
              Quantum computational supremacy relies on superconducting transmon
              qubits cooled to millikelvin temperatures
              <SourceCitation
                index={1}
                title="Quantum Computational Supremacy via Superconducting Processors"
                url="https://nature.com/articles/s41586-019-1666-5"
                domain="nature.com"
                snippet="Demonstration of quantum computational supremacy using 53 programmable superconducting qubits with high-fidelity operations."
              />
              . Recent benchmarks demonstrate fault-tolerant logical qubits with
              surface code error-correction thresholds exceeding 99.4%
              <SourceCitation
                index={2}
                title="Fault-Tolerant Quantum Computing with Logical Qubits"
                url="https://arxiv.org/abs/2312.03982"
                domain="arxiv.org"
                snippet="Experimental realization of quantum error correction with physical error rates well below the fault-tolerant threshold."
              />
              , allowing for scalable coherence times
              <SourceCitation
                index={3}
                title="Google Quantum AI Roadmap & Milestones"
                url="https://quantumai.google"
                domain="quantumai.google"
                snippet="Roadmap toward commercial-grade fault-tolerant quantum hardware with 1M physical qubits."
              />
              .
            </div>
          </div>
        ),
        code: `<p>\n  Superconducting qubits cooled to millikelvin temperatures\n  <SourceCitation index={1} title="Quantum Supremacy" url="https://nature.com" snippet="Demonstration of quantum supremacy." />\n  with surface code error correction thresholds exceeding 99.4%\n  <SourceCitation index={2} title="Fault Tolerant Qubits" url="https://arxiv.org" snippet="Realization of quantum error correction." />\n</p>`,
      },
      {
        title: "Source Cards Grid",
        description:
          "Rich cards displaying full source domain, title, and relevance quote.",
        preview: (
          <SourceCitationList layout="grid" className="max-w-2xl mx-auto">
            <SourceCitation
              variant="card"
              index={1}
              title="Attention Is All You Need"
              url="https://arxiv.org/abs/1706.03762"
              domain="arxiv.org"
              snippet="The dominant sequence transduction models are based on complex recurrent or convolutional neural networks."
            />
            <SourceCitation
              variant="card"
              index={2}
              title="Constitutional AI: Harmlessness from AI Feedback"
              url="https://anthropic.com/research/constitutional-ai"
              domain="anthropic.com"
              snippet="Techniques for training a harmless AI assistant using self-critique and revision without human labels."
            />
            <SourceCitation
              variant="card"
              index={3}
              title="DeepSeek-R1 Technical Report"
              url="https://github.com/deepseek-ai/DeepSeek-R1"
              domain="github.com"
              snippet="Incentivizing reasoning capabilities in LLMs via large-scale reinforcement learning."
            />
          </SourceCitationList>
        ),
        code: `<SourceCitationList layout="grid">\n  <SourceCitation variant="card" index={1} title="Attention Is All You Need" url="https://arxiv.org/abs/1706.03762" snippet="The dominant sequence transduction models..." />\n  <SourceCitation variant="card" index={2} title="Constitutional AI" url="https://anthropic.com" snippet="Techniques for training a harmless AI assistant..." />\n</SourceCitationList>`,
      },
      {
        title: "Pill Chips Row",
        description:
          "Compact horizontal pills with external link indicator for quick verification.",
        preview: (
          <SourceCitationList
            layout="row"
            className="justify-center max-w-xl mx-auto"
          >
            <SourceCitation
              variant="chip"
              index={1}
              title="Next.js Documentation"
              url="https://nextjs.org"
              domain="nextjs.org"
            />
            <SourceCitation
              variant="chip"
              index={2}
              title="Tailwind CSS v4 Spec"
              url="https://tailwindcss.com"
              domain="tailwindcss.com"
            />
            <SourceCitation
              variant="chip"
              index={3}
              title="TypeScript Handbook"
              url="https://typescriptlang.org"
              domain="typescriptlang.org"
            />
          </SourceCitationList>
        ),
        code: `<SourceCitationList layout="row">\n  <SourceCitation variant="chip" index={1} title="Next.js Docs" url="https://nextjs.org" />\n  <SourceCitation variant="chip" index={2} title="Tailwind CSS v4" url="https://tailwindcss.com" />\n</SourceCitationList>`,
      },
    ],
  },
  "source-citation": {
    get title() {
      return "Source Citation";
    },
    get description() {
      return "Grounded source citation badges and cards for RAG search results, AI fact-checking, and research assistants.";
    },
    get installation() {
      return `import { SourceCitation, SourceCitationList } from 'patiya';`;
    },
    get props() {
      return (componentsRegistry as any).sourceCitation.props;
    },
    get examples() {
      return (componentsRegistry as any).sourceCitation.examples;
    },
  },
  modelSelector: {
    title: "Model Selector",
    description:
      "A dropdown selector for switching AI models with provider icons, context window tags, and capability badges.",
    installation: `import { ModelSelector, AIModel } from 'patiya';`,
    props: [
      {
        name: "models",
        type: "AIModel[]",
        default: "[]",
        description:
          "List of available AI models with name, provider, badge, and context size.",
      },
      {
        name: "value",
        type: "string",
        default: "-",
        description: "Controlled model ID of the currently selected model.",
      },
      {
        name: "defaultValue",
        type: "string",
        default: "models[0].id",
        description: "Initially selected model ID when uncontrolled.",
      },
      {
        name: "onValueChange",
        type: "(modelId: string) => void",
        default: "-",
        description: "Callback invoked when a new model is selected.",
      },
      {
        name: "size",
        type: "'sm' | 'md'",
        default: "'md'",
        description: "Trigger button size and padding scale.",
      },
      {
        name: "variant",
        type: "'button' | 'compact' | 'ghost'",
        default: "'button'",
        description: "Visual appearance style of the dropdown trigger.",
      },
      {
        name: "className",
        type: "string",
        default: "-",
        description: "Additional CSS classes to apply.",
      },
    ],
    examples: [
      {
        title: "Interactive Model Switcher",
        description:
          "Full dropdown with model capabilities, context window sizes, and active checkmarks.",
        preview: (
          <div className="flex justify-center p-6 w-full min-h-[300px]">
            <ModelSelector
              defaultValue="claude-3-5-sonnet"
              models={[
                {
                  id: "claude-3-5-sonnet",
                  name: "Claude 3.5 Sonnet",
                  provider: "Anthropic",
                  description:
                    "Industry-leading intelligence and complex coding ability",
                  badge: "Most Capable",
                  contextLength: "200k",
                },
                {
                  id: "gpt-4o",
                  name: "GPT-4o",
                  provider: "OpenAI",
                  description:
                    "Fast multi-modal flagship model for audio, vision, and text",
                  badge: "Omni",
                  contextLength: "128k",
                },
                {
                  id: "deepseek-r1",
                  name: "DeepSeek R1",
                  provider: "DeepSeek",
                  description:
                    "Open-weights reasoning model with state-of-the-art logic",
                  badge: "Reasoning",
                  contextLength: "64k",
                },
                {
                  id: "gemini-1-5-pro",
                  name: "Gemini 1.5 Pro",
                  provider: "Google",
                  description:
                    "Massive 2M token context window for complex multimodal analysis",
                  badge: "2M Context",
                  contextLength: "2M",
                },
              ]}
            />
          </div>
        ),
        code: `const models: AIModel[] = [\n  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', badge: 'Most Capable', contextLength: '200k' },\n  { id: 'gpt-4o', name: 'GPT-4o', badge: 'Omni', contextLength: '128k' },\n  { id: 'deepseek-r1', name: 'DeepSeek R1', badge: 'Reasoning', contextLength: '64k' },\n];\n\n<ModelSelector models={models} defaultValue="claude-3-5-sonnet" />`,
      },
      {
        title: "Embedded in Prompt Input Bar",
        description:
          "Compact model selector placed directly within an AI chat input toolbar.",
        preview: (
          <div className="w-full max-w-xl mx-auto p-3 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] shadow-xs space-y-3">
            <textarea
              rows={2}
              placeholder="Ask anything or generate code..."
              className="w-full bg-transparent resize-none text-sm outline-none placeholder:text-[var(--patiya-color-muted-foreground)]"
            />
            <div className="flex items-center justify-between border-t border-[var(--patiya-color-border)] pt-2.5">
              <ModelSelector
                size="sm"
                variant="compact"
                defaultValue="gpt-4o"
                models={[
                  {
                    id: "gpt-4o",
                    name: "GPT-4o",
                    badge: "Omni",
                    contextLength: "128k",
                  },
                  {
                    id: "claude-3-5-sonnet",
                    name: "Claude 3.5",
                    badge: "Coding",
                    contextLength: "200k",
                  },
                  {
                    id: "deepseek-r1",
                    name: "DeepSeek R1",
                    badge: "Reasoning",
                    contextLength: "64k",
                  },
                ]}
              />
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] shadow-xs hover:opacity-90 transition-opacity"
              >
                <span>Send</span>
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ),
        code: `<div className="flex items-center justify-between border-t pt-2.5">\n  <ModelSelector size="sm" variant="compact" models={models} defaultValue="gpt-4o" />\n  <Button size="sm">Send</Button>\n</div>`,
      },
      {
        title: "Ghost Header Variant",
        description:
          "Borderless minimal selector suitable for top navigation bars or header controls.",
        preview: (
          <div className="flex items-center justify-between p-3 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/20 w-full max-w-md mx-auto">
            <span className="text-xs font-medium text-[var(--patiya-color-muted-foreground)]">
              Agent Engine:
            </span>
            <ModelSelector
              variant="ghost"
              size="sm"
              defaultValue="deepseek-r1"
              models={[
                {
                  id: "deepseek-r1",
                  name: "DeepSeek R1",
                  badge: "Reasoning",
                  contextLength: "64k",
                },
                {
                  id: "claude-3-5-sonnet",
                  name: "Claude 3.5 Sonnet",
                  badge: "Coding",
                  contextLength: "200k",
                },
              ]}
            />
          </div>
        ),
        code: `<div className="flex items-center justify-between p-3">\n  <span>Agent Engine:</span>\n  <ModelSelector variant="ghost" size="sm" models={models} defaultValue="deepseek-r1" />\n</div>`,
      },
    ],
  },
  "model-selector": {
    get title() {
      return "Model Selector";
    },
    get description() {
      return "A dropdown selector for switching AI models with provider icons, context window tags, and capability badges.";
    },
    get installation() {
      return `import { ModelSelector, AIModel } from 'patiya';`;
    },
    get props() {
      return (componentsRegistry as any).modelSelector.props;
    },
    get examples() {
      return (componentsRegistry as any).modelSelector.examples;
    },
  },
  otpInput: {
    title: "OTP Input",
    description:
      "A beautifully animated one-time password or PIN input component.",
    installation: `import { OTPInput } from 'patiya';`,
    props: [
      {
        name: "length",
        type: "number",
        default: "6",
        description: "Number of input boxes.",
      },
      {
        name: "mask",
        type: "boolean",
        default: "false",
        description: "Mask input like a password.",
      },
      {
        name: "error",
        type: "boolean",
        default: "false",
        description: "Show error state.",
      },
      {
        name: "numericOnly",
        type: "boolean",
        default: "true",
        description: "Only allow numbers.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: "Size of the input boxes.",
      },
      {
        name: "separator",
        type: "ReactNode",
        default: "-",
        description: "Optional separator element.",
      },
    ],
    examples: [
      {
        title: "Default (6 Digits)",
        preview: <OTPInput length={6} />,
        code: `<OTPInput length={6} />`,
      },
      {
        title: "4 Digits",
        preview: <OTPInput length={4} />,
        code: `<OTPInput length={4} />`,
      },
      {
        title: "Masked (Password)",
        preview: <OTPInput mask />,
        code: `<OTPInput mask />`,
      },
      {
        title: "With Separator",
        preview: <OTPInput separator="-" />,
        code: `<OTPInput separator="-" />`,
      },
      {
        title: "Error State",
        preview: <OTPInput error value="123" />,
        code: `<OTPInput error />`,
      },
      {
        title: "Sizes",
        preview: (
          <Box className="flex flex-col gap-4">
            <OTPInput size="sm" />
            <OTPInput size="lg" />
          </Box>
        ),
        code: `<OTPInput size="sm" />\n<OTPInput size="lg" />`,
      },
      {
        title: "Alphanumeric",
        preview: <OTPInput numericOnly={false} />,
        code: `<OTPInput numericOnly={false} />`,
      },
    ],
  },
  passwordStrength: {
    title: "Password Strength",
    description:
      "Input field with a visual strength meter and requirement checklist.",
    installation: `import { PasswordStrength } from 'patiya';`,
    props: [
      {
        name: "showMeter",
        type: "boolean",
        default: "true",
        description: "Show the visual strength bar.",
      },
      {
        name: "showRequirements",
        type: "boolean",
        default: "true",
        description: "Show the checklist.",
      },
      {
        name: "strengthLabel",
        type: "string",
        default: "'Password strength'",
        description: "Custom label for meter.",
      },
    ],
    examples: [
      {
        title: "Default",
        preview: (
          <Box className="w-full max-w-sm">
            <PasswordStrength placeholder="Create password" />
          </Box>
        ),
        code: `<PasswordStrength placeholder="Create password" />`,
      },
      {
        title: "Hide Requirements",
        preview: (
          <Box className="w-full max-w-sm">
            <PasswordStrength showRequirements={false} placeholder="Password" />
          </Box>
        ),
        code: `<PasswordStrength showRequirements={false} placeholder="Password" />`,
      },
      {
        title: "Hide Meter",
        preview: (
          <Box className="w-full max-w-sm">
            <PasswordStrength showMeter={false} placeholder="Password" />
          </Box>
        ),
        code: `<PasswordStrength showMeter={false} placeholder="Password" />`,
      },
      {
        title: "Custom Label",
        preview: (
          <Box className="w-full max-w-sm">
            <PasswordStrength
              strengthLabel="Security Level"
              placeholder="Password"
            />
          </Box>
        ),
        code: `<PasswordStrength strengthLabel="Security Level" placeholder="Password" />`,
      },
      {
        title: "Sizes (Large)",
        preview: (
          <Box className="w-full max-w-sm">
            <PasswordStrength inputSize="lg" placeholder="Password" />
          </Box>
        ),
        code: `<PasswordStrength inputSize="lg" placeholder="Password" />`,
      },
      {
        title: "Error State",
        preview: (
          <Box className="w-full max-w-sm">
            <PasswordStrength invalid placeholder="Password" />
          </Box>
        ),
        code: `<PasswordStrength invalid placeholder="Password" />`,
      },
    ],
  },
  socialLoginButton: {
    title: "Social Login Button",
    description:
      "Beautiful, branded authentication buttons for popular providers.",
    installation: `import { SocialLoginButton } from 'patiya';`,
    props: [
      {
        name: "provider",
        type: "'google' | 'apple' | 'github' | 'facebook' | 'twitter' | 'microsoft'",
        default: "-",
        description: "The social provider.",
      },
      {
        name: "text",
        type: "string",
        default: "-",
        description: 'Custom text (defaults to "Continue with...").',
      },
      {
        name: "iconOnly",
        type: "boolean",
        default: "false",
        description: "Render as a square icon button.",
      },
      {
        name: "variant",
        type: "'solid' | 'outline' | 'ghost'",
        default: "'outline'",
        description: "Button style variant.",
      },
    ],
    examples: [
      {
        title: "Default (Outline)",
        preview: (
          <Box className="w-full max-w-sm flex flex-col gap-3">
            <SocialLoginButton provider="google" />
            <SocialLoginButton provider="github" />
          </Box>
        ),
        code: `<SocialLoginButton provider="google" />\n<SocialLoginButton provider="github" />`,
      },
      {
        title: "Solid Brand Colors",
        preview: (
          <Box className="w-full max-w-sm flex flex-col gap-3">
            <SocialLoginButton provider="google" variant="solid" />
            <SocialLoginButton provider="github" variant="solid" />
            <SocialLoginButton provider="facebook" variant="solid" />
            <SocialLoginButton provider="twitter" variant="solid" />
          </Box>
        ),
        code: `<SocialLoginButton provider="google" variant="solid" />\n<SocialLoginButton provider="github" variant="solid" />`,
      },
      {
        title: "Ghost Variant",
        preview: (
          <Box className="w-full max-w-sm flex flex-col gap-3">
            <SocialLoginButton provider="apple" variant="ghost" />
            <SocialLoginButton provider="microsoft" variant="ghost" />
          </Box>
        ),
        code: `<SocialLoginButton provider="apple" variant="ghost" />\n<SocialLoginButton provider="microsoft" variant="ghost" />`,
      },
      {
        title: "Icon Only",
        preview: (
          <Box className="flex gap-4">
            <SocialLoginButton provider="google" iconOnly />
            <SocialLoginButton provider="github" iconOnly />
            <SocialLoginButton provider="apple" iconOnly />
            <SocialLoginButton provider="twitter" iconOnly />
          </Box>
        ),
        code: `<SocialLoginButton provider="google" iconOnly />\n<SocialLoginButton provider="github" iconOnly />`,
      },
      {
        title: "Icon Only (Solid)",
        preview: (
          <Box className="flex gap-4">
            <SocialLoginButton provider="google" iconOnly variant="solid" />
            <SocialLoginButton provider="github" iconOnly variant="solid" />
            <SocialLoginButton provider="facebook" iconOnly variant="solid" />
            <SocialLoginButton provider="twitter" iconOnly variant="solid" />
          </Box>
        ),
        code: `<SocialLoginButton provider="google" iconOnly variant="solid" />\n<SocialLoginButton provider="github" iconOnly variant="solid" />`,
      },
      {
        title: "Custom Text",
        preview: (
          <Box className="w-full max-w-sm">
            <SocialLoginButton provider="google" text="Sign in with Google" />
          </Box>
        ),
        code: `<SocialLoginButton provider="google" text="Sign in with Google" />`,
      },
    ],
  },
  userButton: {
    title: "User Button",
    description:
      "A multi-functional button to display user profile and trigger account menus.",
    installation: `import { UserButton } from 'patiya';`,
    props: [
      { name: "name", type: "string", default: "-", description: "User name." },
      {
        name: "email",
        type: "string",
        default: "-",
        description: "User email (optional).",
      },
      {
        name: "avatarUrl",
        type: "string",
        default: "-",
        description: "URL for avatar image.",
      },
      {
        name: "initials",
        type: "string",
        default: "-",
        description: "Fallback initials.",
      },
      {
        name: "role",
        type: "string",
        default: "-",
        description: "User role badge.",
      },
      {
        name: "collapsed",
        type: "boolean",
        default: "false",
        description: "Show only the avatar.",
      },
    ],
    examples: [
      {
        title: "Default",
        preview: (
          <Box className="w-full max-w-[240px]">
            <UserButton name="Alice Smith" email="alice@example.com" />
          </Box>
        ),
        code: `<UserButton name="Alice Smith" email="alice@example.com" />`,
      },
      {
        title: "With Role Badge",
        preview: (
          <Box className="w-full max-w-[240px]">
            <UserButton name="John Doe" email="admin@patiya.com" role="Admin" />
          </Box>
        ),
        code: `<UserButton name="John Doe" email="admin@patiya.com" role="Admin" />`,
      },
      {
        title: "With Avatar Image",
        preview: (
          <Box className="w-full max-w-[240px]">
            <UserButton
              name="Sarah Jenkins"
              email="sarah.j@example.com"
              avatarUrl="https://i.pravatar.cc/150?u=4"
            />
          </Box>
        ),
        code: `<UserButton name="Sarah Jenkins" email="sarah.j@example.com" avatarUrl="https://i.pravatar.cc/150?u=4" />`,
      },
      {
        title: "Name Only",
        preview: (
          <Box className="w-full max-w-[240px]">
            <UserButton name="Guest User" />
          </Box>
        ),
        code: `<UserButton name="Guest User" />`,
      },
      {
        title: "Collapsed (Icon Only)",
        preview: (
          <Box className="flex gap-4">
            <UserButton name="Alice Smith" collapsed />
            <UserButton
              name="Sarah Jenkins"
              avatarUrl="https://i.pravatar.cc/150?u=4"
              collapsed
            />
          </Box>
        ),
        code: `<UserButton name="Alice Smith" collapsed />\n<UserButton name="Sarah Jenkins" avatarUrl="..." collapsed />`,
      },
      {
        title: "Custom Initials",
        preview: (
          <Box className="w-full max-w-[240px]">
            <UserButton
              name="Development Team"
              initials="DT"
              email="devs@patiya.com"
            />
          </Box>
        ),
        code: `<UserButton name="Development Team" initials="DT" email="devs@patiya.com" />`,
      },
    ],
  },
  securityBadge: {
    title: "Security Badge",
    description:
      "Visual indicators for verification, security, and risk levels.",
    installation: `import { SecurityBadge } from 'patiya';`,
    props: [
      {
        name: "level",
        type: "'verified' | 'unverified' | 'protected' | 'risky'",
        default: "-",
        description: "The security level.",
      },
      {
        name: "label",
        type: "string",
        default: "-",
        description: "Custom label text.",
      },
      {
        name: "iconOnly",
        type: "boolean",
        default: "false",
        description: "Show only the icon.",
      },
    ],
    examples: [
      {
        title: "All Levels (Default)",
        preview: (
          <Box className="flex flex-wrap gap-4">
            <SecurityBadge level="verified" />
            <SecurityBadge level="unverified" />
            <SecurityBadge level="protected" />
            <SecurityBadge level="risky" />
          </Box>
        ),
        code: `<SecurityBadge level="verified" />\n<SecurityBadge level="unverified" />\n<SecurityBadge level="protected" />\n<SecurityBadge level="risky" />`,
      },
      {
        title: "Solid Variant",
        preview: (
          <Box className="flex flex-wrap gap-4">
            <SecurityBadge level="verified" variant="solid" />
            <SecurityBadge level="unverified" variant="solid" />
            <SecurityBadge level="protected" variant="solid" />
            <SecurityBadge level="risky" variant="solid" />
          </Box>
        ),
        code: `<SecurityBadge level="verified" variant="solid" />\n<SecurityBadge level="unverified" variant="solid" />`,
      },
      {
        title: "Outline Variant",
        preview: (
          <Box className="flex flex-wrap gap-4">
            <SecurityBadge level="verified" variant="outline" />
            <SecurityBadge level="unverified" variant="outline" />
            <SecurityBadge level="protected" variant="outline" />
            <SecurityBadge level="risky" variant="outline" />
          </Box>
        ),
        code: `<SecurityBadge level="verified" variant="outline" />\n<SecurityBadge level="unverified" variant="outline" />`,
      },
      {
        title: "Icon Only",
        preview: (
          <Box className="flex flex-wrap gap-4">
            <SecurityBadge level="verified" iconOnly />
            <SecurityBadge level="unverified" iconOnly />
            <SecurityBadge level="protected" iconOnly />
            <SecurityBadge level="risky" iconOnly />
          </Box>
        ),
        code: `<SecurityBadge level="verified" iconOnly />\n<SecurityBadge level="unverified" iconOnly />`,
      },
      {
        title: "Custom Label",
        preview: (
          <Box className="flex flex-wrap gap-4">
            <SecurityBadge level="verified" label="KYC Passed" />
            <SecurityBadge level="protected" label="End-to-End Encrypted" />
          </Box>
        ),
        code: `<SecurityBadge level="verified" label="KYC Passed" />\n<SecurityBadge level="protected" label="End-to-End Encrypted" />`,
      },
      {
        title: "Different Sizes",
        preview: (
          <Box className="flex items-center flex-wrap gap-4">
            <SecurityBadge level="verified" size="sm" />
            <SecurityBadge level="verified" size="md" />
            <SecurityBadge level="verified" size="lg" />
          </Box>
        ),
        code: `<SecurityBadge level="verified" size="sm" />\n<SecurityBadge level="verified" size="md" />\n<SecurityBadge level="verified" size="lg" />`,
      },
    ],
  },
  passkeyAuth: {
    title: "Passkey Auth",
    description:
      "Biometric and WebAuthn passkey authentication card with interactive scanner, credential manager, and status indicators.",
    installation: `import { PasskeyAuth } from 'patiya';`,
    props: [
      {
        name: "title",
        type: "string",
        default: "'Passkey Authentication'",
        description: "Title header for the auth card.",
      },
      {
        name: "description",
        type: "string",
        default: "...",
        description: "Descriptive guidance for the user.",
      },
      {
        name: "credentials",
        type: "PasskeyCredential[]",
        default: "defaultCredentials",
        description: "List of saved passkey credentials.",
      },
      {
        name: "selectedId",
        type: "string",
        default: "first credential",
        description: "Currently active credential ID.",
      },
      {
        name: "onAuthenticate",
        type: "(cred: PasskeyCredential) => Promise<boolean> | boolean | void",
        default: "-",
        description: "Triggered when user authenticates.",
      },
      {
        name: "onRegister",
        type: "() => void",
        default: "-",
        description: "Callback to register a new passkey.",
      },
      {
        name: "onCancel",
        type: "() => void",
        default: "-",
        description: "Callback for alternative auth methods.",
      },
      {
        name: "status",
        type: "'idle' | 'scanning' | 'success' | 'error'",
        default: "'idle'",
        description: "Controlled scanner state.",
      },
      {
        name: "showCredentials",
        type: "boolean",
        default: "true",
        description: "Toggle saved passkey credentials list.",
      },
      {
        name: "allowRegistration",
        type: "boolean",
        default: "true",
        description: "Toggle new passkey registration link.",
      },
    ],
    examples: [
      {
        title: "Interactive Passkey Scanner (Default)",
        description:
          "Click the biometric sensor or verify button to experience the simulated scanning wave and success state.",
        preview: (
          <Box className="w-full flex justify-center py-4">
            <PasskeyAuth />
          </Box>
        ),
        code: `<PasskeyAuth />`,
      },
      {
        title: "With Custom Passkey Credentials",
        description:
          "Passkey authentication with custom hardware keys, Touch ID, and Face ID credentials.",
        preview: (
          <Box className="w-full flex justify-center py-4">
            <PasskeyAuth
              title="Secure Enterprise Login"
              description="Verify with your corporate hardware security key or enrolled biometrics."
              credentials={[
                {
                  id: "p1",
                  name: "MacBook Pro Touch ID",
                  type: "fingerprint",
                  device: "Work Laptop",
                  lastUsed: "5m ago",
                  isDefault: true,
                },
                {
                  id: "p2",
                  name: "YubiKey 5Ci (USB-C)",
                  type: "key",
                  device: "Hardware Key",
                  lastUsed: "Yesterday",
                },
                {
                  id: "p3",
                  name: "iPhone Face ID",
                  type: "face",
                  device: "iOS 18 Authenticator",
                  lastUsed: "4 days ago",
                },
              ]}
              onRegister={() => alert("Register passkey flow")}
            />
          </Box>
        ),
        code: `<PasskeyAuth
  title="Secure Enterprise Login"
  description="Verify with your corporate hardware security key or enrolled biometrics."
  credentials={[
    { id: 'p1', name: 'MacBook Pro Touch ID', type: 'fingerprint', device: 'Work Laptop', lastUsed: '5m ago', isDefault: true },
    { id: 'p2', name: 'YubiKey 5Ci (USB-C)', type: 'key', device: 'Hardware Key', lastUsed: 'Yesterday' },
    { id: 'p3', name: 'iPhone Face ID', type: 'face', device: 'iOS 18 Authenticator', lastUsed: '4 days ago' }
  ]}
  onRegister={() => console.log('Register passkey')}
/>`,
      },
      {
        title: "Status States (Success & Scanning)",
        description: "Controlled preview of scanning and verified states.",
        preview: (
          <Box className="w-full grid md:grid-cols-2 gap-6 py-4">
            <PasskeyAuth
              status="scanning"
              showCredentials={false}
              title="Live Biometric Scan"
            />
            <PasskeyAuth
              status="success"
              showCredentials={false}
              title="Identity Verified"
            />
          </Box>
        ),
        code: `<Box className="grid md:grid-cols-2 gap-6">
  <PasskeyAuth status="scanning" showCredentials={false} title="Live Biometric Scan" />
  <PasskeyAuth status="success" showCredentials={false} title="Identity Verified" />
</Box>`,
      },
    ],
  },
  activeSessions: {
    title: "Active Sessions",
    description:
      "Security management component to view and revoke authenticated devices, platforms, browsers, and IP locations.",
    installation: `import { ActiveSessions } from 'patiya';`,
    props: [
      {
        name: "title",
        type: "string",
        default: "'Active Sessions & Devices'",
        description: "Title header.",
      },
      {
        name: "description",
        type: "string",
        default: "...",
        description: "Subtitle guidance.",
      },
      {
        name: "sessions",
        type: "SessionItem[]",
        default: "defaultSessions",
        description: "Array of active session objects.",
      },
      {
        name: "onRevoke",
        type: "(sessionId: string) => void",
        default: "-",
        description: "Callback fired when a device session is revoked.",
      },
      {
        name: "onRevokeAllOthers",
        type: "() => void",
        default: "-",
        description: "Callback fired when all other devices are signed out.",
      },
      {
        name: "allowRevokeAll",
        type: "boolean",
        default: "true",
        description: "Allow bulk sign out of other devices.",
      },
      {
        name: "showFilters",
        type: "boolean",
        default: "true",
        description: "Show filter tabs (All / Current / Others).",
      },
    ],
    examples: [
      {
        title: "Device & Session Management (Default)",
        description:
          "Complete interactive session list with live device indicators, platform icons, location tags, and two-step revoke confirmation.",
        preview: (
          <Box className="w-full flex justify-center py-4">
            <ActiveSessions />
          </Box>
        ),
        code: `<ActiveSessions />`,
      },
      {
        title: "With Suspicious Activity Detection",
        description:
          "Highlighted warning banner when an unrecognized IP or suspicious session is detected.",
        preview: (
          <Box className="w-full flex justify-center py-4">
            <ActiveSessions
              sessions={[
                {
                  id: "s-1",
                  deviceName: "MacBook Air M2",
                  deviceType: "desktop",
                  platform: "mac",
                  browser: "safari",
                  ipAddress: "192.168.1.10",
                  location: "Austin, TX, USA",
                  lastActive: "Active now",
                  isCurrent: true,
                  isTrusted: true,
                },
                {
                  id: "s-2",
                  deviceName: "Linux Server (Automated Script)",
                  deviceType: "terminal",
                  platform: "linux",
                  browser: "firefox",
                  ipAddress: "45.33.32.156",
                  location: "Unknown Location",
                  lastActive: "10 minutes ago",
                  isSuspicious: true,
                },
              ]}
            />
          </Box>
        ),
        code: `<ActiveSessions
  sessions={[
    {
      id: 's-1',
      deviceName: 'MacBook Air M2',
      deviceType: 'desktop',
      platform: 'mac',
      browser: 'safari',
      ipAddress: '192.168.1.10',
      location: 'Austin, TX, USA',
      lastActive: 'Active now',
      isCurrent: true,
      isTrusted: true
    },
    {
      id: 's-2',
      deviceName: 'Linux Server (Automated Script)',
      deviceType: 'terminal',
      platform: 'linux',
      browser: 'firefox',
      ipAddress: '45.33.32.156',
      location: 'Unknown Location',
      lastActive: '10 minutes ago',
      isSuspicious: true
    }
  ]}
/>`,
      },
      {
        title: "Single Active Device",
        description:
          "Clean state when user has only their current active device authenticated.",
        preview: (
          <Box className="w-full flex justify-center py-4">
            <ActiveSessions
              showFilters={false}
              sessions={[
                {
                  id: "s-single",
                  deviceName: "iPhone 15 Pro Max",
                  deviceType: "mobile",
                  platform: "ios",
                  browser: "safari",
                  ipAddress: "172.56.21.9",
                  location: "Seattle, WA, USA",
                  lastActive: "Active now",
                  isCurrent: true,
                  isTrusted: true,
                },
              ]}
            />
          </Box>
        ),
        code: `<ActiveSessions
  showFilters={false}
  sessions={[
    {
      id: 's-single',
      deviceName: 'iPhone 15 Pro Max',
      deviceType: 'mobile',
      platform: 'ios',
      browser: 'safari',
      ipAddress: '172.56.21.9',
      location: 'Seattle, WA, USA',
      lastActive: 'Active now',
      isCurrent: true,
      isTrusted: true
    }
  ]}
/>`,
      },
    ],
  },
  scrollProgress: {
    title: "Scroll Progress",
    description:
      "Animated scroll progress bar and floating circular reading gauge with scroll-to-top interaction.",
    installation: `import { ScrollProgress } from 'patiya';`,
    props: [
      {
        name: "variant",
        type: "'bar' | 'circle'",
        default: "'bar'",
        description:
          "Visual style: top/bottom progress bar or floating circular progress indicator.",
      },
      {
        name: "containerRef",
        type: "React.RefObject<HTMLElement | null>",
        default: "-",
        description:
          "Optional reference to a scrollable container element instead of the browser window.",
      },
      {
        name: "color",
        type: "string",
        default: "'var(--patiya-color-primary)'",
        description:
          "Custom fill color or gradient for the progress bar or circle stroke.",
      },
      {
        name: "height",
        type: "number | string",
        default: "3",
        description:
          "Thickness of the progress bar in pixels or CSS units (only applies to variant='bar').",
      },
      {
        name: "position",
        type: "'top' | 'bottom'",
        default: "'top'",
        description: "Position of the progress bar relative to the container.",
      },
      {
        name: "showPercentage",
        type: "boolean",
        default: "true",
        description:
          "Displays current scroll percentage label inside the circular gauge.",
      },
      {
        name: "smooth",
        type: "boolean",
        default: "true",
        description: "Enables smooth CSS transition on progress values.",
      },
      {
        name: "onClick",
        type: "(event: React.MouseEvent<HTMLDivElement>) => void",
        default: "-",
        description:
          "Click handler (automatically scrolls container or window to top for circle variant).",
      },
    ],
    examples: [
      {
        title: "Container Scroll Tracking",
        preview: <ScrollProgressContainerPreview />,
        code: `import { useRef } from 'react';
import { ScrollProgress } from 'patiya';

export default function ContainerDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-lg border rounded-xl overflow-hidden shadow-sm">
      <ScrollProgress containerRef={containerRef} height={4} />
      <div ref={containerRef} className="h-44 overflow-y-auto p-4 space-y-3">
        <p className="font-semibold">Scroll down to track reading progress...</p>
        <p>Micro-interactions provide visual confirmation of state changes.</p>
        <p>ScrollProgress binds effortlessly to any target via containerRef.</p>
      </div>
    </div>
  );
}`,
      },
      {
        title: "Circular Reading Gauge with Scroll-To-Top",
        preview: <ScrollProgressCirclePreview />,
        code: `import { useRef } from 'react';
import { ScrollProgress } from 'patiya';

export default function CircleGaugeDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full max-w-lg border rounded-xl overflow-hidden shadow-sm">
      <div ref={containerRef} className="h-48 overflow-y-auto p-4 space-y-3">
        <p className="font-semibold">Executive Summary</p>
        <p>Scroll down through this document to see the circular gauge fill up.</p>
        <p>Click the gauge at any time to smoothly scroll back to top.</p>
      </div>
      <div className="absolute bottom-4 right-4">
        <ScrollProgress variant="circle" containerRef={containerRef} />
      </div>
    </div>
  );
}`,
      },
      {
        title: "Window Scroll Bar",
        preview: (
          <Box className="p-6 border border-[var(--patiya-color-border)] rounded-xl bg-[var(--patiya-color-muted)]/10 text-center space-y-3">
            <p className="text-sm font-semibold text-[var(--patiya-color-foreground)]">
              Fixed Global Window Progress Bar
            </p>
            <p className="text-xs text-[var(--patiya-color-muted-foreground)] max-w-sm mx-auto">
              Mounts to the top or bottom edge of the viewport to display
              article reading progression across the whole page.
            </p>
            <Badge variant="outline" size="sm">
              position="top" | position="bottom"
            </Badge>
          </Box>
        ),
        code: `import { ScrollProgress } from 'patiya';

export default function WindowScrollDemo() {
  return (
    <ScrollProgress
      position="top"
      height={3}
      color="linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)"
    />
  );
}`,
      },
      {
        title: "Custom Accent Gradient",
        preview: (
          <Box className="w-full max-w-md border border-[var(--patiya-color-border)] rounded-lg p-5 bg-[var(--patiya-color-card)] space-y-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-t-lg" />
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
              Custom Gradient Bar
            </span>
            <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
              Specify any CSS gradient or solid color value via the{" "}
              <code>color</code> prop.
            </p>
          </Box>
        ),
        code: `<ScrollProgress
  height={6}
  color="linear-gradient(90deg, #8b5cf6, #ec4899)"
  containerRef={containerRef}
/>`,
      },
    ],
  },
  "scroll-progress": {
    get title() {
      return "Scroll Progress";
    },
    get description() {
      return "Animated scroll progress bar and floating circular reading gauge with scroll-to-top interaction.";
    },
    get installation() {
      return `import { ScrollProgress } from 'patiya';`;
    },
    get props() {
      return (componentsRegistry as any).scrollProgress.props;
    },
    get examples() {
      return (componentsRegistry as any).scrollProgress.examples;
    },
  },
  browserMockup: {
    title: "Browser Mockup",
    description:
      "Realistic window frame with macOS traffic lights, address bar, multi-tab support, and terminal mode.",
    installation: `import { BrowserMockup } from 'patiya';`,
    props: [
      {
        name: "variant",
        type: "'browser' | 'terminal' | 'window'",
        default: "'browser'",
        description:
          "Visual appearance: full browser with address bar, developer terminal, or clean window.",
      },
      {
        name: "url",
        type: "string",
        default: "'https://patiya-ui.vercel.app'",
        description: "URL displayed in the browser address bar.",
      },
      {
        name: "title",
        type: "string",
        default: "-",
        description: "Header title displayed in terminal and window modes.",
      },
      {
        name: "tabs",
        type: "BrowserMockupTab[]",
        default: "-",
        description:
          "Array of tab objects ({ id, title, icon }) rendered in the header bar.",
      },
      {
        name: "activeTab",
        type: "string",
        default: "-",
        description: "Controlled currently active tab ID.",
      },
      {
        name: "defaultActiveTab",
        type: "string",
        default: "-",
        description: "Uncontrolled initial active tab ID.",
      },
      {
        name: "onTabChange",
        type: "(tabId: string) => void",
        default: "-",
        description: "Callback fired when a tab is clicked.",
      },
      {
        name: "showControls",
        type: "boolean",
        default: "true",
        description:
          "Toggles macOS traffic light buttons (close, minimize, maximize).",
      },
      {
        name: "copyable",
        type: "boolean",
        default: "true",
        description:
          "Shows a quick copy action button for the address bar URL or title.",
      },
      {
        name: "onClose",
        type: "() => void",
        default: "-",
        description:
          "Callback fired when the close traffic light button is clicked.",
      },
      {
        name: "onMinimize",
        type: "() => void",
        default: "-",
        description:
          "Callback fired when the minimize traffic light button is clicked.",
      },
      {
        name: "onMaximize",
        type: "() => void",
        default: "-",
        description:
          "Callback fired when the maximize traffic light button is clicked.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        default: "-",
        description: "Content rendered within the mockup viewport.",
      },
    ],
    examples: [
      {
        title: "Interactive Multi-Tab Window",
        preview: <BrowserMockupInteractivePreview />,
        code: `import { useState } from 'react';
import { BrowserMockup, Badge, Box } from 'patiya';

export default function InteractiveMockupDemo() {
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <BrowserMockup
      url="https://patiya-ui.dev/dashboard"
      tabs={[
        { id: 'preview', title: 'Live Preview' },
        { id: 'analytics', title: 'Analytics' },
        { id: 'settings', title: 'Config' },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      className="w-full max-w-xl shadow-lg"
    >
      {activeTab === 'preview' && (
        <div className="p-6 space-y-4">
          <Badge variant="soft" color="primary" size="sm">v2.4 Production</Badge>
          <h3 className="text-base font-bold mt-1.5">Design System Dashboard</h3>
          <p className="text-xs text-muted-foreground">Real-time metrics and component telemetry.</p>
        </div>
      )}
    </BrowserMockup>
  );
}`,
      },
      {
        title: "Clean Browser with Address Bar",
        preview: (
          <BrowserMockup
            url="https://patiya-ui.dev/components/button"
            className="w-full max-w-lg shadow-md"
          >
            <Box className="p-6 text-center space-y-3 bg-[var(--patiya-color-card)]">
              <Badge variant="soft" color="primary">
                Component Showcase
              </Badge>
              <h4 className="text-lg font-bold text-[var(--patiya-color-foreground)]">
                Interactive Documentation
              </h4>
              <p className="text-xs text-[var(--patiya-color-muted-foreground)] max-w-sm mx-auto">
                Showcase your live product features, SaaS marketing landing
                pages, and component sandboxes inside authentic browser frames.
              </p>
              <Box className="flex justify-center gap-2 pt-2">
                <Button size="sm">Get Started</Button>
                <Button variant="outline" size="sm">
                  Documentation
                </Button>
              </Box>
            </Box>
          </BrowserMockup>
        ),
        code: `import { BrowserMockup, Button, Badge } from 'patiya';

export default function BrowserPreview() {
  return (
    <BrowserMockup url="https://patiya-ui.dev/components/button" className="max-w-lg shadow-md">
      <div className="p-6 text-center space-y-3">
        <Badge variant="soft" color="primary">Component Showcase</Badge>
        <h4 className="text-lg font-bold">Interactive Documentation</h4>
        <p className="text-xs text-muted-foreground">
          Showcase your live product features inside authentic browser frames.
        </p>
        <div className="flex justify-center gap-2 pt-2">
          <Button size="sm">Get Started</Button>
          <Button variant="outline" size="sm">Documentation</Button>
        </div>
      </div>
    </BrowserMockup>
  );
}`,
      },
      {
        title: "Developer Terminal Frame",
        preview: (
          <BrowserMockup
            variant="terminal"
            title="zsh — ~/workspace/patiya-ui"
            className="w-full max-w-lg shadow-xl"
          >
            <Box className="p-4 font-mono text-xs space-y-2 bg-[#0c1017] text-[#e6edf3]">
              <Box className="flex items-center gap-2 text-emerald-400">
                <span>➜</span>
                <span className="text-sky-400">patiya-ui</span>
                <span className="text-neutral-400">git:(main)</span>
                <span className="text-emerald-400">bun run build</span>
              </Box>
              <p className="text-neutral-400">$ vite build --mode production</p>
              <p className="text-emerald-400">✓ 84 modules transformed.</p>
              <p className="text-neutral-400">
                dist/index.js 48.2 kB │ gzip: 12.8 kB
              </p>
              <p className="text-emerald-400">✓ Built in 248ms.</p>
            </Box>
          </BrowserMockup>
        ),
        code: `import { BrowserMockup } from 'patiya';

export default function TerminalMockupDemo() {
  return (
    <BrowserMockup
      variant="terminal"
      title="zsh — ~/workspace/patiya-ui"
      className="w-full max-w-lg shadow-xl"
    >
      <div className="p-4 font-mono text-xs space-y-2 bg-[#0c1017] text-[#e6edf3]">
        <div className="flex items-center gap-2 text-emerald-400">
          <span>➜</span>
          <span className="text-sky-400">patiya-ui</span>
          <span className="text-neutral-400">git:(main)</span>
          <span className="text-emerald-400">bun run build</span>
        </div>
        <p className="text-neutral-400">$ vite build --mode production</p>
        <p className="text-emerald-400">✓ 84 modules transformed.</p>
        <p className="text-neutral-400">dist/index.js 48.2 kB │ gzip: 12.8 kB</p>
        <p className="text-emerald-400">✓ Built in 248ms.</p>
      </div>
    </BrowserMockup>
  );
}`,
      },
      {
        title: "Standard Application Window",
        preview: (
          <BrowserMockup
            variant="window"
            title="Inspector — AppConfig.json"
            className="w-full max-w-lg shadow-md"
          >
            <Box className="p-5 space-y-3 bg-[var(--patiya-color-card)]">
              <Box className="flex items-center justify-between pb-2 border-b border-[var(--patiya-color-border)]">
                <span className="text-xs font-semibold text-[var(--patiya-color-foreground)]">
                  System Properties
                </span>
                <Badge size="sm" variant="outline">
                  JSON
                </Badge>
              </Box>
              <pre className="text-xs font-mono text-[var(--patiya-color-muted-foreground)] overflow-x-auto">
                {`{
  "theme": "adaptive",
  "gpuAcceleration": true,
  "telemetry": false
}`}
              </pre>
            </Box>
          </BrowserMockup>
        ),
        code: `import { BrowserMockup, Badge } from 'patiya';

export default function WindowMockupDemo() {
  return (
    <BrowserMockup
      variant="window"
      title="Inspector — AppConfig.json"
      className="w-full max-w-lg shadow-md"
    >
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="text-xs font-semibold">System Properties</span>
          <Badge size="sm" variant="outline">JSON</Badge>
        </div>
        <pre className="text-xs font-mono text-muted-foreground">
          {JSON.stringify({ theme: "adaptive", gpuAcceleration: true }, null, 2)}
        </pre>
      </div>
    </BrowserMockup>
  );
}`,
      },
    ],
  },
  "browser-mockup": {
    get title() {
      return "Browser Mockup";
    },
    get description() {
      return "Realistic window frame with macOS traffic lights, address bar, multi-tab support, and terminal mode.";
    },
    get installation() {
      return `import { BrowserMockup } from 'patiya';`;
    },
    get props() {
      return (componentsRegistry as any).browserMockup.props;
    },
    get examples() {
      return (componentsRegistry as any).browserMockup.examples;
    },
  },
  bentoGrid: {
    title: "Bento Grid",
    description:
      "Modern responsive grid system with variable span cards, header slots, glowing outlines, and fluid layouts.",
    installation: `import { BentoGrid, BentoGridItem } from 'patiya';`,
    props: [
      {
        name: "columns",
        type: "2 | 3 | 4",
        default: "3",
        description: "Number of columns for desktop layouts.",
      },
      {
        name: "className",
        type: "string",
        default: "-",
        description: "Additional CSS classes for the grid container.",
      },
      {
        name: "title",
        type: "ReactNode",
        default: "-",
        description: "Title of the bento item.",
      },
      {
        name: "description",
        type: "ReactNode",
        default: "-",
        description: "Description of the bento item.",
      },
      {
        name: "header",
        type: "ReactNode",
        default: "-",
        description: "Visual header element or media slot.",
      },
      {
        name: "icon",
        type: "ReactNode",
        default: "-",
        description: "Icon node positioned above the title.",
      },
      {
        name: "glow",
        type: "boolean",
        default: "false",
        description: "Enables glowing gradient accent on hover.",
      },
    ],
    examples: [
      {
        title: "Adaptive Feature Bento",
        preview: (
          <BentoGrid className="w-full max-w-4xl auto-rows-[16rem]">
            <BentoGridItem
              className="md:col-span-2"
              title="Real-Time Analytics Core"
              description="Monitor performance metrics, render timings, and FPS across multiple GPU threads with sub-millisecond precision."
              glow
              badge={
                <Badge size="sm" variant="soft" color="primary">
                  Active
                </Badge>
              }
              icon={
                <svg
                  className="w-4 h-4 text-[var(--patiya-color-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              }
              header={
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--patiya-color-primary)]/10 via-[var(--patiya-color-background)] to-[var(--patiya-color-card)] p-4">
                  <div className="flex items-center gap-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] px-4 py-2 text-xs font-mono shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>60 FPS • 0.8ms Render</span>
                  </div>
                </div>
              }
            />
            <BentoGridItem
              className="md:col-span-1"
              title="Vault Security"
              description="Hardware-isolated token encryption and passkey sessions."
              glow
              badge={
                <Badge size="sm" variant="outline">
                  Encrypted
                </Badge>
              }
              icon={
                <svg
                  className="w-4 h-4 text-[var(--patiya-color-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              }
              header={
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-[var(--patiya-color-background)] to-[var(--patiya-color-primary)]/10 p-3">
                  <div className="text-center font-mono text-xs text-[var(--patiya-color-muted-foreground)]">
                    AES-256 GCM
                  </div>
                </div>
              }
            />
            <BentoGridItem
              className="md:col-span-1"
              title="Global Edge Nodes"
              description="Low latency delivery across 34 edge points of presence."
              icon={
                <svg
                  className="w-4 h-4 text-[var(--patiya-color-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                  />
                </svg>
              }
              header={
                <div className="flex h-full w-full items-center justify-center bg-[var(--patiya-color-card)]/50 p-4">
                  <span className="font-mono text-2xl font-bold tracking-tight text-[var(--patiya-color-primary)]">
                    34 PoPs
                  </span>
                </div>
              }
            />
            <BentoGridItem
              className="md:col-span-2"
              title="Adaptive Motion Engine"
              description="Zero layout shifts with fluid spring physics and automatic user reduced-motion adherence."
              glow
              badge={
                <Badge size="sm" variant="soft" color="success">
                  Verified
                </Badge>
              }
              icon={
                <svg
                  className="w-4 h-4 text-[var(--patiya-color-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              }
              header={
                <div className="flex h-full w-full items-center justify-around bg-gradient-to-r from-[var(--patiya-color-card)] via-[var(--patiya-color-primary)]/5 to-[var(--patiya-color-card)] p-4">
                  <div className="h-10 w-24 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-center text-[10px] font-mono">
                    stiffness: 300
                  </div>
                  <div className="h-10 w-24 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] flex items-center justify-center text-[10px] font-mono">
                    damping: 24
                  </div>
                </div>
              }
            />
          </BentoGrid>
        ),
        code: `import { BentoGrid, BentoGridItem, Badge } from 'patiya';

export default function BentoShowcase() {
  return (
    <BentoGrid className="w-full max-w-4xl auto-rows-[16rem]">
      <BentoGridItem
        className="md:col-span-2"
        title="Real-Time Analytics Core"
        description="Monitor performance metrics and render timings across multiple threads."
        glow
        badge={<Badge size="sm" variant="soft" color="primary">Active</Badge>}
      />
      <BentoGridItem
        className="md:col-span-1"
        title="Vault Security"
        description="Hardware-isolated token encryption and passkey sessions."
        glow
      />
      <BentoGridItem
        className="md:col-span-1"
        title="Global Edge Nodes"
        description="Low latency delivery across 34 edge points of presence."
      />
      <BentoGridItem
        className="md:col-span-2"
        title="Adaptive Motion Engine"
        description="Zero layout shifts with fluid spring physics."
        glow
      />
    </BentoGrid>
  );
}`,
      },
    ],
  },
  "bento-grid": {
    get title() {
      return "Bento Grid";
    },
    get description() {
      return "Modern responsive grid system with variable span cards, header slots, glowing outlines, and fluid layouts.";
    },
    get installation() {
      return `import { BentoGrid, BentoGridItem } from 'patiya';`;
    },
    get props() {
      return (componentsRegistry as any).bentoGrid.props;
    },
    get examples() {
      return (componentsRegistry as any).bentoGrid.examples;
    },
  },
  glassSurface: {
    title: "Glass Surface",
    description:
      "Refined glassmorphic container with backdrop blur, specular top highlight, and adaptive opacity.",
    installation: `import { GlassSurface } from 'patiya';`,
    props: [
      {
        name: "blur",
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: "Backdrop blur intensity level.",
      },
      {
        name: "intensity",
        type: "'subtle' | 'medium' | 'strong'",
        default: "'medium'",
        description: "Background opacity and surface presence.",
      },
      {
        name: "borderGlow",
        type: "boolean",
        default: "true",
        description: "Renders top specular reflection highlight border.",
      },
      {
        name: "className",
        type: "string",
        default: "-",
        description: "Additional CSS classes for styling.",
      },
    ],
    examples: [
      {
        title: "Glassmorphic Cards Deck",
        preview: (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl p-6 bg-gradient-to-br from-[var(--patiya-color-primary)]/15 via-[var(--patiya-color-background)] to-[var(--patiya-color-primary)]/5 rounded-3xl border border-[var(--patiya-color-border)]">
            <GlassSurface
              intensity="subtle"
              blur="sm"
              className="p-5 flex flex-col justify-between min-h-[160px]"
            >
              <div className="flex items-center justify-between">
                <Badge size="sm" variant="outline">
                  Subtle
                </Badge>
                <StatusDot status="online" size="sm" />
              </div>
              <div>
                <div className="font-semibold text-sm">Light Glass</div>
                <div className="text-xs text-[var(--patiya-color-muted-foreground)]">
                  40% frosted density
                </div>
              </div>
            </GlassSurface>
            <GlassSurface
              intensity="medium"
              blur="md"
              className="p-5 flex flex-col justify-between min-h-[160px]"
            >
              <div className="flex items-center justify-between">
                <Badge size="sm" variant="soft" color="primary">
                  Medium
                </Badge>
                <StatusDot status="online" ping size="sm" />
              </div>
              <div>
                <div className="font-semibold text-sm">Balanced Glass</div>
                <div className="text-xs text-[var(--patiya-color-muted-foreground)]">
                  60% frosted density
                </div>
              </div>
            </GlassSurface>
            <GlassSurface
              intensity="strong"
              blur="xl"
              className="p-5 flex flex-col justify-between min-h-[160px]"
            >
              <div className="flex items-center justify-between">
                <Badge size="sm" variant="solid" color="primary">
                  Strong
                </Badge>
                <StatusDot status="online" size="sm" />
              </div>
              <div>
                <div className="font-semibold text-sm">Deep Frosted</div>
                <div className="text-xs text-[var(--patiya-color-muted-foreground)]">
                  85% frosted density
                </div>
              </div>
            </GlassSurface>
          </div>
        ),
        code: `import { GlassSurface, Badge, StatusDot } from 'patiya';

export default function GlassDeck() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
      <GlassSurface intensity="subtle" blur="sm" className="p-5">
        <Badge size="sm" variant="outline">Subtle</Badge>
        <h4 className="font-semibold text-sm mt-3">Light Glass</h4>
      </GlassSurface>
      <GlassSurface intensity="medium" blur="md" className="p-5">
        <Badge size="sm" variant="soft" color="primary">Medium</Badge>
        <h4 className="font-semibold text-sm mt-3">Balanced Glass</h4>
      </GlassSurface>
      <GlassSurface intensity="strong" blur="xl" className="p-5">
        <Badge size="sm" variant="solid" color="primary">Strong</Badge>
        <h4 className="font-semibold text-sm mt-3">Deep Frosted</h4>
      </GlassSurface>
    </div>
  );
}`,
      },
    ],
  },
  "glass-surface": {
    get title() {
      return "Glass Surface";
    },
    get description() {
      return "Refined glassmorphic container with backdrop blur, specular top highlight, and adaptive opacity.";
    },
    get installation() {
      return `import { GlassSurface } from 'patiya';`;
    },
    get props() {
      return (componentsRegistry as any).glassSurface.props;
    },
    get examples() {
      return (componentsRegistry as any).glassSurface.examples;
    },
  },
  holoCard: {
    title: "Holo Card",
    description:
      "A 3D interactive holographic card featuring iridescent prismatic rainbow foil reflection, cursor-guided specular glare, and gyroscope tilt physics.",
    installation: `import { HoloCard } from 'patiya';`,
    props: [
      {
        name: "foil",
        type: "'rainbow' | 'cosmic' | 'gold' | 'neon' | 'silver'",
        default: "'rainbow'",
        description: "The holographic foil color scheme.",
      },
      {
        name: "glare",
        type: "boolean",
        default: "true",
        description: "Whether to display cursor-tracking specular glare.",
      },
      {
        name: "glareOpacity",
        type: "number",
        default: "0.5",
        description: "The maximum opacity of the specular glare reflection.",
      },
      {
        name: "maxTilt",
        type: "number",
        default: "18",
        description: "Maximum 3D tilt angle in degrees.",
      },
      {
        name: "perspective",
        type: "number",
        default: "1000",
        description: "The 3D CSS perspective distance in pixels.",
      },
      {
        name: "sparkles",
        type: "boolean",
        default: "true",
        description: "Whether to render animated micro glitter sparkles.",
      },
    ],
    examples: [
      {
        title: "Interactive Foil Preview",
        preview: (
          <div className="flex w-full items-center justify-center py-6">
            <HoloCard
              foil="rainbow"
              className="w-full max-w-sm p-6 text-center mx-auto"
            >
              <div className="flex items-center justify-between w-full">
                <Badge variant="soft" color="primary">
                  Quantum Core
                </Badge>
                <span className="font-mono text-xs text-[var(--patiya-color-muted-foreground)]">
                  0x88F2
                </span>
              </div>
              <div className="mt-8 space-y-2 text-center">
                <h3 className="text-xl font-bold tracking-tight">
                  Patiya HoloPass
                </h3>
                <p className="text-xs text-[var(--patiya-color-muted-foreground)] leading-relaxed">
                  Iridescent holographic foil with real-time cursor specular
                  reflection and gyroscope tilt.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[var(--patiya-color-border)]/50 flex items-center justify-between text-xs font-mono w-full">
                <span className="text-[var(--patiya-color-muted-foreground)]">
                  PRISM • 60FPS
                </span>
                <span className="text-[var(--patiya-color-primary)] font-semibold">
                  VERIFIED
                </span>
              </div>
            </HoloCard>
          </div>
        ),
        code: `import { HoloCard, Badge } from 'patiya';

export default function HoloCardDemo() {
  return (
    <HoloCard foil="rainbow" maxTilt={20} className="w-full max-w-sm p-6 text-center mx-auto">
      <div className="flex items-center justify-between">
        <Badge variant="soft" color="primary">Quantum Core</Badge>
        <span className="font-mono text-xs text-muted-foreground">0x88F2</span>
      </div>
      <div className="mt-8 space-y-2">
        <h3 className="text-xl font-bold tracking-tight">Patiya HoloPass</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Iridescent holographic foil with real-time cursor specular reflection.
        </p>
      </div>
      <div className="mt-8 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-mono">
        <span className="text-muted-foreground">PRISM • 60FPS</span>
        <span className="text-primary font-semibold">VERIFIED</span>
      </div>
    </HoloCard>
  );
}`,
      },
      {
        title: "Cosmic & Neon Foils",
        preview: (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl py-6">
            <HoloCard foil="cosmic" className="p-5 text-left">
              <Badge size="sm" color="secondary" variant="soft">
                Cosmic
              </Badge>
              <h4 className="font-bold text-sm mt-4">Deep Nebula Pass</h4>
              <p className="text-xs text-[var(--patiya-color-muted-foreground)] mt-1">
                Ultraviolet and deep sapphire sheen.
              </p>
            </HoloCard>
            <HoloCard foil="neon" className="p-5 text-left">
              <Badge size="sm" color="accent" variant="soft">
                Neon
              </Badge>
              <h4 className="font-bold text-sm mt-4">Cyber Grid Matrix</h4>
              <p className="text-xs text-[var(--patiya-color-muted-foreground)] mt-1">
                Cyan and magenta prismatic glare.
              </p>
            </HoloCard>
          </div>
        ),
        code: `import { HoloCard, Badge } from 'patiya';

export default function FoilShowcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <HoloCard foil="cosmic" className="p-5">
        <Badge size="sm" color="secondary" variant="soft">Cosmic</Badge>
        <h4 className="font-bold text-sm mt-4">Deep Nebula Pass</h4>
        <p className="text-xs text-muted-foreground mt-1">Ultraviolet and deep sapphire sheen.</p>
      </HoloCard>
      <HoloCard foil="neon" className="p-5">
        <Badge size="sm" color="accent" variant="soft">Neon</Badge>
        <h4 className="font-bold text-sm mt-4">Cyber Grid Matrix</h4>
        <p className="text-xs text-muted-foreground mt-1">Cyan and magenta prismatic glare.</p>
      </HoloCard>
    </div>
  );
}`,
      },
    ],
  },
  "holo-card": {
    get title() {
      return (componentsRegistry as any).holoCard.title;
    },
    get description() {
      return (componentsRegistry as any).holoCard.description;
    },
    get installation() {
      return (componentsRegistry as any).holoCard.installation;
    },
    get props() {
      return (componentsRegistry as any).holoCard.props;
    },
    get examples() {
      return (componentsRegistry as any).holoCard.examples;
    },
  },
  voiceVisualizer: {
    title: "Voice Visualizer",
    description:
      "Real-time animated audio waveform and frequency spectrum visualizer designed for AI voice interfaces with wave, bars, and orb modes.",
    installation: `import { VoiceVisualizer } from 'patiya';`,
    props: [
      {
        name: "mode",
        type: "'wave' | 'bars' | 'orb'",
        default: "'wave'",
        description:
          "Visualizer style: flowing continuous wave, frequency spectrum bars, or glowing pulsing orb.",
      },
      {
        name: "state",
        type: "'idle' | 'listening' | 'thinking' | 'speaking'",
        default: "'speaking'",
        description:
          "Active voice AI lifecycle state adjusting waveform amplitude and frequency.",
      },
      {
        name: "theme",
        type: "'primary' | 'neon' | 'aurora' | 'sunset' | 'monochrome'",
        default: "'primary'",
        description: "Visualizer colorway theme.",
      },
      {
        name: "height",
        type: "number",
        default: "140",
        description: "Height of the canvas visualizer container in pixels.",
      },
      {
        name: "barCount",
        type: "number",
        default: "36",
        description: "Number of frequency spectrum bars when in 'bars' mode.",
      },
      {
        name: "interactive",
        type: "boolean",
        default: "true",
        description:
          "Whether cursor hovering dynamically modulates wave amplitude.",
      },
    ],
    examples: [
      {
        title: "Wave Ribbon Mode",
        preview: (
          <div className="w-full max-w-lg py-6 space-y-4">
            <VoiceVisualizer
              mode="wave"
              theme="neon"
              state="speaking"
              height={130}
            />
          </div>
        ),
        code: `import { VoiceVisualizer } from 'patiya';

export default function VoiceWaveDemo() {
  return (
    <VoiceVisualizer
      mode="wave"
      theme="neon"
      state="speaking"
      height={130}
      interactive={true}
    />
  );
}`,
      },
      {
        title: "Bars & Orb Modes",
        preview: (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl py-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--patiya-color-muted-foreground)]">
                FREQUENCY BARS
              </span>
              <VoiceVisualizer
                mode="bars"
                theme="aurora"
                state="speaking"
                height={130}
              />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--patiya-color-muted-foreground)]">
                VOICE ORB
              </span>
              <VoiceVisualizer
                mode="orb"
                theme="sunset"
                state="listening"
                height={130}
              />
            </div>
          </div>
        ),
        code: `import { VoiceVisualizer } from 'patiya';

export default function AudioModesDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <VoiceVisualizer mode="bars" theme="aurora" state="speaking" height={130} />
      <VoiceVisualizer mode="orb" theme="sunset" state="listening" height={130} />
    </div>
  );
}`,
      },
    ],
  },
  "voice-visualizer": {
    get title() {
      return (componentsRegistry as any).voiceVisualizer.title;
    },
    get description() {
      return (componentsRegistry as any).voiceVisualizer.description;
    },
    get installation() {
      return (componentsRegistry as any).voiceVisualizer.installation;
    },
    get props() {
      return (componentsRegistry as any).voiceVisualizer.props;
    },
    get examples() {
      return (componentsRegistry as any).voiceVisualizer.examples;
    },
  },
  pricingTable: {
    title: "Pricing Table",
    description:
      "High-converting SaaS pricing tables with animated monthly/yearly billing toggles, feature comparison, and highlight cards.",
    installation:
      "import { PricingTable, PricingCard, BillingToggle } from 'patiya';",
    props: [
      {
        name: "columns",
        type: "2 | 3 | 4",
        default: "3",
        description: "Number of grid columns across responsive viewports.",
      },
      {
        name: "popular",
        type: "boolean",
        default: "false",
        description:
          "Elevates the card with primary accent border, glowing gradient, and pill badge.",
      },
    ],
    examples: [
      {
        title: "SaaS Pricing Grid",
        preview: <PricingTablePreview />,
        code: `import { useState } from 'react';
import { PricingTable, PricingCard, BillingToggle, type BillingInterval } from 'patiya';

export default function PricingDemo() {
  const [interval, setInterval] = useState<BillingInterval>('monthly');

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
      <BillingToggle interval={interval} onChange={setInterval} />
      <PricingTable columns={2} className="w-full">
        <PricingCard
          title="Pro Developer"
          description="Everything you need to ship world-class animated interfaces."
          price={interval === 'monthly' ? 29 : 24}
          period={interval === 'monthly' ? '/mo' : '/mo billed annually'}
          features={[
            'Unlimited component variants',
            'Full 60fps canvas shaders',
            'Commercial license',
            'Priority GitHub & Discord access',
          ]}
        />
        <PricingCard
          title="Enterprise Scale"
          description="Dedicated design tokens, custom motion choreography, and SLA."
          price={interval === 'monthly' ? 99 : 79}
          period={interval === 'monthly' ? '/mo' : '/mo billed annually'}
          popular
          badge="Scale Fast"
          features={[
            'Everything in Pro Developer',
            'Custom shader & WebGL pipelines',
            'Tailored motion system',
            '99.99% uptime guarantee',
          ]}
        />
      </PricingTable>
    </div>
  );
}`,
      },
    ],
  },
  "pricing-table": {
    get title() {
      return (componentsRegistry as any).pricingTable.title;
    },
    get description() {
      return (componentsRegistry as any).pricingTable.description;
    },
    get installation() {
      return (componentsRegistry as any).pricingTable.installation;
    },
    get props() {
      return (componentsRegistry as any).pricingTable.props;
    },
    get examples() {
      return (componentsRegistry as any).pricingTable.examples;
    },
  },
  usageMeter: {
    title: "Usage Meter",
    description:
      "Real-time resource quota and billing consumption meter with warning thresholds and color transitions.",
    installation: "import { UsageMeter } from 'patiya';",
    props: [
      {
        name: "label",
        type: "string",
        default: "-",
        description: "Name of the resource or API quota being measured.",
      },
      {
        name: "used",
        type: "number",
        default: "-",
        description: "Current consumed amount.",
      },
      {
        name: "limit",
        type: "number",
        default: "-",
        description: "Maximum allowable threshold before rate limiting.",
      },
      {
        name: "unit",
        type: "string",
        default: "''",
        description: "Unit designation (e.g. MB, reqs, credits).",
      },
    ],
    examples: [
      {
        title: "API Quota & Storage Gauges",
        preview: <UsageMeterPreview />,
        code: `import { UsageMeter } from 'patiya';

export default function UsageMeterDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
      <UsageMeter label="Monthly API Compute" used={7840} limit={10000} unit="reqs" />
      <UsageMeter label="Vector Storage" used={920} limit={1000} unit="MB" dangerThreshold={90} />
    </div>
  );
}`,
      },
    ],
  },
  "usage-meter": {
    get title() {
      return (componentsRegistry as any).usageMeter.title;
    },
    get description() {
      return (componentsRegistry as any).usageMeter.description;
    },
    get installation() {
      return (componentsRegistry as any).usageMeter.installation;
    },
    get props() {
      return (componentsRegistry as any).usageMeter.props;
    },
    get examples() {
      return (componentsRegistry as any).usageMeter.examples;
    },
  },
  matrixRain: {
    title: "Matrix Rain",
    description:
      "High-performance 60fps canvas digital code rain with glowing phosphorescent trails, multi-color palettes, and interactive cursor ripple perturbation.",
    installation: "import { MatrixRain } from 'patiya';",
    props: [
      {
        name: "color",
        type: "'matrix' | 'cyber' | 'amethyst' | 'amber'",
        default: "'matrix'",
        description:
          "Color palette theme for head glyphs and trailing phosphor decay.",
      },
      {
        name: "charset",
        type: "'matrix' | 'katakana' | 'binary' | 'alphanumeric'",
        default: "'matrix'",
        description: "Character set stream source.",
      },
      {
        name: "speed",
        type: "number",
        default: "1",
        description: "Stream descent velocity multiplier.",
      },
      {
        name: "interactive",
        type: "boolean",
        default: "true",
        description: "Whether mouse proximity illuminates and repels glyphs.",
      },
    ],
    examples: [
      {
        title: "Matrix Neural Stream",
        preview: <MatrixRainPreview />,
        code: `import { MatrixRain, Badge } from 'patiya';

export default function MatrixRainDemo() {
  return (
    <div className="w-full max-w-2xl h-[320px] rounded-2xl overflow-hidden border border-border">
      <MatrixRain color="matrix" charset="matrix" speed={1.1} fontSize={15}>
        <div className="bg-black/60 backdrop-blur-md border border-green-500/30 rounded-xl p-6 text-center max-w-xs">
          <Badge variant="soft" color="success" size="sm">TERMINAL • ACTIVE</Badge>
          <h4 className="text-white font-mono font-bold text-lg mt-3">Patiya Neural Stream</h4>
          <p className="text-green-400/80 font-mono text-xs mt-1">60FPS Canvas Matrix Rain</p>
        </div>
      </MatrixRain>
    </div>
  );
}`,
      },
    ],
  },
  "matrix-rain": {
    get title() {
      return (componentsRegistry as any).matrixRain.title;
    },
    get description() {
      return (componentsRegistry as any).matrixRain.description;
    },
    get installation() {
      return (componentsRegistry as any).matrixRain.installation;
    },
    get props() {
      return (componentsRegistry as any).matrixRain.props;
    },
    get examples() {
      return (componentsRegistry as any).matrixRain.examples;
    },
  },
  textHoverEffect: {
    title: "Text Hover Effect",
    description:
      "Interactive radial mask reveal on SVG text outlines following cursor coordinates in real-time.",
    installation: "import { TextHoverEffect } from 'patiya';",
    props: [
      {
        name: "text",
        type: "string",
        default: "-",
        description: "The text string to render with interactive stroke mask.",
      },
      {
        name: "color",
        type: "PatiyaColor | string",
        default: "'primary'",
        description: "Text stroke and illuminated fill color.",
      },
      {
        name: "duration",
        type: "number",
        default: "0.3",
        description: "CSS transition opacity duration in seconds.",
      },
    ],
    examples: [
      {
        title: "Cursor-Guided Luminous Reveal",
        preview: <TextHoverEffectPreview />,
        code: `import { TextHoverEffect } from 'patiya';

export default function TextHoverDemo() {
  return (
    <div className="flex items-center justify-center w-full max-w-2xl h-[200px] bg-card/70 dark:bg-[#0a0a0f] rounded-2xl border border-border p-4 mx-auto shadow-lg overflow-hidden">
      <TextHoverEffect text="PATIYA" />
    </div>
  );
}`,
      },
    ],
  },
  "text-hover-effect": {
    get title() {
      return (componentsRegistry as any).textHoverEffect.title;
    },
    get description() {
      return (componentsRegistry as any).textHoverEffect.description;
    },
    get installation() {
      return (componentsRegistry as any).textHoverEffect.installation;
    },
    get props() {
      return (componentsRegistry as any).textHoverEffect.props;
    },
    get examples() {
      return (componentsRegistry as any).textHoverEffect.examples;
    },
  },
  animatedTooltip: {
    title: "Animated Tooltip",
    description:
      "Dynamic overlapping avatar stack with interactive kinetic tilt cards revealing team members, contributors, and user profiles.",
    installation: "import { AnimatedTooltip, type TooltipItem } from 'patiya';",
    props: [
      {
        name: "items",
        type: "TooltipItem[]",
        default: "[]",
        description:
          "Array of tooltip items containing id, name, designation, badge, and image.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: "Avatar circle diameter and font sizing.",
      },
      {
        name: "overlap",
        type: "boolean",
        default: "true",
        description:
          "Whether avatars overlap in a dense stack expanding on hover.",
      },
    ],
    examples: [
      {
        title: "Team & Contributor Stack",
        preview: <AnimatedTooltipPreview />,
        code: `import { AnimatedTooltip } from 'patiya';

const team = [
  {
    id: 1,
    name: 'Sophia Martinez',
    designation: 'Principal Motion Architect',
    badge: 'Core',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 2,
    name: 'Marcus Vance',
    designation: 'Founding GPU Engineer',
    badge: 'WebGL',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 3,
    name: 'Aria Chen',
    designation: 'AI Interaction Specialist',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
];

export default function TooltipDemo() {
  return (
    <div className="flex justify-center py-6">
      <AnimatedTooltip items={team} size="md" />
    </div>
  );
}`,
      },
    ],
  },
  "animated-tooltip": {
    get title() {
      return (componentsRegistry as any).animatedTooltip.title;
    },
    get description() {
      return (componentsRegistry as any).animatedTooltip.description;
    },
    get installation() {
      return (componentsRegistry as any).animatedTooltip.installation;
    },
    get props() {
      return (componentsRegistry as any).animatedTooltip.props;
    },
    get examples() {
      return (componentsRegistry as any).animatedTooltip.examples;
    },
  },
  featureComparison: {
    title: "Feature Comparison",
    description:
      "Comprehensive SaaS tier comparison matrix with categorised features, boolean checks, custom values, and highlighted recommended plans.",
    installation: "import { FeatureComparison } from 'patiya';",
    props: [
      {
        name: "plans",
        type: "FeatureComparisonPlan[]",
        default: "[]",
        description:
          "Array of subscription tiers with name, badge, and highlighted state.",
      },
      {
        name: "features",
        type: "FeatureComparisonItem[]",
        default: "[]",
        description:
          "Grouped feature rows mapping plan IDs to booleans, numbers, or descriptive text.",
      },
    ],
    examples: [
      {
        title: "Tier Matrix Comparison",
        preview: <FeatureComparisonPreview />,
        code: `import { FeatureComparison } from 'patiya';

const plans = [
  { id: 'starter', name: 'Starter' },
  { id: 'pro', name: 'Professional', highlighted: true, badge: 'Most Popular' },
  { id: 'enterprise', name: 'Enterprise' },
];

const features = [
  {
    category: 'Core Engine',
    name: 'Active 60fps Shaders',
    values: { starter: '3 Shaders', pro: 'Unlimited', enterprise: 'Unlimited' },
  },
  {
    category: 'Core Engine',
    name: 'WebGL Hardware Acceleration',
    values: { starter: true, pro: true, enterprise: true },
  },
  {
    category: 'Architecture',
    name: 'Custom Motion Tokens',
    values: { starter: false, pro: true, enterprise: true },
  },
  {
    category: 'Architecture',
    name: 'Dedicated Engineering SLA',
    values: { starter: false, pro: false, enterprise: '15-minute response' },
  },
];

export default function ComparisonDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <FeatureComparison plans={plans} features={features} />
    </div>
  );
}`,
      },
    ],
  },
  "feature-comparison": {
    get title() {
      return (componentsRegistry as any).featureComparison.title;
    },
    get description() {
      return (componentsRegistry as any).featureComparison.description;
    },
    get installation() {
      return (componentsRegistry as any).featureComparison.installation;
    },
    get props() {
      return (componentsRegistry as any).featureComparison.props;
    },
    get examples() {
      return (componentsRegistry as any).featureComparison.examples;
    },
  },
};

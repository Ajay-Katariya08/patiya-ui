import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

export type OrderMilestone = {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  location?: string;
  completed: boolean;
  current?: boolean;
};

export type OrderStatus =
  | 'placed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type OrderTrackerProps = React.HTMLAttributes<HTMLDivElement> & {
  orderNumber: string;
  estimatedDelivery?: string;
  status?: OrderStatus;
  carrier?: string;
  trackingNumber?: string;
  milestones?: OrderMilestone[];
  shippingAddress?: string;
  itemsCount?: number;
  onCopyTracking?: (tracking: string) => void;
  onViewDetails?: () => void;
};

const defaultMilestones: OrderMilestone[] = [
  {
    id: '1',
    title: 'Order Confirmed',
    description: 'Payment authorized and verified',
    timestamp: 'Oct 24, 10:15 AM',
    location: 'Austin, TX',
    completed: true,
  },
  {
    id: '2',
    title: 'Shipped from Hub',
    description: 'Package scanned at sorting center',
    timestamp: 'Oct 25, 02:40 PM',
    location: 'Dallas Regional Hub',
    completed: true,
  },
  {
    id: '3',
    title: 'Out for Delivery',
    description: 'Courier loaded package onto vehicle',
    timestamp: 'Today, 08:30 AM',
    location: 'Local Delivery Facility',
    completed: true,
    current: true,
  },
  {
    id: '4',
    title: 'Delivered',
    description: 'Package left at front door',
    timestamp: 'Estimated 2:00 PM',
    location: 'Destination',
    completed: false,
  },
];

export const OrderTracker = React.forwardRef<HTMLDivElement, OrderTrackerProps>(
  (
    {
      orderNumber,
      estimatedDelivery = 'Today by 2:00 PM',
      status = 'out_for_delivery',
      carrier = 'FedEx Express',
      trackingNumber = 'FX-9842109482',
      milestones = defaultMilestones,
      shippingAddress = '742 Evergreen Terrace, Springfield, OR',
      itemsCount = 3,
      onCopyTracking,
      onViewDetails,
      className,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      if (trackingNumber) {
        navigator.clipboard?.writeText(trackingNumber);
        setCopied(true);
        onCopyTracking?.(trackingNumber);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    const statusBadgeMap: Record<OrderStatus, { label: string; color: 'primary' | 'success' | 'warning' | 'destructive' | 'info' | 'muted' }> = {
      placed: { label: 'Order Placed', color: 'info' },
      processing: { label: 'Processing', color: 'warning' },
      shipped: { label: 'Shipped', color: 'primary' },
      out_for_delivery: { label: 'Out for Delivery', color: 'accent' as any },
      delivered: { label: 'Delivered', color: 'success' },
      cancelled: { label: 'Cancelled', color: 'destructive' },
    };

    const currentBadge = statusBadgeMap[status] || statusBadgeMap.out_for_delivery;

    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-xl mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-6 shadow-xs space-y-6',
          className
        )}
        {...props}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--patiya-color-border)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-[var(--patiya-color-muted-foreground)]">
                ORDER #{orderNumber}
              </span>
              <Badge variant="soft" color={currentBadge.color} size="sm">
                {currentBadge.label}
              </Badge>
            </div>
            <h3 className="font-bold text-lg text-[var(--patiya-color-foreground)] mt-0.5">
              {estimatedDelivery}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)] hover:bg-[var(--patiya-color-muted)]/80 text-xs font-mono font-medium text-[var(--patiya-color-foreground)] transition-colors cursor-pointer"
            >
              <span>{trackingNumber}</span>
              <svg className="w-3.5 h-3.5 text-[var(--patiya-color-muted-foreground)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {copied ? (
                  <polyline points="20 6 9 17 4 12" />
                ) : (
                  <>
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className="relative pt-2">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-3 left-4 right-4 h-1 bg-[var(--patiya-color-muted)] -z-0">
              <div
                className="h-full bg-[var(--patiya-color-primary)] transition-all duration-500 rounded-full"
                style={{
                  width: `${
                    (milestones.filter((m) => m.completed).length /
                      Math.max(1, milestones.length - 1)) *
                    100
                  }%`,
                }}
              />
            </div>
            {milestones.map((m, idx) => {
              return (
                <div key={m.id} className="flex flex-col items-center relative z-10">
                  <div
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all',
                      m.completed
                        ? 'border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)] text-white'
                        : 'border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] text-[var(--patiya-color-muted-foreground)]',
                      m.current &&
                        'ring-4 ring-[var(--patiya-color-primary)]/20 animate-pulse'
                    )}
                  >
                    {m.completed ? (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-[var(--patiya-color-foreground)] mt-2 text-center max-w-[80px] truncate">
                    {m.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-[var(--patiya-color-muted-foreground)] block">
              Carrier & Destination
            </span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[var(--patiya-color-foreground)]">
                {carrier}
              </span>
              <span>•</span>
              <span className="text-[var(--patiya-color-foreground)] truncate max-w-[240px]">
                {shippingAddress}
              </span>
            </div>
          </div>
          {onViewDetails && (
            <Button size="sm" variant="outline" onClick={onViewDetails}>
              View Receipt ({itemsCount} items)
            </Button>
          )}
        </div>
      </div>
    );
  }
);
OrderTracker.displayName = 'OrderTracker';

export type OrderTrackerMilestoneProps = React.HTMLAttributes<HTMLDivElement> & {
  milestones: OrderMilestone[];
};

export const OrderTrackerMilestone = React.forwardRef<HTMLDivElement, OrderTrackerMilestoneProps>(
  ({ milestones = defaultMilestones, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-xl mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-6 shadow-xs space-y-6',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--patiya-color-border)]">
          <div>
            <h4 className="font-bold text-base text-[var(--patiya-color-foreground)]">
              Tracking History
            </h4>
            <p className="text-xs text-[var(--patiya-color-muted-foreground)] mt-0.5">
              Live scan checkpoints and facility scans
            </p>
          </div>
          <Badge variant="soft" color="primary" size="sm">
            {milestones.filter((m) => m.completed).length} of {milestones.length} Completed
          </Badge>
        </div>

        <div className="space-y-0">
          {milestones.map((m, idx) => {
            const isLast = idx === milestones.length - 1;
            const isCurrent = m.current || (!m.completed && milestones[idx - 1]?.completed);

            return (
              <div key={m.id} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  {m.completed ? (
                    <div className="w-5 h-5 rounded-full bg-[var(--patiya-color-primary)] text-white flex items-center justify-center shadow-2xs shrink-0 z-10 transition-transform group-hover:scale-105">
                      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  ) : isCurrent ? (
                    <div className="relative flex items-center justify-center w-5 h-5 shrink-0 z-10">
                      <span className="absolute -inset-0.5 rounded-full bg-[var(--patiya-color-primary)]/25 animate-ping" />
                      <div className="w-5 h-5 rounded-full border-2 border-[var(--patiya-color-primary)] bg-[var(--patiya-color-card)] flex items-center justify-center shadow-2xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--patiya-color-primary)]" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-dashed border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/60 text-[var(--patiya-color-muted-foreground)] flex items-center justify-center text-[10px] font-mono font-medium shrink-0 z-10">
                      {idx + 1}
                    </div>
                  )}

                  {!isLast && (
                    <div
                      className={cn(
                        'w-0.5 flex-1 min-h-[30px] my-1 transition-colors',
                        m.completed ? 'bg-[var(--patiya-color-primary)]' : 'bg-[var(--patiya-color-border)]'
                      )}
                    />
                  )}
                </div>

                <div
                  className={cn(
                    'flex-1 pb-6 transition-all',
                    isCurrent && 'p-3.5 -mt-1 rounded-2xl bg-[var(--patiya-color-muted)]/50 border border-[var(--patiya-color-primary)]/30 shadow-xs mb-3'
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <h5
                        className={cn(
                          'text-sm font-semibold',
                          m.completed || isCurrent
                            ? 'text-[var(--patiya-color-foreground)]'
                            : 'text-[var(--patiya-color-muted-foreground)]'
                        )}
                      >
                        {m.title}
                      </h5>
                      {isCurrent && (
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)] border border-[var(--patiya-color-primary)]/20">
                          Current Stage
                        </span>
                      )}
                    </div>
                    {m.timestamp && (
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--patiya-color-muted-foreground)] shrink-0">
                        <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{m.timestamp}</span>
                      </div>
                    )}
                  </div>

                  {m.description && (
                    <p className="text-xs text-[var(--patiya-color-muted-foreground)] mt-1 leading-relaxed">
                      {m.description}
                    </p>
                  )}

                  {m.location && (
                    <div className="inline-flex items-center gap-1.5 mt-2.5 px-2.5 py-1 rounded-lg bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)]/60 text-xs text-[var(--patiya-color-foreground)] font-medium">
                      <svg className="w-3.5 h-3.5 text-[var(--patiya-color-primary)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{m.location}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
OrderTrackerMilestone.displayName = 'OrderTrackerMilestone';

export type OrderTrackerDeliveryDriverProps = React.HTMLAttributes<HTMLDivElement> & {
  driverName?: string;
  driverPhone?: string;
  vehicle?: string;
  plateNumber?: string;
  rating?: number;
  eta?: string;
  avatar?: string;
  onCall?: () => void;
  onMessage?: () => void;
};

export const OrderTrackerDeliveryDriver = React.forwardRef<HTMLDivElement, OrderTrackerDeliveryDriverProps>(
  (
    {
      driverName = 'Alex Mercer',
      vehicle = 'White Transit Van',
      plateNumber = 'TX 942-BKL',
      rating = 4.9,
      eta = '8 mins away',
      avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      onCall,
      onMessage,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-sm mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-5 shadow-xs space-y-4',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-[var(--patiya-color-muted-foreground)] uppercase">
            Delivery Courier
          </span>
          <Badge variant="soft" color="success" size="sm">
            {eta}
          </Badge>
        </div>
        <div className="flex items-center gap-3.5">
          <img
            src={avatar}
            alt={driverName}
            className="w-13 h-13 rounded-2xl object-cover border border-[var(--patiya-color-border)] shadow-xs"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-[var(--patiya-color-foreground)] truncate">
                {driverName}
              </h4>
              <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                <svg className="w-3.5 h-3.5 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {rating}
              </span>
            </div>
            <p className="text-xs text-[var(--patiya-color-muted-foreground)] truncate mt-0.5">
              {vehicle}
            </p>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] border border-[var(--patiya-color-border)] mt-1 inline-block">
              {plateNumber}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button size="sm" variant="outline" fullWidth onClick={onCall} className="gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Call</span>
          </Button>
          <Button size="sm" variant="solid" color="primary" fullWidth onClick={onMessage} className="gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Message</span>
          </Button>
        </div>
      </div>
    );
  }
);
OrderTrackerDeliveryDriver.displayName = 'OrderTrackerDeliveryDriver';

export type OrderTrackerMapProps = React.HTMLAttributes<HTMLDivElement> & {
  destination?: string;
  currentStop?: string;
  eta?: string;
  stopsRemaining?: number;
};

export const OrderTrackerMap = React.forwardRef<HTMLDivElement, OrderTrackerMapProps>(
  (
    {
      destination = '452 Elm Street',
      currentStop = 'Main St & 4th Ave',
      eta = '14 min',
      stopsRemaining = 2,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-md mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] overflow-hidden shadow-xs relative',
          className
        )}
        {...props}
      >
        <div className="relative h-48 w-full bg-[#1e293b] overflow-hidden flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" fill="none">
            <path
              d="M 60 150 Q 150 40 240 100 T 340 50"
              stroke="rgba(99, 102, 241, 0.4)"
              strokeWidth="4"
              strokeDasharray="6 6"
            />
            <path
              d="M 60 150 Q 150 40 220 95"
              stroke="#6366f1"
              strokeWidth="4"
            />
          </svg>

          <div className="absolute left-12 bottom-8 flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-md" />
            <span className="text-[10px] font-mono font-bold text-white mt-1 bg-black/60 px-1.5 py-0.5 rounded">Hub</span>
          </div>

          <div className="absolute left-[52%] top-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 animate-bounce">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                <path d="M15 18H9" />
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                <circle cx="17" cy="18.5" r="2.5" />
                <circle cx="7" cy="18.5" r="2.5" />
              </svg>
            </div>
            <span className="text-[10px] font-mono font-bold text-white mt-1 bg-indigo-900/90 px-2 py-0.5 rounded border border-indigo-400">
              {eta}
            </span>
          </div>

          <div className="absolute right-12 top-8 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-md flex items-center justify-center text-white">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-[10px] font-mono font-bold text-white mt-1 bg-black/60 px-1.5 py-0.5 rounded">Home</span>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--patiya-color-foreground)]">
              {stopsRemaining} stops before yours
            </span>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              Arriving in {eta}
            </span>
          </div>
          <p className="text-xs text-[var(--patiya-color-muted-foreground)] truncate">
            Near {currentStop} → Delivering to {destination}
          </p>
        </div>
      </div>
    );
  }
);
OrderTrackerMap.displayName = 'OrderTrackerMap';

export type OrderTrackerReturnProps = React.HTMLAttributes<HTMLDivElement> & {
  rmaNumber?: string;
  refundAmount?: number | string;
  dropoffDeadline?: string;
  barcode?: string;
  onDownloadLabel?: () => void;
};

export const OrderTrackerReturn = React.forwardRef<HTMLDivElement, OrderTrackerReturnProps>(
  (
    {
      rmaNumber = 'RMA-8492041',
      refundAmount = 149.0,
      dropoffDeadline = 'Nov 5, 2026',
      barcode,
      onDownloadLabel,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-sm mx-auto rounded-3xl border border-dashed border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-5 shadow-xs space-y-4 text-center',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-[var(--patiya-color-border)] pb-3">
          <div className="text-left">
            <span className="text-[11px] font-mono text-[var(--patiya-color-muted-foreground)] block">
              RETURN AUTHORIZATION
            </span>
            <h4 className="font-bold text-sm text-[var(--patiya-color-foreground)]">
              {rmaNumber}
            </h4>
          </div>
          <Badge variant="soft" color="warning" size="sm">
            Pending Drop-off
          </Badge>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)]/50 space-y-1">
          <span className="text-xs text-[var(--patiya-color-muted-foreground)] block">
            Estimated Refund
          </span>
          <span className="text-2xl font-extrabold text-[var(--patiya-color-foreground)]">
            ${typeof refundAmount === 'number' ? refundAmount.toFixed(2) : refundAmount}
          </span>
          <span className="text-[11px] text-[var(--patiya-color-muted-foreground)] block pt-1">
            Drop off by {dropoffDeadline}
          </span>
        </div>

        <div className="py-2 flex flex-col items-center">
          <svg className="h-10 w-48 text-[var(--patiya-color-foreground)] opacity-85" viewBox="0 0 200 40" fill="currentColor">
            <rect x="0" y="0" width="3" height="40" />
            <rect x="5" y="0" width="2" height="40" />
            <rect x="10" y="0" width="4" height="40" />
            <rect x="18" y="0" width="2" height="40" />
            <rect x="23" y="0" width="5" height="40" />
            <rect x="31" y="0" width="2" height="40" />
            <rect x="36" y="0" width="3" height="40" />
            <rect x="42" y="0" width="6" height="40" />
            <rect x="52" y="0" width="2" height="40" />
            <rect x="57" y="0" width="4" height="40" />
            <rect x="64" y="0" width="2" height="40" />
            <rect x="69" y="0" width="5" height="40" />
            <rect x="77" y="0" width="3" height="40" />
            <rect x="83" y="0" width="2" height="40" />
            <rect x="88" y="0" width="6" height="40" />
            <rect x="97" y="0" width="3" height="40" />
            <rect x="103" y="0" width="2" height="40" />
            <rect x="108" y="0" width="5" height="40" />
            <rect x="116" y="0" width="3" height="40" />
            <rect x="122" y="0" width="4" height="40" />
            <rect x="129" y="0" width="2" height="40" />
            <rect x="134" y="0" width="6" height="40" />
            <rect x="143" y="0" width="2" height="40" />
            <rect x="148" y="0" width="4" height="40" />
            <rect x="155" y="0" width="3" height="40" />
            <rect x="161" y="0" width="5" height="40" />
            <rect x="169" y="0" width="2" height="40" />
            <rect x="174" y="0" width="4" height="40" />
            <rect x="181" y="0" width="2" height="40" />
            <rect x="186" y="0" width="5" height="40" />
            <rect x="194" y="0" width="3" height="40" />
          </svg>
          <span className="text-[11px] font-mono text-[var(--patiya-color-muted-foreground)] mt-1.5">
            Scan at UPS or FedEx Drop Box
          </span>
        </div>

        <Button fullWidth variant="solid" color="primary" size="md" onClick={onDownloadLabel}>
          Download Return Label (PDF)
        </Button>
      </div>
    );
  }
);
OrderTrackerReturn.displayName = 'OrderTrackerReturn';

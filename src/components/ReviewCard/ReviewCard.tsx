import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Avatar } from '../Avatar/Avatar';
import { Badge } from '../Badge/Badge';
import { Rating } from '../Rating/Rating';

export type ReviewCardProps = React.HTMLAttributes<HTMLDivElement> & {
  author: string;
  avatar?: string;
  avatarInitials?: string;
  location?: string;
  date?: string;
  rating?: number;
  verified?: boolean;
  verifiedText?: string;
  title?: string;
  content: string;
  productVariant?: string;
  initialHelpfulCount?: number;
  onHelpfulToggle?: (voted: boolean) => void;
};

export const ReviewCard = React.forwardRef<HTMLDivElement, ReviewCardProps>(
  (
    {
      author,
      avatar,
      avatarInitials,
      location,
      date,
      rating = 5,
      verified = true,
      verifiedText = 'Verified Buyer',
      title,
      content,
      productVariant,
      initialHelpfulCount = 0,
      onHelpfulToggle,
      className,
      ...props
    },
    ref
  ) => {
    const [helpfulCount, setHelpfulCount] = useState(initialHelpfulCount);
    const [voted, setVoted] = useState(false);

    const handleVote = () => {
      const nextVoted = !voted;
      setVoted(nextVoted);
      setHelpfulCount((c) => (nextVoted ? c + 1 : c - 1));
      onHelpfulToggle?.(nextVoted);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-xl mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-6 shadow-xs space-y-4',
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar
              alt={author}
              initials={avatarInitials}
              size="md"
              src={avatar}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-[var(--patiya-color-foreground)]">
                  {author}
                </span>
                {verified && (
                  <Badge variant="soft" color="success" size="sm">
                    {verifiedText}
                  </Badge>
                )}
              </div>
              {(location || date) && (
                <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                  {[location, date].filter(Boolean).join(' • ')}
                </span>
              )}
            </div>
          </div>
          <Rating value={rating} max={5} size="sm" readOnly />
        </div>

        <div className="space-y-2">
          {title && (
            <h4 className="font-semibold text-base text-[var(--patiya-color-foreground)]">
              {title}
            </h4>
          )}
          <p className="text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed">
            {content}
          </p>
        </div>

        {(productVariant || initialHelpfulCount !== undefined) && (
          <div className="flex items-center justify-between pt-2 border-t border-[var(--patiya-color-border)] text-xs">
            {productVariant ? (
              <span className="text-[var(--patiya-color-muted-foreground)]">
                {productVariant}
              </span>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={handleVote}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer',
                voted
                  ? 'bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] border-[var(--patiya-color-primary)]'
                  : 'border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/60 text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]'
              )}
            >
              <span>Helpful</span>
              <span className="font-semibold font-mono">({helpfulCount})</span>
            </button>
          </div>
        )}
      </div>
    );
  }
);
ReviewCard.displayName = 'ReviewCard';

export type ReviewCardGalleryProps = React.HTMLAttributes<HTMLDivElement> & {
  author: string;
  avatar?: string;
  avatarInitials?: string;
  location?: string;
  rating?: number;
  content: string;
  photos: (string | React.ReactNode)[];
  onPhotoClick?: (index: number) => void;
};

export const ReviewCardGallery = React.forwardRef<HTMLDivElement, ReviewCardGalleryProps>(
  (
    {
      author,
      avatar,
      avatarInitials,
      location,
      rating = 5,
      content,
      photos = [],
      onPhotoClick,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-xl mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-6 space-y-4 shadow-xs',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar alt={author} initials={avatarInitials} size="md" src={avatar} />
            <div>
              <h5 className="font-semibold text-sm text-[var(--patiya-color-foreground)]">
                {author}
              </h5>
              {location && (
                <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                  {location}
                </span>
              )}
            </div>
          </div>
          <Rating value={rating} max={5} size="sm" readOnly />
        </div>
        <p className="text-sm text-[var(--patiya-color-muted-foreground)]">
          {content}
        </p>
        {photos.length > 0 && (
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {photos.map((photo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onPhotoClick?.(idx)}
                className="w-20 h-20 rounded-xl bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)] flex items-center justify-center text-xs font-mono text-[var(--patiya-color-muted-foreground)] overflow-hidden shrink-0 hover:scale-105 transition-transform cursor-pointer"
              >
                {typeof photo === 'string' ? (
                  photo.startsWith('/') || photo.startsWith('http') ? (
                    <img src={photo} alt={`Review photo ${idx + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    photo
                  )
                ) : (
                  photo
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
ReviewCardGallery.displayName = 'ReviewCardGallery';

export type ReviewFactor = {
  label: string;
  score: string | number;
  pct: string;
};

export type ReviewCardBreakdownProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  author: string;
  date?: string;
  rating?: number;
  factors: ReviewFactor[];
};

export const ReviewCardBreakdown = React.forwardRef<HTMLDivElement, ReviewCardBreakdownProps>(
  (
    {
      title = 'Audio Engineer Review',
      author,
      date = '1 week ago',
      rating = 5,
      factors = [],
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-xl mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-6 space-y-4 shadow-xs',
          className
        )}
        {...props}
      >
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold text-sm text-[var(--patiya-color-foreground)]">
              {title}
            </h4>
            <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
              By {author} • {date}
            </span>
          </div>
          <Rating value={rating} max={5} size="sm" readOnly />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)]/60">
          {factors.map((f) => (
            <div key={f.label} className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-[var(--patiya-color-muted-foreground)]">
                  {f.label}
                </span>
                <span className="text-[var(--patiya-color-foreground)] font-bold">
                  {f.score}
                </span>
              </div>
              <div className="h-1.5 w-full bg-[var(--patiya-color-border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: f.pct }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
ReviewCardBreakdown.displayName = 'ReviewCardBreakdown';

export type ReviewCustomerData = {
  name: string;
  rating?: number;
  comment: string;
};

export type ReviewReplyData = {
  author: string;
  badge?: string;
  text: string;
};

export type ReviewCardReplyProps = React.HTMLAttributes<HTMLDivElement> & {
  customer: ReviewCustomerData;
  reply: ReviewReplyData;
};

export const ReviewCardReply = React.forwardRef<HTMLDivElement, ReviewCardReplyProps>(
  ({ customer, reply, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-xl mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-6 space-y-4 shadow-xs',
          className
        )}
        {...props}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar alt={customer.name} size="sm" />
            <span className="font-semibold text-sm text-[var(--patiya-color-foreground)]">
              {customer.name}
            </span>
          </div>
          {customer.rating !== undefined && (
            <Rating value={customer.rating} max={5} size="sm" readOnly />
          )}
        </div>
        <p className="text-sm text-[var(--patiya-color-muted-foreground)]">
          {customer.comment}
        </p>
        <div className="ml-6 p-4 rounded-2xl bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)]/50 border-l-2 border-l-[var(--patiya-color-primary)] space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[var(--patiya-color-foreground)]">
              {reply.author}
            </span>
            <Badge variant="solid" color="primary" size="sm">
              {reply.badge || 'Official'}
            </Badge>
          </div>
          <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
            {reply.text}
          </p>
        </div>
      </div>
    );
  }
);
ReviewCardReply.displayName = 'ReviewCardReply';

export type ReviewCardCompactProps = React.HTMLAttributes<HTMLDivElement> & {
  quote: string;
  author: string;
  role?: string;
  rating?: number;
  avatar?: string;
};

export const ReviewCardCompact = React.forwardRef<HTMLDivElement, ReviewCardCompactProps>(
  ({ quote, author, role, rating = 5, avatar, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-md mx-auto p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-3 shadow-xs',
          className
        )}
        {...props}
      >
        <Rating value={rating} max={5} size="sm" readOnly />
        <p className="text-sm font-medium text-[var(--patiya-color-foreground)] italic">
          "{quote}"
        </p>
        <div className="flex items-center gap-2.5 pt-1">
          <Avatar alt={author} size="sm" src={avatar} />
          <div>
            <h6 className="text-xs font-bold text-[var(--patiya-color-foreground)]">
              {author}
            </h6>
            {role && (
              <span className="text-[11px] text-[var(--patiya-color-muted-foreground)]">
                {role}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);
ReviewCardCompact.displayName = 'ReviewCardCompact';

export type ReviewStarDistribution = {
  stars: number;
  pct: number;
  count: number;
};

export type ReviewCardSummaryProps = React.HTMLAttributes<HTMLDivElement> & {
  overallScore: number;
  totalReviews: number;
  distribution: ReviewStarDistribution[];
};

export const ReviewCardSummary = React.forwardRef<HTMLDivElement, ReviewCardSummaryProps>(
  ({ overallScore, totalReviews, distribution = [], className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-xl mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-6 shadow-xs flex flex-col sm:flex-row items-center gap-8',
          className
        )}
        {...props}
      >
        <div className="text-center sm:text-left shrink-0">
          <div className="text-5xl font-extrabold text-[var(--patiya-color-foreground)]">
            {overallScore}
          </div>
          <div className="pt-1">
            <Rating value={overallScore} max={5} size="sm" readOnly />
          </div>
          <span className="text-xs text-[var(--patiya-color-muted-foreground)] mt-1 block">
            Based on {totalReviews} reviews
          </span>
        </div>
        <div className="w-full flex-1 space-y-2">
          {distribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-3 text-xs">
              <span className="w-8 font-medium text-[var(--patiya-color-muted-foreground)] text-right">
                {d.stars}★
              </span>
              <div className="flex-1 h-2 rounded-full bg-[var(--patiya-color-muted)] overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${d.pct}%` }}
                />
              </div>
              <span className="w-8 text-[var(--patiya-color-muted-foreground)] text-right font-mono">
                {d.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
ReviewCardSummary.displayName = 'ReviewCardSummary';

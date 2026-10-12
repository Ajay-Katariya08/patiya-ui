import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Box } from '../Layout/Box';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

export type SessionDeviceType = 'desktop' | 'mobile' | 'tablet' | 'terminal' | 'other';

export type SessionPlatform = 'mac' | 'windows' | 'linux' | 'ios' | 'android' | 'unknown';

export type SessionBrowser = 'chrome' | 'safari' | 'firefox' | 'edge' | 'brave' | 'opera' | 'unknown';

export type SessionItem = {
  id: string;
  deviceName: string;
  deviceType?: SessionDeviceType;
  platform?: SessionPlatform;
  browser?: SessionBrowser;
  ipAddress: string;
  location?: string;
  lastActive: string;
  isCurrent?: boolean;
  isTrusted?: boolean;
  isSuspicious?: boolean;
};

export type ActiveSessionsProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  sessions?: SessionItem[];
  onRevoke?: (sessionId: string) => void;
  onRevokeAllOthers?: () => void;
  allowRevokeAll?: boolean;
  showFilters?: boolean;
};

const defaultSessions: SessionItem[] = [
  {
    id: 'sess-1',
    deviceName: 'MacBook Pro 16" (M3 Max)',
    deviceType: 'desktop',
    platform: 'mac',
    browser: 'chrome',
    ipAddress: '192.0.2.45',
    location: 'San Francisco, CA, USA',
    lastActive: 'Active now',
    isCurrent: true,
    isTrusted: true,
  },
  {
    id: 'sess-2',
    deviceName: 'iPhone 15 Pro',
    deviceType: 'mobile',
    platform: 'ios',
    browser: 'safari',
    ipAddress: '198.51.100.12',
    location: 'San Jose, CA, USA',
    lastActive: '25 minutes ago',
    isTrusted: true,
  },
  {
    id: 'sess-3',
    deviceName: 'Dell XPS 15 (Workstation)',
    deviceType: 'desktop',
    platform: 'windows',
    browser: 'edge',
    ipAddress: '203.0.113.89',
    location: 'New York, NY, USA',
    lastActive: '2 days ago',
    isTrusted: false,
  },
  {
    id: 'sess-4',
    deviceName: 'Ubuntu 24.04 LTS Dev Container',
    deviceType: 'terminal',
    platform: 'linux',
    browser: 'firefox',
    ipAddress: '198.18.0.7',
    location: 'Frankfurt, Germany',
    lastActive: '5 days ago',
    isSuspicious: true,
  },
];

export const ActiveSessions = React.forwardRef<HTMLDivElement, ActiveSessionsProps>(
  (
    {
      title = 'Active Sessions & Devices',
      description = 'Review all devices currently authenticated to your account and revoke unfamiliar sessions.',
      sessions = defaultSessions,
      onRevoke,
      onRevokeAllOthers,
      allowRevokeAll = true,
      showFilters = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [sessionList, setSessionList] = useState<SessionItem[]>(sessions);
    const [revokingId, setRevokingId] = useState<string | null>(null);
    const [confirmRevokeAll, setConfirmRevokeAll] = useState(false);
    const [filter, setFilter] = useState<'all' | 'current' | 'others'>('all');

    const otherSessionsCount = sessionList.filter((s) => !s.isCurrent).length;
    const suspiciousSession = sessionList.find((s) => s.isSuspicious);

    const filteredSessions = sessionList.filter((s) => {
      if (filter === 'current') return s.isCurrent;
      if (filter === 'others') return !s.isCurrent;
      return true;
    });

    const handleConfirmRevoke = (id: string) => {
      setSessionList((prev) => prev.filter((s) => s.id !== id));
      setRevokingId(null);
      onRevoke?.(id);
    };

    const handleConfirmRevokeAllOthers = () => {
      setSessionList((prev) => prev.filter((s) => s.isCurrent));
      setConfirmRevokeAll(false);
      onRevokeAllOthers?.();
    };

    const renderPlatformIcon = (platform?: SessionPlatform, deviceType?: SessionDeviceType) => {
      if (platform === 'mac' || platform === 'ios') {
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-1 .04-2.18.67-2.88 1.48-.56.64-1.06 1.7-0.93 2.74 1.13.09 2.27-.58 2.89-1.35z" />
          </svg>
        );
      }
      if (platform === 'windows') {
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.801" />
          </svg>
        );
      }
      if (platform === 'linux' || deviceType === 'terminal') {
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        );
      }
      if (deviceType === 'mobile') {
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
            <path d="M12 18h.01" />
          </svg>
        );
      }
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    };

    return (
      <Box
        ref={ref}
        style={{
          borderColor: 'var(--patiya-color-border)',
          backgroundColor: 'var(--patiya-color-card)',
          color: 'var(--patiya-color-card-foreground)',
          ...style,
        }}
        className={cn(
          'w-full max-w-2xl rounded-2xl border p-6 shadow-sm transition-all',
          className
        )}
        {...props}
      >
        <Box
          style={{ borderColor: 'var(--patiya-color-border)' }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b"
        >
          <Box className="space-y-1">
            <Box className="flex items-center gap-2.5">
              <h3 className="text-lg font-semibold tracking-tight text-[var(--patiya-color-card-foreground)]">
                {title}
              </h3>
              <Badge variant="soft" color="primary" size="sm" className="font-medium text-xs">
                {sessionList.length} Active
              </Badge>
            </Box>
            <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
              {description}
            </p>
          </Box>

          {allowRevokeAll && otherSessionsCount > 0 && (
            <Box className="shrink-0">
              {confirmRevokeAll ? (
                <Box className="flex items-center gap-2">
                  <Button
                    size="sm"
                    color="destructive"
                    variant="solid"
                    onClick={handleConfirmRevokeAllOthers}
                  >
                    Confirm Sign Out All
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setConfirmRevokeAll(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Button
                  size="sm"
                  color="destructive"
                  variant="outline"
                  onClick={() => setConfirmRevokeAll(true)}
                  leftIcon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  }
                >
                  Sign Out Other Devices ({otherSessionsCount})
                </Button>
              )}
            </Box>
          )}
        </Box>

        {suspiciousSession && (
          <Box
            style={{
              borderColor: 'color-mix(in srgb, var(--patiya-color-destructive) 35%, transparent)',
              backgroundColor: 'color-mix(in srgb, var(--patiya-color-destructive) 8%, transparent)',
            }}
            className="my-4 rounded-xl border p-3.5 flex items-start sm:items-center justify-between gap-3"
          >
            <Box className="flex items-start gap-3 min-w-0">
              <span
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--patiya-color-destructive) 18%, transparent)',
                  color: 'var(--patiya-color-destructive)',
                }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </span>
              <Box className="space-y-0.5 min-w-0">
                <p className="text-xs font-semibold text-[var(--patiya-color-destructive)]">
                  Unrecognized Login Detected
                </p>
                <p className="text-[11px] text-[var(--patiya-color-muted-foreground)]">
                  Session from {suspiciousSession.location || suspiciousSession.ipAddress} was flagged as untrusted.
                </p>
              </Box>
            </Box>
            <Button
              size="xs"
              color="destructive"
              variant="solid"
              onClick={() => handleConfirmRevoke(suspiciousSession.id)}
              className="shrink-0"
            >
              Revoke Now
            </Button>
          </Box>
        )}

        {showFilters && (
          <Box className="pt-4 pb-4">
            <Box
              style={{
                borderColor: 'var(--patiya-color-border)',
                backgroundColor: 'var(--patiya-color-muted)',
              }}
              className="inline-flex items-center p-1 rounded-xl border"
            >
              <button
                type="button"
                onClick={() => setFilter('all')}
                style={
                  filter === 'all'
                    ? {
                        backgroundColor: 'var(--patiya-color-card)',
                        color: 'var(--patiya-color-foreground)',
                      }
                    : { color: 'var(--patiya-color-muted-foreground)' }
                }
                className={cn(
                  'px-3 py-1 text-xs rounded-lg font-medium transition-all',
                  filter === 'all' && 'shadow-xs'
                )}
              >
                All ({sessionList.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('current')}
                style={
                  filter === 'current'
                    ? {
                        backgroundColor: 'var(--patiya-color-card)',
                        color: 'var(--patiya-color-foreground)',
                      }
                    : { color: 'var(--patiya-color-muted-foreground)' }
                }
                className={cn(
                  'px-3 py-1 text-xs rounded-lg font-medium transition-all',
                  filter === 'current' && 'shadow-xs'
                )}
              >
                Current Device
              </button>
              <button
                type="button"
                onClick={() => setFilter('others')}
                style={
                  filter === 'others'
                    ? {
                        backgroundColor: 'var(--patiya-color-card)',
                        color: 'var(--patiya-color-foreground)',
                      }
                    : { color: 'var(--patiya-color-muted-foreground)' }
                }
                className={cn(
                  'px-3 py-1 text-xs rounded-lg font-medium transition-all',
                  filter === 'others' && 'shadow-xs'
                )}
              >
                Other Devices ({otherSessionsCount})
              </button>
            </Box>
          </Box>
        )}

        <Box className="space-y-3">
          {filteredSessions.length === 0 ? (
            <Box
              style={{ borderColor: 'var(--patiya-color-border)' }}
              className="py-12 text-center space-y-2 rounded-xl border border-dashed"
            >
              <span
                style={{
                  backgroundColor: 'var(--patiya-color-muted)',
                  color: 'var(--patiya-color-muted-foreground)',
                }}
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="14" x="2" y="3" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </span>
              <p className="text-sm font-medium text-[var(--patiya-color-card-foreground)]">
                No sessions found
              </p>
              <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                There are no active devices matching the selected filter.
              </p>
            </Box>
          ) : (
            filteredSessions.map((session) => {
              const isRevoking = revokingId === session.id;

              const itemStyle = session.isCurrent
                ? {
                    borderColor: 'color-mix(in srgb, var(--patiya-color-success) 35%, transparent)',
                    backgroundColor: 'color-mix(in srgb, var(--patiya-color-success) 7%, transparent)',
                  }
                : session.isSuspicious
                ? {
                    borderColor: 'color-mix(in srgb, var(--patiya-color-destructive) 35%, transparent)',
                    backgroundColor: 'color-mix(in srgb, var(--patiya-color-destructive) 7%, transparent)',
                  }
                : {
                    borderColor: 'var(--patiya-color-border)',
                    backgroundColor: 'color-mix(in srgb, var(--patiya-color-card) 60%, transparent)',
                  };

              return (
                <Box
                  key={session.id}
                  style={itemStyle}
                  className="p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <Box className="flex items-start gap-3.5 min-w-0">
                    <span
                      style={{
                        backgroundColor: 'var(--patiya-color-muted)',
                        color: 'var(--patiya-color-foreground)',
                      }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    >
                      {renderPlatformIcon(session.platform, session.deviceType)}
                    </span>

                    <Box className="space-y-1.5 min-w-0">
                      <Box className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-[var(--patiya-color-card-foreground)] truncate">
                          {session.deviceName}
                        </span>

                        {session.isCurrent && (
                          <Badge variant="soft" color="success" size="sm" className="gap-1.5 font-semibold text-[10px]">
                            <span
                              style={{ backgroundColor: 'var(--patiya-color-success)' }}
                              className="h-1.5 w-1.5 rounded-full animate-pulse"
                            />
                            Current Session
                          </Badge>
                        )}

                        {session.isSuspicious && (
                          <Badge variant="solid" color="destructive" size="sm" className="text-[10px]">
                            Suspicious
                          </Badge>
                        )}

                        {session.isTrusted && !session.isCurrent && (
                          <Badge variant="soft" color="info" size="sm" className="text-[10px]">
                            Trusted
                          </Badge>
                        )}
                      </Box>

                      <Box className="flex items-center gap-2.5 text-xs text-[var(--patiya-color-muted-foreground)] flex-wrap">
                        {session.browser && (
                          <span className="capitalize font-medium">
                            {session.browser}
                          </span>
                        )}
                        {session.location && (
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            {session.location}
                          </span>
                        )}
                        <span
                          style={{
                            backgroundColor: 'var(--patiya-color-muted)',
                            color: 'var(--patiya-color-foreground)',
                          }}
                          className="font-mono text-[11px] px-2 py-0.5 rounded-md"
                        >
                          {session.ipAddress}
                        </span>
                        <span className="text-[11px]">
                          • {session.lastActive}
                        </span>
                      </Box>
                    </Box>
                  </Box>

                  <Box className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {session.isCurrent ? (
                      <span
                        style={{
                          backgroundColor: 'color-mix(in srgb, var(--patiya-color-success) 12%, transparent)',
                          color: 'var(--patiya-color-success)',
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg"
                      >
                        Active Device
                      </span>
                    ) : isRevoking ? (
                      <Box className="flex items-center gap-1.5">
                        <Button
                          size="xs"
                          color="destructive"
                          variant="solid"
                          onClick={() => handleConfirmRevoke(session.id)}
                        >
                          Confirm
                        </Button>
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => setRevokingId(null)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        size="xs"
                        variant="ghost"
                        color="destructive"
                        onClick={() => setRevokingId(session.id)}
                      >
                        Revoke
                      </Button>
                    )}
                  </Box>
                </Box>
              );
            })
          )}
        </Box>

        <Box
          style={{ borderColor: 'var(--patiya-color-border)' }}
          className="mt-5 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[var(--patiya-color-muted-foreground)]"
        >
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            TLS 1.3 • Device Fingerprint Verification
          </span>
          <span>Automatic logout on password reset</span>
        </Box>
      </Box>
    );
  }
);

ActiveSessions.displayName = 'ActiveSessions';

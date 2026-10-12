import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Box } from '../Layout/Box';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

export type PasskeyType = 'fingerprint' | 'face' | 'key' | 'passkey';

export type PasskeyStatus = 'idle' | 'scanning' | 'success' | 'error';

export type PasskeyCredential = {
  id: string;
  name: string;
  type: PasskeyType;
  device?: string;
  lastUsed?: string;
  created?: string;
  isDefault?: boolean;
};

export type PasskeyAuthProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  credentials?: PasskeyCredential[];
  selectedId?: string;
  onSelect?: (credential: PasskeyCredential) => void;
  onAuthenticate?: (credential: PasskeyCredential) => Promise<boolean> | boolean | void;
  onRegister?: () => void;
  onCancel?: () => void;
  status?: PasskeyStatus;
  autoScan?: boolean;
  showCredentials?: boolean;
  allowRegistration?: boolean;
};

const defaultCredentials: PasskeyCredential[] = [
  {
    id: 'passkey-1',
    name: 'MacBook Touch ID',
    type: 'fingerprint',
    device: 'Apple Silicon Mac',
    lastUsed: 'Just now',
    isDefault: true,
  },
  {
    id: 'passkey-2',
    name: 'iPhone 16 Pro Face ID',
    type: 'face',
    device: 'iOS 18',
    lastUsed: 'Yesterday',
  },
  {
    id: 'passkey-3',
    name: 'YubiKey 5C NFC',
    type: 'key',
    device: 'FIDO2 Security Key',
    lastUsed: '3 days ago',
  },
];

export const PasskeyAuth = React.forwardRef<HTMLDivElement, PasskeyAuthProps>(
  (
    {
      title = 'Passkey Authentication',
      description = 'Verify your identity instantly with biometric sensor or hardware security key.',
      credentials = defaultCredentials,
      selectedId,
      onSelect,
      onAuthenticate,
      onRegister,
      onCancel,
      status: controlledStatus,
      autoScan = false,
      showCredentials = true,
      allowRegistration = true,
      className,
      ...props
    },
    ref
  ) => {
    const [internalStatus, setInternalStatus] = useState<PasskeyStatus>('idle');
    const [activeId, setActiveId] = useState<string>(
      selectedId || credentials[0]?.id || ''
    );
    const [errorMessage, setErrorMessage] = useState<string>('');

    const status = controlledStatus !== undefined ? controlledStatus : internalStatus;
    const selectedCred = credentials.find((c) => c.id === activeId) || credentials[0];

    useEffect(() => {
      if (selectedId) {
        setActiveId(selectedId);
      }
    }, [selectedId]);

    useEffect(() => {
      if (autoScan && status === 'idle' && selectedCred) {
        handleTriggerAuth();
      }
    }, [autoScan]);

    const handleSelect = (cred: PasskeyCredential) => {
      setActiveId(cred.id);
      setErrorMessage('');
      if (status !== 'scanning') {
        setInternalStatus('idle');
      }
      onSelect?.(cred);
    };

    const handleTriggerAuth = async () => {
      if (!selectedCred || status === 'scanning') return;
      setErrorMessage('');
      setInternalStatus('scanning');

      try {
        if (onAuthenticate) {
          const res = await onAuthenticate(selectedCred);
          if (res === false) {
            setInternalStatus('error');
            setErrorMessage('Authentication rejected or cancelled');
            return;
          }
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1600));
        }
        setInternalStatus('success');
      } catch (err: any) {
        setInternalStatus('error');
        setErrorMessage(err?.message || 'Biometric verification failed');
      }
    };

    const handleReset = () => {
      setInternalStatus('idle');
      setErrorMessage('');
    };

    const renderIcon = (type: PasskeyType, size = 20) => {
      if (type === 'face') {
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            <path d="M9 9h.01M15 9h.01" />
            <path d="M10 13a2 2 0 0 0 4 0" />
            <path d="M9 17c1.5 1 4.5 1 6 0" />
          </svg>
        );
      }
      if (type === 'key') {
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="7.5" cy="15.5" r="5.5" />
            <path d="m21 2-9.6 9.6" />
            <path d="m15.5 7.5 3 3L22 7l-2-2" />
          </svg>
        );
      }
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
          <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
          <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
          <path d="M2 12a10 10 0 0 1 18-6" />
          <path d="M2 16h.01" />
          <path d="M21.8 16c.2-2 .131-5.354 0-6" />
          <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
          <path d="M8.65 22c.21-.66.45-1.32.57-2" />
          <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
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
          ...props.style,
        }}
        className={cn(
          'relative w-full max-w-md rounded-2xl border p-6 shadow-sm transition-all duration-300',
          status === 'scanning' && 'ring-2 ring-[var(--patiya-color-primary)]/20',
          status === 'success' && 'ring-2 ring-emerald-500/20',
          status === 'error' && 'ring-2 ring-rose-500/20',
          className
        )}
        {...props}
      >
        <Box
          style={{ borderColor: 'var(--patiya-color-border)' }}
          className="flex items-start justify-between gap-4 pb-5 border-b"
        >
          <Box className="space-y-1">
            <Box className="flex items-center gap-2">
              <h3 className="text-lg font-semibold tracking-tight text-[var(--patiya-color-card-foreground)]">
                {title}
              </h3>
              <Badge variant="soft" color="primary" size="sm" className="font-mono text-[10px]">
                FIDO2
              </Badge>
            </Box>
            <p className="text-xs text-[var(--patiya-color-muted-foreground)] leading-relaxed">
              {description}
            </p>
          </Box>
          <Box className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] border border-[var(--patiya-color-border)]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </Box>
        </Box>

        <Box className="flex flex-col items-center justify-center py-6 text-center">
          <Box className="relative flex items-center justify-center mb-4">
            <span
              style={{
                borderColor:
                  status === 'scanning'
                    ? 'var(--patiya-color-primary)'
                    : status === 'success'
                    ? 'var(--patiya-color-success)'
                    : status === 'error'
                    ? 'var(--patiya-color-destructive)'
                    : 'var(--patiya-color-border)',
              }}
              className={cn(
                'absolute h-28 w-28 rounded-full border border-dashed transition-all duration-700 pointer-events-none',
                status === 'idle' && 'animate-[spin_20s_linear_infinite]',
                status === 'scanning' && 'animate-[spin_4s_linear_infinite] scale-110 opacity-100',
                status === 'success' && 'scale-105 opacity-80',
                status === 'error' && 'scale-105 opacity-80'
              )}
            />
            <span
              className={cn(
                'absolute h-24 w-24 rounded-full transition-all duration-500 pointer-events-none',
                status === 'scanning' && 'bg-[var(--patiya-color-primary)]/15 animate-ping',
                status === 'success' && 'bg-emerald-500/15 scale-105',
                status === 'error' && 'bg-rose-500/15 scale-105'
              )}
            />

            <button
              type="button"
              onClick={status === 'error' ? handleReset : handleTriggerAuth}
              disabled={status === 'scanning' || status === 'success'}
              style={{
                borderColor:
                  status === 'scanning'
                    ? 'var(--patiya-color-primary)'
                    : status === 'success'
                    ? 'var(--patiya-color-success)'
                    : status === 'error'
                    ? 'var(--patiya-color-destructive)'
                    : 'var(--patiya-color-border)',
                backgroundColor:
                  status === 'scanning'
                    ? 'color-mix(in srgb, var(--patiya-color-primary) 15%, transparent)'
                    : status === 'success'
                    ? 'color-mix(in srgb, var(--patiya-color-success) 15%, transparent)'
                    : status === 'error'
                    ? 'color-mix(in srgb, var(--patiya-color-destructive) 15%, transparent)'
                    : 'var(--patiya-color-muted)',
                color:
                  status === 'scanning'
                    ? 'var(--patiya-color-primary)'
                    : status === 'success'
                    ? 'var(--patiya-color-success)'
                    : status === 'error'
                    ? 'var(--patiya-color-destructive)'
                    : 'var(--patiya-color-foreground)',
              }}
              className="relative flex h-20 w-20 items-center justify-center rounded-2xl border transition-all duration-300 focus:outline-none shadow-xs"
            >
              {status === 'scanning' && (
                <span className="absolute inset-x-2 top-0 h-0.5 bg-[var(--patiya-color-primary)] animate-[bounce_1.5s_infinite]" />
              )}

              {status === 'success' ? (
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : status === 'error' ? (
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              ) : (
                renderIcon(selectedCred?.type || 'fingerprint', 34)
              )}
            </button>
          </Box>

          <Box className="space-y-1">
            <p className="text-sm font-semibold text-[var(--patiya-color-card-foreground)]">
              {status === 'idle' && (selectedCred ? `Ready for ${selectedCred.name}` : 'Touch sensor to authenticate')}
              {status === 'scanning' && 'Verifying biometric credentials...'}
              {status === 'success' && 'Authentication Verified!'}
              {status === 'error' && (errorMessage || 'Verification failed')}
            </p>
            <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
              {status === 'idle' && 'Click the sensor or button below to scan'}
              {status === 'scanning' && 'Keep your finger or device close'}
              {status === 'success' && 'Signed in securely with WebAuthn'}
              {status === 'error' && 'Tap sensor to retry'}
            </p>
          </Box>
        </Box>

        {showCredentials && credentials.length > 0 && (
          <Box className="space-y-2 pt-2 pb-4">
            <Box className="flex items-center justify-between text-xs text-[var(--patiya-color-muted-foreground)] font-medium px-1">
              <span>Saved Passkeys</span>
              <span>{credentials.length} available</span>
            </Box>

            <Box className="space-y-2 max-h-48 overflow-y-auto pr-0.5">
              {credentials.map((cred) => {
                const isSelected = cred.id === activeId;
                return (
                  <button
                    key={cred.id}
                    type="button"
                    onClick={() => handleSelect(cred)}
                    style={{
                      borderColor: isSelected
                        ? 'var(--patiya-color-primary)'
                        : 'var(--patiya-color-border)',
                      backgroundColor: isSelected
                        ? 'color-mix(in srgb, var(--patiya-color-primary) 10%, transparent)'
                        : 'var(--patiya-color-card)',
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all text-xs"
                  >
                    <Box className="flex items-center gap-3 min-w-0">
                      <span
                        style={{
                          backgroundColor: isSelected
                            ? 'color-mix(in srgb, var(--patiya-color-primary) 18%, transparent)'
                            : 'var(--patiya-color-muted)',
                          color: isSelected
                            ? 'var(--patiya-color-primary)'
                            : 'var(--patiya-color-foreground)',
                        }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      >
                        {renderIcon(cred.type, 16)}
                      </span>
                      <Box className="truncate">
                        <p className="truncate font-medium text-[var(--patiya-color-card-foreground)]">
                          {cred.name}
                        </p>
                        {cred.device && (
                          <p className="truncate text-[10px] text-[var(--patiya-color-muted-foreground)]">
                            {cred.device}
                          </p>
                        )}
                      </Box>
                    </Box>

                    <Box className="flex items-center gap-2 shrink-0">
                      {cred.isDefault && (
                        <Badge variant="soft" color="info" size="sm" className="text-[10px] py-0 px-1.5">
                          Default
                        </Badge>
                      )}
                      {cred.lastUsed && (
                        <span className="text-[10px] text-[var(--patiya-color-muted-foreground)]">
                          {cred.lastUsed}
                        </span>
                      )}
                    </Box>
                  </button>
                );
              })}
            </Box>
          </Box>
        )}

        <Box
          style={{ borderColor: 'var(--patiya-color-border)' }}
          className="space-y-2 pt-3 border-t"
        >
          {status === 'error' ? (
            <Button
              type="button"
              color="destructive"
              variant="solid"
              fullWidth
              onClick={handleReset}
            >
              Retry Authentication
            </Button>
          ) : status === 'success' ? (
            <Button
              type="button"
              color="success"
              variant="solid"
              fullWidth
              onClick={handleReset}
            >
              Continue
            </Button>
          ) : (
            <Button
              type="button"
              color="primary"
              variant="solid"
              fullWidth
              loading={status === 'scanning'}
              onClick={handleTriggerAuth}
              leftIcon={renderIcon(selectedCred?.type || 'fingerprint', 16)}
            >
              Verify with {selectedCred?.name || 'Passkey'}
            </Button>
          )}

          <Box className="flex items-center justify-between gap-2 pt-1">
            {allowRegistration && onRegister && (
              <button
                type="button"
                onClick={onRegister}
                className="text-xs font-medium text-[var(--patiya-color-primary)] hover:underline inline-flex items-center gap-1"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5v14" />
                </svg>
                Register New Passkey
              </button>
            )}

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="ml-auto text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
              >
                Use another method
              </button>
            )}
          </Box>
        </Box>

        <Box className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-[var(--patiya-color-muted-foreground)]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>End-to-End Encrypted • Hardware Security Module</span>
        </Box>
      </Box>
    );
  }
);

PasskeyAuth.displayName = 'PasskeyAuth';

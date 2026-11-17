"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export type UseDisclosureProps = {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

export function useDisclosure({
  isOpen: isOpenProp,
  defaultIsOpen = false,
  onOpen: onOpenProp,
  onClose: onCloseProp,
}: UseDisclosureProps = {}) {
  const [isOpenState, setIsOpenState] = useState(defaultIsOpen);
  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? isOpenProp : isOpenState;

  const onOpen = useCallback(() => {
    if (!isControlled) setIsOpenState(true);
    onOpenProp?.();
  }, [isControlled, onOpenProp]);

  const onClose = useCallback(() => {
    if (!isControlled) setIsOpenState(false);
    onCloseProp?.();
  }, [isControlled, onCloseProp]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}

export type UseControllableStateProps<T> = {
  value?: T;
  defaultValue?: T | (() => T);
  onChange?: (value: T) => void;
};

export function useControllableState<T>({
  value: valueProp,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>) {
  const [uncontrolledValue, setUncontrolledValue] = useState<T>(
    defaultValue as T
  );
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolledValue;

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const setter = next as (prev: T) => T;
      const nextValue = typeof next === "function" ? setter(value) : next;

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange, value]
  );

  return [value, setValue] as const;
}

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  events = ["mousedown", "touchstart"]
) {
  const ref = useRef<T>(null);
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      savedHandler.current();
    };

    events.forEach((ev) => document.addEventListener(ev, listener));
    return () => {
      events.forEach((ev) => document.removeEventListener(ev, listener));
    };
  }, [events]);

  return ref;
}

export function useClipboard(timeout = 2000) {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = useCallback(
    (text: string) => {
      if (typeof navigator === "undefined" || !navigator.clipboard) return;
      navigator.clipboard.writeText(text).then(() => {
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), timeout);
      });
    },
    [timeout]
  );

  return { hasCopied, onCopy };
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export function useHotkeys(
  keyCombo: string,
  callback: (e: KeyboardEvent) => void
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (event: KeyboardEvent) => {
      const keys = keyCombo.toLowerCase().split("+");
      const matchMeta = keys.includes("cmd") || keys.includes("meta");
      const matchCtrl = keys.includes("ctrl");
      const matchAlt = keys.includes("alt");
      const matchShift = keys.includes("shift");
      const targetKey = keys.filter(
        (k) => !["cmd", "meta", "ctrl", "alt", "shift"].includes(k)
      )[0];

      if (matchMeta && !event.metaKey) return;
      if (matchCtrl && !event.ctrlKey) return;
      if (matchAlt && !event.altKey) return;
      if (matchShift && !event.shiftKey) return;
      if (targetKey && event.key.toLowerCase() !== targetKey) return;

      event.preventDefault();
      savedCallback.current(event);
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [keyCombo]);
}

export { useOptimisticAction, type UseOptimisticActionOptions, type UseOptimisticActionReturn, type OptimisticStatus } from "../components/OptimisticAction/OptimisticAction";

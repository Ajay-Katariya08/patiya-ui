import React, { forwardRef } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '../../utils/cn';
import { Modal } from '../Modal/Modal';

export const Command = forwardRef<React.ElementRef<typeof CommandPrimitive>, React.ComponentPropsWithoutRef<typeof CommandPrimitive>>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-xl bg-[var(--patiya-color-background)] text-[var(--patiya-color-foreground)]",
        className
      )}
      {...props}
    />
  )
);
Command.displayName = CommandPrimitive.displayName;

export const CommandDialog = ({ open, onOpenChange, children, ...props }: any) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-(--patiya-color-muted-foreground) [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5" {...props}>
        {children}
      </Command>
    </Modal>
  );
};
CommandDialog.displayName = 'CommandDialog';

export const CommandInput = forwardRef<React.ElementRef<typeof CommandPrimitive.Input>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>>(
  ({ className, ...props }, ref) => (
    <div className="flex items-center border-b border-[var(--patiya-color-border)] px-3" cmdk-input-wrapper="">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5 shrink-0 opacity-50"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-(--patiya-color-muted-foreground) disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
);
CommandInput.displayName = CommandPrimitive.Input.displayName;

export const CommandList = forwardRef<React.ElementRef<typeof CommandPrimitive.List>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.List
      ref={ref}
      className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden p-1", className)}
      {...props}
    />
  )
);
CommandList.displayName = CommandPrimitive.List.displayName;

export const CommandEmpty = forwardRef<React.ElementRef<typeof CommandPrimitive.Empty>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Empty ref={ref} className={cn("py-6 text-center text-sm", className)} {...props} />
  )
);
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

export const CommandGroup = forwardRef<React.ElementRef<typeof CommandPrimitive.Group>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      className={cn("overflow-hidden p-1 text-[var(--patiya-color-foreground)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-(--patiya-color-muted-foreground)", className)}
      {...props}
    />
  )
);
CommandGroup.displayName = CommandPrimitive.Group.displayName;

export const CommandSeparator = forwardRef<React.ElementRef<typeof CommandPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Separator ref={ref} className={cn("-mx-1 h-px bg-[var(--patiya-color-border)] my-1", className)} {...props} />
  )
);
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

export const CommandItem = forwardRef<React.ElementRef<typeof CommandPrimitive.Item>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-[var(--patiya-color-muted)] data-[selected='true']:text-[var(--patiya-color-foreground)] data-[disabled=true]:opacity-50",
        className
      )}
      {...props}
    />
  )
);
CommandItem.displayName = CommandPrimitive.Item.displayName;

export const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={cn("ml-auto text-xs tracking-widest text-(--patiya-color-muted-foreground) opacity-60", className)} {...props} />
  );
};
CommandShortcut.displayName = 'CommandShortcut';

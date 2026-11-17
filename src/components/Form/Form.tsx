import React, { createContext, useContext, useId } from "react";
import { cn } from "../../utils/cn";

export type FormFieldContextValue = {
  name?: string;
  error?: string;
};

const FormFieldContext = createContext<FormFieldContextValue>({});

export type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>({ id: "" });

export type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn("space-y-6 w-full", className)}
        {...props}
      />
    );
  }
);
Form.displayName = "Form";

export type FormFieldProps = {
  name: string;
  error?: string;
  children: React.ReactNode;
};

export const FormField = ({ name, error, children }: FormFieldProps) => {
  return (
    <FormFieldContext.Provider value={{ name, error }}>
      {children}
    </FormFieldContext.Provider>
  );
};

export type FormItemProps = React.HTMLAttributes<HTMLDivElement>;

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: fieldContext.error,
  };
};

export type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return (
      <label
        ref={ref}
        className={cn(
          "text-xs font-semibold tracking-wide select-none text-[var(--patiya-color-foreground)] transition-colors",
          error && "text-[var(--patiya-color-destructive)]",
          className
        )}
        htmlFor={formItemId}
        {...props}
      />
    );
  }
);
FormLabel.displayName = "FormLabel";

export type FormControlProps = {
  children: React.ReactElement<Record<string, unknown>>;
};

export const FormControl = ({ children }: FormControlProps) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return React.cloneElement(children, {
    id: formItemId,
    "aria-describedby": !error
      ? `${formDescriptionId}`
      : `${formDescriptionId} ${formMessageId}`,
    "aria-invalid": !!error,
  });
};

export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn(
        "text-[11px] text-[var(--patiya-color-muted-foreground)] leading-relaxed",
        className
      )}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>;

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  FormMessageProps
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error || children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      role="alert"
      className={cn(
        "text-xs font-medium text-[var(--patiya-color-destructive)] animate-in fade-in-50 duration-150",
        className
      )}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

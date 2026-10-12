import React, { forwardRef } from 'react';
import { PolymorphicComponent, PolymorphicComponentProps } from '../../utils/polymorphic';
import { cn } from '../../utils/cn';

export interface BoxOptions {
  className?: string;
}

export type BoxProps<T extends React.ElementType> = PolymorphicComponentProps<T, BoxOptions>;

type BoxComponent = PolymorphicComponent<'div', BoxOptions>;

export const Box = forwardRef(
  (
    { as, className, children, ...props }: any,
    ref: any
  ) => {
    const Component = as || 'div';
    
    return (
      <Component ref={ref} className={cn(className)} {...props}>
        {children}
      </Component>
    );
  }
) as BoxComponent;

Box.displayName = 'Box';

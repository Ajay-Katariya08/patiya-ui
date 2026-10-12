import React from 'react';

// Polymorphic utility types
export type As = React.ElementType;

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export type PolymorphicComponentProps<
  T extends As,
  Props = {}
> = React.PropsWithChildren<Props & Omit<PropsOf<T>, keyof Props | 'as'>> & {
  as?: T;
};

export type PolymorphicRef<T extends As> = React.ComponentPropsWithRef<T>['ref'];

export type PolymorphicComponent<
  DefaultType extends As,
  Props = {}
> = {
  <T extends As = DefaultType>(
    props: PolymorphicComponentProps<T, Props> & { ref?: PolymorphicRef<T> }
  ): React.ReactElement | null;
  displayName?: string;
};

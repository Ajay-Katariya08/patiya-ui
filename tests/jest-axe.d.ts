declare module "jest-axe" {
  export type AxeResults = {
    violations: Array<{
      id: string;
      impact?: string;
      description: string;
      help: string;
      helpUrl: string;
      nodes: Array<unknown>;
    }>;
  };

  export function axe(
    html: Element | string,
    options?: Record<string, unknown>,
  ): Promise<AxeResults>;

  export const toHaveNoViolations: Record<string, any>;
}

declare module "vitest" {
  interface Assertion<T = any> {
    toHaveNoViolations(): T;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Button } from "../../src/components/Button/Button";

describe("Button Accessibility & Interaction", () => {
  it("should have zero axe WCAG violations", async () => {
    const { container } = render(
      <div>
        <Button variant="solid" color="primary">Click me</Button>
        <Button variant="outline" color="secondary" disabled>Disabled</Button>
        <Button variant="ghost" color="destructive" loading>Loading</Button>
      </div>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should enforce type='button' by default", () => {
    render(<Button>Submit-safe</Button>);
    const button = screen.getByRole("button", { name: /submit-safe/i });
    expect(button).toHaveAttribute("type", "button");
  });

  it("should expose proper aria attributes when disabled or loading", () => {
    const { rerender } = render(<Button disabled>Disabled</Button>);
    const disabledBtn = screen.getByRole("button", { name: /disabled/i });
    expect(disabledBtn).toHaveAttribute("aria-disabled", "true");
    expect(disabledBtn).toBeDisabled();

    rerender(<Button loading>Loading</Button>);
    const loadingBtn = screen.getByRole("button", { name: /loading/i });
    expect(loadingBtn).toHaveAttribute("aria-busy", "true");
    expect(loadingBtn).toHaveAttribute("aria-disabled", "true");
    expect(loadingBtn).toBeDisabled();
  });

  it("should handle click events and prevent calls when disabled", () => {
    const handleClick = vi.fn();
    const { rerender } = render(<Button onClick={handleClick}>Active</Button>);
    const btn = screen.getByRole("button", { name: /active/i });

    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);

    rerender(<Button disabled onClick={handleClick}>Active</Button>);
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});


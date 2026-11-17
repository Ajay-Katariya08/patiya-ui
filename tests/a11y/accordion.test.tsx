import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../src/components/Accordion/Accordion";

describe("Accordion Accessibility & Interaction", () => {
  it("should have zero axe WCAG violations", async () => {
    const { container } = render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content for section 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content for section 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should have proper ARIA attributes", () => {
    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Panel 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Panel 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger1 = screen.getByRole("button", { name: /trigger 1/i });
    const trigger2 = screen.getByRole("button", { name: /trigger 2/i });
    const panel1 = screen.getByRole("region", { hidden: true });

    expect(trigger1).toHaveAttribute("aria-expanded", "true");
    expect(trigger2).toHaveAttribute("aria-expanded", "false");

    const controlsId = trigger1.getAttribute("aria-controls");
    expect(controlsId).toBeTruthy();
    expect(panel1).toHaveAttribute("id", controlsId);
    expect(panel1).toHaveAttribute("aria-labelledby", trigger1.id);
  });

  it("should toggle panel state on click", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Panel 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByRole("button", { name: /trigger 1/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("should navigate triggers using ArrowDown, ArrowUp, Home, End keys", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Panel 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Panel 2</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Trigger 3</AccordionTrigger>
          <AccordionContent>Panel 3</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger1 = screen.getByRole("button", { name: /trigger 1/i });
    const trigger2 = screen.getByRole("button", { name: /trigger 2/i });
    const trigger3 = screen.getByRole("button", { name: /trigger 3/i });

    trigger1.focus();
    expect(document.activeElement).toBe(trigger1);

    fireEvent.keyDown(trigger1, { key: "ArrowDown" });
    expect(document.activeElement).toBe(trigger2);

    fireEvent.keyDown(trigger2, { key: "ArrowDown" });
    expect(document.activeElement).toBe(trigger3);

    fireEvent.keyDown(trigger3, { key: "ArrowDown" });
    expect(document.activeElement).toBe(trigger1);

    fireEvent.keyDown(trigger1, { key: "ArrowUp" });
    expect(document.activeElement).toBe(trigger3);

    fireEvent.keyDown(trigger3, { key: "Home" });
    expect(document.activeElement).toBe(trigger1);

    fireEvent.keyDown(trigger1, { key: "End" });
    expect(document.activeElement).toBe(trigger3);
  });
});


import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Dock, DockItem } from "../../src/components/Dock/Dock";

describe("Dock Accessibility & Interaction", () => {
  it("should have zero axe WCAG violations", async () => {
    const { container } = render(
      <Dock direction="bottom">
        <DockItem label="Finder">Finder</DockItem>
        <DockItem label="Terminal" active>Terminal</DockItem>
      </Dock>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should render items and respond to mouse events", () => {
    const { container } = render(
      <Dock magnification={70} distance={150}>
        <DockItem label="App 1">1</DockItem>
        <DockItem label="App 2">2</DockItem>
      </Dock>,
    );

    const dock = container.querySelector(".inline-flex");
    expect(dock).toBeTruthy();

    if (dock) {
      fireEvent.mouseMove(dock, { clientX: 100 });
      fireEvent.mouseLeave(dock);
    }

    expect(screen.getByText("App 1")).toBeTruthy();
    expect(screen.getByText("App 2")).toBeTruthy();
  });

  it("should support custom direction alignments", () => {
    const { container, rerender } = render(
      <Dock direction="middle">
        <DockItem>Middle</DockItem>
      </Dock>,
    );
    expect(container.querySelector(".items-center")).toBeTruthy();

    rerender(
      <Dock direction="top">
        <DockItem>Top</DockItem>
      </Dock>,
    );
    expect(container.querySelector(".items-start")).toBeTruthy();
  });
});

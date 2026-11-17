import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../src/components/Tabs/Tabs";

describe("Tabs Accessibility & Interaction", () => {
  it("should have zero axe WCAG violations", async () => {
    const { container } = render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account Settings</TabsContent>
        <TabsContent value="password">Password Settings</TabsContent>
      </Tabs>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should have proper ARIA attributes and focus indices", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Panel 1</TabsContent>
        <TabsContent value="tab2">Panel 2</TabsContent>
      </Tabs>,
    );

    const tab1 = screen.getByRole("tab", { name: /tab 1/i });
    const tab2 = screen.getByRole("tab", { name: /tab 2/i });
    const panel1 = screen.getByRole("tabpanel", { name: /tab 1/i });

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab1).toHaveAttribute("tabindex", "0");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("tabindex", "-1");

    expect(tab1).toHaveAttribute("aria-controls", panel1.id);
    expect(panel1).toHaveAttribute("aria-labelledby", tab1.id);
  });

  it("should navigate tabs via keyboard arrows", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Panel 1</TabsContent>
        <TabsContent value="tab2">Panel 2</TabsContent>
        <TabsContent value="tab3">Panel 3</TabsContent>
      </Tabs>,
    );

    const tabList = screen.getByRole("tablist");
    const tab1 = screen.getByRole("tab", { name: /tab 1/i });
    const tab2 = screen.getByRole("tab", { name: /tab 2/i });
    const tab3 = screen.getByRole("tab", { name: /tab 3/i });

    tab1.focus();
    fireEvent.keyDown(tabList, { key: "ArrowRight" });
    expect(document.activeElement).toBe(tab2);
    expect(tab2).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(tabList, { key: "ArrowRight" });
    expect(document.activeElement).toBe(tab3);

    fireEvent.keyDown(tabList, { key: "ArrowRight" });
    expect(document.activeElement).toBe(tab1);

    fireEvent.keyDown(tabList, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(tab3);

    fireEvent.keyDown(tabList, { key: "Home" });
    expect(document.activeElement).toBe(tab1);

    fireEvent.keyDown(tabList, { key: "End" });
    expect(document.activeElement).toBe(tab3);
  });
});


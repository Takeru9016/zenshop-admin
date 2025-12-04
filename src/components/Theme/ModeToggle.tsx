"use client";

import { useTheme } from "next-themes";

import { ThemeToggleButton } from "@/components/theme/ThemeToggleButton";

export default function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <ThemeToggleButton
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      variant="circle-blur"
      start="top-right"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    />
  );
}

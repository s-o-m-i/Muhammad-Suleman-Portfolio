"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold ${className}`}
      aria-label="Toggle color theme"
    >
      <Sun className="hidden dark:block" size={16} strokeWidth={1.75} />
      <Moon className="dark:hidden" size={16} strokeWidth={1.75} />
    </button>
  );
}

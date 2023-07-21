"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { RiSunLine, RiMoonClearLine } from "react-icons/ri";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function DarkToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setIsDark(theme === "dark");
  }, [theme]);

  if (!mounted) {
    return null;
  }

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={twMerge(
        "group relative flex h-12 w-12 items-center justify-center p-2 text-white",
        "rounded-md drop-shadow-md transition-colors hover:bg-white hover:text-primary"
      )}
    >
      {isDark ? <RiMoonClearLine size={24} /> : <RiSunLine size={24} />}
    </button>
  );
}

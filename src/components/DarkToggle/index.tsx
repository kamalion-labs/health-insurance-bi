"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { RiSunLine, RiMoonClearLine } from "react-icons/ri";
import clsx from "clsx";

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
      className="group relative flex items-center justify-between p-2 text-xl"
    >
      <input
        type="checkbox"
        className="peer invisible absolute left-1/2 h-full w-full -translate-x-1/2 appearance-none rounded-md"
        checked={isDark}
        readOnly
      />

      <span
        className={clsx(
          "ml-4 flex h-10 w-16 flex-shrink-0 items-center rounded-full bg-gray-300 p-1 duration-300 ease-in-out",
          "after:h-8 after:w-8 after:rounded-full after:bg-white after:shadow-md after:duration-300",
          "peer-checked:bg-[var(--color-gray)] peer-checked:after:translate-x-6 peer-checked:after:bg-alt"
        )}
      ></span>

      <span className="absolute left-[34px] duration-300 ease-in-out peer-checked:translate-x-6">
        {isDark ? (
          <RiMoonClearLine className="text-purple-400" />
        ) : (
          <RiSunLine className="text-orange-400" />
        )}
      </span>
    </button>
  );
}

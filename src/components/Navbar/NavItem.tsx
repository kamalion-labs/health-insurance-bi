"use client";

import { usePage } from "@/stores";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import clsx from "clsx";
import { ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa6";

interface Props {
  title: string;
  icon?: any;
  href?: string;
  children?: ReactNode;
  id?: string;
}

export function NavItem({ title, icon, href, children, id }: Props) {
  const { id: currentPageId, parentId } = usePage();

  if (!children)
    return (
      <NavigationMenu.Item value={id}>
        <NavigationMenu.Link
          href={href}
          className={clsx(
            "group flex w-full select-none items-center space-x-4 rounded-md px-4 py-2 drop-shadow-md transition-colors hover:bg-slate-200 hover:text-primary",
            "dark:hover:bg-slate-700 dark:hover:text-white",
            id === currentPageId &&
              "bg-slate-200 text-primary dark:bg-slate-700 dark:text-slate-200"
          )}
        >
          <div className="flex h-8 w-8 items-center justify-end">{icon}</div>
          <span className="flex flex-1 items-start font-medium">{title}</span>
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    );

  return (
    <NavigationMenu.Item className="group" value={id}>
      <NavigationMenu.Trigger
        className={clsx(
          "group flex w-full select-none items-center space-x-4 rounded-md px-4 py-2 drop-shadow-md transition-colors",
          "radix-state-open:bg-slate-200 radix-state-open:text-primary ",
          "dark:radix-state-open:bg-slate-700 dark:radix-state-open:text-white",
          id === parentId &&
            "bg-slate-200 text-primary dark:bg-slate-700 dark:text-slate-200"
        )}
        onPointerMove={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
      >
        <div className="flex h-8 w-8 items-center justify-end">{icon}</div>
        <span className="flex flex-1 items-start font-medium">{title}</span>
        <FaChevronRight className="transform duration-300 ease-in-out group-radix-state-open:rotate-90" />
      </NavigationMenu.Trigger>

      <NavigationMenu.Content
        className={clsx(
          "w-radix-navigation-menu-viewport",
          "h-radix-navigation-menu-viewport",
          "radix-state-open:animate-scale-in-content",
          "radix-state-closed:animate-scale-out-content",
          "origin-[top_center] transition-[width_height] duration-300 ease-[ease]"
        )}
        onPointerMove={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
      >
        {children}
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

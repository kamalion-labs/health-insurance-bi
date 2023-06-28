"use client";

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

export default function NavItem({ title, icon, href, children, id }: Props) {
  if (!children)
    return (
      <NavigationMenu.Item value={id}>
        <NavigationMenu.Link
          href={href}
          className={clsx(
            "group flex w-full select-none items-center space-x-4 px-4 py-2 transition-colors hover:bg-[var(--color-main-bg)]",
            "text-primary"
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
          "group flex w-full select-none items-center space-x-4 px-4 py-2 transition-colors radix-state-open:bg-[var(--color-main-bg)]",
          "text-primary"
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

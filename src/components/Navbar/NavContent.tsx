"use client";

import { usePage } from "@/stores";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { twMerge } from "tailwind-merge";
import { NavItemProps } from "./NavItemProps";

type Props = {
  items: NavItemProps[];
};

export function NavContent({ items }: Props) {
  const { id: currentPageId, parentId, setId } = usePage();

  return (
    <div className="z-50 flex flex-auto flex-col">
      <NavigationMenu.Root
        orientation="vertical"
        className="relative z-50 text-sm"
        value={currentPageId}
        defaultValue={currentPageId}
        onValueChange={setId}
      >
        <NavigationMenu.List className="z-50 flex flex-col space-y-2 rounded-lg">
          {items.map((item) => {
            if (item.items) {
              return (
                <NavigationMenu.Item className="group relative" key={item.id}>
                  <NavigationMenu.Trigger
                    className={twMerge(
                      "flex h-12 w-12 select-none items-center justify-center rounded-md drop-shadow-md transition-colors",
                      "radix-state-open:bg-slate-200 radix-state-open:text-primary ",
                      "dark:radix-state-open:bg-slate-700 dark:radix-state-open:text-white",
                      item.id === parentId &&
                        "bg-slate-200 text-primary dark:bg-slate-700 dark:text-slate-200"
                    )}
                  >
                    {item.icon}
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content
                    className={twMerge(
                      "absolute left-[105%] top-0 w-auto min-w-[200px] rounded-lg border-slate-900 bg-white text-primary shadow-lg",
                      "dark:bg-slate-700",
                      "radix-state-open:animate-scale-in-content",
                      "radix-state-closed:animate-scale-out-content",
                      "origin-[top_center] transition-[width_height] duration-300 ease-[ease]"
                    )}
                  >
                    {item.items.map((sub) => (
                      <NavigationMenu.Link
                        key={sub.id}
                        href={sub.href}
                        className={twMerge(
                          "group flex w-full select-none items-center rounded-md p-4 drop-shadow-md transition-colors hover:bg-slate-200 hover:text-primary",
                          "dark:hover:bg-slate-700 dark:hover:text-white",
                          sub.id === currentPageId &&
                            "bg-slate-200 text-primary dark:bg-slate-700 dark:text-slate-200"
                        )}
                      >
                        {sub.title}
                      </NavigationMenu.Link>
                    ))}
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              );
            }

            return (
              <NavigationMenu.Item key={item.id} asChild>
                <NavigationMenu.Link
                  href={item.href}
                  className={twMerge(
                    "group flex h-12 w-12 select-none items-center justify-center rounded-md drop-shadow-md transition-colors",
                    "hover:bg-slate-200 hover:text-primary",
                    "dark:hover:bg-slate-700 dark:hover:text-white",
                    item.id === currentPageId &&
                      "bg-slate-200 text-primary dark:bg-slate-700 dark:text-slate-200"
                  )}
                >
                  {item.icon}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          })}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  );
}

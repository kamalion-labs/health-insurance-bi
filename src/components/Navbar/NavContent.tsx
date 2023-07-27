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
                      "radix-state-open:rounded-r-none radix-state-open:bg-white radix-state-open:text-primary",
                      "dark:radix-state-open:bg-white dark:radix-state-open:text-white",
                      item.id === parentId &&
                        "bg-slate-100 text-primary dark:bg-slate-700 dark:text-slate-200"
                    )}
                  >
                    {item.icon}
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content
                    className={twMerge(
                      "absolute left-[100%] top-0 w-auto min-w-[300px] rounded-lg rounded-tl-none bg-white py-2 text-primary shadow-lg",
                      "dark:bg-slate-700",
                      "radix-state-open:animate-scale-in-content",
                      "radix-state-closed:animate-scale-out-content",
                      "origin-[top_center] transition-[width_height] duration-300 ease-[ease]"
                    )}
                  >
                    <div className="w-full px-4 pb-4 pt-1 text-lg text-slate-500 dark:text-slate-200">
                      {item.title}
                    </div>

                    {item.items.map((sub) => (
                      <NavigationMenu.Link
                        key={sub.id}
                        href={sub.href}
                        className={twMerge(
                          "group flex w-full select-none items-center px-4 py-2 transition-colors hover:bg-slate-100 hover:text-primary",
                          "dark:hover:bg-slate-700 dark:hover:text-white",
                          sub.id === currentPageId &&
                            "bg-slate-100 text-primary dark:bg-slate-700 dark:text-slate-200"
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

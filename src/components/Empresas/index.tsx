"use client";

import { NavItems } from "@/app/nav";
import { usePage } from "@/stores";
import { useSession } from "@/stores/session.store";
import { Empresa } from "@prisma/client";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import {
  FaBuilding,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { NavItemProps } from "../Navbar/NavItemProps";

export function Empresas({ data }: { data: Empresa[] }) {
  const { setIdEmpresa, idEmpresa } = useSession();
  const { id, parentId } = usePage();

  const router = useRouter();

  if (!data) return null;

  function handleChangeEmpresa(val: string) {
    console.log({ id, parentId });

    setIdEmpresa(Number(val));

    const route = parentId
      ? NavItems.filter((x) => x.id === parentId)
          .reduce<NavItemProps[]>(
            (prev, current) => [...prev, ...current.items!],
            []
          )
          .find((x) => x.id === id)
      : NavItems.find((x) => x.id === id);

    router.push(route?.href?.replace(":idEmpresa", val)!);
  }

  return (
    <SelectPrimitive.Root
      defaultValue={data[0].id.toString()}
      value={idEmpresa.toString()}
      onValueChange={handleChangeEmpresa}
    >
      <SelectPrimitive.Trigger asChild>
        <button
          className={twMerge(
            "inline-flex select-none items-center justify-center rounded-md px-4 py-2 text-sm drop-shadow-md",
            "bg-white text-slate-500 hover:bg-gray-50",
            "dark:bg-slate-800 dark:text-white",
            "focus:outline-none focus-visible:ring focus-visible:ring-zinc-500 focus-visible:ring-opacity-75",
            // Register all radix states
            "group",
            "radix-state-open:bg-gray-50 ",
            "radix-state-on:bg-gray-50",
            "radix-state-delayed-open:bg-gray-50 radix-state-instant-open:bg-gray-50"
          )}
        >
          <SelectPrimitive.Icon className="mr-2">
            <FaBuilding />
          </SelectPrimitive.Icon>

          <SelectPrimitive.Value placeholder="Selecione um item..." />

          <SelectPrimitive.Icon className="ml-4">
            <FaChevronDown />
          </SelectPrimitive.Icon>
        </button>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Content position="popper" sideOffset={5}>
        <SelectPrimitive.ScrollUpButton className="text-gray-70 flex items-center justify-center">
          <FaChevronUp />
        </SelectPrimitive.ScrollUpButton>

        <SelectPrimitive.Viewport className="rounded-lg bg-white p-2 shadow-lg">
          <SelectPrimitive.Group>
            {data.map(({ id, nome }) => (
              <SelectPrimitive.Item
                key={id}
                value={id.toString()}
                className={twMerge(
                  "relative flex items-center rounded px-8 py-2 text-sm font-medium text-slate-500 focus:bg-gray-100",
                  "radix-disabled:opacity-50",
                  "select-none focus:outline-none"
                )}
              >
                <SelectPrimitive.ItemText>{nome}</SelectPrimitive.ItemText>

                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <FaCheck />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>

        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700">
          <FaChevronDown />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
}

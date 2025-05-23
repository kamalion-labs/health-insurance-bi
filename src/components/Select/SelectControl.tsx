"use client";

import * as HookForm from "react-hook-form";
import * as SelectPrimitive from "@radix-ui/react-select";
import { FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { Select } from ".";

type InputProps = {
  name: string;
  control?: any;
  defaultValue?: any;
  disabled?: boolean;
  className?: string;
  data: { key: any; label: string }[];
  onChange?: (value: any) => void;
  value?: any;
};

export function SelectControl({
  name,
  control,
  defaultValue,
  disabled,
  data,
  className,
  onChange,
  value,
}: InputProps) {
  function renderSelect({
    field: { onChange, name, value },
  }: {
    field: HookForm.ControllerRenderProps<HookForm.FieldValues, string>;
  }) {
    function handleOnChange(e: any) {
      onChange(e);
    }

    return (
      <SelectPrimitive.Root
        value={value}
        onValueChange={handleOnChange}
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
      >
        <div className={twMerge("", className)}>
          <SelectPrimitive.Trigger asChild>
            <button
              className={twMerge(
                "inline-flex select-none items-center justify-center rounded-md border p-2 text-sm",
                "bg-main hover:bg-gray-50",
                "focus:outline-none focus-visible:ring focus-visible:ring-zinc-500 focus-visible:ring-opacity-75",
                // Register all radix states
                "group",
                "radix-state-open:bg-gray-50 ",
                "radix-state-on:bg-gray-50",
                "radix-state-delayed-open:bg-gray-50 radix-state-instant-open:bg-gray-50",
                className
              )}
            >
              <SelectPrimitive.Value placeholder="Selecione um item..." />

              <SelectPrimitive.Icon className="ml-4">
                <FaChevronDown />
              </SelectPrimitive.Icon>
            </button>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Content>
            <SelectPrimitive.ScrollUpButton className="text-gray-70 flex items-center justify-center">
              <FaChevronUp />
            </SelectPrimitive.ScrollUpButton>

            <SelectPrimitive.Viewport className="rounded-lg bg-white p-2 shadow-lg">
              <SelectPrimitive.Group>
                {data.map(({ key, label }) => (
                  <SelectPrimitive.Item
                    key={key.toString()}
                    value={key.toString()}
                    className={twMerge(
                      "relative flex items-center rounded px-8 py-2 text-sm font-medium text-zinc-700 focus:bg-gray-100",
                      "radix-disabled:opacity-50",
                      "select-none focus:outline-none"
                    )}
                  >
                    <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
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

          <Select.Error error={control?._formState?.errors?.[name]?.message} />
        </div>
      </SelectPrimitive.Root>
    );
  }

  const RenderedSelect = renderSelect({
    field: {
      onChange: (e) => onChange && onChange(e),
      value,
      name,
      onBlur: () => {},
      ref: () => {},
    },
  });

  if (!control) {
    return <>{RenderedSelect}</>;
  }

  return (
    <HookForm.Controller control={control} name={name} render={renderSelect} />
  );
}

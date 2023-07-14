"use client";

import { ReactNode } from "react";
import * as HookForm from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { maskProps } from "./maskProps";
import { NumericFormat, PatternFormat } from "react-number-format";
import { Input } from ".";

type InputProps = {
  name: string;
  rightButton?: ReactNode;
  className?: string;
  type?:
    | "text"
    | "number"
    | "password"
    | "tel"
    | "cel"
    | "hiddenCel"
    | "money"
    | "percent"
    | "date"
    | "cpf"
    | "cep";
  onChange?: (value: any) => void;
  placeholder?: string;
  password?: boolean;
  decimalScale?: number;
  control?: HookForm.Control<any, string>;
  value?: any;
  disabled?: boolean;
  error?: string;
};

export function InputControl({
  name,
  type = "text",
  className,
  placeholder,
  rightButton,
  control,
  onChange,
  value,
  disabled,
  decimalScale = 2,
  error,
}: InputProps) {
  // const [showingPassword, setShowingPassword] = useState(!password);

  function renderInput({
    field: { onChange, name, value },
  }: {
    field: HookForm.ControllerRenderProps<HookForm.FieldValues, string>;
  }) {
    const props = {
      className: twMerge(
        "rounded px-2 py-1 border h-fit bg-main",
        rightButton && "rounded-r-none",
        className
      ),
      id: name,
      name,
      value: value || "",
      placeholder,
      disabled,
    };

    if (type === "percent" || type === "money" || type === "number") {
      return (
        <NumericFormat
          {...props}
          {...maskProps[type]}
          valueIsNumericString
          decimalScale={decimalScale}
          onValueChange={(a: any) => onChange(a.value)}
        />
      );
    }

    if (type === "text" || type === "password") {
      return <input {...props} {...maskProps[type]} onChange={onChange} />;
    }

    return (
      <PatternFormat
        {...props}
        {...maskProps[type]}
        onValueChange={(a: any) => onChange(a.value)}
      />
    );
  }

  const RenderedInput = renderInput({
    field: {
      onChange: () => onChange && onChange(value),
      value,
      name,
      onBlur: () => {},
      ref: () => {},
    },
  });

  if (!control) {
    return (
      <div className="flex w-full flex-col">
        {RenderedInput}

        <Input.Error error={error} />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <HookForm.Controller control={control} name={name} render={renderInput} />
      <Input.Error error={control?._formState?.errors?.[name]?.message} />
    </div>
  );
}

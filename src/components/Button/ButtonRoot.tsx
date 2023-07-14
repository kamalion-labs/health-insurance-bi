import { ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonType =
  | "primary"
  | "secondary"
  | "danger"
  | "warn"
  | "info"
  | "success";

interface ButtonRootProps {
  children: ReactNode;
  type?: ButtonType;
  className?: string;
  submit?: boolean;
  onClick?: any;
}

const colors = {
  primary: {
    container: "bg-[var(--color-primary)] text-white",
    icon: "",
    inner: "",
  },
  secondary: {
    container: "bg-white text-[var(--color-primary)] border",
    icon: "bg-white ",
    inner: "border border-cyan-700",
  },
  danger: { container: "bg-[#f17573] text-white", icon: "", inner: "" },
  warn: { container: "bg-[#f8d053] text-white", icon: "", inner: "" },
  info: { container: "bg-[#48b0f7] text-white", icon: "", inner: "" },
  success: { container: "bg-[#10cfbd] text-white", icon: "", inner: "" },
};

export const ButtonRoot = forwardRef<HTMLButtonElement, ButtonRootProps>(
  ({ children, type = "primary", className, submit = false, onClick }, ref) => {
    const color = colors[type];

    return (
      <button
        type={submit ? "submit" : "button"}
        onClick={onClick}
        ref={ref}
        className={twMerge(
          "flex h-fit flex-row items-center justify-center space-x-3 rounded px-4 py-2 text-sm",
          "drop-shadow-md hover:drop-shadow-md",
          "transition-all hover:opacity-80",
          color.container,
          className
        )}
      >
        {children}
      </button>
    );
  }
);

ButtonRoot.displayName = "ButtonRoot";

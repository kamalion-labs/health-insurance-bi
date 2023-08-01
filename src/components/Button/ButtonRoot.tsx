import { ReactNode, forwardRef } from "react";
import { FaSpinner } from "react-icons/fa6";
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
  onClick?: () => void | Promise<void>;
  isLoading?: boolean;
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
  (
    {
      children,
      type = "primary",
      className,
      submit = false,
      onClick,
      isLoading,
    },
    ref
  ) => {
    const color = colors[type];

    return (
      <button
        type={submit ? "submit" : "button"}
        onClick={onClick}
        ref={ref}
        className={twMerge(
          "flex h-fit min-h-[36px] flex-row items-center justify-center space-x-3 rounded px-4 py-2 text-sm",
          "",
          "transition-all hover:opacity-80",
          color.container,
          className
        )}
      >
        {isLoading && <FaSpinner className="animate-spin" />}

        {!isLoading && <>{children}</>}
      </button>
    );
  }
);

ButtonRoot.displayName = "ButtonRoot";

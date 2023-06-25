import clsx from "clsx";
import React, { MouseEventHandler } from "react";
import { RiLoader4Line } from "react-icons/ri";

export type ButtonType =
  | "primary"
  | "secondary"
  | "alt"
  | "danger"
  | "warn"
  | "info"
  | "success";
export type ButtonSize = "small" | "normal" | "large";

interface IProps {
  children?: any;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  type?: ButtonType;
  size?: ButtonSize;
  icon?: any;
  isLoading?: boolean;
  loadingText?: string;
  submit?: boolean;
  tabIndex?: number;
  disabled?: boolean;
}

export const Button: React.FC<IProps> = ({
  children,
  onClick,
  icon,
  className = "",
  type = "primary",
  size = "normal",
  isLoading = false,
  loadingText = "Carregando...",
  submit = false,
  tabIndex = undefined,
  disabled = false,
}) => {
  const colors = {
    primary: {
      container: "bg-[color:var(--color-primary)] text-white",
      icon: "",
      inner: "",
    },
    secondary: {
      container: "bg-alt border border-primary text-primary dark:text-white",
      icon: "bg-white ",
      inner: "",
    },
    alt: {
      container: "bg-main",
      icon: "",
      inner: "",
    },
    danger: { container: "bg-[#f17573] text-white", icon: "", inner: "" },
    warn: { container: "bg-[#f8d053] text-white", icon: "", inner: "" },
    info: { container: "bg-[#48b0f7] text-white", icon: "", inner: "" },
    success: { container: "bg-[#10cfbd] text-white", icon: "", inner: "" },
  };

  const { container, icon: iconStyle } = colors[type];

  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={clsx(
        "flex h-[32px] flex-row rounded text-sm leading-relaxed outline-none transition",
        "hover:opacity-75 active:opacity-90 ",
        "focus:border-[color:var(--color-primary)] focus:ring-[color:var(--color-primary)]",
        "disabled:bg-gray-300 disabled:hover:opacity-100",
        container,
        className
      )}
      tabIndex={tabIndex}
      disabled={disabled}
    >
      {typeof children !== "undefined" && (
        <div className="flex w-full flex-1 items-center justify-center px-4 py-1">
          {icon && (
            <div
              className={clsx(
                "button-icon",

                iconStyle
              )}
            >
              {isLoading && <RiLoader4Line className="icon-spin" size={20} />}
              {!isLoading && icon}
            </div>
          )}

          <div className="flex-1">
            {isLoading && <div>{loadingText}</div>}
            {!isLoading && children}
          </div>
        </div>
      )}
    </button>
  );
};

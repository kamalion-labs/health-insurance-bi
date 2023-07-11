import { twMerge } from "tailwind-merge";

interface SelectLabelProps {
  htmlFor: string;
  text: string;
  className?: string;
}

export function SelectLabel({ htmlFor, text, className }: SelectLabelProps) {
  return (
    <label htmlFor={htmlFor} className={twMerge("text-left", className)}>
      {text}
    </label>
  );
}

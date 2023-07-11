import { twMerge } from "tailwind-merge";

interface InputLabelProps {
  htmlFor: string;
  text: string;
  className?: string;
}

export function InputLabel({ htmlFor, text, className }: InputLabelProps) {
  return (
    <label htmlFor={htmlFor} className={twMerge("text-left", className)}>
      {text}
    </label>
  );
}

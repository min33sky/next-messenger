import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  fullWidth?: boolean;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  className?: string;
}

export default function Button({
  fullWidth,
  secondary,
  danger,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`flex justify-center rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:opacity-50  ${
        fullWidth ? "w-full" : ""
      } 
      ${secondary ? "text-gray-900" : "text-white"} 
      ${
        danger
          ? "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600"
          : ""
      }  ${className}`}
      {...props}
    ></button>
  );
}

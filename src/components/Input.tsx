"use client";

import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  label?: string;
  register: UseFormRegisterReturn; // react-hook-form
  error?: FieldError; // react-hook-form
  className?: string;
}

export default function Input({
  id,
  label,
  className = "",
  register,
  error,
  ...props
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-sm font-medium leading-6 text-gray-900`}
      >
        {label ?? id}
        <span className={`ml-2 text-xs text-rose-500`}>{error?.message}</span>
      </label>
      <div className={`mt-2`}>
        <input
          id={id}
          className={`form-input block  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm sm:leading-6 ${className} ${
            error ? "focus:ring-rose-500" : "focus:ring-sky-600"
          }  `}
          {...register}
          {...props}
        />
      </div>
    </div>
  );
}

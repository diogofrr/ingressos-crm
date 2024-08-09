"use client";

import { EyeIcon } from "@/assets/img/eye-icon";
import { EyeSlashIcon } from "@/assets/img/eye-slash-icon";
import { useState } from "react";

interface IField extends React.ComponentPropsWithoutRef<"input"> {
  type: string;
  label: string;
  name: string;
  error: boolean;
  errorMessage: string;
  placeholder: string;
  className?: string;
  hideLabel?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Field({
  type,
  label,
  name,
  error,
  errorMessage,
  onChange,
  className = "",
  hideLabel = false,
  ...args
}: IField) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={name}
        className={`font-medium relative top-3 left-3 bg-white px-2 max-w-max rounded-lg text-base ${hideLabel && 'hidden'}`}
      >
        {label}
      </label>
      <div className="flex items-center">
        <input
          type={showPassword ? "text" : type}
          name={name}
          id={name}
          onChange={onChange}
          className={`
          peer
            ${
              type === "password"
                ? "border-l-2 border-t-2 border-b-2 rounded-ss-lg rounded-es-lg"
                : "border-2 rounded-lg"
            } 
            h-12 w-full
            px-4 py-3
            focus:outline-none
            ${!error && "focus:border-blue-500"}
            ${error && "border-red-600"}
            ${className}
          `}
          {...args}
        />
        {type === "password" && (
          <div
            className={`
              py-4 pr-4 border-t-2 border-r-2 border-b-2 rounded-ee-lg rounded-se-lg
              h-12
              flex items-center justify-center
              ${!error && "peer-focus:border-blue-500"}
              ${error && "border-red-600"} 
              cursor-pointer
            `}
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            {showPassword ? (
              <EyeSlashIcon className="size-6" />
            ) : (
              <EyeIcon className="size-6" />
            )}
          </div>
        )}
      </div>
      {error && <div className="text-red-600">{errorMessage}</div>}
    </div>
  );
}

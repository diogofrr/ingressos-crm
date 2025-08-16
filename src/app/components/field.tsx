import { EyeIcon } from "@/assets/img/eye-icon";
import { EyeSlashIcon } from "@/assets/img/eye-slash-icon";
import { useId, useState } from "react";

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
  const inputId = useId();

  return (
    <div className="form-control w-full">
      {!hideLabel && (
        <label htmlFor={name || inputId} className="label pb-2">
          <span className="label-text text-base font-medium">{label}</span>
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          name={name}
          id={name || inputId}
          onChange={onChange}
          className={`input input-bordered w-full h-14 text-base ${
            type === "password" ? "pr-12" : ""
          } ${error ? "input-error" : ""} ${className}`}
          aria-invalid={error}
          aria-errormessage={error ? `${name || inputId}-error` : undefined}
          {...args}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center text-base-content/60 hover:text-base-content z-10 bg-transparent border-none outline-none focus:outline-none pointer-events-auto cursor-pointer"
            onClick={() => setShowPassword((prevState) => !prevState)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeSlashIcon className="size-6" />
            ) : (
              <EyeIcon className="size-6" />
            )}
          </button>
        )}
      </div>
      {error && (
        <span
          id={`${name || inputId}-error`}
          className="mt-1 text-sm text-error"
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
}

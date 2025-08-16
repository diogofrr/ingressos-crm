import { useId } from "react";

interface SelectOption {
  key: string;
  value: string | number;
}

interface ISelect extends React.ComponentPropsWithoutRef<"select"> {
  label: string;
  name: string;
  error: boolean;
  errorMessage: string;
  options: SelectOption[];
  className?: string;
  hideLabel?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  label,
  name,
  error,
  errorMessage,
  options,
  onChange,
  className = "",
  hideLabel = false,
  ...args
}: ISelect) {
  const selectId = useId();

  return (
    <div className="form-control w-full">
      {!hideLabel && (
        <label htmlFor={name || selectId} className="label pb-2">
          <span className="label-text text-base font-medium">{label}</span>
        </label>
      )}
      <select
        name={name}
        id={name || selectId}
        onChange={onChange}
        className={`select select-bordered w-full h-14 text-base ${
          error ? "select-error" : ""
        } ${className}`}
        aria-invalid={error}
        aria-errormessage={error ? `${name || selectId}-error` : undefined}
        {...args}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.key}
          </option>
        ))}
      </select>
      {error && (
        <span
          id={`${name || selectId}-error`}
          className="mt-1 text-sm text-error"
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
}

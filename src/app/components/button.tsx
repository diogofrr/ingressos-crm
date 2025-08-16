type COLORS_OPTIONS = "gray" | "green" | "red" | "blue" | "secondary";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  className?: string;
  disabled?: boolean;
  color?: COLORS_OPTIONS;
  loading?: boolean;
  btnStyle?: "solid" | "outline";
  fullWidth?: boolean;
}

export default function Button({
  children,
  btnStyle = "solid",
  className = "",
  disabled = false,
  color = "blue",
  loading = false,
  fullWidth = true,
  ...args
}: ButtonProps) {
  const colorClassByScheme: Record<COLORS_OPTIONS, string> = {
    gray: "btn-neutral",
    green: "btn-success",
    blue: "btn-primary",
    red: "btn-error",
    secondary: "btn-ghost",
  };

  const baseClasses = `btn ${
    fullWidth ? "w-full" : "w-auto"
  } h-14 min-h-14 font-semibold text-base`;
  const styleClasses =
    btnStyle === "outline"
      ? `btn-outline ${colorClassByScheme[color]}`
      : colorClassByScheme[color];
  const loadingClasses = loading ? "loading" : "";

  return (
    <button
      className={`${baseClasses} ${styleClasses} ${loadingClasses} ${className}`}
      disabled={disabled || loading}
      {...args}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
}

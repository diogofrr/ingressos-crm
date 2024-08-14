type COLORS = "gray" | "green" | "red" | "blue" | "outline-red" | "outline-green" | "outline-blue" | "outline-gray";
type COLORS_OPTIONS = "gray" | "green" | "red" | "blue";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  className?: string;
  disabled?: boolean;
  color?: COLORS_OPTIONS;
  loading?: boolean;
  btnStyle?: "solid" | "outline"
}

export default function Button({
  children,
  btnStyle = "solid",
  className,
  disabled = false,
  color = "blue",
  loading = false,
  ...args
}: ButtonProps) {
  const buttonColors = {
    gray: "bg-slate-200 disabled:hover:bg-slate-200 hover:bg-slate-500 text-slate-500",
    green: "bg-green-600 hover:bg-green-700 text-white",
    blue: "bg-blue-500 hover:bg-blue-600 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
    "outline-gray": "bg-transparent border-2 border-gray-400 disabled:hover:border-gray-400 text-gray-400",
    "outline-red": "bg-transparent border-2 border-red-400 hover:border-red-600 text-red-400 hover:text-red-600",
    "outline-green": "bg-transparent border-2 border-green-400 hover:border-green-600 text-green-400 hover:text-green-600",
    "outline-blue": "bg-transparent border-2 border-blue-400 hover:border-blue-600 text-blue-400 hover:text-blue-600",
  };

  const isDisabled = disabled || loading;

  const complement = btnStyle !== "solid" ? `${btnStyle}-` : ""
  const colorIndex = `${complement}${color}` as COLORS
  const disabledIndex = `${complement}gray` as COLORS

  return (
    <button
      className={`font-semibold h-12 w-full rounded-lg flex items-center justify-center ${
        isDisabled ? buttonColors[disabledIndex] : buttonColors[colorIndex]
      } ${className}`}
      disabled={isDisabled}
      {...args}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
}

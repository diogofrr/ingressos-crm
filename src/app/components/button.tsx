type COLORS = 'gray' | 'green' | 'red' | 'blue'

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  className?: string
  disabled?: boolean
  color?: COLORS
}

export default function Button({
  children,
  className,
  disabled = false,
  color = 'blue',
  ...args
}: ButtonProps) {
  const buttonColors = {
    gray: "bg-gray-200 hover:bg-gray-500 text-gray-700",
    green: "bg-green-500 hover:bg-green-700 text-white",
    blue: "bg-blue-500 hover:bg-blue-700 text-white",
    red: "bg-red-500 hover:bg-red-700 text-white",
  };
  return (
    <button
      className={`font-semibold h-12 w-full rounded-lg flex items-center justify-center ${disabled ? buttonColors.gray : buttonColors[color]} ${className}`}
      {...args}
    >
      {children}
    </button>
  )
}
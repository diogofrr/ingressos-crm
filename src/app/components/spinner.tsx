interface SpinnerProps {
  className?: string;
}

export default function Spinner({ className }: SpinnerProps) {
  return (
    <span
      className={`loading loading-spinner loading-md ${className}`}
      aria-label="Carregando"
    ></span>
  );
}

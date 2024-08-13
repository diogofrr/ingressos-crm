interface SpinnerProps {
  className?: string;
}

export default function Spinner({ className }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center p-1">
      <div
        className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] ${className}`}
        role="status"
        ></div>
    </div>
  );
}

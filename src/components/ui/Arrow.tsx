export default function Arrow({
  direction = "up",
  className = "",
}: {
  direction?: "up" | "right" | "down";
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`arrow arrow-${direction} ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}

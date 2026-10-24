export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="6" fill="#D62828" />
      <circle cx="16" cy="16" r="8" stroke="#fff" strokeWidth="2.5" />
      <circle cx="16" cy="16" r="2.5" fill="#fff" />
      <path
        d="M16 8v3.5M16 20.5V24M8 16h3.5M20.5 16H24"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
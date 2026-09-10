export function SuccessCheck() {
  return (
    <div
      className="success-check-enter flex size-20 items-center justify-center rounded-full bg-success/15 md:size-24"
      aria-hidden="true"
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-success md:size-16">
        <svg
          viewBox="0 0 24 24"
          className="size-8 text-white md:size-9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.5 9.5 17 19 7.5" />
        </svg>
      </div>
    </div>
  );
}

/** Soft brand shapes behind page content. Solid color, no gradient. */
export function PageBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span className="absolute -top-28 right-[-5rem] size-72 rounded-full bg-accent/12" />
      <span className="absolute top-[38%] -left-24 size-56 rounded-full bg-primary/8" />
      <span className="absolute -bottom-16 right-8 size-40 rounded-full bg-secondary/10" />
      <span className="absolute top-24 left-[42%] size-2 rounded-full bg-accent" />
      <span className="absolute top-[52%] right-[18%] size-1.5 rounded-full bg-accent" />
      <span className="absolute bottom-32 left-[12%] size-2 rounded-full bg-secondary/40" />
    </div>
  );
}

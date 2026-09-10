export function PageHero({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="landing-card-enter">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{kicker}</p>
      <h1 className="mt-3 font-display text-[1.7rem] font-bold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          {intro}
        </p>
      ) : null}
      <div className="mt-5 h-1 w-12 rounded-full bg-highlight" aria-hidden="true" />
    </div>
  );
}

type AdminPageHeaderProps = {
  /** Uppercase breadcrumb-style eyebrow, e.g. "System / Inventory". */
  eyebrow: string;
  title: string;
  /** Optional toolbar actions rendered on the right. */
  children?: React.ReactNode;
};

/** Shared header for admin pages — eyebrow, title and an action slot. */
export default function AdminPageHeader({
  eyebrow,
  title,
  children,
}: AdminPageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
          {eyebrow}
        </p>
        <h2 className="mt-1 font-headline text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          {title}
        </h2>
      </div>
      {children ? <div className="flex gap-3">{children}</div> : null}
    </header>
  );
}

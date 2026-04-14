import type { CSSProperties } from "react";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  sectionClassName?: string;
  headerClassName?: string;
  children: React.ReactNode;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  sectionClassName,
  headerClassName,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`anchor-offset py-16 sm:py-20 ${sectionClassName ?? ""}`}
    >
      <div className="container-shell flex flex-col gap-10">
        <div className={`max-w-3xl ${headerClassName ?? ""}`}>
          <div className="eyebrow-line section-label reveal-up scroll-reveal-up">{eyebrow}</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl reveal-up scroll-reveal-up" style={{ "--delay": "90ms" } as CSSProperties}>
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg reveal-up scroll-reveal-up" style={{ "--delay": "160ms" } as CSSProperties}>
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
}

export default function Section({
  children,
  className = "",
  id,
  title,
  subtitle,
}: SectionProps) {
  return (
    <section id={id} className={`py-20 px-6 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(title || subtitle) && (
          <div className="mb-16 text-center animate-[fade-in_0.6s_ease-out]">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

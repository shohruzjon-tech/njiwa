import Image from "next/image";

const banners: Record<string, string> = {
  "used-vehicles": "/service-banners/car_import.webp",
  "solar-energy": "/service-banners/solar_energy.webp",
  "gps-tracking": "/service-banners/gps_tracking.webp",
  "fuel-monitoring": "/service-banners/fuel_monitoring.webp",
};

const icons: Record<string, React.ReactNode> = {
  "used-vehicles": (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M8 17h1m6 0h1M3 11l1.5-5A2 2 0 0 1 6.4 4.5h11.2a2 2 0 0 1 1.9 1.5L21 11M3 11v6a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-6M3 11h18" />
    </svg>
  ),
  "solar-energy": (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
    </svg>
  ),
  "gps-tracking": (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  "fuel-monitoring": (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M3 22h12M7 10h4m4-2 2 2v6a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1V8l-2-2" />
    </svg>
  ),
};

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  index?: number;
  /** When true, renders the expanded layout with all features (services page). */
  expanded?: boolean;
}

/* ─── Compact card for homepage grid ─── */
function CompactCard({
  id,
  title,
  description,
  features,
  index = 0,
}: ServiceCardProps) {
  const delay = index * 0.12;

  return (
    <article
      className="service-card group relative flex flex-col overflow-hidden rounded-2xl bg-surface shadow-xl ring-1 ring-white/[0.06]"
      style={{ animation: `slide-up 0.6s ease-out ${delay}s both` }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={banners[id] ?? banners["used-vehicles"]}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={index === 0}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Scan-line effect */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="service-scanline absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        </div>

        {/* Icon badge */}
        <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-accent group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          {icons[id] ?? icons["used-vehicles"]}
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col p-6">
        {/* Glow line */}
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <h3 className="mb-2 text-lg font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-accent">
          {title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-400">
          {description}
        </p>

        {features.length > 0 && (
          <ul className="mt-auto space-y-1.5">
            {features.slice(0, 3).map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-xs text-gray-500"
              >
                <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Bottom glow on hover */}
        <div className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-accent/5 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
      </div>
    </article>
  );
}

/* ─── Expanded card for services page (alternating layout) ─── */
function ExpandedCard({
  id,
  title,
  description,
  features,
  index = 0,
}: ServiceCardProps) {
  const delay = index * 0.15;
  const isEven = index % 2 === 0;

  return (
    <article
      className="service-card group relative overflow-hidden rounded-3xl bg-surface shadow-2xl ring-1 ring-white/[0.06]"
      style={{ animation: `slide-up 0.7s ease-out ${delay}s both` }}
    >
      <div
        className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
      >
        {/* Image side */}
        <div className="relative h-72 w-full overflow-hidden lg:h-auto lg:min-h-[420px] lg:w-1/2">
          <Image
            src={banners[id] ?? banners["used-vehicles"]}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={index <= 1}
          />
          {/* Gradient toward content side */}
          <div
            className={`absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-surface ${
              isEven
                ? "lg:bg-gradient-to-r lg:from-transparent lg:via-surface/40 lg:to-surface"
                : "lg:bg-gradient-to-l lg:from-transparent lg:via-surface/40 lg:to-surface"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Animated scan-line */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="service-scanline absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          </div>

          {/* Corner accent */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-accent group-hover:shadow-[0_0_24px_rgba(245,158,11,0.2)]">
              {icons[id] ?? icons["used-vehicles"]}
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-widest text-gray-400 uppercase backdrop-blur-md">
              0{(index ?? 0) + 1}
            </span>
          </div>
        </div>

        {/* Content side */}
        <div className="relative flex flex-1 flex-col justify-center p-8 lg:p-12">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-accent/5 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <h3 className="relative mb-3 text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-accent lg:text-3xl">
            {title}
          </h3>

          {/* Accent underline */}
          <div className="mb-5 h-px w-16 bg-gradient-to-r from-accent/60 to-transparent transition-all duration-500 group-hover:w-24" />

          <p className="relative mb-6 leading-relaxed text-gray-400">
            {description}
          </p>

          {features.length > 0 && (
            <ul className="relative grid gap-2 sm:grid-cols-2">
              {features.map((feature, fi) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-200"
                  style={{
                    animation: `fade-in 0.4s ease-out ${delay + fi * 0.06}s both`,
                  }}
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Bottom glow */}
          <div className="pointer-events-none absolute -bottom-12 left-1/2 h-24 w-2/3 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
        </div>
      </div>
    </article>
  );
}

export default function ServiceCard(props: ServiceCardProps) {
  return props.expanded ? (
    <ExpandedCard {...props} />
  ) : (
    <CompactCard {...props} />
  );
}

const brandShapes = {
  Samsung: <><path d="M7 8.5c0-2 1.6-3.5 3.6-3.5h4.8c2 0 3.6 1.5 3.6 3.5S17.4 12 15.4 12h-4.8C8.6 12 7 13.5 7 15.5S8.6 19 10.6 19h4.8c2 0 3.6-1.5 3.6-3.5" /><path d="M21 4.5h2.5v15H21z" /></>,
  LG: <><circle cx="14" cy="12" r="7" /><circle cx="12" cy="10" r="1" /><path d="M14 14h3.5v3" /></>,
  Whirlpool: <><path d="M5 12c0-4 3.2-7 7-7s7 3 7 7-3.2 7-7 7" /><path d="M9 12c0-2 1.4-3.5 3-3.5s3 1.5 3 3.5-1.4 3.5-3 3.5" /></>,
  GE: <><circle cx="14" cy="12" r="8" /><path d="M17.5 9.5c-1-.8-2.1-1.2-3.5-1.2-2.4 0-4 1.5-4 3.7s1.6 3.7 4 3.7c1.4 0 2.6-.4 3.5-1.2v-2.1h-3" /></>,
  Bosch: <><circle cx="14" cy="12" r="8" /><path d="M11 8.5h3a2 2 0 0 1 0 4h-3m0 0h3.5a2 2 0 0 1 0 4H11z" /></>,
  Maytag: <><path d="m6 17 2-10 6 6 6-6 2 10" /><path d="M9 17h10" /></>,
  KitchenAid: <><path d="M7 8h8a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H9a2 2 0 0 1-2-2z" /><path d="M10 8V5h7" /></>,
};

export function BrandLogo({ name }) {
  return (
    <span className="brand-logo-svg" title={name}>
      <svg viewBox="0 0 28 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {brandShapes[name]}
      </svg>
      <span>{name}</span>
    </span>
  );
}


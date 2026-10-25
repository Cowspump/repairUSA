import { useReducedMotion, motion } from "motion/react";
import type { CSSProperties } from "react";

export type Logo = {
  src: string;
  alt: string;
};

type LogoMarqueeProps = {
  logos: Logo[];
  className?: string;
};

export function LogoMarquee({ logos, className = "" }: LogoMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const items = [...logos, ...logos];

  return (
    <div className={`logo-marquee ${className}`} aria-label="Brands we repair">
      <motion.div
        className="logo-marquee-track"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 34, ease: "linear", repeat: Infinity }
        }
      >
        {items.map((logo, index) => (
          <img
            key={`${logo.src}-${index}`}
            src={logo.src}
            alt={index >= logos.length ? "" : logo.alt}
            aria-hidden={index >= logos.length}
            className="brand-logo-image"
            style={{ "--logo-gap": "42px" } as CSSProperties}
            loading="lazy"
          />
        ))}
      </motion.div>
    </div>
  );
}

export default LogoMarquee;

import { memo, useEffect, useState, type ReactNode } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

export type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type InfiniteSliderProps = {
  children: ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  reverse?: boolean;
  className?: string;
};

const InfiniteSlider = memo(function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!width) return undefined;

    const contentSize = width + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;
    const distance = Math.abs(translation.get() - to) / contentSize;

    const controls = isTransitioning
      ? animate(translation, [translation.get(), to], {
          ease: "linear",
          duration: currentDuration * distance,
          onComplete: () => {
            setIsTransitioning(false);
            setKey((previous) => previous + 1);
          },
        })
      : animate(translation, [from, to], {
          ease: "linear",
          duration: currentDuration,
          repeat: Infinity,
          repeatType: "loop",
          onRepeat: () => translation.set(from),
        });

    return () => controls.stop();
  }, [
    key,
    translation,
    currentDuration,
    width,
    gap,
    isTransitioning,
    reverse,
  ]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{ x: translation, gap: `${gap}px` }}
        onHoverStart={
          durationOnHover
            ? () => {
                setIsTransitioning(true);
                setCurrentDuration(durationOnHover);
              }
            : undefined
        }
        onHoverEnd={
          durationOnHover
            ? () => {
                setIsTransitioning(true);
                setCurrentDuration(duration);
              }
            : undefined
        }
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
});

const LogoImage = memo(function LogoImage({ logo }: { logo: Logo }) {
  return (
    <img
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      loading="lazy"
      className="brand-logo-image pointer-events-none select-none"
    />
  );
});

export const LogoMarquee = memo(function LogoMarquee({
  logos,
  className,
}: {
  logos: Logo[];
  className?: string;
}) {
  return (
    <div className={cn("logo-marquee", className)} aria-label="Brands we repair">
      <InfiniteSlider gap={36} reverse duration={8} durationOnHover={4}>
        {logos.map((logo) => (
          <LogoImage key={logo.alt} logo={logo} />
        ))}
      </InfiniteSlider>
    </div>
  );
});

LogoMarquee.displayName = "LogoMarquee";
export default LogoMarquee;

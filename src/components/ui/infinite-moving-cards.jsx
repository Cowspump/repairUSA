import * as React from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";

const SPEED_PX_PER_SEC = { slow: 26, normal: 44, fast: 74 };

export function InfiniteMovingCards({
  items = [],
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className = "",
  cardClassName = "",
  gap = 16,
  loop = true,
  showGradientMask = true,
  renderItem,
}) {
  const reduceMotion = useReducedMotion() === true;
  const x = useMotionValue(0);
  const viewportRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const [singleWidth, setSingleWidth] = React.useState(0);
  const [viewportWidth, setViewportWidth] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const renderedItems = loop ? [...items, ...items] : items;

  React.useLayoutEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      setSingleWidth(loop ? track.scrollWidth / 2 : track.scrollWidth);
      setViewportWidth(viewport.clientWidth);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [items.length, loop, gap]);

  React.useEffect(() => {
    if (singleWidth > 0) x.set(direction === "right" ? -singleWidth : 0);
  }, [direction, singleWidth, x]);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || items.length <= 1 || (pauseOnHover && hovered) || singleWidth <= 0) return;
    const velocity = SPEED_PX_PER_SEC[speed] * (delta / 1000);
    const next = x.get() + (direction === "left" ? -velocity : velocity);
    if (loop) {
      let wrapped = next;
      if (direction === "left" && wrapped <= -singleWidth) wrapped += singleWidth;
      if (direction === "right" && wrapped >= 0) wrapped -= singleWidth;
      x.set(wrapped);
    } else {
      const limit = -Math.max(0, singleWidth - viewportWidth);
      x.set(direction === "left" ? Math.max(limit, next) : Math.min(0, next));
    }
  });

  return (
    <div
      className={`moving-cards ${className}`}
      onMouseEnter={pauseOnHover ? () => setHovered(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setHovered(false) : undefined}
    >
      <div ref={viewportRef} className="moving-cards-viewport">
        <motion.div ref={trackRef} className="moving-cards-track" style={{ x: reduceMotion ? 0 : x, gap }}>
          {renderedItems.map((item, index) => (
            <div className={`moving-card-shell ${cardClassName}`} key={`${item.id ?? "item"}-${index}`}>
              {renderItem ? renderItem(item, index) : (
                <article className="moving-card">
                  {item.image ? <img src={item.image} alt={item.title || "Review"} loading="lazy" /> : null}
                  <div className="moving-card-body">
                    {item.title ? <h3>{item.title}</h3> : null}
                    {item.description ? <p>{item.description}</p> : null}
                    {typeof item.rating === "number" ? <div className="moving-card-rating" aria-label={`${item.rating} out of 5 stars`}>{"★".repeat(Math.round(item.rating))}</div> : null}
                    {item.tags?.length ? <div className="moving-card-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div> : null}
                    {item.name || item.role ? <div className="moving-card-author"><strong>{item.name}</strong><small>{item.role}</small></div> : null}
                  </div>
                </article>
              )}
            </div>
          ))}
        </motion.div>
      </div>
      {showGradientMask ? <><div className="moving-cards-mask moving-cards-mask-left" /><div className="moving-cards-mask moving-cards-mask-right" /></> : null}
    </div>
  );
}

export default InfiniteMovingCards;

import { useEffect, useRef, useState } from "react";

export function ProcessTimeline({ milestones }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const triggerPoint = window.innerHeight / 2;
      const progress = (triggerPoint - rect.top) / rect.height;

      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="process-timeline" ref={containerRef}>
      <div className="process-timeline-track">
        <div
          className="process-timeline-progress"
          style={{ height: `${scrollProgress * 100}%` }}
        />

        <div className="process-timeline-items">
          {milestones.map((milestone, index) => {
            const itemThreshold = index / (milestones.length - 1 || 1);
            const isActive = scrollProgress >= itemThreshold - 0.05;
            const isEven = index % 2 === 0;

            return (
              <article
                className={`process-timeline-item ${isEven ? "is-even" : ""} ${
                  isActive ? "is-active" : ""
                }`}
                key={milestone.id}
              >
                <div className="process-timeline-dot" />
                <div className="process-timeline-spacer" />
                <div className="process-timeline-content">
                  <span className="process-timeline-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="process-timeline-date">{milestone.date}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

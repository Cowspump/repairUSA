import { CircleDot, Flame, HelpCircle, Microwave, Refrigerator, Soup, WashingMachine, Wind } from "lucide-react";

const icons = { washer: WashingMachine, dryer: Wind, refrigerator: Refrigerator, dishwasher: Soup, oven: Flame, cooktop: CircleDot, microwave: Microwave, other: HelpCircle };

export function AnimatedList({ items, active, onSelect }) {
  return (
    <div className="appliance-list" role="list">
      {items.map((item) => {
        const Icon = icons[item.slug] || HelpCircle;
        return (
        <button className={`appliance-row ${active === item.slug ? "active" : ""}`} type="button" key={item.slug} onClick={() => onSelect(item.slug)}>
          <span className={`row-icon icon-${item.slug}`} aria-hidden="true"><Icon size={21} strokeWidth={1.8} /></span>
          <strong>{item.label}</strong>
          <small>{item.issues.length} issues</small>
        </button>
        );
      })}
    </div>
  );
}

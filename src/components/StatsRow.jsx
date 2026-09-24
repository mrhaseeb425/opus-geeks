import CountUp from "./CountUp";

// Big numbers with small labels in a row, separated by hairline vertical
// dividers — no boxes. `compact` lays them out 2x2 for use inside a column.
export default function StatsRow({ stats, compact = false, className = "" }) {
  return (
    <div className={`ed-stats ${compact ? "is-compact" : ""} ${className}`}>
      {stats.map((stat) => (
        <div className="ed-stat" key={stat.key ?? stat.label}>
          <span className="ed-stat-value">
            <CountUp value={stat.value} />
          </span>
          <span className="ed-stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

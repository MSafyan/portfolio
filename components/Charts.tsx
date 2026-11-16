import type { Chart } from "@/lib/work";

// Server-rendered, no JS. Colours validated with the dataviz palette checker
// (light and dark, CVD-safe); values are always printed beside the marks, so
// colour never carries meaning alone and the printed labels double as the table.

export function ChartCard({ chart }: { chart: Chart }) {
  return (
    <figure className="flex flex-col rounded-3xl border border-line bg-surface p-6">
      <figcaption className="text-sm font-semibold">{chart.title}</figcaption>
      <div className="mt-5 flex-1">{chart.type === "beforeAfter" ? <BeforeAfter chart={chart} /> : <Series chart={chart} />}</div>
      {chart.source && <p className="mt-4 text-xs text-muted">{chart.source}</p>}
    </figure>
  );
}

function BeforeAfter({ chart }: { chart: Extract<Chart, { type: "beforeAfter" }> }) {
  const max = Math.max(chart.before.value, chart.after.value);
  const rows = [
    { key: "Before", ...chart.before, color: "var(--chart-muted)" },
    { key: "After", ...chart.after, color: "var(--chart-strong)" },
  ];
  return (
    <>
      <dl className="space-y-4">
        {rows.map((r) => (
          <div key={r.key}>
            <dt className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-muted">{r.key}</span>
              <span className="font-semibold">{r.display}</span>
            </dt>
            <dd className="mt-1.5 h-3 rounded-full bg-line/60" title={`${r.key}: ${r.display}`}>
              <span
                className="block h-full rounded-full"
                style={{ width: `${Math.max((r.value / max) * 100, 1.5)}%`, background: r.color }}
              />
            </dd>
          </div>
        ))}
      </dl>
      {chart.change && <p className="pt-5 font-serif text-2xl font-medium text-accent">{chart.change}</p>}
    </>
  );
}

function Series({ chart }: { chart: Extract<Chart, { type: "series" }> }) {
  const W = 320;
  const H = 150;
  const max = Math.max(...chart.points.map((p) => p.value));
  const n = chart.points.length;
  const gap = 10;
  const bw = (W - gap * (n - 1)) / n;
  const last = n - 1;
  return (
    <>
        <svg viewBox={`0 0 ${W} ${H + 40}`} className="w-full" role="img" aria-label={`${chart.title}: ${chart.points.map((p) => `${p.label} ${p.display}`).join(", ")}`}>
          <line x1="0" x2={W} y1={H} y2={H} stroke="var(--line)" strokeWidth="1" />
          {chart.points.map((p, i) => {
            const h = Math.max((p.value / max) * (H - 24), 3);
            const x = i * (bw + gap);
            const strong = i === last;
            return (
              <g key={p.label}>
                <title>{`${p.label}: ${p.display}`}</title>
                <path
                  d={`M${x},${H} v${-(h - 4)} q0,-4 4,-4 h${bw - 8} q4,0 4,4 v${h - 4} z`}
                  fill={strong ? "var(--chart-strong)" : "var(--chart-muted)"}
                />
                {(i === 0 || strong) && (
                  <text x={x + bw / 2} y={H - h - 8} textAnchor="middle" className="fill-ink text-[13px] font-semibold">
                    {p.display}
                  </text>
                )}
                <text x={x + bw / 2} y={H + 20} textAnchor="middle" className="fill-muted text-[11px]">
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
        <table className="sr-only">
          <tbody>
            {chart.points.map((p) => (
              <tr key={p.label}>
                <th scope="row">{p.label}</th>
                <td>{p.display}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
}

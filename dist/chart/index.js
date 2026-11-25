import { cn } from '../chunk-7EOSDFS3.js';
import { ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { jsxs, jsx } from 'react/jsx-runtime';

var SERIES = [
  "var(--voga-series-1)",
  "var(--voga-series-2)",
  "var(--voga-series-3)",
  "var(--voga-series-4)",
  "var(--voga-series-5)",
  "var(--voga-series-6)",
  "var(--voga-series-7)",
  "var(--voga-series-8)"
];
function seriesColor(index) {
  if (index >= SERIES.length) {
    throw new Error(
      `Voga: a nona s\xE9rie n\xE3o tem cor. Agrupe o excedente em "Outros", separe em pain\xE9is pequenos, ou use outra codifica\xE7\xE3o. Ciclar a paleta faz duas s\xE9ries virarem a mesma coisa.`
    );
  }
  return SERIES[index];
}
function Chart({ className, height = 240, caption, children, ...props }) {
  return /* @__PURE__ */ jsxs("figure", { className: cn("voga-chart", className), style: { margin: 0 }, ...props, children: [
    caption ? /* @__PURE__ */ jsx("figcaption", { className: "voga-chart__tip-head", style: { marginBottom: 8 }, children: caption }) : null,
    /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height, children })
  ] });
}
function ChartTooltip({
  format,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Tooltip,
    {
      cursor: { fill: "var(--voga-plate-soft)" },
      content: ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return /* @__PURE__ */ jsxs("div", { className: "voga-glass voga-chart__tip", children: [
          label != null ? /* @__PURE__ */ jsx("p", { className: "voga-chart__tip-head", children: String(label) }) : null,
          payload.map((row, i) => /* @__PURE__ */ jsxs("div", { className: "voga-chart__tip-row", children: [
            /* @__PURE__ */ jsx("span", { className: "voga-chart__swatch", style: { background: row.color }, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { className: "voga-chart__tip-name", children: row.name }),
            /* @__PURE__ */ jsx("span", { children: format ? format(row.value, row.name) : row.value })
          ] }, `${row.dataKey ?? i}`))
        ] });
      },
      ...props
    }
  );
}
function ChartLegend(props) {
  return /* @__PURE__ */ jsx(
    Legend,
    {
      content: ({ payload }) => /* @__PURE__ */ jsx("div", { className: "voga-chart__legend", children: payload?.map((row, i) => /* @__PURE__ */ jsxs("span", { className: "voga-chart__legend-item", children: [
        /* @__PURE__ */ jsx("span", { className: "voga-chart__swatch", style: { background: row.color }, "aria-hidden": "true" }),
        row.value
      ] }, `${row.value}-${i}`)) }),
      ...props
    }
  );
}

export { Chart, ChartLegend, ChartTooltip, SERIES, seriesColor };

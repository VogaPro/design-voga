import * as React from "react";
import { Legend, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "../lib/cn";

/**
 * Moldura de gráfico. O `recharts` entra como peer OPCIONAL: só quem importa
 * `@voga/ui/chart` precisa instalar.
 *
 * A ordem das séries é FIXA. Uma 9ª série nunca ganha cor nova — ela vira
 * "Outros", vira painel pequeno, ou vira outra codificação.
 */
export const SERIES = [
  "var(--voga-series-1)",
  "var(--voga-series-2)",
  "var(--voga-series-3)",
  "var(--voga-series-4)",
  "var(--voga-series-5)",
  "var(--voga-series-6)",
  "var(--voga-series-7)",
  "var(--voga-series-8)",
] as const;

/** A cor da série pela posição dela. Acima de 8, agrupe — não cicle. */
export function seriesColor(index: number): string {
  if (index >= SERIES.length) {
    throw new Error(
      `Voga: a nona série não tem cor. Agrupe o excedente em "Outros", separe em painéis pequenos, ` +
        `ou use outra codificação. Ciclar a paleta faz duas séries virarem a mesma coisa.`,
    );
  }
  return SERIES[index]!;
}

export interface ChartProps extends React.ComponentPropsWithoutRef<"figure"> {
  /** Altura do desenho, em px. O gráfico ocupa a largura toda. */
  height?: number;
  /** O título vira o `<figcaption>` — quem lê com leitor de tela ouve primeiro. */
  caption?: React.ReactNode;
}

export function Chart({ className, height = 240, caption, children, ...props }: ChartProps) {
  return (
    <figure className={cn("voga-chart", className)} style={{ margin: 0 }} {...props}>
      {caption ? (
        <figcaption className="voga-chart__tip-head" style={{ marginBottom: 8 }}>
          {caption}
        </figcaption>
      ) : null}
      <ResponsiveContainer width="100%" height={height}>
        {children as React.ReactElement}
      </ResponsiveContainer>
    </figure>
  );
}

interface TipPayload {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string | number;
}

/** Dica em vidro. O número à direita; o nome em tinta fraca; a cor só na marca. */
export function ChartTooltip({
  format,
  ...props
}: Omit<React.ComponentProps<typeof Tooltip>, "content"> & {
  format?: (value: number | string, name?: string) => React.ReactNode;
}) {
  return (
    <Tooltip
      cursor={{ fill: "var(--voga-plate-soft)" }}
      content={({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return (
          <div className="voga-glass voga-chart__tip">
            {label != null ? <p className="voga-chart__tip-head">{String(label)}</p> : null}
            {(payload as readonly TipPayload[]).map((row, i) => (
              <div className="voga-chart__tip-row" key={`${row.dataKey ?? i}`}>
                <span className="voga-chart__swatch" style={{ background: row.color }} aria-hidden="true" />
                <span className="voga-chart__tip-name">{row.name}</span>
                <span>{format ? format(row.value!, row.name) : row.value}</span>
              </div>
            ))}
          </div>
        );
      }}
      {...props}
    />
  );
}

/**
 * Legenda. Sempre presente a partir de duas séries — a separação sob
 * daltonismo da pior vizinhança desta paleta cai na banda em que a cor sozinha
 * não basta, então a identidade nunca fica só na cor.
 */
export function ChartLegend(props: Omit<React.ComponentProps<typeof Legend>, "content">) {
  return (
    <Legend
      content={({ payload }) => (
        <div className="voga-chart__legend">
          {payload?.map((row, i) => (
            <span className="voga-chart__legend-item" key={`${row.value}-${i}`}>
              <span className="voga-chart__swatch" style={{ background: row.color }} aria-hidden="true" />
              {row.value}
            </span>
          ))}
        </div>
      )}
      {...props}
    />
  );
}

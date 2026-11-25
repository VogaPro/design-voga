import * as React from 'react';
import { Legend, Tooltip } from 'recharts';

/**
 * Moldura de gráfico. O `recharts` entra como peer OPCIONAL: só quem importa
 * `@voga/ui/chart` precisa instalar.
 *
 * A ordem das séries é FIXA. Uma 9ª série nunca ganha cor nova — ela vira
 * "Outros", vira painel pequeno, ou vira outra codificação.
 */
declare const SERIES: readonly ["var(--voga-series-1)", "var(--voga-series-2)", "var(--voga-series-3)", "var(--voga-series-4)", "var(--voga-series-5)", "var(--voga-series-6)", "var(--voga-series-7)", "var(--voga-series-8)"];
/** A cor da série pela posição dela. Acima de 8, agrupe — não cicle. */
declare function seriesColor(index: number): string;
interface ChartProps extends React.ComponentPropsWithoutRef<"figure"> {
    /** Altura do desenho, em px. O gráfico ocupa a largura toda. */
    height?: number;
    /** O título vira o `<figcaption>` — quem lê com leitor de tela ouve primeiro. */
    caption?: React.ReactNode;
}
declare function Chart({ className, height, caption, children, ...props }: ChartProps): React.JSX.Element;
/** Dica em vidro. O número à direita; o nome em tinta fraca; a cor só na marca. */
declare function ChartTooltip({ format, ...props }: Omit<React.ComponentProps<typeof Tooltip>, "content"> & {
    format?: (value: number | string, name?: string) => React.ReactNode;
}): React.JSX.Element;
/**
 * Legenda. Sempre presente a partir de duas séries — a separação sob
 * daltonismo da pior vizinhança desta paleta cai na banda em que a cor sozinha
 * não basta, então a identidade nunca fica só na cor.
 */
declare function ChartLegend(props: Omit<React.ComponentProps<typeof Legend>, "content">): React.JSX.Element;

export { Chart, ChartLegend, type ChartProps, ChartTooltip, SERIES, seriesColor };

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Chart, ChartLegend, ChartTooltip, seriesColor } from "@voga/ui/chart";
import { DataTable, type ColumnDef } from "@voga/ui/data-table";
import { Chip, Meta } from "@voga/ui";
import { Pane, Section } from "./chrome";

const MESES = [
  { mes: "jun", instalacoes: 820, downloads: 1240, erros: 14 },
  { mes: "jul", instalacoes: 1010, downloads: 1880, erros: 9 },
  { mes: "ago", instalacoes: 1240, downloads: 2410, erros: 11 },
  { mes: "set", instalacoes: 1180, downloads: 2890, erros: 6 },
  { mes: "out", instalacoes: 1620, downloads: 3420, erros: 4 },
  { mes: "nov", instalacoes: 1980, downloads: 4110, erros: 3 },
];

interface Pacote {
  nome: string;
  versao: string;
  kb: number;
  deps: number;
}

const PACOTES: Pacote[] = [
  { nome: "@voga/ui", versao: "0.3.0", kb: 20.5, deps: 24 },
  { nome: "@voga/ui/chart", versao: "0.3.0", kb: 2.7, deps: 1 },
  { nome: "@voga/ui/form", versao: "0.3.0", kb: 1.7, deps: 1 },
  { nome: "@voga/ui/data-table", versao: "0.3.0", kb: 0.8, deps: 1 },
  { nome: "@radix-ui/react-dialog", versao: "1.1.6", kb: 18.2, deps: 9 },
  { nome: "@radix-ui/react-select", versao: "2.4.1", kb: 31.4, deps: 12 },
  { nome: "cmdk", versao: "1.1.1", kb: 14.8, deps: 2 },
  { nome: "sonner", versao: "2.0.8", kb: 11.3, deps: 0 },
  { nome: "vaul", versao: "1.1.2", kb: 9.6, deps: 1 },
  { nome: "embla-carousel-react", versao: "8.6.0", kb: 12.1, deps: 1 },
  { nome: "react-day-picker", versao: "10.0.2", kb: 28.7, deps: 1 },
  { nome: "input-otp", versao: "1.5.0", kb: 6.4, deps: 0 },
];

const COLUNAS: ColumnDef<Pacote, unknown>[] = [
  { accessorKey: "nome", header: "Pacote", cell: (c) => <code>{String(c.getValue())}</code> },
  { accessorKey: "versao", header: "Versão" },
  {
    accessorKey: "kb",
    header: "Tamanho",
    cell: (c) => `${Number(c.getValue()).toLocaleString("pt-BR")} KB`,
  },
  { accessorKey: "deps", header: "Dependências" },
];

const eixo = { stroke: "var(--voga-line-2)", tickLine: false, axisLine: false } as const;

export function Charts() {
  return (
    <Section
      id="graficos"
      title="Gráficos e tabela de dados"
      lead="A paleta de série foi validada nos dois temas: faixa de lightness, piso de croma, separação sob daltonismo e contraste 3:1. A legenda é sempre presente — a identidade nunca fica só na cor."
    >
      <Pane title="Chart" note="@voga/ui/chart · recharts como peer opcional">
        <div className="grid gap-4 lg:grid-cols-2">
          <Chart caption="Instalações e downloads por mês" height={220}>
            <AreaChart data={MESES} margin={{ top: 4, right: 8, bottom: 0, left: -12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="mes" {...eixo} />
              <YAxis {...eixo} />
              <ChartTooltip format={(v) => Number(v).toLocaleString("pt-BR")} />
              <ChartLegend />
              <Area
                type="monotone"
                dataKey="downloads"
                name="Downloads"
                stroke={seriesColor(0)}
                fill={seriesColor(0)}
                fillOpacity={0.14}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="instalacoes"
                name="Instalações"
                stroke={seriesColor(1)}
                fill={seriesColor(1)}
                fillOpacity={0.14}
                strokeWidth={2}
              />
            </AreaChart>
          </Chart>

          <Chart caption="Erros reportados por mês" height={220}>
            <BarChart data={MESES} margin={{ top: 4, right: 8, bottom: 0, left: -12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="mes" {...eixo} />
              <YAxis {...eixo} />
              <ChartTooltip />
              <Bar dataKey="erros" name="Erros" fill={seriesColor(6)} radius={[4, 4, 0, 0]} />
            </BarChart>
          </Chart>

          <Chart caption="Instalações — uma série, sem legenda" height={200} className="lg:col-span-2">
            <LineChart data={MESES} margin={{ top: 4, right: 8, bottom: 0, left: -12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="mes" {...eixo} />
              <YAxis {...eixo} />
              <ChartTooltip format={(v) => Number(v).toLocaleString("pt-BR")} />
              <Line
                type="monotone"
                dataKey="instalacoes"
                name="Instalações"
                stroke={seriesColor(0)}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </Chart>
        </div>
        <Meta>
          Uma série só não leva legenda — o título já nomeia ela. A partir de duas, a legenda é
          obrigatória.
        </Meta>
      </Pane>

      <Pane title="DataTable" note="@voga/ui/data-table · @tanstack/react-table como peer opcional">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>Clique no cabeçalho para ordenar</Chip>
          <Chip>Busca filtra por pacote</Chip>
          <Chip>12 linhas, 10 por página</Chip>
        </div>
        <DataTable
          columns={COLUNAS}
          data={PACOTES}
          searchColumn="nome"
          searchPlaceholder="Buscar pacote…"
          pageSize={6}
        />
      </Pane>
    </Section>
  );
}

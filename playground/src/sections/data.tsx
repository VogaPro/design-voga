import { useState } from "react";
import {
  AspectRatio,
  Button,
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselSlide,
  Chip,
  Choice,
  CodeInput,
  Combobox,
  DatePicker,
  Field,
  Input,
  InputAffix,
  InputGroup,
  Meta,
  Meter,
  Pane as ResizePane,
  PaneHandle,
  Panels,
  Prose,
  Radio,
  RadioGroup,
  ScrollArea,
  Slider,
  Steps,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableHeader,
  TableRow,
  TableWrap,
  Toggle,
} from "@voga/ui";
import { AtSign, Bold, DollarSign, Italic, Search, Underline } from "lucide-react";
import { Pane, Section, Specs } from "./chrome";

const LINHAS = [
  { pacote: "@voga/ui", versao: "0.3.0", tamanho: 20.5, estado: "ok" as const },
  { pacote: "@voga/ui/chart", versao: "0.3.0", tamanho: 2.7, estado: "ok" as const },
  { pacote: "@voga/ui/form", versao: "0.3.0", tamanho: 1.7, estado: "ok" as const },
  { pacote: "@voga/ui/data-table", versao: "0.3.0", tamanho: 0.8, estado: "attention" as const },
];

const AMBIENTES = [
  { value: "prod", label: "Produção", desc: "Afeta quem está usando agora" },
  { value: "homolog", label: "Homologação" },
  { value: "local", label: "Local" },
  { value: "preview", label: "Pré-visualização", desc: "Um por pull request" },
];

export function Data() {
  const [uso, setUso] = useState([62]);
  const [plano, setPlano] = useState("mensal");
  const [ambiente, setAmbiente] = useState("prod");
  const [data, setData] = useState<Date | undefined>(new Date());
  const [negrito, setNegrito] = useState(true);
  const [italico, setItalico] = useState(false);

  return (
    <Section
      id="dados"
      title="Dados e medida"
      lead="O trilho de um medidor é tinta translúcida, não superfície — então ele aparece igual num card elevado e num poço."
    >
      <Pane title="Table" note="cabeçalho fixo no poço, hairline entre linhas, algarismos tabulares">
        <TableWrap>
          <Table hover>
            <TableHead>
              <TableRow>
                <TableHeader>Pacote</TableHeader>
                <TableHeader>Versão</TableHeader>
                <TableHeader alignment="end">Tamanho</TableHeader>
                <TableHeader>Estado</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {LINHAS.map((l) => (
                <TableRow key={l.pacote}>
                  <TableCell><code>{l.pacote}</code></TableCell>
                  <TableCell>{l.versao}</TableCell>
                  <TableCell alignment="end">{l.tamanho.toLocaleString("pt-BR")} KB</TableCell>
                  <TableCell>
                    <Chip tone={l.estado}>{l.estado === "ok" ? "publicado" : "sem teste"}</Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFoot>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell />
                <TableCell alignment="end">25,7 KB</TableCell>
                <TableCell />
              </TableRow>
            </TableFoot>
          </Table>
        </TableWrap>
      </Pane>

      <Pane title="Meter · Steps · Slider" note="o trilho é tinta translúcida, não superfície">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="flex items-baseline justify-between">
              <span style={{ fontSize: "var(--voga-text-sm)", fontWeight: 600 }}>Uso do plano</span>
              <Meta>62 de 100 GB · limite em 80</Meta>
            </div>
            <Meter className="mt-2" value={62} mark={80} />
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span style={{ fontSize: "var(--voga-text-sm)", fontWeight: 600 }}>Quase no limite</span>
              <Meta>91 de 100 GB</Meta>
            </div>
            <Meter className="mt-2" value={91} tone="attention" />
          </div>
          <div>
            <span style={{ fontSize: "var(--voga-text-sm)", fontWeight: 600 }}>Indeterminado</span>
            <Meter className="mt-2" />
          </div>
          <div>
            <span style={{ fontSize: "var(--voga-text-sm)", fontWeight: 600 }}>Passos do build</span>
            <Steps className="mt-2" total={5} done={3} running />
            <Meta>3 de 5 · compilando tipos</Meta>
          </div>
        </div>
        <Field label={`Amostragem — ${uso[0]}%`}>
          <Slider value={uso} onValueChange={setUso} max={100} step={1} aria-label="Amostragem" />
        </Field>
      </Pane>

      <Pane title="RadioGroup · Choice · Toggle · Combobox · DatePicker">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Cobrança">
            <RadioGroup value={plano} onValueChange={setPlano}>
              <Choice value="mensal" title="Mensal" desc="R$ 49 por mês, cancela quando quiser" />
              <Choice value="anual" title="Anual" desc="R$ 490 por ano — dois meses de graça" />
            </RadioGroup>
          </Field>
          <div className="flex flex-col gap-4">
            <Field label="Visibilidade">
              <RadioGroup value={plano} onValueChange={setPlano} style={{ gap: "var(--voga-space-2)" }}>
                <label className="voga-control-row">
                  <Radio value="mensal" /> Privado
                </label>
                <label className="voga-control-row">
                  <Radio value="anual" /> Público
                </label>
              </RadioGroup>
            </Field>
            <Field label="Ambiente" htmlFor="pg-amb">
              <Combobox id="pg-amb" options={AMBIENTES} value={ambiente} onChange={setAmbiente} />
            </Field>
            <Field label="Data da publicação" htmlFor="pg-data">
              <DatePicker id="pg-data" value={data} onChange={setData} />
            </Field>
          </div>
        </div>
        <Specs label="Toggle — ligado afunda, não pinta">
          <Toggle pressed={negrito} onPressedChange={setNegrito} iconOnly aria-label="Negrito">
            <Bold className="voga-icon" />
          </Toggle>
          <Toggle pressed={italico} onPressedChange={setItalico} iconOnly aria-label="Itálico">
            <Italic className="voga-icon" />
          </Toggle>
          <Toggle iconOnly aria-label="Sublinhado">
            <Underline className="voga-icon" />
          </Toggle>
          <Toggle>Mostrar grade</Toggle>
        </Specs>
      </Pane>

      <Pane title="InputGroup · CodeInput">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Domínio" htmlFor="pg-dom" hint="O prefixo e o sufixo são parte do mesmo controle.">
            <InputGroup>
              <InputAffix boxed>https://</InputAffix>
              <Input id="pg-dom" defaultValue="voga" aria-describedby="pg-dom-desc" />
              <InputAffix boxed>.chat</InputAffix>
            </InputGroup>
          </Field>
          <Field label="Buscar" htmlFor="pg-busca">
            <InputGroup>
              <InputAffix icon={Search} />
              <Input id="pg-busca" placeholder="Nome do pacote" />
            </InputGroup>
          </Field>
          <Field label="Preço" htmlFor="pg-preco">
            <InputGroup>
              <InputAffix icon={DollarSign} />
              <Input id="pg-preco" defaultValue="49,00" />
              <InputAffix boxed>BRL</InputAffix>
            </InputGroup>
          </Field>
          <Field label="Usuário" htmlFor="pg-user">
            <InputGroup>
              <InputAffix icon={AtSign} />
              <Input id="pg-user" defaultValue="caio" />
              <Button variant="ghost">Verificar</Button>
            </InputGroup>
          </Field>
          <Field label="Código de verificação" hint="Mandamos por e-mail." className="sm:col-span-2">
            <CodeInput maxLength={6} grouped />
          </Field>
        </div>
      </Pane>

      <Pane title="Carousel · ScrollArea · AspectRatio · Panels">
        <Carousel label="Pacotes">
          {["Tokens", "Botão", "Campo", "Menu", "Diálogo", "Tabela", "Gráfico", "Paleta"].map((nome) => (
            <CarouselSlide key={nome} style={{ width: 180 }}>
              <Card interactive>
                <CardHeader>
                  <CardTitle style={{ fontSize: "var(--voga-text-md)" }}>{nome}</CardTitle>
                  <CardDescription>Arraste a fileira</CardDescription>
                </CardHeader>
                <CardBody>
                  <AspectRatio ratio={16 / 9}>
                    <div style={{ background: "var(--voga-sunken)" }} />
                  </AspectRatio>
                </CardBody>
              </Card>
            </CarouselSlide>
          ))}
        </Carousel>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: "var(--voga-text-md)" }}>ScrollArea</CardTitle>
              <CardDescription>Barra fina de tinta, igual nos dois sistemas.</CardDescription>
            </CardHeader>
            <CardBody>
              <ScrollArea style={{ height: 140 }}>
                <div className="flex flex-col gap-2 pr-3">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="voga-row" style={{ paddingInline: 0 }}>
                      <span className="voga-row__title">Commit {12 - i}</span>
                      <Meta style={{ marginLeft: "auto" }}>há {i + 1}h</Meta>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: "var(--voga-text-md)" }}>Panels</CardTitle>
              <CardDescription>Arraste a divisa no meio.</CardDescription>
            </CardHeader>
            <CardBody>
              <Panels direction="horizontal" style={{ height: 140, borderRadius: "var(--voga-radius-item)", overflow: "hidden", boxShadow: "inset 0 0 0 1px var(--voga-line)" }}>
                <ResizePane defaultSize={45} minSize={20}>
                  <div style={{ padding: "var(--voga-space-3)", fontSize: "var(--voga-text-sm)", color: "var(--voga-muted)" }}>
                    Fonte
                  </div>
                </ResizePane>
                <PaneHandle grip />
                <ResizePane minSize={20}>
                  <div style={{ padding: "var(--voga-space-3)", fontSize: "var(--voga-text-sm)", color: "var(--voga-muted)" }}>
                    Pré-visualização
                  </div>
                </ResizePane>
              </Panels>
            </CardBody>
          </Card>
        </div>
      </Pane>

      <Pane title="Prose" note="para o que vem de markdown ou de um CMS">
        <Prose>
          <h2>A regra de ouro</h2>
          <p>
            Componente nunca vê cor crua. Só <code>bg-primary</code>, <code>text-muted</code>,{" "}
            <code>border-line</code> — é isso que faz dark mode e rebrand funcionarem sem abrir um{" "}
            <code>.tsx</code>.
          </p>
          <blockquote>Se todo botão for colorido, a cor para de significar.</blockquote>
          <h3>Como trocar a marca</h3>
          <ol>
            <li>Abra <code>src/styles/tokens.css</code>.</li>
            <li>Troque <code>--voga-accent</code>, <code>--voga-accent-2</code> e <code>--voga-accent-soft</code>.</li>
            <li>Rode <code>bun run audit</code> para conferir o contraste nos dois temas.</li>
          </ol>
          <pre>
            <code>bun run check</code>
          </pre>
        </Prose>
      </Pane>
    </Section>
  );
}

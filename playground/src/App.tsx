import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Chip,
  Composer,
  ControlRow,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Eyebrow,
  Field,
  Form,
  Input,
  Kbd,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
  Meta,
  Note,
  Row,
  Rows,
  Segmented,
  SegmentedItem,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tip,
  Toolbar,
  Well,
  useTheme,
} from "@voga/ui";
import {
  Archive,
  Bold,
  Check,
  CircleAlert,
  Clock,
  Code,
  Italic,
  MoreVertical,
  Pencil,
  Plus,
  Send,
  Trash2,
} from "lucide-react";

import { Charts } from "./sections/charts";
import { Data } from "./sections/data";
import { Nav } from "./sections/nav";
import { Overlays } from "./sections/overlays";
import { Pane, Specs } from "./sections/chrome";

const SURFACES = [
  ["bg", "fundo do app"],
  ["pane", "área de trabalho"],
  ["raised", "card, diálogo"],
  ["raised-2", "dentro de elevado"],
  ["sunken", "trilho, poço"],
  ["side", "barra lateral"],
] as const;

const INKS = [
  ["ink", "Texto principal e ação primária"],
  ["ink-2", "Corpo de texto longo"],
  ["muted", "Texto secundário, placeholder"],
  ["faint", "Metadado, rótulo de seção"],
  ["line-strong", "Borda de controle e anel de foco · 3:1"],
] as const;

/* ── a página ──────────────────────────────────────────────────────────── */

export function App() {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [checks, setChecks] = useState({ registro: true, changelog: "indeterminate" as const, assinar: false });
  const [autoTheme, setAutoTheme] = useState(true);
  const [telemetria, setTelemetria] = useState(false);
  const [densidade, setDensidade] = useState("padrao");
  const [visibilidade, setVisibilidade] = useState("privado");
  const [fixar, setFixar] = useState(true);

  return (
    <>
      <header
        className="sticky z-[1100]"
        style={{
          top: 0,
          background: "color-mix(in oklab, var(--voga-bg) 86%, transparent)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--voga-line)",
        }}
      >
        <div className="pg-shell flex flex-wrap items-center gap-x-4 gap-y-2 py-2.5">
          <div className="flex items-center gap-2">
            <Avatar size="sm" mark fallback="V" />
            <span className="text-lg font-bold tracking-tighter">voga</span>
            <Meta>playground local</Meta>
          </div>
          <nav className="order-3 -mx-1 flex w-full gap-0.5 overflow-x-auto sm:order-none sm:mx-0 sm:w-auto" aria-label="Seções">
            <Button variant="ghost" size="sm" asChild><a href="#cor">Cor</a></Button>
            <Button variant="ghost" size="sm" asChild><a href="#regua">Régua</a></Button>
            <Button variant="ghost" size="sm" asChild><a href="#profundidade">Profundidade</a></Button>
            <Button variant="ghost" size="sm" asChild><a href="#tipo">Tipo</a></Button>
            <Button variant="ghost" size="sm" asChild><a href="#componentes">Base</a></Button>
            <Button variant="ghost" size="sm" asChild><a href="#sobreposicoes">Sobreposições</a></Button>
            <Button variant="ghost" size="sm" asChild><a href="#navegacao">Navegação</a></Button>
            <Button variant="ghost" size="sm" asChild><a href="#dados">Dados</a></Button>
            <Button variant="ghost" size="sm" asChild><a href="#graficos">Gráficos</a></Button>
          </nav>
          <Segmented
            size="sm"
            className="ml-auto"
            value={theme}
            onValueChange={(v) => v && setTheme(v as typeof theme)}
            aria-label="Tema"
          >
            <SegmentedItem value="light">Claro</SegmentedItem>
            <SegmentedItem value="system">Sistema</SegmentedItem>
            <SegmentedItem value="dark">Escuro</SegmentedItem>
          </Segmented>
        </div>
      </header>

      <main className="pg-shell pb-20">
        {/* ── abertura ── */}
        <section className="py-12 sm:py-16">
          <Eyebrow>Design system</Eyebrow>
          <h1 className="mt-3 max-w-2xl" style={{ fontSize: "var(--voga-text-display)" }}>
            Neutro primeiro. A cor é reservada.
          </h1>
          <p className="mt-4 max-w-xl text-lg" style={{ color: "var(--voga-muted)" }}>
            Esta página roda os componentes de verdade, importados do fonte. Mexa neles: tudo que você
            vê aqui é o que o pacote entrega.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Chip>57 componentes</Chip>
            <Chip>OKLCH</Chip>
            <Chip>Tailwind opcional</Chip>
            <Chip icon={Check} tone="ok">auditoria zerada</Chip>
          </div>
          <Note className="mt-8" tone="info" title="Aperte Tab">
            O anel de foco só aparece para quem navega pelo teclado. Clique em qualquer lugar e ele
            desaparece de novo — é o <code>trackPointer()</code> funcionando.
          </Note>
        </section>

        {/* ── cor ── */}
        <section id="cor" className="pg-section">
          <h2>Cor</h2>
          <Eyebrow className="mt-7">Superfícies — a escada de papel</Eyebrow>
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {SURFACES.map(([name, role]) => (
              <div key={name}>
                <div className="pg-swatch" style={{ background: `var(--voga-${name})` }} />
                <p className="mt-2 text-sm font-medium">{name}</p>
                <Meta>{role}</Meta>
              </div>
            ))}
          </div>

          <Eyebrow className="mt-8">Tinta — quatro degraus, e só</Eyebrow>
          <Card className="mt-3">
            <Rows>
              {INKS.map(([name, role]) => (
                <Row key={name}>
                  <div
                    className="pg-swatch"
                    style={{ width: 36, height: 24, background: `var(--voga-${name})` }}
                  />
                  <div className="voga-row__main">
                    <p className="voga-row__title">{name}</p>
                    <p className="voga-row__sub">{role}</p>
                  </div>
                  <Meta><code>{`--voga-${name}`}</code></Meta>
                </Row>
              ))}
            </Rows>
          </Card>

          <Eyebrow className="mt-8">Cor reservada — cada uma com uma regra</Eyebrow>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardBody>
                <div
                  className="pg-swatch"
                  style={{ background: "linear-gradient(to bottom right, var(--voga-accent-2), var(--voga-accent))" }}
                />
                <p className="mt-3 font-semibold">accent</p>
                <CardDescription className="mt-1">
                  Identidade e seleção. Nunca nome, menção, botão comum ou fundo.
                </CardDescription>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="pg-swatch" style={{ background: "var(--voga-attention)" }} />
                <p className="mt-3 font-semibold">attention</p>
                <CardDescription className="mt-1">Só o que espera uma pessoa, sempre em peça pequena.</CardDescription>
                <Chip tone="attention" icon={Clock} className="mt-3">2 aprovações</Chip>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="pg-swatch" style={{ background: "var(--voga-danger)" }} />
                <p className="mt-3 font-semibold">danger</p>
                <CardDescription className="mt-1">Erro e destrutivo, sempre com palavra ou ícone.</CardDescription>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="pg-swatch" style={{ background: "var(--voga-ok)" }} />
                <p className="mt-3 font-semibold">ok</p>
                <CardDescription className="mt-1">Passo concluído, presença. Discreto por projeto.</CardDescription>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* ── régua ── */}
        <section id="regua" className="pg-section">
          <h2>Régua de controle</h2>
          <p className="mt-2 max-w-xl" style={{ color: "var(--voga-muted)" }}>
            Três alturas, com raio de 30% da altura. Pílula é só para etiqueta que não se pressiona.
          </p>
          <div className="mt-6 flex flex-wrap items-end gap-3">
            <Button size="sm">Compacto 32</Button>
            <Button>Padrão 40</Button>
            <Button size="lg">Tela inteira 48</Button>
            <Input size="sm" defaultValue="32" aria-label="Campo compacto" style={{ width: 110 }} />
            <Input defaultValue="40" aria-label="Campo padrão" style={{ width: 110 }} />
            <Input size="lg" defaultValue="48" aria-label="Campo grande" style={{ width: 110 }} />
          </div>
        </section>

        {/* ── profundidade ── */}
        <section id="profundidade" className="pg-section">
          <h2>Profundidade</h2>
          <p className="mt-2 max-w-xl" style={{ color: "var(--voga-muted)" }}>
            Sombra curta mais anel de hairline — e a luz de 1px no topo, que é o que faz a superfície
            parecer placa e não retângulo.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(["e1", "e2", "e3"] as const).map((level) => (
              <div
                key={level}
                className="p-4"
                style={{
                  borderRadius: "var(--voga-radius-lg)",
                  background: "var(--voga-raised)",
                  boxShadow: `var(--voga-${level}), var(--voga-top)`,
                }}
              >
                <p className="font-semibold">{level} + top</p>
                <CardDescription className="mt-1">
                  {level === "e1"
                    ? "Card, botão secundário, item ativo"
                    : level === "e2"
                      ? "Hover de card interativo, composer"
                      : "Vidro, diálogo, composer em foco"}
                </CardDescription>
              </div>
            ))}
            <div className="voga-chosen p-4" style={{ borderRadius: "var(--voga-radius-lg)" }}>
              <p className="font-semibold">escolhido</p>
              <CardDescription className="mt-1">Afundado como tecla pressionada — nunca cor</CardDescription>
            </div>
          </div>
        </section>

        {/* ── tipo ── */}
        <section id="tipo" className="pg-section">
          <h2>Tipo</h2>
          <p className="mt-2 max-w-xl" style={{ color: "var(--voga-muted)" }}>
            Onest com <code>ss01</code> e <code>tnum</code>. Escala em px, porque controle e texto
            compartilham a mesma régua.
          </p>
          <dl className="mt-6">
            {(
              [
                ["display · 32 / −0.035em", "var(--voga-text-display)", "var(--voga-track-tighter)"],
                ["h1 · 28 / −0.035em", "var(--voga-text-h1)", "var(--voga-track-tighter)"],
                ["h2 · 20 / −0.025em", "var(--voga-text-h2)", "var(--voga-track-tight)"],
                ["h3 · 17", "var(--voga-text-h3)", "var(--voga-track-tight)"],
                ["lg · 16 · busca", "var(--voga-text-lg)", "normal"],
                ["base · 15 · corpo", "var(--voga-text-base)", "normal"],
                ["md · 14.5 · interface", "var(--voga-text-md)", "normal"],
                ["sm · 13 · rótulo", "var(--voga-text-sm)", "normal"],
                ["xs · 12 · meta", "var(--voga-text-xs)", "normal"],
              ] as const
            ).map(([label, size, track]) => (
              <div
                key={label}
                className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-2.5"
                style={{ borderBottom: "1px solid var(--voga-line)" }}
              >
                <dd className="order-2 w-full sm:order-none sm:w-40">
                  <Meta>{label}</Meta>
                </dd>
                <dt style={{ fontSize: size, letterSpacing: track, fontWeight: 600 }}>
                  Remada firme e constante
                </dt>
              </div>
            ))}
          </dl>
        </section>

        {/* ── componentes ── */}
        <section id="componentes" className="pg-section">
          <h2>Componentes</h2>
          <p className="mt-2 max-w-xl" style={{ color: "var(--voga-muted)" }}>
            Lógica e acessibilidade em Radix; o visual em CSS que só lê tokens. Clique, abra, marque.
          </p>

          <Pane title="Button" note="variant · size · icon · iconOnly · kbd · loading · block · asChild">
            <Specs label="Variantes — primary no máximo uma vez por área">
              <Button variant="primary">Salvar alterações</Button>
              <Button>Secundário</Button>
              <Button variant="accent" icon={Plus}>Criar projeto</Button>
              <Button variant="danger" icon={Trash2}>Excluir rampa</Button>
              <Button variant="ghost">Cancelar</Button>
              <Button variant="link" icon={Pencil}>Editar</Button>
            </Specs>
            <Specs label="Atalho, girador, estados, barra de ferramentas">
              <Button variant="primary" icon={Check} kbd={["⌘", "↵"]}>Aprovar</Button>
              <Button
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => setLoading(false), 1800);
                }}
              >
                {loading ? "Publicando" : "Publicar versão"}
              </Button>
              <Button disabled>Desabilitado</Button>
              <Tip content="Mais opções">
                <Button icon={MoreVertical} iconOnly aria-label="Mais opções" />
              </Tip>
              <Toolbar aria-label="Formatação">
                <Button variant="ghost" size="sm" icon={Bold} iconOnly aria-label="Negrito" />
                <Button variant="ghost" size="sm" icon={Italic} iconOnly aria-label="Itálico" />
                <Separator orientation="vertical" style={{ margin: "0 4px", height: 20 }} />
                <Button variant="ghost" size="sm" icon={Code} iconOnly aria-label="Código" />
              </Toolbar>
              <Menu>
                <MenuTrigger asChild>
                  <Button>Menu em vidro</Button>
                </MenuTrigger>
                <MenuContent align="start">
                  <MenuLabel>Projeto</MenuLabel>
                  <MenuItem kbd={["⌘", "R"]}>Renomear</MenuItem>
                  <MenuCheckboxItem checked={fixar} onCheckedChange={setFixar}>
                    Fixar na barra
                  </MenuCheckboxItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">Arquivar</MenuItem>
                </MenuContent>
              </Menu>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="danger">Abrir diálogo</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Excluir a rampa de acento?</DialogTitle>
                    <DialogDescription>
                      Nove projetos leem estes três valores. A ação não tem volta.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="ghost">Cancelar</Button>
                    <Button variant="danger" icon={Trash2}>Excluir rampa</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Specs>
          </Pane>

          <Pane title="Formulário" note="campo branco, contorno fino, cinza só no trilho">
            <Form className="sm:grid sm:grid-cols-2 sm:gap-4" onSubmit={(e) => e.preventDefault()}>
              <Field label="Nome do projeto" required htmlFor="pg-nome" hint="Aparece no cabeçalho de todas as telas.">
                <Input id="pg-nome" defaultValue="Voga" aria-describedby="pg-nome-desc" />
              </Field>
              <Field label="Slug" htmlFor="pg-slug" error="Use só letras minúsculas, números e hífen.">
                <Input id="pg-slug" defaultValue="design voga!" aria-invalid aria-describedby="pg-slug-desc" />
              </Field>
              <Field label="Visibilidade" htmlFor="pg-visib">
                <SelectRoot value={visibilidade} onValueChange={setVisibilidade}>
                  <SelectTrigger id="pg-visib">
                    <SelectValue placeholder="Escolha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="privado">Privado no registro</SelectItem>
                    <SelectItem value="org">Visível para a organização</SelectItem>
                    <SelectItem value="publico">Público</SelectItem>
                  </SelectContent>
                </SelectRoot>
              </Field>
              <Field label="Densidade">
                <Segmented value={densidade} onValueChange={(v) => v && setDensidade(v)}>
                  <SegmentedItem value="compacta">Compacta</SegmentedItem>
                  <SegmentedItem value="padrao">Padrão</SegmentedItem>
                  <SegmentedItem value="ampla">Ampla</SegmentedItem>
                </Segmented>
              </Field>
              <Field label="Descrição" htmlFor="pg-desc" className="sm:col-span-2">
                <Textarea id="pg-desc" rows={2} defaultValue="Tokens e componentes compartilhados entre os projetos." />
              </Field>
            </Form>

            <Tabs defaultValue="geral">
              <TabsList>
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="acesso">Acesso</TabsTrigger>
                <TabsTrigger value="faturamento">Faturamento</TabsTrigger>
              </TabsList>
              <TabsContent value="geral">
                <Rows className="pt-2">
                  <ControlRow>
                    <Checkbox
                      checked={checks.registro}
                      onCheckedChange={(v) => setChecks((c) => ({ ...c, registro: v === true }))}
                    />
                    Publicar no registro privado
                  </ControlRow>
                  <ControlRow>
                    <Checkbox checked="indeterminate" />
                    Gerar changelog
                  </ControlRow>
                  <ControlRow>
                    <Checkbox
                      checked={checks.assinar}
                      onCheckedChange={(v) => setChecks((c) => ({ ...c, assinar: v === true }))}
                    />
                    Assinar os commits
                  </ControlRow>
                  <ControlRow split>
                    <span>
                      Tema automático
                      <span className="voga-row__sub block">Segue o sistema operacional</span>
                    </span>
                    <Switch checked={autoTheme} onCheckedChange={setAutoTheme} />
                  </ControlRow>
                  <ControlRow split>
                    <span>Telemetria</span>
                    <Switch checked={telemetria} onCheckedChange={setTelemetria} />
                  </ControlRow>
                </Rows>
              </TabsContent>
              <TabsContent value="acesso">
                <p className="pt-3" style={{ color: "var(--voga-muted)" }}>Nada aqui ainda.</p>
              </TabsContent>
              <TabsContent value="faturamento">
                <p className="pt-3" style={{ color: "var(--voga-muted)" }}>Nada aqui ainda.</p>
              </TabsContent>
            </Tabs>

            <Composer>
              <textarea rows={1} placeholder="Escreva alguma coisa…" aria-label="Mensagem" />
              <Button variant="primary" icon={Send} iconOnly aria-label="Enviar" />
            </Composer>
          </Pane>

          <Pane title="Chip · Note" note="estado leva ícone, nunca bolinha colorida">
            <Specs label="Chip">
              <Chip>Rascunho</Chip>
              <Chip tone="ok" icon={Check}>Publicado</Chip>
              <Chip tone="attention" icon={Clock}>Espera aprovação</Chip>
              <Chip tone="danger" icon={CircleAlert}>Build quebrado</Chip>
              <Chip tone="accent">v0.2.0</Chip>
              <Chip tone="solid">Novo</Chip>
              <Chip count>7</Chip>
            </Specs>
            <div className="grid gap-4 sm:grid-cols-2">
              <Note title="Tailwind é opcional">
                O visual dos componentes é CSS de verdade. Importe o Tailwind só se quiser os utilitários.
              </Note>
              <Note tone="ok" title="Auditoria zerada">
                <code>bun run audit</code> mede contraste nos dois temas e lê o CSS procurando cor crua.
              </Note>
              <Note tone="attention" title="Duas rampas esperam revisão">
                A barra é âmbar; o fundo continua neutro. A cor nunca toma o card.
              </Note>
              <Note tone="danger" title="Não use cor crua num componente">
                Leia o papel — <code>action</code>, <code>attention</code> — e o tema resolve o resto.
              </Note>
            </div>
          </Pane>

          <Pane title="Card · Rows · Avatar · Skeleton · Kbd" note="card é sempre neutro: o estado vai no chip">
            <div className="grid gap-4 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Equipe</CardTitle>
                  <CardDescription>O estado vai no chip.</CardDescription>
                </CardHeader>
                <CardBody>
                  <Rows>
                    <Row style={{ paddingInline: 0 }}>
                      <Avatar size="sm" fallback="CS" />
                      <div className="voga-row__main">
                        <p className="voga-row__title">Caio Santos</p>
                        <p className="voga-row__sub">Mantenedor</p>
                      </div>
                      <Chip tone="ok">ativo</Chip>
                    </Row>
                    <Row style={{ paddingInline: 0 }}>
                      <Avatar size="sm" mark fallback="V" />
                      <div className="voga-row__main">
                        <p className="voga-row__title">voga-bot</p>
                        <p className="voga-row__sub">Publica as versões</p>
                      </div>
                      <Chip>bot</Chip>
                    </Row>
                  </Rows>
                </CardBody>
                <CardFooter>
                  <Button variant="primary" size="sm">Convidar</Button>
                  <Button variant="link">Ver todos</Button>
                </CardFooter>
              </Card>

              <Card interactive>
                <CardHeader>
                  <CardTitle>Card interativo</CardTitle>
                  <CardDescription>Passe o mouse: e1 → e2.</CardDescription>
                </CardHeader>
                <CardBody>
                  <Well className="p-3">
                    <pre style={{ fontFamily: "var(--voga-font-mono)", fontSize: 12 }}>bun run audit</pre>
                  </Well>
                  <p className="mt-3 flex flex-wrap items-center gap-2 text-sm" style={{ color: "var(--voga-muted)" }}>
                    Trocar tema <Kbd>⌘</Kbd><Kbd>⇧</Kbd><Kbd>D</Kbd>
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Carregando</CardTitle>
                  <CardDescription>Esqueleto em sunken, girador em tinta.</CardDescription>
                </CardHeader>
                <CardBody className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Skeleton style={{ width: 36, height: 36, borderRadius: "var(--voga-radius-full)" }} />
                    <div className="flex-1">
                      <Skeleton style={{ height: 10, width: "70%" }} />
                      <Skeleton className="mt-2" style={{ height: 10, width: "45%" }} />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3" style={{ color: "var(--voga-muted)" }}>
                    <Spinner label="Carregando" />
                    <span className="text-sm">Lendo os tokens…</span>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Pane>
        </section>

        <Overlays />
        <Nav />
        <Data />
        <Charts />

        <footer className="pg-section">
          <Meta>Voga v0.3.0 · React 19 · Radix UI · Onest + Martian Mono</Meta>
          <p className="mt-1" style={{ maxWidth: "46rem" }}>
            <Meta>
              A linguagem visual é inspirada no design system de agentes.chat (AGPL-3.0). Nenhum código
              de lá foi copiado: tokens, CSS e componentes aqui são implementação própria.
            </Meta>
          </p>
        </footer>
      </main>
    </>
  );
}

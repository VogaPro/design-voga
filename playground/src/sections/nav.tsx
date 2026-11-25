import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Chip,
  Empty,
  Item,
  ItemDescription,
  ItemMain,
  ItemMedia,
  ItemSide,
  ItemTitle,
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenuItem,
  NavMenu,
  NavMenuCard,
  NavMenuContent,
  NavMenuItem,
  NavMenuList,
  NavMenuTrigger,
  Pagination,
  Avatar,
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarLabel,
  SplitButton,
} from "@voga/ui";
import { FileText, Hash, Inbox, Package, Settings, Users } from "lucide-react";
import { Pane, Section, Specs } from "./chrome";

export function Nav() {
  const [page, setPage] = useState(3);
  const [grade, setGrade] = useState(true);

  return (
    <Section
      id="navegacao"
      title="Navegação e estrutura"
      lead="A barra lateral tem papel próprio, e a linha escolhida é um degrau de tinta nesse papel — nunca uma cor."
    >
      <Pane title="Breadcrumb · Pagination · ButtonGroup · SplitButton">
        <Breadcrumb>
          <BreadcrumbLink href="#navegacao">Projetos</BreadcrumbLink>
          <BreadcrumbSeparator />
          <BreadcrumbLink href="#navegacao">design-voga</BreadcrumbLink>
          <BreadcrumbSeparator />
          <BreadcrumbCurrent>Tokens</BreadcrumbCurrent>
        </Breadcrumb>

        <Pagination page={page} pages={12} onChange={setPage} />

        <Specs label="Botões que são um controle só">
          <ButtonGroup>
            <Button>Dia</Button>
            <Button>Semana</Button>
            <Button>Mês</Button>
          </ButtonGroup>
          <SplitButton
            variant="primary"
            menu={
              <>
                <MenuItem>Publicar como pré-lançamento</MenuItem>
                <MenuItem>Publicar e marcar tag</MenuItem>
              </>
            }
          >
            Publicar
          </SplitButton>
        </Specs>
      </Pane>

      <Pane title="Menubar · NavMenu" note="a barra é rasa; o painel aberto é vidro">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Arquivo</MenubarTrigger>
            <MenubarContent>
              <MenubarItem kbd={["⌘", "N"]}>Novo projeto</MenubarItem>
              <MenubarItem kbd={["⌘", "O"]}>Abrir…</MenubarItem>
              <MenubarSeparator />
              <MenubarItem tone="danger">Fechar sem salvar</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Ver</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem checked={grade} onCheckedChange={setGrade}>
                Mostrar grade
              </MenubarCheckboxItem>
              <MenubarItem kbd={["⌘", "B"]}>Esconder a barra lateral</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Ajuda</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Documentação</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <NavMenu>
          <NavMenuList>
            <NavMenuItem>
              <NavMenuTrigger>Produto</NavMenuTrigger>
              <NavMenuContent>
                <div className="grid gap-1" style={{ minWidth: 280 }}>
                  <NavMenuCard href="#navegacao" title="Tokens" desc="Cor, espaço, régua e movimento" />
                  <NavMenuCard href="#navegacao" title="Componentes" desc="57 peças em Radix" />
                  <NavMenuCard href="#navegacao" title="Auditoria" desc="Contraste medido nos dois temas" />
                </div>
              </NavMenuContent>
            </NavMenuItem>
            <NavMenuItem>
              <NavMenuTrigger>Empresa</NavMenuTrigger>
              <NavMenuContent>
                <div className="grid gap-1" style={{ minWidth: 240 }}>
                  <NavMenuCard href="#navegacao" title="Sobre" />
                  <NavMenuCard href="#navegacao" title="Contato" />
                </div>
              </NavMenuContent>
            </NavMenuItem>
          </NavMenuList>
        </NavMenu>
      </Pane>

      <Pane title="Sidebar · Item · Empty">
        <div
          style={{
            display: "flex",
            minHeight: 320,
            borderRadius: "var(--voga-radius-lg)",
            overflow: "hidden",
            boxShadow: "inset 0 0 0 1px var(--voga-line)",
          }}
        >
          <Sidebar style={{ width: 200 }}>
            <SidebarGroup>
              <SidebarItem href="#navegacao" icon={Inbox} active side={<Chip count>7</Chip>}>
                Entrada
              </SidebarItem>
              <SidebarItem href="#navegacao" icon={Package}>Pacotes</SidebarItem>
              <SidebarItem href="#navegacao" icon={Users}>Equipe</SidebarItem>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarLabel>Canais</SidebarLabel>
              <SidebarItem href="#navegacao" icon={Hash}>geral</SidebarItem>
              <SidebarItem href="#navegacao" icon={Hash}>design</SidebarItem>
              <SidebarItem href="#navegacao" sub>tokens</SidebarItem>
              <SidebarItem href="#navegacao" sub>componentes</SidebarItem>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarItem href="#navegacao" icon={Settings}>Configurações</SidebarItem>
            </SidebarGroup>
          </Sidebar>
          <div style={{ flex: 1, minWidth: 0, background: "var(--voga-pane)", padding: "var(--voga-space-3)" }}>
            <Item card interactive>
              <ItemMedia>
                <Avatar size="sm" mark fallback="V" />
              </ItemMedia>
              <ItemMain>
                <ItemTitle>@voga/ui</ItemTitle>
                <ItemDescription>Publicado há 2 minutos · 20,5 KB</ItemDescription>
              </ItemMain>
              <ItemSide>
                <Chip tone="ok">v0.3.0</Chip>
              </ItemSide>
            </Item>
            <Item interactive>
              <ItemMedia>
                <FileText className="voga-icon" />
              </ItemMedia>
              <ItemMain>
                <ItemTitle>AUDITORIA.md</ItemTitle>
                <ItemDescription>0 falhas, 0 avisos</ItemDescription>
              </ItemMain>
            </Item>
            <Card variant="flat" className="mt-3">
              <CardBody style={{ padding: 0 }}>
                <Empty
                  size="inline"
                  icon={Inbox}
                  title="Nenhum pacote arquivado"
                  desc="O que você arquivar aparece aqui por 30 dias."
                  actions={<Button size="sm">Ver pacotes ativos</Button>}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </Pane>
    </Section>
  );
}

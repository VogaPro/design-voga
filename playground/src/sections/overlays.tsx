import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  Button,
  Chip,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  Field,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  Kbd,
  Meta,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  toast,
  useCommandShortcut,
} from "@voga/ui";
import { ArrowRight, Hash, Settings, Trash2, User } from "lucide-react";
import { Pane, Section, Specs } from "./chrome";

export function Overlays() {
  const [palette, setPalette] = useState(false);
  useCommandShortcut(() => setPalette(true));

  return (
    <Section
      id="sobreposicoes"
      title="Sobreposições"
      lead="Tudo que flutua é vidro em e3, entra subindo e fecha na hora. Clique para abrir — é tudo de verdade."
    >
      <Pane title="Popover · HoverCard · ContextMenu" note="vidro, raio de card, altura limitada pela janela">
        <Specs label="Abra cada um">
          <Popover>
            <PopoverTrigger asChild>
              <Button>Popover</Button>
            </PopoverTrigger>
            <PopoverContent arrow>
              <Field label="Convidar por e-mail" htmlFor="pg-pop" hint="A pessoa recebe o link na hora.">
                <Input id="pg-pop" placeholder="nome@empresa.com" />
              </Field>
              <div className="mt-3 flex justify-end gap-2">
                <Button variant="ghost" size="sm">Cancelar</Button>
                <Button variant="primary" size="sm">Enviar convite</Button>
              </div>
            </PopoverContent>
          </Popover>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@caio</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex items-start gap-3">
                <Avatar fallback="CS" />
                <div>
                  <p style={{ fontWeight: 600 }}>Caio Santos</p>
                  <Meta>Mantenedor · 142 commits</Meta>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <ContextMenu>
            <ContextMenuTrigger asChild>
              <Button variant="default">Clique com o botão direito</Button>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>Arquivo</ContextMenuLabel>
              <ContextMenuItem kbd={["⌘", "D"]}>Duplicar</ContextMenuItem>
              <ContextMenuItem kbd={["⌘", "C"]}>Copiar caminho</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem tone="danger">Excluir</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Specs>
      </Pane>

      <Pane title="Sheet · Drawer · AlertDialog · Toast" note="o painel desliza com a curva de painel; a gaveta arrasta">
        <Specs label="Abra cada um">
          <Sheet>
            <SheetTrigger asChild>
              <Button>Painel lateral</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Configurações do projeto</SheetTitle>
                <SheetDescription>As mudanças valem para todos os ambientes.</SheetDescription>
              </SheetHeader>
              <Field label="Nome" htmlFor="pg-sheet">
                <Input id="pg-sheet" defaultValue="Voga" />
              </Field>
              <SheetFooter>
                <Button variant="ghost">Cancelar</Button>
                <Button variant="primary">Salvar</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Drawer>
            <DrawerTrigger asChild>
              <Button>Gaveta</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerTitle>Escolha um ambiente</DrawerTitle>
              <DrawerDescription>Arraste para baixo para fechar.</DrawerDescription>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="default" block>Produção</Button>
                <Button variant="default" block>Homologação</Button>
                <Button variant="default" block>Local</Button>
              </div>
            </DrawerContent>
          </Drawer>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="danger" icon={Trash2}>Excluir projeto</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir o projeto Voga?</AlertDialogTitle>
                <AlertDialogDescription>
                  Nove repositórios dependem deste pacote. A ação não tem volta e não fecha
                  clicando fora.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="ghost">Cancelar</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button variant="danger" icon={Trash2}>Excluir projeto</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button onClick={() => toast.success("Versão publicada", { description: "v0.3.0 está no registro." })}>
            Torrada de sucesso
          </Button>
          <Button onClick={() => toast.error("Build falhou", { description: "O passo de tipos quebrou em 2 arquivos." })}>
            Torrada de erro
          </Button>
        </Specs>
      </Pane>

      <Pane title="Paleta de comandos" note="⌘K abre de qualquer lugar desta página">
        <Specs label="Abra com o teclado ou pelo botão">
          <Button onClick={() => setPalette(true)}>
            Buscar
            <span className="voga-menu__shortcut">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
          </Button>
          <Chip>Setas navegam · Enter escolhe · Esc fecha</Chip>
        </Specs>
        <CommandDialog open={palette} onOpenChange={setPalette}>
          <CommandInput placeholder="Buscar projeto, pessoa ou ação…" />
          <CommandList>
            <CommandEmpty>Nada encontrado.</CommandEmpty>
            <CommandGroup heading="Ir para">
              <CommandItem onSelect={() => setPalette(false)}>
                <Hash className="voga-icon" /> design-voga
              </CommandItem>
              <CommandItem onSelect={() => setPalette(false)}>
                <User className="voga-icon" /> Caio Santos
              </CommandItem>
              <CommandItem onSelect={() => setPalette(false)}>
                <Settings className="voga-icon" /> Configurações
                <CommandShortcut>
                  <Kbd>⌘</Kbd>
                  <Kbd>,</Kbd>
                </CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Ações">
              <CommandItem onSelect={() => setPalette(false)}>
                <ArrowRight className="voga-icon" /> Publicar nova versão
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Pane>

      <Pane title="Accordion · Collapsible" note="hairline entre as linhas, nunca abaixo da última">
        <Accordion type="single" collapsible defaultValue="a">
          <AccordionItem value="a">
            <AccordionTrigger>Por que a ação primária é tinta?</AccordionTrigger>
            <AccordionContent>
              Porque se todo botão for colorido, a cor para de significar. Com a ação em tinta, o
              acento sobra para identidade e o âmbar para o que espera uma pessoa.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>O que é a régua de controle?</AccordionTrigger>
            <AccordionContent>
              Três alturas — 32, 40 e 48 — com raio de 30% da altura. Botão, campo e select
              compartilham a mesma régua, então nada fica meio alinhado.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="c">
            <AccordionTrigger>Preciso do Tailwind?</AccordionTrigger>
            <AccordionContent>
              Não. O visual dos componentes é CSS com prefixo <code>voga-</code>. O Tailwind é
              opcional e serve para o código do seu app.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Collapsible>
          <CollapsibleTrigger>Opções avançadas</CollapsibleTrigger>
          <CollapsibleContent>
            O que a maioria nunca precisa abrir fica atrás de uma linha quieta — não de um card
            inteiro pedindo atenção.
          </CollapsibleContent>
        </Collapsible>
      </Pane>
    </Section>
  );
}

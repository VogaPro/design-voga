# Prompt para refatorar um projeto inteiro para o Voga

Cole o bloco abaixo na raiz do projeto que você quer migrar. A skill
`voga-design-system` dispara pelo nome "Voga" na primeira linha.

---

## Completo (use este)

```
Refatore o design deste projeto inteiro para o design system Voga, usando a skill
voga-design-system. Não quero remendo: quero o sistema todo, e o antigo removido.

Antes de mudar qualquer arquivo, me entregue um inventário:
1. Qual sistema de UI existe hoje (shadcn, MUI, Chakra, Bootstrap, CSS à mão, Tailwind cru)
2. Onde vivem os tokens/tema atuais, e se há dark mode
3. Quantos componentes próprios existem e quais são composição do que o Voga já tem
4. Quais telas existem, e quais são as 3 mais usadas
5. O que vai quebrar visualmente e o que vai quebrar de comportamento

Depois disso, pare e me mostre o plano em fases antes de executar.

Quando eu aprovar, execute nesta ordem, commitando ao fim de cada fase:

FASE 1 — tokens
Instale ou porte o Voga conforme a skill decidir. Ponha tokens.css, base.css e o
CSS de componentes no lugar. Ligue os dois scripts do <head> (tema e ponteiro) e
as fontes Onest + Martian Mono. Rode o auditor e me mostre o resultado.

FASE 2 — remova o sistema antigo
Apague os tokens, o tema e o CSS do sistema anterior. Desinstale as dependências
que ficaram órfãs. Se algo quebrar visualmente aqui, é esperado: a fase 3 conserta.

FASE 3 — componentes
Troque cada componente antigo pelo equivalente do Voga, usando o mapa em
references/componentes.md. Onde não houver equivalente direto:
- se for composição do que já existe, componha (não crie peça nova)
- se for peça genuinamente nova, siga references/componente-novo.md
Mantenha as props e o comportamento de cada componente do projeto onde possível,
para as telas não precisarem mudar junto.

FASE 4 — telas
Passe tela por tela aplicando as regras, não só trocando componente:
- botão primário é tinta, no máximo um por área
- card é sempre neutro, com o estado num Chip
- âmbar só no que espera uma pessoa, em peça pequena
- tudo que se clica cai em 32/40/48
- toda superfície elevada leva var(--voga-top)
- raio interno = raio externo menos a folga
Comece pelas 3 telas mais usadas.

FASE 5 — verificação
Rode o auditor e o typecheck. Corrija tudo até dar 0 falhas e 0 avisos. Depois me
diga, honestamente:
- o que ficou pior que antes
- o que você não conseguiu migrar e por quê
- quais pares de contraste você adicionou em PAIRS

Regras do trabalho:
- Não invente cor. Se precisar de uma que não existe no Voga, pare e me pergunte.
- Não deixe cor crua (#hex, rgb(), oklch()) dentro de componente nenhum.
- Não misture os dois sistemas em arquivo nenhum ao fim da fase 3.
- Não mude lógica de negócio, rota, chamada de API nem schema. Só o design.
- Se um componente antigo tiver comportamento que o Voga não cobre, mantenha o
  comportamento e troque só o visual.
- Me pergunte antes de apagar qualquer arquivo que não seja de estilo.
```

---

## Curto (quando você confia e quer velocidade)

```
Use a skill voga-design-system e migre este projeto inteiro para o Voga: tokens,
componentes e telas, removendo o sistema de UI antigo. Faça em fases, commitando
cada uma. Não mude lógica, rota nem API — só design. Ao final rode o auditor até
dar 0 falhas e me diga o que não conseguiu migrar.
```

---

## Só uma tela (para testar a água antes)

```
Use a skill voga-design-system e refatore SÓ a tela <caminho/do/arquivo> para o
Voga, sem tocar em mais nada. Instale o Voga se ainda não estiver. Quando acabar,
me mostre antes/depois e o que você teria de mudar no resto do projeto para essa
tela não ficar sozinha no padrão novo.
```

Recomendo começar por este. Uma tela migrada mostra o atrito real em 15 minutos,
e o inventário da versão completa fica muito melhor depois.

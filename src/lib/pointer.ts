/**
 * Marca <html data-pointer> enquanto a pessoa estiver usando mouse ou dedo, e
 * tira a marca na primeira tecla de navegação. Toda regra que desenha anel de
 * foco começa com `html:not([data-pointer])` — então um clique, um toque, ou o
 * que um script foca depois de alguém digitar não acendem nada.
 *
 * Chame uma vez na raiz do app. Devolve a função que desliga.
 */
export function trackPointer(): () => void {
  if (typeof document === "undefined") return () => {};

  const root = document.documentElement;
  const mark = () => root.setAttribute("data-pointer", "");
  const clear = () => root.removeAttribute("data-pointer");

  const onKey = (event: KeyboardEvent) => {
    // Só teclas que movem o foco tiram a marca; digitar num campo não.
    if (event.key === "Tab" || event.key.startsWith("Arrow") || event.key === "Home" || event.key === "End") {
      clear();
    }
  };

  mark();
  document.addEventListener("pointerdown", mark, true);
  document.addEventListener("keydown", onKey, true);

  return () => {
    document.removeEventListener("pointerdown", mark, true);
    document.removeEventListener("keydown", onKey, true);
  };
}

/** Script inline para o <head>: marca antes do primeiro paint, sem flash de anel. */
export const pointerScript =
  `(function(){var r=document.documentElement;r.setAttribute("data-pointer","");` +
  `document.addEventListener("pointerdown",function(){r.setAttribute("data-pointer","")},true);` +
  `document.addEventListener("keydown",function(e){if(e.key==="Tab"||e.key.indexOf("Arrow")===0||e.key==="Home"||e.key==="End")r.removeAttribute("data-pointer")},true)})()`;

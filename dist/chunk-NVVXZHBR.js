import { cn } from './chunk-7EOSDFS3.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React3 from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Icon({ as: Glyph, className, ...props }) {
  return /* @__PURE__ */ jsx(Glyph, { className: cn("voga-icon", className), strokeWidth: 1.6, "aria-hidden": "true", ...props });
}
function Kbd({ className, ...props }) {
  return /* @__PURE__ */ jsx("kbd", { className: cn("voga-kbd", className), ...props });
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: cn("voga-skeleton", className), ...props });
}
function Spinner({
  className,
  label,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      className: cn("voga-spinner", className),
      role: label ? "status" : void 0,
      "aria-label": label,
      "aria-hidden": label ? void 0 : "true",
      ...props,
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "9" }),
        /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 0 0-9-9" })
      ]
    }
  );
}
var Separator = React3.forwardRef(function Separator2({ className, orientation = "horizontal", decorative = true, strong, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      orientation,
      decorative,
      className: cn("voga-sep", strong && "voga-sep--strong", className),
      ...props
    }
  );
});
var isWords = (children) => children !== "" && (Array.isArray(children) ? children : [children]).every(
  (child) => typeof child === "string" || typeof child === "number"
);
var Button = React3.forwardRef(function Button2({
  variant = "default",
  size = "md",
  icon,
  iconOnly,
  block,
  kbd,
  loading,
  asChild,
  className,
  children,
  type = "button",
  disabled,
  ...rest
}, ref) {
  const Comp = asChild ? Slot : "button";
  const square = iconOnly || !!icon && children == null;
  const body = children == null ? null : isWords(children) ? /* @__PURE__ */ jsx("span", { className: "voga-btn__label", children }) : children;
  return /* @__PURE__ */ jsxs(
    Comp,
    {
      ref,
      type: asChild ? void 0 : type,
      disabled: disabled || loading,
      "aria-busy": loading || void 0,
      className: cn(
        "voga-btn",
        `voga-btn--${variant}`,
        size !== "md" && variant !== "link" && `voga-btn--${size}`,
        square && variant !== "link" && "voga-btn--icon",
        block && variant !== "link" && "voga-btn--block",
        className
      ),
      ...rest,
      children: [
        loading ? /* @__PURE__ */ jsx(Spinner, {}) : icon ? /* @__PURE__ */ jsx(Icon, { as: icon }) : null,
        asChild ? /* @__PURE__ */ jsx(Slottable, { children: body }) : body,
        kbd?.length ? /* @__PURE__ */ jsx("span", { className: "voga-menu__shortcut", children: kbd.map((key) => /* @__PURE__ */ jsx(Kbd, { children: key }, key)) }) : null
      ]
    }
  );
});
var Input = React3.forwardRef(function Input2({ className, size = "md", type = "text", ...props }, ref) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      type,
      className: cn("voga-input", size !== "md" && `voga-input--${size}`, className),
      ...props
    }
  );
});
var Textarea = React3.forwardRef(function Textarea2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx("textarea", { ref, className: cn("voga-input voga-textarea", className), ...props });
});
var Composer = React3.forwardRef(
  function Composer2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsx("div", { ref, className: cn("voga-composer", className), ...props });
  }
);
function Empty({ className, icon, title, desc, actions, size = "panel", ...props }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("voga-empty", className), "data-size": size, ...props, children: [
    icon ? /* @__PURE__ */ jsx("div", { className: "voga-empty__glyph", children: /* @__PURE__ */ jsx(Icon, { as: icon }) }) : null,
    /* @__PURE__ */ jsx("p", { className: "voga-empty__title", children: title }),
    desc ? /* @__PURE__ */ jsx("p", { className: "voga-empty__desc", children: desc }) : null,
    actions ? /* @__PURE__ */ jsx("div", { className: "voga-empty__actions", children: actions }) : null
  ] });
}
function TableWrap({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-table-wrap", className), ...props });
}
var Table = React3.forwardRef(function Table2({ className, hover, roomy, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    "table",
    {
      ref,
      className: cn("voga-table", hover && "voga-table--hover", roomy && "voga-table--roomy", className),
      ...props
    }
  );
});
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx("thead", { className: cn(className), ...props });
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx("tbody", { className: cn(className), ...props });
}
function TableFoot({ className, ...props }) {
  return /* @__PURE__ */ jsx("tfoot", { className: cn(className), ...props });
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx("tr", { className: cn(className), ...props });
}
function TableCell({ className, alignment, ...props }) {
  return /* @__PURE__ */ jsx("td", { "data-align": alignment, className: cn(className), ...props });
}
function TableHeader({ className, alignment, ...props }) {
  return /* @__PURE__ */ jsx("th", { scope: "col", "data-align": alignment, className: cn(className), ...props });
}
function TableCaption({ className, ...props }) {
  return /* @__PURE__ */ jsx("caption", { className: cn(className), ...props });
}
function janela(page, pages, around) {
  const keep = /* @__PURE__ */ new Set([1, pages]);
  for (let i = page - around; i <= page + around; i++) {
    if (i >= 1 && i <= pages) keep.add(i);
  }
  const sorted = [...keep].sort((a, b) => a - b);
  const out = [];
  let last = 0;
  for (const n of sorted) {
    if (last && n - last > 1) out.push(null);
    out.push(n);
    last = n;
  }
  return out;
}
function Pagination({ className, page, pages, onChange, around = 1, ...props }) {
  if (pages <= 1) return null;
  return /* @__PURE__ */ jsxs("nav", { "aria-label": "Pagina\xE7\xE3o", className: cn("voga-pages", className), ...props, children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: "ghost",
        icon: ChevronLeft,
        iconOnly: true,
        "aria-label": "P\xE1gina anterior",
        disabled: page <= 1,
        onClick: () => onChange(page - 1)
      }
    ),
    janela(page, pages, around).map(
      (n, i) => n === null ? /* @__PURE__ */ jsx("span", { className: "voga-pages__gap", "aria-hidden": "true", children: "\u2026" }, `gap-${i}`) : /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: "ghost",
          "aria-label": `P\xE1gina ${n}`,
          "aria-current": n === page ? "page" : void 0,
          className: n === page ? "voga-chosen" : void 0,
          onClick: () => onChange(n),
          children: n
        },
        n
      )
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: "ghost",
        icon: ChevronRight,
        iconOnly: true,
        "aria-label": "Pr\xF3xima p\xE1gina",
        disabled: page >= pages,
        onClick: () => onChange(page + 1)
      }
    )
  ] });
}

export { Button, Composer, Empty, Icon, Input, Kbd, Pagination, Separator, Skeleton, Spinner, Table, TableBody, TableCaption, TableCell, TableFoot, TableHead, TableHeader, TableRow, TableWrap, Textarea };

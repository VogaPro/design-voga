import { cn } from './chunk-7EOSDFS3.js';
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { jsxs, jsx } from 'react/jsx-runtime';

var Label = React.forwardRef(function Label2({ className, required, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs(LabelPrimitive.Root, { ref, className: cn("voga-field__label", className), ...props, children: [
    children,
    required ? /* @__PURE__ */ jsx("span", { className: "voga-field__req", "aria-hidden": "true", children: " *" }) : null
  ] });
});
function Field({ className, label, hint, error, required, htmlFor, children, ...props }) {
  const message = error ?? hint;
  return /* @__PURE__ */ jsxs("div", { className: cn("voga-field", className), ...props, children: [
    label ? /* @__PURE__ */ jsx(Label, { htmlFor, required, children: label }) : null,
    children,
    message ? /* @__PURE__ */ jsx(
      "p",
      {
        id: htmlFor ? `${htmlFor}-desc` : void 0,
        className: error ? "voga-field__error" : "voga-field__help",
        children: message
      }
    ) : null
  ] });
}
function Form({ className, ...props }) {
  return /* @__PURE__ */ jsx("form", { className: cn("voga-form", className), ...props });
}
function Eyebrow({ className, ...props }) {
  return /* @__PURE__ */ jsx("p", { className: cn("voga-eyebrow", className), ...props });
}
function Meta({ className, ...props }) {
  return /* @__PURE__ */ jsx("span", { className: cn("voga-meta", className), ...props });
}

export { Eyebrow, Field, Form, Label, Meta };

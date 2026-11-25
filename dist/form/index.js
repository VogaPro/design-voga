import { Field } from '../chunk-7D5XUG5H.js';
import '../chunk-7EOSDFS3.js';
import * as React from 'react';
import { FormProvider, Controller, useFormContext, useFormState } from 'react-hook-form';
import { jsx } from 'react/jsx-runtime';

var Form = FormProvider;
var FieldNameContext = React.createContext(null);
function FormField({ label, hint, required, className, ...props }) {
  const id = `f-${String(props.name).replace(/[^\w-]/g, "-")}`;
  return /* @__PURE__ */ jsx(FieldNameContext.Provider, { value: String(props.name), children: /* @__PURE__ */ jsx(
    Controller,
    {
      ...props,
      render: (renderProps) => /* @__PURE__ */ jsx(
        Field,
        {
          className,
          label,
          hint,
          required,
          htmlFor: id,
          error: renderProps.fieldState.error?.message,
          children: props.render({
            ...renderProps,
            field: {
              ...renderProps.field,
              // O controle recebe o id e a fiação de aria já prontos.
              ...{
                id,
                "aria-invalid": renderProps.fieldState.invalid || void 0,
                "aria-describedby": `${id}-desc`
              }
            }
          })
        }
      )
    }
  ) });
}
function FormMessage({ name }) {
  const herdado = React.useContext(FieldNameContext);
  const campo = name ?? herdado;
  const { control } = useFormContext();
  const { errors } = useFormState({ control, name: campo ?? void 0 });
  if (!campo) return null;
  const erro = campo.split(".").reduce((acc, part) => acc?.[part], errors);
  const mensagem = erro?.message;
  return mensagem ? /* @__PURE__ */ jsx("p", { className: "voga-field__error", children: mensagem }) : null;
}

export { Form, FormField, FormMessage };

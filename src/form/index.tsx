import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Field } from "../components/field";

/**
 * Cola para react-hook-form, que entra como peer OPCIONAL: só quem importa
 * `@voga/ui/form` precisa instalar.
 *
 * O `Field` do pacote já faz o ritmo e a fiação de aria. Isto só liga o estado
 * do formulário a ele: o id sai do nome do campo, e a mensagem de erro vira o
 * `error` do Field — então nenhuma tela precisa repetir essa plumbing.
 */
export const Form = FormProvider;

const FieldNameContext = React.createContext<string | null>(null);

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ControllerProps<TFieldValues, TName> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  required?: boolean;
  className?: string;
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ label, hint, required, className, ...props }: FormFieldProps<TFieldValues, TName>) {
  const id = `f-${String(props.name).replace(/[^\w-]/g, "-")}`;
  return (
    <FieldNameContext.Provider value={String(props.name)}>
      <Controller
        {...props}
        render={(renderProps) => (
          <Field
            className={className}
            label={label}
            hint={hint}
            required={required}
            htmlFor={id}
            error={renderProps.fieldState.error?.message}
          >
            {props.render({
              ...renderProps,
              field: {
                ...renderProps.field,
                // O controle recebe o id e a fiação de aria já prontos.
                ...({
                  id,
                  "aria-invalid": renderProps.fieldState.invalid || undefined,
                  "aria-describedby": `${id}-desc`,
                } as Record<string, unknown>),
              },
            })}
          </Field>
        )}
      />
    </FieldNameContext.Provider>
  );
}

/** A mensagem de erro do campo em volta, para quem quer posicionar à mão. */
export function FormMessage({ name }: { name?: string }) {
  const herdado = React.useContext(FieldNameContext);
  const campo = name ?? herdado;
  const { control } = useFormContext();
  const { errors } = useFormState({ control, name: campo ?? undefined });
  if (!campo) return null;
  const erro = campo.split(".").reduce<unknown>((acc, part) => (acc as Record<string, unknown>)?.[part], errors);
  const mensagem = (erro as { message?: string } | undefined)?.message;
  return mensagem ? <p className="voga-field__error">{mensagem}</p> : null;
}

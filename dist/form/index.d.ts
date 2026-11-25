import * as react_hook_form from 'react-hook-form';
import { FieldValues, FieldPath, ControllerProps } from 'react-hook-form';
import * as React from 'react';

/**
 * Cola para react-hook-form, que entra como peer OPCIONAL: só quem importa
 * `@voga/ui/form` precisa instalar.
 *
 * O `Field` do pacote já faz o ritmo e a fiação de aria. Isto só liga o estado
 * do formulário a ele: o id sai do nome do campo, e a mensagem de erro vira o
 * `error` do Field — então nenhuma tela precisa repetir essa plumbing.
 */
declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues>({ children, watch, getValues, getErrors, getFieldState, setError, clearErrors, setValue, setValues, trigger, formState, resetField, reset, resetDefaultValues, handleSubmit, unregister, control, register, setFocus, subscribe, }: react_hook_form.FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React.JSX.Element;
interface FormFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> extends ControllerProps<TFieldValues, TName> {
    label?: React.ReactNode;
    hint?: React.ReactNode;
    required?: boolean;
    className?: string;
}
declare function FormField<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ label, hint, required, className, ...props }: FormFieldProps<TFieldValues, TName>): React.JSX.Element;
/** A mensagem de erro do campo em volta, para quem quer posicionar à mão. */
declare function FormMessage({ name }: {
    name?: string;
}): React.JSX.Element | null;

export { Form, FormField, type FormFieldProps, FormMessage };

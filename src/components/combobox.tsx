import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "./command";

export interface ComboboxOption {
  value: string;
  label: string;
  /** Uma linha explicando, quando o rótulo não basta. */
  desc?: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** O que aparece no campo de busca. */
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/**
 * Select com busca. É um `Popover` com uma `Command` dentro — então o gatilho
 * é o nosso select, o painel é vidro, e a navegação é por seta e Enter.
 */
export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Escolha",
  searchPlaceholder = "Buscar…",
  emptyText = "Nada encontrado.",
  disabled,
  id,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const escolhido = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          data-placeholder={escolhido ? undefined : ""}
          className={cn("voga-select", className)}
        >
          {escolhido?.label ?? placeholder}
          <Icon as={ChevronDown} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        style={{ padding: 0, width: "var(--radix-popover-trigger-width)", maxWidth: "none" }}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={`${option.label} ${option.desc ?? ""}`}
                disabled={option.disabled}
                onSelect={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
              >
                <Icon
                  as={Check}
                  style={{ width: 16, height: 16, opacity: option.value === value ? 1 : 0 }}
                />
                <span>
                  {option.label}
                  {option.desc ? <span className="voga-item__desc">{option.desc}</span> : null}
                </span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../lib/cn";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Icon } from "./icon";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  /** O que aparece quando não há data. */
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  /** Datas que não se pode escolher. */
  disabledDates?: React.ComponentProps<typeof Calendar>["disabled"];
}

const formato = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

/** Campo de data: gatilho na régua, calendário num popover. */
export function DatePicker({
  value,
  onChange,
  placeholder = "Escolha uma data",
  disabled,
  id,
  className,
  disabledDates,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          disabled={disabled}
          data-placeholder={value ? undefined : ""}
          className={cn("voga-select", className)}
        >
          {value ? formato.format(value) : placeholder}
          <Icon as={CalendarIcon} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ padding: 0 }}>
        <Calendar
          mode="single"
          selected={value}
          disabled={disabledDates}
          autoFocus
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
        />
        <div className="voga-calendar__foot">
          <Button variant="link" onClick={() => { onChange?.(new Date()); setOpen(false); }}>
            Hoje
          </Button>
          <Button variant="link" onClick={() => { onChange?.(undefined); setOpen(false); }}>
            Limpar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

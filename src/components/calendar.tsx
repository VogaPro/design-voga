import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";
import { Button } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /**
   * Nomes acessíveis das setas de mês. Traduza-os — e passe também `locale`
   * (do react-day-picker), que por padrão é pt-BR: os dois juntos é que fazem
   * o calendário falar a língua do app.
   */
  prevMonthLabel?: string;
  nextMonthLabel?: string;
};

/**
 * Calendário. 280px, com a folga do menu — então os dias dos cantos ficam
 * concêntricos com a caixa. O dia escolhido é tinta; hoje é um anel.
 */
export function Calendar({
  className,
  classNames,
  prevMonthLabel = "Mês anterior",
  nextMonthLabel = "Próximo mês",
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={ptBR}
      showOutsideDays
      className={cn("voga-calendar", className)}
      classNames={{
        months: "voga-calendar__months",
        month_caption: "voga-calendar__nav",
        caption_label: "voga-calendar__title",
        nav: "voga-calendar__arrows",
        month_grid: "voga-calendar__grid",
        weekday: "voga-calendar__weekday",
        day: "voga-calendar__cell",
        day_button: "voga-calendar__day",
        range_start: "voga-calendar__cell--start",
        range_middle: "voga-calendar__cell--mid",
        range_end: "voga-calendar__cell--end",
        ...classNames,
      }}
      components={{
        PreviousMonthButton: (buttonProps) => (
          <Button {...buttonProps} variant="ghost" size="sm" icon={ChevronLeft} iconOnly aria-label={prevMonthLabel} />
        ),
        NextMonthButton: (buttonProps) => (
          <Button {...buttonProps} variant="ghost" size="sm" icon={ChevronRight} iconOnly aria-label={nextMonthLabel} />
        ),
        // As setas já vêm dos nossos botões; o chevron do pacote fica vazio.
        Chevron: () => <></>,
      }}
      {...props}
    />
  );
}

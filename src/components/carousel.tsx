import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";
import { Button } from "./button";

/* O tipo das opções vem do próprio hook — assim não dependemos do nome do
   pacote core do embla, que é dependência transitiva. */
type EmblaOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;

export interface CarouselProps extends React.ComponentPropsWithoutRef<"div"> {
  options?: EmblaOptions;
  /** `false` esconde as setas — então deixe claro que arrasta. */
  arrows?: boolean;
  label?: string;
}

/**
 * Uma fileira que desliza item por item. As setas flutuam nas bordas e a
 * fileira some sob elas — só do lado onde ainda há coisa para ver.
 */
export function Carousel({ className, options, arrows = true, label = "Carrossel", children, ...props }: CarouselProps) {
  const [ref, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", ...options });
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  React.useEffect(() => {
    if (!embla) return;
    const sync = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    };
    sync();
    embla.on("select", sync).on("reInit", sync);
    return () => {
      embla.off("select", sync).off("reInit", sync);
    };
  }, [embla]);

  const more = canPrev && canNext ? "both" : canNext ? "end" : canPrev ? "start" : undefined;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      data-more={more}
      className={cn("voga-carousel", className)}
      {...props}
    >
      <div className="voga-carousel__viewport" ref={ref}>
        <div className="voga-carousel__track">{children}</div>
      </div>
      {arrows ? (
        <>
          {canPrev ? (
            <Button
              variant="default"
              size="sm"
              icon={ChevronLeft}
              iconOnly
              aria-label="Anterior"
              className="voga-carousel__arrow voga-carousel__arrow--prev"
              onClick={() => embla?.scrollPrev()}
            />
          ) : null}
          {canNext ? (
            <Button
              variant="default"
              size="sm"
              icon={ChevronRight}
              iconOnly
              aria-label="Próximo"
              className="voga-carousel__arrow voga-carousel__arrow--next"
              onClick={() => embla?.scrollNext()}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export function CarouselSlide({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-carousel__slide", className)} {...props} />;
}

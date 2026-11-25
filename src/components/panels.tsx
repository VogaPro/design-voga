import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { GripVertical } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";

/** Painéis que a pessoa redimensiona. A divisa é um hairline que engrossa no hover. */
export function Panels({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof PanelGroup>) {
  return <PanelGroup className={cn("voga-panels", className)} {...props} />;
}

export function Pane({ className, ...props }: React.ComponentPropsWithoutRef<typeof Panel>) {
  return <Panel className={cn("voga-panel", className)} {...props} />;
}

export function PaneHandle({
  className,
  grip,
  ...props
}: React.ComponentPropsWithoutRef<typeof PanelResizeHandle> & { grip?: boolean }) {
  return (
    <PanelResizeHandle className={cn("voga-handle", className)} {...props}>
      {grip ? (
        <span className="voga-handle__grip">
          <Icon as={GripVertical} style={{ width: 12, height: 12 }} />
        </span>
      ) : null}
    </PanelResizeHandle>
  );
}

import "./Collapsible.scss";
import React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { Collapsible as CollapsibleNS } from "@/contracts/ui/collapsible";

const Collapsible: CollapsibleNS.Component = CollapsiblePrimitive.Root;

const CollapsibleTrigger: CollapsibleNS.TriggerComponent =
  CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent: CollapsibleNS.ContentComponent = React.forwardRef<
  HTMLDivElement,
  CollapsibleNS.ContentProps
>(({ children, className = "", noTransition = false, ...rest }, ref) => {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      className={className + (noTransition ? "" : " transition-collapsible")}
      ref={ref}
      {...rest}
    >
      {children}
    </CollapsiblePrimitive.CollapsibleContent>
  );
});
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

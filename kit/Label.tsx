import "./Label.scss";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/utilities/helpers";
import { Label as LabelNS } from "@/contracts/ui/label";

const Label: LabelNS.Component = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelNS.Props
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(LabelNS.DefaultVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

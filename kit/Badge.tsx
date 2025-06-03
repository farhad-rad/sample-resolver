import "./Badge.scss";
import * as React from "react";
import { cn } from "@/utilities/helpers";
import { Badge as BadgeNS } from "@/contracts/ui/badge";

const badgeVariants: BadgeNS.Variants = BadgeNS.DefaultVariants;

const Badge: BadgeNS.Component = React.forwardRef<
  HTMLDivElement,
  BadgeNS.Props
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('panelly-badge', badgeVariants({ variant }), className)}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge, badgeVariants };

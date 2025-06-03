import "./Card.scss";
import * as React from "react";
import { cn } from "@/utilities/helpers";
import { Card as CardNS } from "@/contracts/ui/card";

const Card: CardNS.Component = React.forwardRef<HTMLDivElement, CardNS.Props>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader: CardNS.HeaderComponent = React.forwardRef<
  HTMLDivElement,
  CardNS.HeaderProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle: CardNS.TitleComponent = React.forwardRef<
  HTMLDivElement,
  CardNS.TitleProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription: CardNS.DescriptionComponent = React.forwardRef<
  HTMLDivElement,
  CardNS.DescriptionProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground rtl:text-right", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent: CardNS.ContentComponent = React.forwardRef<
  HTMLDivElement,
  CardNS.ContentProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter: CardNS.FooterComponent = React.forwardRef<
  HTMLDivElement,
  CardNS.FooterProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};

import "./Drawer.scss";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/utilities/helpers";
import { Drawer as DrawerNS } from "@/contracts/ui/drawer";

const Drawer: DrawerNS.Component = ({
  shouldScaleBackground = true,
  handleOnly = true,
  ...props
}) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    handleOnly={handleOnly}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger: DrawerNS.TriggerComponent = DrawerPrimitive.Trigger;

const DrawerPortal: DrawerNS.PortalComponent = DrawerPrimitive.Portal;

const DrawerClose: DrawerNS.CloseComponent = DrawerPrimitive.Close;

const DrawerOverlay: DrawerNS.OverlayComponent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const contentVariants: DrawerNS.ContentVariants = DrawerNS.ContentVariants;
const handleVariants: DrawerNS.HandleVariants = DrawerNS.HandleVariants;

const DrawerContent: DrawerNS.ContentComponent = React.forwardRef(
  (
    { className, children, position, handle = true, ...props },
    ref
  ) => (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 flex border bg-background",
          contentVariants({ position }),
          className
        )}
        {...props}
      >
        {handle && (
          <DrawerPrimitive.Handle
            className={cn(
              "!bg-transparent [&>span]:rounded-full [&>span]:bg-gray-200",
              handleVariants({ position })
            )}
          />
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader: DrawerNS.HeaderComponent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter: DrawerNS.FooterComponent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle: DrawerNS.TitleComponent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight rtl:text-right",
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription: DrawerNS.DescriptionComponent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground rtl:text-right", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

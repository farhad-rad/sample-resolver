import "./Drawover.scss";
import { forwardRef, useEffect, useState } from "react";
import { useMediaQuery } from "@/utilities/hooks";
import { Resolver } from "@/modules/resolver/Resolver";
import { cn } from "@/utilities/helpers";
import { Drawover as DrawoverNS } from "@/contracts/ui/drawover";
import * as PopoverPrimitive from "@radix-ui/react-popover";

const DrawoverTrigger: DrawoverNS.TriggerComponent = forwardRef(
  (props, ref) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return isDesktop ? (
      <Resolver.PopoverTrigger ref={ref} {...props} />
    ) : (
      <Resolver.DrawerTrigger ref={ref} {...props} />
    );
  }
);
DrawoverTrigger.displayName = "DrawoverTrigger";

const DrawoverContent: DrawoverNS.ContentComponent = forwardRef(
  (props, ref) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return isDesktop ? (
      <Resolver.PopoverContent ref={ref} {...props} />
    ) : (
      <Resolver.DrawerContent ref={ref} {...props} />
    );
  }
);
DrawoverContent.displayName = "DrawoverContent";

const DrawoverAnchor: DrawoverNS.AnchorComponent = forwardRef(
  ({ children, ...props }, ref) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return isDesktop ? (
      <Resolver.PopoverAnchor ref={ref} {...props}>{children}</Resolver.PopoverAnchor>
    ) : (
      <>{children}</>
    );
  }
);
DrawoverAnchor.displayName = "DrawoverAnchor";

const DrawoverHeader: DrawoverNS.HeaderComponent = ({
  desktopOnly,
  mobileOnly,
  className,
  ...props
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? (
    mobileOnly ? (
      <></>
    ) : (
      <div
        className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
        {...props}
      />
    )
  ) : desktopOnly ? (
    <></>
  ) : (
    <Resolver.DrawerHeader className={className} {...props} />
  );
};
DrawoverHeader.displayName = "DrawoverHeader";

const DrawoverFooter: DrawoverNS.FooterComponent = ({
  desktopOnly,
  mobileOnly,
  className,
  ...props
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? (
    mobileOnly ? (
      <></>
    ) : (
      <div
        className={cn("mt-auto flex flex-col gap-2 p-4", className)}
        {...props}
      />
    )
  ) : desktopOnly ? (
    <></>
  ) : (
    <Resolver.DrawerFooter className={className} {...props} />
  );
};
DrawoverFooter.displayName = "DrawoverFooter";

const DrawoverTitle: DrawoverNS.TitleComponent = forwardRef(
  ({ desktopOnly, mobileOnly, className, ...props }, ref) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return isDesktop ? (
      mobileOnly ? (
        <></>
      ) : (
        <h2
          ref={ref}
          className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
          )}
          {...props}
        />
      )
    ) : desktopOnly ? (
      <></>
    ) : (
      <Resolver.DrawerTitle ref={ref} className={className} {...props} />
    );
  }
);
DrawoverTitle.displayName = "DrawoverTitle";

const DrawoverDescription: DrawoverNS.DescriptionComponent = forwardRef(
  ({ desktopOnly, mobileOnly, className, ...props }, ref) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return isDesktop ? (
      mobileOnly ? (
        <></>
      ) : (
        <p
          ref={ref}
          className={cn("text-sm text-muted-foreground rtl:text-right", className)}
          {...props}
        />
      )
    ) : desktopOnly ? (
      <></>
    ) : (
      <Resolver.DrawerDescription ref={ref} className={className} {...props} />
    );
  }
);
DrawoverDescription.displayName = "DrawoverDescription";

const DrawoverClose: DrawoverNS.CloseComponent = forwardRef(
  ({ desktopOnly, mobileOnly, ...props }, ref) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return isDesktop ? (
      mobileOnly ? (
        <></>
      ) : (
        <PopoverPrimitive.Close ref={ref} {...props} />
      )
    ) : desktopOnly ? (
      <></>
    ) : (
      <Resolver.DrawerClose ref={ref} {...props} />
    );
  }
);
DrawoverClose.displayName = "DrawoverClose";

const Drawover: DrawoverNS.Component = ({
  children,
  open,
  onOpenChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(!!open);
  const propagateOpenState = (open: boolean) => {
    setIsOpen(open);
    if (onOpenChange) onOpenChange(open);
  };
  useEffect(() => {
    if (!!open != isOpen) setIsOpen(!!open)
  }, [open])

  return (
    <Resolver.Popover
      open={isOpen}
      onOpenChange={propagateOpenState}
      {...props}
    >
      <Resolver.Drawer
        open={isOpen}
        onOpenChange={propagateOpenState}
        {...props}
      >
        {children}
      </Resolver.Drawer>
    </Resolver.Popover>
  );
};
Drawover.displayName = "Drawover";

export {
  Drawover,
  DrawoverTrigger,
  DrawoverContent,
  DrawoverAnchor,
  DrawoverHeader,
  DrawoverTitle,
  DrawoverDescription,
  DrawoverFooter,
  DrawoverClose,
};

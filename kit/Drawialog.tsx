import "./Drawialog.scss";
import { forwardRef, useEffect, useState } from "react";
import { useMediaQuery } from "@/utilities/hooks";
import { Resolver } from "@/modules/resolver/Resolver";
import { Drawialog as DrawialogNS } from "@/contracts/ui/drawialog";

const DrawialogTrigger: DrawialogNS.TriggerComponent = forwardRef(
  (props, ref) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return isDesktop ? (
      <Resolver.DialogTrigger ref={ref} {...props} />
    ) : (
      <Resolver.DrawerTrigger ref={ref} {...props} />
    );
  }
);
DrawialogTrigger.displayName = "DrawialogTrigger";

const DrawialogContent: DrawialogNS.ContentComponent = forwardRef(
  (props, ref) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return isDesktop ? (
      <Resolver.DialogContent ref={ref} {...props} />
    ) : (
      <Resolver.DrawerContent ref={ref} {...props} />
    );
  }
);
DrawialogContent.displayName = "DrawialogContent";

const DrawialogHeader: DrawialogNS.HeaderComponent = ({
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
      <Resolver.DialogHeader className={className} {...props} />
    )
  ) : desktopOnly ? (
    <></>
  ) : (
    <Resolver.DrawerHeader className={className} {...props} />
  );
};
DrawialogHeader.displayName = "DrawialogHeader";

const DrawialogFooter: DrawialogNS.FooterComponent = ({
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
      <Resolver.DialogFooter className={className} {...props} />
    )
  ) : desktopOnly ? (
    <></>
  ) : (
    <Resolver.DrawerFooter className={className} {...props} />
  );
};
DrawialogFooter.displayName = "DrawialogFooter";

const DrawialogTitle: DrawialogNS.TitleComponent = forwardRef(
  ({ desktopOnly, mobileOnly, className, ...props }, ref) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return isDesktop ? (
      mobileOnly ? (
        <></>
      ) : (
        <Resolver.DialogTitle ref={ref} className={className} {...props} />
      )
    ) : desktopOnly ? (
      <></>
    ) : (
      <Resolver.DrawerTitle ref={ref} className={className} {...props} />
    );
  }
);
DrawialogTitle.displayName = "DrawialogTitle";

const DrawialogDescription: DrawialogNS.DescriptionComponent = forwardRef(
  ({ desktopOnly, mobileOnly, className, ...props }, ref) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return isDesktop ? (
      mobileOnly ? (
        <></>
      ) : (
        <Resolver.DialogDescription ref={ref} className={className} {...props} />
      )
    ) : desktopOnly ? (
      <></>
    ) : (
      <Resolver.DrawerDescription ref={ref} className={className} {...props} />
    );
  }
);
DrawialogDescription.displayName = "DrawialogDescription";

const DrawialogClose: DrawialogNS.CloseComponent = forwardRef(
  ({ desktopOnly, mobileOnly, ...props }, ref) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return isDesktop ? (
      mobileOnly ? (
        <></>
      ) : (
        <Resolver.DialogClose ref={ref} {...props} />
      )
    ) : desktopOnly ? (
      <></>
    ) : (
      <Resolver.DrawerClose ref={ref} {...props} />
    );
  }
);
DrawialogClose.displayName = "DrawialogClose";

const Drawialog: DrawialogNS.Component = ({
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
    <Resolver.Dialog
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
    </Resolver.Dialog>
  );
};
Drawialog.displayName = "Drawialog";

export {
  Drawialog,
  DrawialogTrigger,
  DrawialogContent,
  DrawialogHeader,
  DrawialogTitle,
  DrawialogDescription,
  DrawialogFooter,
  DrawialogClose,
};

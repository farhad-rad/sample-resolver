import "./Sidebar.scss";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { PanelLeft } from "lucide-react";
import { useIsMobile } from "@/utilities/hooks";
import { Resolver } from "@/modules/resolver/Resolver";
import { cn } from "@/utilities/helpers";
import { Sidebar as SidebarNS } from "@/contracts/ui/sidebar";

const SidebarProvider: SidebarNS.ProviderComponent = React.forwardRef(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      onContextReady,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile();
    const [variant, setVariant] = React.useState<
      "sidebar" | "floating" | "inset" | "overlay"
    >("sidebar");
    const [openMobile, setOpenMobile] = React.useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SidebarNS.FLAGS.SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SidebarNS.FLAGS.SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile || variant === "overlay"
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open);
    }, [isMobile, variant, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SidebarNS.FLAGS.SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarNS.Context>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
        setVariant,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );

    React.useEffect(() => {
      if (onContextReady) onContextReady(contextValue);
    }, [
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      onContextReady
    ]);

    return (
      <SidebarNS.Context.Provider value={contextValue}>
        <Resolver.TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SidebarNS.FLAGS.SIDEBAR_WIDTH,
                "--sidebar-width-icon": SidebarNS.FLAGS.SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper overflow-x-hidden flex min-h-svh w-full max-w-[100vw] has-[[data-variant=inset]]:bg-gray-150",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </Resolver.TooltipProvider>
      </SidebarNS.Context.Provider>
    );
  }
);
SidebarProvider.displayName = "SidebarProvider";

const Sidebar: SidebarNS.Component = React.forwardRef(
  (
    {
      side = "onSide",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile, setVariant } =
      SidebarNS.useSidebar();

    React.useEffect(() => {
      setVariant(variant);
    }, [variant]);

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-gray-100 text-gray-700",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile || variant === "overlay") {
      return (
        <Resolver.Sheet
          open={openMobile}
          onOpenChange={setOpenMobile}
          {...props}
        >
          <Resolver.SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-gray-100 p-0 text-gray-700 [&>button]:hidden rounded-lg -translate-x-4 inset-y-4 !h-[calc(100%-2rem)]"
            style={
              {
                "--sidebar-width": `calc(${SidebarNS.FLAGS.SIDEBAR_WIDTH_MOBILE} - 8px)`,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </Resolver.SheetContent>
        </Resolver.Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className="group peer hidden md:block text-gray-800"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        <div
          className={cn(
            "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=onOtherSide]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
          )}
        />
        <div
          className={cn(
            "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
            side === "onSide"
              ? "ltr:left-0 rtl:right-0 ltr:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] rtl:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]"
              : "ltr:right-0 rtl:left-0 rtl:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] ltr:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] ltr:group-data-[side=onSide]:border-r rtl:group-data-[side=onSide]:border-l  ltr:group-data-[side=onOtherSide]:border-l rtl:group-data-[side=onOtherSide]:border-r",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-transparent group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-gray-200 group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger: SidebarNS.TriggerComponent = React.forwardRef(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = SidebarNS.useSidebar();

    return (
      <Resolver.Button
        ref={ref}
        data-sidebar="trigger"
        variant="gray-ghost"
        size="icon"
        className={cn(
          "h-7 !w-7 hover:!w-20 group/sidebar-toggle overflow-hidden transition-all",
          className
        )}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        <div className="!h-[200%] flex flex-col items-center translate-y-1/4 group-hover/sidebar-toggle:-translate-y-1/4 transition-transform">
          <div className="w-7 h-1/2 flex items-center justify-center rtl:-scale-x-100">
            <PanelLeft />
          </div>
          <div className="w-20 h-1/2 ltr flex items-center justify-center gap-2">
            <kbd className="pointer-events-none text-xs ltr inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              Ctrl
            </kbd>
            <kbd className="pointer-events-none text-xs ltr inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              B
            </kbd>
          </div>
        </div>
        <span className="sr-only">Toggle Sidebar</span>
      </Resolver.Button>
    );
  }
);
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail: SidebarNS.RailComponent = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = SidebarNS.useSidebar();

    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className={cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 ltr:after:left-1/2 rtl:after:right-1/2 after:w-[2px] hover:after:bg-gray-200 ltr:group-data-[side=onSide]:-right-4 rtl:group-data-[side=onSide]:left-0 ltr:group-data-[side=onOtherSide]:left-0 rtl:group-data-[side=onOtherSide]:-left-4 sm:flex",
          "ltr:[[data-side=onSide]_&]:cursor-w-resize rtl:[[data-side=onSide]_&]:cursor-e-resize ltr:[[data-side=onOtherSide]_&]:cursor-e-resize rtl:[[data-side=onOtherSide]_&]:cursor-w-resize",
          "ltr:[[data-side=onSide][data-state=collapsed]_&]:cursor-e-resize rtl:[[data-side=onSide][data-state=collapsed]_&]:cursor-w-resize ltr:[[data-side=onOtherSide][data-state=collapsed]_&]:cursor-w-resize rtl:[[data-side=onOtherSide][data-state=collapsed]_&]:cursor-e-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 ltr:group-data-[collapsible=offcanvas]:after:left-full rtl:group-data-[collapsible=offcanvas]:after:right-full group-data-[collapsible=offcanvas]:hover:bg-gray-100",
          "ltr:[[data-side=onSide][data-collapsible=offcanvas]_&]:-right-2 rtl:[[data-side=onSide][data-collapsible=offcanvas]_&]:-left-2",
          "ltr:[[data-side=onOtherSide][data-collapsible=offcanvas]_&]:-left-2 rtl:[[data-side=onOtherSide][data-collapsible=offcanvas]_&]:-right-2",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarRail.displayName = "SidebarRail";

const SidebarInset: SidebarNS.InsetComponent = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { isMobile } = SidebarNS.useSidebar();
    return (
      <main
        ref={ref}
        className={cn(
          "relative flex min-h-svh flex-1 flex-col bg-gray-100 transition-[width,max-width] duration-200 ease-linear ",
          isMobile ? "w-[100vw]" : "",
          "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ms-2 md:peer-data-[variant=inset]:ms-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:border",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarInset.displayName = "SidebarInset";

const SidebarInput: SidebarNS.InputComponent = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <Resolver.SimpleInput
        ref={ref}
        data-sidebar="input"
        className={cn(
          "h-8 w-full bg-background shadow-none focus-visible:ring-2",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarInput.displayName = "SidebarInput";

const SidebarHeader: SidebarNS.HeaderComponent = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="header"
        className={cn("flex flex-col gap-2 p-2", className)}
        {...props}
      />
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter: SidebarNS.FooterComponent = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="footer"
        className={cn("flex flex-col gap-2 p-2", className)}
        {...props}
      />
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator: SidebarNS.SeparatorComponent = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <Resolver.Separator
        ref={ref}
        data-sidebar="separator"
        className={cn("mx-2 w-auto bg-gray-200", className)}
        {...props}
      />
    );
  }
);
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent: SidebarNS.ContentComponent = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="content"
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarContent.displayName = "SidebarContent";

const SidebarGroup: SidebarNS.GroupComponent = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group"
        className={cn(
          "relative flex w-full min-w-0 flex-col p-2 mb-2 ",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel: SidebarNS.GroupLabelComponent = React.forwardRef(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-label"
        className={cn(
          "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-gray-600 outline-none   transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction: SidebarNS.GroupActionComponent = React.forwardRef(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-action"
        className={cn(
          "absolute ltr:right-3 rtl:left-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-gray-700 outline-none   transition-transform hover:text-gray-900 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          // Increases the hit area of the button on mobile.
          "after:absolute after:-inset-2 after:md:hidden",
          "group-data-[collapsible=icon]:hidden",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent: SidebarNS.GroupContentComponent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
);
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu: SidebarNS.MenuComponent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
);
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem: SidebarNS.MenuItemComponent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
);
SidebarMenuItem.displayName = "SidebarMenuItem";

const SidebarMenuButton: SidebarNS.MenuButtonComponent = React.forwardRef(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = SidebarNS.useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(
          SidebarNS.DefaultMenuButtonVariants({ variant, size }),
          className
        )}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Resolver.Tooltip>
        <Resolver.TooltipTrigger asChild>{button}</Resolver.TooltipTrigger>
        <Resolver.TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Resolver.Tooltip>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction: SidebarNS.MenuActionComponent = React.forwardRef(
  ({ className, asChild = false, showOnHover = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-sidebar="menu-action"
        className={cn(
          "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-gray-700 outline-none   transition-transform hover:text-gray-900 focus-visible:ring-2 peer-hover/menu-button:text-gray-900 [&>svg]:size-4 [&>svg]:shrink-0",
          // Increases the hit area of the button on mobile.
          "after:absolute after:-inset-2 after:md:hidden",
          "peer-data-[size=sm]/menu-button:top-1",
          "peer-data-[size=default]/menu-button:top-1.5",
          "peer-data-[size=lg]/menu-button:top-2.5",
          "group-data-[collapsible=icon]:hidden",
          showOnHover &&
            "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-gray-900 md:opacity-0",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge: SidebarNS.MenuBadgeComponent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-gray-700 select-none pointer-events-none",
        "peer-hover/menu-button:text-gray-900 peer-data-[active=true]/menu-button:text-gray-900",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton: SidebarNS.MenuSkeletonComponent = React.forwardRef(
  ({ className, showIcon = false, ...props }, ref) => {
    // Random width between 50 to 90%.
    const width = React.useMemo(() => {
      return `${Math.floor(Math.random() * 40) + 50}%`;
    }, []);

    return (
      <div
        ref={ref}
        data-sidebar="menu-skeleton"
        className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)}
        {...props}
      >
        {showIcon && (
          <Resolver.Skeleton
            className="size-4 rounded-md"
            data-sidebar="menu-skeleton-icon"
          />
        )}
        <Resolver.Skeleton
          className="h-4 flex-1 max-w-[--skeleton-width]"
          data-sidebar="menu-skeleton-text"
          style={
            {
              "--skeleton-width": width,
            } as React.CSSProperties
          }
        />
      </div>
    );
  }
);
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub: SidebarNS.MenuSubComponent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "ms-3.5 flex min-w-0 ltr:translate-x-px rtl:-translate-x-px flex-col gap-1 ltr:border-l rtl:border-r border-gray-300 ps-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
);
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem: SidebarNS.MenuSubItemComponent = React.forwardRef(
  ({ ...props }, ref) => <li ref={ref} {...props} />
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton: SidebarNS.MenuSubButtonComponent = React.forwardRef(
  ({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        ref={ref}
        data-sidebar="menu-sub-button"
        data-size={size}
        data-active={isActive}
        className={cn(
          "flex h-7 min-w-0 ltr:-translate-x-px rtl:translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-gray-700 outline-none   hover:text-gray-900 focus-visible:ring-2 active:text-gray-900 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-gray-900",
          "data-[active=true]:text-gray-900",
          isActive && "is-submenu-active",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          "group-data-[collapsible=icon]:hidden",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
};

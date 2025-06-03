import { cva, VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import { Button } from "./button";
import { Separator } from "./separator";
import { Tooltip } from "./tooltip";
import { Inputs as InputNS } from "./inputs";

export namespace Sidebar {
  export const FLAGS = {
    SIDEBAR_COOKIE_NAME: "sidebar:state",
    SIDEBAR_COOKIE_MAX_AGE: 60 * 60 * 24 * 7,
    SIDEBAR_WIDTH: "16rem",
    SIDEBAR_WIDTH_MOBILE: "18rem",
    SIDEBAR_WIDTH_ICON: "3rem",
    SIDEBAR_KEYBOARD_SHORTCUT: "b",
  };

  export type Context = {
    state: "expanded" | "collapsed";
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
    setVariant: (variant: "sidebar" | "floating" | "inset" | "overlay") => void;
  };
  export const Context = createContext<Context | null>(null);

  export function useSidebar() {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSidebar must be used within a SidebarProvider.");
    }
    return context;
  }

  export const DefaultVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  );

  export type Variants = typeof DefaultVariants;

  export type Props = React.ComponentProps<"div"> & {
    side?: "onSide" | "onOtherSide";
    variant?: "sidebar" | "floating" | "inset" | "overlay";
    collapsible?: "offcanvas" | "icon" | "none";
  };
  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  >;

  export type ProviderProps = React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onContextReady?: (ctx: Context) => void;
  };
  export type ProviderComponent = React.ForwardRefExoticComponent<
    ProviderProps & React.RefAttributes<HTMLDivElement>
  >;

  export type TriggerProps = Button.Props;
  export type TriggerComponent = React.ForwardRefExoticComponent<
    TriggerProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type RailProps = React.ComponentProps<"button">;
  export type RailComponent = React.ForwardRefExoticComponent<
    RailProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type InsetProps = React.ComponentProps<"main">;
  export type InsetComponent = React.ForwardRefExoticComponent<
    InsetProps & React.RefAttributes<HTMLElement>
  >;

  export type InputProps = InputNS.SimpleTextProps;
  export type InputComponent = React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLInputElement>
  >;

  export type HeaderProps = React.ComponentProps<"div">;
  export type HeaderComponent = React.ForwardRefExoticComponent<
    HeaderProps & React.RefAttributes<HTMLDivElement>
  >;

  export type FooterProps = React.ComponentProps<"div">;
  export type FooterComponent = React.ForwardRefExoticComponent<
    FooterProps & React.RefAttributes<HTMLDivElement>
  >;

  export type SeparatorProps = Separator.Props;
  export type SeparatorComponent = React.ForwardRefExoticComponent<
    SeparatorProps & React.RefAttributes<HTMLDivElement>
  >;

  export type ContentProps = React.ComponentProps<"div">;
  export type ContentComponent = React.ForwardRefExoticComponent<
    ContentProps & React.RefAttributes<HTMLDivElement>
  >;

  export type GroupProps = React.ComponentProps<"div">;
  export type GroupComponent = React.ForwardRefExoticComponent<
    GroupProps & React.RefAttributes<HTMLDivElement>
  >;

  export type GroupLabelProps = React.ComponentProps<"div"> & {
    asChild?: boolean;
  };
  export type GroupLabelComponent = React.ForwardRefExoticComponent<
    GroupLabelProps & React.RefAttributes<HTMLDivElement>
  >;

  export type GroupActionProps = React.ComponentProps<"button"> & {
    asChild?: boolean;
  };
  export type GroupActionComponent = React.ForwardRefExoticComponent<
    GroupActionProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type GroupContentProps = React.ComponentProps<"div">;
  export type GroupContentComponent = React.ForwardRefExoticComponent<
    GroupContentProps & React.RefAttributes<HTMLDivElement>
  >;

  export type MenuProps = React.ComponentProps<"ul">;
  export type MenuComponent = React.ForwardRefExoticComponent<
    MenuProps & React.RefAttributes<HTMLUListElement>
  >;

  export type MenuItemProps = React.ComponentProps<"li">;
  export type MenuItemComponent = React.ForwardRefExoticComponent<
    MenuItemProps & React.RefAttributes<HTMLLIElement>
  >;

  export const DefaultMenuButtonVariants = cva(
    "peer/menu-button flex w-full items-center gap-2 rounded-md p-2 ltr:text-left rtl:text-right text-sm outline-none   transition-[width,height,padding] hover:text-[gray-900] focus-visible:ring-2  active:text-gray-900 disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pe-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium data-[active=true]:text-gray-900  data-[state=open]:hover:text-gray-900 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
    {
      variants: {
        variant: {
          default: "hover:text-gray-900",
          outline:
            "bg-background shadow-[0_0_0_1px_hsl(var(--gray-200))] hover:text-gray-900 hover:shadow-[0_0_0_1px_hsl(var(--gray-700))]",
        },
        size: {
          default: "h-8 text-sm",
          sm: "h-7 text-xs",
          lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  );

  export type MenuButtonProps = React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | Tooltip.ContentProps;
  } & VariantProps<typeof DefaultMenuButtonVariants>;
  export type MenuButtonComponent = React.ForwardRefExoticComponent<
    MenuButtonProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type MenuActionProps = React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  };
  export type MenuActionComponent = React.ForwardRefExoticComponent<
    MenuActionProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type MenuBadgeProps = React.ComponentProps<"div">;
  export type MenuBadgeComponent = React.ForwardRefExoticComponent<
    MenuBadgeProps & React.RefAttributes<HTMLDivElement>
  >;

  export type MenuSkeletonProps = React.ComponentProps<"div"> & {
    showIcon?: boolean;
  };
  export type MenuSkeletonComponent = React.ForwardRefExoticComponent<
    MenuSkeletonProps & React.RefAttributes<HTMLDivElement>
  >;

  export type MenuSubProps = React.ComponentProps<"ul">;
  export type MenuSubComponent = React.ForwardRefExoticComponent<
    MenuSubProps & React.RefAttributes<HTMLUListElement>
  >;

  export type MenuSubItemProps = React.ComponentProps<"li">;
  export type MenuSubItemComponent = React.ForwardRefExoticComponent<
    MenuSubItemProps & React.RefAttributes<HTMLLIElement>
  >;

  export type MenuSubButtonProps = React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  };
  export type MenuSubButtonComponent = React.ForwardRefExoticComponent<
    MenuSubButtonProps & React.RefAttributes<HTMLAnchorElement>
  >;

  export type Definition = {
    type: "sidebar";
    variant?: {
      structure?: "compact" | "default" | "dual";
      position?: "island" | "float" | "drawer" | "sibling";
      collapse?: "none" | "icon";
    };
    search?: boolean;
    header?:
      | false
      | React.ComponentType
      | {
          title: string;
          icon?: string;
          description?: string;
        }
      | {
          logo:
            | string
            | {
                dark: string;
                light: string;
              };
        };
    footer?: false | React.ComponentType;
  } & {
    component?: Component;
    contentComponent?: ContentComponent;
    footerComponent?: FooterComponent;
    groupComponent?: GroupComponent;
    groupActionComponent?: GroupActionComponent;
    groupContentComponent?: GroupContentComponent;
    groupLabelComponent?: GroupLabelComponent;
    headerComponent?: HeaderComponent;
    inputComponent?: InputComponent;
    insetComponent?: InsetComponent;
    menuComponent?: MenuComponent;
    menuActionComponent?: MenuActionComponent;
    menuBadgeComponent?: MenuBadgeComponent;
    menuButtonComponent?: MenuButtonComponent;
    menuItemComponent?: MenuItemComponent;
    menuSkeletonComponent?: MenuSkeletonComponent;
    menuSubComponent?: MenuSubComponent;
    menuSubButtonComponent?: MenuSubButtonComponent;
    menuSubItemComponent?: MenuSubItemComponent;
    providerComponent?: ProviderComponent;
    railComponent?: RailComponent;
    separatorComponent?: SeparatorComponent;
    triggerComponent?: TriggerComponent;
  };
}

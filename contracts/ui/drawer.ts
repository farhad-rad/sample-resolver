import { cva, VariantProps } from "class-variance-authority";
import { Drawer as DrawerPrimitive } from "vaul";

export namespace Drawer {
  export type Props = React.ComponentPropsWithoutRef<
    typeof DrawerPrimitive.Root
  >;
  export type Component = React.FC<Props & React.RefAttributes<HTMLDivElement>>;

  export type TriggerProps = React.ComponentPropsWithoutRef<
    typeof DrawerPrimitive.Trigger
  >;
  export type TriggerComponent = React.ForwardRefExoticComponent<
    TriggerProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type PortalProps = React.ComponentPropsWithoutRef<
    typeof DrawerPrimitive.Portal
  >;
  export type PortalComponent = React.FC<
    PortalProps & React.RefAttributes<HTMLDivElement>
  >;

  export type CloseProps = React.ComponentPropsWithoutRef<
    typeof DrawerPrimitive.Close
  >;
  export type CloseComponent = React.ForwardRefExoticComponent<
    CloseProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type OverlayProps = React.ComponentPropsWithoutRef<
    typeof DrawerPrimitive.Overlay
  >;
  export type OverlayComponent = React.ForwardRefExoticComponent<
    OverlayProps & React.RefAttributes<HTMLDivElement>
  >;

  export const ContentVariants = cva("", {
    variants: {
      position: {
        bottom: "flex-col inset-x-0 bottom-0 mt-24 h-auto rounded-t-[10px]",
        left: "left-2 inset-y-2 outline-none w-[min(310px,calc(100vw-1rem))] rounded-[10px]",
        right:
          "right-2 inset-y-2 outline-none w-[min(310px,calc(100vw-1rem))] rounded-[10px]",
        top: "flex-col-reverse inset-x-0 top-0 mb-24 h-auto rounded-b-[10px]",
        start:
          "start-2 inset-y-2 outline-none w-[min(310px,calc(100vw-1rem))] rounded-[10px]",
        end: "end-2 inset-y-2 outline-none w-[min(310px,calc(100vw-1rem))] rounded-[10px]",
      },
      handle: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      position: "bottom",
      handle: true,
    },
  });

  export const HandleVariants = cva("", {
    variants: {
      position: {
        bottom: "!w-full px-auto !h-8 [&>span]:h-2 [&>span]:w-[100px]",
        left: "!w-8 py-auto !h-full [&>span]:w-2 [&>span]:h-[100px]",
        right: "!w-8 py-auto !h-full [&>span]:w-2 [&>span]:h-[100px]",
        top: "!w-full px-auto !h-8 [&>span]:h-2 [&>span]:w-[100px]",
        start: "!w-8 py-auto !h-full [&>span]:w-2 [&>span]:h-[100px]",
        end: "!w-8 py-auto !h-full [&>span]:w-2 [&>span]:h-[100px]",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  });

  export type ContentVariants = typeof ContentVariants;
  export type HandleVariants = typeof ContentVariants;

  export type ContentProps = React.ComponentPropsWithoutRef<
    typeof DrawerPrimitive.Content
  > &
    VariantProps<ContentVariants>;
  export type ContentComponent = React.ForwardRefExoticComponent<
    ContentProps & React.RefAttributes<HTMLDivElement>
  >;

  export type HeaderProps = React.ComponentProps<"div">;
  export type HeaderComponent = React.FC<HeaderProps>;

  export type FooterProps = React.ComponentProps<"div">;
  export type FooterComponent = React.FC<FooterProps>;

  export type TitleProps = React.ComponentPropsWithoutRef<
    typeof DrawerPrimitive.Title
  >;
  export type TitleComponent = React.ForwardRefExoticComponent<
    TitleProps & React.RefAttributes<HTMLHeadingElement>
  >;

  export type DescriptionProps = React.ComponentPropsWithoutRef<
    typeof DrawerPrimitive.Description
  >;
  export type DescriptionComponent = React.ForwardRefExoticComponent<
    DescriptionProps & React.RefAttributes<HTMLParagraphElement>
  >;

  export type Definition = { type: "drawer" } & {
    component?: Component;
    portalComponent?: PortalComponent;
    overlayComponent?: OverlayComponent;
    triggerComponent?: TriggerComponent;
    closeComponent?: CloseComponent;
    contentComponent?: ContentComponent;
    headerComponent?: HeaderComponent;
    footerComponent?: FooterComponent;
    titleComponent?: TitleComponent;
    descriptionComponent?: DescriptionComponent;
  } & Props;
}

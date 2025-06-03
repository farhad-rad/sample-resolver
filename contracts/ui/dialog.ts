import * as DialogPrimitive from "@radix-ui/react-dialog";

export namespace Dialog {
  export type Props = React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Root
  >;
  export type Component = React.FC<Props & React.RefAttributes<HTMLDivElement>>;

  export type TriggerProps = React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Trigger
  >;
  export type TriggerComponent = React.ForwardRefExoticComponent<
    TriggerProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type PortalProps = React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Portal
  >;
  export type PortalComponent = React.FC<
    PortalProps & React.RefAttributes<HTMLDivElement>
  >;

  export type CloseProps = React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Close
  >;
  export type CloseComponent = React.ForwardRefExoticComponent<
    CloseProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type OverlayProps = React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Overlay
  >;
  export type OverlayComponent = React.ForwardRefExoticComponent<
    OverlayProps & React.RefAttributes<HTMLDivElement>
  >;

  export type ContentProps = React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Content
  >;
  export type ContentComponent = React.ForwardRefExoticComponent<
    ContentProps & React.RefAttributes<HTMLDivElement>
  >;

  export type HeaderProps = React.ComponentProps<"div">;
  export type HeaderComponent = React.FC<HeaderProps>;

  export type FooterProps = React.ComponentProps<"div">;
  export type FooterComponent = React.FC<FooterProps>;

  export type TitleProps = React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Title
  >;
  export type TitleComponent = React.ForwardRefExoticComponent<
    TitleProps & React.RefAttributes<HTMLHeadingElement>
  >;

  export type DescriptionProps = React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Description
  >;
  export type DescriptionComponent = React.ForwardRefExoticComponent<
    DescriptionProps & React.RefAttributes<HTMLParagraphElement>
  >;

  export type Definition = { type: "dialog" } & {
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

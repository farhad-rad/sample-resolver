import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, VariantProps } from "class-variance-authority";

export namespace Sheet {
  export type Props = React.ComponentPropsWithoutRef<
    typeof SheetPrimitive.Root
  >;
  export type Component = React.FC<Props & React.RefAttributes<HTMLDivElement>>;

  export type TriggerProps = React.ComponentPropsWithoutRef<
    typeof SheetPrimitive.Trigger
  >;
  export type TriggerComponent = React.ForwardRefExoticComponent<
    TriggerProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type PortalProps = React.ComponentPropsWithoutRef<
    typeof SheetPrimitive.Portal
  >;
  export type PortalComponent = React.FC<
    PortalProps & React.RefAttributes<HTMLDivElement>
  >;

  export type CloseProps = React.ComponentPropsWithoutRef<
    typeof SheetPrimitive.Close
  >;
  export type CloseComponent = React.ForwardRefExoticComponent<
    CloseProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type OverlayProps = React.ComponentPropsWithoutRef<
    typeof SheetPrimitive.Overlay
  >;
  export type OverlayComponent = React.ForwardRefExoticComponent<
    OverlayProps & React.RefAttributes<HTMLDivElement>
  >;

  export const DefaultContentVariants = cva(
    "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out border-transparent",
    {
      variants: {
        side: {
          top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
          bottom:
            "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          onSide:
            "inset-y-0 ltr:left-0 rtl:right-0 h-full w-3/4 rtl:border-l ltr:border-r ltr:data-[state=closed]:slide-out-to-left rtl:data-[state=closed]:slide-out-to-right ltr:data-[state=open]:slide-in-from-left rtl:data-[state=open]:slide-in-from-right sm:max-w-sm",
          onOtherSide:
            "inset-y-0 ltr:right-0 rtl:left-0 h-full w-3/4 ltr:border-l rtl:border-r rtl:data-[state=closed]:slide-out-to-left ltr:data-[state=closed]:slide-out-to-right rtl:data-[state=open]:slide-in-from-left ltr:data-[state=open]:slide-in-from-right sm:max-w-sm",
        },
      },
      defaultVariants: {
        side: "onSide",
      },
    }
  );
  export type ContentVariants = typeof DefaultContentVariants;

  export interface ContentProps
    extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
      VariantProps<ContentVariants> {}
  export type ContentComponent = React.ForwardRefExoticComponent<
    ContentProps & React.RefAttributes<HTMLDivElement>
  >;

  export type HeaderProps = React.ComponentProps<"div">;
  export type HeaderComponent = React.FC<HeaderProps>;

  export type FooterProps = React.ComponentProps<"div">;
  export type FooterComponent = React.FC<FooterProps>;

  export type TitleProps = React.ComponentPropsWithoutRef<
    typeof SheetPrimitive.Title
  >;
  export type TitleComponent = React.ForwardRefExoticComponent<
    TitleProps & React.RefAttributes<HTMLHeadingElement>
  >;

  export type DescriptionProps = React.ComponentPropsWithoutRef<
    typeof SheetPrimitive.Description
  >;
  export type DescriptionComponent = React.ForwardRefExoticComponent<
    DescriptionProps & React.RefAttributes<HTMLParagraphElement>
  >;

  export type Definition = { type: "sheet" } & {
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

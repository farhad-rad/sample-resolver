import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Drawer } from "./drawer";
import { Dialog } from "./dialog";

export namespace Drawialog {
  export type Props = Dialog.Props & Drawer.Props;
  export type Component = React.FC<Props & React.RefAttributes<HTMLDivElement>>;

  export type TriggerProps = Dialog.TriggerProps & Drawer.TriggerProps;
  export type TriggerComponent = React.ForwardRefExoticComponent<
    TriggerProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type ContentProps = Dialog.ContentProps & Drawer.ContentProps;
  export type ContentComponent = React.ForwardRefExoticComponent<
    ContentProps & React.RefAttributes<HTMLDivElement>
  >;

  type DesktopOrMobileOnlyIndicatorProps =
    | {
      desktopOnly?: true;
      mobileOnly?: undefined;
    }
    | {
      desktopOnly?: undefined;
      mobileOnly?: true;
    };

  export type HeaderProps = Drawer.HeaderProps & Dialog.HeaderProps &
    DesktopOrMobileOnlyIndicatorProps;
  export type HeaderComponent = React.FC<HeaderProps>;

  export type FooterProps = Drawer.FooterProps & Dialog.FooterProps &
    DesktopOrMobileOnlyIndicatorProps;
  export type FooterComponent = React.FC<FooterProps>;

  export type TitleProps = Drawer.TitleProps &Dialog.TitleProps &
    DesktopOrMobileOnlyIndicatorProps;
  export type TitleComponent = React.ForwardRefExoticComponent<
    TitleProps & React.RefAttributes<HTMLHeadingElement>
  >;

  export type DescriptionProps = Drawer.DescriptionProps & Dialog.DescriptionProps &
    DesktopOrMobileOnlyIndicatorProps;
  export type DescriptionComponent = React.ForwardRefExoticComponent<
    DescriptionProps & React.RefAttributes<HTMLParagraphElement>
  >;

  export type CloseProps = Drawer.CloseProps & Dialog.CloseProps &
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close> &
    DesktopOrMobileOnlyIndicatorProps;
  export type CloseComponent = React.ForwardRefExoticComponent<
    CloseProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type Definition = { type: "drawialog" } & {
    component?: Component;
    triggerComponent?: TriggerComponent;
    contentComponent?: ContentComponent;
    headerComponent?: HeaderComponent;
    footerComponent?: FooterComponent;
    titleComponent?: TitleComponent;
    descriptionComponent?: DescriptionComponent;
    closeComponent?: CloseComponent;
  } & Props;
}

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Popover } from "./popover";
import { Drawer } from "./drawer";

export namespace Drawover {
  export type Props = Popover.Props & Drawer.Props;
  export type Component = React.FC<Props & React.RefAttributes<HTMLDivElement>>;

  export type TriggerProps = Popover.TriggerProps & Drawer.TriggerProps;
  export type TriggerComponent = React.ForwardRefExoticComponent<
    TriggerProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type AnchorProps = Popover.AnchorProps;
  export type AnchorComponent = React.FC<
    AnchorProps & React.RefAttributes<HTMLDivElement>
  >;

  export type ContentProps = Popover.ContentProps & Drawer.ContentProps;
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

  export type HeaderProps = Drawer.HeaderProps &
    DesktopOrMobileOnlyIndicatorProps;
  export type HeaderComponent = React.FC<HeaderProps>;

  export type FooterProps = Drawer.FooterProps &
    DesktopOrMobileOnlyIndicatorProps;
  export type FooterComponent = React.FC<FooterProps>;

  export type TitleProps = Drawer.TitleProps &
    DesktopOrMobileOnlyIndicatorProps;
  export type TitleComponent = React.ForwardRefExoticComponent<
    TitleProps & React.RefAttributes<HTMLHeadingElement>
  >;

  export type DescriptionProps = Drawer.DescriptionProps &
    DesktopOrMobileOnlyIndicatorProps;
  export type DescriptionComponent = React.ForwardRefExoticComponent<
    DescriptionProps & React.RefAttributes<HTMLParagraphElement>
  >;

  export type CloseProps = Drawer.CloseProps &
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close> &
    DesktopOrMobileOnlyIndicatorProps;
  export type CloseComponent = React.ForwardRefExoticComponent<
    CloseProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type Definition = { type: "drawover" } & {
    component?: Component;
    triggerComponent?: TriggerComponent;
    anchorComponent?: AnchorComponent;
    contentComponent?: ContentComponent;
    headerComponent?: HeaderComponent;
    footerComponent?: FooterComponent;
    titleComponent?: TitleComponent;
    descriptionComponent?: DescriptionComponent;
    closeComponent?: CloseComponent;
  } & Props;
}

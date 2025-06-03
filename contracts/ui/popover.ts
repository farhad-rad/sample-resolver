import * as PopoverPrimitive from "@radix-ui/react-popover";

export namespace Popover {
  export type Props = React.ComponentPropsWithoutRef<
    typeof PopoverPrimitive.Root
  >;
  export type Component = React.FC<Props & React.RefAttributes<HTMLDivElement>>;

  export type TriggerProps = React.ComponentPropsWithoutRef<
    typeof PopoverPrimitive.Trigger
  >;
  export type TriggerComponent = React.ForwardRefExoticComponent<
    TriggerProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type AnchorProps = React.ComponentPropsWithoutRef<
    typeof PopoverPrimitive.Anchor
  >;
  export type AnchorComponent = React.FC<
    AnchorProps & React.RefAttributes<HTMLDivElement>
  >;

  export type ContentProps = React.ComponentPropsWithoutRef<
    typeof PopoverPrimitive.Content
  >;
  export type ContentComponent = React.ForwardRefExoticComponent<
    ContentProps & React.RefAttributes<HTMLDivElement>
  >;

  export type Definition = { type: "popover" } & {
    component?: Component;
    triggerComponent?: TriggerComponent;
    anchorComponent?: AnchorComponent;
    contentComponent?: ContentComponent;
  } & Props;
}

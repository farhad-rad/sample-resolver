import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

export namespace Collapsible {
  export type Props = React.ComponentPropsWithoutRef<
    typeof CollapsiblePrimitive.Root
  >;

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  >;

  export type TriggerProps = React.ComponentPropsWithoutRef<
    typeof CollapsiblePrimitive.Trigger
  >;

  export type TriggerComponent = React.ForwardRefExoticComponent<
    TriggerProps & React.RefAttributes<HTMLButtonElement>
  >;

  export interface ContentProps
    extends React.ComponentPropsWithoutRef<
      typeof CollapsiblePrimitive.Content
    > {
    noTransition?: boolean;
  }

  export type ContentComponent = React.ForwardRefExoticComponent<
    ContentProps & React.RefAttributes<HTMLDivElement>
  >;

  export type Definition = { type: "collapsible" } & {
    component?: Component;
    triggerCompooneent?: TriggerComponent;
    contentCoomponent?: ContentComponent;
  } & Props;
}

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export namespace Tooltip {
  export type Props = React.ComponentPropsWithoutRef<
    typeof TooltipPrimitive.Root
  >;
  export type Component = React.FC<Props & React.RefAttributes<HTMLDivElement>>;

  export type ProviderProps = React.ComponentPropsWithoutRef<
    typeof TooltipPrimitive.Provider
  >;
  export type ProviderComponent = React.FC<
    ProviderProps & React.RefAttributes<HTMLDivElement>
  >;

  export type TriggerProps = React.ComponentPropsWithoutRef<
    typeof TooltipPrimitive.Trigger
  >;
  export type TriggerComponent = React.ForwardRefExoticComponent<
    TriggerProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type ContentProps = React.ComponentPropsWithoutRef<
    typeof TooltipPrimitive.Content
  >;
  export type ContentComponent = React.ForwardRefExoticComponent<
    ContentProps & React.RefAttributes<HTMLDivElement>
  >;

  export type Definition = { type: "tooltip" } & {
    component?: Component;
    providerCompooneent?: ProviderComponent;
    triggerCompooneent?: TriggerComponent;
    contentCoomponent?: ContentComponent;
  } & Props;
}

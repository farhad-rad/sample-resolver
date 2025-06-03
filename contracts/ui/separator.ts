import * as SeparatorPrimitive from "@radix-ui/react-separator";

export namespace Separator {
  export type Props = React.ComponentPropsWithoutRef<
    typeof SeparatorPrimitive.Root
  >;
  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  >;

  export type Definition = { type: "separator" } & {
    component?: Component;
  } & Props;
}

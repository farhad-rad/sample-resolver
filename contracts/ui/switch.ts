import * as SwitchPrimitive from "@radix-ui/react-switch";

export namespace Switch {
  export type Props = React.ComponentPropsWithoutRef<
    typeof SwitchPrimitive.Root
  >;

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLButtonElement>
  >;
}

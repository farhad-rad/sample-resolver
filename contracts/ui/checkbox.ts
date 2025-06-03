import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

export namespace Checkbox {
  export type Props = React.ComponentPropsWithoutRef<
    typeof CheckboxPrimitive.Root
  >;

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLButtonElement>
  >;

  export type Definition = { type: "checkbox" } & {
    component?: Component;
  } & Props;
}

import { cva, VariantProps } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label"

export namespace Label {
  export const DefaultVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  );

  export type Variants = typeof DefaultVariants;

  export interface Props
    extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
      VariantProps<Variants> {}

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLLabelElement>
  >;

  export type Definition = { type: "label" } & {
    component?: Component;
  } & Props;
}

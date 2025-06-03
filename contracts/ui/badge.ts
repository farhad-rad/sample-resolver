import { cva, VariantProps } from "class-variance-authority";
import { ComponentDefinitions, IComponentDefinition } from ".";

export namespace Badge {
  export const DefaultVariants = cva(
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
      variants: {
        variant: {
          // Dominant
          dominant: "dominant",
          "dominant-outline": "dominant-outline",
          "dominant-filled": "dominant-filled",
          "dominant-dashed": "dominant-dashed",
          "dominant-ghost": "dominant-ghost",

          // Complement
          complement: "complement",
          "complement-outline": "complement-outline",
          "complement-filled": "complement-filled",
          "complement-dashed": "complement-dashed",
          "complement-ghost": "complement-ghost",

          // Warning
          warning: "warning",
          "warning-outline": "warning-outline",
          "warning-filled": "warning-filled",
          "warning-dashed": "warning-dashed",
          "warning-ghost": "warning-ghost",

          // Information
          information: "information",
          "information-outline": "information-outline",
          "information-filled": "information-filled",
          "information-dashed": "information-dashed",
          "information-ghost": "information-ghost",

          // Error
          error: "error",
          "error-outline": "error-outline",
          "error-filled": "error-filled",
          "error-dashed": "error-dashed",
          "error-ghost": "error-ghost",

          // Gray
          gray: "gray",
          "gray-outline": "gray-outline",
          "gray-filled": "gray-filled",
          "gray-dashed": "gray-dashed",
          "gray-ghost": "gray-ghost",
        },
      },
      defaultVariants: {
        variant: "dominant",
      },
    }
  );

  export type Variants = typeof DefaultVariants;

  export interface Props
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<Variants> { }

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  >;

  export type Definition = IComponentDefinition<"badge"> &
    VariantProps<Variants> & {
      contents: string | React.ComponentType | ComponentDefinitions;
      more?: {
        props?: Omit<Props, "children" | "variant">;
      };
    };
}

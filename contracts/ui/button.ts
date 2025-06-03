import { cva, VariantProps } from "class-variance-authority";

export namespace Button {
  export const DefaultVariants = cva("panelly-button", {
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
      size: {
        default: "default",
        sm: "sm",
        lg: "lg",
        icon: "icon",
      },
      width: {
        full: "w-full",
        "max-content": "w-max",
      },
      loading: {
        true: "loading",
        false: "",
      },
    },
    defaultVariants: {
      variant: "dominant",
      size: "default",
      width: "max-content",
      loading: false,
    },
  });

  export type Variants = typeof DefaultVariants;

  export interface Props
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<Variants> {}

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLButtonElement>
  >;

  export type Definition = { type: "button" } & {
    component?: Component;
  } & Props;
}

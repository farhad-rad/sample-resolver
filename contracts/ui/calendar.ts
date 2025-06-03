import { cva, VariantProps } from "class-variance-authority";
import { Calendar as CalendarBase } from "react-multi-date-picker";

export namespace Calendar {
  export const DefaultVariants = cva("", {
    variants: {},
    defaultVariants: {},
  });

  export type Variants = typeof DefaultVariants;

  export interface Props
    extends Omit<
        React.ComponentProps<typeof CalendarBase>,
        "calendar" | "locale"
      >,
      VariantProps<Variants> {
    calendar?: "jalali" | "gregorian" | "hijri" | "hindi";
  }

  export type Component = React.FC<Calendar.Props>;

  export type Definition = { type: "calendar" } & {
    component?: Component;
  } & Props;
}

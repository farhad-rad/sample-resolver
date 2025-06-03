import { LucideProps } from "lucide-react";

export namespace CustomIcons {
  type CommonProps = Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>;

  export type ClockNowProps = CommonProps & { customHour?: number }
  export type ClockNowComponent = React.FC<
    ClockNowProps
  >;
}

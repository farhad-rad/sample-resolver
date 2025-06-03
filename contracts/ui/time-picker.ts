export namespace TimePicker {
  export type Props = any;
  export type Component = React.FC<Props>;

  export type Definition = { type: "time-picker" } & {
    component?: Component;
  } & Props;
}

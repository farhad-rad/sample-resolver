export namespace Skeleton {
  export type Props = React.ComponentPropsWithoutRef<"div">;
  export type Component = React.FC<Props & React.RefAttributes<HTMLDivElement>>;

  export type Definition = { type: "skeleton" } & {
    component?: Component;
  } & Props;
}

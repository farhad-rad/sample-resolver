import { ReactNode } from "react";

export namespace Breadcrumb {
  export type Props = React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  };

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLElement>
  >;

  export type ListProps = React.ComponentPropsWithoutRef<"ol">;

  export type ListComponent = React.ForwardRefExoticComponent<
    ListProps & React.RefAttributes<HTMLOListElement>
  >;

  export type ItemProps = React.ComponentPropsWithoutRef<"li">;

  export type ItemComponent = React.ForwardRefExoticComponent<
    ItemProps & React.RefAttributes<HTMLLIElement>
  >;

  export type LinkProps = React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  };

  export type LinkComponent = React.ForwardRefExoticComponent<
    LinkProps & React.RefAttributes<HTMLAnchorElement>
  >;

  export type PageProps = React.ComponentPropsWithoutRef<"span">;

  export type PageComponent = React.ForwardRefExoticComponent<
    PageProps & React.RefAttributes<HTMLSpanElement>
  >;

  export type SeparatorProps = React.ComponentProps<"li">;
  export type SeparatorComponent = React.FC<SeparatorProps>;

  export type EllipsisProps = React.ComponentProps<"span">;
  export type EllipsisComponent = React.FC<EllipsisProps>;

  export type Definition = { type: "breadcrumb" } & {
    component?: Component;
    listComponent?: ListComponent;
    itemComponent?: ItemComponent;
    linkComponent?: LinkComponent;
    pageComponent?: PageComponent;
    separatorComponent?: SeparatorComponent;
    ellipsisComponent?: EllipsisComponent;
  } & Props;
}

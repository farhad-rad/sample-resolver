import { ReactNode } from "react";
import { Button } from "./button";

export namespace Table {
  export type Props = React.ComponentPropsWithoutRef<"table">;
  export type Component = React.FC<
    Props & React.RefAttributes<HTMLTableElement>
  >;

  export type HeaderProps = React.ComponentPropsWithoutRef<"thead">;
  export type HeaderComponent = React.FC<
    HeaderProps & React.RefAttributes<HTMLTableSectionElement>
  >;

  export type BodyProps = React.ComponentPropsWithoutRef<"tbody">;
  export type BodyComponent = React.FC<
    BodyProps & React.RefAttributes<HTMLTableSectionElement>
  >;

  export type FooterProps = React.ComponentPropsWithoutRef<"tfoot">;
  export type FooterComponent = React.FC<
    FooterProps & React.RefAttributes<HTMLTableSectionElement>
  >;

  export type RowProps = React.ComponentPropsWithoutRef<"tr">;
  export type RowComponent = React.FC<
    RowProps & React.RefAttributes<HTMLTableRowElement>
  >;

  export type HeadProps = React.ComponentPropsWithoutRef<"th">;
  export type HeadComponent = React.FC<
    HeadProps & React.RefAttributes<HTMLTableCellElement>
  >;

  export type SortableHeadProps = React.HTMLAttributes<HTMLDivElement> & {
    sortState?: "asc" | "desc" | null;
    toggleSort?: (current: "asc" | "desc" | null) => void;
    disabled?: boolean;
    icons?: {
      idle?: React.ComponentType;
      asc?: React.ComponentType;
      desc?: React.ComponentType;
    };
  };
  export type SortableHeadComponent = React.ForwardRefExoticComponent<
    SortableHeadProps & React.RefAttributes<HTMLDivElement>
  >;

  export type CellProps = React.ComponentPropsWithoutRef<"td">;
  export type CellComponent = React.FC<
    CellProps & React.RefAttributes<HTMLTableCellElement>
  >;

  export type CaptionProps = React.ComponentPropsWithoutRef<"caption">;
  export type CaptionComponent = React.FC<
    CaptionProps & React.RefAttributes<HTMLTableCaptionElement>
  >;

  export type EmptyProps = {
    text?: string;
    actions?: (Button.Props | Button.Component)[];
  };
  export type EmptyComponent = React.ForwardRefExoticComponent<
    EmptyProps & React.RefAttributes<HTMLDivElement>
  >;

  export type LoadingProps = {
    contents?: ReactNode | ReactNode[];
  };
  export type LoadingComponent = React.ForwardRefExoticComponent<
    LoadingProps & React.RefAttributes<HTMLDivElement>
  >;

  export type PaginationProps = React.HTMLAttributes<HTMLDivElement> & {
    pageSizes?: number[],
    pageSize: number,
    setPageSize: (size: number) => void,
    page: number,
    setPage: (page: number) => void,
    lastPage: number,
    selectedIndicatorText: ReactNode,
    rowIndicatorText: ReactNode,
    pageIndicatorText: ReactNode,
    zeroIndexedPages?: boolean,
  };
  export type PaginationComponent = React.ForwardRefExoticComponent<
    PaginationProps & React.RefAttributes<HTMLDivElement>
  >;

  export type Definition = { type: "table" } & {
    component: Component;
    headerComponent: HeaderComponent;
    bodyComponent: BodyComponent;
    footerComponent: FooterComponent;
    headComponent: HeadComponent;
    rowComponent: RowComponent;
    cellComponent: CellComponent;
    captionComponent: CaptionComponent;
  } & Props;
}

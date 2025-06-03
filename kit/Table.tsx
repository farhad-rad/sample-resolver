import "./Table.scss";
import * as React from "react";
import { cn } from "@/utilities/helpers";
import { Table as TableNS } from "@/contracts/ui/table";
import { ArrowDown10, ArrowUp01, ArrowUpDown,  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,} from "lucide-react";
import { Resolver } from "@/modules/resolver/Resolver";

const Table: TableNS.Component = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

const TableHeader: TableNS.HeaderComponent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

const TableBody: TableNS.BodyComponent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
);
TableBody.displayName = "TableBody";

const TableFooter: TableNS.FooterComponent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
);
TableFooter.displayName = "TableFooter";

const TableRow: TableNS.RowComponent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

const TableHead: TableNS.HeadComponent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-2 text-start align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:text-center [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

const TableSortableHead: TableNS.SortableHeadComponent = React.forwardRef(
  (
    {
      toggleSort,
      sortState,
      className,
      children,
      icons = {},
      disabled = false,
      ...props
    },
    ref
  ) => {
    const {
      idle: IdleIcon = ArrowUpDown,
      asc: AscIcon = ArrowUp01,
      desc: DescIcon = ArrowDown10,
    } = icons;
    const canSort = React.useMemo(
      () => !disabled && !!toggleSort,
      [toggleSort, disabled]
    );
    return (
      <div
        className={cn(
          "flex items-center justify-start gap-2 w-full h-full select-none",
          canSort ? "cursor-pointer" : "",
          className
        )}
        onClick={() => toggleSort && toggleSort(sortState ?? null)}
        ref={ref}
        {...props}
      >
        {canSort &&
          (sortState === "desc" ? (
            <DescIcon className="text-information-400" size={16} />
          ) : sortState === "asc" ? (
            <AscIcon className="text-information-400" size={16} />
          ) : (
            <IdleIcon className="text-gray-400" size={16} />
          ))}
        <span>{children}</span>
      </div>
    );
  }
);
TableSortableHead.displayName = "TableSortableHead";

const TableCell: TableNS.CellComponent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "h-full p-2 align-middle [&:has([role=checkbox])]:text-center [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

const TableCaption: TableNS.CaptionComponent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
TableCaption.displayName = "TableCaption";

const TableEmpty: TableNS.EmptyComponent = React.forwardRef(
  ({ text = "No Results", actions = [] }, ref) => {
    return (
      <div
        className="w-full h-full flex flex-col justify-center items-center"
        ref={ref}
      >
        <div>{text}</div>
        <div className="flex gap-4">
          {actions.map((actionProps, i) => (
            <Resolver.Button key={i} {...actionProps} />
          ))}
        </div>
      </div>
    );
  }
);
TableEmpty.displayName = "TableEmpty";

const TableLoading: TableNS.LoadingComponent = React.forwardRef(
  ({ contents = "Loading" }, ref) => {
    return (
      <div
        className="w-full h-full flex flex-col justify-center items-center"
        ref={ref}
      >
        {contents}
      </div>
    );
  }
);
TableLoading.displayName = "TableLoading";

const TablePagination: TableNS.PaginationComponent = React.forwardRef(
  ({
    // pageSizes = [10, 20, 30, 40, 50],
    // pageSize,
    // setPageSize,
    selectedIndicatorText,
    rowIndicatorText,
    pageIndicatorText,
    page,
    setPage,
    zeroIndexedPages = false,
    lastPage,
  }, ref) => {
    const firstPage = Number(!zeroIndexedPages);

    return (
      <div className="flex items-center justify-between" ref={ref}>
        <div className="flex-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 space-x-2">
            {/* <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizes.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
            <span className="text-sm font-medium">
              {rowIndicatorText}
              <span className="text-information-400 ms-2">
                {selectedIndicatorText}
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div
            className="flex items-center gap-2 !m-0"
            style={{ direction: "ltr" }}
          >
            <Resolver.Button
              variant="gray-outline"
              className="hidden !h-8 w-8 p-0 lg:flex !border-gray-300"
              onClick={() => setPage(firstPage)}
              disabled={page <= firstPage}
              size={"icon"}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Resolver.Button>
            <Resolver.Button
              variant="gray-outline"
              className="!h-8 w-8 p-0 !border-gray-300"
              onClick={() => setPage(page - 1)}
              disabled={page <= firstPage}
              size={"icon"}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Resolver.Button>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              {pageIndicatorText}
            </div>
            <Resolver.Button
              variant="gray-outline"
              className="!h-8 w-8 p-0 !border-gray-300"
              onClick={() => setPage(page + 1)}
              disabled={page >= lastPage}
              size={"icon"}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Resolver.Button>
            <Resolver.Button
              variant="gray-outline"
              className="hidden !h-8 w-8 p-0 lg:flex !border-gray-300"
              onClick={() => setPage(lastPage)}
              disabled={page >= lastPage}
              size={"icon"}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Resolver.Button>
          </div>
        </div>
      </div>
    );
  }
);
TablePagination.displayName = "TablePagination";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableSortableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableEmpty,
  TableLoading,
  TablePagination
};

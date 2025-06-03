import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { Breadcrumb } from "./breadcrumb";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Card } from "./card";
import { Checkbox } from "./checkbox";
import { Collapsible } from "./collapsible";
import { Command } from "./command";
import { Dialog } from "./dialog";
import { Drawer } from "./drawer";
import { Drawover } from "./drawover";
import { Drawialog } from "./drawialog";
import { DropdownMenu } from "./dropdown-menu";
import { Label } from "./label";
import { Popover } from "./popover";
import { Separator } from "./separator";
import { Sheet } from "./sheet";
import { Sidebar } from "./sidebar";
import { Skeleton } from "./skeleton";
import { Table } from "./table";
import { TimePicker } from "./time-picker";
import { Toggle } from "./toggle";
import { Tooltip } from "./tooltip";
import { Framer } from "./framer";
import { Form } from "./form";
import { Inputs } from "./inputs";
import { CustomIcons } from "./custom-icons";
import { Switch } from "./switch";

type PanelGridSpanCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type PanelGridSpan =
  | PanelGridSpanCount
  | {
    [param in "xxl" | "xl" | "lg" | "md" | "sm" | "xs"]: PanelGridSpanCount;
  };

export type PanelPageContentItemKit = BaseKit &
  (SingleBoxKit | GridKit | HorizontalScrollKit);
export type BaseKit = {
  capsule?: boolean;
};

export type SingleBoxKit = {
  type: "single-box";
  className?: string;
  contents: React.ComponentType | (ComponentDefinitions | React.ComponentType)[];
};
export type GridKit = {
  type: "grid";
  items: {
    span?: PanelGridSpan;
    capsule?: boolean;
    className?: string;
    contents: React.ComponentType | (ComponentDefinitions | React.ComponentType)[];
  }[];
};
export type HorizontalScrollKit = {
  type: "horizontal-scroll";
};

export type IComponentDefinition<TType extends string> = {
  type: TType;
  ui?: Partial<ApplicationUserInterface>;
};

export type ComponentDefinitions =
  | Avatar.Definition
  | Badge.Definition
  | Button.Definition
  | Calendar.Definition;


export type ApplicationUserInterface = {
  Avatar: Avatar.Component;
  AvatarImage: Avatar.ImageComponent;
  AvatarFallback: Avatar.FallbackComponent;
  Badge: Badge.Component;
  Breadcrumb: Breadcrumb.Component;
  BreadcrumbList: Breadcrumb.ListComponent;
  BreadcrumbItem: Breadcrumb.ItemComponent;
  BreadcrumbLink: Breadcrumb.LinkComponent;
  BreadcrumbPage: Breadcrumb.PageComponent;
  BreadcrumbSeparator: Breadcrumb.SeparatorComponent;
  BreadcrumbEllipsis: Breadcrumb.EllipsisComponent;
  Button: Button.Component;
  Calendar: Calendar.Component;
  Card: Card.Component;
  CardHeader: Card.HeaderComponent;
  CardTitle: Card.TitleComponent;
  CardDescription: Card.DescriptionComponent;
  CardContent: Card.ContentComponent;
  CardFooter: Card.FooterComponent;
  Checkbox: Checkbox.Component;
  Collapsible: Collapsible.Component;
  CollapsibleTrigger: Collapsible.TriggerComponent;
  CollapsibleContent: Collapsible.ContentComponent;
  Command: Command.Component;
  CommandDialog: Command.DialogComponent;
  CommandInput: Command.InputComponent;
  CommandList: Command.ListComponent;
  CommandEmpty: Command.EmptyComponent;
  CommandGroup: Command.GroupComponent;
  CommandItem: Command.ItemComponent;
  CommandShortcut: Command.ShortcutComponent;
  CommandSeparator: Command.SeparatorComponent;
  Dialog: Dialog.Component;
  DialogPortal: Dialog.PortalComponent;
  DialogOverlay: Dialog.OverlayComponent;
  DialogTrigger: Dialog.TriggerComponent;
  DialogClose: Dialog.CloseComponent;
  DialogContent: Dialog.ContentComponent;
  DialogHeader: Dialog.HeaderComponent;
  DialogFooter: Dialog.FooterComponent;
  DialogTitle: Dialog.TitleComponent;
  DialogDescription: Dialog.DescriptionComponent;
  Drawer: Drawer.Component;
  DrawerPortal: Drawer.PortalComponent;
  DrawerOverlay: Drawer.OverlayComponent;
  DrawerTrigger: Drawer.TriggerComponent;
  DrawerClose: Drawer.CloseComponent;
  DrawerContent: Drawer.ContentComponent;
  DrawerHeader: Drawer.HeaderComponent;
  DrawerFooter: Drawer.FooterComponent;
  DrawerTitle: Drawer.TitleComponent;
  DrawerDescription: Drawer.DescriptionComponent;
  Drawover: Drawover.Component;
  DrawoverTrigger: Drawover.TriggerComponent;
  DrawoverContent: Drawover.ContentComponent;
  DrawoverAnchor: Drawover.AnchorComponent;
  DrawoverHeader: Drawover.HeaderComponent;
  DrawoverTitle: Drawover.TitleComponent;
  DrawoverDescription: Drawover.DescriptionComponent;
  DrawoverFooter: Drawover.FooterComponent;
  DrawoverClose: Drawover.CloseComponent;
  Drawialog: Drawialog.Component;
  DrawialogTrigger: Drawialog.TriggerComponent;
  DrawialogContent: Drawialog.ContentComponent;
  DrawialogHeader: Drawialog.HeaderComponent;
  DrawialogTitle: Drawialog.TitleComponent;
  DrawialogDescription: Drawialog.DescriptionComponent;
  DrawialogFooter: Drawialog.FooterComponent;
  DrawialogClose: Drawialog.CloseComponent;
  DropdownMenu: DropdownMenu.Component;
  DropdownMenuTrigger: DropdownMenu.TriggerComponent;
  DropdownMenuContent: DropdownMenu.ContentComponent;
  DropdownMenuItem: DropdownMenu.ItemComponent;
  DropdownMenuCheckboxItem: DropdownMenu.CheckboxItemComponent;
  DropdownMenuRadioItem: DropdownMenu.RadioItemComponent;
  DropdownMenuLabel: DropdownMenu.LabelComponent;
  DropdownMenuSeparator: DropdownMenu.SeparatorComponent;
  DropdownMenuShortcut: DropdownMenu.ShortcutComponent;
  DropdownMenuGroup: DropdownMenu.GroupComponent;
  DropdownMenuPortal: DropdownMenu.PortalComponent;
  DropdownMenuSub: DropdownMenu.SubComponent;
  DropdownMenuSubContent: DropdownMenu.SubContentComponent;
  DropdownMenuSubTrigger: DropdownMenu.SubTriggerComponent;
  DropdownMenuRadioGroup: DropdownMenu.RadioGroupComponent;
  Form: Form.Component,
  FormControl: Form.ControlComponent,
  FormDescription: Form.DescriptionComponent,
  FormField: Form.FieldComponent,
  FormItem: Form.ItemComponent,
  FormLabel: Form.LabelComponent,
  FormMessage: Form.MessageComponent,
  Framer: Framer.Component;
  Label: Label.Component;
  Popover: Popover.Component;
  PopoverTrigger: Popover.TriggerComponent;
  PopoverContent: Popover.ContentComponent;
  PopoverAnchor: Popover.AnchorComponent;
  Separator: Separator.Component;
  Sheet: Sheet.Component;
  SheetPortal: Sheet.PortalComponent;
  SheetOverlay: Sheet.OverlayComponent;
  SheetTrigger: Sheet.TriggerComponent;
  SheetClose: Sheet.CloseComponent;
  SheetContent: Sheet.ContentComponent;
  SheetHeader: Sheet.HeaderComponent;
  SheetFooter: Sheet.FooterComponent;
  SheetTitle: Sheet.TitleComponent;
  SheetDescription: Sheet.DescriptionComponent;
  Sidebar: Sidebar.Component;
  SidebarContent: Sidebar.ContentComponent;
  SidebarFooter: Sidebar.FooterComponent;
  SidebarGroup: Sidebar.GroupComponent;
  SidebarGroupAction: Sidebar.GroupActionComponent;
  SidebarGroupContent: Sidebar.GroupContentComponent;
  SidebarGroupLabel: Sidebar.GroupLabelComponent;
  SidebarHeader: Sidebar.HeaderComponent;
  SidebarInput: Sidebar.InputComponent;
  SidebarInset: Sidebar.InsetComponent;
  SidebarMenu: Sidebar.MenuComponent;
  SidebarMenuAction: Sidebar.MenuActionComponent;
  SidebarMenuBadge: Sidebar.MenuBadgeComponent;
  SidebarMenuButton: Sidebar.MenuButtonComponent;
  SidebarMenuItem: Sidebar.MenuItemComponent;
  SidebarMenuSkeleton: Sidebar.MenuSkeletonComponent;
  SidebarMenuSub: Sidebar.MenuSubComponent;
  SidebarMenuSubButton: Sidebar.MenuSubButtonComponent;
  SidebarMenuSubItem: Sidebar.MenuSubItemComponent;
  SidebarProvider: Sidebar.ProviderComponent;
  SidebarRail: Sidebar.RailComponent;
  SidebarSeparator: Sidebar.SeparatorComponent;
  SidebarTrigger: Sidebar.TriggerComponent;
  Skeleton: Skeleton.Component;
  Switch: Switch.Component;
  Table: Table.Component;
  TableHeader: Table.HeaderComponent;
  TableBody: Table.BodyComponent;
  TableFooter: Table.FooterComponent;
  TableHead: Table.HeadComponent;
  TableSortableHead: Table.SortableHeadComponent;
  TableRow: Table.RowComponent;
  TableCell: Table.CellComponent;
  TableCaption: Table.CaptionComponent;
  TableEmpty: Table.EmptyComponent;
  TableLoading: Table.LoadingComponent;
  TablePagination: Table.PaginationComponent;
  TimePicker: TimePicker.Component;
  Toggle: Toggle.Component;
  ToggleGroup: Toggle.GroupComponent;
  ToggleGroupItem: Toggle.GroupItemComponent;
  Tooltip: Tooltip.Component;
  TooltipTrigger: Tooltip.TriggerComponent;
  TooltipContent: Tooltip.ContentComponent;
  TooltipProvider: Tooltip.ProviderComponent;
  // #Region: Inputs
  SimpleInput: Inputs.SimpleComponent;
  DateInput: Inputs.DateComponent;
  DatetimeInput: Inputs.DatetimeComponent;
  TimeInput: Inputs.TimeComponent;
  CheckboxInput: Inputs.CheckboxComponent;
  SwitchInput: Inputs.SwitchComponent;
  SelectInput: Inputs.SelectComponent;
  RadioInput: Inputs.RadioComponent;
  TextareaInput: Inputs.TextareaComponent;
  TaggedTextareaInput: Inputs.TaggedTextareaComponent;
  TaggedTextareaController: Inputs.TaggedTextareaControllerComponent;
  // #EndRegion: Inputs
  // #Region: CustomIcons
  ClockNowIcon: CustomIcons.ClockNowComponent;
  // #EndRegion: CustomIcons
};


export const panellyComponentNames = [
  "BaseLayout",
  "LandingLayout",
  "PanelLayout",
  "AuthLayout",
  "Avatar",
  "AvatarImage",
  "AvatarFallback",
  "Badge",
  "Breadcrumb",
  "BreadcrumbList",
  "BreadcrumbItem",
  "BreadcrumbLink",
  "BreadcrumbPage",
  "BreadcrumbSeparator",
  "BreadcrumbEllipsis",
  "Button",
  "Calendar",
  "Card",
  "CardHeader",
  "CardTitle",
  "CardDescription",
  "CardContent",
  "CardFooter",
  "Checkbox",
  "Collapsible",
  "CollapsibleTrigger",
  "CollapsibleContent",
  "Command",
  "CommandDialog",
  "CommandInput",
  "CommandList",
  "CommandEmpty",
  "CommandGroup",
  "CommandItem",
  "CommandShortcut",
  "CommandSeparator",
  "Dialog",
  "DialogPortal",
  "DialogOverlay",
  "DialogTrigger",
  "DialogClose",
  "DialogContent",
  "DialogHeader",
  "DialogFooter",
  "DialogTitle",
  "DialogDescription",
  "Drawer",
  "DrawerPortal",
  "DrawerOverlay",
  "DrawerTrigger",
  "DrawerClose",
  "DrawerContent",
  "DrawerHeader",
  "DrawerFooter",
  "DrawerTitle",
  "DrawerDescription",
  "Drawover",
  "DrawoverTrigger",
  "DrawoverContent",
  "DrawoverAnchor",
  "DrawoverHeader",
  "DrawoverTitle",
  "DrawoverDescription",
  "DrawoverFooter",
  "DrawoverClose",
  "Drawialog",
  "DrawialogTrigger",
  "DrawialogContent",
  "DrawialogAnchor",
  "DrawialogHeader",
  "DrawialogTitle",
  "DrawialogDescription",
  "DrawialogFooter",
  "DrawialogClose",
  "DropdownMenu",
  "DropdownMenuTrigger",
  "DropdownMenuContent",
  "DropdownMenuItem",
  "DropdownMenuCheckboxItem",
  "DropdownMenuRadioItem",
  "DropdownMenuLabel",
  "DropdownMenuSeparator",
  "DropdownMenuShortcut",
  "DropdownMenuGroup",
  "DropdownMenuPortal",
  "DropdownMenuSub",
  "DropdownMenuSubContent",
  "DropdownMenuSubTrigger",
  "DropdownMenuRadioGroup",
  "Form",
  "FormControl",
  "FormDescription",
  "FormField",
  "FormItem",
  "FormLabel",
  "FormMessage",
  "Framer",
  "Label",
  "Popover",
  "PopoverTrigger",
  "PopoverContent",
  "PopoverAnchor",
  "Separator",
  "Sheet",
  "SheetPortal",
  "SheetOverlay",
  "SheetTrigger",
  "SheetClose",
  "SheetContent",
  "SheetHeader",
  "SheetFooter",
  "SheetTitle",
  "SheetDescription",
  "Sidebar",
  "SidebarContent",
  "SidebarFooter",
  "SidebarGroup",
  "SidebarGroupAction",
  "SidebarGroupContent",
  "SidebarGroupLabel",
  "SidebarHeader",
  "SidebarInput",
  "SidebarInset",
  "SidebarMenu",
  "SidebarMenuAction",
  "SidebarMenuBadge",
  "SidebarMenuButton",
  "SidebarMenuItem",
  "SidebarMenuSkeleton",
  "SidebarMenuSub",
  "SidebarMenuSubButton",
  "SidebarMenuSubItem",
  "SidebarProvider",
  "SidebarRail",
  "SidebarSeparator",
  "SidebarTrigger",
  "Skeleton",
  "Switch",
  "Table",
  "TableHeader",
  "TableBody",
  "TableFooter",
  "TableHead",
  "TableSortableHead",
  "TableRow",
  "TableCell",
  "TableCaption",
  "TableEmpty",
  "TableLoading",
  "TablePagination",
  "TimePicker",
  "Toggle",
  "ToggleGroup",
  "ToggleGroupItem",
  "Tooltip",
  "TooltipTrigger",
  "TooltipContent",
  "TooltipProvider",
  "SimpleInput",
  "DateInput",
  "DatetimeInput",
  "TimeInput",
  "CheckboxInput",
  "SwitchInput",
  "SelectInput",
  "RadioInput",
  "TextareaInput",
  "TaggedTextareaInput",
  "TaggedTextareaController",
  "ClockNowIcon"
] as (keyof ApplicationUserInterface)[];

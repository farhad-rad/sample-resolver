import { Command as CommandPrimitive } from "cmdk";
import { type DialogProps as DialogPropsBase } from "@radix-ui/react-dialog";

export namespace Command {
  export type Props = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;
  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  >;

  export type DialogProps = DialogPropsBase;
  export type DialogComponent = React.FC<DialogProps>;

  export type InputProps = React.ComponentPropsWithoutRef<
    typeof CommandPrimitive.Input
  >;
  export type InputComponent = React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLInputElement>
  >;

  export type ListProps = React.ComponentPropsWithoutRef<
    typeof CommandPrimitive.List
  >;
  export type ListComponent = React.ForwardRefExoticComponent<
    ListProps & React.RefAttributes<HTMLDivElement>
  >;

  export type EmptyProps = React.ComponentPropsWithoutRef<
    typeof CommandPrimitive.Empty
  >;
  export type EmptyComponent = React.ForwardRefExoticComponent<
    EmptyProps & React.RefAttributes<HTMLDivElement>
  >;

  export type GroupProps = React.ComponentPropsWithoutRef<
    typeof CommandPrimitive.Group
  >;
  export type GroupComponent = React.ForwardRefExoticComponent<
    GroupProps & React.RefAttributes<HTMLDivElement>
  >;

  export type SeparatorProps = React.ComponentPropsWithoutRef<
    typeof CommandPrimitive.Separator
  >;
  export type SeparatorComponent = React.ForwardRefExoticComponent<
    SeparatorProps & React.RefAttributes<HTMLDivElement>
  >;

  export type ItemProps = React.ComponentPropsWithoutRef<
    typeof CommandPrimitive.Item
  >;
  export type ItemComponent = React.ForwardRefExoticComponent<
    ItemProps & React.RefAttributes<HTMLDivElement>
  >;

  export type ShortcutProps = React.ComponentProps<"span">;
  export type ShortcutComponent = React.FC<ShortcutProps>;

  export type Definition = { type: "command" } & {
    component?: Component;
    dialogComponent?: DialogComponent;
    inputComponent?: InputComponent;
    listComponent?: ListComponent;
    emptyComponent?: EmptyComponent;
    groupComponent?: GroupComponent;
    separatorComponent?: SeparatorComponent;
    itemComponent?: ItemComponent;
    shortcutComponent?: ShortcutComponent;
  } & Props;
}

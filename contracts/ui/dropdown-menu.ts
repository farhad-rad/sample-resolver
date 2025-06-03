import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export namespace DropdownMenu {
  export type Props = React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.Root
  >;
  export type Component = React.FC<Props & React.RefAttributes<HTMLDivElement>>;

  export type TriggerProps = React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.Trigger
  >;
  export type TriggerComponent = React.ForwardRefExoticComponent<
    TriggerProps & React.RefAttributes<HTMLButtonElement>
  >;

  export type GroupProps = React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.Group
  >;
  export type GroupComponent = React.FC<
    GroupProps & React.RefAttributes<HTMLDivElement>
  >;

  export type PortalProps = React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.Portal
  >;
  export type PortalComponent = React.FC<
    PortalProps & React.RefAttributes<HTMLDivElement>
  >;

  export type SubProps = React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.Sub
  >;
  export type SubComponent = React.FC<
    SubProps & React.RefAttributes<HTMLDivElement>
  >;

  export type RadioGroupProps = React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.RadioGroup
  >;
  export type RadioGroupComponent = React.FC<
    RadioGroupProps & React.RefAttributes<HTMLDivElement>
  >;

  export type SubTriggerProps = React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.SubTrigger
  >;
  export type SubTriggerComponent = React.FC<
    SubTriggerProps & React.RefAttributes<HTMLDivElement>
  >;

  export type SubContentProps = React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.SubContent
  >;
  export type SubContentComponent = React.FC<
    SubContentProps & React.RefAttributes<HTMLDivElement>
  >;

  export type ContentProps = React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.Content
  >;
  export type ContentComponent = React.ForwardRefExoticComponent<
    ContentProps & React.RefAttributes<HTMLDivElement>
  >;

  export type ItemProps = React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.Item
  >;
  export type ItemComponent = React.ForwardRefExoticComponent<
    ItemProps & React.RefAttributes<HTMLDivElement>
  >;

  export type CheckboxItemProps = React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.CheckboxItem
  >;
  export type CheckboxItemComponent = React.ForwardRefExoticComponent<
    CheckboxItemProps & React.RefAttributes<HTMLDivElement>
  >;

  export type RadioItemProps = React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.RadioItem
  >;
  export type RadioItemComponent = React.ForwardRefExoticComponent<
    RadioItemProps & React.RefAttributes<HTMLDivElement>
  >;

  export type LabelProps = React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.Label
  >;
  export type LabelComponent = React.ForwardRefExoticComponent<
    LabelProps & React.RefAttributes<HTMLDivElement>
  >;

  export type SeparatorProps = React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.Separator
  >;
  export type SeparatorComponent = React.ForwardRefExoticComponent<
    SeparatorProps & React.RefAttributes<HTMLDivElement>
  >;

  export type ShortcutProps = React.ComponentProps<"span">;
  export type ShortcutComponent = React.FC<ShortcutProps>;

  export type Definition = { type: "dropdown" } & {
    component: Component;
    triggerComponent: TriggerComponent;
    contentComponent: ContentComponent;
    itemComponent: ItemComponent;
    checkboxItemComponent: CheckboxItemComponent;
    radioItemComponent: RadioItemComponent;
    labelComponent: LabelComponent;
    separatorComponent: SeparatorComponent;
    shortcutComponent: ShortcutComponent;
    groupComponent: GroupComponent;
    portalComponent: PortalComponent;
    subComponent: SubComponent;
    subContentComponent: SubContentComponent;
    subTriggerComponent: SubTriggerComponent;
    radioGroupComponent: RadioGroupComponent;
  } & Props;
}

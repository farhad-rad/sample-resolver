import "./SelectInput.scss";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useLanguage } from "@/services/languageService";
import { Resolver } from "@/modules/resolver/Resolver";
import { cn } from "@/utilities/helpers";
import { Inputs as InputsNS } from "@/contracts/ui/inputs";

const defaultCompareFn = (a: any, b: any) => a === b;
const SelectInput: InputsNS.SelectComponent = React.forwardRef(
  (
    {
      options,
      compareFn = defaultCompareFn,
      multiple = false,
      entityNamePath = "components.inputs.select.defaultEntity",
      label,
      readOnly,
      disabled,
      onChange,
      onInput,
      onFocus,
      onBlur,
      value,
      className,
      message,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<any[]>([]);
    const language = useLanguage();
    const [displayValue, setDisplayValue] = React.useState("");
    const toggle = (value: any) => {
      internalChangeFlag.current = true; // Mark as an internal change
      if (multiple) {
        if (selected.some((x) => compareFn(x, value))) {
          setSelected((selected) =>
            selected.filter((x) => !compareFn(x, value))
          );
        } else {
          setSelected((selected) => [value, ...selected]);
        }
      } else {
        if (selected.length && compareFn(selected[0], value)) {
          setSelected([]);
        } else {
          setSelected([value]);
        }
      }
    };
    const isSelected = React.useCallback(
      (value: any) => {
        return selected.some((x) => compareFn(x, value));
      },
      [compareFn, selected]
    );
    React.useEffect(() => {
      const selectedLabels = selected
        .map((x) => options.find((y) => compareFn(x, y.value)))
        .filter(Boolean)
        .map((x) => x!.label);
      if (multiple) {
        if (selectedLabels.length === 0) {
          setDisplayValue("");
        } else if (selectedLabels.length === 1) {
          setDisplayValue(language.t(selectedLabels[0]));
        } else if (selectedLabels.length === 2) {
          setDisplayValue(
            language.t(selectedLabels[0]) +
            " " +
            language.t("basics.and") +
            " " +
            language.t(selectedLabels[1])
          );
        } else if (selectedLabels.length === 3) {
          setDisplayValue(
            language.t(selectedLabels[0]) +
            language.t("basics.comma") +
            " " +
            language.t(selectedLabels[1]) +
            " " +
            language.t("basics.and") +
            " " +
            language.t(selectedLabels[2])
          );
        } else {
          setDisplayValue(
            language.t(selectedLabels[0]) +
            language.t("basics.comma") +
            " " +
            language.t(selectedLabels[1]) +
            " " +
            language.t("basics.and") +
            " " +
            language.t("components.inputs.select.andXItemsMore", {
              count: selectedLabels.length - 2,
              entity: language.t(`${entityNamePath}.singular`),
              entities: language.t(`${entityNamePath}.plural`),
            })
          );
        }
      } else {
        if (selectedLabels.length) {
          setDisplayValue(language.t(selectedLabels[0]));
        } else {
          setDisplayValue("");
        }
      }
    }, [options, selected, language.current]);
    const grouppedOptions = React.useMemo(
      () =>
        Object.entries(
          options
            .map((x) => ({ ...x, group: x.group ? x.group : "DEFAULT" }))
            .reduce((a, x) => {
              if (!a[x.group]) a[x.group] = [];
              a[x.group].push(x);
              return a;
            }, {} as { [param: string]: typeof options })
        ),
      [options]
    );

    const internalChangeFlag = React.useRef(false);
    React.useEffect(() => {
      if (internalChangeFlag.current) {
        internalChangeFlag.current = false;
        return;
      }
      if (value !== undefined) {
        const newSelected = Array.isArray(value) ? value : [value];
        setSelected((prevSelected) => {
          if (
            newSelected.length !== prevSelected.length ||
            newSelected.some((v, i) => !compareFn(v, prevSelected[i]))
          ) {
            return newSelected;
          }
          return prevSelected;
        });
      } else {
        setSelected([]);
      }
    }, [value, compareFn]);
    React.useEffect(() => {
      if (!internalChangeFlag.current) {
        return;
      }
      // Sync the `value` prop with `selected` state changes and propagate with `onInput` and `onChange`
      const newValue = multiple ? selected : selected[0] || null;
      if (onInput) {
        onInput(newValue);
      }
      if (onChange) {
        onChange(newValue);
      }
    }, [selected, multiple, onInput, onChange]);

    return (
      <Resolver.Drawover
        open={open}
        onOpenChange={(open) => {
          if (!disabled && !readOnly) setOpen(open);
        }}
      >
        <Resolver.DrawoverAnchor className={className}>
          <Resolver.DrawoverTrigger asChild>
            <Resolver.SimpleInput
              {...props}
              readOnly
              value={language.t(displayValue)}
              type="text"
              ref={ref}
              className={cn("cursor-pointer", className)}
              inputClassName="cursor-pointer"
              label={label}
              suffixIcon={<ChevronsUpDown className="h-4 w-4 opacity-50 " />}
              disabled={disabled}
              message={message}
            />
          </Resolver.DrawoverTrigger>
        </Resolver.DrawoverAnchor>
        <Resolver.DrawoverContent
          className="bg-gray-100 md:min-w-[var(--radix-popover-trigger-width)] md:w-auto md:p-0 md:backdrop-blur-sm md:bg-gray-200/65"
          align="start"
          sideOffset={10}
        >
          <Resolver.Command
            className={
              "!bg-transparent " +
              (multiple ? "max-md:p-4 max-md:pb-0" : "max-md:p-4")
            }
          >
            <Resolver.CommandInput
              className="ps-2 pe-0 text-xs"
              placeholder={language.t("components.inputs.select.search", {
                entity: language.t(`${entityNamePath}.singular`),
                entities: language.t(`${entityNamePath}.plural`),
              })}
            />
            <Resolver.CommandList>
              <Resolver.CommandEmpty>
                {language.t("components.inputs.select.notFound", {
                  entity: language.t(`${entityNamePath}.singular`),
                  entities: language.t(`${entityNamePath}.plural`),
                })}
              </Resolver.CommandEmpty>
              {grouppedOptions.map(([group, items], i) => (
                <Resolver.CommandGroup
                  key={i}
                  heading={group === "DEFAULT" ? undefined : language.t(group)}
                >
                  {items.map((item, j) => (
                    <Resolver.CommandItem
                      key={j}
                      value={language.t(item.label)}
                      onSelect={() => {
                        toggle(item.value);
                        if (!multiple) {
                          setOpen(false);
                        }
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected(item.value) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {language.t(item.label)}
                    </Resolver.CommandItem>
                  ))}
                </Resolver.CommandGroup>
              ))}
            </Resolver.CommandList>
          </Resolver.Command>
          {multiple && (
            <Resolver.DrawoverFooter className="w-full p-4" mobileOnly>
              <Resolver.DrawoverClose asChild>
                <Resolver.Button variant="dominant" width="full">
                  {label
                    ? language.t("components.actions.confirmEntity", {
                      entity: language.t(label),
                    })
                    : language.t("components.actions.confirm")}
                </Resolver.Button>
              </Resolver.DrawoverClose>
            </Resolver.DrawoverFooter>
          )}
        </Resolver.DrawoverContent>
      </Resolver.Drawover>
    );
  }
);
SelectInput.displayName = "SelectInput";

export { SelectInput };

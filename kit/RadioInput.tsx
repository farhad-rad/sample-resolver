import { useLanguage } from "@/services/languageService";
import "./RadioInput.scss";
import * as React from "react";
import { cn } from "@/utilities/helpers";
import { Resolver } from "@/modules/resolver/Resolver";
import { Inputs as InputsNS } from "@/contracts/ui/inputs";
import { TriangleAlert } from "lucide-react";

const defaultCompareFn = (a: any, b: any) => a === b;

const messageVariants: InputsNS.MessageVariants = InputsNS.MessageVariants
const RadioInput: InputsNS.RadioComponent = React.forwardRef(
  (
    {
      className,
      width,
      height,
      compareFn = defaultCompareFn,
      options,
      multiple,
      disabled,
      readOnly,
      value,
      onChange,
      onInput,
      onFocus,
      onBlur,
      message
    },
    ref
  ) => {
    const language = useLanguage();
    const [selected, setSelected] = React.useState<any[]>([]);
    const toggle = (value: any) => {
      internalChangeFlag.current = true;
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
      const newValue = multiple ? selected : selected[0] || null;
      if (onInput) {
        onInput(newValue);
      }
      if (onChange) {
        onChange(newValue);
      }
    }, [selected, multiple, onInput, onChange]);

    return (
      <div className="flex flex-col">

        <div
          className={cn("panelly-input radio", messageVariants({ borderVariant: message?.variant || "gray" }), className)}
          style={{ "--input-width": width, "--input-height": height } as any}
          ref={ref}
        >
          {options.map((item, i) => (
            <Resolver.Button
              key={i}
              onClick={() => toggle(item.value)}
              variant={isSelected(item.value) ? "dominant-filled" : "gray-filled"}
              className={cn("!py-1 !h-fit text-xs")}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={disabled || readOnly}
              type="button"
            >
              {language.t(item.label)}
            </Resolver.Button>
          ))}
        </div>
        {message &&
          <div className={`flex items-center gap-1 mt-1 ${messageVariants({ variant: message.variant || "error", target: "messageText" })}`}>
            {<TriangleAlert size={15} />}
            {language.t(message.value)}
          </div>
        }
      </div>
    );
  }
);
RadioInput.displayName = "RadioInput";

export { RadioInput };

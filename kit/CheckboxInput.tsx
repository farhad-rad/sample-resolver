import { useLanguage } from "@/services/languageService";
import "./CheckboxInput.scss";
import * as React from "react";
import { Resolver } from "@/modules/resolver/Resolver";
import { cn } from "@/utilities/helpers";
import { Inputs as InputsNS } from "@/contracts/ui/inputs";

const messageVariants: InputsNS.MessageVariants = InputsNS.MessageVariants;
const CheckboxInput: InputsNS.CheckboxComponent = React.forwardRef(
  (
    {
      className,
      width,
      height,
      prefixIcon,
      suffixIcon,
      label,
      value,
      capsule = false,
      disabled,
      readOnly,
      compareFn = (a: any, b: any) => a === b,
      truthyValue = true,
      falsyValue = false,
      onInput,
      onChange,
      onFocus,
      onBlur,
      message
    },
    ref
  ) => {
    const language = useLanguage();
    const [checked, setChecked] = React.useState(compareFn(truthyValue, value));
    const isInternalChange = React.useRef(false);

    React.useEffect(() => {
      if (
        isInternalChange.current &&
        compareFn(truthyValue, value) !== checked
      ) {
        const newValue = checked ? truthyValue : falsyValue;
        if (onInput) onInput(newValue);
        if (onChange) onChange(newValue);
      }
    }, [checked, truthyValue, falsyValue, onInput, onChange, compareFn, value]);
    React.useEffect(() => {
      if (
        !isInternalChange.current &&
        compareFn(truthyValue, value) !== checked
      ) {
        setChecked(compareFn(truthyValue, value));
      }
      isInternalChange.current = false;
    }, [value, truthyValue, falsyValue, compareFn]);
    const toggleChecked = () => {
      if (!disabled && !readOnly) {
        isInternalChange.current = true;
        setChecked((prev) => !prev);
      }
    };
    const toggleIf = (e: any, cond: boolean) => {
      if (e.target?.tagName !== "INPUT" && cond) {
        toggleChecked();
      }
    };

    return (
      <div
        className={cn(
          "panelly-input checkbox",
          capsule ? cn("capsule", messageVariants({ borderVariant: message?.variant || "gray" })) : "",
          className
        )}
        style={{ "--input-width": width, "--input-height": height } as any}
        onClick={(e) => toggleIf(e, capsule)}
      >
        <Resolver.Checkbox
          ref={ref}
          checked={checked}
          onClick={(e) => toggleIf(e, !capsule)}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
        />
        {!!prefixIcon && <div className="prefixIcon me-1">{prefixIcon}</div>}
        <div
          className="flex flex-col gap-1 justify-center items-start w-fit cursor-pointer"
          onClick={(e) => toggleIf(e, !capsule)}
        >
          {!!label && (
            <Resolver.Label className="label cursor-pointer">
              {language.t(label)}
            </Resolver.Label>
          )}
          {!!message && (
            <p className={messageVariants({ variant: message?.variant || "gray", className: "cursor-pointer" })}>
              {language.t(message.value)}
            </p>
          )}
        </div>
        {
          !!suffixIcon && (
            <div className={"suffixIcon " + (capsule ? "ms-auto" : "ms-2")}>
              {suffixIcon}
            </div>
          )
        }
      </div >
    );
  }
);
CheckboxInput.displayName = "CheckboxInput";

export { CheckboxInput };

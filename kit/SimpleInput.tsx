import "./SimpleInput.scss";
import * as React from "react";
import { cn } from "@/utilities/helpers";
import { Resolver } from "@/modules/resolver/Resolver";
import { useLanguage } from "@/services/languageService";
import { Inputs as InputsNS } from "@/contracts/ui/inputs";
import { Eye, EyeOff, TriangleAlert } from "lucide-react";

const messageVariants: InputsNS.MessageVariants = InputsNS.MessageVariants;

const SimpleInput: InputsNS.SimpleComponent = React.forwardRef(
  (
    {
      className,
      inputClassName,
      width,
      height,
      type = "text",
      prefixIcon,
      suffixIcon,
      label,
      placeholder,
      value,
      readOnly,
      disabled,
      containerRef,
      ltr,
      onClick,
      onInput,
      onChange,
      onFocus,
      onBlur,
      message,
      inputMode,
    },
    ref
  ) => {
    const language = useLanguage();
    const [showPassword, setShowPassword] = React.useState(false);
    const internalOnInput: React.FormEventHandler<HTMLInputElement> =
      React.useCallback(
        (e) => {
          if (!onInput) {
            return;
          }
          (onInput as any)(
            type === "number"
              ? e.currentTarget.valueAsNumber
              : e.currentTarget.value
          );
        },
        [onInput, type]
      );
    const internalOnChange: React.FormEventHandler<HTMLInputElement> =
      React.useCallback(
        (e) => {
          if (!onChange) {
            return;
          }
          (onChange as any)(
            type === "number"
              ? e.currentTarget.valueAsNumber
              : e.currentTarget.value
          );
        },
        [onChange, type]
      );
    return (
      <div className="flex flex-col">
        <div
          className={cn(
            "panelly-input simple",
            messageVariants({ borderVariant: message?.variant || "gray" }),
            type === "password" ? "!pe-1" : "",
            className
          )}
          style={{ "--input-width": width, "--input-height": height } as any}
          onClick={(e) => {
            if (!disabled && onClick) onClick(e);
            if (
              (e.target as any).tagName !== "INPUT" &&
              !(e.target as any).classList?.contains("skip-focus")
            ) {
              e.currentTarget.querySelector("input")!.focus();
            }
          }}
          ref={containerRef}
        >
          {!!prefixIcon && (
            <div
              className={cn(
                "prefixIcon",
                messageVariants({ variant: message?.variant || "gray" })
              )}
            >
              {prefixIcon}
            </div>
          )}
          {!!label && (
            <Resolver.Label
              className={cn(
                "label",
                messageVariants({ variant: message?.variant || "gray" })
              )}
            >
              {language.t(label)}
            </Resolver.Label>
          )}
          <input
            className={cn(
              "w-full ",
              ltr ? " ltr text-left" : "",
              inputClassName || ""
            )}
            placeholder={placeholder ? language.t(placeholder) : ""}
            type={showPassword ? "text" : type}
            ref={ref}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            onInput={internalOnInput}
            onChange={internalOnChange}
            onFocus={onFocus}
            onBlur={onBlur}
            inputMode={inputMode}
          />
          {!!suffixIcon && type !== "password" && (
            <div className="suffixIcon">{suffixIcon}</div>
          )}
          {type === "password" && (
            <div className="suffixIcon">
              <Resolver.Button
                variant="gray-outline"
                className="!p-1 !h-fit skip-focus"
                disabled={readOnly || disabled}
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Resolver.Button>
            </div>
          )}
        </div>
        {message && (
          <div
            className={`flex items-center gap-1 mt-1 ${messageVariants({
              variant: message.variant || "error",
              target: "messageText",
            })}`}
          >
            {<TriangleAlert size={15} />}
            {language.t(message.value)}
          </div>
        )}
      </div>
    );
  }
);
SimpleInput.displayName = "SimpleInput";

export { SimpleInput };

import "./TextareaInput.scss";
import * as React from "react";
import { cn } from "@/utilities/helpers";
import { Resolver } from "@/modules/resolver/Resolver";
import { useLanguage } from "@/services/languageService";
import { Inputs as InputsNS } from "@/contracts/ui/inputs";
import { TriangleAlert } from "lucide-react";

const messageVariants: InputsNS.MessageVariants = InputsNS.MessageVariants;
const TextareaInput: InputsNS.TextareaComponent = React.forwardRef(
  (
    {
      className,
      inputClassName,
      width,
      height,
      prefixIcon,
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
    },
    ref
  ) => {
    const language = useLanguage();
    const internalOnInput: React.FormEventHandler<HTMLTextAreaElement> =
      React.useCallback(
        (e) => {
          if (!onInput) {
            return;
          }
          onInput(e.currentTarget.value, e);
        },
        [onInput]
      );
    const internalOnChange: React.FormEventHandler<HTMLTextAreaElement> =
      React.useCallback(
        (e) => {
          if (!onChange) {
            return;
          }
          onChange(e.currentTarget.value, e);
        },
        [onChange]
      );
    return (
      <div className="flex flex-col">
        <div
          className={cn(
            "panelly-input textarea",
            messageVariants({ borderVariant: message?.variant || "gray" }),
            className
          )}
          style={{ "--input-width": width, "--input-height": height } as any}
          onClick={(e) => {
            if (!disabled && onClick) onClick(e);
            if (
              (e.target as any).tagName !== "TEXTAREA" &&
              !(e.target as any).classList?.contains("skip-focus")
            ) {
              e.currentTarget.querySelector("textarea")!.focus();
            }
          }}
          ref={containerRef}
        >
          {(!!prefixIcon || !!label) && (
            <div className="flex gap-2 items-center border-b border-b-gray-200 w-full pb-1 px-2 mb-1">
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
            </div>
          )}
          <textarea
            className={
              "w-full " +
              (ltr ? " ltr text-left" : "") +
              " " +
              (inputClassName || "")
            }
            placeholder={placeholder ? language.t(placeholder) : ""}
            ref={ref}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            onInput={internalOnInput}
            onChange={internalOnChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
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
TextareaInput.displayName = "TextareaInput";

export { TextareaInput };

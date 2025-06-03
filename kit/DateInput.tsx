import "./DateInput.scss";
import * as React from "react";
import { DateObject } from "react-multi-date-picker";
import { Calendar as CalendarIcon } from "lucide-react";
import { useLanguage } from "@/services/languageService";
import { useCalendar } from "@/utilities/hooks";
import { Resolver } from "@/modules/resolver/Resolver";
import moment from "jalali-moment";
import { Inputs as InputsNS } from "@/contracts/ui/inputs";
import { cn } from "@/utilities/helpers";

const DateInput: InputsNS.DateComponent = React.forwardRef(
  (
    {
      calendar,
      label,
      onInput,
      onChange,
      onFocus,
      onBlur,
      value,
      disabled,
      readOnly,
      className,
      message,
      ...props
    },
    ref
  ) => {
    const language = useLanguage();
    const [date, setDate] = React.useState<DateObject | null>(null);
    const [displayValue, setDisplayValue] = React.useState("");
    const inputContainerRef = React.useRef<HTMLDivElement>(null);
    const cl = useCalendar(calendar);

    React.useEffect(() => {
      setDisplayValue(date?.convert(cl.calendar, cl.locale).format() ?? "");
    }, [cl, date]);

    const internalChangeFlag = React.useRef(false);

    React.useEffect(() => {
      if (internalChangeFlag.current) {
        internalChangeFlag.current = false; // Reset the flag after internal change
        return;
      }
      if (value) {
        if (!date || !moment(date.toDate()).isSame(moment(value), "date")) {
          setDate(new DateObject(value));
        }
      }
    }, [value]);

    React.useEffect(() => {
      if (!internalChangeFlag.current) {
        // internalChangeFlag.current = false; // Reset the flag after internal change
        return;
      }
      if ((!date && !!value) || (date && (!value || !moment(date.toDate()).isSame(moment(value), "date")))) {
        internalChangeFlag.current = true; // Mark as an internal change
        if (onInput) onInput(date?.toDate() ?? null, null as any);
        if (onChange) onChange(date?.toDate() ?? null, null as any);
      }
    }, [date, onChange, onInput]);

    return (
      <div className="flex flex-col mb-2">
        <Resolver.Drawover
          onOpenChange={(open) => {
            if (open && onFocus) onFocus(new FocusEvent("focus") as any);
            if (!open && onBlur) onBlur(new FocusEvent("blur") as any);
          }}
        >
          <Resolver.DrawoverAnchor className={className}>
            <Resolver.SimpleInput
              {...props}
              value={displayValue}
              disabled={disabled}
              readOnly={readOnly}
              type="text"
              ref={ref}
              label={label}
              className={cn("!pe-1", className)}
              inputClassName="ps-1"
              ltr
              containerRef={inputContainerRef}
              suffixIcon={
                <Resolver.DrawoverTrigger asChild>
                  <Resolver.Button
                    variant="dominant-filled"
                    className="!p-1 !h-fit skip-focus"
                    disabled={readOnly || disabled}
                  >
                    <CalendarIcon />
                  </Resolver.Button>
                </Resolver.DrawoverTrigger>
              }
              message={message}
            />
          </Resolver.DrawoverAnchor>
          <Resolver.DrawoverContent
            className="bg-gray-100 md:w-auto md:p-0 md:bg-gray-200/65 md:backdrop-blur-sm"
            align="end"
            sideOffset={10}
          >
            <Resolver.Calendar
              calendar={calendar}
              value={date}
              onChange={(date) => {
                internalChangeFlag.current = true;
                setDate(date as any);
                inputContainerRef.current?.click();
              }}
              autoFocus
              disabled={readOnly || disabled}
            />
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
          </Resolver.DrawoverContent>
        </Resolver.Drawover>

      </div>
    );
  }
);
DateInput.displayName = "DateInput";

export { DateInput };

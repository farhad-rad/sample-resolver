import "./TimeInput.scss";
import * as React from "react";
import { DateObject } from "react-multi-date-picker";
import { useLanguage } from "@/services/languageService";
import { useCalendar } from "@/utilities/hooks";
import { Resolver } from "@/modules/resolver/Resolver";
import moment from "jalali-moment";
import { cn } from "@/utilities/helpers";
import { Inputs as InputsNS } from "@/contracts/ui/inputs";

const TimeInput: InputsNS.TimeComponent = React.forwardRef(
  (
    {
      label,
      readOnly,
      disabled,
      value,
      onBlur,
      onFocus,
      onChange,
      onInput,
      className,
      message,
      ...props
    },
    ref
  ) => {
    const language = useLanguage();
    const [date, setDate] = React.useState<DateObject>(new DateObject());
    const [displayValue, setDisplayValue] = React.useState("");
    const [hour, setHour] = React.useState(
      Number(new DateObject().format("HH"))
    );

    const inputContainerRef = React.useRef<HTMLDivElement>(null);
    const cl = useCalendar();
    React.useEffect(() => {
      setDisplayValue(
        date?.convert(cl.calendar, cl.locale).format("HH:mm:ss") ?? ""
      );
      setHour(Number(new DateObject(date.toDate()).format("HH")));
    }, [cl, date]);

    React.useEffect(() => {
      if (!value || !moment(date.toDate()).isSame(moment(value), "date")) {
        if (onInput) onInput(date.toDate(), null as any);
        if (onChange) onChange(date.toDate(), null as any);
      }
    }, [date]);
    React.useEffect(() => {
      if (value) {
        if (!moment(date.toDate()).isSame(moment(value), "date")) {
          setDate(new DateObject(value));
        }
      } else {
        // TODO: What to do with null values??
      }
    }, [value]);

    return (
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
            type="text"
            ref={ref}
            className={cn("!pe-1", className)}
            inputClassName="ps-1"
            label={label}
            disabled={disabled}
            readOnly={readOnly}
            ltr
            containerRef={inputContainerRef}
            suffixIcon={
              <Resolver.DrawoverTrigger asChild>
                <Resolver.Button
                  variant="dominant-filled"
                  className="!p-1 !h-fit skip-focus"
                  disabled={readOnly || disabled}
                >
                  <Resolver.ClockNowIcon customHour={hour} />
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
            value={date}
            onChange={(date) => {
              setDate(date as any);
            }}
            disableDayPicker
            format="HH:mm:ss"
            plugins={[<Resolver.TimePicker position="bottom" key={0} />]}
            autoFocus
            className="md:mt-4"
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
    );
  }
);
TimeInput.displayName = "TimeInput";

export { TimeInput };

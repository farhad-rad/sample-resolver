import "./DatetimeInput.scss";
import * as React from "react";
import { DateObject } from "react-multi-date-picker";
import { CalendarClock } from "lucide-react";
import { Resolver } from "@/modules/resolver/Resolver";
import { useCalendar } from "@/utilities/hooks";
import { useLanguage } from "@/services/languageService";
import moment from "jalali-moment";
import { Inputs as InputsNS } from "@/contracts/ui/inputs";
import { cn } from "@/utilities/helpers";


const DatetimeInput: InputsNS.DatetimeComponent = React.forwardRef(
  ({ calendar, label, readOnly, disabled, value, onInput, onChange, onFocus, onBlur, className, message, ...props }, ref) => {
    const language = useLanguage();
    const [date, setDate] = React.useState<DateObject>(new DateObject());
    const [displayValue, setDisplayValue] = React.useState("");

    const inputContainerRef = React.useRef<HTMLDivElement>(null);
    const cl = useCalendar(calendar);
    React.useEffect(() => {
      setDisplayValue(
        date?.convert(cl.calendar, cl.locale).format("YYYY/MM/DD HH:mm:ss") ??
        ""
      );
    }, [cl, date]);

    React.useEffect(() => {
      if (!value || !moment(date.toDate()).isSame(moment(value), "date")) {
        if (onInput) onInput(date.toDate(), null as any);
        if (onChange) onChange(date.toDate(), null as any);
      }
    }, [date, onChange, onInput, value]);
    React.useEffect(() => {
      if (value) {
        if (!moment(date.toDate()).isSame(moment(value), "date")) {
          setDate(new DateObject(value));
        }
      } else {
        // TODO: What to do with null values??
      }
    }, [date, value]);

    return (
      <Resolver.Drawover
        onOpenChange={(open) => {
          if (open && onFocus) onFocus(new FocusEvent("focus") as any);
          if (!open && onBlur) onBlur(new FocusEvent("blur") as any);
        }}
      >
        <Resolver.DrawoverAnchor
          className={className}
        >
          <Resolver.SimpleInput
            {...props}
            value={displayValue}
            disabled={disabled}
            readOnly={readOnly}
            type="text"
            ref={ref}
            containerRef={inputContainerRef}
            className={cn("!pe-1", className)}
            inputClassName="ps-1"
            label={label}
            ltr
            suffixIcon={
              <Resolver.DrawoverTrigger asChild>
                <Resolver.Button
                  variant="dominant-filled"
                  className="!p-1 !h-fit skip-focus"
                  disabled={readOnly || disabled}
                >
                  <CalendarClock />
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
              setDate(date as any);
            }}
            format="YYYY/MM/DD HH:mm:ss"
            plugins={[<Resolver.TimePicker position="bottom" key={0} />]}
            autoFocus
            disabled={readOnly || disabled}
          />
          <Resolver.DrawoverFooter className="w-full p-4 pt-0" mobileOnly>
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
DatetimeInput.displayName = "DatetimeInput";

export { DatetimeInput };

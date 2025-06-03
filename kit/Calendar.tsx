import "./Calendar.scss";
import { Calendar as CalendarBase } from "react-multi-date-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utilities/helpers";
import { useCalendar } from "@/utilities/hooks";
import { Calendar as CalendarNS } from "@/contracts/ui/calendar";
import { Resolver } from "@/modules/resolver/Resolver";

const calendarVariants: CalendarNS.Variants = CalendarNS.DefaultVariants;
const Calendar: CalendarNS.Component = ({ className, calendar, ...props }) => {
  const calendarProps = useCalendar(calendar);

  return (
    <CalendarBase
      className={cn("panelly-calendar px-3", calendarVariants({}), className)}
      renderButton={(direction: "right" | "left", handleClick: () => void) => (
        <Resolver.Button onClick={handleClick} size="icon" variant="gray-ghost">
          {direction === "right" && (
            <>
              <ChevronLeft className="ltr:hidden rtl:block" />
              <ChevronRight className="ltr:block rtl:hidden" />
            </>
          )}
          {direction === "left" && (
            <>
              <ChevronLeft className="ltr:block rtl:hidden" />
              <ChevronRight className="ltr:hidden rtl:block" />
            </>
          )}
        </Resolver.Button>
      )}
      shadow={false}
      {...calendarProps}
      {...props}
    />
  );
};
Calendar.displayName = "Calendar";

export { Calendar, calendarVariants };

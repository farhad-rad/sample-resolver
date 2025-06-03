import { TimePicker as TimePickerNS } from "@/contracts/ui/time-picker";
import { cn } from "@/utilities/helpers";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import DateObject from "react-date-object";
import { EffectCoverflow, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import "./TimePicker.scss";

function getValidProps({
  state,
  setState,
  position,
  registerListener,
  calendarProps,
  datePickerProps,
  handleChange,
  nodes,
  Calendar,
  DatePicker,
  handlePropsChange,
  handleFocusedDate,
  minDate,
  maxDate,
  ...otherProps
}: any) {
  return otherProps;
}
function toDateObject(date: any, calendar: any, format = "YYYY/MM/DD") {
  if (date instanceof DateObject) {
    date.set({ calendar, format });
  } else {
    date = new DateObject({ date, calendar, format });
  }

  return date;
}

const TimePicker: TimePickerNS.Component = ({
  state,
  setState,
  handleChange,
  position,
  calendarProps: { formattingIgnoreList },
  hideSeconds,
  className = "",
  style = {},
  handleFocusedDate,
  format = "YYYY/MM/DD",
  header = true,
  hStep = 1,
  mStep = 1,
  sStep = 1,
  minDate,
  maxDate,
  ...props
}: any) => {
  const { date, selectedDate, multiple, range, focused } = state,
    meridiems = date.meridiems,
    availableDate = (multiple || range ? focused : selectedDate) || date;

  const mustDisplayMeridiem = useMemo(() => {
    let format = date._format;

    if (typeof format !== "string") return false;

    if (Array.isArray(formattingIgnoreList)) {
      formattingIgnoreList.forEach((item) => {
        if (typeof item === "string") {
          format = format.replace(new RegExp(item, "g"), "");
        }
      });
    }

    return format.toLowerCase().includes("a") || format.includes("hh");
  }, [date._format, formattingIgnoreList]);

  const isAm = mustDisplayMeridiem && availableDate.hour < 12;

  return (
    <div>
      <div
        className={cn(
          `panelly-time-picker flex gap-2 justify-center items-center rtl:flex-row-reverse`,
          "min-w-[220px] relative",
          className
        )}
        style={style}
        {...getValidProps(props)}
      >
        <div className="selected-overlay"></div>

        {[
          [
            "hour",
            mustDisplayMeridiem ? "hh" : "HH",
            mustDisplayMeridiem ? 12 : 24,
          ],
          ["minute", "mm", 60],
          ["second", "ss", 60],
        ].map(([name, token], index) => {
          if (name === "second" && hideSeconds) return null;

          // let step = 1;

          // switch (name) {
          //   case "hour":
          //     step = hStep;
          //     break;
          //   case "minute":
          //     step = mStep;
          //     break;
          //   case "second":
          //     step = sStep;
          //     break;
          // }

          return (
            <FreeSelectScroll
              key={index}
              name={name as any}
              value={getValues(name, token)[0]}
              update={update}
              formatKey={name as string}
              digits={date.digits}
              meridiems={date.meridiems}
              is24={!mustDisplayMeridiem}
              append={
                name === "second" || (name === "minute" && hideSeconds) ? (
                  <></>
                ) : (
                  <>:</>
                )
              }
            />
          );
        })}
        <div
          style={{
            display: mustDisplayMeridiem ? "flex" : "none",
          }}
        >
          <ChevronUp direction="rmdp-up" onClick={toggleMeridiem} />
          <div className="rmdp-am">
            {(isAm ? meridiems[0][1] : meridiems[1][1]).toUpperCase()}
          </div>
          <ChevronDown direction="rmdp-down" onClick={toggleMeridiem} />
        </div>
      </div>
    </div>
  );

  function update(key: any, value: any) {
    const date = new DateObject(availableDate).set(key, value);

    if (
      (minDate && date < toDateObject(minDate, state.calendar, state.format)) ||
      (maxDate && date > toDateObject(maxDate, state.calendar, state.format))
    ) {
      return;
    }

    availableDate[key] = value;

    setDate();
  }

  function toggleMeridiem() {
    availableDate.hour += availableDate.hour < 12 ? 12 : -12;

    setDate();
  }

  function setDate() {
    handleChange(selectedDate, {
      ...state,
      selectedDate,
      focused,
    });
  }

  function getValues(key: any, token: any) {
    if (!availableDate[key]) availableDate[key] = 0;

    return [availableDate[key], availableDate.format(token)];
  }
};

function FreeSelectScroll({
  value,
  formatKey,
  update,
  append,
  digits,
  is24,
}: {
  name: "second" | "minute" | "hour" | "meridiem";
  value: number | string;
  formatKey: string;
  update: (key: string, value: number | string) => void;
  append?: ReactNode;
  digits: string[];
  meridiems: string[];
  is24: boolean;
}) {
  const [swiper, setSwiper] = useState<SwiperType | null>();

  const options = useMemo(() => {
    switch (formatKey) {
      case "hour":
      case "minute":
      case "second":
        return Array(formatKey == "hour" ? (is24 ? 24 : 12) : 60)
          .fill(0)
          .map((_, i) => i)
          .map((x) => x.toString())
          .map((x) => (x.length < 2 ? `0${x}` : x))
          .map((x) => [
            x,
            ((x) => {
              digits.forEach(
                (y, i) => (x = x.replace(new RegExp(i.toString(), "g"), y))
              );
              return x;
            })(x),
          ]);
      default:
        throw new Error();
    }
  }, [formatKey]);
  useEffect(() => {
    if (!swiper) {
      return;
    }
    const idx = options.findIndex((x) => x[0] == value);
    swiper.slideToLoop(idx, undefined, false);
    swiper.on("slideChange", (swiper) => {
      if (formatKey == "meridiem") {
        //
      } else {
        update(
          formatKey,
          Number(swiper.slides[swiper.activeIndex].getAttribute("data-value"))
        );
      }
    });
  }, [swiper]);

  return (
    <>
      <div className="w-[48px] h-[120px] relative">
        <Swiper
          spaceBetween={0}
          slidesPerView={3}
          direction="vertical"
          onSwiper={setSwiper}
          className="w-[48px] h-[120px]"
          loop
          centeredSlides
          modules={[EffectCoverflow, Mousewheel]}
          effect={"coverflow"}
          coverflowEffect={{
            rotate: -50,
            scale: 0.9,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
        >
          {options.map(([v, x], i) => (
            <SwiperSlide
              id={i.toString()}
              key={i}
              data-value={v}
              className="w-[48px] h-[48px] !flex justify-center items-center cursor-grab"
            >
              {x}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {append ? append : <></>}
    </>
  );
}

export { TimePicker };

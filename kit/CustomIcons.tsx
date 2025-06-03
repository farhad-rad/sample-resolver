import './CustomIcons.scss'
import React from "react";
import {
  Clock1,
  Clock10,
  Clock11,
  Clock12,
  Clock2,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
} from "lucide-react";
import { CustomIcons as CustomIconsNS } from "@/contracts/ui/custom-icons";

const clocks = {
  0: Clock12,
  1: Clock1,
  2: Clock2,
  3: Clock3,
  4: Clock4,
  5: Clock5,
  6: Clock6,
  7: Clock7,
  8: Clock8,
  9: Clock9,
  10: Clock10,
  11: Clock11,
};
export const ClockNowIcon: CustomIconsNS.ClockNowComponent = ({ customHour, ...props }) => {
  const [currentHour, setCurrentHour] = React.useState(
    (customHour ? customHour : new Date().getHours()) % 12
  );

  React.useEffect(() => {
    if (customHour) {
      setCurrentHour(customHour % 12);
      return;
    }
    let timeout: any;
    const updateHour = () => {
      const now = new Date();
      const hour = now.getHours() % 12;
      setCurrentHour(hour);
      const msUntilNextHour =
        (60 - now.getMinutes()) * 60 * 1000 -
        now.getSeconds() * 1000 -
        now.getMilliseconds();

      timeout = setTimeout(updateHour, msUntilNextHour);
    };
    updateHour();
    return () => clearTimeout(timeout);
  }, [customHour]);

  const ClockIcon = (clocks as any)[currentHour];

  return <ClockIcon {...props} />;
};

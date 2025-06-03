
import { ApplicationUserInterface } from "@/contracts/ui";
import * as avatar from "./Avatar";
import * as badge from "./Badge";
import * as breadcrumb from "./Breadcrumb";
import * as button from "./Button";
import * as calendar from "./Calendar";
import * as card from "./Card";
import * as checkbox from "./Checkbox";
import * as collapsible from "./Collapsible";
import * as command from "./Command";
import * as dialog from "./Dialog";
import * as drawer from "./Drawer";
import * as drawover from "./Drawover";
import * as drawialog from "./Drawialog";
import * as dropdownMenu from "./DropdownMenu";
import * as form from "./Form";
import * as framer from "./Framer";
import * as label from "./Label";
import * as popover from "./Popover";
import * as separator from "./Separator";
import * as sheet from "./Sheet";
import * as sidebar from "./Sidebar";
import * as skeleton from "./Skeleton";
import * as switchComponents from "./Switch";
import * as table from "./Table";
import * as timePicker from "./TimePicker";
import * as toggle from "./Toggle";
import * as tooltip from "./Tooltip";
import * as simpleInput from './SimpleInput'
import * as dateInput from './DateInput'
import * as datetimeInput from './DatetimeInput'
import * as timeInput from './TimeInput'
import * as checkboxInput from './CheckboxInput'
import * as switchInput from './SwitchInput'
import * as selectInput from './SelectInput'
import * as radioInput from './RadioInput'
import * as textareaInput from './TextareaInput'
import * as taggedTextareaInput from './taggedTextarea/TaggedTextareaInput'
import * as customIcons from './CustomIcons'

const defaults: ApplicationUserInterface = {
  ...avatar,
  ...badge,
  ...breadcrumb,
  ...button,
  ...calendar,
  ...card,
  ...checkbox,
  ...collapsible,
  ...command,
  ...dialog,
  ...drawer,
  ...drawover,
  ...drawialog,
  ...dropdownMenu,
  ...form,
  ...framer,
  ...label,
  ...popover,
  ...separator,
  ...sheet,
  ...sidebar,
  ...skeleton,
  ...switchComponents,
  ...table,
  ...timePicker,
  ...toggle,
  ...tooltip,
  ...simpleInput,
  ...dateInput,
  ...datetimeInput,
  ...timeInput,
  ...checkboxInput,
  ...switchInput,
  ...selectInput,
  ...radioInput,
  ...textareaInput,
  ...taggedTextareaInput,
  ...customIcons,
};

export default defaults;

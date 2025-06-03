import { cva, VariantProps } from "class-variance-authority";

export namespace Inputs {
  export const MessageVariants = cva("", {
    variants: {
      target: {
        messageText: "text-xs",
        border: "",
        label: "",
      },
      variant: {
        dominant: "text-dominant-500",
        complement: "text-complement-500",
        warning: "text-warning-500",
        information: "text-information-500",
        error: "text-error-600",
        gray: "text-gray-600",
      },
      borderVariant: {
        dominant: "border-dominant-500",
        complement: "border-complement-500",
        warning: "border-warning-500",
        information: "border-information-500",
        error: "border-error-600",
        gray: "border-gray-400",
      },
    },
    defaultVariants: {},
  });

  export type MessageVariants = typeof MessageVariants;
  export type Message = {
    value: string;
    variant?: VariantProps<MessageVariants>["variant"];
  };
  type CommonSimpleProps = {
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    label?: string;
    placeholder?: string;
    width?: any;
    height?: any;
    className?: string;
    inputClassName?: string;
    ltr?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    containerRef?: React.LegacyRef<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    message?: Message;
  };
  export type SimpleTextProps = CommonSimpleProps & {
    type?: "text";
    value?: string;
    onInput?: (value: string, event: React.FormEvent<HTMLInputElement>) => void;
    onChange?: (
      value: string,
      event: React.FormEvent<HTMLInputElement>
    ) => void;
    inputMode?:
      | "search"
      | "text"
      | "email"
      | "tel"
      | "url"
      | "none"
      | "numeric"
      | "decimal";
  };
  export type SimpleNumberProps = CommonSimpleProps & {
    type: "number";
    value?: number;
    onInput?: (value: number, event: React.FormEvent<HTMLInputElement>) => void;
    onChange?: (
      value: number,
      event: React.FormEvent<HTMLInputElement>
    ) => void;
    inputMode?: undefined;
  };
  export type SimplePasswordProps = Omit<CommonSimpleProps, "suffixIcon"> & {
    type?: "password";
    value?: string;
    onInput?: (value: string, event: React.FormEvent<HTMLInputElement>) => void;
    onChange?: (
      value: string,
      event: React.FormEvent<HTMLInputElement>
    ) => void;
    suffixIcon?: undefined;
    inputMode?: undefined;
  };
  export type SimpleProps =
    | SimplePasswordProps
    | SimpleTextProps
    | SimpleNumberProps;
  export type SimpleComponent = React.ForwardRefExoticComponent<
    SimpleProps & React.RefAttributes<HTMLInputElement>
  >;

  export interface DateProps {
    prefixIcon?: React.ReactNode;
    label?: string;
    width?: any;
    height?: any;
    className?: string;
    calendar?: "hijri" | "hindi" | "jalali" | "gregorian";
    readOnly?: boolean;
    disabled?: boolean;
    value?: Date | null;
    onInput?: (
      value: Date | null,
      event: React.FormEvent<HTMLInputElement>
    ) => void;
    onChange?: (
      value: Date | null,
      event: React.FormEvent<HTMLInputElement>
    ) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    message?: Message;
  }
  export type DateComponent = React.ForwardRefExoticComponent<
    DateProps & React.RefAttributes<HTMLInputElement>
  >;

  export interface DatetimeProps {
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    label?: string;
    width?: any;
    height?: any;
    className?: string;
    calendar?: "hijri" | "hindi" | "jalali" | "gregorian";
    readOnly?: boolean;
    disabled?: boolean;
    value?: Date | null;
    onInput?: (
      value: Date | null,
      event: React.FormEvent<HTMLInputElement>
    ) => void;
    onChange?: (
      value: Date | null,
      event: React.FormEvent<HTMLInputElement>
    ) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    message?: Message;
  }
  export type DatetimeComponent = React.ForwardRefExoticComponent<
    DatetimeProps & React.RefAttributes<HTMLInputElement>
  >;

  export interface TimeProps {
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    label?: string;
    width?: any;
    height?: any;
    className?: string;
    readOnly?: boolean;
    disabled?: boolean;
    value?: Date;
    onInput?: (value: Date, event: React.FormEvent<HTMLInputElement>) => void;
    onChange?: (value: Date, event: React.FormEvent<HTMLInputElement>) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    message?: Message;
  }
  export type TimeComponent = React.ForwardRefExoticComponent<
    TimeProps & React.RefAttributes<HTMLInputElement>
  >;

  export interface CheckboxProps {
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    label?: string;
    width?: any;
    height?: any;
    className?: string;
    readOnly?: boolean;
    disabled?: boolean;
    truthyValue?: any;
    falsyValue?: any;
    value?: any;
    compareFn?: (a: any, b: any) => boolean;
    capsule?: boolean;
    onInput?: (value: any) => void;
    onChange?: (value: any) => void;
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    message?: Message;
  }
  export type CheckboxComponent = React.ForwardRefExoticComponent<
    CheckboxProps & React.RefAttributes<HTMLButtonElement>
  >;

  export interface SwitchProps {
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    label?: string;
    width?: any;
    height?: any;
    className?: string;
    readOnly?: boolean;
    disabled?: boolean;
    truthyValue?: any;
    falsyValue?: any;
    value?: any;
    compareFn?: (a: any, b: any) => boolean;
    capsule?: boolean;
    onInput?: (value: any) => void;
    onChange?: (value: any) => void;
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    message?: Message;
  }
  export type SwitchComponent = React.ForwardRefExoticComponent<
    SwitchProps & React.RefAttributes<HTMLButtonElement>
  >;

  export interface SelectProps {
    prefixIcon?: React.ReactNode;
    label?: string;
    width?: any;
    height?: any;
    className?: string;
    options: { value: any; label: string; group?: string }[];
    compareFn?: (a: any, b: any) => boolean;
    multiple?: boolean;
    entityNamePath?: string;
    disabled?: boolean;
    readOnly?: boolean;
    value?: any;
    onInput?: (value: any) => void;
    onChange?: (value: any) => void;
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    message?: Message;
  }
  export type SelectComponent = React.ForwardRefExoticComponent<
    SelectProps & React.RefAttributes<HTMLInputElement>
  >;

  export interface RadioProps {
    width?: any;
    height?: any;
    className?: string;
    options: { value: any; label: string }[];
    compareFn?: (a: any, b: any) => boolean;
    multiple?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    value?: any;
    onInput?: (value: any) => void;
    onChange?: (value: any) => void;
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    message?: Message;
  }
  export type RadioComponent = React.ForwardRefExoticComponent<
    RadioProps & React.RefAttributes<HTMLDivElement>
  >;

  export type TextareaProps = {
    prefixIcon?: React.ReactNode;
    label?: string;
    placeholder?: string;
    width?: any;
    height?: any;
    className?: string;
    inputClassName?: string;
    ltr?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    containerRef?: React.LegacyRef<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    value?: string;
    onInput?: (
      value: string,
      event: React.FormEvent<HTMLTextAreaElement>
    ) => void;
    onChange?: (
      value: string,
      event: React.FormEvent<HTMLTextAreaElement>
    ) => void;
    message?: Message;
  };
  export type TextareaComponent = React.ForwardRefExoticComponent<
    TextareaProps & React.RefAttributes<HTMLTextAreaElement>
  >;

  export type TaggedTextareaProps = {
    label?: string;
    prefixIcon?: React.ReactNode;
    className?: string;
    rows?: number;
    variables?: { keyword: string; title: string }[];
    onVariablesInitialized?: (controllers: {
      [key: string]: {
        insert: () => void;
      };
    }) => void;
    readOnly?: boolean;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    value?: string;
    onInput?: (
      value: string,
      event: React.FormEvent<HTMLTextAreaElement>
    ) => void;
    onChange?: (
      value: string,
      event: React.FormEvent<HTMLTextAreaElement>
    ) => void;
    message?: Message;
  };
  export type TaggedTextareaComponent = React.ForwardRefExoticComponent<
    TaggedTextareaProps & React.RefAttributes<HTMLTextAreaElement>
  >;

  export type TaggedTextareaControllerProps = Omit<
    TaggedTextareaProps,
    "onVariablesInitialized"
  > & {
    inputClassName?: string;
  };
  export type TaggedTextareaControllerComponent =
    React.ForwardRefExoticComponent<
      TaggedTextareaControllerProps & React.RefAttributes<HTMLTextAreaElement>
    >;
}

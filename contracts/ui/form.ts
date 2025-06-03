import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot";
import {
    ControllerProps,
    FieldError,
    FieldPath,
    FieldValues,
    FormProvider,
} from "react-hook-form"

export namespace Form {
    export type Props = React.ComponentPropsWithoutRef<typeof FormProvider>
    export type Component = typeof FormProvider;

    export type FieldProps<
        TFieldValues extends FieldValues = FieldValues,
        TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
    > = ControllerProps<TFieldValues, TName>;
    export type FieldComponent = <
        TFieldValues extends FieldValues = FieldValues,
        TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
    >(props: FieldProps<TFieldValues, TName>) => React.ReactNode

    export type FieldContextValue<
        TFieldValues extends FieldValues = FieldValues,
        TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
    > = {
        name: TName
    }
    export type FieldContext = React.Context<FieldContextValue>;

    export type FormFieldHook = () => {
        invalid: boolean;
        isDirty: boolean;
        isTouched: boolean;
        isValidating: boolean;
        error?: FieldError;
        id: string;
        name: string;
        formItemId: string;
        formDescriptionId: string;
        formMessageId: string;
    }

    export type ItemContextValue = {
        id: string
    }
    export type ItemContext = React.Context<ItemContextValue>;

    export type ItemProps = React.ComponentPropsWithoutRef<typeof Slot>
    export type ItemComponent = React.ForwardRefExoticComponent<
        ItemProps & { ref?: React.LegacyRef<HTMLElement> }
    >

    export type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
    export type LabelComponent = React.ForwardRefExoticComponent<
        LabelProps & { ref?: React.LegacyRef<HTMLLabelElement> }
    >

    export type ControlProps = React.ComponentPropsWithoutRef<typeof Slot>
    export type ControlComponent = React.ForwardRefExoticComponent<
        ControlProps & { ref?: React.LegacyRef<HTMLElement> }
    >

    export type DescriptionProps = React.HTMLAttributes<HTMLParagraphElement>
    export type DescriptionComponent = React.ForwardRefExoticComponent<
        DescriptionProps & React.RefAttributes<HTMLParagraphElement>
    >

    export type MessageProps = React.HTMLAttributes<HTMLParagraphElement>
    export type MessageComponent = React.ForwardRefExoticComponent<
        MessageProps & React.RefAttributes<HTMLParagraphElement>
    >
}
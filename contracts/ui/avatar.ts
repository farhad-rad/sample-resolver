import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { IComponentDefinition } from ".";

export namespace Avatar {
  export type Props = React.ComponentPropsWithoutRef<
    typeof AvatarPrimitive.Root
  >;

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLSpanElement>
  >;

  export type ImageProps = React.ComponentPropsWithoutRef<
    typeof AvatarPrimitive.Image
  >;

  export type ImageComponent = React.ForwardRefExoticComponent<
    ImageProps & React.RefAttributes<HTMLImageElement>
  >;

  export type FallbackProps = React.ComponentPropsWithoutRef<
    typeof AvatarPrimitive.Fallback
  >;

  export type FallbackComponent = React.ForwardRefExoticComponent<
    FallbackProps & React.RefAttributes<HTMLSpanElement>
  >;

  export type Definition = IComponentDefinition<"avatar"> & {
    src: string;
    fallback?: string;
    more?: {
      wrapper?: Omit<Props, "children">;
      image?: ImageProps;
      fallback?: Omit<FallbackProps, "children">;
    };
  };
}

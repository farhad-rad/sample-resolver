import "./Button.scss";
import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utilities/helpers";
import { Button as ButtonNS } from "@/contracts/ui/button";

const buttonVariants: ButtonNS.Variants = ButtonNS.DefaultVariants;

const Button: ButtonNS.Component = React.forwardRef<
  HTMLButtonElement,
  ButtonNS.Props
>(
  (
    {
      className,
      variant,
      size,
      disabled,
      width,
      children,
      loading,
      type = "button",
      ...props
    },
    ref
  ) => {
    if (loading) {
      disabled = true;
    }

    const contents = (
      <>
        {loading && (
          <div className="spinner">
            <Loader2 className="animate-spin" />
          </div>
        )}
        {children}
      </>
    );

    return (
      <button
        className={cn(
          buttonVariants({ variant, width, size, className, loading })
        )}
        type={type}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {contents}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

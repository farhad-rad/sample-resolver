import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utilities/helpers";
import { Resolver } from "@/modules/resolver/Resolver";
import { Button as ButtonNS } from "@/contracts/ui/button";
import { ArrowDown } from "lucide-react";
import { useAutoScroll } from "@/utilities/autoScroll";
import moment from "jalali-moment";
import { displayTimeAgo } from "@/utilities/displayTimeAgo";

// ChatBubble
const chatBubbleVariant = cva(
    "flex gap-2 max-w-[60%] items-end relative group",
    {
        variants: {
            variant: {
                received: "ltr:self-start rtl:self-end rtl:flex-row-reverse",
                sent: "rtl:self-start ltr:self-end ltr:flex-row-reverse",
                system: "system self-center"
            },
        },
        defaultVariants: {
            variant: "received",
        },
    },
);

interface ChatBubbleProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleVariant> { }

const ChatMessageLoading: React.FC = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="text-foreground"
        >
            <circle cx="4" cy="12" r="2" fill="currentColor">
                <animate
                    id="spinner_qFRN"
                    begin="0;spinner_OcgL.end+0.25s"
                    attributeName="cy"
                    calcMode="spline"
                    dur="0.6s"
                    values="12;6;12"
                    keySplines=".33,.66,.66,1;.33,0,.66,.33"
                />
            </circle>
            <circle cx="12" cy="12" r="2" fill="currentColor">
                <animate
                    begin="spinner_qFRN.begin+0.1s"
                    attributeName="cy"
                    calcMode="spline"
                    dur="0.6s"
                    values="12;6;12"
                    keySplines=".33,.66,.66,1;.33,0,.66,.33"
                />
            </circle>
            <circle cx="20" cy="12" r="2" fill="currentColor">
                <animate
                    id="spinner_OcgL"
                    begin="spinner_qFRN.begin+0.2s"
                    attributeName="cy"
                    calcMode="spline"
                    dur="0.6s"
                    values="12;6;12"
                    keySplines=".33,.66,.66,1;.33,0,.66,.33"
                />
            </circle>
        </svg>
    );
}
ChatMessageLoading.displayName = "ChatMessageLoading";

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
    ({ className, variant, children, ...props }, ref) => (
        <div
            className={cn(
                chatBubbleVariant({ variant, className }),
                "relative group",
            )}
            ref={ref}
            {...props}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child) && typeof child.type !== "string"
                    ? React.cloneElement(child, {
                        variant,
                    } as React.ComponentProps<typeof child.type>)
                    : child,
            )}
        </div>
    ),
);
ChatBubble.displayName = "ChatBubble";

// ChatBubbleAvatar
interface ChatBubbleAvatarProps {
    src?: string;
    fallback?: string;
    className?: string;
}

const ChatBubbleAvatar: React.FC<ChatBubbleAvatarProps> = ({
    src,
    fallback,
    className,
}) => (
    <Resolver.Avatar className={className}>
        <Resolver.AvatarImage src={src} alt="Avatar" />
        <Resolver.AvatarFallback>{fallback}</Resolver.AvatarFallback>
    </Resolver.Avatar>
);

// ChatBubbleMessage
const chatBubbleMessageVariants = cva("p-4", {
    variants: {
        variant: {
            received:
                "bg-gray-200 text-secondary-foreground rounded-r-lg rounded-tl-lg",
            sent: "bg-dominant-600 text-gray-50 rounded-l-lg rounded-tr-lg",
            system: "text-center font-bold"
        },
        layout: {
            default: "",
            ai: "border-t w-full rounded-none bg-transparent",
        },
    },
    defaultVariants: {
        variant: "received",
        layout: "default",
    },
});

interface ChatBubbleMessageProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleMessageVariants> {
    isLoading?: boolean;
    date?: Date | moment.Moment | string
}

const ChatBubbleMessage = React.forwardRef<
    HTMLDivElement,
    ChatBubbleMessageProps
>(
    (
        { className, variant, layout, isLoading = false, children, date, ...props },
        ref,
    ) => (
        <div
            className={cn(
                chatBubbleMessageVariants({ variant, layout, className }),
                "break-words max-w-full whitespace-pre-wrap text-xs",
            )}
            ref={ref}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center space-x-2">
                    <ChatMessageLoading />
                </div>
            ) : (
                <>
                    <div className={variant === "system" ? "bg-gray-150 text-gray-600 py-1 px-3 rounded-lg mb-2" : ""}>
                        {children}
                    </div>
                    {!!date && (
                        <div
                            className={cn(
                                "w-full text-xs mt-2 font-normal",
                                variant === "system"
                                    ? "text-center mt-1 text-gray-700"
                                    : variant === "sent"
                                        ? "text-end text-dominant-300/75"
                                        : "text-start text-gray-600"
                            )}
                        >
                            {displayTimeAgo(date)}
                        </div>
                    )}
                </>
            )}
        </div>
    ),
);
ChatBubbleMessage.displayName = "ChatBubbleMessage";

// ChatBubbleTimestamp
interface ChatBubbleTimestampProps
    extends React.HTMLAttributes<HTMLDivElement> {
    timestamp: string;
}

const ChatBubbleTimestamp: React.FC<ChatBubbleTimestampProps> = ({
    timestamp,
    className,
    ...props
}) => (
    <div className={cn("text-xs mt-2 text-right", className)} {...props}>
        {timestamp}
    </div>
);

// ChatBubbleAction
type ChatBubbleActionProps = Omit<ButtonNS.Props, 'children' | 'size'> & {
    icon: React.ReactNode;
};

const ChatBubbleAction: React.FC<ChatBubbleActionProps> = ({
    icon,
    onClick,
    className,
    variant = "gray-ghost",
    ...props
}) => (
    <Resolver.Button
        variant={variant}
        size="icon"
        className={className}
        onClick={onClick}
        {...props}
    >
        {icon}
    </Resolver.Button>
);

interface ChatBubbleActionWrapperProps
    extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "sent" | "received";
    className?: string;
}

const ChatBubbleActionWrapper = React.forwardRef<
    HTMLDivElement,
    ChatBubbleActionWrapperProps
>(({ variant, className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "absolute top-1/2 -translate-y-1/2 flex opacity-0 group-hover:opacity-100 transition-opacity duration-200",
            variant === "sent"
                ? "-left-1 -translate-x-full flex-row-reverse"
                : "-right-1 translate-x-full",
            className,
        )}
        {...props}
    >
        {children}
    </div>
));
ChatBubbleActionWrapper.displayName = "ChatBubbleActionWrapper";


interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
    smooth?: boolean;
}

const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ className, children, smooth = false, ...props }, _ref) => {
        const {
            scrollRef,
            isAtBottom,
            scrollToBottom,
            disableAutoScroll,
        } = useAutoScroll({
            smooth,
            content: children,
        });

        return (
            <div className="relative w-full h-full">
                <div
                    className={`flex flex-col w-full h-full p-4 overflow-y-auto ${className}`}
                    ref={scrollRef}
                    onWheel={disableAutoScroll}
                    onTouchMove={disableAutoScroll}
                    {...props}
                >
                    <div className="flex flex-col gap-6">{children}</div>
                </div>

                {!isAtBottom && (
                    <Resolver.Button
                        onClick={() => {
                            scrollToBottom();
                        }}
                        size="icon"
                        variant="gray-outline"
                        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 inline-flex rounded-full shadow-md"
                        aria-label="Scroll to bottom"
                    >
                        <ArrowDown className="h-4 w-4" />
                    </Resolver.Button>
                )}
            </div>
        );
    },
);

ChatMessageList.displayName = "ChatMessageList";

export {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
    ChatBubbleTimestamp,
    chatBubbleVariant,
    chatBubbleMessageVariants,
    ChatBubbleAction,
    ChatBubbleActionWrapper,
    ChatMessageList,
    ChatMessageLoading
};
import "./Skeleton.scss";
import { cn } from "@/utilities/helpers";
import { Skeleton as SkeletonNS } from "@/contracts/ui/skeleton";

const Skeleton: SkeletonNS.Component = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
};

export { Skeleton };

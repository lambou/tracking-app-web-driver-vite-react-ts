import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

export type EmptyContentProps = HTMLAttributes<HTMLDivElement> & {
  message?: ReactNode;
};

export default function EmptyContent({
  className,
  message,
  ...restProps
}: EmptyContentProps) {
  return (
    <div
      className={cn(
        "p-8 flex items-center justify-center bg-gray-100",
        className,
      )}
      {...restProps}
    >
      <span className="text-center text-gray-500 capitalize">
        {message ?? "No data available"}
      </span>
    </div>
  );
}

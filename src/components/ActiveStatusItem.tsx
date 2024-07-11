import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { HTMLAttributes, ReactNode } from "react";

export type ActiveStatusItemProps = HTMLAttributes<HTMLSpanElement> & {
  success?: boolean;
  label?: ReactNode;
};

export default function ActiveStatusItem({
  className,
  success,
  label,
  ...restProps
}: ActiveStatusItemProps) {
  return (
    <span
      className={cn(
        className,
        "px-4 min-h-9 text-center font-semibold rounded-md inline-flex items-center justify-center gap-2 border",
        {
          "border-green-500 text-green-500": success === true,
          "border-red-500 text-red-500": success === false,
        },
      )}
      {...restProps}
    >
      {success === true && <CheckCircle size={18} />}
      {success === false && <XCircle size={18} />}
      {label}
    </span>
  );
}

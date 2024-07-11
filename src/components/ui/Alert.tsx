import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { HTMLAttributes } from "react";

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant: "danger" | "info" | "success";
};
export default function Alert({
  className,
  variant,
  children,
  ...restProps
}: AlertProps) {
  return (
    <div
      className={cn(
        "p-4 rounded border text-base flex items-center justify-start gap-6",
        {
          "text-red-500 bg-red-50 border-red-500": variant === "danger",
          "text-blue-500 bg-blue-50 border-blue-500": variant === "info",
          "text-green-600 bg-green-50 border-green-600": variant === "success",
        },
        className,
      )}
      {...restProps}
    >
      {(() => {
        switch (variant) {
          case "danger":
            return <AlertCircle size={32} />;

          case "info":
            return <Info size={32} />;

          case "success":
            return <CheckCircle size={32} />;
        }
      })()}
      {children}
    </div>
  );
}

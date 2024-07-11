import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode, useEffect, useState } from "react";

type VariantType = "default" | "dark" | "orange" | "red" | "blue";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  outline?: boolean;
  variant?: VariantType;
  icon?: ReactNode;
  iconRight?: ReactNode;
};

export default function Button({
  className,
  children,
  outline,
  variant,
  loading,
  icon,
  iconRight,
  disabled,
  ...restProps
}: ButtonProps) {
  const localVariant = variant ?? "default";
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  useEffect(() => {
    let timeout: number;
    if (loading) {
      timeout = setTimeout(() => {
        setLocalLoading(true);
      }, 1_000);
    } else {
      setLocalLoading(false);
    }

    return () => {
      if (typeof timeout === "number") {
        clearTimeout(timeout);
      }
    };
  }, [loading]);
  return (
    <button
      className={cn(
        "px-4 min-h-9 text-center font-semibold rounded-md inline-flex items-center justify-center gap-2",
        disabled
          ? "border border-gray-200 bg-gray-200 text-gray-500 cursor-not-allowed"
          : {
              // default
              "border border-green-500 bg-green-500 text-white":
                localVariant === "default" && !outline,
              "border border-green-500": localVariant === "default" && outline,
              // dark
              "border border-black bg-black text-white":
                localVariant === "dark" && !outline,
              "border border-gray-500": localVariant === "dark" && outline,
              // blue
              "border border-blue-500 bg-blue-500 text-white":
                localVariant === "blue" && !outline,
              "border border-blue-500": localVariant === "blue" && outline,
              // red
              "border border-red-500 bg-red-500 text-white":
                localVariant === "red" && !outline,
              "border border-red-500": localVariant === "red" && outline,
              // orange
              "border border-orange-500 bg-orange-500 text-white":
                localVariant === "orange" && !outline,
              "border border-orange-500": localVariant === "orange" && outline,
            },
        className,
      )}
      {...restProps}
    >
      {localLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        icon ?? <></>
      )}
      {children}
      {iconRight}
    </button>
  );
}

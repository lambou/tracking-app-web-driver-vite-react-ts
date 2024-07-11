import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

export type InfoItemProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
  value: ReactNode;
};

export default function InfoItem({
  className,
  label,
  value,
  ...restProps
}: InfoItemProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...restProps}>
      <span className="text-base font-semibold capitalize">{label}</span>
      <span className="text-sm text-gray-500">{value}</span>
    </div>
  );
}

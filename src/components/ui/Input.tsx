import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...restProps }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-8 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed",
          className,
        )}
        {...restProps}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;

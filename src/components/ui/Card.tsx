import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {}

export default function Card({className,children, ...restProps}: CardProps){
    return <div className={cn("p-6 border rounded-md shadow-md bg-white flex flex-col", className)} {...restProps}>{children}</div>
}
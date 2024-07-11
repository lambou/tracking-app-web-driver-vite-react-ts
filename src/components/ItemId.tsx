import { cn } from '@/lib/utils'
import { Clipboard } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ItemId({
    className,
    value,
}: {
    className?: string
    value: string
}) {
    return (
        <span
            className={cn(
                'text-sm cursor-pointer px-3 py-1 bg-gray-100 text-gray-500 font-semibold rounded-full inline-flex items-center justify-center gap-2',
                className
            )}
            onClick={() => {
                navigator.clipboard.writeText(value)
                toast.success('Copied to clipboard.')
            }}
        >
            <Clipboard size={12} className="shrink-0" />
            <span className="truncate">{value}</span>
        </span>
    )
}

import * as ProgressPrimitive from "@radix-ui/react-progress"

export type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    value?: number
    indicatorClassName?: string
    variant?: "default" | "success" | "warning" | "danger"
}
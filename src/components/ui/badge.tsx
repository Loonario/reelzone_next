import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        onReview:
          "border-transparent bg-onreview text-primary-foreground shadow hover:bg-pink-400",
        inProgress:
          "border-transparent bg-inprogress text-primary-foreground shadow hover:bg-sky-400",
        inQueue:
          "border-transparent bg-inqueue text-primary-foreground shadow hover:bg-purple-400",
        onHold:
          "border-transparent bg-onhold text-primary-foreground shadow hover:bg-red-400",
        done:
          "border-transparent bg-done text-primary-foreground shadow hover:bg-emerald-400",
        archived:
          "border-transparent bg-archived text-primary-foreground shadow hover:bg-gray-400",
        },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

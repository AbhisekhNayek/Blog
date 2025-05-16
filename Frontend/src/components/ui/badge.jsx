import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white border-green-500/20 hover:text-green-500/80",
        secondary:
          "bg-black text-green-500/80 border-green-500/20 hover:text-white",
        destructive:
          "bg-black text-red-500 border-red-500/30 hover:text-white",
        outline:
          "bg-transparent text-green-500/80 border border-green-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

// import { cn } from "../lib/utils"

const iconVariants = cva(
  'inline-flex gap-2 w-10 h-10 p-2 bg-base-300 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-base-400 focus:z-10 focus:ring-purple-800',
  {
    variants: {
      variant: {
      },
      disabled: {
        false: 'cursor-pointer',
        true: 'opacity-75 cursor-not-allowed',
      },
      size: {}
    },
    compoundVariants: [

    ],
    defaultVariants: {
      disabled: false,
    }
  })

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof iconVariants> {
  asChild?: boolean;
}

const AppIcon = ({ children, className, variant, disabled, ...props }: ButtonProps) => {
  return (
    <button {...props} className={iconVariants({ variant, disabled, className })} disabled={disabled}>
      <span className={disabled && 'pointer-events-none'}>
        {children}
      </span>
    </button>
  )
}

AppIcon.displayName = "AppIcon"

export { AppIcon, iconVariants }



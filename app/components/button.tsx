"use client";

import * as React from "react"

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`
      inline-flex items-center justify-center rounded-md text-sm font-medium
      transition-colors focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50
      disabled:pointer-events-none ring-offset-background
      px-4 py-2 ${className}
    `}
    {...props}
  />
))
Button.displayName = "Button"

export { Button }
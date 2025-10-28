"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

const TooltipContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  clickedOpen: boolean
  setClickedOpen: (clicked: boolean) => void
}>({
  open: false,
  setOpen: () => {},
  clickedOpen: false,
  setClickedOpen: () => {},
})

function Tooltip({
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  const [open, setOpen] = React.useState(false)
  const [clickedOpen, setClickedOpen] = React.useState(false)
  
  return (
    <TooltipProvider>
      <TooltipContext.Provider value={{ open, setOpen, clickedOpen, setClickedOpen }}>
        <TooltipPrimitive.Root 
          data-slot="tooltip" 
          open={open}
          onOpenChange={setOpen}
          disableHoverableContent={true}
          {...props}
        >
          {children}
        </TooltipPrimitive.Root>
      </TooltipContext.Provider>
    </TooltipProvider>
  )
}

function TooltipTrigger({
  onFocus,
  onBlur,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const { open, setOpen, clickedOpen, setClickedOpen } = React.useContext(TooltipContext)
  
  return (
    <TooltipPrimitive.Trigger 
      data-slot="tooltip-trigger"
      onMouseEnter={(e) => {
        if (!clickedOpen) {
          setOpen(true)
        }
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        if (!clickedOpen) {
          setOpen(false)
        }
        onMouseLeave?.(e)
      }}
      onFocus={(e) => {
        if (!clickedOpen) {
          setOpen(true)
        }
        onFocus?.(e)
      }}
      onBlur={(e) => {
        if (!clickedOpen) {
          setOpen(false)
        }
        onBlur?.(e)
      }}
      onClick={(e) => {
        e.preventDefault()
        const newOpenState = !open
        setOpen(newOpenState)
        setClickedOpen(newOpenState)
        onClick?.(e)
      }}
      {...props} 
    />
  )
}

function TooltipContent({
  className,
  sideOffset = -12,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-40 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-40 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

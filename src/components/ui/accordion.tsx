import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

type AccordionProps = Omit<AccordionPrimitive.AccordionSingleProps, "type"> & {
  type?: "single";
};

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ type = "single", collapsible = true, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    type={type}
    collapsible={collapsible}
    {...props}
  />
));
Accordion.displayName = AccordionPrimitive.Root.displayName;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "overflow-hidden border border-white/10 bg-[rgba(7,9,8,0.54)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex min-h-[62px] flex-1 cursor-pointer items-center justify-between gap-3 px-5 text-left font-mono text-xs font-black uppercase tracking-[0.08em] text-white transition-colors hover:bg-white/[0.055] focus-visible:shadow-[inset_0_0_0_2px_var(--zoda-accent,#55cda1)] focus-visible:outline-none data-[state=open]:bg-black [&[data-state=open]>svg]:rotate-45 [&[data-state=open]>svg]:bg-[var(--zoda-accent,#55cda1)] [&[data-state=open]>svg]:text-black",
        className,
      )}
      {...props}
    >
      {children}
      <Plus className="h-[22px] w-[22px] shrink-0 border border-[rgba(85,205,161,0.62)] p-[5px] text-[var(--zoda-accent,#55cda1)] transition-[transform,background,color] duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div
      className={cn(
        "border-t border-white/10 bg-[linear-gradient(90deg,rgba(85,205,161,0.12),rgba(85,205,161,0)),rgba(0,0,0,0.18)] px-5 py-4 font-mono text-sm leading-7 text-white/80",
        className,
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        cardiology: "border-transparent bg-cardiology text-cardiology-foreground hover:bg-cardiology/80",
        orthopedic: "border-transparent bg-orthopedic text-orthopedic-foreground hover:bg-orthopedic/80",
        dermatology: "border-transparent bg-dermatology text-dermatology-foreground hover:bg-dermatology/80",
        neurology: "border-transparent bg-neurology text-neurology-foreground hover:bg-neurology/80",
        ent: "border-transparent bg-ent text-ent-foreground hover:bg-ent/80",
        gastroenterology: "border-transparent bg-gastroenterology text-gastroenterology-foreground hover:bg-gastroenterology/80",
        ophthalmology: "border-transparent bg-ophthalmology text-ophthalmology-foreground hover:bg-ophthalmology/80",
        gynecology: "border-transparent bg-gynecology text-gynecology-foreground hover:bg-gynecology/80",
        pulmonology: "border-transparent bg-pulmonology text-pulmonology-foreground hover:bg-pulmonology/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "../../lib/utils";

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <>
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 switch-root",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 switch-thumb"
        )}
      />
    </SwitchPrimitives.Root>
    <style>{`
      .switch-root[data-state="checked"] {
        background: linear-gradient(135deg, #6aa84f 0%, #38761d 100%) !important;
      }
      .switch-root[data-state="unchecked"] {
        background: #cbd5e1 !important;
      }
      .switch-thumb {
        background-color: #ffffff !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
      }
    `}</style>
  </>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

import { Hero } from "@/components/ui/hero"
import { cn } from "@/lib/utils"

export function LandingPage({ revealed = false }: { revealed?: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 overflow-hidden bg-obsidian text-bone transition-[filter,transform] duration-1000 ease-out",
        revealed ? "scale-100 blur-none" : "pointer-events-none scale-[1.04] blur-2xl",
      )}
    >
      <div className="relative h-full overflow-y-auto overflow-x-hidden overscroll-contain">
        <Hero />
      </div>
    </div>
  )
}

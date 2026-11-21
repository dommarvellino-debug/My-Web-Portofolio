import { GlyphBackground } from "@/components/ui/backgrounds-glyph"

export default function GlyphBackgroundDemo() {
  return (
    <div className="relative h-screen w-full bg-background text-foreground">
      <GlyphBackground className="absolute inset-0" />
    </div>
  )
}

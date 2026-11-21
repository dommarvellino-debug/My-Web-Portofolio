"use client"

// AsciiArt — "starry nights", made with the 21st.dev ASCII editor and baked
// to its exact rendered output (looping video + poster). Zero dependencies:
// one <video> that fills its parent. Drop it behind or inside your content:
// <div className="relative h-96"><AsciiArt className="absolute inset-0" /></div>
// Remix the source recipe (styles, animation, palette) in the editor:
// https://21st.dev/community/ascii/editor?from=7ad845c6-760e-459d-b294-96ed22fe439e
const VIDEO_SRC = "/portfolio-starry-nights.mp4"
const POSTER_SRC = "/portfolio-starry-nights-poster.webp"

export function AsciiArt({ className }: { className?: string }) {
  return (
    <video
      className={className}
      src={VIDEO_SRC}
      poster={POSTER_SRC}
      autoPlay
      loop
      muted
      playsInline
      aria-label={"starry nights — animated ASCII art"}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  )
}

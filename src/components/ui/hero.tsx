"use client"

import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { MouseFollowingEyes } from "@/components/ui/mouse-following-eyes"
import { StickerSlapFooter } from "@/components/ui/sticker-slap-footer"

/* ------------------------------------------------------------------ */
/* Palette helpers                                                     */
/* ------------------------------------------------------------------ */

/** Hard extrusion behind the warm poster line. */
const WARM_EXTRUDE = Array.from(
  { length: 12 },
  (_, i) => `${i + 1}px ${i + 1}px 0 #6d3016`,
).join(", ")

/** Hard extrusion behind the bone poster lines — a deep iris, never black. */
const BONE_EXTRUDE = Array.from(
  { length: 12 },
  (_, i) => `${i + 1}px ${i + 1}px 0 #1e2463`,
).join(", ")

const NAV_LINKS = [
  { label: "About", href: "/portfolio.html#philosophy-section" },
  { label: "Work", href: "/portfolio.html#work" },
  { label: "Experience", href: "/portfolio.html#experience" },
  { label: "Contact", href: "/portfolio.html#contact" },
]

/* ------------------------------------------------------------------ */
/* Hand-drawn accents                                                  */
/* ------------------------------------------------------------------ */

function ArrowIrisLeft({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-full w-full overflow-visible stroke-current text-electric-iris", className)}
      fill="none"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10,90 C 10,40 40,20 60,50 C 70,65 80,75 95,70" />
      <path d="M80,55 L95,70 L85,85" />
    </svg>
  )
}

function ArrowWarmRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-full w-full overflow-visible stroke-current text-tertiary", className)}
      fill="none"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M90,10 C 80,60 60,80 40,60 C 20,40 40,20 60,30 C 80,40 70,70 50,80" />
      <path d="M65,75 L50,80 L55,65" />
    </svg>
  )
}

function CircularBadge() {
  const reduce = useReducedMotion()

  return (
    <a
      href="/portfolio.html"
      aria-label="Open the full portfolio"
      className="group relative flex h-24 w-24 rotate-12 cursor-pointer items-center justify-center rounded-full border-[3px] border-obsidian/5 bg-tertiary shadow-xl transition-transform duration-300 hover:rotate-0 hover:scale-105 sm:h-28 sm:w-28 md:h-36 md:w-36"
    >
      <div
        className={cn(
          "absolute inset-1",
          reduce ? "" : "animate-[spin_10s_linear_infinite]",
          "motion-reduce:animate-none",
        )}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <defs>
            <path
              id="hero-badge-path"
              d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
              fill="none"
            />
          </defs>
          <text
            className="fill-obsidian text-[9px] font-black uppercase tracking-[0.14em]"
            style={{ fontFamily: '"Inter", ui-sans-serif, sans-serif' }}
          >
            <textPath href="#hero-badge-path" startOffset="0%">
              Open portfolio • See the work •
            </textPath>
          </text>
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="h-8 w-8 overflow-visible stroke-current text-obsidian transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-10 md:w-10"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20,80 Q 40,50 30,30 T 80,20" />
          <path d="M60,10 L80,20 L70,40" />
        </svg>
      </div>
    </a>
  )
}

/* ------------------------------------------------------------------ */
/* Floating glass proof cards                                          */
/* ------------------------------------------------------------------ */

function ProofCard({
  className,
  delay = 0,
  rotate,
  accent,
  avatar,
  name,
  detail,
}: {
  className?: string
  delay?: number
  rotate: string
  accent: string
  avatar: string
  name: string
  detail: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -15, 0] }}
      transition={
        reduce ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }
      }
      className={cn("pointer-events-auto", className)}
    >
      <div
        className={cn(
          "flex aspect-[3/3.5] w-24 flex-col items-center justify-center rounded-[1.75rem] border border-bone/30 bg-bone/10 p-3 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:rotate-0 sm:w-36 sm:rounded-[2rem] sm:p-5 md:w-40 lg:w-48",
          rotate,
          "motion-reduce:transition-none",
        )}
      >
        <div
          className={cn(
            "mb-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-[3px] border-bone/40 shadow-inner sm:mb-3 sm:h-16 sm:w-16 md:h-24 md:w-24",
            accent,
          )}
        >
          <img
            src={avatar}
            alt=""
            loading="lazy"
            className="h-full w-full scale-150 object-cover"
          />
        </div>
        <div className="text-center">
          <p className="text-[11px] font-bold leading-tight text-bone sm:text-sm md:text-lg">{name}</p>
          <p className="mt-1 text-[9px] leading-tight text-bone/70 sm:text-[10px] md:text-xs">{detail}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <div className="relative flex min-h-full w-full flex-col overflow-hidden bg-obsidian font-sans text-bone selection:bg-tertiary selection:text-obsidian">
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(227,226,230,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(227,226,230,0.06) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      {/* Ambient irises */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 h-[520px] w-[520px] rounded-full bg-electric-iris/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-tertiary/10 blur-[130px]"
      />

      {/* Navbar */}
      <nav className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8">
        <a href="/" className="flex items-center gap-1" aria-label="2kMarvin — home">
          <span className="relative rounded-2xl rounded-bl-sm bg-bone px-3 py-1.5 text-xs font-black tracking-tight text-obsidian shadow-sm md:text-sm">
            2K
            <span
              aria-hidden="true"
              className="absolute -bottom-1.5 left-0 h-3 w-3 bg-bone"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            />
          </span>
          <span className="rounded-full border-[1.5px] border-bone bg-tertiary px-3 py-1.5 text-xs font-black tracking-tight text-obsidian shadow-sm md:text-sm">
            MARVIN
          </span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full border border-bone/25 px-4 py-1.5 text-xs font-semibold text-bone/85 transition-colors hover:bg-bone/10 hover:text-bone"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="/portfolio.html"
          className="group inline-flex items-center gap-1.5 rounded-full border border-bone px-4 py-2 text-xs font-semibold text-bone transition-colors hover:bg-bone hover:text-obsidian sm:px-6 sm:text-sm"
        >
          Portfolio
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </nav>

      {/* Poster */}
      <main className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-4 pb-24 pt-4 sm:pb-32 md:px-10 md:pb-44 md:pt-8">
        <div className="relative mx-auto mb-10 mt-2 flex min-h-[350px] w-full max-w-5xl flex-col items-center justify-center text-center sm:min-h-[420px] md:mb-16 md:min-h-[500px]">
          {/* Type stack */}
          <h1 className="relative z-10 flex w-full flex-col items-center gap-1 md:gap-3">
            {/* Eyes sit above the poster name and follow the pointer */}
            <div className="absolute bottom-full left-[6%] mb-4 origin-left scale-90 sm:scale-100 md:left-[12%]">
              <MouseFollowingEyes size={72} gap={10} />
            </div>

            <span className="flex w-full justify-start pl-[6%] md:pl-[12%]">
              <span
                className="block text-[clamp(2.5rem,11vw,7rem)] font-black uppercase leading-[0.85] tracking-[-0.055em] text-tertiary"
                style={{
                  fontWeight: 900,
                  textShadow: WARM_EXTRUDE,
                  fontFamily: '"Inter", "Arial Black", Impact, sans-serif',
                }}
              >
                Marvellino
              </span>
            </span>

            <span className="flex w-full justify-center">
              <span
                className="block text-[clamp(2.5rem,11.5vw,8.5rem)] font-black uppercase leading-[0.85] tracking-[-0.06em] text-bone"
                style={{
                  fontWeight: 900,
                  textShadow: BONE_EXTRUDE,
                  fontFamily: '"Inter", "Arial Black", Impact, sans-serif',
                }}
              >
                AI &amp; BIG DATA
              </span>
            </span>

            <span className="flex w-full justify-start pl-[14%] md:pl-[30%]">
              <span
                className="block text-[clamp(2.75rem,13vw,10rem)] font-black uppercase leading-[0.85] tracking-[-0.06em] text-bone"
                style={{
                  fontWeight: 900,
                  textShadow: BONE_EXTRUDE,
                  fontFamily: '"Inter", "Arial Black", Impact, sans-serif',
                }}
              >
                editing
              </span>
            </span>
          </h1>

          {/* Collage overlays */}
          <div className="pointer-events-none absolute inset-0 h-full w-full">
            <ProofCard
              className="absolute -bottom-6 left-0 z-30 sm:-bottom-20 sm:left-[2%] md:-bottom-12 md:left-[6%]"
              delay={0}
              rotate="-rotate-12"
              accent="bg-tertiary"
              avatar="/proof-card-avatar.jpeg"
              name="@2kMarvin"
              detail="40.6K+ likes"
            />

            <ProofCard
              className="absolute right-0 top-2 z-30 xl:-right-24 xl:top-10"
              delay={1}
              rotate="rotate-12"
              accent="bg-electric-iris"
              avatar="/proof-card-avatar-2.png"
              name="AI & BIG DATA"
              detail="UNDERGRADUATE"
            />

            <div className="absolute bottom-[-4%] left-0 z-20 h-20 w-20 sm:left-[2%] md:bottom-0 md:left-[6%] md:h-28 md:w-28">
              <ArrowIrisLeft />
            </div>

            <div className="absolute right-0 top-[-4%] z-20 h-16 w-16 sm:right-[2%] md:right-[6%] md:h-24 md:w-24">
              <ArrowWarmRight />
            </div>

            <div className="absolute -bottom-14 right-[4%] z-40 sm:right-[6%] md:-bottom-32 md:right-[12%]">
              <CircularBadge />
            </div>
          </div>
        </div>
      </main>

      <StickerSlapFooter />
    </div>
  )
}

export default Hero

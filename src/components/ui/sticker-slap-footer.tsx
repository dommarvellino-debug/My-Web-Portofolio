"use client"

import type { ReactNode } from "react"
import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

const SCRIPT = '"Dancing Script", "Segoe Script", cursive'

const EXPLORE_LINKS = [
  { label: "About", href: "/portfolio.html#philosophy-section" },
  { label: "Work", href: "/portfolio.html#work" },
  { label: "Experience", href: "/portfolio.html#experience" },
  { label: "Contact", href: "/portfolio.html#contact" },
]

const ELSEWHERE_LINKS = [
  { label: "TikTok", href: "https://tiktok.com/@2kMarvin" },
  { label: "LinkedIn", href: "https://linkedin.com/in/dominikus-marvellino-904755377" },
  { label: "Full portfolio", href: "/portfolio.html" },
]

const STATS = [
  { value: "40.6K+", label: "TikTok likes" },
  { value: "75.7K", label: "Peak views" },
  { value: "94.93", label: "Data score" },
]

/** 12-spike seal used for the header call-to-action. */
const STAR_POINTS = Array.from({ length: 24 }, (_, i) => {
  const angle = (Math.PI / 12) * i - Math.PI / 2
  const radius = i % 2 === 0 ? 50 : 38
  return `${(50 + Math.cos(angle) * radius).toFixed(2)},${(50 + Math.sin(angle) * radius).toFixed(2)}`
}).join(" ")

/* ------------------------------------------------------------------ */
/* Die-cut stickers                                                    */
/* ------------------------------------------------------------------ */

function WowSticker() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <polygon
        points={STAR_POINTS}
        fill="#ffb692"
        stroke="#e3e2e6"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <text
        x="50"
        y="52"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily='"Inter", sans-serif'
        fontWeight="900"
        fontSize="15"
        fill="#121316"
      >
        WOW
      </text>
    </svg>
  )
}

function SmileySticker() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <circle cx="50" cy="50" r="43" fill="#e3e2e6" stroke="#e3e2e6" strokeWidth="7" />
      <circle cx="37" cy="42" r="5.5" fill="#121316" />
      <circle cx="63" cy="42" r="5.5" fill="#121316" />
      <path
        d="M31 59 Q50 79 69 59"
        fill="none"
        stroke="#121316"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function HeartSticker() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <path
        d="M50 87 C18 66 8 46 19 31 C28 18 45 21 50 34 C55 21 72 18 81 31 C92 46 82 66 50 87 Z"
        fill="#121316"
        stroke="#e3e2e6"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <circle cx="37" cy="42" r="4" fill="#ffb692" />
    </svg>
  )
}

function DaisySticker() {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45)
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <g fill="#e3e2e6" stroke="#e3e2e6" strokeWidth="5">
        {petals.map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="24"
            rx="10"
            ry="18"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="13" fill="#ffb692" stroke="#121316" strokeWidth="5" />
    </svg>
  )
}

function CameraSticker() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <path
        d="M14 34 h16 l7 -9 h26 l7 9 h16 a8 8 0 0 1 8 8 v34 a8 8 0 0 1 -8 8 h-72 a8 8 0 0 1 -8 -8 v-34 a8 8 0 0 1 8 -8 z"
        fill="#121316"
        stroke="#e3e2e6"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="56" r="16" fill="#455ce9" stroke="#e3e2e6" strokeWidth="6" />
      <circle cx="82" cy="42" r="4" fill="#ffb692" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Sticker wrapper                                                     */
/* ------------------------------------------------------------------ */

function Sticker({
  className,
  rotate = 0,
  delay = 0,
  children,
}: {
  className?: string
  rotate?: number
  delay?: number
  children: ReactNode
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, scale: 1.75, rotate: rotate - 20 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 240, damping: 15, delay }}
      style={reduce ? { transform: `rotate(${rotate}deg)` } : undefined}
      className={cn(
        "pointer-events-none absolute drop-shadow-[0_10px_20px_rgba(10,10,15,0.3)]",
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export function StickerSlapFooter() {
  const reduce = useReducedMotion()
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const wordmarkInView = useInView(wordmarkRef, { once: true, amount: 0.2 })

  return (
    <footer className="relative z-20 mt-auto w-full px-2 pb-2 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-t-[2rem] bg-bone px-2 pb-2 pt-2 text-obsidian shadow-[0_-20px_50px_rgba(0,0,0,0.35)] md:rounded-t-[3rem]">
        {/* Cream header */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-3 pb-4 pt-2 sm:px-5 md:px-7">
          <a
            href="/portfolio.html#contact"
            aria-label="Say hello"
            className="group relative flex h-14 w-14 shrink-0 items-center justify-center transition-transform duration-300 hover:rotate-12 hover:scale-105 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
              <polygon
                points={STAR_POINTS}
                fill="#ffb692"
                stroke="#121316"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily='"Inter", sans-serif'
                fontWeight="900"
                fontSize="13"
                letterSpacing="1"
                fill="#121316"
              >
                SAY
              </text>
              <text
                x="50"
                y="63"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily='"Inter", sans-serif'
                fontWeight="900"
                fontSize="13"
                letterSpacing="1"
                fill="#121316"
              >
                HI
              </text>
            </svg>
          </a>

          <a
            href="/"
            className="shrink-0 text-4xl leading-none transition-colors hover:text-electric-iris sm:text-5xl md:text-6xl"
            style={{ fontFamily: SCRIPT, fontWeight: 700 }}
          >
            2kMarvin
          </a>

          <a
            href="/portfolio.html#contact"
            className="group relative inline-flex items-center gap-2 rounded-full bg-obsidian px-4 py-2.5 text-[11px] font-semibold text-bone transition-transform duration-300 hover:-rotate-2 hover:scale-[1.03] sm:text-xs"
          >
            Got a project? Let&apos;s talk
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span
              aria-hidden="true"
              className="absolute -bottom-1.5 left-5 h-4 w-4 rotate-45 rounded-[2px] bg-obsidian"
            />
          </a>

          <span className="ml-auto hidden text-[10px] font-black uppercase tracking-[0.22em] text-obsidian/45 md:block">
            Portfolio · 2026
          </span>
        </div>

        {/* Cobalt panel */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-electric-iris px-5 pb-0 pt-6 text-bone sm:px-8 sm:pt-8 md:rounded-[2rem] md:px-12 md:pt-10">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[1.35fr_1fr_1fr]">
              <div>
                <p className="max-w-[18ch] text-2xl font-black uppercase leading-[0.95] tracking-tight md:text-3xl">
                  Let&apos;s make
                  <br />
                  data move.
                </p>
                <p className="mt-3 max-w-[30ch] text-xs leading-relaxed text-bone/70 md:text-sm">
                  AI &amp; Big Data undergraduate turning sports footage into retention-first edits.
                </p>
              </div>

              <nav aria-label="Footer navigation" className="sm:justify-self-end md:justify-self-auto">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-bone/45">
                  Explore
                </p>
                <ul className="space-y-2">
                  {EXPLORE_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-bone/85 transition-colors hover:text-tertiary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="sm:justify-self-end md:justify-self-auto">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-bone/45">
                  Elsewhere
                </p>
                <ul className="space-y-2">
                  {ELSEWHERE_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-bone/85 transition-colors hover:text-tertiary"
                      >
                        {link.label}
                        {link.href.startsWith("http") ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-bone/15 pt-5">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <dt className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-bone/50 sm:text-[10px]">
                    {stat.label}
                  </dt>
                  <dd className="text-lg font-black leading-none md:text-2xl">{stat.value}</dd>
                </div>
              ))}
            </dl>

            {/* Giant script wordmark, clipped by the panel edge */}
            <div ref={wordmarkRef}>
              <motion.p
                aria-hidden="true"
                animate={
                  reduce
                    ? { clipPath: "none" }
                    : {
                        clipPath: wordmarkInView
                          ? "inset(-20% 0% -12% 0)"
                          : "inset(-20% 100% -12% 0)",
                      }
                }
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="pointer-events-none mt-6 select-none whitespace-nowrap text-center leading-[0.68] text-bone/95 md:mt-8"
                style={{
                  fontFamily: SCRIPT,
                  fontWeight: 700,
                  fontSize: "clamp(3.5rem, 18vw, 16rem)",
                  marginBottom: "0.08em",
                }}
              >
                dominikus
              </motion.p>
            </div>
          </div>

          {/* Die-cut stickers slap over the seam */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Sticker
              className="bottom-[4%] left-[1%] h-12 w-12 sm:h-16 sm:w-16 md:left-[3%] md:h-20 md:w-20"
              rotate={-14}
              delay={0}
            >
              <WowSticker />
            </Sticker>
            <Sticker
              className="bottom-[24%] left-[24%] hidden h-11 w-11 rotate-6 sm:block sm:h-14 sm:w-14 md:left-[22%] md:h-16 md:w-16"
              rotate={8}
              delay={0.06}
            >
              <SmileySticker />
            </Sticker>
            <Sticker
              className="bottom-[-2%] left-[44%] hidden h-12 w-12 md:block md:h-16 md:w-16"
              rotate={6}
              delay={0.12}
            >
              <CameraSticker />
            </Sticker>
            <Sticker
              className="bottom-[2%] right-[16%] h-11 w-11 sm:h-14 sm:w-14 md:right-[14%] md:h-16 md:w-16"
              rotate={12}
              delay={0.1}
            >
              <HeartSticker />
            </Sticker>
            <Sticker
              className="bottom-[22%] right-[2%] h-12 w-12 sm:h-16 sm:w-16 md:right-[4%] md:h-[4.5rem] md:w-[4.5rem]"
              rotate={-10}
              delay={0.04}
            >
              <DaisySticker />
            </Sticker>
          </div>
        </div>

        {/* Cream footing */}
        <div className="flex flex-col items-start justify-between gap-1 px-3 pb-1 pt-3 text-[9px] font-black uppercase tracking-[0.18em] text-obsidian/45 sm:flex-row sm:items-center sm:px-5 md:px-7">
          <span>© 2026 Dominikus Marvellino</span>
          <span>AI &amp; Big Data · Editing</span>
        </div>
      </div>
    </footer>
  )
}

export default StickerSlapFooter

"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type Point = { x: number; y: number }

/** Pupils recenter when the pointer leaves the window. */
const OFFSCREEN: Point = { x: -10000, y: -10000 }

export interface MouseFollowingEyesProps {
  className?: string
  /** Diameter of each eye, in pixels. */
  size?: number
  /** Space between the two eyes, in pixels. */
  gap?: number
  /** Keep the pupils centered and ignore the pointer. */
  idle?: boolean
}

/**
 * A pair of cartoon eyes whose pupils track the pointer anywhere on the page.
 * Decorative: the wrapper is pointer-events-none and hidden from assistive tech.
 */
export function MouseFollowingEyes({
  className,
  size = 64,
  gap = 10,
  idle = false,
}: MouseFollowingEyesProps) {
  const [pointer, setPointer] = useState<Point>(OFFSCREEN)
  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (idle) return

    const onMove = (event: PointerEvent) => {
      setPointer({ x: event.clientX, y: event.clientY })
    }
    const onLeave = () => setPointer(OFFSCREEN)

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    document.addEventListener("mouseleave", onLeave)

    return () => {
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [idle])

  const activePointer = idle ? OFFSCREEN : pointer

  return (
    <div
      aria-hidden="true"
      data-slot="mouse-following-eyes"
      className={cn("pointer-events-none flex items-center", className)}
      style={{ gap }}
    >
      <Eye size={size} pointer={activePointer} selfRef={leftEyeRef} />
      <Eye size={size} pointer={activePointer} selfRef={rightEyeRef} />
    </div>
  )
}

interface EyeProps {
  size: number
  pointer: Point
  selfRef: React.RefObject<HTMLDivElement | null>
}

function Eye({ size, pointer, selfRef }: EyeProps) {
  const pupilRef = useRef<HTMLDivElement>(null)
  const [center, setCenter] = useState<Point>({ x: 0, y: 0 })

  const pupilSize = Math.max(10, Math.round(size * 0.34))
  const travel = Math.max(2, (size - pupilSize) / 2 - 3)

  useEffect(() => {
    const updateCenter = () => {
      const rect = selfRef.current?.getBoundingClientRect()
      if (!rect) return
      setCenter({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
    }

    updateCenter()
    window.addEventListener("resize", updateCenter)
    // The hero scrolls inside its own container, so listen in the capture phase.
    document.addEventListener("scroll", updateCenter, {
      capture: true,
      passive: true,
    })

    return () => {
      window.removeEventListener("resize", updateCenter)
      document.removeEventListener("scroll", updateCenter, { capture: true })
    }
  }, [selfRef])

  useEffect(() => {
    const pupil = pupilRef.current
    if (!pupil) return

    if (pointer.x <= -9000) {
      pupil.style.transform = "translate(0px, 0px)"
      return
    }

    const dx = pointer.x - center.x
    const dy = pointer.y - center.y
    const distance = Math.hypot(dx, dy)

    if (distance === 0) {
      pupil.style.transform = "translate(0px, 0px)"
      return
    }

    const reach = Math.min(travel, distance)
    const pupilX = (dx / distance) * reach
    const pupilY = (dy / distance) * reach

    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`
  }, [pointer, center, travel])

  return (
    <div
      ref={selfRef}
      className="relative flex flex-shrink-0 items-center justify-center rounded-full border-obsidian bg-bone shadow-[inset_0_-6px_14px_rgba(10,10,15,0.2),0_10px_28px_rgba(0,0,0,0.4)]"
      style={{
        width: size,
        height: size,
        borderWidth: Math.max(2, Math.round(size * 0.045)),
      }}
    >
      <div
        ref={pupilRef}
        className="relative rounded-full bg-obsidian shadow-[0_2px_6px_rgba(0,0,0,0.45)] transition-transform duration-75 ease-out will-change-transform motion-reduce:transition-none"
        style={{ width: pupilSize, height: pupilSize }}
      >
        <span
          className="absolute rounded-full bg-tertiary"
          style={{
            width: Math.max(3, Math.round(pupilSize * 0.3)),
            height: Math.max(3, Math.round(pupilSize * 0.3)),
            right: Math.round(pupilSize * 0.12),
            bottom: Math.round(pupilSize * 0.12),
          }}
        />
      </div>
    </div>
  )
}

export default MouseFollowingEyes

'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { SPLINE_SCENE_URL } from '@/lib/constants'
import RobotLoader from '@/components/RobotLoader'

// Client-only — Spline needs the browser (canvas/WebGL).
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

// The Spline runtime Application exposes play()/stop() to control its render loop.
type SplineApp = { play?: () => void; stop?: () => void }

interface Props {
  className?: string
  /** Called once the scene has loaded (or failsafe fires). */
  onReady?: () => void
}

/**
 * Renders the Spline robot as an in-page canvas via @splinetool/react-spline.
 * - A black cover with a cute robot loader shows until the scene loads.
 * - Pauses the WebGL render loop while the hero is off-screen so it doesn't
 *   compete with scrolling further down the page (big smoothness win).
 * - Failsafe reveal at 15s if onLoad never fires.
 */
export default function SplineScene({ className = '', onReady }: Props) {
  const [revealed, setRevealed] = useState(false)
  const notified = useRef(false)
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null)
  const appRef = useRef<SplineApp | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const reveal = () => {
    setRevealed(true)
    if (!notified.current) {
      notified.current = true
      onReady?.()
    }
  }

  const handleLoad = (app: SplineApp) => {
    appRef.current = app
    reveal()
  }

  useEffect(() => {
    failsafe.current = setTimeout(reveal, 15000)
    return () => {
      if (failsafe.current) clearTimeout(failsafe.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Pause rendering when the hero scrolls out of view, resume when back.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        const app = appRef.current
        if (!app) return
        if (entry.isIntersecting) app.play?.()
        else app.stop?.()
      },
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={`relative bg-black ${className}`}>
      <Spline scene={SPLINE_SCENE_URL} onLoad={handleLoad} className="!w-full !h-full" />

      {/* Black cover with the cute robot loader — fades out when the scene loads */}
      <div
        className={`absolute inset-0 bg-black flex items-center justify-center transition-opacity duration-700 ${
          revealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {!revealed && <RobotLoader />}
      </div>
    </div>
  )
}

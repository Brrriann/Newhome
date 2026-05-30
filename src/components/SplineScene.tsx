'use client'

import { useState, useEffect, useRef } from 'react'
import { SPLINE_VIEWER_URL } from '@/lib/constants'
import RobotLoader from '@/components/RobotLoader'

interface Props {
  className?: string
  /** Called once the scene is revealed (loaded or failsafe). */
  onReady?: () => void
}

/**
 * Embeds a published Spline scene via iframe (the my.spline.design viewer link).
 * - A black cover with a cute robot loader sits over the iframe during load and
 *   fades out once the scene is ready (so the green loading bg never shows).
 * - Calls onReady when revealed so the parent can stage in its own content.
 * - The cover becomes pointer-events-none after reveal so the robot can track
 *   the cursor. Failsafe reveal at 12s if onLoad never fires.
 */
export default function SplineScene({ className = '', onReady }: Props) {
  const [revealed, setRevealed] = useState(false)
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null)
  const notified = useRef(false)

  const reveal = () => {
    setRevealed(true)
    if (!notified.current) {
      notified.current = true
      onReady?.()
    }
  }

  useEffect(() => {
    // Reveal no matter what after 12s (slow connections / missed onLoad).
    failsafe.current = setTimeout(reveal, 12000)
    return () => {
      if (revealTimer.current) clearTimeout(revealTimer.current)
      if (failsafe.current) clearTimeout(failsafe.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLoad = () => {
    // onLoad fires once the scene's resources have loaded (green bg is gone by
    // then) — a short delay just smooths the cross-fade.
    if (revealTimer.current) clearTimeout(revealTimer.current)
    revealTimer.current = setTimeout(reveal, 500)
  }

  return (
    <div className={`relative bg-black ${className}`}>
      {/* Spline iframe */}
      <iframe
        src={SPLINE_VIEWER_URL}
        title="Magnate Korea 3D scene"
        onLoad={handleLoad}
        style={{ background: '#000' }}
        className="absolute inset-0 w-full h-full border-0"
        allow="autoplay; fullscreen"
      />

      {/* Black reveal cover with the cute robot loader. Fades out when ready. */}
      <div
        className={`absolute inset-0 bg-black flex items-center justify-center transition-opacity duration-1000 ${
          revealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {!revealed && <RobotLoader />}
      </div>

      {/* Cover the "Built with Spline" badge (bottom-right of the iframe). */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-14 w-44 bg-black" />
    </div>
  )
}

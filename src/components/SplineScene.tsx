'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { SPLINE_SCENE_URL } from '@/lib/constants'
import RobotLoader from '@/components/RobotLoader'

// Client-only — Spline needs the browser (canvas/WebGL).
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

interface Props {
  className?: string
  /** Called once the scene has loaded (or failsafe fires). */
  onReady?: () => void
}

/**
 * Renders the Spline robot as an in-page canvas via @splinetool/react-spline.
 * - A black cover with a cute robot loader shows until the scene loads.
 * - Lighter than the iframe viewer and keeps pointer interaction in-document,
 *   so the custom cursor tracks over the robot too.
 * - Failsafe reveal at 15s if onLoad never fires.
 */
export default function SplineScene({ className = '', onReady }: Props) {
  const [revealed, setRevealed] = useState(false)
  const notified = useRef(false)
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null)

  const reveal = () => {
    setRevealed(true)
    if (!notified.current) {
      notified.current = true
      onReady?.()
    }
  }

  useEffect(() => {
    failsafe.current = setTimeout(reveal, 15000)
    return () => {
      if (failsafe.current) clearTimeout(failsafe.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`relative bg-black ${className}`}>
      <Spline scene={SPLINE_SCENE_URL} onLoad={reveal} className="!w-full !h-full" />

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

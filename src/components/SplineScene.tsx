'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { SPLINE_VIEWER_URL } from '@/lib/constants'

interface Props {
  className?: string
}

/**
 * Embeds a published Spline scene via iframe (the my.spline.design viewer link).
 * - A fallback PNG shows until the iframe's onLoad fires, then cross-fades out.
 * - If the iframe never loads within 10s, the fallback persists silently.
 * - The iframe keeps full pointer interactivity with the 3D scene.
 */
export default function SplineScene({ className = '' }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // ref mirrors `loaded` so the timeout callback never reads a stale value
  const loadedRef = useRef(false)

  useEffect(() => {
    // If the iframe hasn't loaded after 10s, stop waiting (keep fallback).
    timerRef.current = setTimeout(() => {
      if (!loadedRef.current) setFailed(true)
    }, 10000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleLoad = () => {
    loadedRef.current = true
    setLoaded(true)
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Fallback PNG — shown until the Spline iframe loads */}
      <Image
        src="/images/robot-fallback.png"
        alt="Magnate Korea — NEXBOT"
        fill
        className={`object-contain transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
        priority
      />

      {/* Spline iframe */}
      {!failed && (
        <iframe
          src={SPLINE_VIEWER_URL}
          title="Magnate Korea 3D scene"
          onLoad={handleLoad}
          className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          allow="autoplay; fullscreen"
        />
      )}
    </div>
  )
}

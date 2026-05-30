'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { SPLINE_SCENE_URL } from '@/lib/constants'

interface Props {
  className?: string
}

export default function SplineScene({ className = '' }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // useRef to avoid stale closure in the timeout callback
  const loadedRef = useRef(false)

  const [SplineComponent, setSplineComponent] = useState<React.ComponentType<{
    scene: string
    onLoad?: () => void
    className?: string
  }> | null>(null)

  useEffect(() => {
    import('@splinetool/react-spline').then((mod) => {
      setSplineComponent(() => mod.default)
    })

    // 8-second timeout — check ref (not state) to avoid stale closure
    timerRef.current = setTimeout(() => {
      if (!loadedRef.current) setError(true)
    }, 8000)

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
      {/* Fallback PNG — shown until Spline loads or on error */}
      <Image
        src="/images/robot-fallback.png"
        alt="Magnate Korea — NEXBOT"
        fill
        className={`object-contain transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
        priority
      />

      {/* Spline scene */}
      {SplineComponent && !error && (
        <SplineComponent
          scene={SPLINE_SCENE_URL}
          onLoad={handleLoad}
          className={`w-full h-full transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}

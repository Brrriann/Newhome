'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Renders children at a fixed design width and scales them to fit (or fill) the
 * available width. Keeps dense mockups pixel-perfect at any screen size instead
 * of letting their internal grids overflow on small screens.
 */
export default function ScaleToFit({
  designWidth,
  maxScale = 1.25,
  children,
}: {
  designWidth: number
  maxScale?: number
  children: ReactNode
}) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ scale: 1, height: 0 })

  useEffect(() => {
    const o = outer.current
    const i = inner.current
    if (!o || !i) return
    const update = () => {
      const w = o.clientWidth
      const scale = Math.min(maxScale, w / designWidth)
      setDims({ scale, height: i.offsetHeight * scale })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(o)
    ro.observe(i)
    return () => ro.disconnect()
  }, [designWidth, maxScale])

  return (
    <div
      ref={outer}
      className="w-full flex justify-center"
      style={{ height: dims.height || undefined }}
    >
      <div
        ref={inner}
        style={{
          width: designWidth,
          transform: `scale(${dims.scale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  )
}

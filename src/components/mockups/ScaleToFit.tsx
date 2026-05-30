'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Renders children at a fixed design size and scales them DOWN to fit narrow
 * screens (never up). Uses an explicit design height so the reserved space is
 * always exact — no measuring, no layout feedback loops, no runaway height.
 */
export default function ScaleToFit({
  designWidth,
  designHeight,
  maxScale = 1,
  children,
}: {
  designWidth: number
  designHeight: number
  maxScale?: number
  children: ReactNode
}) {
  const outer = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const o = outer.current
    if (!o) return
    const update = () => setScale(Math.min(maxScale, o.clientWidth / designWidth))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(o)
    return () => ro.disconnect()
  }, [designWidth, maxScale])

  return (
    <div
      ref={outer}
      className="w-full flex justify-start overflow-hidden"
      style={{ height: designHeight * scale }}
    >
      <div
        className="shrink-0"
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}

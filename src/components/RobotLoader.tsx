'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Cute inline-SVG robot shown while the 3D hero scene loads.
 * - The head bobs, the antenna dot pulses, and the eyes blink occasionally.
 * - Pure SVG + Framer Motion (no external Lottie/asset).
 * - Under reduced motion it renders a calm static face.
 */
export default function RobotLoader() {
  const reduce = useReducedMotion()

  return (
    <div className="flex flex-col items-center gap-6 select-none">
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
        animate={reduce ? {} : { y: [0, -7, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        {/* Antenna */}
        <line x1="50" y1="20" x2="50" y2="10" stroke="#00E5CC" strokeWidth="2.5" strokeLinecap="round" />
        <motion.circle
          cx="50"
          cy="7"
          r="3.5"
          fill="#00E5CC"
          animate={reduce ? {} : { scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          style={{ transformOrigin: '50px 7px' }}
        />

        {/* Head */}
        <rect
          x="26"
          y="22"
          width="48"
          height="42"
          rx="13"
          fill="rgba(0,229,204,0.06)"
          stroke="#00E5CC"
          strokeWidth="2.5"
        />

        {/* Eyes (blink via scaleY) */}
        {[40, 60].map((cx) => (
          <motion.rect
            key={cx}
            x={cx - 4}
            y="38"
            width="8"
            height="10"
            rx="4"
            fill="#00E5CC"
            animate={reduce ? {} : { scaleY: [1, 1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 3.2, times: [0, 0.85, 0.9, 1], ease: 'easeInOut' }}
            style={{ transformOrigin: `${cx}px 43px` }}
          />
        ))}

        {/* Smile */}
        <path d="M42 54 Q50 60 58 54" stroke="#00E5CC" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Side ears */}
        <rect x="20" y="36" width="5" height="12" rx="2.5" fill="#00E5CC" opacity="0.7" />
        <rect x="75" y="36" width="5" height="12" rx="2.5" fill="#00E5CC" opacity="0.7" />
      </motion.svg>

      {/* Loading text with bouncing dots */}
      <div className="flex items-center gap-1.5 font-pretendard text-[#888888] text-sm">
        <span>로봇 깨우는 중</span>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="inline-block w-1 h-1 rounded-full bg-accent"
            animate={reduce ? {} : { y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Easing,
} from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SplineScene from '@/components/SplineScene'
import MagneticButton from '@/components/MagneticButton'

const EASE_OUT: Easing = 'easeOut'

/** Mask-reveal line: wipes up from behind an overflow-hidden clip once active. */
function RevealLine({
  children,
  active,
  delay = 0,
  className = '',
  style,
}: {
  children: React.ReactNode
  active: boolean
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span
        className={`block ${className}`}
        style={style}
        initial={{ y: '110%' }}
        animate={active ? { y: '0%' } : { y: '110%' }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/** Fade-up props gated on `active` — text stays hidden until the robot is ready. */
const fadeUp = (active: boolean, delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
  transition: { duration: 0.6, ease: EASE_OUT, delay },
})

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [showScroll, setShowScroll] = useState(true)
  // Text appears only after the 3D robot has loaded — the robot is the star.
  const [robotReady, setRobotReady] = useState(false)

  // Scroll progress while the hero scrolls out of view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax: text drifts up faster, Spline drifts slower → depth
  const textYRaw = useTransform(scrollYProgress, [0, 1], [0, -120])
  const splineYRaw = useTransform(scrollYProgress, [0, 1], [0, 60])
  const fadeRaw = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const textY = reduceMotion ? 0 : textYRaw
  const splineY = reduceMotion ? 0 : splineYRaw
  const contentOpacity = reduceMotion ? 1 : fadeRaw

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY <= 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black dot-grid"
    >
      {/* Spline Robot — full-width so the robot is centered and the star of the
          hero. Mobile: dimmed atmospheric background. */}
      <motion.div
        className="absolute inset-0 z-10 opacity-30 md:opacity-100"
        style={{ y: splineY }}
      >
        <SplineScene className="w-full h-full" onReady={() => setRobotReady(true)} />
      </motion.div>

      {/* Text overlay — pointer-events-none so mouse passes through to the robot.
          Interactive children opt back in with pointer-events-auto. */}
      <motion.div
        className="relative z-20 flex flex-col justify-end min-h-screen pb-20 md:pb-16 pointer-events-none"
        style={{ y: textY, opacity: contentOpacity }}
      >
        <div className="container-app">
          <div className="max-w-[440px] text-center md:text-left">

            <motion.p
              {...fadeUp(robotReady, 0)}
              className="font-inter font-medium text-accent text-[12px] tracking-[0.3em] mb-3"
            >
              MAGNATE KOREA
            </motion.p>

            <h1
              className="font-syne font-extrabold text-white leading-tight mb-1"
              style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
            >
              <RevealLine active={robotReady} delay={0.1}>Insight Connects.</RevealLine>
            </h1>

            <h1
              className="font-syne font-extrabold leading-tight mb-5"
              style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
            >
              <RevealLine
                active={robotReady}
                delay={0.25}
                style={{
                  background: 'linear-gradient(90deg, #00E5CC, #3D8BFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                We Build What Matters.
              </RevealLine>
            </h1>

            <motion.p
              {...fadeUp(robotReady, 0.5)}
              className="font-inter text-[#888888] text-base mb-1"
            >
              Digital Transformation Consulting & Development
            </motion.p>

            <motion.p
              {...fadeUp(robotReady, 0.5)}
              className="font-pretendard text-[#666666] text-sm mb-6"
            >
              소통과 인사이트로 디지털 전환을 이끕니다
            </motion.p>

            <motion.div
              {...fadeUp(robotReady, 0.65)}
              className="pointer-events-auto inline-block"
            >
              <MagneticButton
                href="#contact"
                className="inline-block border border-accent text-accent px-5 py-2.5 rounded text-sm font-medium hover:bg-accent hover:text-black transition-colors duration-200"
              >
                Get in Touch →
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator — only after the robot (and text) are in */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        animate={{
          opacity: robotReady && showScroll ? 1 : 0,
          y: robotReady && showScroll ? 0 : 8,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-[#555555]" size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}

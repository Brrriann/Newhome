'use client'

import { useEffect, useState } from 'react'
import { motion, type Easing } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SplineScene from '@/components/SplineScene'

const EASE_OUT: Easing = 'easeOut'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE_OUT, delay },
})

export default function Hero() {
  const [showScroll, setShowScroll] = useState(true)

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY <= 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-black dot-grid">
      {/* Spline Robot — desktop: right 60%, mobile: full width low opacity */}
      <div className="absolute inset-0 md:left-[40%] z-10 opacity-20 md:opacity-100">
        <SplineScene className="w-full h-full" />
      </div>

      {/* Text overlay */}
      <div className="relative z-20 flex flex-col justify-end min-h-screen pb-20 md:pb-16">
        <div className="container-app">
          <div className="max-w-[520px] text-center md:text-left">

            <motion.p
              {...fadeUp(0)}
              className="font-inter font-medium text-accent text-[13px] tracking-[0.3em] mb-4"
            >
              MAGNATE KOREA
            </motion.p>

            <motion.h1
              {...fadeUp(0.15)}
              className="font-syne font-extrabold text-white leading-tight mb-2"
              style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}
            >
              Insight Connects.
            </motion.h1>

            <motion.h1
              {...fadeUp(0.3)}
              className="font-syne font-extrabold leading-tight mb-6"
              style={{
                fontSize: 'clamp(36px, 6vw, 64px)',
                background: 'linear-gradient(90deg, #00E5CC, #3D8BFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              We Build What Matters.
            </motion.h1>

            <motion.p
              {...fadeUp(0.45)}
              className="font-inter text-[#888888] text-lg mb-2"
            >
              Digital Transformation Consulting & Development
            </motion.p>

            <motion.p
              {...fadeUp(0.45)}
              className="font-pretendard text-[#666666] text-base mb-8"
            >
              소통과 인사이트로 디지털 전환을 이끕니다
            </motion.p>

            <motion.div {...fadeUp(0.6)}>
              <a
                href="#contact"
                className="inline-block border border-accent text-accent px-6 py-3 rounded text-sm font-medium hover:bg-accent hover:text-black transition-all duration-200"
              >
                Get in Touch →
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        animate={{ opacity: showScroll ? 1 : 0, y: showScroll ? 0 : 8 }}
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

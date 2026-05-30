'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ABOUT_STATS } from '@/lib/constants'

function useCountUp(target: number, duration = 1500, active = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let current = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])

  return count
}

function StatItem({
  stat,
  active,
}: {
  stat: (typeof ABOUT_STATS)[number]
  active: boolean
}) {
  const count = useCountUp(stat.value, 1500, active)
  return (
    <div className="text-center">
      <div
        className="font-syne font-extrabold text-accent leading-none whitespace-nowrap"
        style={{ fontSize: 'clamp(36px, 3.5vw, 56px)' }}
      >
        {count}{stat.suffix}
      </div>
      <div className="font-inter text-[#888888] text-sm mt-3">{stat.labelEn}</div>
      <div className="font-pretendard text-[#666666] text-xs mt-0.5">{stat.labelKo}</div>
    </div>
  )
}

export default function About() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' })
  const textRef = useRef(null)
  const textInView = useInView(textRef, { once: true, margin: '-100px' })

  return (
    <section id="about" className="bg-black section-padding">
      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-3 gap-x-10 gap-y-4">
            {ABOUT_STATS.map((stat) => (
              <StatItem key={stat.labelEn} stat={stat} active={statsInView} />
            ))}
          </div>

          {/* Narrative */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: -20 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="font-inter font-medium text-accent text-xs tracking-[0.3em] mb-4">
              ABOUT US
            </p>
            <h2 className="font-syne font-semibold text-white text-3xl md:text-4xl leading-tight mb-6">
              We Think in Systems.<br />We Build for Humans.
            </h2>
            <p className="font-inter text-[#888888] text-base leading-[1.75] mb-4">
              Magnate Korea partners with ambitious businesses to navigate digital complexity. We combine strategic insight with technical execution to deliver transformations that last.
            </p>
            <p className="font-pretendard text-[#666666] text-base leading-[1.75]">
              마그네이트코리아는 소통과 인사이트를 바탕으로 클라이언트의 디지털 전환을 이끕니다. 전략적 사고와 기술 실행력을 결합해 지속 가능한 변화를 만들어 냅니다.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

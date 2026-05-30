'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BarChart2, RefreshCw, Code2, type LucideIcon } from 'lucide-react'
import { SERVICES } from '@/lib/constants'

const ICONS: Record<string, LucideIcon> = { BarChart2, RefreshCw, Code2 }

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = ICONS[service.icon]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      data-cursor
      className="group relative overflow-hidden bg-[#0e0e11] border border-white/10 rounded-xl p-8 hover:border-accent/40 hover:shadow-[0_0_32px_rgba(0,229,204,0.12)] hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-300"
    >
      {/* Soft accent glow that fades in on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(140px_circle_at_50%_0%,rgba(0,229,204,0.10),transparent_70%)]" />
      <div className="relative">
        {Icon && <Icon className="text-accent mb-5" size={32} />}
        <h3 className="font-syne font-semibold text-white text-xl mb-1">{service.titleEn}</h3>
        <p className="font-pretendard text-[#666666] text-sm mb-3">{service.titleKo}</p>
        <p className="font-inter text-[#888888] text-sm leading-relaxed mb-2">{service.descEn}</p>
        <p className="font-pretendard text-[#555555] text-sm leading-relaxed">{service.descKo}</p>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true })

  return (
    <section id="services" className="bg-[#0A0A0A] section-padding scroll-mt-20">
      <div className="container-app">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-syne font-semibold text-white text-3xl sm:text-4xl md:text-5xl mb-4 break-words">
            What We Do
          </h2>
          <p className="font-inter text-[#888888] text-lg">
            Transforming how businesses operate in the digital age
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

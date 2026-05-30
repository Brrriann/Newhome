'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import RagChatMockup from './mockups/RagChatMockup'
import DashboardMockup from './mockups/DashboardMockup'
import MobileMockup from './mockups/MobileMockup'
import EcommerceMockup from './mockups/EcommerceMockup'

type Item = {
  id: string
  tag: string
  titleEn: string
  titleKo: string
  desc: string
  features: string[]
  mockup: ReactNode
}

const ITEMS: Item[] = [
  {
    id: 'rag',
    tag: 'AI TRANSFORMATION · AX',
    titleEn: 'RAG Knowledge Assistant',
    titleKo: 'RAG 기반 지식 어시스턴트',
    desc: '사내 문서를 학습한 검색증강생성(RAG) 챗봇으로 정확한 답변과 출처를 제공합니다. 환각 없이, 근거와 함께 답하는 AI를 구축합니다.',
    features: ['문서 검색 · 출처 인용', '멀티턴 대화 & 컨텍스트', '사내 데이터 보안 격리'],
    mockup: <RagChatMockup />,
  },
  {
    id: 'dashboard',
    tag: 'DIGITAL TRANSFORMATION · DX',
    titleEn: 'Data Dashboard & Admin',
    titleKo: '데이터 대시보드 & 어드민',
    desc: '흩어진 데이터를 한 곳에서. 실시간 지표와 관리 도구로 의사결정을 가속하고, 수작업을 자동화된 워크플로우로 전환합니다.',
    features: ['실시간 차트 & 리포트', '역할 기반 접근 제어', '자동화 워크플로우'],
    mockup: <DashboardMockup />,
  },
  {
    id: 'mobile',
    tag: 'MOBILE',
    titleEn: 'Cross-platform App',
    titleKo: '크로스플랫폼 모바일 앱',
    desc: 'iOS와 Android를 한 번에. 네이티브급 성능과 매끄러운 경험으로 사용자가 머무는 앱을 만듭니다.',
    features: ['푸시 알림 & 딥링크', '오프라인 지원', '생체 인증 보안'],
    mockup: <MobileMockup />,
  },
  {
    id: 'commerce',
    tag: 'WEB · COMMERCE',
    titleEn: 'E-commerce & Landing',
    titleKo: '이커머스 & 랜딩',
    desc: '전환을 위해 설계된 빠르고 감각적인 스토어와 랜딩 페이지. 결제부터 분석까지 매출로 이어지는 흐름을 완성합니다.',
    features: ['결제 · 정기구독 연동', 'SEO & 성능 최적화', 'A/B 테스트'],
    mockup: <EcommerceMockup />,
  },
]

function ShowcaseRow({ item, index }: { item: Item; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const flipped = index % 2 === 1

  return (
    <div
      ref={ref}
      className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start py-16 lg:py-28"
    >
      {/* Mockup — sticks while the text scrolls past on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`lg:sticky lg:top-28 ${flipped ? 'lg:order-2' : ''}`}
      >
        {item.mockup}
      </motion.div>

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className={`flex flex-col justify-center lg:min-h-[60vh] ${
          flipped ? 'lg:order-1' : ''
        }`}
      >
        <span className="font-inter font-medium text-accent text-[11px] tracking-[0.25em] mb-4">
          {item.tag}
        </span>
        <h3 className="font-syne font-bold text-white text-3xl md:text-4xl mb-1">
          {item.titleEn}
        </h3>
        <p className="font-pretendard text-[#777] text-base mb-5">{item.titleKo}</p>
        <p className="font-pretendard text-[#999] text-base leading-[1.8] mb-7 max-w-md">
          {item.desc}
        </p>
        <ul className="flex flex-col gap-3">
          {item.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-3 font-pretendard text-[#cfcfcf] text-sm"
            >
              <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                <Check size={12} className="text-accent" />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export default function Showcase() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section id="work" className="bg-[#050506] section-padding">
      <div className="container-app">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="font-inter font-medium text-accent text-[12px] tracking-[0.3em]">
            WHAT WE BUILD
          </span>
          <h2 className="font-syne font-semibold text-white text-4xl md:text-5xl mt-4 mb-4">
            From Insight to Product
          </h2>
          <p className="font-pretendard text-[#888] text-lg max-w-2xl mx-auto">
            AI 전환(AX)부터 디지털 전환(DX)까지 — 아이디어를 실제 작동하는
            제품으로 만듭니다.
          </p>
        </motion.div>

        <div className="divide-y divide-white/5">
          {ITEMS.map((item, i) => (
            <ShowcaseRow key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

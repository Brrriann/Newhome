'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import ScaleToFit from './mockups/ScaleToFit'
import RagChatMockup from './mockups/RagChatMockup'
import DashboardMockup from './mockups/DashboardMockup'
import AttendanceMockup from './mockups/AttendanceMockup'
import MonitoringMockup from './mockups/MonitoringMockup'

type Item = {
  id: string
  tag: string
  titleEn: string
  titleKo: string
  desc: string
  features: string[]
  mockup: ReactNode
  designWidth: number
  designHeight: number
  maxScale: number
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
    designWidth: 460,
    designHeight: 416,
    maxScale: 1.5,
  },
  {
    id: 'dashboard',
    tag: 'DIGITAL TRANSFORMATION · DX',
    titleEn: 'Data Dashboard & Admin',
    titleKo: '데이터 대시보드 & 어드민',
    desc: '흩어진 데이터를 한 곳에서. 실시간 지표와 관리 도구로 의사결정을 가속하고, 수작업을 자동화된 워크플로우로 전환합니다.',
    features: ['실시간 차트 & 리포트', '역할 기반 접근 제어', '자동화 워크플로우'],
    mockup: <DashboardMockup />,
    designWidth: 460,
    designHeight: 416,
    maxScale: 1.5,
  },
  {
    id: 'attendance',
    tag: 'MOBILE · HR',
    titleEn: 'Attendance & Check-in App',
    titleKo: '근태관리 · 출퇴근 인증 앱',
    desc: 'GPS 위치와 생체 인증으로 정확한 출퇴근을 기록하고, 근태 데이터를 실시간으로 집계합니다. 수기 관리에서 벗어나 인사 업무를 자동화합니다.',
    features: ['GPS 위치 기반 인증', '얼굴 · 지문 생체 인증', '실시간 근태 집계 & 리포트'],
    mockup: <AttendanceMockup />,
    designWidth: 252,
    designHeight: 514,
    maxScale: 1.1,
  },
  {
    id: 'monitoring',
    tag: 'OPERATIONS · IoT',
    titleEn: 'Real-time Monitoring',
    titleKo: '관제 · 모니터링 대시보드',
    desc: '설비·서버·IoT 상태를 실시간으로 감시하고 이상을 즉시 감지·알림합니다. 장애를 예방하고 운영 데이터를 한 화면에 모아 대응 속도를 높입니다.',
    features: ['실시간 지표 감시', '이상 감지 & 자동 알림', '장애 이력 분석'],
    mockup: <MonitoringMockup />,
    designWidth: 460,
    designHeight: 416,
    maxScale: 1.5,
  },
]

function ShowcaseRow({ item, index }: { item: Item; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const flipped = index % 2 === 1

  return (
    <div
      ref={ref}
      className={`grid gap-10 lg:gap-20 items-center py-12 lg:py-20 ${
        flipped ? 'lg:grid-cols-[1fr_1.3fr]' : 'lg:grid-cols-[1.3fr_1fr]'
      }`}
    >
      {/* Mockup — min-w-0 lets the column shrink below the mockup's design width */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`min-w-0 ${flipped ? 'lg:order-2' : ''}`}
      >
        <ScaleToFit designWidth={item.designWidth} designHeight={item.designHeight} maxScale={item.maxScale}>
          {item.mockup}
        </ScaleToFit>
      </motion.div>

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className={`flex flex-col justify-center min-w-0 ${flipped ? 'lg:order-1' : ''}`}
      >
        <span className="font-inter font-medium text-accent text-[11px] tracking-[0.25em] mb-4">
          {item.tag}
        </span>
        <h3 className="font-syne font-bold text-white text-2xl sm:text-3xl md:text-4xl mb-1 break-words">
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
    <section id="work" className="bg-[#050506] section-padding scroll-mt-20">
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
          <h2 className="font-syne font-semibold text-white text-3xl sm:text-4xl md:text-5xl mt-4 mb-4 break-words">
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

import { PhoneFrame } from './Frames'

/** Cross-platform mobile app screen. */
export default function MobileMockup() {
  return (
    <PhoneFrame>
      <div className="h-full flex flex-col font-inter text-[11px] pt-8">
        {/* Header */}
        <div className="px-4 pb-3">
          <div className="text-[#666] text-[10px]">안녕하세요 👋</div>
          <div className="text-white font-syne font-bold text-base">대시보드</div>
        </div>

        {/* Balance card */}
        <div className="mx-4 rounded-2xl bg-gradient-to-br from-accent/20 to-[#3D8BFF]/10 border border-accent/20 p-4">
          <div className="text-[#aaa] text-[10px]">총 자산</div>
          <div className="text-white font-syne font-extrabold text-2xl mt-1">
            ₩12,480,000
          </div>
          <div className="text-accent text-[10px] mt-1">+₩320,000 이번 달</div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-2 px-4 mt-4">
          {['송금', '결제', '내역', '더보기'].map((a) => (
            <div key={a} className="flex flex-col items-center gap-1.5">
              <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-accent">
                ●
              </div>
              <span className="text-[#999] text-[9px]">{a}</span>
            </div>
          ))}
        </div>

        {/* List */}
        <div className="px-4 mt-4 flex-1">
          <div className="text-[#666] text-[10px] mb-2">최근 거래</div>
          <div className="flex flex-col gap-2">
            {[
              { n: '스타벅스', t: '오늘', a: '-₩5,600' },
              { n: '급여 입금', t: '어제', a: '+₩3,200,000' },
              { n: '넷플릭스', t: '3일 전', a: '-₩17,000' },
            ].map((r) => (
              <div
                key={r.n}
                className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/5 p-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/20" />
                <div className="flex-1">
                  <div className="text-white">{r.n}</div>
                  <div className="text-[#666] text-[9px]">{r.t}</div>
                </div>
                <div
                  className={r.a.startsWith('+') ? 'text-accent' : 'text-[#ccc]'}
                >
                  {r.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex justify-around items-center h-12 border-t border-white/5 bg-black/40">
          {['홈', '카드', '송금', '내정보'].map((n, i) => (
            <span key={n} className={i === 0 ? 'text-accent' : 'text-[#555]'}>
              {n}
            </span>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}

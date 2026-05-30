import { PhoneFrame } from './Frames'

/** Attendance / commute check-in app with GPS + biometric verification. */
export default function AttendanceMockup() {
  return (
    <PhoneFrame>
      <div className="h-full flex flex-col font-inter text-[11px] pt-8">
        {/* Header */}
        <div className="px-4 pb-3">
          <div className="text-[#666] text-[10px]">2026년 5월 30일 (금)</div>
          <div className="text-white font-syne font-bold text-base">
            안녕하세요, 김현수님
          </div>
        </div>

        {/* Check-in card */}
        <div className="mx-4 rounded-2xl bg-gradient-to-br from-accent/20 to-[#3D8BFF]/10 border border-accent/20 p-4 text-center">
          <div className="text-[#aaa] text-[10px]">현재 시각</div>
          <div className="text-white font-syne font-extrabold text-[26px] leading-tight tracking-tight tabular-nums mt-0.5">
            09:02:14
          </div>

          <div className="mt-3 rounded-xl bg-black/40 border border-accent/30 py-2.5 text-accent font-medium">
            ✓ 출근 인증 완료
          </div>

          <div className="flex justify-center gap-3 mt-3 text-[9px]">
            <span className="flex items-center gap-1 text-[#bbb]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> GPS 본사
            </span>
            <span className="flex items-center gap-1 text-[#bbb]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> 얼굴 인증
            </span>
          </div>
        </div>

        {/* Today summary */}
        <div className="grid grid-cols-3 gap-2 px-4 mt-4">
          {[
            { l: '출근', v: '09:02' },
            { l: '예상 퇴근', v: '18:00' },
            { l: '근무', v: '0h 12m' },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-xl bg-white/[0.04] border border-white/10 p-2 text-center"
            >
              <div className="text-[#666] text-[9px]">{s.l}</div>
              <div className="text-white font-syne font-bold text-sm mt-0.5 tabular-nums">
                {s.v}
              </div>
            </div>
          ))}
        </div>

        {/* Weekly hours */}
        <div className="px-4 mt-4 flex-1">
          <div className="text-[#666] text-[10px] mb-2">이번 주 근무</div>
          <div className="flex items-end justify-between gap-2 h-20 rounded-xl bg-white/[0.02] border border-white/10 p-3">
            {[
              { d: '월', h: 80 },
              { d: '화', h: 92 },
              { d: '수', h: 76 },
              { d: '목', h: 88 },
              { d: '금', h: 18 },
            ].map((b, i) => (
              <div key={b.d} className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full flex items-end h-12">
                  <div
                    className={`w-full rounded-sm ${
                      i === 4
                        ? 'bg-accent'
                        : 'bg-gradient-to-t from-accent/30 to-accent/70'
                    }`}
                    style={{ height: `${b.h}%` }}
                  />
                </div>
                <span className="text-[#777] text-[9px]">{b.d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex justify-around items-center h-12 border-t border-white/5 bg-black/40">
          {['홈', '근태', '일정', '내정보'].map((n, i) => (
            <span key={n} className={i === 0 ? 'text-accent' : 'text-[#555]'}>
              {n}
            </span>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}

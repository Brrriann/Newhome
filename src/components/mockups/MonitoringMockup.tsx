import { BrowserFrame } from './Frames'

/** Real-time operations / IoT monitoring (control center) dashboard. */
export default function MonitoringMockup() {
  const sensors = [
    { n: '라인 A · 압축기', s: 'ok' },
    { n: '라인 B · 컨베이어', s: 'ok' },
    { n: '냉각 시스템 #2', s: 'warn' },
    { n: '전력 패널 P-04', s: 'ok' },
    { n: '센서 게이트웨이', s: 'crit' },
  ]
  const color = (s: string) =>
    s === 'ok' ? 'bg-green-400' : s === 'warn' ? 'bg-amber-400' : 'bg-red-500'

  // Area-chart points (0..100 over 11 samples)
  const pts = [38, 44, 40, 52, 48, 60, 55, 72, 64, 80, 70]
  const w = 260
  const h = 70
  const line = pts
    .map((p, i) => `${(i / (pts.length - 1)) * w},${h - (p / 100) * h}`)
    .join(' ')

  return (
    <BrowserFrame url="ops.magnatekorea.com">
      <div className="h-[380px] p-3 font-inter text-[11px] flex flex-col gap-3">
        {/* Status bar */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-white font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            관제 센터 · Real-time
          </span>
          <span className="text-[#888] flex gap-2">
            <span className="text-green-400">정상 12</span>
            <span className="text-amber-400">경고 2</span>
            <span className="text-red-500">위험 1</span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 flex-1">
          {/* Sensor list */}
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2 flex flex-col gap-1.5">
            <div className="text-[#666] text-[9px] uppercase tracking-wider mb-0.5">
              설비 상태
            </div>
            {sensors.map((s) => (
              <div key={s.n} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${color(s.s)}`} />
                <span className="text-[#cfcfcf] truncate">{s.n}</span>
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="col-span-2 flex flex-col gap-3">
            {/* Metric cards */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { l: 'CPU', v: '62%' },
                { l: '온도', v: '41°C' },
                { l: '처리량', v: '1.2k/s' },
              ].map((c) => (
                <div
                  key={c.l}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-2 min-w-0 overflow-hidden"
                >
                  <div className="text-[#666] text-[9px] truncate">{c.l}</div>
                  <div className="text-white font-syne font-bold text-[13px] leading-tight mt-0.5 tabular-nums whitespace-nowrap">
                    {c.v}
                  </div>
                </div>
              ))}
            </div>

            {/* Area chart */}
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2 flex-1">
              <div className="text-[#666] text-[9px] mb-1">처리량 (1h)</div>
              <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[70px]">
                <defs>
                  <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5CC" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#00E5CC" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points={`0,${h} ${line} ${w},${h}`} fill="url(#areaFill)" />
                <polyline
                  points={line}
                  fill="none"
                  stroke="#00E5CC"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Alert */}
            <div className="rounded-lg border border-red-500/30 bg-red-500/[0.06] px-2.5 py-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-red-300">센서 게이트웨이 응답 없음</span>
              <span className="ml-auto text-[#777] text-[9px]">방금</span>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

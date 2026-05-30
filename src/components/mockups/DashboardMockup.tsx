import { BrowserFrame } from './Frames'

/** SaaS analytics dashboard with sidebar, stat cards, chart, and table. */
export default function DashboardMockup() {
  const bars = [40, 62, 48, 78, 56, 88, 70, 95, 64, 82, 58, 90]
  return (
    <BrowserFrame url="dashboard.magnatekorea.com">
      <div className="flex h-[380px] font-inter text-[11px]">
        {/* Sidebar */}
        <div className="w-32 border-r border-white/5 p-3 flex flex-col gap-1 bg-black/30">
          <div className="font-syne font-bold text-white text-xs mb-3 tracking-wide">
            MAGNATE
          </div>
          {['Overview', 'Analytics', 'Customers', 'Revenue', 'Settings'].map(
            (m, i) => (
              <div
                key={m}
                className={`px-2 py-1.5 rounded-md ${
                  i === 1
                    ? 'bg-accent/15 text-accent border border-accent/20'
                    : 'text-[#777]'
                }`}
              >
                {m}
              </div>
            ),
          )}
        </div>

        {/* Main */}
        <div className="flex-1 p-4 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-medium">Analytics</span>
            <span className="text-[#666] border border-white/10 rounded px-2 py-0.5">
              Last 30 days
            </span>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { l: 'Revenue', v: '₩48.2M', d: '+12.4%' },
              { l: 'Users', v: '8,914', d: '+5.1%' },
              { l: 'Conversion', v: '3.8%', d: '+0.6%' },
            ].map((c) => (
              <div
                key={c.l}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-2"
              >
                <div className="text-[#666] text-[9px]">{c.l}</div>
                <div className="text-white font-syne font-bold text-sm mt-0.5">
                  {c.v}
                </div>
                <div className="text-accent text-[9px]">{c.d}</div>
              </div>
            ))}
          </div>

          {/* Chart — fills remaining height */}
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 flex-1 flex flex-col">
            <div className="text-[#666] text-[9px] mb-2">매출 추이</div>
            <div className="flex items-end gap-1.5 flex-1">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-accent/30 to-accent/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

import type { ReactNode } from 'react'

/** Browser window chrome wrapping mockup content. */
export function BrowserFrame({
  url = 'app.magnatekorea.com',
  children,
}: {
  url?: string
  children: ReactNode
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0f] shadow-[0_14px_36px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-2 px-4 h-9 bg-[#161618] border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 h-5 rounded bg-black/50 text-[10px] text-[#666] flex items-center px-3 font-inter">
          {url}
        </div>
      </div>
      <div className="bg-[#0a0a0c]">{children}</div>
    </div>
  )
}

/** Phone frame wrapping mobile mockup content. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-[252px] rounded-[2.4rem] border-[7px] border-[#1a1a1d] bg-black overflow-hidden shadow-[0_14px_36px_rgba(0,0,0,0.5)]">
      <div className="relative">
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-[#1a1a1d] z-10" />
        <div className="h-[500px] bg-[#0a0a0c] overflow-hidden">{children}</div>
      </div>
    </div>
  )
}

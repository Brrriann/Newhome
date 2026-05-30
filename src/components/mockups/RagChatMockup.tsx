import { BrowserFrame } from './Frames'

/** RAG-powered AI assistant: chat with retrieved source citations. */
export default function RagChatMockup() {
  return (
    <BrowserFrame url="assistant.magnatekorea.com">
      <div className="grid grid-cols-3 h-[380px] font-inter text-[11px]">
        {/* Chat column */}
        <div className="col-span-2 flex flex-col border-r border-white/5">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <span className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-[10px] font-bold">
              AI
            </span>
            <span className="text-white font-medium">Knowledge Assistant</span>
            <span className="ml-auto flex items-center gap-1 text-[#666]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> RAG
            </span>
          </div>

          <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
            {/* User msg */}
            <div className="self-end max-w-[80%] rounded-lg rounded-br-sm bg-accent/15 border border-accent/20 px-3 py-2 text-white">
              2024년 환불 정책이 어떻게 되나요?
            </div>
            {/* AI msg */}
            <div className="self-start max-w-[88%] rounded-lg rounded-bl-sm bg-white/[0.04] border border-white/10 px-3 py-2 text-[#cfcfcf] leading-relaxed">
              구매일로부터 14일 이내 미개봉 제품은 전액 환불됩니다. 디지털
              상품은 다운로드 전까지 환불 가능합니다.
              <span className="text-accent"> [1][2]</span>
            </div>
            {/* typing */}
            <div className="self-start flex gap-1 px-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse [animation-delay:300ms]" />
            </div>
          </div>

          <div className="m-3 flex items-center gap-2 rounded-lg bg-black/50 border border-white/10 px-3 py-2 text-[#555]">
            메시지를 입력하세요…
            <span className="ml-auto text-accent">↑</span>
          </div>
        </div>

        {/* Sources column */}
        <div className="p-3 flex flex-col gap-2 bg-black/30">
          <div className="text-[#666] uppercase tracking-wider text-[9px] mb-1">
            검색된 출처
          </div>
          {[
            { t: '환불정책_2024.pdf', p: 'p.3' },
            { t: '이용약관.docx', p: '§7' },
            { t: 'FAQ_고객지원.md', p: '#refund' },
          ].map((s, i) => (
            <div
              key={s.t}
              className="rounded-md border border-white/10 bg-white/[0.03] p-2"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-accent text-[9px] font-bold">[{i + 1}]</span>
                <span className="text-white truncate">{s.t}</span>
              </div>
              <div className="text-[#666] mt-1">{s.p} · 92% match</div>
              <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-accent/70"
                  style={{ width: `${92 - i * 14}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}

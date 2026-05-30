export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container-app flex flex-col items-center text-center gap-3">
        <span className="font-syne font-bold text-white text-base tracking-wide">
          MAGNATE KOREA
        </span>
        <p className="font-inter text-[#888888] text-sm">
          Insight Connects. We Build What Matters.
        </p>
        <a
          href="/privacy"
          className="font-inter text-[#555555] text-xs hover:text-accent transition-colors mt-2"
        >
          개인정보처리방침
        </a>
      </div>
    </footer>
  )
}

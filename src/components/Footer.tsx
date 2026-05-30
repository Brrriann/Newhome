import { ExternalLink } from 'lucide-react'
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants'

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  LinkedIn: ExternalLink,
  GitHub: ExternalLink,
}

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <span className="font-syne font-bold text-white text-base tracking-wide block mb-2">
              MAGNATE KOREA
            </span>
            <p className="font-inter text-[#888888] text-sm">
              Insight Connects. We Build What Matters.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-center">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}
                className="font-inter text-[#888888] text-sm hover:text-accent transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex gap-4 md:justify-end">
            {SOCIAL_LINKS.map((social) => {
              const Icon = SOCIAL_ICONS[social.platform]
              return Icon ? (
                <a key={social.platform} href={social.href} target="_blank" rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="text-[#888888] hover:text-white transition-colors">
                  <Icon size={20} />
                </a>
              ) : null
            })}
          </div>
        </div>
        <div className="border-t border-white/5 mt-8 pt-6 text-center">
          <p className="font-inter text-[#555555] text-xs">
            © 2026 Magnate Korea. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

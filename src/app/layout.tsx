import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Magnate Korea — Digital Transformation Consulting',
  description:
    'Magnate Korea partners with businesses to navigate digital transformation. Strategy consulting and custom development. Insight Connects. We Build What Matters.',
  openGraph: {
    title: 'Magnate Korea',
    description: 'Insight Connects. We Build What Matters.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="antialiased">
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}

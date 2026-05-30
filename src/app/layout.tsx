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
  metadataBase: new URL('https://newhome-dg3.pages.dev'),
  title: 'Magnate Korea — Digital Transformation Consulting',
  description:
    'Magnate Korea partners with businesses to navigate digital transformation. Strategy consulting and custom development. Insight Connects. We Build What Matters.',
  openGraph: {
    title: 'Magnate Korea',
    description: 'Insight Connects. We Build What Matters.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      {/* Warm up connections to Spline's CDNs so the 3D scene starts sooner */}
      <link rel="preconnect" href="https://my.spline.design" crossOrigin="" />
      <link rel="preconnect" href="https://prod.spline.design" crossOrigin="" />
      <link rel="dns-prefetch" href="https://my.spline.design" />
      <link rel="dns-prefetch" href="https://prod.spline.design" />
      <body className="antialiased">
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}

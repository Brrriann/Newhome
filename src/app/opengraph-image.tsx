import { ImageResponse } from 'next/og'

// Required for `output: export` — prerender the image at build time.
export const dynamic = 'force-static'

export const alt = 'Magnate Korea — Insight Connects. We Build What Matters.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#000000',
          padding: '72px',
          position: 'relative',
        }}
      >
        {/* accent glow */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background:
              'radial-gradient(circle, rgba(0,229,204,0.22), rgba(0,0,0,0))',
            display: 'flex',
          }}
        />

        {/* top: wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#0A0A0A',
              border: '2px solid #00E5CC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00E5CC',
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            M
          </div>
          <div
            style={{
              color: '#ffffff',
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 4,
            }}
          >
            MAGNATE KOREA
          </div>
        </div>

        {/* center: headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#00E5CC',
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 6,
              marginBottom: 20,
            }}
          >
            DIGITAL TRANSFORMATION · AX · DX
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: '#ffffff',
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            <span>Insight Connects.</span>
            <span
              style={{
                background: 'linear-gradient(90deg, #00E5CC, #3D8BFF)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              We Build What Matters.
            </span>
          </div>
        </div>

        {/* bottom: tagline */}
        <div style={{ color: '#888888', fontSize: 26, display: 'flex' }}>
          AI & Digital Transformation Consulting · Development
        </div>
      </div>
    ),
    { ...size },
  )
}

import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Patiya UI - React & Tailwind CSS Component Library'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -2, color: '#60a5fa' }}>
          Patiya UI
        </div>
        <div style={{ fontSize: 36, opacity: 0.9, marginTop: 24, fontWeight: 500 }}>
          Free React & Tailwind CSS Component Library
        </div>
        <div style={{ display: 'flex', gap: '24px', marginTop: 48 }}>
          <div style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.1)', borderRadius: 100, fontSize: 24 }}>50+ Components</div>
          <div style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.1)', borderRadius: 100, fontSize: 24 }}>Dark Mode</div>
          <div style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.1)', borderRadius: 100, fontSize: 24 }}>Fully Customizable</div>
        </div>
      </div>
    ),
    { ...size }
  )
}

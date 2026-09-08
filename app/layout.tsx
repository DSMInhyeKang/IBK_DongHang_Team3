import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IBK B-RETAIL · B-F&B | 사장님의 사업비, 업종에 맞게 더 크게',
  description:
    'IBK기업은행 개인사업자 특화카드 B-RETAIL·B-F&B. 사업영역 2% 적립, 업종별 특화 혜택, 월 최대 20만P. 내 사업비를 입력해 예상 적립P를 직접 확인해 보세요.',
  generator: 'v0.app',
  openGraph: {
    title: 'IBK B-RETAIL · B-F&B 개인사업자 특화카드',
    description:
      '사업영역 2% 적립 · 업종별 특화 혜택 · 월 최대 20만P. 내 업종에 맞는 카드를 확인하세요.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#4b6ef5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="light bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

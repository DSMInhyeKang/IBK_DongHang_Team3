'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { CARDS, type CardId } from '@/lib/card-data'

export function StickyCta({ selectedCard }: { selectedCard: CardId }) {
  const [visible, setVisible] = useState(false)
  const card = CARDS[selectedCard]
  const other = CARDS[selectedCard === 'retail' ? 'fnb' : 'retail']

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 pb-4">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/95 p-3 shadow-2xl backdrop-blur">
          <p className="ml-2 hidden text-sm font-bold text-ink sm:block">
            선택하신 <span className={card.accentText}>{card.name}</span>,
            지금 신청하세요
          </p>
          <div className="flex flex-1 gap-2 sm:flex-initial">
            <a
              href={card.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex flex-1 items-center justify-center gap-1 rounded-full px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 sm:flex-initial ${card.accentBg}`}
            >
              {card.name} 신청하기
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={other.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border px-4 py-3 text-sm font-bold text-muted-foreground transition-colors hover:text-ink"
            >
              {other.name}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

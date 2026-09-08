'use client'

import Image from 'next/image'
import { ArrowUpRight, Check } from 'lucide-react'
import { CARDS, type CardId } from '@/lib/card-data'

const conditions = [
  '전월실적 100만원 이상',
  '사업영역 2% 적립',
  '사업영역 통합 월 최대 20만P',
  '카드별 특화 혜택 2%',
  '연회비 BC/Master 23,000원 / 25,000원',
]

function ApplyCard({ cardId }: { cardId: CardId }) {
  const card = CARDS[cardId]
  return (
    <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center transition-shadow hover:shadow-lg">
      <div className="w-52">
        <Image
          src={card.image}
          alt={`IBK ${card.name} 카드`}
          width={520}
          height={520}
          className="drop-shadow-xl"
        />
      </div>
      <p className={`mt-6 text-xl font-black ${card.accentText}`}>{card.name}</p>
      <p className="mt-1 text-sm font-medium text-muted-foreground">
        {card.industry} 사장님
      </p>
      <a
        href={card.applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 ${card.accentBg}`}
      >
        {card.name} 신청하기
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  )
}

export function ApplySection() {
  return (
    <section id="apply" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">
          06 &nbsp;카드 신청하기
        </p>
        <h2 className="mt-3 text-balance text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
          사장님의 사업에 맞는
          <br />
          IBK 카드를 만나보세요.
        </h2>
        <p className="mt-4 text-pretty text-base text-muted-foreground">
          내 사업에 맞는 카드, 지금 신청하세요.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
        <ApplyCard cardId="retail" />
        <ApplyCard cardId="fnb" />
      </div>

      <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border bg-secondary/60 p-6">
        <ul className="grid gap-3 sm:grid-cols-2">
          {conditions.map((c) => (
            <li
              key={c}
              className="flex items-center gap-2 text-sm font-medium text-secondary-foreground"
            >
              <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={3} />
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          ※ 카드 신청 시 IBK 카드 앱 카드발급 페이지로 이동합니다. 약관 및
          상품설명서는 카드발급 과정에서 확인하실 수 있습니다. 최종 노출 문구 및
          수치는 최신 상품설명서 기준으로 검수합니다.
        </p>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { CountUp } from '@/components/count-up'
import {
  CARDS,
  formatCompactWon,
  formatWon,
  getItemsForCard,
  ITEM_CAP,
  type BenefitItem,
  type CardId,
} from '@/lib/card-data'

function ChoiceCard({
  cardId,
  active,
  onSelect,
}: {
  cardId: CardId
  active: boolean
  onSelect: (id: CardId) => void
}) {
  const card = CARDS[cardId]
  return (
    <button
      type="button"
      onClick={() => onSelect(cardId)}
      aria-pressed={active}
      className={`group relative flex flex-1 flex-col items-center gap-4 rounded-3xl border-2 p-8 text-center transition-all duration-300 ${
        active
          ? `${card.accentBorder} ${card.accentBgSoft} shadow-lg`
          : 'border-border bg-card hover:border-foreground/20 hover:shadow-md'
      }`}
    >
      {active && (
        <span
          className={`absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full ${card.accentBg} text-white`}
        >
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
      )}
      <span className="text-4xl" aria-hidden="true">
        {card.tagIcon}
      </span>
      <div>
        <p className={`text-xl font-black ${active ? card.accentText : 'text-ink'}`}>
          {card.name}
        </p>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {card.industry}
        </p>
      </div>
    </button>
  )
}

function BenefitBlock({
  item,
  accentText,
  special,
}: {
  item: BenefitItem
  accentText: string
  special?: boolean
}) {
  const example = Math.min(item.example * 0.02, ITEM_CAP)
  return (
    <div
      className={`group relative flex items-center gap-3 rounded-2xl border p-4 transition-colors ${
        special
          ? 'border-point/40 bg-point/10'
          : 'border-border bg-card hover:border-foreground/15'
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          special ? 'bg-point/20 text-point-foreground' : 'bg-secondary'
        }`}
      >
        <item.icon
          className={`h-5 w-5 ${special ? 'text-point-foreground' : accentText}`}
        />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-ink">{item.label}</p>
        <p className="text-xs text-muted-foreground">
          {formatCompactWon(item.example)} 이용 시 최대 {formatWon(example)}P
        </p>
      </div>
      <span className={`text-sm font-black ${special ? 'text-point-foreground' : accentText}`}>
        2%
      </span>
    </div>
  )
}

export function IndustrySelectSection({
  selectedCard,
  onSelect,
}: {
  selectedCard: CardId
  onSelect: (id: CardId) => void
}) {
  const card = CARDS[selectedCard]
  const items = getItemsForCard(selectedCard)

  return (
    <section id="select" className="bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            02 &nbsp;내 업종 선택
          </p>
          <h2 className="mt-3 text-balance text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
            사장님은 어떤 사업을
            <br className="sm:hidden" /> 하고 계신가요?
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground">
            사장님의 사업에 맞는 카드를 선택해 보세요.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-xl gap-4">
          <ChoiceCard
            cardId="retail"
            active={selectedCard === 'retail'}
            onSelect={onSelect}
          />
          <ChoiceCard
            cardId="fnb"
            active={selectedCard === 'fnb'}
            onSelect={onSelect}
          />
        </div>

        {/* 03. 이런 사장님께 추천합니다 — 좌 카드 이미지 / 우 혜택 블록 */}
        <div
          key={selectedCard}
          className="mt-14 grid animate-in fade-in slide-in-from-bottom-4 gap-10 duration-500 lg:grid-cols-[0.9fr_1.1fr]"
        >
          {/* 좌측: 카드 이미지 */}
          <div
            className={`relative flex flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br p-8 text-white ${card.panelGradient}`}
          >
            <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
            <div className="relative">
              <p className="text-sm font-semibold text-white/70">
                이런 사장님께 추천합니다
              </p>
              <h3 className="mt-2 text-2xl font-black leading-snug">
                {card.recommendTitle}
              </h3>
              <div className="mx-auto mt-6 w-[78%] max-w-xs">
                <Image
                  src={card.image}
                  alt={`IBK ${card.name} 카드`}
                  width={520}
                  height={520}
                  className="drop-shadow-2xl"
                />
              </div>
              <p className="mt-4 text-center text-lg font-black">{card.name}</p>
            </div>
          </div>

          {/* 우측: 혜택 블록 */}
          <div className="flex h-full flex-col gap-5">
            <div className="flex-1 rounded-3xl border border-border bg-card p-6">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-bold text-muted-foreground">
                  핵심 혜택 · 사업영역
                </p>
                <p className={`text-3xl font-black ${card.accentText}`}>
                  <CountUp value={2} suffix="%" format={false} />
                </p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:gap-2.5">
                {items.map((item) => (
                  <BenefitBlock
                    key={item.id}
                    item={item}
                    accentText={card.accentText}
                    special={item.id === card.specialItem.id}
                  />
                ))}
              </div>
            </div>

            {/* 강조 영역 */}
            <div className="rounded-3xl border border-point/40 bg-point/10 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-point-foreground/70">
                특화 혜택
              </p>
              <p className="mt-2 text-2xl font-black text-ink">
                {card.specialHeadline}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.specialDesc}
              </p>
            </div>

            <p className="rounded-2xl bg-secondary px-5 py-4 text-sm font-semibold leading-relaxed text-secondary-foreground">
              {card.supportCopy}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

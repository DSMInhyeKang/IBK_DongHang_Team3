'use client'

import { useMemo, useState } from 'react'
import { CountUp } from '@/components/count-up'
import {
  CARDS,
  formatWon,
  getItemsForCard,
  itemReward,
  totalReward,
  TOTAL_CAP,
  type CardId,
} from '@/lib/card-data'

function NumberInput({
  value,
  onChange,
  accentRing,
}: {
  value: number
  onChange: (v: number) => void
  accentRing: string
}) {
  return (
    <div className="relative">
      <input
        inputMode="numeric"
        value={value ? formatWon(value) : ''}
        placeholder="0"
        onChange={(e) => {
          const digits = e.target.value.replace(/[^\d]/g, '')
          const next = digits ? Number.parseInt(digits, 10) : 0
          onChange(Math.min(next, 99_999_999))
        }}
        className={`w-full rounded-xl border border-border bg-background py-3 pl-4 pr-10 text-right text-base font-bold text-ink outline-none transition-shadow focus:ring-2 ${accentRing}`}
      />
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
        원
      </span>
    </div>
  )
}

export function SimulationSection({
  selectedCard,
  onSelect,
}: {
  selectedCard: CardId
  onSelect: (id: CardId) => void
}) {
  const card = CARDS[selectedCard]
  const items = getItemsForCard(selectedCard)

  const [amounts, setAmounts] = useState<Record<string, number>>({
    insurance: 1_000_000,
    utility: 500_000,
    telecom: 200_000,
    online: 500_000,
    hiring: 300_000,
    fuel: 500_000,
    mart: 500_000,
  })

  const setAmount = (id: string, v: number) =>
    setAmounts((prev) => ({ ...prev, [id]: v }))

  const relevantAmounts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const item of items) map[item.id] = amounts[item.id] ?? 0
    return map
  }, [items, amounts])

  const totalSpend = Object.values(relevantAmounts).reduce((a, b) => a + b, 0)
  const total = totalReward(relevantAmounts)
  const progress = Math.min((total / TOTAL_CAP) * 100, 100)

  return (
    <section id="simulation" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">
          04 &nbsp;혜택 시뮬레이션
        </p>
        <h2 className="mt-3 text-balance text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
          사장님의 사업비,
          <br />
          직접 입력해서 확인해 보세요.
        </h2>
        <p className="mt-4 text-pretty text-base text-muted-foreground">
          한 달에 실제로 사용하는 금액을 입력하면 {card.name}의 예상 적립P를
          계산해드립니다.
        </p>
      </div>

      {/* 카드 선택 토글 */}
      <div className="mt-8 inline-flex rounded-full border border-border bg-secondary p-1">
        {(['retail', 'fnb'] as CardId[]).map((id) => {
          const c = CARDS[id]
          const active = selectedCard === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                active ? `${c.accentBg} text-white` : 'text-muted-foreground'
              }`}
            >
              {c.name}
              <span className="ml-1.5 hidden font-medium opacity-70 sm:inline">
                {c.industry}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* 입력 */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <p className="text-sm font-bold text-ink">월 사용금액 입력</p>
          <div className="mt-5 space-y-4">
            {items.map((item) => {
              const special = item.id === card.specialItem.id
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_1.2fr] items-center gap-4"
                >
                  <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <item.icon
                      className={`h-4 w-4 ${special ? 'text-point-foreground' : card.accentText}`}
                    />
                    {item.label}
                    {special && (
                      <span className="rounded bg-point/20 px-1.5 py-0.5 text-[10px] font-bold text-point-foreground">
                        특화
                      </span>
                    )}
                  </label>
                  <NumberInput
                    value={relevantAmounts[item.id] ?? 0}
                    onChange={(v) => setAmount(item.id, v)}
                    accentRing={card.accentRing}
                  />
                </div>
              )
            })}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
            <span className="text-sm font-semibold text-muted-foreground">
              총 이용금액
            </span>
            <span className="text-lg font-black text-ink">
              <CountUp value={totalSpend} duration={500} />원
            </span>
          </div>
        </div>

        {/* 결과 */}
        <div
          className={`flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white sm:p-8 ${card.panelGradient}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-white/70">
              {card.name} 사장님의 예상 월 적립
            </p>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              전월실적 100만원 이상 기준
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-1">
            <CountUp
              value={total}
              duration={700}
              className="text-6xl font-black tracking-tighter text-[color:var(--point)] sm:text-7xl"
            />
            <span className="text-3xl font-black text-[color:var(--point)]">
              P
            </span>
          </div>

          {/* 항목별 적립 */}
          <div className="mt-6 space-y-2.5">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-white/70">{item.label}</span>
                <span className="font-bold">
                  <CountUp
                    value={itemReward(relevantAmounts[item.id] ?? 0)}
                    duration={500}
                  />
                  P
                </span>
              </div>
            ))}
          </div>

          {/* 비교 그래프 */}
          <div className="mt-7 border-t border-white/15 pt-6">
            <div className="mb-2 flex justify-between text-xs font-semibold">
              <span className="text-white/70">현재 예상 적립</span>
              <span>{formatWon(total)}P</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-[color:var(--point)] transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mb-2 mt-4 flex justify-between text-xs font-semibold">
              <span className="text-white/70">사업영역 월 최대 적립</span>
              <span>{formatWon(TOTAL_CAP)}P</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-full rounded-full bg-white/60" />
            </div>
          </div>

          <p className="mt-6 text-pretty text-sm font-bold leading-relaxed">
            사장님의 사업비라면, 월 최대 {formatWon(TOTAL_CAP)}P까지 적립할 수
            있습니다.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/50">
            ※ 전월실적 및 적립 대상 거래 등 카드 이용조건을 충족하고 적립한도 내에서
            적용됩니다. 실제 수치는 최신 상품설명서 기준으로 확인하세요.
          </p>
        </div>
      </div>

      {/* 카드별 최대 혜택 강조 */}
      <div className="mt-6 rounded-3xl border border-border bg-card p-6 text-center sm:p-8">
        <p className={`text-lg font-black sm:text-xl ${card.accentText}`}>
          {card.oneLiner}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          사업영역 2% 적립 + {card.specialItem.label} 2% · 사업영역 통합 월 최대{' '}
          {formatWon(TOTAL_CAP)}P
        </p>
      </div>
    </section>
  )
}

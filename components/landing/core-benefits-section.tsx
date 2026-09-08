'use client'

import { ArrowDown, Fuel, ShoppingBasket } from 'lucide-react'
import { CountUp } from '@/components/count-up'
import { COMMON_ITEMS } from '@/lib/card-data'

function RateCard({
  label,
  rate,
  highlight,
}: {
  label: string
  rate: number
  highlight?: boolean
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border p-6 ${
        highlight
          ? 'border-primary/30 bg-primary text-primary-foreground'
          : 'border-border bg-card'
      }`}
    >
      <span
        className={`text-sm font-semibold ${highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}
      >
        {label}
      </span>
      <span className="mt-6 text-5xl font-black tracking-tight">
        <CountUp value={rate} suffix="%" format={false} />
      </span>
    </div>
  )
}

export function CoreBenefitsSection() {
  return (
    <section id="benefits" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">
          01 &nbsp;핵심 혜택
        </p>
        <h2 className="mt-3 text-balance text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
          사장님의 업종에 맞는 카드라면,
          <br />
          자주 쓰는 사업비부터 달라집니다.
        </h2>
      </div>

      {/* 적립률 숫자 강조 */}
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        <RateCard label="국내 가맹점" rate={1} />
        <RateCard label="해외 가맹점" rate={2} />
        <RateCard label="사업영역" rate={2} highlight />
      </div>

      {/* 한도 안내 */}
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">전월실적 조건</p>
          <p className="mt-2 text-xl font-bold text-ink">100만원 이상</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">각 항목별 월 최대</p>
          <p className="mt-2 text-xl font-bold text-ink">
            <CountUp value={50000} />P
          </p>
        </div>
        <div className="rounded-2xl border border-point/40 bg-point/10 p-6">
          <p className="text-sm text-point-foreground/70">사업영역 통합 월 최대</p>
          <p className="mt-2 text-xl font-black text-point-foreground">
            <CountUp value={200000} />P
          </p>
        </div>
      </div>

      {/* 혜택 구조 시각화 */}
      <div className="mt-16 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="grid lg:grid-cols-[1fr_auto_1fr]">
          <div className="p-8">
            <p className="text-sm font-bold text-muted-foreground">
              공통 사업영역
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {COMMON_ITEMS.map((item) => (
                <span
                  key={item.id}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground"
                >
                  <item.icon className="h-4 w-4 text-primary" />
                  {item.label}
                </span>
              ))}
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
              <ArrowDown className="h-4 w-4" />2% 적립
            </div>
          </div>

          <div className="flex items-center justify-center border-border bg-secondary/40 px-6 py-4 lg:border-x">
            <span className="text-sm font-black text-muted-foreground">+</span>
          </div>

          <div className="p-8">
            <p className="text-sm font-bold text-muted-foreground">
              카드별 특화 혜택
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-brand-retail/25 bg-brand-retail/8 px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-bold text-brand-retail">
                  <Fuel className="h-4 w-4" />
                  B-RETAIL · 주유·충전
                </span>
                <span className="text-sm font-black text-brand-retail">2%</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-brand-fnb/25 bg-brand-fnb/8 px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-bold text-brand-fnb">
                  <ShoppingBasket className="h-4 w-4" />
                  B-F&B · 대형마트·슈퍼마켓
                </span>
                <span className="text-sm font-black text-brand-fnb">2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

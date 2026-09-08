'use client'

import Image from 'next/image'
import {
  Fuel,
  ShieldCheck,
  ShoppingBasket,
  ShoppingCart,
  Smartphone,
  Users,
  Zap,
} from 'lucide-react'
import { CountUp } from '@/components/count-up'

const expenseIcons = [
  { icon: ShieldCheck, label: '4대보험' },
  { icon: Zap, label: '전기·도시가스' },
  { icon: Smartphone, label: '이동통신' },
  { icon: ShoppingCart, label: '온라인쇼핑' },
  { icon: Users, label: '구인플랫폼' },
  { icon: Fuel, label: '주유·충전' },
  { icon: ShoppingBasket, label: '대형마트' },
]

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-br from-[#eef2ff] via-[#f4ecff] to-[#e6f7ff] text-ink"
    >
      {/* 밝고 활기찬 컬러 블롭 */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#7c8cff] opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-[#4fd0e0] opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#c79bff] opacity-25 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-ink shadow-sm backdrop-blur">
            <Image
              src="/ibk-logo.png"
              alt="IBK 기업은행"
              width={20}
              height={19}
              className="h-4 w-auto"
            />
            개인사업자 특화카드
          </div>

          <h1 className="text-balance text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            사장님의 사업비,
            <br />
            그냥 비용으로
            <br />
            끝내지 마세요.
          </h1>

          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            사업의 업종에 맞춰 혜택을 더한
            <br className="hidden sm:block" /> IBK 개인사업자 특화카드
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-brand-retail/10 px-4 py-2 text-sm font-bold text-brand-retail ring-1 ring-brand-retail/25">
              B-RETAIL
            </span>
            <span className="rounded-full bg-brand-fnb/10 px-4 py-2 text-sm font-bold text-brand-fnb ring-1 ring-brand-fnb/25">
              B-F&B
            </span>
          </div>

          <div className="mt-10 flex items-end gap-4">
            <div className="flex items-baseline gap-1">
              <CountUp
                value={2}
                suffix="%"
                className="text-7xl font-black leading-none tracking-tighter text-primary sm:text-8xl"
                format={false}
              />
            </div>
            <div className="mb-2">
              <p className="text-lg font-bold text-ink">사업영역 적립</p>
              <p className="text-sm text-muted-foreground">
                자주 쓰는 사업비부터 달라집니다
              </p>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#select"
              className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
            >
              내 업종에 맞는 카드 찾기
            </a>
            <a
              href="#simulation"
              className="rounded-full border border-primary/25 bg-white/60 px-6 py-3 text-sm font-bold text-ink backdrop-blur transition-colors hover:bg-white"
            >
              적립 혜택 계산하기
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto flex max-w-md items-center justify-center">
            <div className="relative w-[62%] -rotate-6 transition-transform duration-500 hover:-translate-y-2">
              <Image
                src="/cards/b-retail.png"
                alt="IBK B-RETAIL 카드"
                width={520}
                height={520}
                priority
                className="drop-shadow-2xl"
              />
            </div>
            <div className="relative -ml-16 w-[62%] rotate-6 transition-transform duration-500 hover:-translate-y-2">
              <Image
                src="/cards/b-fnb.png"
                alt="IBK B-F&B 카드"
                width={520}
                height={520}
                priority
                className="drop-shadow-2xl"
              />
            </div>
          </div>

          <div className="mt-24 flex flex-wrap justify-center gap-2.5">
            {expenseIcons.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-white/70 px-3 py-1.5 text-xs font-medium text-secondary-foreground shadow-sm backdrop-blur"
              >
                <Icon className="h-3.5 w-3.5 text-primary" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

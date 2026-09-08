import {
  Fuel,
  ShieldCheck,
  ShoppingBasket,
  ShoppingCart,
  Smartphone,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'

export type CardId = 'retail' | 'fnb'

export type BenefitItem = {
  id: string
  label: string
  icon: LucideIcon
  example: number
}

// 적립 규칙 (기획안 기준 — 실제 게시 전 최신 상품설명서로 검수 필요)
export const REWARD_RATE = 0.02 // 사업영역 2%
export const ITEM_CAP = 50_000 // 항목별 월 최대 적립P
export const TOTAL_CAP = 200_000 // 사업영역 통합 월 최대 적립P
export const PREV_MONTH_REQUIREMENT = 1_000_000 // 전월실적 조건

// 공통 사업영역 항목
export const COMMON_ITEMS: BenefitItem[] = [
  { id: 'insurance', label: '4대보험', icon: ShieldCheck, example: 1_000_000 },
  { id: 'utility', label: '전기·도시가스', icon: Zap, example: 500_000 },
  { id: 'telecom', label: '이동통신 요금', icon: Smartphone, example: 200_000 },
  { id: 'online', label: '온라인쇼핑', icon: ShoppingCart, example: 500_000 },
  { id: 'hiring', label: '구인플랫폼', icon: Users, example: 300_000 },
]

export type CardConfig = {
  id: CardId
  name: string
  industry: string
  tagIcon: string
  image: string
  applyUrl: string
  specialItem: BenefitItem
  recommendTitle: string
  specialHeadline: string
  specialDesc: string
  supportCopy: string
  oneLiner: string
  // 전체 문자열 리터럴로 두어 Tailwind가 감지하도록 함
  accentText: string
  accentBg: string
  accentBgSoft: string
  accentBorder: string
  accentRing: string
  heroGradient: string
  panelGradient: string
}

export const CARDS: Record<CardId, CardConfig> = {
  retail: {
    id: 'retail',
    name: 'B-RETAIL',
    industry: '도소매업',
    tagIcon: '🛍️',
    image: '/cards/b-retail.png',
    applyUrl:
      'https://cardapplication.ibk.co.kr/iner/index.do?card_prdc_id=104440',
    specialItem: {
      id: 'fuel',
      label: '주유·충전',
      icon: Fuel,
      example: 500_000,
    },
    recommendTitle: '상품을 사고, 팔고, 채우는 사장님이라면',
    specialHeadline: '주유·충전 2%',
    specialDesc: '사업장을 오가며 차량을 자주 이용하는 도소매업 사장님을 위한 특화 혜택',
    supportCopy: '매장 운영부터 이동까지, 도소매업에 필요한 사업비에 혜택을 더해보세요.',
    oneLiner: '도소매업 사장님의 사업비에 주유·충전까지 2%.',
    accentText: 'text-brand-retail',
    accentBg: 'bg-brand-retail',
    accentBgSoft: 'bg-brand-retail/8',
    accentBorder: 'border-brand-retail',
    accentRing: 'ring-brand-retail',
    heroGradient: 'from-[#0891b2] via-[#22b8cf] to-[#2f7ff0]',
    panelGradient: 'from-[#0a99b8] via-[#1ba7cf] to-[#2f6ff0]',
  },
  fnb: {
    id: 'fnb',
    name: 'B-F&B',
    industry: '음식점업',
    tagIcon: '🍽️',
    image: '/cards/b-fnb.png',
    applyUrl:
      'https://cardapplication.ibk.co.kr/iner/index.do?card_prdc_id=104439',
    specialItem: {
      id: 'mart',
      label: '대형마트·슈퍼마켓',
      icon: ShoppingBasket,
      example: 500_000,
    },
    recommendTitle: '매일 식재료를 준비하는 사장님이라면',
    specialHeadline: '대형마트·슈퍼마켓 2%',
    specialDesc: '식자재 및 매장 운영에 필요한 물품 구매가 많은 음식점업 사장님을 위한 특화 혜택',
    supportCopy: '식자재부터 매장 운영까지, 음식점업에 필요한 지출에 혜택을 더해보세요.',
    oneLiner: '음식점업 사장님의 사업비에 대형마트·슈퍼마켓까지 2%.',
    accentText: 'text-brand-fnb',
    accentBg: 'bg-brand-fnb',
    accentBgSoft: 'bg-brand-fnb/8',
    accentBorder: 'border-brand-fnb',
    accentRing: 'ring-brand-fnb',
    heroGradient: 'from-[#3b82f6] via-[#5b74f2] to-[#8a5cf0]',
    panelGradient: 'from-[#3576f5] via-[#5a6ff2] to-[#8455f0]',
  },
}

export function getItemsForCard(cardId: CardId): BenefitItem[] {
  return [...COMMON_ITEMS, CARDS[cardId].specialItem]
}

// 항목별 적립 = MIN(사용금액 × 2%, 항목한도)
export function itemReward(amount: number): number {
  return Math.min(Math.floor(amount * REWARD_RATE), ITEM_CAP)
}

// 사업영역 통합 적립 = MIN(각 항목 적립 합계, 통합한도)
export function totalReward(amounts: Record<string, number>): number {
  const sum = Object.values(amounts).reduce(
    (acc, amount) => acc + itemReward(amount || 0),
    0,
  )
  return Math.min(sum, TOTAL_CAP)
}

export function formatWon(value: number): string {
  return value.toLocaleString('ko-KR')
}

export function formatCompactWon(value: number): string {
  if (value >= 10_000) {
    return `${value / 10_000}만원`
  }
  return `${formatWon(value)}원`
}

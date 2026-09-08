'use client'

import { useEffect, useRef, useState } from 'react'

export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      options ?? { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return { ref, inView }
}

type CountUpProps = {
  value: number
  duration?: number
  decimals?: number
  suffix?: string
  className?: string
  /** true면 3자리 콤마 포맷 적용 */
  format?: boolean
}

export function CountUp({
  value,
  duration = 900,
  decimals = 0,
  suffix,
  className,
  format = true,
}: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>()
  const [display, setDisplay] = useState(0)
  const fromRef = useRef(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const from = fromRef.current
    const to = value

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(from + (to - from) * eased)
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, inView, duration])

  const rounded =
    decimals > 0 ? Number(display.toFixed(decimals)) : Math.round(display)
  const text = format ? rounded.toLocaleString('ko-KR') : String(rounded)

  return (
    <span ref={ref} className={className}>
      {text}
      {suffix}
    </span>
  )
}

'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { CARDS } from '@/lib/card-data'

export function VideoSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            05 &nbsp;카드 소개 영상
          </p>
          <h2 className="mt-3 text-balance text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
            B-RETAIL · B-F&B
            <br />
            영상으로 만나보세요.
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground">
            사장님을 위한 카드의 주요 혜택을 영상으로 쉽고 빠르게 확인해 보세요.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[#22b8cf] via-[#5b74f2] to-[#8a5cf0]">
            {playing ? (
              <video
                className="h-full w-full"
                controls
                autoPlay
                aria-label="IBK B-RETAIL·B-F&B 카드 소개 영상"
              >
                <source src="" type="video/mp4" />
                브라우저가 영상 재생을 지원하지 않습니다.
              </video>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-40">
                  <div className="w-28 -rotate-6">
                    <Image
                      src={CARDS.retail.image}
                      alt=""
                      width={320}
                      height={320}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="w-28 rotate-6">
                    <Image
                      src={CARDS.fnb.image}
                      alt=""
                      width={320}
                      height={320}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-xl transition-transform hover:scale-105">
                    <Play className="ml-1 h-6 w-6 fill-current" />
                  </span>
                  <span className="text-sm font-semibold">영상 재생하기</span>
                </button>
              </>
            )}
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 text-center">
            <p className="text-sm font-semibold text-ink">
              영상으로 확인했다면, 내 사업비로 직접 계산해 보세요.
            </p>
            <a
              href="#simulation"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-secondary"
            >
              <RotateCcw className="h-4 w-4" />
              적립 혜택 다시 계산하기
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import type { CardId } from '@/lib/card-data'
import { SiteHeader } from './site-header'
import { HeroSection } from './hero-section'
import { CoreBenefitsSection } from './core-benefits-section'
import { IndustrySelectSection } from './industry-select-section'
import { SimulationSection } from './simulation-section'
import { VideoSection } from './video-section'
import { ApplySection } from './apply-section'
import { SiteFooter } from './site-footer'
import { StickyCta } from './sticky-cta'

export function LandingPage() {
  const [selectedCard, setSelectedCard] = useState<CardId>('retail')

  const handleSelect = (id: CardId) => {
    setSelectedCard(id)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <CoreBenefitsSection />
        <IndustrySelectSection
          selectedCard={selectedCard}
          onSelect={handleSelect}
        />
        <SimulationSection
          selectedCard={selectedCard}
          onSelect={handleSelect}
        />
        <VideoSection />
        <ApplySection />
      </main>
      <SiteFooter />
      <StickyCta selectedCard={selectedCard} />
    </div>
  )
}

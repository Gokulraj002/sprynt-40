import { useState, useEffect } from 'react'
import IntroLoader from '@/components/effects/IntroLoader'
import IntroJourney from '@/components/effects/IntroJourney'
import WebglBackground from '@/components/effects/WebglBackground'
import HeroHome from '@/pages/home/sections/HeroHome'
import Approach from '@/pages/home/sections/Approach'
import EngineSection from '@/pages/home/sections/EngineSection'
import ServicesGrid from '@/pages/home/sections/ServicesGrid'
import WhyItWorks from '@/pages/home/sections/WhyItWorks'
import DeliveryArchitecture from '@/pages/home/sections/DeliveryArchitecture'
import Ticker from '@/components/shared/Ticker'
import FinalCTA from '@/components/shared/FinalCTA'
import { tickerItems, tickerHighlight } from '@/data/ticker'
import { homeFinal } from '@/data/manifesto'

export default function Home() {
  const [phase, setPhase] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('sprynt40Intro')) {
      return 'done'
    }
    return 'loader'
  })

  useEffect(() => {
    document.title = 'Sprynt40 — Growth, engineered.'
  }, [])

  return (
    <>
      {phase === 'loader' && <IntroLoader onFinish={() => setPhase('journey')} />}
      {phase === 'journey' && <IntroJourney onFinish={() => setPhase('done')} />}
      <WebglBackground />
      <HeroHome />
      <Ticker items={tickerItems} highlight={tickerHighlight} />
      <Approach />
      <EngineSection />
      <ServicesGrid />
      <WhyItWorks />
      <DeliveryArchitecture />
      <FinalCTA
        eyebrow={homeFinal.eyebrow}
        title={<>{homeFinal.titleLine1}<br /><span>{homeFinal.titleAccent}</span></>}
        body={homeFinal.body}
        actions={[homeFinal.primary, homeFinal.ghost]}
      />
    </>
  )
}

import Reveal from '@/components/ui/Reveal'
import Eyebrow from '@/components/ui/Eyebrow'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import CardsGrid from '@/components/shared/CardsGrid'
import ServiceCard from '@/components/shared/ServiceCard'
import { services } from '@/data/services'
import { homeServicesIntro } from '@/data/manifesto'

export default function ServicesGrid() {
  const intro = homeServicesIntro
  return (
    <section id="services">
      <Reveal>
        <Eyebrow>{intro.eyebrow}</Eyebrow>
        <SectionHeading>{intro.title}<br /><span className="muted">{intro.titleLine2}</span></SectionHeading>
      </Reveal>
      <CardsGrid columns={4}>
        {services.map(s => (
          <ServiceCard
            key={s.slug}
            no={s.category}
            title={s.homeSlogan}
            blurb={s.homeBlurb}
            href={`/services/${s.slug}`}
          />
        ))}
      </CardsGrid>
      <div className="actions" style={{ marginTop: 44, justifyContent: 'flex-start' }}>
        <Button to={intro.cta.to} variant="ghost">{intro.cta.label}</Button>
      </div>
    </section>
  )
}

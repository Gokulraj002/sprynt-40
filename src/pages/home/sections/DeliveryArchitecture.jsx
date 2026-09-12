import Reveal from '@/components/ui/Reveal'
import Eyebrow from '@/components/ui/Eyebrow'
import SectionHeading from '@/components/ui/SectionHeading'
import Timeline from '@/components/shared/Timeline'
import { timelineHome } from '@/data/timeline'
import { homeDelivery } from '@/data/manifesto'

export default function DeliveryArchitecture() {
  return (
    <section className="border-top" style={{ borderTop: '1px solid var(--line)' }}>
      <Reveal>
        <Eyebrow>{homeDelivery.eyebrow}</Eyebrow>
        <SectionHeading size="sm">
          {homeDelivery.title} <span className="muted">{homeDelivery.titleMuted}</span>
        </SectionHeading>
      </Reveal>
      <Reveal>
        <Timeline rows={timelineHome} />
      </Reveal>
    </section>
  )
}

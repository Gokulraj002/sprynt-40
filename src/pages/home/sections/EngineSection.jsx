import Reveal from '@/components/ui/Reveal'
import Eyebrow from '@/components/ui/Eyebrow'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import EngineNetwork from '@/components/effects/EngineNetwork'
import { homeSystem } from '@/data/manifesto'

export default function EngineSection() {
  return (
    <section id="system" className="engine">
      <div className="engine-grid">
        <div className="engine-copy">
          <Reveal>
            <Eyebrow>{homeSystem.eyebrow}</Eyebrow>
            <SectionHeading>{homeSystem.title}</SectionHeading>
            <p>{homeSystem.body}</p>
            <div className="actions" style={{ marginTop: 36 }}>
              <Button href={homeSystem.cta.to} variant="ghost">{homeSystem.cta.label}</Button>
            </div>
          </Reveal>
        </div>
        <EngineNetwork />
      </div>
    </section>
  )
}

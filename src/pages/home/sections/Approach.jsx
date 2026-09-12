import Reveal from '@/components/ui/Reveal'
import Eyebrow from '@/components/ui/Eyebrow'
import SectionHeading from '@/components/ui/SectionHeading'
import { homeApproach } from '@/data/manifesto'

function parseBody(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export default function Approach() {
  const { eyebrow, title, titleMuted, body } = homeApproach
  return (
    <section id="approach">
      <div className="manifesto">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <SectionHeading>
            {title} <span className="muted">{titleMuted}</span>
          </SectionHeading>
        </Reveal>
        <Reveal>
          <p>{parseBody(body)}</p>
        </Reveal>
      </div>
    </section>
  )
}

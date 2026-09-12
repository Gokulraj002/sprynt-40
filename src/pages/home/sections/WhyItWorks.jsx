import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHeading from '@/components/ui/SectionHeading';
import Checklist from '@/components/shared/Checklist';
import { homeWhyItWorks } from '@/data/manifesto';

export default function WhyItWorks() {
  const d = homeWhyItWorks;
  return (
    <section className="border-top" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="manifesto">
        <Reveal>
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <SectionHeading size="sm">
            {d.title} <span className="muted">{d.titleMuted}</span>
          </SectionHeading>
        </Reveal>
        <Reveal>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: '#aaa', maxWidth: 560 }}>{d.body}</p>
          <Checklist items={d.checklist} maxWidth={600} />
        </Reveal>
      </div>
    </section>
  );
}

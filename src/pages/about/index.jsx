import { useEffect } from 'react';
import PageHero from '@/components/shared/PageHero';
import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHeading from '@/components/ui/SectionHeading';
import Checklist from '@/components/shared/Checklist';
import FinalCTA from '@/components/shared/FinalCTA';
import { aboutStory, aboutBeliefs } from '@/data/manifesto';

export default function About() {
  useEffect(() => {
    document.title = 'About — Sprynt40';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>Not more marketing.<br /><span className="muted">Better machinery.</span></>}
        lead="Most businesses don't need another random list of tactics. They need one team who can look at the whole business and build a single connected system that actually moves a number."
      />

      <section className="no-pt">
        <div style={{ maxWidth: 720 }}>
          {aboutStory.map((p, i) => (
            <Reveal key={i}>
              <p
                style={{ fontSize: 20, lineHeight: 1.6, color: '#aaa', marginTop: i === 0 ? 0 : 32 }}
                dangerouslySetInnerHTML={{
                  __html: p.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff;font-weight:600">$1</strong>'),
                }}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-top" style={{ borderTop: '1px solid var(--line)' }}>
        <Reveal>
          <Eyebrow>{aboutBeliefs.eyebrow}</Eyebrow>
          <SectionHeading size="sm">Four things we hold to on every engagement.</SectionHeading>
          <Checklist items={aboutBeliefs.items} maxWidth={600} />
        </Reveal>
      </section>

      <FinalCTA
        title={<>Grow<br /><span>loud.</span></>}
        body="If a flat-price, end-to-end growth system sounds better than another rolling retainer, let's talk."
        actions={[{ label: 'Start a conversation', to: '/contact' }]}
      />
    </>
  );
}

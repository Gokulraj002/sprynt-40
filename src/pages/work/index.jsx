import { useEffect } from 'react';
import PageHero from '@/components/shared/PageHero';
import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHeading from '@/components/ui/SectionHeading';
import Timeline from '@/components/shared/Timeline';
import FinalCTA from '@/components/shared/FinalCTA';
import { timelineWork } from '@/data/timeline';

export default function Work() {
  useEffect(() => {
    document.title = 'Work — Sprynt40';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Work"
        title={<>How a project<br /><span className="muted">actually runs.</span></>}
        lead="We take a deliberate roster. Every engagement moves through the same four phases — but the plan, timelines and specific services are custom to the business we're building the system around."
      />

      <section className="no-pt">
        <Reveal><Timeline rows={timelineWork} /></Reveal>
      </section>

      <section className="border-top" style={{ borderTop: '1px solid var(--line)' }}>
        <Reveal>
          <Eyebrow>Early access</Eyebrow>
          <SectionHeading size="sm">Case studies are <span className="muted">being built right now.</span></SectionHeading>
          <p style={{ color: '#aaa', maxWidth: 640, marginTop: 24, lineHeight: 1.75 }}>Sprynt40 is in its first cohort of long-form engagements. We'd rather show you the current active work — the numbers, the dashboards, what actually moved — on a call than dress up half-finished case studies here.</p>
          <div className="actions" style={{ marginTop: 34 }}>
            <a href="/contact" className="btn primary">Ask about current work ↗</a>
            <a href="/growth-audit" className="btn ghost">Get a free growth audit ↗</a>
          </div>
        </Reveal>
      </section>

      <FinalCTA
        size="sm"
        title={<>Be the next<br /><span>one on this page.</span></>}
        body="If the business is ready to run one connected growth system for the next four months, we'd love to hear about it."
        actions={[{ label: 'Start a conversation', to: '/contact' }]}
      />
    </>
  );
}

import { useEffect } from 'react';
import PageHero from '@/components/shared/PageHero';
import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHeading from '@/components/ui/SectionHeading';
import Checklist from '@/components/shared/Checklist';
import FinalCTA from '@/components/shared/FinalCTA';

export default function Teardown() {
  useEffect(() => {
    document.title = 'Free Growth Audit — Sprynt40';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Growth Audit"
        title={<>One free look<br /><span className="muted">before you spend more.</span></>}
        lead="Send us your site, your local presence and — if you're running paid — an ad account. We'll come back with a straight-talk teardown, no obligation to work with us afterwards."
        actions={[{ label: 'Request my free audit', to: '/contact' }]}
      />

      <section className="no-pt">
        <Reveal>
          <Eyebrow>What's inside</Eyebrow>
          <Checklist
            maxWidth={620}
            items={[
              'A full pass over the current website — layout, speed, conversion friction and what the visitor is likely to actually do.',
              'Local presence and SEO check — Google Business Profile, listings, on-page basics and the gap between you and the closest competitor.',
              'A look at any live ad accounts — where budget is landing, where creative or targeting is leaking money, and what a smarter setup would look like.',
              'One clear recommendation for the highest-impact next move — not a wishlist, one thing.',
            ]}
          />
        </Reveal>
      </section>

      <section className="border-top" style={{ borderTop: '1px solid var(--line)' }}>
        <Reveal>
          <Eyebrow>No obligation</Eyebrow>
          <SectionHeading size="sm">You keep the audit <span className="muted">either way.</span></SectionHeading>
          <p style={{ color: '#aaa', maxWidth: 640, marginTop: 24, lineHeight: 1.75 }}>
            If we're a fit, we'll propose a 4-month engagement with a flat price. If we're not, you still keep the audit — it's yours to hand to your existing team, another agency, or file for later. We'd rather turn away a bad fit than take on work we can't win.
          </p>
        </Reveal>
      </section>

      <FinalCTA
        size="sm"
        title={<>Find out<br /><span>what's leaking.</span></>}
        body="About 10 minutes to request. A few days for us to work through it and send back a straight answer. No pitch on the audit itself — that's a separate conversation."
        actions={[{ label: 'Request my free audit', to: '/contact' }]}
      />
    </>
  );
}

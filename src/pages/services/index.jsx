import { useEffect } from 'react';
import PageHero from '@/components/shared/PageHero';
import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHeading from '@/components/ui/SectionHeading';
import CardsGrid from '@/components/shared/CardsGrid';
import ServiceCard from '@/components/shared/ServiceCard';
import Checklist from '@/components/shared/Checklist';
import FinalCTA from '@/components/shared/FinalCTA';
import { services } from '@/data/services';
import { homeWhyItWorks } from '@/data/manifesto';

export default function Services() {
  useEffect(() => {
    document.title = 'Services — Sprynt40';
  }, []);

  const why = homeWhyItWorks;

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>A custom path<br /><span className="muted">to qualified growth.</span></>}
        lead="No fixed tiers. We build a package tailored to what actually moves the numbers for your business — and only quote what you actually need."
        actions={[
          { label: 'Get a free growth audit', to: '/growth-audit' },
          { label: 'Build my package', to: '/contact' },
        ]}
      />

      <section className="no-pt">
        <Reveal>
          <CardsGrid columns={4}>
            {services.map((s) => (
              <ServiceCard
                key={s.slug}
                no={`${s.no} / SERVICE`}
                title={s.name}
                blurb={s.slogan}
                href={`/services/${s.slug}`}
                variant="svc"
              />
            ))}
          </CardsGrid>
        </Reveal>
      </section>

      <section className="border-top" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="manifesto">
          <Reveal>
            <Eyebrow>{why.eyebrow}</Eyebrow>
            <SectionHeading size="sm">
              {why.title} <span className="muted">{why.titleMuted}</span>
            </SectionHeading>
          </Reveal>
          <Reveal>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: '#aaa', maxWidth: 560 }}>{why.body}</p>
            <Checklist items={why.checklist} maxWidth={600} />
          </Reveal>
        </div>
      </section>

      <FinalCTA
        title={<>Grow<br /><span>loud.</span></>}
        body="Book a call. We'll audit the business first, then send a tailored 4-month plan with one flat price. No forms into the void."
        actions={[{ label: 'Start a conversation', to: '/contact' }]}
      />
    </>
  );
}

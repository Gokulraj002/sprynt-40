import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import PageHero from '@/components/shared/PageHero';
import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHeading from '@/components/ui/SectionHeading';
import Checklist from '@/components/shared/Checklist';
import NavServicePair from '@/components/shared/NavServicePair';
import FinalCTA from '@/components/shared/FinalCTA';
import { getService, getServiceNeighbors } from '@/data/services';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  useEffect(() => {
    if (service) document.title = `${service.name} — Sprynt40`;
  }, [slug, service]);

  if (!service) return <Navigate to="/services" replace />;

  const { prev, next } = getServiceNeighbors(slug);

  return (
    <>
      <PageHero
        eyebrow={`Service ${service.no} / 08`}
        title={service.name}
        lead={service.slogan}
        actions={[
          { label: `Talk about ${service.name}`, to: '/contact' },
          { label: 'All services', to: '/services' },
        ]}
      />

      <section className="no-pt">
        <Reveal>
          <p style={{ fontSize: 18, lineHeight: 1.8, color: '#ccc', maxWidth: 700 }}>
            {service.description}
          </p>
          <Checklist items={service.checklist} maxWidth={600} />
        </Reveal>
      </section>

      <section className="border-top" style={{ borderTop: '1px solid var(--line)', paddingTop: 70 }}>
        <Reveal>
          <Eyebrow>Where this fits</Eyebrow>
          <SectionHeading size="svc">
            Works best connected <span className="muted">to the rest of the system.</span>
          </SectionHeading>
          <p style={{ color: '#888', maxWidth: 620, marginTop: 22, lineHeight: 1.75 }}>
            {service.name} rarely wins alone. It compounds when paired with the other services in the Sprynt40 catalog — that's the whole point of building it as one connected system.
          </p>
        </Reveal>
        <Reveal>
          <NavServicePair prev={prev} next={next} />
        </Reveal>
      </section>

      <FinalCTA
        size="sm"
        title={<>Let's build<br /><span>the system.</span></>}
        body={`Tell us where the business is today. We'll show you exactly where ${service.name} fits into the plan — and what it costs to do properly.`}
        actions={[{ label: 'Start a conversation', to: '/contact' }]}
      />
    </>
  );
}

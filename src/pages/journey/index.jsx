import { useEffect, useState } from 'react';
import JourneyScene from '@/components/effects/JourneyScene';
import { journeyStages } from '@/data/journeyStages';

export default function Journey() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    document.title = 'Sprynt40 — Growth, engineered.';
  }, []);

  return (
    <>
      <div id="journeyPageWebgl" style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
      {journeyStages.map((s, i) => (
        <div
          key={i}
          className={`stage-caption ${stage === i ? 'show' : ''}`}
          style={{ opacity: stage === i ? 1 : 0, transition: 'opacity 1s ease' }}
        >
          <div className="kicker">{s.eyebrow}</div>
          <h1
            style={{
              fontSize: 'clamp(30px,4vw,50px)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              fontWeight: 900,
            }}
          >
            {s.headline}
          </h1>
          <p
            style={{
              marginTop: 16,
              color: '#aaa',
              fontSize: 14,
              lineHeight: 1.6,
              maxWidth: 360,
            }}
          >
            {s.subtitle}
          </p>
        </div>
      ))}
      <JourneyScene mountId="journeyPageWebgl" onStage={setStage} onFail={() => {}} />
    </>
  );
}

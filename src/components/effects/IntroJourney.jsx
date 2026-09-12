import { useEffect, useRef, useState } from 'react';
import JourneyScene from '@/components/effects/JourneyScene';
import { journeyStages } from '@/data/journeyStages';

export default function IntroJourney({ onFinish }) {
  const alreadyPlayed =
    typeof window !== 'undefined' && sessionStorage.getItem('sprynt40Intro');

  const [visible, setVisible] = useState(!alreadyPlayed);
  const [stage, setStage] = useState(0);
  const [entered, setEntered] = useState(false);

  const finishedRef = useRef(false);
  const timersRef = useRef([]);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    try {
      sessionStorage.setItem('sprynt40Intro', '1');
    } catch (e) {}

    const el = document.getElementById('journeyStage');
    if (el) el.classList.remove('show');

    const t = setTimeout(() => {
      setVisible(false);
      if (typeof onFinish === 'function') onFinish();
    }, 600);
    timersRef.current.push(t);
  };

  useEffect(() => {
    if (alreadyPlayed) {
      if (typeof onFinish === 'function') onFinish();
      return;
    }

    const showTimer = setTimeout(() => {
      const el = document.getElementById('journeyStage');
      if (el) el.classList.add('show');
      setEntered(true);
    }, 40);
    timersRef.current.push(showTimer);

    const fallback = setTimeout(finish, 10200);
    timersRef.current.push(fallback);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      const el = document.getElementById('journeyStage');
      if (el) el.classList.remove('show');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div id="journeyStage">
      <div id="journeyWebgl" />
      <button className="js-skip" onClick={finish}>
        Skip ↗
      </button>
      {journeyStages.map((s, i) => (
        <div key={i} className={`js-caption ${stage === i ? 'show' : ''}`}>
          <div className="kicker">{s.eyebrow}</div>
          <h1>{s.headline}</h1>
          <p>{s.subtitle}</p>
        </div>
      ))}
      <JourneyScene
        mountId="journeyWebgl"
        onStage={(i) => setStage(i)}
        onFail={finish}
      />
    </div>
  );
}

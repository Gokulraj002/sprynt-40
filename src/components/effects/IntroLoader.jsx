import { useEffect, useRef, useState } from 'react';
import mark from '@/assets/sprynt-mark.png';
import word from '@/assets/sprynt-word.png';

export default function IntroLoader({ onFinish }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !sessionStorage.getItem('sprynt40Intro');
  });

  const introRef = useRef(null);
  const rowRef = useRef(null);
  const markRef = useRef(null);
  const wordRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (sessionStorage.getItem('sprynt40Intro')) {
      onFinish?.();
      return;
    }

    document.body.classList.add('intro-lock');

    const timeouts = [];

    timeouts.push(setTimeout(() => {
      rowRef.current?.classList.add('show');
      wordRef.current?.classList.add('show');
    }, 150));

    timeouts.push(setTimeout(() => {
      markRef.current?.classList.add('launch');
    }, 1500));

    timeouts.push(setTimeout(() => {
      wordRef.current?.classList.add('hide-out');
    }, 1600));

    timeouts.push(setTimeout(() => {
      introRef.current?.classList.add('hide');
    }, 2200));

    timeouts.push(setTimeout(() => {
      setVisible(false);
      document.body.classList.remove('intro-lock');
      sessionStorage.setItem('sprynt40Intro', '1');
      onFinish?.();
    }, 2800));

    return () => {
      timeouts.forEach(clearTimeout);
      document.body.classList.remove('intro-lock');
    };
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div id="intro" ref={introRef}>
      <div className="intro-row" ref={rowRef}>
        <div className="intro-mark" ref={markRef}>
          <img src={mark} alt="Sprynt40" />
          <span className="trail" />
        </div>
        <img className="intro-word" src={word} alt="Sprynt40" ref={wordRef} />
      </div>
    </div>
  );
}

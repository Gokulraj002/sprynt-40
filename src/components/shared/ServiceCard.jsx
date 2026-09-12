import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function useCardTilt() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${-py * 8}deg) rotateY(${px * 10}deg) translateY(-4px)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);
  return ref;
}

export default function ServiceCard({ no, title, blurb, href, cta = 'Explore', variant = 'default' }) {
  const ref = useCardTilt();
  const inner = (
    <>
      <div className="no">{no}</div>
      <h3 className={variant === 'svc' ? 'svc' : ''}>{title}</h3>
      {blurb && <p>{blurb}</p>}
      {cta && <div className="more">{cta} ↗</div>}
    </>
  );
  if (href && href.startsWith('/')) {
    return (
      <Link to={href} className="card" ref={ref}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className="card" ref={ref}>
      {inner}
    </a>
  );
}

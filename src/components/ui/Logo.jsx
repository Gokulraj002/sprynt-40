import { Link } from 'react-router-dom';
import lockupPng from '@/assets/sprynt-lockup.png';
import markPng from '@/assets/sprynt-mark.png';

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`logo ${className}`.trim()} aria-label="Sprynt40 — Home">
      <img src={lockupPng} alt="Sprynt40 — Grow Loud!" className="logo-lockup" />
    </Link>
  );
}

export const markSrc = markPng;
export const lockupSrc = lockupPng;

import { Link } from 'react-router-dom';
import lockupPng from '@/assets/sprynt-lockup.png';
import { brand, footerColumns, footerTag } from '@/data/navigation';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <Link to="/" className="footer-brand" aria-label="Sprynt40 — Home">
            <img src={lockupPng} alt="Sprynt40 — Grow Loud!" />
          </Link>
          <p className="footer-tag">{footerTag}</p>
        </div>
        {['company', 'services', 'legal'].map((key) => {
          const col = footerColumns[key];
          return (
            <div className="footer-col" key={key}>
              <h4>{col.heading}</h4>
              {col.links.map((l) => (
                <Link key={l.to} to={l.to}>
                  {l.label}
                </Link>
              ))}
              {key === 'legal' && (
                <>
                  <h4 style={{ marginTop: 28 }}>Contact</h4>
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="footer-bottom">
        <span>{brand.copyright}</span>
        <span>{brand.system}</span>
      </div>
    </footer>
  );
}

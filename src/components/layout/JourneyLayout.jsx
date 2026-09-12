import { Outlet, Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import BackgroundLayers from './BackgroundLayers';
import { brand } from '@/data/navigation';

export default function JourneyLayout() {
  return (
    <>
      <BackgroundLayers webgl variant="dark" />
      <nav className="journey-nav">
        <Logo />
        <Link to="/" className="back">
          ← Back to site
        </Link>
      </nav>
      <div className="journey-page">
        <Outlet />
      </div>
      <div className="journey-footer">
        <span>{brand.copyright}</span>
        <span>Growth Journey</span>
      </div>
    </>
  );
}

import { NavLink, Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import { primaryNav } from '@/data/navigation';

export default function Navbar({ variant = 'default' }) {
  return (
    <nav className={`main-nav ${variant === 'secondary' ? 'secondary' : ''}`.trim()}>
      <Logo />
      <div className="links">
        {primaryNav.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'}>
            {l.label}
          </NavLink>
        ))}
      </div>
      <Link to="/contact" className="navbtn">
        Start a conversation ↗
      </Link>
    </nav>
  );
}

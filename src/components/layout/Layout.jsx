import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackgroundLayers from './BackgroundLayers';

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const vignette = isHome ? 'dark' : 'orange-top';
  const variant = isHome ? 'default' : 'secondary';
  return (
    <>
      <BackgroundLayers webgl={isHome} variant={vignette} />
      <Navbar variant={variant} />
      <Outlet />
      <Footer />
    </>
  );
}

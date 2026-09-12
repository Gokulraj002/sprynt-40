import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import JourneyLayout from '@/components/layout/JourneyLayout';
import ScrollToTop from '@/components/layout/ScrollToTop';

import Home from '@/pages/home';
import Services from '@/pages/services';
import ServiceDetail from '@/pages/services/detail';
import About from '@/pages/about';
import Contact from '@/pages/contact';
import Work from '@/pages/work';
import Teardown from '@/pages/teardown';
import Journey from '@/pages/journey';
import Privacy from '@/pages/legal/Privacy';
import Terms from '@/pages/legal/Terms';
import Refund from '@/pages/legal/Refund';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/work" element={<Work />} />
          <Route path="/growth-audit" element={<Teardown />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<Refund />} />
        </Route>
        <Route element={<JourneyLayout />}>
          <Route path="/journey" element={<Journey />} />
        </Route>
      </Routes>
    </>
  );
}

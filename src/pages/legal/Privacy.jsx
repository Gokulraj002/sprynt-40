import { useEffect } from 'react';
import LegalPage from '@/components/shared/LegalPage';
import data from '@/data/legal/privacy';

export default function Privacy() {
  useEffect(() => {
    document.title = `${data.title} — Sprynt40`;
  }, []);
  return <LegalPage data={data} />;
}

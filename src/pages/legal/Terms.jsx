import { useEffect } from 'react';
import LegalPage from '@/components/shared/LegalPage';
import data from '@/data/legal/terms';

export default function Terms() {
  useEffect(() => {
    document.title = `${data.title} — Sprynt40`;
  }, []);
  return <LegalPage data={data} />;
}

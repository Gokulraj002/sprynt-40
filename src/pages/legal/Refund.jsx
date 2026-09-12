import { useEffect } from 'react';
import LegalPage from '@/components/shared/LegalPage';
import data from '@/data/legal/refund';

export default function Refund() {
  useEffect(() => {
    document.title = `${data.title} — Sprynt40`;
  }, []);
  return <LegalPage data={data} />;
}

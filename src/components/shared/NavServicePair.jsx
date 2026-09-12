import { Link } from 'react-router-dom';
import CardsGrid from './CardsGrid';

export default function NavServicePair({ prev, next }) {
  return (
    <CardsGrid columns={2}>
      <Link to={`/services/${prev.slug}`} className="card">
        <div className="no">← {prev.no}</div>
        <h3 className="svc">{prev.name}</h3>
        <p>{prev.slogan}</p>
        <div className="more">Previous ↗</div>
      </Link>
      <Link to={`/services/${next.slug}`} className="card">
        <div className="no">{next.no} →</div>
        <h3 className="svc">{next.name}</h3>
        <p>{next.slogan}</p>
        <div className="more">Next ↗</div>
      </Link>
    </CardsGrid>
  );
}

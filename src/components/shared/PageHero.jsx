import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';

export default function PageHero({ eyebrow, title, lead, actions }) {
  return (
    <section className="page-hero">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && <h1 className="title" style={{ marginTop: 4 }}>{title}</h1>}
      {lead && <p className="lead" style={{ maxWidth: 640, marginTop: 32 }}>{lead}</p>}
      {actions && actions.length > 0 && (
        <div className="actions" style={{ marginTop: 40 }}>
          {actions.map((a, i) => (
            <Button
              key={a.label}
              to={a.to}
              href={a.href}
              variant={i === 0 ? 'primary' : 'ghost'}
            >
              {a.label}
            </Button>
          ))}
        </div>
      )}
    </section>
  );
}

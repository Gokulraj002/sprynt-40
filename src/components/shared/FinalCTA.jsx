import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';

export default function FinalCTA({ eyebrow, title, size = 'default', body, actions = [] }) {
  return (
    <section className="final">
      <div className="halo" />
      <div className="final-inner">
        {eyebrow && <Eyebrow style={{ display: 'inline-block' }}>{eyebrow}</Eyebrow>}
        <h2 className={size === 'sm' ? 'sm' : ''}>{title}</h2>
        {body && <p>{body}</p>}
        {actions.length > 0 && (
          <div className="actions" style={{ marginTop: 30, justifyContent: 'center' }}>
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
      </div>
    </section>
  );
}

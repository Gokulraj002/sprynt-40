import Eyebrow from '@/components/ui/Eyebrow';

export default function LegalPage({ data }) {
  const { title, updated, sections, disclaimer } = data;
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 0 }}>
        <Eyebrow>Legal</Eyebrow>
        <h1
          className="title"
          style={{ fontSize: 'clamp(38px, 5vw, 64px)', marginTop: 4 }}
        >
          {title}
        </h1>
        {updated && <div className="legal-updated">{updated}</div>}
      </section>
      <section className="no-pt">
        <div className="legal-body">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body && <p>{s.body}</p>}
              {s.email && (
                <p>
                  <a href={`mailto:${s.email}`}>{s.email}</a>
                </p>
              )}
              {s.list && (
                <ul>
                  {s.list.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {disclaimer && <p className="disclaimer">{disclaimer}</p>}
        </div>
      </section>
    </>
  );
}

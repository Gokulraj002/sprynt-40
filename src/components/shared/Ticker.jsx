export default function Ticker({ items, highlight }) {
  const row = (
    <>
      {items.map((it, i) => (
        <span key={`${it}-${i}`} className={it === highlight ? 'hi' : ''}>
          {it.toUpperCase()}
        </span>
      ))}
    </>
  );
  return (
    <div className="ticker">
      <div className="ticker-track">
        {row}
        {row}
      </div>
    </div>
  );
}

export default function Checklist({ items, maxWidth, className = '' }) {
  return (
    <ul className={`checklist ${className}`.trim()} style={maxWidth ? { maxWidth } : undefined}>
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  );
}

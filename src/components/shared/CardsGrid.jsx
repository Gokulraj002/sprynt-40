export default function CardsGrid({ columns = 4, children, className = '' }) {
  const cls = columns === 2 ? 'cards cols-2' : 'cards';
  return <div className={`${cls} ${className}`.trim()}>{children}</div>;
}

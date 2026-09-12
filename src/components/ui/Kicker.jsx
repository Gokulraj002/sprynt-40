export default function Kicker({ children, className = '' }) {
  return <div className={`kicker ${className}`}>{children}</div>;
}

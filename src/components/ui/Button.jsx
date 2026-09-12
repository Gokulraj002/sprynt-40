import { Link } from 'react-router-dom';

function isExternalOrHash(to) {
  return typeof to === 'string' && (to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('#'));
}

export default function Button({
  to,
  href,
  variant = 'primary',
  children,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) {
  const cls = `btn ${variant === 'primary' ? 'primary' : 'ghost'} ${className}`.trim();
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden>↗</span>
    </>
  );
  const target = href || to;
  if (target && isExternalOrHash(target)) {
    return (
      <a href={target} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} {...rest}>
      {inner}
    </button>
  );
}

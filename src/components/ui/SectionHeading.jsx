export default function SectionHeading({
  children,
  size = 'default',
  as: Tag = 'h2',
  className = '',
}) {
  const sizeCls =
    size === 'sm' ? 'sm' : size === 'xs' ? 'xs' : size === 'svc' ? 'svc' : '';
  return <Tag className={`title ${sizeCls} ${className}`.trim()}>{children}</Tag>;
}

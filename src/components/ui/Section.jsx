export default function Section({
  id,
  className = '',
  borderTop = false,
  noPt = false,
  children,
  style,
}) {
  const cls = `${borderTop ? 'border-top ' : ''}${noPt ? 'no-pt ' : ''}${className}`.trim();
  return (
    <section id={id} className={cls} style={style}>
      {children}
    </section>
  );
}

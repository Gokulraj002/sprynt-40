export default function Timeline({ rows }) {
  return (
    <div className="timeline">
      {rows.map((r) => (
        <div className="row" key={r.time}>
          <div className="time">{r.time}</div>
          <h3>{r.title}</h3>
          <p>{r.body}</p>
        </div>
      ))}
    </div>
  );
}

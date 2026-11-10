export default function Spinner({ label = "Loading…" }) {
  return (
    <div className="state" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}
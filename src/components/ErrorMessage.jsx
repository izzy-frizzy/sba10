export default function ErrorMessage({ message }) {
  return (
    <div className="state error" role="alert">
      <h2>not able to load</h2>
      <p>{message}. Check your connection and refresh the page.</p>
    </div>
  );
}
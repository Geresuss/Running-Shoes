export default function ShoeCard({ name, type, desc }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p><b>Type:</b> {type}</p>
      <p>{desc}</p>
    </div>
  );
}
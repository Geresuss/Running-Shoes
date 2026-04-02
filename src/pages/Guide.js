import ShoeCard from "../components/ShoeCard";
import Tips from "../components/Tips";

export default function Guide() {
  return (
    <div className="container">
      <h1>Shoe Selection Guide</h1>

      <ShoeCard
        name="Nike Pegasus"
        type="Neutral"
        desc="Best for normal foot runners."
      />

      <ShoeCard
        name="Asics Gel Kayano"
        type="Stability"
        desc="Best for overpronation."
      />

      <ShoeCard
        name="Brooks Ghost"
        type="Cushion"
        desc="Best for long-distance comfort."
      />

      <Tips />
    </div>
  );
}
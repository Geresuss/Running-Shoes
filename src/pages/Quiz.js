import { useState } from "react";

export default function Quiz() {
  const [type, setType] = useState("");
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState("");

  const calculate = () => {
    if (type === "over") setResult("Stability Shoes");
    else if (distance === "long") setResult("Cushion Shoes");
    else setResult("Neutral Shoes");
  };

  return (
    <div className="container">
      <h1>Shoe Quiz</h1>

      <p>Foot Type:</p>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="">Select</option>
        <option value="neutral">Neutral</option>
        <option value="over">Overpronation</option>
      </select>

      <p>Distance:</p>
      <select onChange={(e) => setDistance(e.target.value)}>
        <option value="">Select</option>
        <option value="short">Short</option>
        <option value="long">Long</option>
      </select>

      <button onClick={calculate}>Get Result</button>

      {result && <h2>Recommended: {result}</h2>}
    </div>
  );
}
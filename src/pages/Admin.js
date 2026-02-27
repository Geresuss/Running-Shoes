import { useState } from "react";

export default function Admin() {
  const [shoes, setShoes] = useState(
    JSON.parse(localStorage.getItem("shoes")) || []
  );

  const [name, setName] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  /* ---------- SAVE DATA ---------- */
  const saveData = (data) => {
    setShoes(data);
    localStorage.setItem("shoes", JSON.stringify(data));
  };

  /* ---------- CREATE ---------- */
  const addShoe = () => {
    if (!name.trim()) return;

    const newList = [...shoes, name];
    saveData(newList);
    setName("");
  };

  /* ---------- DELETE ---------- */
  const deleteShoe = (index) => {
    const newList = shoes.filter((_, i) => i !== index);
    saveData(newList);
  };

  /* ---------- EDIT START ---------- */
  const startEdit = (index) => {
    setEditingIndex(index);
    setName(shoes[index]);
  };

  /* ---------- UPDATE ---------- */
  const updateShoe = () => {
    const updated = [...shoes];
    updated[editingIndex] = name;
    saveData(updated);
    setEditingIndex(null);
    setName("");
  };

  return (
    <div className="container">
      <h1>Admin Panel — Manage Shoes</h1>

      {/* INPUT */}
      <input
        placeholder="Enter shoe name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* BUTTONS */}
      {editingIndex === null ? (
        <button onClick={addShoe}>Add Shoe</button>
      ) : (
        <button onClick={updateShoe}>Update Shoe</button>
      )}

      {/* LIST */}
      <ul style={{ marginTop: 20 }}>
        {shoes.map((shoe, index) => (
          <li key={index} style={{ marginBottom: 10 }}>
            {shoe}

            <button
              style={{ marginLeft: 10 }}
              onClick={() => startEdit(index)}
            >
              Edit
            </button>

            <button
              style={{ marginLeft: 5, background: "crimson" }}
              onClick={() => deleteShoe(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
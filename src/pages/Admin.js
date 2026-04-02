import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function Admin() {
  const [shoes, setShoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newShoe, setNewShoe] = useState({
    name: "",
    brand: "",
    price: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editedShoe, setEditedShoe] = useState({
    name: "",
    brand: "",
    price: "",
  });

  const shoesCollectionRef = collection(db, "shoes");

  const fetchShoes = async () => {
    try {
      const data = await getDocs(shoesCollectionRef);
      const filteredData = data.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setShoes(filteredData);
    } catch (error) {
      console.error("Error fetching shoes:", error);
    }
  };

  useEffect(() => {
    fetchShoes();
  }, []);

  const handleAddShoe = async () => {
    if (!newShoe.name || !newShoe.brand || !newShoe.price) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(shoesCollectionRef, {
        name: newShoe.name,
        brand: newShoe.brand,
        price: Number(newShoe.price),
      });

      setNewShoe({
        name: "",
        brand: "",
        price: "",
      });

      fetchShoes();
    } catch (error) {
      console.error("Error adding shoe:", error);
    }
  };

  const handleDeleteShoe = async (id) => {
    try {
      const shoeDoc = doc(db, "shoes", id);
      await deleteDoc(shoeDoc);
      fetchShoes();
    } catch (error) {
      console.error("Error deleting shoe:", error);
    }
  };

  const startEditing = (shoe) => {
    setEditingId(shoe.id);
    setEditedShoe({
      name: shoe.name,
      brand: shoe.brand,
      price: shoe.price,
    });
  };

  const handleUpdateShoe = async (id) => {
    if (!editedShoe.name || !editedShoe.brand || !editedShoe.price) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const shoeDoc = doc(db, "shoes", id);
      await updateDoc(shoeDoc, {
        name: editedShoe.name,
        brand: editedShoe.brand,
        price: Number(editedShoe.price),
      });

      setEditingId(null);
      setEditedShoe({
        name: "",
        brand: "",
        price: "",
      });

      fetchShoes();
    } catch (error) {
      console.error("Error updating shoe:", error);
    }
  };

  const filteredShoes = shoes.filter((shoe) =>
    `${shoe.name} ${shoe.brand}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2>Admin Panel</h2>

      <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h3>Add New Shoe</h3>

        <input
          type="text"
          placeholder="Shoe name"
          value={newShoe.name}
          onChange={(e) => setNewShoe({ ...newShoe, name: e.target.value })}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <input
          type="text"
          placeholder="Brand"
          value={newShoe.brand}
          onChange={(e) => setNewShoe({ ...newShoe, brand: e.target.value })}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <input
          type="number"
          placeholder="Price"
          value={newShoe.price}
          onChange={(e) => setNewShoe({ ...newShoe, price: e.target.value })}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <button onClick={handleAddShoe} style={{ padding: "8px 12px" }}>
          Add Shoe
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search shoes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />
      </div>

      <h3>Shoe List</h3>

      {filteredShoes.length === 0 ? (
        <p>No shoes found.</p>
      ) : (
        filteredShoes.map((shoe) => (
          <div
            key={shoe.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "12px",
            }}
          >
            {editingId === shoe.id ? (
              <>
                <input
                  type="text"
                  value={editedShoe.name}
                  onChange={(e) =>
                    setEditedShoe({ ...editedShoe, name: e.target.value })
                  }
                  style={{ marginRight: "10px", padding: "8px" }}
                />

                <input
                  type="text"
                  value={editedShoe.brand}
                  onChange={(e) =>
                    setEditedShoe({ ...editedShoe, brand: e.target.value })
                  }
                  style={{ marginRight: "10px", padding: "8px" }}
                />

                <input
                  type="number"
                  value={editedShoe.price}
                  onChange={(e) =>
                    setEditedShoe({ ...editedShoe, price: e.target.value })
                  }
                  style={{ marginRight: "10px", padding: "8px" }}
                />

                <button
                  onClick={() => handleUpdateShoe(shoe.id)}
                  style={{ marginRight: "10px", padding: "8px 12px" }}
                >
                  Save
                </button>

                <button onClick={() => setEditingId(null)} style={{ padding: "8px 12px" }}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {shoe.name}</p>
                <p><strong>Brand:</strong> {shoe.brand}</p>
                <p><strong>Price:</strong> ${shoe.price}</p>

                <button
                  onClick={() => startEditing(shoe)}
                  style={{ marginRight: "10px", padding: "8px 12px" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteShoe(shoe.id)}
                  style={{ padding: "8px 12px" }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;
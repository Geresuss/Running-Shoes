import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const handleLogin = () => {
    if (!email.trim()) {
      alert("Please enter an email");
      return;
    }

    login(email.trim());
    nav("/");
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Login</h1>

        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
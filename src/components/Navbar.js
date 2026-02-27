import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, setDark } = useTheme();

  const isAdmin = user === "admin@gmail.com";

  return (
    <nav className="nav">
      
      {/* LOGO CLICKABLE */}
      <Link to="/" className="logo-link">
        <h2 className="logo">RunSmart</h2>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>

        {isAdmin && <Link to="/admin">Admin</Link>}

        {user ? (
          <>
            <span className="user">{user}</span>
            <button className="btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}

        <button className="btn" onClick={() => setDark(!dark)}>
          {dark ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}
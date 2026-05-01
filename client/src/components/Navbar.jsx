import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logoutUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    try {
      logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div
          className="navbar-brand"
          onClick={goToDashboard}
          style={{ cursor: "pointer" }}
        >
          <span className="navbar-brand-mark">
            &#9670;
          </span>

          NxtBuild
        </div>

        <div className="navbar-links">
          <button
            className={`navbar-link ${
              location.pathname === "/dashboard"
                ? "active"
                : ""
            }`}
            onClick={goToDashboard}
          >
            Projects
          </button>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-user-badge">
          {user?.name
            ? user.name.charAt(0).toUpperCase()
            : "U"}
        </div>

        <span className="navbar-username">
          {user?.name || "User"}
        </span>

        <button
          className="navbar-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
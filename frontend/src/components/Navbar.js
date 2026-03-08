import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          Task Management System
        </Link>

        <div style={styles.navItems}>
          <span style={styles.userName}>
            {user?.name} ({user?.role})
          </span>

          {isAdmin ? (
            <Link to="/admin/dashboard" style={styles.navLink}>
              Dashboard
            </Link>
          ) : (
            <Link to="/employee/dashboard" style={styles.navLink}>
              Dashboard
            </Link>
          )}

          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#2c3e50",
    padding: "1rem 0",
    marginBottom: "2rem",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
  },
  navItems: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  userName: {
    color: "white",
    marginRight: "1rem",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    backgroundColor: "#34495e",
  },
  logoutBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Navbar;

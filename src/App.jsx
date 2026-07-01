import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Policies from "./pages/Policies";
import PolicyDetails from "./pages/PolicyDetails";
import AdminAddPolicy from "./pages/AdminAddPolicy";
import "./styles/style.css";
import EditPolicy from "./pages/EditPolicy";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Chatbot from "./pages/Chatbot";
function App() {
  const { isAdmin, logout } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/" className="logo">Postal Workflow Assistant</Link>
        <Link to="/policies">Policies</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/chat">AI Assistant</Link>

{isAdmin ? (
  <>
    <Link to="/admin/add">Add Policy</Link>
    <button className="logout-btn" onClick={logout}>Logout</button>
  </>
) : (
  <Link to="/login">Admin Login</Link>
)}
      </nav>

      <main className="container">
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/policies" element={<Policies />} />
  <Route path="/policies/:id" element={<PolicyDetails />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/login" element={<Login />} />
  <Route
  path="/chat"
  element={<Chatbot />}
  />

  <Route
    path="/admin/add"
    element={
      <ProtectedRoute>
        <AdminAddPolicy />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/edit/:id"
    element={
      <ProtectedRoute>
        <EditPolicy />
      </ProtectedRoute>
    }
  />
</Routes>
      </main>
      <footer className="footer">
  © 2026 Postal Workflow Assistant | Built by PV Thanmai Siri
</footer>
    </BrowserRouter>
  );
}

export default App;
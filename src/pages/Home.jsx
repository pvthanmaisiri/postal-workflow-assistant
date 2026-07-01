import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero">
      <h1>Postal Workflow Assistant</h1>
      <p>
  Simplifying postal policies through searchable information,
  document checklists, and visual workflow guidance.
</p>

      <div className="hero-buttons">
        <Link to="/policies" className="btn">View Policies</Link>
        <Link to="/admin/add" className="btn secondary">Add Policy</Link>
      </div>
    </div>
  );
}

export default Home;
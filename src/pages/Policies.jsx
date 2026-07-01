import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Policies() {
  const [policies, setPolicies] = useState([]);
  const [search, setSearch] = useState("");
  const { isAdmin } = useContext(AuthContext);
  useEffect(() => {
    fetchPolicies();
  }, []);
  const deletePolicy = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this policy?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5001/api/policies/${id}`);

    setPolicies(
      policies.filter((policy) => policy._id !== id)
    );
  } catch (error) {
    console.error(error);
  }
};
  const fetchPolicies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/policies"
      );
      setPolicies(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredPolicies = policies.filter(
    (policy) =>
      policy.title.toLowerCase().includes(search.toLowerCase()) ||
      policy.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Postal Policies</h2>

      <input
        type="text"
        placeholder="Search policy..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="policy-grid">
        {filteredPolicies.map((policy) => (
          <div key={policy._id} className="policy-card">
            <h3>{policy.title}</h3>

            <p>
              <strong>Category:</strong> {policy.category}
            </p>

            <p>{policy.description}</p>

            <Link
              to={`/policies/${policy._id}`}
              className="btn small"
            >
              View Details
            </Link>
            {isAdmin && (
  <>
    <Link to={`/admin/edit/${policy._id}`} className="btn small">
      Edit
    </Link>

    <button
      className="btn secondary"
      onClick={() => deletePolicy(policy._id)}
    >
      Delete
    </button>
  </>
)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Policies;
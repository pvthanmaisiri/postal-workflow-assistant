import { useEffect, useState } from "react";
import axios from "axios";
import { FaFileAlt, FaPiggyBank, FaShieldAlt, FaExclamationCircle } from "react-icons/fa";
function Dashboard() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    const res = await axios.get(
  "https://postal-workflow-assistant.onrender.com/api/policies"
);
    setPolicies(res.data);
  };

  const total = policies.length;
  const savings = policies.filter((p) => p.category === "Savings Scheme").length;
  const insurance = policies.filter((p) => p.category === "Insurance").length;
  const complaints = policies.filter((p) => p.category === "Complaint Service").length;

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="policy-grid">
        <div className="policy-card">
          <h3>Total Policies</h3>
          <h1>{total}</h1>
        </div>

        <div className="policy-card">
          <h3><FaPiggyBank /> Savings Schemes</h3>
          <h1>{savings}</h1>
        </div>

        <div className="policy-card">
          <h3>Insurance</h3>
          <h1>{insurance}</h1>
        </div>

        <div className="policy-card">
          <h3>Complaint Services</h3>
          <h1>{complaints}</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
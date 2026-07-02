import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import WorkflowChart from "../components/WorkflowChart";
function PolicyDetails() {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    fetchPolicy();
  }, [id]);

  const fetchPolicy = async () => {
    try {
      const res = await axios.get(
  `https://postal-workflow-assistant.onrender.com/api/policies/${id}`
);
    } catch (error) {
      console.error(error);
    }
  };

  if (!policy) {
    return <h2>Loading policy...</h2>;
  }

  return (
    <div className="details">
      <Link to="/policies" className="back-link">← Back to Policies</Link>

      <h2>{policy.title}</h2>
      <p className="category">{policy.category}</p>

      <section>
        <h3>Description</h3>
        <p>{policy.description}</p>
      </section>

      <section>
        <h3>Eligibility</h3>
        <p>{policy.eligibility}</p>
      </section>

      <section>
        <h3>Required Documents</h3>
        <ul>
          {policy.documents.map((doc, index) => (
            <li key={index}>{doc}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Workflow Steps</h3>
        <ol>
          {policy.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
      <section>
  <h3>Workflow Visualization</h3>
  <WorkflowChart steps={policy.steps} />
</section>
    </div>
  );
}

export default PolicyDetails;
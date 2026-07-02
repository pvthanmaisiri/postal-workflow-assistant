import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminAddPolicy() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    eligibility: "",
    documents: "",
    steps: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const newPolicy = {
      title: form.title,
      category: form.category,
      description: form.description,
      eligibility: form.eligibility,
      documents: form.documents.split(","),
      steps: form.steps.split(","),
      faqs: []
    };

    await axios.post(
  "https://postal-workflow-assistant.onrender.com/api/policies",
  newPolicy
);

    alert("Policy added successfully!");
    navigate("/policies");
  };

  return (
    <div>
      <h2>Admin - Add Policy</h2>

      <form className="form">
        <input name="title" placeholder="Policy title" onChange={handleChange} />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <textarea name="eligibility" placeholder="Eligibility" onChange={handleChange}></textarea>
        <textarea name="documents" placeholder="Documents separated by comma" onChange={handleChange}></textarea>
        <textarea name="steps" placeholder="Steps separated by comma" onChange={handleChange}></textarea>

        <button type="button" className="btn" onClick={handleSave}>
          Save Policy
        </button>
      </form>
    </div>
  );
}

export default AdminAddPolicy;
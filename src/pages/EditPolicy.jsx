import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditPolicy() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    eligibility: "",
    documents: "",
    steps: ""
  });

  useEffect(() => {
    fetchPolicy();
  }, []);

  const fetchPolicy = async () => {
    const res = await axios.get(`http://localhost:5001/api/policies/${id}`);

    setForm({
      title: res.data.title,
      category: res.data.category,
      description: res.data.description,
      eligibility: res.data.eligibility,
      documents: res.data.documents.join(", "),
      steps: res.data.steps.join(", ")
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
  try {
    const updatedPolicy = {
      title: form.title,
      category: form.category,
      description: form.description,
      eligibility: form.eligibility,
      documents: form.documents.split(",").map((item) => item.trim()),
      steps: form.steps.split(",").map((item) => item.trim()),
      faqs: []
    };

    await axios.put(
      `http://localhost:5001/api/policies/${id}`,
      updatedPolicy
    );

    alert("Policy updated successfully!");
    navigate("/policies");
  } catch (error) {
    console.error(error);
    alert("Update failed. Check console or backend terminal.");
  }
};
  return (
    <div>
      <h2>Edit Policy</h2>

      <form className="form">
        <input name="title" value={form.title} onChange={handleChange} />
        <input name="category" value={form.category} onChange={handleChange} />
        <textarea name="description" value={form.description} onChange={handleChange}></textarea>
        <textarea name="eligibility" value={form.eligibility} onChange={handleChange}></textarea>
        <textarea name="documents" value={form.documents} onChange={handleChange}></textarea>
        <textarea name="steps" value={form.steps} onChange={handleChange}></textarea>

        <button type="button" className="btn" onClick={handleUpdate}>
          Update Policy
        </button>
      </form>
    </div>
  );
}

export default EditPolicy;
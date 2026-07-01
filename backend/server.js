const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Policy = require("./models/Policy");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/postal_workflow_db")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.get("/", (req, res) => {
  res.send("Postal Workflow Assistant Backend Running");
});

app.get("/api/policies", async (req, res) => {
  const policies = await Policy.find();
  res.json(policies);
});

app.get("/api/policies/:id", async (req, res) => {
  const policy = await Policy.findById(req.params.id);

  if (!policy) {
    return res.status(404).json({ message: "Policy not found" });
  }

  res.json(policy);
});

app.post("/api/policies", async (req, res) => {
  const newPolicy = new Policy(req.body);
  await newPolicy.save();
  res.status(201).json(newPolicy);
});

app.delete("/api/policies/:id", async (req, res) => {
  try {
    await Policy.findByIdAndDelete(req.params.id);

    res.json({
      message: "Policy deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
app.put("/api/policies/:id", async (req, res) => {
  try {
    const updatedPolicy = await Policy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPolicy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.json(updatedPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const PORT = 5001;
app.post("/api/chat", async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        answer: "Question is required."
      });
    }

    const q = question.toLowerCase();

    const policies = await Policy.find();
    if (q.includes("compare")) {

  const matchedPolicies = policies.filter(policy =>
    q.includes(policy.title.toLowerCase()) ||
    q.includes("ppf") && policy.title.toLowerCase().includes("ppf") ||
    q.includes("sukanya") && policy.title.toLowerCase().includes("sukanya") ||
    q.includes("rpli") && policy.title.toLowerCase().includes("rpli")
  );

  if (matchedPolicies.length === 2) {

    const p1 = matchedPolicies[0];
    const p2 = matchedPolicies[1];

    return res.json({
      answer:
`📊 POLICY COMPARISON

${p1.title} VS ${p2.title}

Category
• ${p1.category}
• ${p2.category}

Eligibility
• ${p1.eligibility}

VS

• ${p2.eligibility}

Documents Required
• ${p1.documents.length}

VS

• ${p2.documents.length}

Workflow Steps
• ${p1.steps.length}

VS

• ${p2.steps.length}`
    });

  }

}

    console.log("Policies:", policies.length);

    const matchedPolicy = policies.find((policy) => {

  const title = policy.title.toLowerCase();

  // Match the full title
  if (q.includes(title) || title.includes(q)) {
    return true;
  }
  if (q.includes("compare")) {

}
  // Match individual words
  if (title.split(" ").some((word) => q.includes(word))) {
    return true;
  }

  // Match abbreviations
  if (
    title.includes("rural postal life insurance") &&
    q.includes("rpli")
  ) {
    return true;
  }

  if (
    title.includes("sukanya samriddhi") &&
    (q.includes("ssa") || q.includes("sukanya"))
  ) {
    return true;
  }

  return false;
});
    if (!matchedPolicy) {
      return res.json({
        answer: "Sorry, I couldn't find a matching postal policy."
      });
    }

    let answer = `📌 ${matchedPolicy.title}\n\n`;

    if (q.includes("eligibility")) {
      answer += matchedPolicy.eligibility;
    } else if (q.includes("document")) {
      answer += Array.isArray(matchedPolicy.documents)
        ? matchedPolicy.documents.join("\n• ")
        : matchedPolicy.documents;
    } else if (
      q.includes("workflow") ||
      q.includes("steps") ||
      q.includes("process")
    ) {
      answer += Array.isArray(matchedPolicy.steps)
        ? matchedPolicy.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")
        : matchedPolicy.steps;
    } else {
      answer += matchedPolicy.description;
    }

    res.json({ answer });

  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({
      answer: err.message
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
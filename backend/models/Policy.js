const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    description: String,
    eligibility: String,
    documents: [String],
    steps: [String],
    faqs: [
      {
        question: String,
        answer: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Policy", policySchema);
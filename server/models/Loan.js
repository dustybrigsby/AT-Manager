const { Schema, model } = require("mongoose");

const loanSchema = new Schema({
  status: {
    type: String,
    required: true,
    trim: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  tools: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tool",
      required: true,
    },
  ],
});

const Loan = model("Loan", loanSchema);

module.exports = Loan;

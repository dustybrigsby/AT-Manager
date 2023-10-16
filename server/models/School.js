const { Schema, model } = require("mongoose");

const schoolSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  staff: [
    {
      type: Schema.Types.ObjectId,
      ref: "Staff",
    },
  ],
});

const School = model("School", schoolSchema);

module.exports = School;

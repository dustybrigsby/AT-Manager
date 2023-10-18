const { Schema, model } = require("mongoose");

const staffSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  schools: [
    {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
  ],
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  ],
});

const Staff = model("Staff", staffSchema, "staff");

module.exports = Staff;

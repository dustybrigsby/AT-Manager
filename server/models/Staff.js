const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

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

const Staff = model("Staff", staffSchema);

module.exports = Staff;

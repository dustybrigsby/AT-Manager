const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  sid: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[0-9]{6}$/.test(value);
      },
    },
    message: (props) => `${props.value} is not a valid 6-digit number`,
  },
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
  school: {
    type: Schema.Types.ObjectId,
    ref: "School",
  },
  team: [
    {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
  ],
  loans: [
    {
      type: Schema.Types.ObjectId,
      ref: "Loan",
    },
  ],
});

const Student = model("Student", studentSchema);

module.exports = Student;

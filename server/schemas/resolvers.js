const { AuthenticationError } = require('apollo-server-express');
const { User, Student, Staff, School, Tool, Loan } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    students: async () => {
      return await Student.find().populate('school').populate('loans');
    },
    student: async (parent, args) => {
      return await Student.findById(args.id).populate('school');
    },

    staff: async () => {
      return await Staff.find();
    },

    schools: async () => {
      return await School.find();
    },
    school: async (parent, args) => {
      return await School.findById(args.id).populate('student');
    },

    tools: async () => {
      return await Tool.find();
    },

    loans: async () => {
      return await Loan.find();
    },

  },

  Mutation: {
    // USER
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }
      const token = signToken(user);
      return { token, user };
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // STUDENT
    addStudent: async (parent, { sid, firstName, lastName, middleName, email, school }) => {
      const student = await Student.create({ sid, firstName, lastName, middleName, email, school });
      return student;
    },
    updateStudent: async (parent, { id, sid, firstName, lastName, middleName, email, school, team, loans }) => {
      const updatedStudent = await Student.findByIdAndUpdate({ _id: id }, { sid, firstName, lastName, middleName, email, school, team, loans }, { new: true });
      return updatedStudent;
    },
    deleteStudent: async (parent, { id }) => {
      const deletedStudent = await Student.findByIdAndDelete({ _id: id });
      return deletedStudent;
    },

    // STAFF
    addStaff: async (parent, { firstName, lastName, middleName, email, role, schools, students }) => {
      const staff = await Staff.create({ firstName, lastName, middleName, email, role, schools, students });
      return staff;
    },
    updateStaff: async (parent, { id, firstName, lastName, middleName, email, role, schools, students }) => {
      const updatedStaff = await Staff.findByIdAndUpdate({ _id: id }, { firstName, lastName, middleName, email, role, schools, students }, { new: true });
      return updatedStaff;
    },
    deleteStaff: async (parent, { id }) => {
      const deletedstaff = await Staff.findByIdAndDelete({ _id: id });
      return deletedstaff;
    },

    // SCHOOL
    addSchool: async (parent, { name, students, staff }) => {
      const school = await School.create({ name, students, staff });
      return school;
    },
    updateSchool: async (parent, { id, name, students, staff }) => {
      const updatedschool = await School.findByIdAndUpdate({ _id: id }, { name, students, staff }, { new: true });
      return updatedschool;
    },
    deleteSchool: async (parent, { id }) => {
      const deletedschool = await School.findByIdAndDelete({ _id: id });
      return deletedschool;
    },

    // TOOL
    addTool: async (parent, { assetTag, name, description, serial, model, stock, available }) => {
      const tool = await Tool.create({ assetTag, name, description, serial, model, stock, available });
      return tool;
    },
    updateTool: async (parent, { id, assetTag, name, description, serial, model, stock, available }) => {
      const updatedtool = await Tool.findByIdAndUpdate({ _id: id }, { assetTag, name, description, serial, model, stock, available }, { new: true });
      return updatedtool;
    },
    deleteTool: async (parent, { id }) => {
      const deletedtool = await Tool.findByIdAndDelete({ _id: id });
      return deletedtool;
    },

    // LOAN
    addLoan: async (parent, { student, tools, status }) => {
      const loan = await Loan.create({ student, tools, status });
      return loan;
    },
    updateLoan: async (parent, { id, student, tools, status }) => {
      const updatedloan = await Loan.findByIdAndUpdate({ _id: id }, { student, tools, status }, { new: true });
      return updatedloan;
    },
    deleteLoan: async (parent, { id }) => {
      const deletedloan = await Loan.findByIdAndDelete({ _id: id });
      return deletedloan;
    },
  },
};

module.exports = resolvers;

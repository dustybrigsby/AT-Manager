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
      return await Student.findById(args.id).populate('school').populate('loans').populate('team');
    },

    staffs: async () => {
      return await Staff.find().populate('schools');
    },
    staff: async (parent, args) => {
      return await Staff.findById(args.id).populate('students').populate('schools');
    },

    schools: async () => {
      return await School.find().populate('students').populate('staff');
    },
    school: async (parent, args) => {
      return await School.findById(args.id).populate('students');
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
    addUser: async (parent, args) => {
      const user = await User.create(args);
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
    addStudent: async (parent, args) => {
      console.log('addStudent args:', args);
      const student = await Student.create(args);
      console.log('addStudent result:', student);
      return student;
    },
    updateStudent: async (parent, args) => {
      const updatedStudent = await Student.findByIdAndUpdate({ _id: id }, args, { new: true });
      return updatedStudent;
    },
    deleteStudent: async (parent, { id }) => {
      const deletedStudent = await Student.findByIdAndDelete({ _id: id });
      return deletedStudent;
    },

    // STAFF
    addStaff: async (parent, args) => {
      console.log('addStaff args:', args);
      const staff = await Staff.create(args);
      return staff;
    },
    updateStaff: async (parent, args) => {
      const updatedStaff = await Staff.findByIdAndUpdate({ _id: id }, args, { new: true });
      return updatedStaff;
    },
    deleteStaff: async (parent, { id }) => {
      const deletedstaff = await Staff.findByIdAndDelete({ _id: id });
      return deletedstaff;
    },

    // SCHOOL
    addSchool: async (parent, args) => {
      const school = await School.create(args);
      return school;
    },
    updateSchool: async (parent, args) => {
      const updatedschool = await School.findByIdAndUpdate({ _id: id }, args, { new: true });
      return updatedschool;
    },
    deleteSchool: async (parent, { id }) => {
      const deletedschool = await School.findByIdAndDelete({ _id: id });
      return deletedschool;
    },

    // TOOL
    addTool: async (parent, args) => {
      const tool = await Tool.create(args);
      return tool;
    },
    updateTool: async (parent, args) => {
      const updatedtool = await Tool.findByIdAndUpdate({ _id: id }, args, { new: true });
      return updatedtool;
    },
    deleteTool: async (parent, { id }) => {
      const deletedtool = await Tool.findByIdAndDelete({ _id: id });
      return deletedtool;
    },

    // LOAN
    addLoan: async (parent, args) => {
      const loan = await Loan.create(args);
      return loan;
    },
    updateLoan: async (parent, args) => {
      const updatedloan = await Loan.findByIdAndUpdate({ _id: id }, args, { new: true });
      return updatedloan;
    },
    deleteLoan: async (parent, { id }) => {
      const deletedloan = await Loan.findByIdAndDelete({ _id: id });
      return deletedloan;
    },
  },
};

module.exports = resolvers;

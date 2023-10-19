const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Student {
    _id: ID
    sid: String!
    firstName: String!
    lastName: String!
    middleName: String
    email: String!
    school: School
    team: [Staff]
    loans: [Loan]
  }

  type Staff {
    _id: ID
    firstName: String!
    lastName: String!
    middleName: String
    email: String!
    role: String!
    schools: [School]
    students: [Student]
  }

  type School {
    _id: ID
    name: String!
    students: [Student]
    staff: [Staff]
  }
  
  type Tool {
    _id: ID
    assetTag: String!
    name: String!
    description: String
    serial: String
    model: String
    stock: Int!
    available: Int!
    status: String!
  }

  type Loan {
    _id: ID
    student: Student!
    tools: [Tool!]
    status: String!
  }

  type DeleteResponse {
    success: Boolean!
    message: String
    deletedId: ID
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User

    students: [Student]
    student(id:ID!): Student

    staffs: [Staff]
    staff(id:ID!): Staff

    schools: [School]
    school(id:ID!):School

    tools: [Tool]
    loans: [Loan]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    deleteUser: DeleteResponse

    addStudent(
      sid: String!
      firstName: String!
      middleName: String
      lastName: String!
      email: String!
      school: ID
    ): Student
    updateStudent(
      id: ID!
      sid: String
      firstName: String
      lastName: String
      middleName: String
      email: String
      school: ID
      team: [ID]
      loans: [ID]
    ): Student
    deleteStudent(id: ID!): DeleteResponse

    addStaff(
      firstName: String!
      lastName: String!
      middleName: String
      email: String!
      role: String!
      schools: [ID]
    ): Staff
    updateStaff(
      id: ID!
      firstName: String
      lastName: String
      middleName: String
      email: String
      role: String
      schools: [ID]
      students: [ID]
    ): Staff
    deleteStaff(id: ID!): DeleteResponse

    addSchool(name: String!, students: [ID], staff:[ID]): School
    updateSchool(id: ID!, name: String, students: [ID], staff:[ID]): School
    deleteSchool(id: ID!): DeleteResponse

    addTool(
      assetTag: String!
      name: String!
      description: String
      serial: String
      model: String
      stock: Int!
      available: Int!
      status: String!
    ): Tool
    updateTool(
      id: ID!
      assetTag: String
      name: String
      description: String
      serial: String
      model: String
      stock: Int
      available: Int
      status: String
    ): Tool
    deleteTool(id: ID!): DeleteResponse

    addLoan(student: ID!, tools: [ID!], status: String!): Loan
    updateLoan(id: ID, student: ID, tools: [ID], status: String): Loan
    deleteLoan(id: ID): DeleteResponse

  }
`;

module.exports = typeDefs;

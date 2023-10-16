const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Student {
    _id: ID
    sid: String!
    firstName: String!
    lastName: String!
    middleName: String
    nickName: String
    email: String!
    school: School!
    team: [Staff]
    loans: [Loan]
  }

  type Staff {
    _id: ID
    firstName: String!
    lastName: String!
    middleName: String
    email: String!
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
    image: String
    stock: Int!
    available: Int!
  }

  type Loan {
    _id: ID
    status: String!
    student: Student!
    tools: [Tool!]
  }


  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile: Profile
    removeSkill(skill: String!): Profile
  }
`;

module.exports = typeDefs;

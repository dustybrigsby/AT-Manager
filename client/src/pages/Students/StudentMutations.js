import { gql } from "@apollo/client";

export const ADD_STUDENT = gql`
  mutation addStudent(
    $sid: String!
    $firstName: String!
    $lastName: String!
    $middleName: String
    $email: String!
    $school: ID!
  ) {
    addStudent(
      sid: $sid
      firstName: $firstName
      lastName: $lastName
      middleName: $middleName
      email: $email
      school: $school
    ){
      id
      sid
      firstName
      lastName
      middleName
      email
      school
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation deleteStudent($id: ID!) {
    success
    message
    deletedId
  }
`;
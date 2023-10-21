import { gql } from "@apollo/client";

export const ADD_STUDENT = gql`
  mutation addStudent(
    $sid: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $middleName: String
  ) {
    addStudent(
      sid: $sid
      firstName: $firstName
      lastName: $lastName
      email: $email
      middleName: $middleName
    ) {
      _id
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation deleteStudent($id: ID!) {
    deleteStudent(id: $id) {
      success
      message
      deletedId
    }
  }
`;

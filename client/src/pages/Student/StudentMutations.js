import { gql } from "@apollo/client";

export const ADD_STUDENT = gql`
  mutation addStudent(
    $sid: String!
    $firstName: String!
    $lastName: String!
    $middleName: String
    $email: String!
    $school: ID
    $team: [ID]
    $loans: [ID]
  ) {
    addStudent(
      sid: $username
      firstName: $firstName
      lastName: $lastName
      middleName: $middleName
      email: $email
      school: $school
      team: $team
      loans: $loans
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

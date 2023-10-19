import { gql } from "@apollo/client";

export const ADD_STAFF = gql`
  mutation addStaff(
    $firstName: String!
    $lastName: String!
    $middleName: String
    $email: String!
    $role: String!
    $schools: ID
    ) {
    addStaff(
      firstName:$firstName
      lastName:$lastName
      middleName:$middleName
      email:$email
      role:$role
      schools:$schools
      ) {
      _id
      firstName
      lastName
      middleName
      email
      role
      schools{
        _id
        name
      }
    }
  }
`;

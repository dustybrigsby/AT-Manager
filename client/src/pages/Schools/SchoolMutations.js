import { gql } from "@apollo/client";

export const ADD_SCHOOL = gql`
  mutation addSchool($name: String!) {
    addSchool(name: $name) {
      _id
      name
    }
  }
`;

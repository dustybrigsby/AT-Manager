import { gql } from "@apollo/client";

export const QUERY_SCHOOLS = gql`
  query getSchools {
  schools {
    _id
    name
    staff {
      _id
      email
      firstName
      lastName
      middleName
      role
    }
    students {
      _id
      firstName
      lastName
      middleName
      sid
    }
  }
}
`;

import { gql } from '@apollo/client';

export const QUERY_STAFF = gql`
  query getStaff {
    staffs {
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

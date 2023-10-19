import { gql } from '@apollo/client';

export const QUERY_SCHOOLS = gql`
  query getSchools {
    schools {
    _id
    name
    students {
      _id
      sid
      firstName
      lastName
      middleName
      loans {
        _id
        status
        tools {
          _id
          assetTag
          name
          status
        }
      }
    }
    staff {
      _id
      email
      firstName
      middleName
      lastName
      role
    }
  }
}
`;

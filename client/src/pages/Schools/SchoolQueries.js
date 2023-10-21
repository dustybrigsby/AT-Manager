import { gql } from "@apollo/client";

export const QUERY_SCHOOLS = gql`
  query getSchools {
    schools {
      _id
      name
      students {
        _id
      }
      staff {
        _id
      }
    }
  }
`;

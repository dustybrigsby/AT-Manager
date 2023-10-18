import { gql } from '@apollo/client';

export const QUERY_STUDENTS = gql`
query getStudents {
  students {
    _id
    sid
    firstName
    middleName
    lastName
    email
    school {
      _id
      name
    }
    team {
      _id
      firstName
      lastName
      email
      role
    }
    loans {
      _id
      status
      tools {
        _id
        name
        assetTag
        status
      }
    }
  }
}
`;

export const QUERY_SINGLE_STUDENT = gql`
  query getStudent($studentId: ID!) {
  student(id: $studentId) {
    _id
    sid
    firstName
    lastName
    middleName
    email
    school {
      _id
      name
    }
    team {
      _id
      email
      firstName
      lastName
      role
    }
    loans {
      _id
      status
      tools {
        _id
        assetTag
        name
      }
    }
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;

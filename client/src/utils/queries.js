import { gql } from "@apollo/client";

// (LEE) Query to return user information including saved books
export const QUERY_ME = gql`
  query me {
    me {
      username
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

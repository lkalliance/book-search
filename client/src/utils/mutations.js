import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        savedBooks {
          bookId
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook(
    $authors: [String]
    $description: String
    $title: String
    $bookId: String
    $image: String
    $link: String
  ) {
    saveBook(
      title: $title
      authors: $authors
      description: $description
      bookId: $bookId
      image: $image
      link: $link
    ) {
      email
      username
      savedBooks {
        title
        authors
        bookId
        description
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: String) {
    removeBook(bookId: $bookId) {
      email
      username
      savedBooks {
        authors
        title
        bookId
        description
        image
        link
      }
    }
  }
`;

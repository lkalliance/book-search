import { gql } from "@apollo/client";

// (LEE) Mutatation to log in returns token and saved bookIds
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

// (LEE) Mutatation to add user returns token, username and email
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

// (LEE) Mutatation to save a book returns user info and new book list
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

// (LEE) Mutatation to remove a book returns user info and new book list
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

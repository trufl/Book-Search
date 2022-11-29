import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        image
        title
      }
    }
  }
}
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($bookId: String!, $authors: [String], $description: String, $image: String, $title: String) {
    saveBook(bookId: $bookId, authors: $authors, description: $description, image: $image, title: $title) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        image
        title
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        image
        title
      }
    }
  }
}
`;


export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
  removeBook(bookId: $bookId) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      description
      image
      title
    }
  }
}
`;
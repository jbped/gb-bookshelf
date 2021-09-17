import { gql }from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser ($username: String!, $email: String!, $password: String!) {
    AddUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook ($bookId: String!) {
    saveBook(bookId: $bookId) {
      _id
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook ($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
    }
  }
`;
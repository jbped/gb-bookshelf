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
    createUser(username: $username, email: $email, password: $password) {
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
  mutation saveBook ($input: bookInfo!) {
    saveBook(input: $input) {
      _id
      username
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
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
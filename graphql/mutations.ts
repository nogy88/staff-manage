import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      email
      password
      role
      name
      phone
      address
      birthday
      gender
      createdBy {
        id
        email
        name
      }
    }
  }
`;

export const DELETE_NOVEL = gql`
  mutation deleteNovel($id: ID!) {
    deleteNovel(id: $id) {
      id
      title
      image
    }
  }
`;

export const UPDATE_NOVEL = gql`
  mutation UpdateNovel($id: ID!, $title: String, $image: String) {
    updateNovel(id: $id, title: $title, image: $image) {
      id
      image
      title
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation Mutation($novelId: ID!, $name: String) {
    addAuthor(novelId: $novelId, name: $name) {
      id
      name
      novelId
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation Mutation($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
      novelId
    }
  }
`;

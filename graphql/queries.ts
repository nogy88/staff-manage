import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Users($role: [Role!]) {
    users(role: $role) {
      id
      email
      name
      gender
      phone
      role
      address
      createdBy {
        id
        email
        name
      }
    }
  }
`;

export const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      email
      name
      gender
      phone
      role
      address
      createdBy {
        id
        email
        name
      }
    }
  }
`;

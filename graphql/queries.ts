import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Users {
    users {
      id
      image
      createdAt
      title
      updatedAt
      authors {
        id
        name
        novelId
      }
    }
  }
`;

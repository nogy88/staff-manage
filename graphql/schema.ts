export const typeDefs = `#graphql
  type User {
    id: ID
    email: String!
    name: String
    phone: Int
    address: String
    birthday: String
    gender: Gender
    role: Role!
    password: String!
    createdBy: User
    updatedAt: String
  }

  enum Role {
    ADMIN, EMPLOYEE
  }

  enum Gender {
    MALE, FEMALE
  }

  type AuthPayload { 
    token: String!
    user: User!
  } 

   input AuthUserInput {
    email: String!
    password: String!
  }

  input CreateUserInput {
    email: String!
    password: String!
    role: Role
    name: String
    phone: String
    address: String
    birthday: String
    gender: Gender
    createdById: String
  }

  input UpdateUserInput {
    id: ID!
    name: String
    phone: String
    address: String
    birthday: String
    gender: Gender
  }

  type Query {
    searchUserByEmail(email: String!): [User!]!
    users(role: [Role!]): [User!]!
    user(id: ID!): User
  }
  
   type Mutation {
    signupUser(input: AuthUserInput!): AuthPayload
    login(input: AuthUserInput!): AuthPayload
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: String!): User
  }
`;

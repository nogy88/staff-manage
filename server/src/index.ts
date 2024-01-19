import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { PrismaClient } from "@prisma/client";
// import { readFile } from "node:fs/promises";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
// import { deleteUser } from "./controllers"; // todo can't import
// import typeDefs from "./graphql/schema"; // todo can't import
// import resolvers from "./graphql/resolvers"; // todo can't import

const prisma = new PrismaClient();

// const typeDefs = await readFile("./schema.graphql", "utf8"); // todo try

const typeDefs = `#graphql
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
    M, F
  }

  ### Staff manage 
  type Query {
    """ Хэрэглэгчийн жагсаалтаас имэйлээр хайх """
    searchUserByEmail(email: String!): [User!]!

    """ Хэрэглэгчийн жагсаалтаас роллоор филтердэж авах """
    users(role: [Role!]): [User!]!

    """ Хэрэглэгчийн мэдээлэл авах """
    user(id: ID!): User
  }

  type AuthPayload { 
    token: String!
    user: User!
  } 

  type Mutation {
    signupUser(input: AuthUserInput!): AuthPayload
    login(input: AuthUserInput!): AuthPayload
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: String!): User
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
`;

const resolvers = {
  Mutation: {
    signupUser: async (_: any, { input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);

      try {
        // Create the new user
        const user = await prisma.user.create({
          data: {
            email: input.email,
            password: hashedPassword,
            role: input.role,
          },
        });

        const token = jwt.sign({ userId: user.id }, "APP_SECRET");
        return { token, user };
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: error.code,
          },
        });
      }
    },
    createUser: async (
      _: any,
      { input }: any,
      context: {
        // authenticatedUser: { id: any }
      }
    ) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);

      try {
        let createdById = null;

        // Check if the user is authenticated (logged in)
        // if (context.authenticatedUser) {
        //   // Set createdById to the authenticated user's id
        //   createdById = context.authenticatedUser.id;
        // }

        // Create the new user
        const newUser = await prisma.user.create({
          data: {
            email: input.email,
            password: hashedPassword,
            name: input.name,
            phone: input.phone,
            address: input.address,
            birthday: input.birthday,
            gender: input.gender,
            role: input.role,
            createdById: createdById,
          },
        });

        return newUser;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: error.code,
          },
        });
      }
    },
    updateUser: async (_: any, { input: { id, name, phone, address, birthday, gender } }: any) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id },
        });
        if (!user) {
          throw new Error(`${id} ID-тай хэрэглэгч байхгүй байна.`);
        }

        const updatedUser = { name, phone, address, birthday, gender };
        await prisma.user.update({
          where: { id },
          data: updatedUser,
        });
        return { ...user, ...updatedUser };
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: error.code,
          },
        });
      }
    },
    deleteUser: async (_: any, { id }) => {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new Error(`${id} ID-тай хэрэглэгч байхгүй байна.`);
      }

      await prisma.user.delete({
        where: { id },
      });
      return user;
    },
  },
  Query: {
    searchUserByEmail: (_: any, { email }) =>
      prisma.user.findMany({
        where: {
          email: {
            contains: email,
          },
        },
      }),
    users: async (_: any, { role }) => {
      return await prisma.user
        .findMany()
        .then((data) => data.filter((user) => role.find((r: String) => r === user.role)));
    },
    user: async (_: any, { id }) => {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new Error(`${id} ID-тай хэрэглэгч байхгүй байна.`);
      }

      return user;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

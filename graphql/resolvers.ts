import { GraphQLError } from "graphql";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Context } from "@apollo/client";
import { prisma } from "@/prisma/db";

export const resolvers = {
  Query: {
    searchUserByEmail: (_: any, args: any, context: Context) =>
      prisma.user.findMany({
        where: {
          email: {
            contains: args.email,
          },
        },
      }),
    users: async (_: any, args: any, context: Context) => {
      return await prisma.user
        .findMany()
        .then((data: any) => data.filter((user: any) => args.role.find((r: String) => r === user.role)));
    },
    user: async (_: any, args: any, context: Context) => {
      const { id } = args;
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new Error(`${id} ID-тай хэрэглэгч байхгүй байна.`);
      }

      return user;
    },
  },
  Mutation: {
    signupUser: async (_: any, { input }: any, context: Context) => {
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
        // throw new GraphQLError(error.message, {
        //   extensions: {
        //     code: error.code,
        //   },
        // });
      }
    },
    createUser: async (_: any, { input }: any, context: Context) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);

      try {
        let createdById = null;

        // Check if the user is authenticated (logged in)
        // if (authenticatedUser) {
        //   // Set createdById to the authenticated user's id
        //   createdById = authenticatedUser.id;
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
        // throw new GraphQLError(error.message, {
        //   extensions: {
        //     code: error.code,
        //   },
        // });
      }
    },
    updateUser: async (_: any, { input: { id, name, phone, address, birthday, gender } }: any, context: Context) => {
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
        // throw new GraphQLError(error.message, {
        //   extensions: {
        //     code: error.code,
        //   },
        // });
      }
    },
    deleteUser: async (_: any, { id }: any, context: Context) => {
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
};

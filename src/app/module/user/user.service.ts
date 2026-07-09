/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import { prisma } from "../../lib/prisma";
import { TUser } from "./user.interface";
import AppError from "../../errorHepers/AppError";

const createUser = async (payload: TUser) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (userExists) {
    // throw new Error("User with this email already exists");
    throw new AppError(status.CONFLICT, "User with this email already exists");
  }

  const data = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
  };

  const result = await prisma.user.create({
    data,
  });

  return result;
};

export const UserService = {
  createUser,
};

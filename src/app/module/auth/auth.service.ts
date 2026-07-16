import status from "http-status";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { envVars } from "../../config/env";

import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";

import { ILoginUserPayload, IRegisterUserPayload } from "./auth.interface";
import AppError from "../../errorHepers/AppError";
import bcrypt from "bcryptjs";
import { tokenUtils } from "../../utils/token";
import { IRequestUser } from "../../interfaces/requestUser.interface";
import { Role } from "../../../../generated/prisma/enums";

const registerUser = async (payload: IRegisterUserPayload) => {
  const { name, email, password, role } = payload;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    throw new Error("User already exist.Please try another email");
  }
  const allowedRoles = [Role.Admin, Role.Customer, Role.Provider];

  if (!allowedRoles.includes(payload.role as Role)) {
    throw new Error("Invalid role");
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(envVars.BCRYPT_SALT_ROUNDS),
  );

  const data = await prisma.user.create({
    data: { name: name, email: email, password: hashedPassword, role: role },
  });

  console.log(data.role, "ami resgister");
  if (!data) {
    // throw new Error("Failed to register patient");
    throw new AppError(status.BAD_REQUEST, "Failed to register patient");
  }
  try {
    const accessToken = tokenUtils.getAccessToken({
      userId: data.id,
      role: data.role,
      name: data.name,
      email: data.email,
    });

    const refreshToken = tokenUtils.getRefreshToken({
      userId: data.id,
      role: data.role,
      name: data.name,
      email: data.email,
    });

    return {
      ...data,
      accessToken,
      refreshToken,
      data,
    };
  } catch (error) {
    console.log("Transaction error : ", error);
    await prisma.user.delete({
      where: {
        id: data.id,
      },
    });
    throw error;
  }
};
const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;

  const userOpe = await prisma.user.findUnique({
    where: { email },
  });

  if (!userOpe) {
    throw new Error("User not found");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  if (user.status === "SUSPENDED") {
    throw new Error(
      "Your account has been SUSPENDED. Please contact Authorization.",
    );
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    envVars.ACCESS_TOKEN_SECRET,
    envVars.ACCESS_TOKEN_EXPIRES_IN as SignOptions,
  );
  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    envVars.REFRESH_TOKEN_SECRET,
    envVars.REFRESH_TOKEN_EXPIRES_IN as SignOptions,
  );
  return {
    accessToken,
    refreshToken,
  };
};
const getMe = async (user: IRequestUser) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });

  console.log("isUser", isUserExists);
  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  return isUserExists;
};

export const AuthService = {
  registerUser,
  loginUser,
  getMe,
};

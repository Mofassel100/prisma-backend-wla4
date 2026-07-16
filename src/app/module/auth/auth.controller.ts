import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { envVars } from "../../config/env";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import ms, { StringValue } from "ms";
import { AuthService } from "./auth.service";
import { tokenUtils } from "../../utils/token";
import { IRequestUser } from "../../interfaces/requestUser.interface";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const maxAge = ms(envVars.ACCESS_TOKEN_EXPIRES_IN as StringValue);
  console.log({ maxAge });
  const payload = req.body;

  console.log(payload);

  const result = await AuthService.registerUser(payload);

  const { accessToken, refreshToken, ...rest } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "User registered successfully",
    data: {
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const { accessToken, refreshToken } = await AuthService.loginUser(payload);
  console.log(accessToken, refreshToken);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
  });

  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "User logged in successfully",
    data: { accessToken, refreshToken },
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IRequestUser;
  console.log(user);

  const result = await AuthService.getMe(user);

  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "User logged in successfully",
    data: result,
  });
});
export const AuthController = {
  registerUser,
  loginUser,
  getMe,
};

import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { GearService } from "./gear.service";
import { IRequestUser } from "../../interfaces/requestUser.interface";

const gearCreateFromDB = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user as IRequestUser;
  const data = req.body;

  const result = await GearService.gearCreateFromDB(data, userId);
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Gear created successfully",
    data: result,
  });
});

const gearUpdatedFromDB = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Gear updated successfully in successfully",
    data: "",
  });
});

const gearDeleteFromDB = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Gear Remove in successfully !",
    data: "",
  });
});
export const GearController = {
  gearCreateFromDB,
  gearDeleteFromDB,
  gearUpdatedFromDB,
};

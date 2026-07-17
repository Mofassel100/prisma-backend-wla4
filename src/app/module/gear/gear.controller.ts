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
// gear get all data
const gearGetAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await GearService.gearGetAllFromDB();
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Gear updated successfully in successfully",
    data: result,
  });
});
// gear single data
const gearSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Gear updated successfully in successfully",
    data: "",
  });
});
//  gearGetOrderFromDB
const gearGetOrderFromDB = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Gear updated successfully in successfully",
    data: "",
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

const gearUpdatedOrderFromDB = catchAsync(
  async (req: Request, res: Response) => {
    sendResponse(res, {
      success: true,
      httpStatusCode: status.OK,
      message: "Gear updated successfully in successfully",
      data: "",
    });
  },
);

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
  gearGetAllFromDB,
  gearGetOrderFromDB,
  gearSingleFromDB,
  gearUpdatedOrderFromDB,
};

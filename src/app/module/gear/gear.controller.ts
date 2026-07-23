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
  const query = req.query;
  const result = await GearService.gearGetAllFromDB(query);
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Gear retrieved in successfully",
    meta: result.meta,
    data: result.data,
  });
});

// gear single data
const gearSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GearService.gearSingleFromDB(id as string);
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Gear get single successfully in successfully",
    data: result,
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
const gearUpdatedPutFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const gearData = req.body;
  const result = await GearService.gearUpdatedPutFromDB(id as string, gearData);
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Gear updated  successfully in successfully",
    data: result,
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
  gearUpdatedPutFromDB,
  gearGetAllFromDB,
  gearGetOrderFromDB,
  gearSingleFromDB,
  gearUpdatedOrderFromDB,
};

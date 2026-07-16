import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { categoryService } from "./category.service";
import { IRequestUser } from "../../interfaces/requestUser.interface";

const categoryCreateFromDB = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IRequestUser;
  const result = await categoryService.categoryCreateFromDB(req.body, user);
  console.log(result, "Ami category controller bolteci");
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const categoryUpdatedFromDB = catchAsync(
  async (req: Request, res: Response) => {
    sendResponse(res, {
      success: true,
      httpStatusCode: status.OK,
      message: "Gear updated successfully in successfully",
      data: "",
    });
  },
);

const categoryDeletedFromDB = catchAsync(
  async (req: Request, res: Response) => {
    sendResponse(res, {
      success: true,
      httpStatusCode: status.OK,
      message: "Gear Remove in successfully !",
      data: "",
    });
  },
);
export const categoryController = {
  categoryCreateFromDB,
  categoryUpdatedFromDB,
  categoryDeletedFromDB,
};

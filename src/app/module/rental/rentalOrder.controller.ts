import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { IRequestUser } from "../../interfaces/requestUser.interface";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { RentalOrderService } from "./rentalOrder.service";

const rentalOrderCreateFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user as IRequestUser;
    const data = req.body;

    const result = await RentalOrderService.rentalOrderCreateFromDB(
      data,
      userId,
    );

    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Rental Order created successfully",
      data: result,
    });
  },
);

const rentalOrderUpdatedFromDB = catchAsync(
  async (req: Request, res: Response) => {
    sendResponse(res, {
      success: true,
      httpStatusCode: status.OK,
      message: "Gear updated successfully in successfully",
      data: "",
    });
  },
);

const rentalOdrderDeleteFromDB = catchAsync(
  async (req: Request, res: Response) => {
    sendResponse(res, {
      success: true,
      httpStatusCode: status.OK,
      message: "Gear Remove in successfully !",
      data: "",
    });
  },
);
export const RentalOrderController = {
  rentalOrderCreateFromDB,
  rentalOdrderDeleteFromDB,
  rentalOrderUpdatedFromDB,
};

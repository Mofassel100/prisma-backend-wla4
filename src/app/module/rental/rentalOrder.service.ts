import status from "http-status";
import AppError from "../../errorHepers/AppError";
import { IRequestUser } from "../../interfaces/requestUser.interface";
import { prisma } from "../../lib/prisma";
import { IRentalOrder } from "./rentalOrder.interface";
import { Role } from "../../../../generated/prisma/enums";

const rentalOrderCreateFromDB = async (
  payload: IRentalOrder,
  userId: IRequestUser,
) => {
  const IfRentalOrder = await prisma.rentalOrders.findUnique({
    where: { orderNumber: payload.orderNumber },
  });

  if (payload.orderNumber === IfRentalOrder?.orderNumber) {
    throw new AppError(
      status.CONFLICT,
      "same order id plase enter new orderNumber",
    );
  }

  const result = await prisma.rentalOrders.create({
    data: {
      orderNumber: payload.orderNumber,
      customerId: userId.userId,
      gearItemId: payload.gearItemId,
      rentalStartDate: payload.rentalStartDate,
      rentalEndDate: payload.rentalEndDate,
      pickupMethod: payload.pickupMethod,
      subtotal: payload.subtotal,
      deliveryFee: payload.deliveryFee,
      totalAmount: payload.totalAmount,
      paymentStatus: payload.paymentStatus,
      orderStatus: payload.orderStatus,
    },
    include: {
      customer: true,
      gearItem: true,
    },
  });

  return result;
};
const rentalOrderGetFromDB = async (payload: "", user: IRequestUser) => {
  const { userId } = user;

  const result = await prisma.rentalOrders.findMany({
    where: { customerId: userId },
  });
  return result;
};
const gearUpdatedFromDB = async (payload: "") => {};
const gearDeletedFromDB = async (user: "") => {};

export const RentalOrderService = {
  rentalOrderCreateFromDB,
  rentalOrderGetFromDB,
};

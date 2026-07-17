import { availableMemory } from "process";
import { IRequestUser } from "../../interfaces/requestUser.interface";
import { prisma } from "../../lib/prisma";
import { IGearItem } from "./gear.interface";

const gearCreateFromDB = async (payload: IGearItem, userId: IRequestUser) => {
  const result = await prisma.gearItem.create({
    data: {
      name: payload.name,
      model: payload.model,
      condition: payload.condition,
      brand: payload.brand,
      description: payload.description,
      stockQuantity: payload.stockQuantity,
      availableQuantity: payload.availableQuantity,
      minRentalDays: payload.minRentalDays,
      maxRentalDays: payload.maxRentalDays,
      status: payload.status,
      isAvailable: payload.isAvailable,
      categoryId: payload.categoryId,
      providerId: userId.userId,
    },
    include: {
      category: true,
      provider: true,
    },
  });
  return result;
};
const gearGetAllFromDB = async () => {
  const result = await prisma.gearItem.findMany();
  return result;
};
const gearSingleFromDB = async (id: string) => {
  const result = await prisma.gearItem.findUnique({
    where: {
      id: id,
    },
    include: {
      provider: true,
      category: true,
    },
  });
  return result;
};
const gearGetOrderFromDB = async (payload: "") => {};
const gearUpdatedOrderFromDB = async (user: "") => {};
const gearUpdatedFromDB = async (payload: "") => {};
const gearDeletedFromDB = async (user: "") => {};

export const GearService = {
  gearCreateFromDB,
  gearDeletedFromDB,
  gearUpdatedFromDB,
  gearGetAllFromDB,
  gearSingleFromDB,
  gearUpdatedOrderFromDB,
  gearGetOrderFromDB,
};

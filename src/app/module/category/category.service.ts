import { Role } from "../../../../generated/prisma/enums";
import { IRequestUser } from "../../interfaces/requestUser.interface";
import { prisma } from "../../lib/prisma";
import { ICategory } from "./category.interface";

const categoryCreateFromDB = async (payload: ICategory, user: IRequestUser) => {
  try {
    if (user.role !== Role.Admin) {
      throw new Error(
        "Unauthorized only admin , Please login admin then try again ",
      );
    }
    const userID = user.userId;
    const result = await prisma.category.create({
      data: {
        userId: userID,
        name: payload.name,
        category: payload.category,
        status: payload.status,
        sortOrder: payload.sortOrder,
        totalGearItems: payload.totalGearItems,
      },
    });
    return result;
  } catch (error) {}
};
const categoryUpdatedFromDB = async (payload: "") => {};
const categoryDeletedFromDB = async (user: "") => {};

export const categoryService = {
  categoryCreateFromDB,
  categoryDeletedFromDB,
  categoryUpdatedFromDB,
};

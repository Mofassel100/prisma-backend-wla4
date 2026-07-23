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
//

//    if (query.category) {
//      andConditions.push({
//        category: query.category,
//      });
//    }

//    if (query.brand) {
//      andConditions.push({
//        brand: query.brand,
//      });
//    }

//    if (query.categoryId) {
//      andConditions.push({
//        categoryId: query.categoryId,
//      });
//    }

//    if (query.status) {
//      andConditions.push({
//        status: query.status,
//      });
//    }

//    if (query.description) {
//      andConditions.push({
//        description: query.description,
//      });
//    }

//    const result = await prisma.gearItem.findMany({
//      where: {
//        AND: andConditions,
//      },

//      // dynamic pagination and sorting

//      take: limit,
//      skip: skip,

//      orderBy: {
//        // sortBy : sortOrder
//        [sortBy]: sortOrder,
//      },

//      include: {
//        provider: {
//          omit: {
//            password: true,
//          },
//        },
//        category: true,
//      },
//    });
//    const totalGearItemCount = await prisma.gearItem.count({
//      where: {
//        AND: andConditions,
//      },
//    });

//    return {
//      data: result,
//      meta: {
//        page: page,
//        limit: limit,
//        total: totalGearItemCount,
//        totalPages: Math.ceil(totalGearItemCount / limit),
//      },
//    };
// };

const categoryGetFromDB = async () => {
  const result = await prisma.category.findMany();
  return result;
};
const categoryUpdatedFromDB = async (payload: "") => {};
const categoryDeletedFromDB = async (user: "") => {};

export const categoryService = {
  categoryCreateFromDB,
  categoryGetFromDB,
  categoryDeletedFromDB,
  categoryUpdatedFromDB,
};

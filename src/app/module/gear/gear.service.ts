import { IRequestUser } from "../../interfaces/requestUser.interface";
import { prisma } from "../../lib/prisma";
import { IGearItem, IGearQuery } from "./gear.interface";
import { GearItemWhereInput } from "../../../../generated/prisma/models";

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
const gearGetAllFromDB = async (query: IGearQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";

  const andConditions: GearItemWhereInput[] = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          model: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (query.name) {
    andConditions.push({
      name: query.name,
    });
  }

  if (query.category) {
    andConditions.push({
      category: query.category,
    });
  }

  if (query.brand) {
    andConditions.push({
      brand: query.brand,
    });
  }

  if (query.categoryId) {
    andConditions.push({
      categoryId: query.categoryId,
    });
  }

  if (query.status) {
    andConditions.push({
      status: query.status,
    });
  }

  if (query.description) {
    andConditions.push({
      description: query.description,
    });
  }

  const result = await prisma.gearItem.findMany({
    where: {
      AND: andConditions,
    },

    // dynamic pagination and sorting

    take: limit,
    skip: skip,

    orderBy: {
      // sortBy : sortOrder
      [sortBy]: sortOrder,
    },

    include: {
      provider: {
        omit: {
          password: true,
        },
      },
      category: true,
    },
  });
  const totalGearItemCount = await prisma.gearItem.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    meta: {
      page: page,
      limit: limit,
      total: totalGearItemCount,
      totalPages: Math.ceil(totalGearItemCount / limit),
    },
    data: result,
  };
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

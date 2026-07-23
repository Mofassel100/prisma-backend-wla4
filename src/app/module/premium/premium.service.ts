import { GearItemWhereInput } from "../../../../generated/prisma/models";

import { prisma } from "../../lib/prisma";
import { IGearQuery } from "../gear/gear.interface";

const getPremiumContent = async (query: IGearQuery) => {
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
          brand: {
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

  if (query.status) {
    andConditions.push({
      status: query.status,
    });
  }

  andConditions.push({
    isPremium: true,
  });

  const GearResult = await prisma.gearItem.findMany({
    where: {
      AND: andConditions,
    },
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
    },
  });

  const totalGearCount = await prisma.gearItem.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: GearResult,
    meta: {
      page: page,
      limit: limit,
      total: totalGearCount,
      totalPages: Math.ceil(totalGearCount / limit),
    },
  };
};

export const premiumServices = {
  getPremiumContent,
};

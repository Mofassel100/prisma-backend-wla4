import {
  GearCondition,
  GearStatus,
  SportType,
} from "../../../../generated/prisma/enums";
import {
  GearItemModel,
  AggregateGearItem,
  GearItemWhereInput,
} from "../../../../generated/prisma/models";

export interface IGearItem {
  name: string;
  brand: string;
  model: string;
  description: string;

  sportType: SportType;
  condition: GearCondition;

  stockQuantity?: number;
  availableQuantity?: number;

  minRentalDays?: number;
  maxRentalDays?: number;

  status?: GearStatus;
  isAvailable?: boolean;

  providerId: string;
  categoryId: string;
}
export interface IGearQuery extends GearItemWhereInput {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortOrder?: string;
  sortBy?: string;
}

import {
  GearCondition,
  GearStatus,
  SportType,
} from "../../../../generated/prisma/enums";

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

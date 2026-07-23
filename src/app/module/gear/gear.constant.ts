 
 export const gearFilterableFields = [
  "id",
  "name",
  "brand",
"model",
"desciption",
"sportType",
"condition"
,
"stockQuantity",
"stockQuantity",
"availableQuantity","maxRentalDays" ,"minRentalDays","availableQuantity"]
 export const gearSearchableFields = [
  "id",
  "name",
  "brand",
"model",
"desciption",
"sportType",
"condition"
,
"stockQuantity",
"stockQuantity",
"availableQuantity","maxRentalDays" ,"minRentalDays","availableQuantity"]
 name: string;
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
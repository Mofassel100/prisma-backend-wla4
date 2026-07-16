import { Categoroy, Status } from "../../../../generated/prisma/enums";

export interface ICategory {
  name: string;
  category?: Categoroy;
  status?: Status;
  sortOrder?: number;
  totalGearItems?: number;
}

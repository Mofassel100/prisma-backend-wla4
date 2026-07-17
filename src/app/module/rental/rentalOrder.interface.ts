import {
  OrderStatus,
  PaymentStatus,
  PickupMethod,
} from "../../../../generated/prisma/enums";

export interface IRentalOrder {
  orderNumber: string;

  customerId: string;
  gearItemId: string;

  rentalStartDate?: Date;
  rentalEndDate?: Date;

  pickupMethod?: PickupMethod;

  subtotal: number;
  deliveryFee: number;
  totalAmount: number;

  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;

  createdAt: Date;
  updatedAt: Date;
}

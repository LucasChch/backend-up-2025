// interfaces/booking.interfaces.ts
import { Document, Types } from 'mongoose';

// export interface SafetyItem {
//   type: 'casco' | 'chaleco';
//   quantity: number;
// }

// export interface BookingItem {
//   productId: string;
//   quantity: number;
//   safetyItems?: SafetyItem;
//   peopleCount: number;
// }

// export interface Booking extends Document {
//   customerId: Types.ObjectId;
//   items: BookingItem[];
//   createdAt: Date;
//   startTime: Date;
//   endTime: Date,
//   turns: number;
//   subTotal: number;
//   discountRate: number;
//   discountAmt: number;
//   total: number;
//   status: 'booked' | 'completed' | 'cancelled';
//   cancelDeadline?: Date;
//   payDeadline?: Date;
// }

export interface CreateBookingDto {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
    safetyItems?: {
      type: 'casco' | 'chaleco';
      quantity: number;
    };
    peopleCount: number;
  }[];
  startTime: Date | string;
  endTime: Date | string;
  turns: number;
  status?: 'booked' | 'completed' | 'cancelled';
}
export interface SafetyItem {
  type: 'casco' | 'chaleco';
  quantity: number;
}

export interface BookingItem {
  productId: string;
  quantity: number;
  safetyItems?: SafetyItem;
  peopleCount: number;
  turns: 1 | 2 | 3;
}

export interface CreateBookingDto {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
    turns: 1 | 2 | 3;
    safetyItems?: {
      type: 'casco' | 'chaleco';
      quantity: number;
    };
    peopleCount: number;
  }[];
  startTime: Date | string;
  endTime: Date | string;
  totalTurns: number;
  status?: 'booked' | 'refunded' | 'cancelled';
}
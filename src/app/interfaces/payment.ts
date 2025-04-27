import { Types } from 'mongoose';

export interface CreatePaymentDto {
    method: 'card' | 'cash';
    amount: number | 0;
    currency: 'ARS';
}

export interface ProcessedPaymentDto extends CreatePaymentDto {
    bookingId: Types.ObjectId;
    subTotal: number;
    discountRate: number;
    discountAmt: number;
    total: number;
    paidAt?: Date;
    dueDate?: Date;
    status: 'pending' | 'paid' | 'expired' | 'refunded';
}

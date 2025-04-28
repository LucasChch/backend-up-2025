import Payment from '../models/payment';
import { NotFoundError } from '../models/errors';

export const createPayment = async (paymentData: any) => {

    //si vengo con paymentDataDTO y hay campos que no me trae porque el usuario no los deberia conocer, se agregan aca
    //Un ej seria status
    return await Payment.create(paymentData);
}

export const getPaymentByBookingId = async (bookingId: string) => {
    return await Payment.findOne({ 'bookingId': bookingId });
}

export const getAllPayments = async () => {
    return await Payment.find();
}

export const updatePaymentStatus = async (paymentId: string, status: 'pending' | 'paid' | 'refundedTotal' | 'refundedPartial') => {
    const updatedPayment = await Payment.findByIdAndUpdate(
        paymentId,
        { status: status },
        { new: true, runValidators: true }
    );

    if (!updatedPayment) {
        throw new NotFoundError(`No se encontró la reserva con ID ${paymentId} para poder cancelarla.`);
    }
    return updatedPayment;
}
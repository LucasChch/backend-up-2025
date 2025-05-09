import Booking from '../models/booking';
import mongoose, { Types } from 'mongoose';
import { NotFoundError } from '../models/errors';

export const getBookingById = async (bookingId: string) => {
   const booking = await Booking.findById(bookingId);
   if (!booking) {
      throw new NotFoundError("No se encontró la reserva con el ID proporcionado.");
   }
   return booking;
}

export const getAllBookings = async () => {
   return await Booking.find();
}

export const getBookingsByCustomerId = async (customerId: string) => {
   return await Booking.find({'customerId': customerId});
}

export const createBooking = async (bookingData: any) => {
   const booking = new Booking(bookingData);
   return await booking.save();
}

/**
  * Devuelve la suma de `quantity` de todos los bookingItems
  * para un productId dado, que estén en estado 'booked'
  * y cuyo rango de turnos se solape con [start, end).
  */
export const getReservedCount = async (productId: string, start: Date | string, end: Date | string) => {
   const pipeline = [
      // Filtrar reservas activas y con solape de horario
      {
         $match: {
            status: { $in: ['booked'] },//, 'confirmed'] },
            startTime: { $lt: end },
            endTime: { $gt: start }
         }
      },
      // Desenrollar los items embebidos
      { $unwind: '$items' },
      // Filtrar sólo los que coinciden con productId
      { $match: { 'items.productId': new mongoose.Types.ObjectId(productId) } },
      // Sumar todas las cantidades
      {
         $group: {
            _id: null,
            totalReserved: { $sum: '$items.quantity' }
         }
      }
   ];
   const res = await Booking.aggregate(pipeline);
   return res[0]?.totalReserved ?? 0;
}

export const deleteBooking = async (bookingId: Types.ObjectId) => {
   const res = await Booking.findByIdAndDelete(bookingId);
   return res ? { success: true, deletedBooking: res } : { success: false, message: 'Booking not found' };
}

export const cancelBooking = async (bookingId: string) => {

   const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: 'cancelled' },
      { new: true, runValidators: true }
   );

   if (!updatedBooking) {
      throw new NotFoundError(`No se encontró la reserva con ID ${bookingId} para poder cancelarla.`);
   }
   return updatedBooking;
}

export const refundBooking = async (bookingId: string) => {
   const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: 'refunded' },
      { new: true, runValidators: true }
   );
   if (!updatedBooking) {
      throw new NotFoundError(`No se encontró la reserva con ID ${bookingId} para poder reembolsarla.`);
   }
   return updatedBooking;
}

export const updateBookingStatus = async (bookingId: string, status: 'cancelled' | 'refunded') => {
   const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: status },
      { new: true, runValidators: true }
   );
   if (!updatedBooking) {
      throw new NotFoundError(`No se encontró la reserva con ID ${bookingId} para poder ${status}.`);
   }
   return updatedBooking;
}
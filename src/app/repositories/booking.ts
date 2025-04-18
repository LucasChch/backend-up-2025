import Booking from '../models/booking';
import mongoose from 'mongoose';

export const createBooking = async (bookingData: any) => {
   const booking = new Booking(bookingData);
   return await booking.save();
}

/**
  * Devuelve la suma de `quantity` de todos los bookingItems
  * para un productId dado, que estén en estado 'confirmed' o 'pending'
  * y cuyo rango de turnos se solape con [start, end).
  */
export const getReservedCount = async (productId: string, start: Date | string, end: Date | string) => {
   const pipeline = [
      // Filtrar reservas activas y con solape de horario
      {
         $match: {
            status: { $in: ['booked', 'confirmed'] },
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
import Booking from '../models/booking';

export const createBooking = async (bookingData: any) => {
   const booking = new Booking(bookingData);
   return await booking.save();
}
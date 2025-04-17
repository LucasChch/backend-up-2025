import * as BookingRepository from '../repositories/booking'

export const createBooking = async (bookingData:any) => {
   return await BookingRepository.createBooking(bookingData)
}
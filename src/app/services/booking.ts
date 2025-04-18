import * as BookingRepository from '../repositories/booking'
import * as CustomerService from '../services/customer'

export const createBooking = async (bookingData:any) => {

   //valido que exista el cliente
   const customer = await CustomerService.getCustomerById(bookingData.customerId)

   return await BookingRepository.createBooking(bookingData)
}
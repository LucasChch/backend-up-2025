import * as BookingRepository from '../repositories/booking'
import * as CustomerService from '../services/customer'
import { NotFoundError } from '../models/errors'
import { CreateBookingDto } from '../interfaces/booking'

export const createBooking = async (bookingData: CreateBookingDto) => {

   //valido que exista el cliente
   const customer = await CustomerService.getCustomerById(bookingData.customerId)
   if (!customer) {
      throw new NotFoundError("El cliente que quiere hacer la reserva no existe.")
   }

   bookingData.items.forEach(item => {
      //valido que el producto exista
      //TODO: validacion
      if (!item.productId) { }
   });

   return await BookingRepository.createBooking(bookingData)
}
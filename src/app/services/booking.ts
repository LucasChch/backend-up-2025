import * as BookingRepository from '../repositories/booking'
import * as CustomerService from '../services/customer'
import * as ProductService from '../services/product'
import { NotFoundError, ValidationError } from '../models/errors'
import { CreateBookingDto } from '../interfaces/booking'

export const createBooking = async (bookingData: CreateBookingDto) => {

   //valido que exista el cliente que solicita la reserva
   const customer = await CustomerService.getCustomerById(bookingData.customerId)
   if (!customer) {
      throw new NotFoundError("El cliente que quiere hacer la reserva no existe.")
   }

   // valido que los productos que solicita en la reserva existan
   for (const item of bookingData.items) {
      const product = await ProductService.getProductById(item.productId)
      if (!product) {
         throw new NotFoundError(`El producto ${item.productId} no existe.`)
      }

      if (product.requiresSafety && (!item.safetyItems || item.safetyItems.length === 0)) {
         throw new ValidationError(`El producto ${item.productId} requiere elementos de seguridad y no se han proporcionado.`);
      }

      if(product.maxPeople < item.quantity){
         throw new ValidationError(`El producto ${item.productId} no tiene suficiente capacidad para la cantidad solicitada.`);
      }
   }

   return await BookingRepository.createBooking(bookingData)
}
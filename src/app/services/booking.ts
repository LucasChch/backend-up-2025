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

   const start = new Date(bookingData.startTime);
   const end = new Date(start.getTime() + bookingData.turns * 30 * 60 * 1000);

   // valido que los productos que solicita en la reserva existan
   for (const item of bookingData.items) {
      const product = await ProductService.getProductById(item.productId)
      if (!product) {
         throw new NotFoundError(`El producto ${item.productId} no existe.`)
      }
      // validaciones de producto
      await ProductService.validateProduct(product, item)

      const totalReserved = await BookingRepository.getReservedCount(bookingData.items[0].productId, start, end);
      if (totalReserved + item.quantity > product.stock) {
         throw new ValidationError(`El producto ${item.productId} no tiene suficiente stock para la cantidad solicitada.`);
      }
   }



   bookingData.endTime = end;
   //faltan calcular los precios
   return await BookingRepository.createBooking(bookingData)
}
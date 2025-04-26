import * as BookingRepository from '../repositories/booking'
import * as CustomerService from '../services/customer'
import * as ProductService from '../services/product'
import * as PaymentService from '../services/payment'
import { NotFoundError, ValidationError } from '../models/errors'
import { CreateBookingDto } from '../interfaces/booking'
import { CreatePaymentDto, ProcessedPaymentDto } from '../interfaces/payment'

export const createBooking = async (bookingData: CreateBookingDto, paymentData: CreatePaymentDto) => {
   // valido que exista el cliente que solicita la reserva
   const customer = await CustomerService.getCustomerById(bookingData.customerId)
   if (!customer) {
      throw new NotFoundError("El cliente que quiere hacer la reserva no existe.")
   }

   // VALIDACIONES DE PRODUCTOS

   // valido que los productos que solicita en la reserva existan
   for (const item of bookingData.items) {
      const product = await ProductService.getProductById(item.productId)
      if (!product) {
         throw new NotFoundError(`El producto ${item.productId} no existe.`)
      }
      // validaciones de producto
      await ProductService.validateProduct(product, item);

      const totalReserved = await BookingRepository.getReservedCount(bookingData.items[0].productId, bookingData.startTime, bookingData.endTime);
      if (totalReserved + item.quantity > product.stock) {
         throw new ValidationError(`El producto ${item.productId} no tiene suficiente stock para la cantidad solicitada.`);
      }
   }
   // valido que booking solo puede ser reservado hasta 48hs antes de la fecha de inicio
   const now = new Date();
   const bookingStartTime = new Date(bookingData.startTime);
   let limitBookingDate = new Date(bookingStartTime.getTime() - 48 * 60 * 60 * 1000) // limite de la reserva son 48hs antes

   // si hoy es más chico, es decir, anterior al limite calculado (tiempo de inicio de reserva - 48hs), es que todavía es muy temprano
   if (now < limitBookingDate) {
      throw new ValidationError("Las reservas solo se pueden realizar con un máximo de 48hs antes.");
   }
   // si hoy es más grande, es decir, posterior a la fecha de inicio de mi reserva, necesito una máquina del tiempo :)
   if (now > bookingStartTime) {
      throw new ValidationError("No se puede realizar una reserva en el pasado, al menos por ahora.")
   }

   let newBooking;
   try {
      newBooking = await BookingRepository.createBooking(bookingData);

      // VALIDACIONES Y CREACIÓN DEL PAGO
      const {
         subTotal,
         discountRate,
         discountAmt,
         total
      } = await PaymentService.calculatePaymentAmounts(newBooking.items);

      if (total > paymentData.amount && paymentData.method === 'card') {
         throw new ValidationError("El monto que paga el usuario es menor al total de la reserva.")
      }

      const processedPaymentData: ProcessedPaymentDto = {
         ...paymentData,
         bookingId: newBooking._id,
         subTotal,
         discountRate,
         discountAmt,
         total,
         paidAt: paymentData.method === 'card' ? new Date() : undefined,
         dueDate: paymentData.method === 'cash' ? new Date(newBooking.startTime.getTime() - 2 * 60 * 60 * 1000) : undefined, //tiene que ser hasta 2 horas antes de booking.startTime
      }
      const payment = await PaymentService.createPayment(processedPaymentData)

      return { booking: newBooking, payment }

   } catch (error) {
      // si hubo fallos con el pago elimino la reserva
      if (newBooking) {
         await BookingRepository.deleteBooking(newBooking._id);
      }
      throw error;
   }
}
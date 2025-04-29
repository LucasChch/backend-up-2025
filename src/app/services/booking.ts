import * as BookingRepository from '../repositories/booking'
import * as CustomerService from '../services/customer'
import * as ProductService from '../services/product'
import * as PaymentService from '../services/payment'
import { NotFoundError, ValidationError } from '../models/errors'
import { CreateBookingDto } from '../interfaces/booking'
import { CreatePaymentDto, ProcessedPaymentDto } from '../interfaces/payment'

export const getAllBookings = async () => {
   return await BookingRepository.getAllBookings();
}

export const createBooking = async (bookingData: CreateBookingDto, paymentData: CreatePaymentDto) => {
   // valido que exista el cliente que solicita la reserva
   const customer = await CustomerService.getCustomerById(bookingData.customerId)
   if (!customer) {
      throw new NotFoundError("El cliente que quiere hacer la reserva no existe.")
   }
   // valido que el cliente pueda tener activo solo 3 turnos totales activos entre todas las reservas
   const existingBookings = await BookingRepository.getBookingsByCustomerId(bookingData.customerId)
   if (existingBookings) {
      let totalTurnsAccumulated = 0;
      for (const booking of existingBookings) {
         totalTurnsAccumulated += booking.totalTurns;
      }
      if (totalTurnsAccumulated + bookingData.totalTurns > 3) {
         throw new ValidationError("El cliente no puede tener más de 3 turnos activos en total.");
      }
      
   }

   // VALIDACIONES DE PRODUCTOS

   // valido que la cantidad de turnos de los productos no supere el máximo permitido y sea igual al total de la reserva 
   await ProductService.validateTurns(bookingData.items, bookingData.totalTurns);

   // valido que los productos que solicita en la reserva existan
   for (const item of bookingData.items) {
      const product = await ProductService.getProductById(item.productId)
      if (!product) {
         throw new NotFoundError(`El producto ${item.productId} no existe.`)
      }
      // validaciones propias de cada producto
      await ProductService.validateProduct(product, item);

      // valido que el producto tenga stock suficiente para la cantidad y fecha solicitada
      const totalReserved = await BookingRepository.getReservedCount(bookingData.items[0].productId, bookingData.startTime, bookingData.endTime);
      if (totalReserved + item.quantity > product.stock) {
         throw new ValidationError(`El producto ${product.name} no tiene suficiente stock para la cantidad solicitada.`);
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
      // CREACIÓN DE LA RESERVA
      newBooking = await BookingRepository.createBooking(bookingData);

      // VALIDACIONES Y CREACIÓN DEL PAGO
      const {
         subTotal,
         discountRate,
         discountAmt,
         total
      } = await PaymentService.calculatePaymentAmounts(newBooking.items);

      // valido que si paga con tarjeta tiene que haber monto
      if (paymentData.method === 'card' && !paymentData.amount) {
         throw new ValidationError("Si esta reservando con tarjeta debe pagar el monto total");
      }
      // valido que el monto que paga el usuario sea mayor al total de la reserva
      // si es cash puede ser 0 entonces no valido, doy de alta el payment pero en 'peding' en cambio si es tarjeta si o si pago el total
      let paidComplete: boolean = false;
      if (paymentData.amount > 0) {
         paidComplete = await PaymentService.validateAmountPaid(paymentData.amount, total, paymentData.currency);
      }

      const processedPaymentData: ProcessedPaymentDto = {
         ...paymentData,
         bookingId: newBooking._id,
         subTotal,
         discountRate,
         discountAmt,
         total,
         paidAt: paidComplete ? new Date() : undefined,
         dueDate: !paidComplete ? new Date(newBooking.startTime.getTime() - 2 * 60 * 60 * 1000) : undefined,
         status: paidComplete ? 'paid' : 'pending'
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

export const cancelBooking = async (bookingId: string) => {

   // validación de cancelación de reserva
   // primero buscamos la reserva para verificar su estado actual
   const booking = await BookingRepository.getBookingById(bookingId);
   const payment = await PaymentService.getPaymentByBookingId(bookingId);

   if (!booking) {
      throw new NotFoundError(`No se encontró la reserva con ID ${bookingId} para poder cancelarla.`);
   }

   // verificamos si ya está cancelada
   if (booking.status === 'cancelled') {
      return {
         message: `La reserva con ID ${bookingId} ya se encontraba cancelada.`,
         booking
      };
   }

   // valido que la cancelación tenga por lo menos 2 horas antes que comience la reserva
   const now = new Date();
   const bookingCancelLimitTime = new Date(booking.startTime.getTime() - 2 * 60 * 60 * 1000) // limite de la cancelación son 2hs antes;
   let message;
   let updatedPayment;

   // si la reserva se cancela con menos de 2hs de anticipación
   if (now > bookingCancelLimitTime) {
      // si la reserva a cancelar ya fue pagada
      if (payment?.status === 'paid') {
         const refund = Number(payment.total) * 0.5;
         updatedPayment = await PaymentService.updatePaymentStatus(payment._id.toString(), 'refundedPartial');
         message = "La reserva se está cancelando con menos de 2hs de anticipación. Por lo tanto, se reintegrará el 50% del total de la reserva. El total será: " + refund;
      }
      // si la reserva a cancelar no fue pagada todavía
      else if (payment?.status === 'pending') {
         updatedPayment = await PaymentService.updatePaymentStatus(payment._id.toString(), 'refundedPartial');
         message = "La reserva se está cancelando con menos de 2hs de anticipación. Usted no ha efectuado el pago, pero se le cobrará el 50% de todas formas."
      }
      // si la reserva se cancela con más de 2hs de anticipación
   } else {
      if (payment) {
         updatedPayment = await PaymentService.updatePaymentStatus(payment._id.toString(), 'refundedTotal');
         message = "La reserva se está cancelando con más de 2hs de anticipación. Por lo tanto, no se le cobrará nada."
      }
   }

   const bookingCancelled = await BookingRepository.cancelBooking(bookingId);
   return { response: message, bookingCancelled, updatedPayment };
}

export const refundBooking = async (bookingId: string) => {
   // busco la reserva para ver si existe y su estado
   const booking = await BookingRepository.getBookingById(bookingId);
   if (!booking) {
      throw new NotFoundError(`No se encontró la reserva con ID ${bookingId} para poder cancelarla.`);
   }
   if (booking.status === 'cancelled') {
      return {
         message: `La reserva con ID ${bookingId} ya se encontraba cancelada.`,
         booking
      };
   }
   // valido que la reserva haya sido pagada
   const payment = await PaymentService.getPaymentByBookingId(bookingId);
   if (!payment) {
      throw new NotFoundError(`No se encontró el pago asociado a la reserva con ID ${bookingId}.`);
   }
   if (payment.status !== 'paid') {
      throw new ValidationError(`La reserva con ID ${bookingId} no ha sido pagada.`);
   }

   // valido que la reserva haya sido pagada
   const refund = Number(payment.total) * 0.5;
   const updatedPayment = await PaymentService.updatePaymentStatus(payment._id.toString(), 'refundedPartial');
   const bookingRefunded = await BookingRepository.refundBooking(bookingId);

   return { response: "Se ha reintegrado el 50% del total de la reserva $" + updatedPayment.subTotal * 0.5 + " ARS por el seguro de tormenta.", bookingRefunded, updatedPayment };
}

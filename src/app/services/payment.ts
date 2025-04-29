import { CreatePaymentDto } from '../interfaces/payment';
import { ValidationError } from '../models/errors';
import * as PaymentRepository from '../repositories/payment';
import * as ProductService from '../services/product';
import * as BookingService from '../services/booking'

export const createPayment = async (paymentData: any) => {
    return await PaymentRepository.createPayment(paymentData);
}

export const getPaymentByBookingId = async (bookingId: string) => {
    return await PaymentRepository.getPaymentByBookingId(bookingId);
}

export const getAllPayments = async () => {
    return await PaymentRepository.getAllPayments();
}

export const calculatePaymentAmounts = async (bookingItems: any[]) => {

    // Inicializo las variables
    let subTotal = 0;
    let discountRate = bookingItems.length > 1 ? 0.1 : 0; // 10% de descuento si hay más de un producto DISTINTO
    let discountAmt = 0;
    let total = 0;

    try {
        // por cada item de la reserva busco el producto para saber su precio
        for (const item of bookingItems) {
            let product = await ProductService.getProductById(item.productId);
            if (!product) {
                throw new Error(`El producto ${item.productId} no existe.`);
            }
            subTotal += product.pricePerTurn * item.quantity * item.turns; // precio del producto por la cantidad de items alquilado por la cantidad de turnos
        }

        if (discountRate > 0) {
            discountAmt = subTotal * discountRate;
        }

        total = subTotal - discountAmt;

        return {
            subTotal,
            discountRate,
            discountAmt,
            total
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "formato de datos inválido";
        throw new ValidationError("Error al calcular el monto del pago: " + errorMessage);
    }
}

export const validateAmountPaid = async (amountPaid: number, total: number, currency: 'ARS' | 'USD' | 'EUR') => {

    //hago simulación  de una conversión de precios de monedas
    if (currency === 'USD' || currency === 'EUR') {
        amountPaid = amountPaid * 1000;
    }

    if (total > amountPaid) {
        throw new ValidationError("El monto que paga el usuario es menor al total de la reserva. El total a pagar es $" + total + " ARS.");
    }

    return true;
}

export const updatePaymentStatus = async (paymentId: string, status: 'pending' | 'paid' | 'refundedTotal' | 'refundedPartial') => {
    return await PaymentRepository.updatePaymentStatus(paymentId, status);
}

export const payPaymentWithCash = async (bookingId: string, paymentData: CreatePaymentDto) => {
    const payment = await PaymentRepository.getPaymentByBookingId(bookingId);

    if (!payment) {
        throw new ValidationError("No se encontró el pago asociado a la reserva.");
    }

    const booking = await BookingService.getBookingById(bookingId);
    if (!booking) {
        throw new ValidationError("No se encontró la reserva asociada al pago.");
    }
    // valido que si el pago se está efectuando con menos de dos horas de anticipación no se pueda pagar, utilizo dueDate
    if (payment.dueDate) {
        const now = new Date();
        const diff = payment.dueDate.getTime() - now.getTime();
        const diffHours = Math.ceil(diff / (1000 * 60 * 60));
        console.log("diffHours", diffHours);
        if (diffHours < 2) {
            await BookingService.updateBookingStatus(bookingId, 'cancelled');
            throw new ValidationError("No se puede pagar la reserva con menos de 2 horas de anticipación.");
        }
    }

    const paidComplete = await validateAmountPaid(paymentData.amount, payment.total, paymentData.currency);

    if (paidComplete) {
        await PaymentRepository.updatePaymentCurrency(payment._id.toString(), paymentData.currency);
        return await updatePaymentStatus(payment._id.toString(), 'paid');
    }
}
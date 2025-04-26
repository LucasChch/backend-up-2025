import * as PaymentRepository from '../repositories/payment';

export const createPayment = async (paymentData:any) => {
    return await PaymentRepository.createPayment(paymentData);
}

export const calculatePaymentAmounts = async (bookingItems: any) => {

    // Inicializo las variables
    let subTotal = 0;
    let discountRate = bookingItems.length > 1 ? 0.1 : 0; // 10% de descuento si hay más de un producto DISTINTO
    let discountAmt = 0;
    let total = 0;

    for (const item of bookingItems.items) {
        subTotal += item.product.price * item.quantity;
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
}
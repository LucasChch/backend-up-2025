import Payment from '../models/payment';

export const createPayment = async (paymentData: any) => {

    //si vengo con paymentDataDTO y hay campos que no me trae porque el usuario no los deberia conocer, se agregan aca
    //Un ej seria status
    return await Payment.create(paymentData);
}
import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
   bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true
   },
   paidAt: {
      type: Date,
      default: Date.now
   },
   amount: {
      type: Number,
      required: true
   },
   currency: {
      type: String,
      required: true
   },
   method: {
      type: String,
      required: true
   },
   status: {
      type: String,
      required: true
   },
});

export default mongoose.model('Payment', PaymentSchema);
import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
   bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true
   },
   paidAt: {
      type: Date
   },
   amount: {
      type: Number,
      required: true
   },
   dueDate: {
      type: Date,
      required: function (this: any) { return this.method === 'cash'; }
   },
   currency: {
      type: String,
      required: true,
      enum: ['ARS','USD', 'EUR']
   },
   method: {
      type: String,
      required: true,
      enum: ['card', 'cash']
   },
   status: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'expired', 'refunded'],
      default: 'pending'
   },
});

export default mongoose.model('Payment', PaymentSchema);
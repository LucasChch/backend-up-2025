import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
   customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
   },
   items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BookingItem',
      required: true
   }],
   createdAt: {
      type: Date,
      default: Date.now
   },
   startTime: {
      type: Date,
      required: true
   },
   turns: {
      type: Number,
      required: true
   },
   subTotal: {
      type: Number,
      required: true
   },
   discountRate: {
      type: Number,
      required: true
   },
   discountAmt: {
      type: Number,
      required: true
   },
   total: {
      type: Number,
      required: true
   },
   status: {
      type: String,
      enum: ['booked', 'completed', 'cancelled'],
      default: 'booked'
   },
   cancelDeadline: {
      type: Date
   },
   payDeadline: {
      type: Date,
   },
});

export default mongoose.model("Booking", BookingSchema);
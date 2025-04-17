import mongoose from 'mongoose';

const safetyItemSchema = new mongoose.Schema({
   type: { type: String, enum: ['casco', 'chaleco'], required: true },
   quantity: { type: Number, default: 1 }
 });
 
 const bookingItemSchema = new mongoose.Schema({
   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
   quantity: { type: Number, default: 1 },
   safetyItems: [safetyItemSchema]
 });
 

const BookingSchema = new mongoose.Schema({
   customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
   },
   items: {
      type: [bookingItemSchema],
      required: true,
   },
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
      required: true,
      min: 1,
      max: 3
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
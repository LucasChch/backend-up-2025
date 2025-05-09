import mongoose from 'mongoose';

const safetyItemSchema = new mongoose.Schema({
   type: { type: String, enum: ['casco', 'chaleco'], required: true },
   quantity: { type: Number, default: 1 }
});

const bookingItemSchema = new mongoose.Schema({
   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
   quantity: { type: Number, default: 1 },
   turns: { type: Number, default: 1, min: 1, max: 3 },
   safetyItems: { safetyItemSchema },
   peopleCount: {
      type: Number,
      required: true,
      min: [1, 'Debe haber al menos una persona usando el producto']
   },
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
   endTime: {
      type: Date,
      required: true
   },
   totalTurns: {
      type: Number,
      required: true,
      min: 1,
      max: 3
   },
   status: {
      type: String,
      enum: ['booked', 'refunded', 'cancelled'],
      default: 'booked'
   }
});

export default mongoose.model("Booking", BookingSchema);
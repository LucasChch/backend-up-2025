import mongoose from 'mongoose';

const BookingItemSchema = new mongoose.Schema({
   productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
   },
   quantity: {
      type: Number,
      required: true
   },
   safetyItems: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'BookingSafetyItem',
         required: true
      }
   ]
});

export default mongoose.model('BookingItem', BookingItemSchema);
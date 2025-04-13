import mongoose from 'mongoose';

const BookingSafetyItem = new mongoose.Schema({
   quantity: {
      type: Number,
      required: true
   }
});

export default mongoose.model('SafetyItem', BookingSafetyItem);
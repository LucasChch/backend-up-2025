import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   category: {
      type: String,
      required: true
   },
   pricePerTurn: {
      type: Number,
      required: true
   },
   maxPeople: {
      type: Number,
      required: true
   },
   requiresSafety: {
      type: Boolean,
      required: true
   },
   stock: {
      type: Number,
      default: 1
   },
   createdAt: {
      type: Date,
      default: Date.now
   }

});

export default mongoose.model('Product', ProductSchema);
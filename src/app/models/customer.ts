import moongose from 'mongoose';

const CustomerSchema = new moongose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
});

export default moongose.model('Customer', CustomerSchema);
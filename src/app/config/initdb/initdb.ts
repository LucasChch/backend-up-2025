import mongoose from 'mongoose';
import dotenv from 'dotenv';
// dotenv.config();

import Customer from '../../models/customer';
import Product from '../../models/product';
//import Booking from '../../models/booking';

const MONGO_URI = 'mongodb://localhost:27017/rentaldb'; //TODO: Cambiar a variable de entorno process.env.MONGO_URI ||

const customers = [
  { name: 'Adolin Kholin', email: 'Adolin@rental.com', phone: '111222333' },
  { name: 'Dalinar Kholin', email: 'Dalinar@rental.com', phone: '444555666' },
];

const products = [
  { name: 'JetSky', category: 'jetsky', maxPeople: 2, pricePerTurn: 10000, requiresSafety: true },
  { name: 'Cuatriciclo', category: 'cuatriciclo', maxPeople: 2, pricePerTurn: 5000, requiresSafety: true },
  { name: 'Equipo de Buceo', category: 'buceo', maxPeople: 1, pricePerTurn: 2500, requiresSafety: false },
  { name: 'Tabla de Surf (niños)', category: 'surf', maxPeople: 1, pricePerTurn: 3000, requiresSafety: false },
  { name: 'Tabla de Surf (adultos)', category: 'surf', maxPeople: 1, pricePerTurn: 6000, requiresSafety: false },
];

const bookingItems = []

// async function seedBookings(customers, products) {
//   const bookings = [];

//   const today = new Date();
//   const tomorrow = new Date(today);
//   tomorrow.setDate(today.getDate() + 1);
//   tomorrow.setHours(10, 0, 0, 0); // 10:00 AM

//   const jet = products.find(p => p.type === 'jetsky');
//   const casco = ['casco'];
//   const chaleco = ['chaleco'];

//   bookings.push({
//     customerId: customers[0]._id,
//     items: [{ productId: jet._id, quantity: 1 }],
//     safetyItems: [...casco, ...chaleco],
//     turns: 2,
//     startTime: new Date(tomorrow),
//     price: jet.price * 2,
//     paymentMethod: 'efectivo',
//     status: 'confirmed',
//   });

//   bookings.push({
//     customerId: customers[1]._id,
//     items: [
//       { productId: products.find(p => p.type === 'cuatriciclo')._id, quantity: 1 },
//       { productId: products.find(p => p.type === 'buceo')._id, quantity: 1 },
//     ],
//     safetyItems: ['casco'],
//     turns: 1,
//     startTime: new Date(tomorrow.setHours(11, 0, 0, 0)), // 11:00 AM
//     price: Math.round((6500 + 5000) * 0.9), // 10% descuento por combo
//     paymentMethod: 'usd',
//     status: 'confirmed',
//   });

//   return Booking.insertMany(bookings);
// }

async function initDB() {
  try {
    // await mongoose.connect(MONGO_URI);
    // console.log('✅ Conectado a MongoDB');

    await Promise.all([
      Customer.deleteMany(),
      Product.deleteMany(),
      //Booking.deleteMany()
    ]);

    console.log('🧹 Colecciones limpiadas');

    const insertedCustomers = await Customer.insertMany(customers);
    const insertedProducts = await Product.insertMany(products);
    console.log('👥 Clientes y 🛍️ productos insertados');

    // const insertedBookings = await seedBookings(insertedCustomers, insertedProducts);
    // console.log(`📅 ${insertedBookings.length} bookings generados`);

    //await mongoose.disconnect();
    //console.log('🚪 Base desconectada');
  } catch (err) {
    console.error('❌ Error inicializando DB:', err);
    process.exit(1);
  }
}

export default initDB;
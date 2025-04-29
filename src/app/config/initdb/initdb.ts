import Customer from '../../models/customer';
import Product from '../../models/product';
import Booking from '../../models/booking';
import Payment from '../../models/payment';


const customers = [
  { name: 'Adolin Kholin', email: 'Adolin@rental.com', phone: '111222333' },
  { name: 'Dalinar Kholin', email: 'Dalinar@rental.com', phone: '444555666' },
];

const products = [
  { name: 'JetSky', category: 'jetsky', maxPeople: 2, pricePerTurn: 10000, requiresSafety: true, stock: 1, safetyRequiredType: 'chaleco' },
  { name: 'Cuatriciclo', category: 'cuatriciclo', maxPeople: 2, pricePerTurn: 5000, requiresSafety: true, stock: 5, safetyRequiredType: 'casco' },
  { name: 'Equipo de Buceo', category: 'buceo', maxPeople: 1, pricePerTurn: 2500, requiresSafety: false, stock: 5 },
  { name: 'Tabla de Surf (niños)', category: 'surf', maxPeople: 1, pricePerTurn: 3000, requiresSafety: false, stock: 5 },
  { name: 'Tabla de Surf (adultos)', category: 'surf', maxPeople: 1, pricePerTurn: 6000, requiresSafety: false, stock: 5 },
];


async function initDB() {
  try {

    await Promise.all([
      Customer.deleteMany(),
      Product.deleteMany(),
      Booking.deleteMany(),
      Payment.deleteMany()
    ]);

    console.log('🧹 Colecciones limpiadas');

    const insertedCustomers = await Customer.insertMany(customers);
    const insertedProducts = await Product.insertMany(products);
    console.log('👥 Clientes y 🛍️ productos insertados');

  } catch (err) {
    console.error('❌ Error inicializando DB:', err);
    process.exit(1);
  }
}

export default initDB;
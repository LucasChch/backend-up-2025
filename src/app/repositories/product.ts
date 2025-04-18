import Product from '../models/product';

export const getProductById = async (productId: string) => {
   return await Product.findById(productId);
}
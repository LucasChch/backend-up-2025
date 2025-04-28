import Product from '../models/product';

export const getProductById = async (productId: string) => {
   return await Product.findById(productId);
}

export const getAllProducts = async () => {
   return await Product.find();
}
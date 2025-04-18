import * as ProductRepository from '../repositories/product';

export const getProductById = async (productId: string) => {
   return await ProductRepository.getProductById(productId);
}
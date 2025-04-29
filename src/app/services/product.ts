import { BookingItem } from '../interfaces/booking';
import { Product } from '../interfaces/product';
import { ValidationError } from '../models/errors';
import * as ProductRepository from '../repositories/product';

export const getProductById = async (productId: string) => {
   return await ProductRepository.getProductById(productId);
}

export const getAllProducts = async () => {
   return await ProductRepository.getAllProducts();
}

export const validateProduct = async (product: Product, bookingItem: BookingItem) => {
   // Validar que haya personas a utilizar el producto
   if (!bookingItem.peopleCount || bookingItem.peopleCount < 1) {
      throw new ValidationError(`Debes especificar cuántas personas van a usar el producto ${product.name}.`);
   }

   // Validar que la cantidad de personas no exceda el máximo permitido
   const maxTotalPeople = product.maxPeople * bookingItem.quantity;
   if (bookingItem.peopleCount > maxTotalPeople) {
      throw new ValidationError(`El producto ${product.name} permite como máximo ${maxTotalPeople} personas en total.`);
   }

   // Validar que si el producto requiere elementos de seguridad, se hayan proporcionado
   if (product.requiresSafety && !bookingItem.safetyItems) {
      throw new ValidationError(`El producto ${product.name} requiere elementos de seguridad y no se han proporcionado.`);
   }
   else if (!product.requiresSafety && bookingItem.safetyItems) {
      throw new ValidationError(`El producto ${product.name} no requiere elementos de seguridad y se han proporcionado.`);
   }

   if (bookingItem.safetyItems) {

      // Validar que tenga el tipo requerido (casco o chaleco)
      const requiredType = product.safetyRequiredType;
      if (requiredType !== bookingItem.safetyItems.type) {
         throw new ValidationError(`El producto ${product.name} requiere un elemento de seguridad tipo ${requiredType}.`);
      }

      // Validar que la cantidad de elementos de seguridad solicitados sea igual a la cantidad de personas
      const requiredQuantity = bookingItem.peopleCount;
      if (bookingItem.safetyItems.quantity < requiredQuantity) {
         throw new ValidationError(`Faltan elementos de seguridad tipo ${requiredType} para el producto ${product.name}. Se requieren ${requiredQuantity}, pero se proporcionaron ${bookingItem.safetyItems.quantity}.`);
      }
      else if (bookingItem.safetyItems.quantity > requiredQuantity) {
         throw new ValidationError(`Se proporcionaron demasiados elementos de seguridad tipo ${requiredType} para el producto ${product.name}. Se requieren ${requiredQuantity}, pero se proporcionaron ${bookingItem.safetyItems.quantity}.`);
      }
   };

   // Validar que haya stock suficiente del producto
   if (product.stock < bookingItem.quantity) {
      throw new ValidationError(`El producto ${bookingItem.productId} no tiene suficiente stock para la cantidad solicitada.`);
   }

}

export const validateTurns = async (products: BookingItem[], totalTurns: number) => {

   let totalReserved = 0;
   for (const product of products) {
      if (product.turns < 1 || product.turns > 3) {
         throw new ValidationError(`El producto ${product.productId} solo puede ser reservado por 1, 2 o 3 turnos.`);
      }
      totalReserved += product.turns;
   }
   if (totalReserved !== totalTurns) {
      throw new ValidationError(`La cantidad de turnos solicitados no coincide con la cantidad de turnos de los productos.`);
   }
}
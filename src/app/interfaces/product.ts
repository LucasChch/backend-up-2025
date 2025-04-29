import { Types } from 'mongoose';

export interface Product {
  _id: Types.ObjectId;
  name: string;
  stock: number;
  pricePerTurn: number;
  requiresSafety: boolean;
  maxPeople: number;
  safetyRequiredType?: 'chaleco' | 'casco';
}
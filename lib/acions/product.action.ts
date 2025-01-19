'use server';
import { PrismaClient } from '@prisma/client';
import { Product } from '../types/types';
import { convertToPlainObject } from '../utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';

export async function getLatestProducts(): Promise<Product[]> {
  const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  // Transform `Decimal` values to numbers
  const transformedData = data.map(product => ({
    ...product,
    price: product.price.toNumber(),
    rating: product.rating.toNumber(),
  }));

  return convertToPlainObject(transformedData);
}

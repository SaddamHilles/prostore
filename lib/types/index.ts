import { z } from 'zod';
import { insertProductSchema } from '../validator';
export type Nullable<T> = T | null | undefined;

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type SampleData = {
  products: Product[];
};

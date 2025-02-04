import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import ProductPrice from '../product-price';

interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='p-0 items-center'>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            priority
          />
        </Link>
      </CardHeader>
      <CardContent className='p-4 grid gap-4'>
        <div className='text-xs'>{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h3 className='text-sm font-medium'>{product.name}</h3>
        </Link>
        <div className='flex-between gap-4'>
          <p>{product.rating} ⭐</p>
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className='text-destructive dark:text-red-500'>Out Of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

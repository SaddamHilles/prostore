import ProductImages from '@/components/product/product-images';
import ProductPrice from '@/components/product/product-price';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProductBySlug } from '@/lib/acions/product.action';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}
const ProductDetailsPage = async ({ params }: Props) => {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();
  return (
    <>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-5'>
          {/* Image Column */}
          <div className='col-span-2'>
            <ProductImages images={product.images} />
          </div>
          {/* Details Column */}
          <div className='col-span-2 p-5'>
            <div className='flex flex-col gap-6'>
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className='h3-bold'>{product.name}</h1>
              <p>
                {product.rating} of {product.numReviews} Reviews
              </p>
              <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                <ProductPrice
                  value={Number(product.price)}
                  className='w-24 rounded-full bg-gray-100 text-green-700 px-5 py-2'
                />
              </div>
            </div>
            <div className='mt-10'>
              <p className='font-semibold'>Description</p>
              <p>{product.description}</p>
            </div>
          </div>
          {/* Action Column */}
          <div>
            <Card>
              <CardContent className='p-4'>
                <div className='mb-2 flex justify-between'>
                  <div>Price</div>
                  <div>
                    <ProductPrice value={Number(product.price)} />
                  </div>
                </div>
                <div className='mb-2 flex justify-between'>
                  <div>Status</div>
                  {product.stock > 0 ? (
                    <Badge variant={'outline'}>In Stock</Badge>
                  ) : (
                    <Badge variant={'destructive'}>Out of Stock</Badge>
                  )}
                </div>
                {product.stock > 0 && (
                  <div className='flex-center'>
                    <Button className='w-full mt-2'>Add to Cart</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;

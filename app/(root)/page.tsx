import ProductList from '@/components/product/product-list';
import { getLatestProducts } from '@/lib/acions/product.action';

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <div>
      <ProductList data={latestProducts} title='Newest Arrivals' limit={4} />
    </div>
  );
};

export default Homepage;

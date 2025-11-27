import { productService } from '@/services/products';
import { ProductCard } from '@/components/product-card';

export default async function Home() {
  const products = await productService.getAll();

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Destaques</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

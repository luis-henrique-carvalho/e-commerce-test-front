import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PriceTag } from './price-tag';
import { AddToCartButton } from './add-to-cart-button';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48 bg-muted">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
            </div>
            <CardHeader>
                <CardTitle className="line-clamp-2 text-lg" title={product.name}>
                    <Link href={`/product/${product.id}`} className="hover:underline">
                        {product.name}
                    </Link>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <PriceTag
                    priceInCents={product.priceInCents}
                    promotionalPriceInCents={product.promotionalPriceInCents}
                />
            </CardContent>
            <CardFooter>
                <AddToCartButton product={product} className="w-full" />
            </CardFooter>
        </Card>
    );
}

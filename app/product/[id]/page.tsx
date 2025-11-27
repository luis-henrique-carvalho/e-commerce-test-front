'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { productService } from '@/services/product.service';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PriceTag } from '@/components/price-tag';
import { useCartStore } from '@/store/cart-store';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getById(params.id as string);
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchProduct();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="grid md:grid-cols-2 gap-8">
                <Skeleton className="h-[400px] w-full rounded-lg" />
                <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>
        );
    }

    if (!product) {
        return <div>Produto não encontrado</div>;
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[400px] w-full bg-muted rounded-lg overflow-hidden">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="flex flex-col space-y-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <Badge variant="secondary" className="mb-4">
                        Lançamento
                    </Badge>
                    <PriceTag
                        priceInCents={product.priceInCents}
                        promotionalPriceInCents={product.promotionalPriceInCents}
                        className="text-2xl"
                    />
                </div>

                <Separator />

                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Descrição</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {product.description}
                    </p>
                </div>

                <div className="pt-6 mt-auto">
                    <Button
                        size="lg"
                        className="w-full md:w-auto min-w-[200px]"
                        onClick={() => addToCart(product.id)}
                    >
                        Adicionar ao Carrinho
                    </Button>
                </div>
            </div>
        </div>
    );
}

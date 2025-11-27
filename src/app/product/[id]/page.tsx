import Image from 'next/image';
import { productService } from '@/services/products.service';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PriceTag } from '@/components/price-tag';
import { AddToCartButton } from '@/components/add-to-cart-button';

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;

    let product = null;

    try {
        product = await productService.getById(id);
    } catch (error) {
        console.error('Failed to fetch product', error);
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
                    <AddToCartButton
                        product={product}
                        size="lg"
                        className="w-full md:w-auto min-w-[200px]"
                    />
                </div>
            </div>
        </div>
    );
}

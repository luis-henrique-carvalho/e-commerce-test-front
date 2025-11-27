'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { Product } from '@/types';

interface AddToCartButtonProps {
    product: Product;
    className?: string;
    size?: "default" | "sm" | "lg" | "icon";
}

export function AddToCartButton({ product, className, size = "default" }: AddToCartButtonProps) {
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <Button
            size={size}
            className={className}
            onClick={() => addToCart(product.id)}
        >
            Adicionar ao Carrinho
        </Button>
    );
}

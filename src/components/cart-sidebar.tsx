'use client';

import { useEffect } from 'react';
import { Trash2, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { formatCurrency } from '@/lib/utils';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
    SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export function CartSidebar() {
    const {
        cart,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        fetchCart,
        isLoading
    } = useCartStore();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cart && cart.itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cart.itemCount}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md p-4 flex flex-col">
                <SheetHeader>
                    <SheetTitle>Seu Carrinho</SheetTitle>
                    <SheetDescription className="sr-only">
                        Gerencie os itens do seu carrinho de compras
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-hidden mt-4">
                    {!cart || cart.items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                            <ShoppingCart className="h-12 w-12 mb-2 opacity-20" />
                            <p>Seu carrinho está vazio</p>
                        </div>
                    ) : (
                        <ScrollArea className="h-full pr-4">
                            <div className="space-y-4">
                                {cart.items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted shrink-0">
                                            <Image
                                                src={item.product.imageUrl}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-medium line-clamp-2 text-sm">
                                                    {item.product.name}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => addToCart(item.product.id, -1)}
                                                        disabled={isLoading || item.quantity <= 1}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="text-sm font-medium min-w-[2ch] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => addToCart(item.product.id, 1)}
                                                        disabled={isLoading}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold">
                                                    {formatCurrency(item.subtotalInCents)}
                                                </span>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => removeFromCart(item.id)}
                                                    disabled={isLoading}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </div>

                {cart && cart.items.length > 0 && (
                    <div className="mt-auto pt-4">
                        <Separator className="mb-4" />
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-medium">Total</span>
                            <span className="text-xl font-bold">
                                {formatCurrency(cart.totalInCents)}
                            </span>
                        </div>
                        <SheetFooter>
                            <Button className="w-full" size="lg">
                                Finalizar Compra
                            </Button>
                        </SheetFooter>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}

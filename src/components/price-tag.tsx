import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface PriceTagProps {
    priceInCents: number;
    promotionalPriceInCents?: number;
    className?: string;
}

export function PriceTag({ priceInCents, promotionalPriceInCents, className }: PriceTagProps) {
    if (promotionalPriceInCents) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground line-through">
                        {formatCurrency(priceInCents)}
                    </span>
                    <span className="text-lg font-bold text-primary">
                        {formatCurrency(promotionalPriceInCents)}
                    </span>
                </div>
                <Badge variant="destructive" className="h-fit">Promoção</Badge>
            </div>
        );
    }

    return (
        <div className={className}>
            <span className="text-lg font-bold">
                {formatCurrency(priceInCents)}
            </span>
        </div>
    );
}

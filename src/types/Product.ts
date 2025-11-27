export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  priceInCents: number;
  promotionalPriceInCents?: number;
  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  priceInCents: number;
  promotionalPriceInCents?: number;
  createdAt: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
  unitPriceInCents: number;
  subtotalInCents: number;
}

export interface Cart {
  items: CartItem[];
  totalInCents: number;
  itemCount: number;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}

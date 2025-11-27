import { Product } from "./Product";

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

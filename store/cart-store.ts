import { create } from 'zustand';
import { Cart } from '@/types';
import { cartService } from '@/services/cart.service';

interface CartState {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  toggleSidebar: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isOpen: false,
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const cart = await cartService.getCart();
      set({ cart });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: async (productId: number, quantity = 1) => {
    set({ isLoading: true });
    try {
      await cartService.addToCart(productId, quantity);
      await get().fetchCart();
      set({ isOpen: true }); // Open sidebar on add
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  removeFromCart: async (itemId: number) => {
    set({ isLoading: true });
    try {
      await cartService.removeFromCart(itemId);
      await get().fetchCart();
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));

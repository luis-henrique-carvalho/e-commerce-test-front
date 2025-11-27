import { api } from "./api";
import { ApiResponse, Cart } from "@/types";

export const cartService = {
  getCart: async (): Promise<Cart> => {
    const response = await api.get<ApiResponse<Cart>>("/cart");
    return response.data.data;
  },

  addToCart: async (productId: number, quantity: number = 1) => {
    const response = await api.post<ApiResponse<Cart>>("/cart/add", {
      productId,
      quantity,
    });
    return response.data.data;
  },

  removeFromCart: async (itemId: number) => {
    await api.delete(`/cart/${itemId}`);
  },
};

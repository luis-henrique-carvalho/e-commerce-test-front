import { api } from "../lib/api";
import { ApiResponse, Product } from "@/types";

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<ApiResponse<Product[]>>("/products");
    return response.data.data;
  },

  getById: async (id: number | string): Promise<Product> => {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  },
};

import { api } from "../lib/api";
import { ApiResponse, Product } from "@/types";

export const productService = {
  getAll: async (): Promise<Product[]> => {
    // The user said GET /api/products
    // Assuming it returns { status: "success", data: Product[] } based on the pattern
    // But the user only showed GET /api/products/:id response.
    // Usually list endpoints return an array in data.
    const response = await api.get<ApiResponse<Product[]>>("/products");
    return response.data.data;
  },

  getById: async (id: number | string): Promise<Product> => {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  },
};

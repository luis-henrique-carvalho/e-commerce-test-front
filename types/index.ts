export * from "./Product";
export * from "./Cart";

export interface ApiResponse<T> {
  status: string;
  data: T;
}

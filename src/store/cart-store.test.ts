import { renderHook, act, waitFor } from "@testing-library/react";
import { useCartStore } from "./cart-store";
import { cartService } from "@/services/cart.service";

jest.mock("@/services/cart.service", () => ({
  cartService: {
    getCart: jest.fn(),
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
  },
}));

const mockCart = {
  id: 1,
  items: [
    {
      id: 1,
      quantity: 1,
      subtotalInCents: 1000,
      product: {
        id: 1,
        name: "Test Product",
        priceInCents: 1000,
        imageUrl: "/img.jpg",
      },
    },
  ],
  totalInCents: 1000,
  itemCount: 1,
};

describe("useCartStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCartStore.setState({ cart: null, isOpen: false, isLoading: false });
  });

  it("should fetch cart successfully", async () => {
    (cartService.getCart as jest.Mock).mockResolvedValue(mockCart);

    const { result } = renderHook(() => useCartStore());

    await act(async () => {
      await result.current.fetchCart();
    });

    expect(result.current.cart).toEqual(mockCart);
    expect(result.current.isLoading).toBe(false);
  });

  it("should add item to cart and open sidebar", async () => {
    (cartService.addToCart as jest.Mock).mockResolvedValue({});
    (cartService.getCart as jest.Mock).mockResolvedValue(mockCart);

    const { result } = renderHook(() => useCartStore());

    await act(async () => {
      await result.current.addToCart(1, 1);
    });

    expect(cartService.addToCart).toHaveBeenCalledWith(1, 1);
    expect(cartService.getCart).toHaveBeenCalled();
    expect(result.current.isOpen).toBe(true);
  });

  it("should remove item from cart", async () => {
    (cartService.removeFromCart as jest.Mock).mockResolvedValue({});
    (cartService.getCart as jest.Mock).mockResolvedValue({
      ...mockCart,
      items: [],
    });

    const { result } = renderHook(() => useCartStore());

    await act(async () => {
      await result.current.removeFromCart(1);
    });

    expect(cartService.removeFromCart).toHaveBeenCalledWith(1);
    expect(cartService.getCart).toHaveBeenCalled();
  });

  it("should toggle sidebar", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.isOpen).toBe(false);
  });
});

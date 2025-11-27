import { render, screen, fireEvent } from '@testing-library/react';
import { CartSidebar } from './cart-sidebar';
import { useCartStore } from '@/store/cart-store';

jest.mock('@/store/cart-store');

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ fill, ...props }: any) => <img {...props} alt={props.alt} />,
}));

jest.mock('lucide-react', () => ({
    Trash2: () => <div data-testid="trash-icon" />,
    ShoppingCart: () => <div data-testid="cart-icon" />,
    Plus: () => <div data-testid="plus-icon" />,
    Minus: () => <div data-testid="minus-icon" />,
    XIcon: () => <div data-testid="close-icon" />,
}));

const mockCart = {
    id: 1,
    items: [
        {
            id: 101,
            quantity: 2,
            subtotalInCents: 2000,
            product: {
                id: 1,
                name: 'Test Product',
                priceInCents: 1000,
                imageUrl: '/img.jpg',
            },
        },
    ],
    totalInCents: 2000,
    itemCount: 2,
};

describe('CartSidebar', () => {
    const mockSetIsOpen = jest.fn();
    const mockAddToCart = jest.fn();
    const mockRemoveFromCart = jest.fn();
    const mockFetchCart = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            cart: mockCart,
            isOpen: true,
            setIsOpen: mockSetIsOpen,
            addToCart: mockAddToCart,
            removeFromCart: mockRemoveFromCart,
            fetchCart: mockFetchCart,
            isLoading: false,
        });
    });

    it('renders cart items correctly', () => {
        render(<CartSidebar />);

        expect(screen.getByText('Seu Carrinho')).toBeInTheDocument();
        expect(screen.getByText('Test Product')).toBeInTheDocument();

        const quantityElements = screen.getAllByText('2');
        expect(quantityElements.length).toBeGreaterThanOrEqual(1);
    });

    it('calls addToCart when incrementing quantity', () => {
        render(<CartSidebar />);

        const plusButton = screen.getByTestId('plus-icon').closest('button');
        expect(plusButton).toBeInTheDocument();

        if (plusButton) {
            fireEvent.click(plusButton);
            expect(mockAddToCart).toHaveBeenCalledWith(1, 1);
        }
    });

    it('displays empty state when cart is empty', () => {
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            cart: { items: [], itemCount: 0, totalInCents: 0 },
            isOpen: true,
            setIsOpen: mockSetIsOpen,
            addToCart: mockAddToCart,
            removeFromCart: mockRemoveFromCart,
            fetchCart: mockFetchCart,
            isLoading: false,
        });

        render(<CartSidebar />);

        expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
    });
});

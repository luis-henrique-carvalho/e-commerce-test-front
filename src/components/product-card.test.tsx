import { render, screen } from '@testing-library/react';
import { ProductCard } from './product-card';
import { Product } from '@/types';

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ fill, ...props }: any) => {
        return <img {...props} alt={props.alt} />;
    },
}));

const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'A great product',
    imageUrl: '/test-image.jpg',
    priceInCents: 1000,
    promotionalPriceInCents: 800,
    createdAt: '2023-01-01',
};

describe('ProductCard', () => {
    it('renders product information correctly', () => {
        render(<ProductCard product={mockProduct} />);

        expect(screen.getByText('Test Product')).toBeInTheDocument();

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', '/test-image.jpg');
        expect(image).toHaveAttribute('alt', 'Test Product');

        const link = screen.getByRole('link', { name: /test product/i });
        expect(link).toHaveAttribute('href', '/product/1');
    });

    it('renders price tag correctly', () => {
        render(<ProductCard product={mockProduct} />);
    });
});

import Link from 'next/link';
import { CartSidebar } from './cart-sidebar';

export function Header() {
  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          TechStore
        </Link>
        <CartSidebar />
      </div>
    </header>
  );
}

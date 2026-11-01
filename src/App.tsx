import { useState } from 'react';
import { FLOWER_PRODUCTS, FlowerProduct, CartItem } from './data/flowers';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { BouquetCustomizer } from './components/BouquetCustomizer';
import { CraftSection } from './components/CraftSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';

export default function App() {
  const [products] = useState<FlowerProduct[]>(FLOWER_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    // Starter cart item to demonstrate features
    {
      product: FLOWER_PRODUCTS[0],
      quantity: 1,
      customCardText: 'С днем рождения! Пусть каждый день цветет радостью!'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<FlowerProduct | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddToCart = (product: FlowerProduct, quantity: number = 1, cardText?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          customCardText: cardText || next[existingIndex].customCardText
        };
        return next;
      }
      return [...prev, { product, quantity, customCardText: cardText }];
    });
    showToast(`Букет «${product.name}» добавлен в корзину`);
  };

  const handleAddCustomBouquetToCart = (customProduct: FlowerProduct, cardText: string) => {
    setCart((prev) => [
      ...prev,
      {
        product: customProduct,
        quantity: 1,
        customCardText: cardText,
        isCustomBouquet: true,
      }
    ]);
    showToast('Ваш авторский букет добавлен в корзину');
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCustomizer = () => {
    const el = document.getElementById('customizer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#2c2725] selection:bg-[#ecd6cc] selection:text-[#382620]">
      {/* Top Banner: Single slim banner (<= 40px) as per guidelines */}
      <aside aria-label="Специальное предложение" className="bg-[#2c2725] text-[#f2e9e2] text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wide">
        <span className="hidden sm:inline">🌸 Весенний комплимент: </span>
        <span>Бесплатная доставка при заказе от 3 500 ₽ и фирменная открытка к каждому букету</span>
      </aside>

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomizer={scrollToCustomizer}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCatalog={scrollToCatalog}
          onOpenCustomizer={scrollToCustomizer}
        />

        {/* Catalog with Filter & Search */}
        <Catalog
          products={products}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onOpenQuickView={(product) => setQuickViewProduct(product)}
        />

        {/* Interactive Florist Workshop / Bouquet Customizer */}
        <BouquetCustomizer
          onAddCustomBouquetToCart={handleAddCustomBouquetToCart}
        />

        {/* Freshness, Craft & Storage Section */}
        <CraftSection />

        {/* Real Customer Reviews Section */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Subtle Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#29221f]/95 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-xl border border-white/10 flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

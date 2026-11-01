import { ShoppingBag, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenCustomizer: () => void;
}

export function Navbar({ cartCount, cartTotal, onOpenCart, onOpenCustomizer }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e8dfd8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face, no descriptors) */}
        <a
          href="#"
          className="text-2xl sm:text-3xl font-serif-display font-semibold tracking-tight text-[#2c2725] hover:text-[#7a3e30] transition-colors whitespace-nowrap shrink-0"
        >
          Флора & Лепесток
        </a>

        {/* Zone 2: 4-5 Clean single-line text links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5c534e]">
          <a
            href="#catalog"
            className="hover:text-[#2c2725] transition-colors whitespace-nowrap shrink-0"
          >
            Каталог букетов
          </a>
          <button
            onClick={onOpenCustomizer}
            className="hover:text-[#2c2725] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-[#7a3e30]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#a85a48]" />
            Собрать свой букет
          </button>
          <a
            href="#craft"
            className="hover:text-[#2c2725] transition-colors whitespace-nowrap shrink-0"
          >
            Гарантия свежести
          </a>
          <a
            href="#reviews"
            className="hover:text-[#2c2725] transition-colors whitespace-nowrap shrink-0"
          >
            Отзывы
          </a>
          <a
            href="#contacts"
            className="hover:text-[#2c2725] transition-colors whitespace-nowrap shrink-0"
          >
            Доставка & Контакты
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action (Cart Drawer trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="Открыть корзину"
            className="group flex items-center gap-2.5 px-4 py-2.5 bg-[#2c2725] hover:bg-[#3d3633] text-[#f7f4ef] rounded-full text-xs sm:text-sm font-medium transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#e2cfc2] group-hover:scale-110 transition-transform" />
            <span>Корзина</span>
            {cartCount > 0 && (
              <span className="flex items-center gap-1 ml-1 pl-2 border-l border-white/20 tabular-nums">
                <span className="bg-[#a85a48] text-white px-1.5 py-0.2 rounded-full text-[11px] font-semibold">
                  {cartCount}
                </span>
                <span className="hidden sm:inline font-normal text-[#d6c7be]">
                  {cartTotal.toLocaleString('ru-RU')} ₽
                </span>
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

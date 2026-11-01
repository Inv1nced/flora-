import { useState } from 'react';
import { FlowerProduct } from '../data/flowers';
import { X, Check, Heart, Shield, Droplets, Ruler, Clock, ShoppingBag } from 'lucide-react';
import { FlowerImage } from './FlowerImage';

interface ProductQuickViewModalProps {
  product: FlowerProduct | null;
  onClose: () => void;
  onAddToCart: (product: FlowerProduct, quantity: number, cardText?: string) => void;
}

export function ProductQuickViewModal({ product, onClose, onAddToCart }: ProductQuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [cardText, setCardText] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, cardText);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#ebdcd3] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-[#2c2725] shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative aspect-square md:aspect-auto h-full min-h-[320px] bg-[#f5ede7]">
            <FlowerImage
              src={product.image}
              alt={product.name}
              categoryTone={product.colorTone}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-white/95 text-[#7a3e30] text-xs font-semibold px-3 py-1 rounded-md shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right: Details & Purchase Options */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center gap-2 text-xs text-[#8c796e] mb-2">
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>Оттенок: {product.colorTone}</span>
              </div>

              <h3 className="text-2xl font-serif-display font-medium text-[#26201e]">
                {product.name}
              </h3>

              <div className="mt-2 flex items-baseline gap-2.5">
                <span className="text-2xl font-bold text-[#7a3e30] tabular-nums">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#a39288] line-through tabular-nums">
                    {product.originalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs sm:text-sm text-[#665a53] leading-relaxed">
                {product.description}
              </p>

              {/* Exact Stems Composition */}
              <div className="mt-5 pt-4 border-t border-[#f0e6de]">
                <h4 className="text-xs font-semibold text-[#2c2725] uppercase tracking-wider mb-2">
                  Состав букета:
                </h4>
                <ul className="space-y-1.5 text-xs text-[#5f524c]">
                  {product.composition.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a85a48] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications Pills */}
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-[#6e5f57] bg-[#faf6f3] p-3 rounded-xl border border-[#ebdcd3]">
                <div className="flex items-center gap-2">
                  <Ruler className="w-3.5 h-3.5 text-[#7a3e30]" />
                  <span>Ø {product.dimensions.width} см · выс. {product.dimensions.height} см</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#7a3e30]" />
                  <span>Стойкость: {product.vaseLife}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5 text-[#7a3e30]" />
                  <span>Аквапак в дорогу</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#7a3e30]" />
                  <span>Подкормка Chrysal</span>
                </div>
              </div>

              {/* Optional Gift Note */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#2c2725] mb-1.5 flex items-center gap-1.5">
                  <Heart className="w-3 h-3 text-[#a85a48]" />
                  <span>Текст бесплатной открытки (по желанию):</span>
                </label>
                <input
                  type="text"
                  maxLength={100}
                  value={cardText}
                  onChange={(e) => setCardText(e.target.value)}
                  placeholder="Например: Любимой маме с днем рождения!"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#e0d3c9] rounded-lg text-[#2c2725] placeholder:text-[#a08f85] focus:outline-none focus:border-[#7a3e30]"
                />
              </div>
            </div>

            {/* Stepper & Add to Cart button */}
            <div className="mt-6 pt-4 border-t border-[#f0e6de] flex items-center gap-3">
              <div className="flex items-center border border-[#d8c8bd] rounded-xl bg-[#faf6f3] p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#4a3f39] hover:bg-[#ebdcd3] rounded-lg font-medium cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-semibold tabular-nums text-[#2c2725]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#4a3f39] hover:bg-[#ebdcd3] rounded-lg font-medium cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                  isAdded
                    ? 'bg-[#3b6e4e] text-white'
                    : 'bg-[#2c2725] hover:bg-[#433b37] text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Добавлено в корзину!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#e0cec1]" />
                    <span>В корзину · {(product.price * quantity).toLocaleString('ru-RU')} ₽</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

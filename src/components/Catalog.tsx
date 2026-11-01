import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Eye, ShoppingBag, Check } from 'lucide-react';
import { CATEGORIES, FlowerProduct } from '../data/flowers';
import { FlowerImage } from './FlowerImage';

interface CatalogProps {
  products: FlowerProduct[];
  onAddToCart: (product: FlowerProduct) => void;
  onOpenQuickView: (product: FlowerProduct) => void;
}

export function Catalog({ products, onAddToCart, onOpenQuickView }: CatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.composition.some((c) => c.toLowerCase().includes(query)) ||
          item.colorTone.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleAdd = (product: FlowerProduct) => {
    onAddToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8c7467] font-medium mb-2">
              <span>Каталог свежих цветов</span>
              <span aria-hidden="true">·</span>
              <span>{filteredProducts.length} авторских композиций</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#29221f]">
              Коллекция авторских букетов
            </h2>
          </div>

          {/* Search Input & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-[#9c897f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Поиск по цветам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#e0d3c9] rounded-xl text-xs sm:text-sm text-[#2d2522] placeholder:text-[#a08f85] focus:outline-none focus:border-[#7a3e30] focus:ring-1 focus:ring-[#7a3e30] transition-colors"
              />
            </div>

            <div className="relative flex items-center">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#88776e] absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="pl-8 pr-8 py-2.5 bg-white border border-[#e0d3c9] rounded-xl text-xs sm:text-sm text-[#2d2522] focus:outline-none focus:border-[#7a3e30] transition-colors appearance-none cursor-pointer"
              >
                <option value="popular">По популярности</option>
                <option value="price-asc">Сначала недорогие</option>
                <option value="price-desc">Сначала премиум</option>
              </select>
            </div>
          </div>
        </div>

        {/* Interactive Category Filter Tabs (Segmented control buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2c2725] text-white shadow-xs'
                    : 'bg-[#f0e7e1] text-[#6b5f59] hover:bg-[#e6dbd3] hover:text-[#2c2725]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-[#ebdcd3] p-8">
            <p className="text-base font-serif-display text-[#594d47] italic">
              К сожалению, по запросу «{searchQuery}» ничего не найдено
            </p>
            <p className="text-xs text-[#8c7b72] mt-2">
              Попробуйте сбросить фильтры или напишите флористу в чат
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-[#7a3e30] border border-[#d6c4b8] rounded-lg hover:bg-[#faf4ef]"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isJustAdded = addedIds[product.id];
              return (
                <article
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#e8ded6] hover:border-[#dbcbbd] transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col"
                >
                  {/* Lead with imagery 65-75% of height */}
                  <div className="relative aspect-[4/3] sm:aspect-[4/3] bg-[#f5ede7] overflow-hidden">
                    <FlowerImage
                      src={product.image}
                      alt={product.name}
                      categoryTone={product.colorTone}
                      className="w-full h-full"
                    />

                    {/* Single subtle tag if present */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#523d34] text-[11px] font-medium px-2.5 py-1 rounded-md shadow-xs">
                        {product.badge}
                      </span>
                    )}

                    {/* Quick view button overlay */}
                    <button
                      onClick={() => onOpenQuickView(product)}
                      aria-label="Быстрый просмотр"
                      className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-[#2c2725] rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer hover:scale-105"
                      title="Быстрый просмотр"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Content & Metadata */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet unboxed metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#8c7a70] mb-1.5">
                        <span>{product.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.vaseLife}</span>
                      </div>

                      <h3
                        onClick={() => onOpenQuickView(product)}
                        className="text-base sm:text-lg font-serif-display font-medium text-[#26201e] hover:text-[#7a3e30] cursor-pointer transition-colors leading-snug"
                      >
                        {product.name}
                      </h3>

                      <p className="mt-2 text-xs text-[#6e615a] line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Action Baseline */}
                    <div className="mt-5 pt-4 border-t border-[#f2ebe5] flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-semibold text-[#29221f] tabular-nums">
                            {product.price.toLocaleString('ru-RU')} ₽
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#a08f86] line-through tabular-nums">
                              {product.originalPrice.toLocaleString('ru-RU')} ₽
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#917d72] block">
                          Ø {product.dimensions.width} см · выс. {product.dimensions.height} см
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdd(product)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
                          isJustAdded
                            ? 'bg-[#3b6e4e] text-white'
                            : 'bg-[#2c2725] hover:bg-[#433b37] text-white'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>В корзине!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-[#e5d4c8]" />
                            <span>В корзину</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

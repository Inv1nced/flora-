import { useState, useMemo } from 'react';
import { FlowerProduct } from '../data/flowers';
import { Sparkles, Check, Heart, Shield, RefreshCw } from 'lucide-react';

interface BouquetCustomizerProps {
  onAddCustomBouquetToCart: (product: FlowerProduct, cardText: string) => void;
}

const BASE_FLOWERS = [
  { id: 'peony-roses', name: 'Пионовидные розы Kahala', pricePerStem: 350, min: 7, defaultQty: 11, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', tone: 'Персиково-пудровый' },
  { id: 'french-peonies', name: 'Французские пионы Sarah Bernhardt', pricePerStem: 450, min: 5, defaultQty: 9, image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80', tone: 'Розовый' },
  { id: 'hydrangea', name: 'Голландская гортензия', pricePerStem: 850, min: 3, defaultQty: 3, image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80', tone: 'Голубой' },
  { id: 'white-tulips', name: 'Пионовидные тюльпаны White Heart', pricePerStem: 180, min: 11, defaultQty: 19, image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80', tone: 'Белоснежный' },
  { id: 'chamomile-field', name: 'Полевые ромашки и травы', pricePerStem: 150, min: 11, defaultQty: 15, image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80', tone: 'Солнечный' },
];

const GREENERY_OPTIONS = [
  { id: 'eucalyptus', name: 'Эвкалипт Цинерия', price: 450, desc: 'Благородный серебристый оттенок и свежий аромат' },
  { id: 'lavender', name: 'Французская лаванда', price: 380, desc: 'Пряный успокаивающий аромат' },
  { id: 'gypsophila', name: 'Белоснежная гипсофила', price: 320, desc: 'Эффект легкого парящего облака' },
  { id: 'none', name: 'Без зелени (только моно-цветы)', price: 0, desc: 'Строгий минималистичный вид' },
];

const PACKAGING_OPTIONS = [
  { id: 'craft', name: 'Крафтовая бумага + шёлковая лента', price: 250 },
  { id: 'matte-powder', name: 'Матовый пудровый фоамиран', price: 390 },
  { id: 'hatbox', name: 'Бархатная шляпная коробка с губкой', price: 950 },
  { id: 'ribbon-only', name: 'Только лента из натурального шёлка', price: 0 },
];

export function BouquetCustomizer({ onAddCustomBouquetToCart }: BouquetCustomizerProps) {
  const [selectedFlower, setSelectedFlower] = useState(BASE_FLOWERS[0]);
  const [stemCount, setStemCount] = useState(11);
  const [selectedGreenery, setSelectedGreenery] = useState(GREENERY_OPTIONS[0]);
  const [selectedPackaging, setSelectedPackaging] = useState(PACKAGING_OPTIONS[0]);
  const [cardText, setCardText] = useState('С любовью и нежностью в этот особенный день!');
  const [isSuccess, setIsSuccess] = useState(false);

  // Dynamic price calculation
  const totalPrice = useMemo(() => {
    const flowersCost = stemCount * selectedFlower.pricePerStem;
    const greeneryCost = selectedGreenery.price;
    const packagingCost = selectedPackaging.price;
    return flowersCost + greeneryCost + packagingCost;
  }, [selectedFlower, stemCount, selectedGreenery, selectedPackaging]);

  const handleSelectFlower = (flower: typeof BASE_FLOWERS[0]) => {
    setSelectedFlower(flower);
    setStemCount(flower.defaultQty);
  };

  const handleCreateAndAdd = () => {
    const customProduct: FlowerProduct = {
      id: `custom-${Date.now()}`,
      name: `Авторский букет: ${selectedFlower.name} (${stemCount} шт.)`,
      category: 'roses',
      categoryLabel: 'Индивидуальный заказ',
      price: totalPrice,
      rating: 5.0,
      reviewsCount: 1,
      image: selectedFlower.image,
      description: `Персональная сборка флористом: ${selectedFlower.name} — ${stemCount} шт., ${selectedGreenery.name}, оформление: ${selectedPackaging.name}.`,
      composition: [
        `${selectedFlower.name} — ${stemCount} шт.`,
        selectedGreenery.name,
        selectedPackaging.name,
        cardText ? `Открытка: «${cardText}»` : 'Без открытки'
      ],
      dimensions: {
        height: 45,
        width: Math.min(60, 25 + Math.round(stemCount * 1.5))
      },
      vaseLife: '8–12 дней',
      badge: 'Ваш дизайн',
      colorTone: selectedFlower.tone,
    };

    onAddCustomBouquetToCart(customProduct, cardText);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  return (
    <section id="customizer" className="py-16 sm:py-24 bg-[#f5ede7] border-y border-[#ebd8cc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/70 rounded-full text-xs font-medium text-[#7a3e30] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#a85a48]" />
            <span>Интерактивная флористическая мастерская</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#29221f]">
            Соберите уникальный букет своими руками
          </h2>
          <p className="mt-3 text-sm text-[#6c5e56]">
            Выберите любимые цветы, количество, зелень и упаковку. Флорист бережно повторит ваш рецепт и пришлет видеоотчет перед доставкой.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center: Controls (8 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#ebdcd3] shadow-sm">
            
            {/* Step 1: Base Flower */}
            <div>
              <label className="block text-sm font-semibold text-[#2b2522] mb-3">
                1. Выберите основу букета:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BASE_FLOWERS.map((flower) => {
                  const isSelected = selectedFlower.id === flower.id;
                  return (
                    <button
                      key={flower.id}
                      type="button"
                      onClick={() => handleSelectFlower(flower)}
                      className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#7a3e30] bg-[#faf4f0] ring-1 ring-[#7a3e30]'
                          : 'border-[#ebdcd3] hover:border-[#dbcabb] bg-white'
                      }`}
                    >
                      <img
                        src={flower.image}
                        alt={flower.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-[#2c2725] truncate">
                          {flower.name}
                        </div>
                        <div className="text-[11px] text-[#857368] mt-0.5 tabular-nums">
                          {flower.pricePerStem} ₽ / стебель
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#7a3e30] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Stem Quantity */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-[#2b2522]">
                  2. Количество цветов: <span className="text-[#7a3e30] font-bold tabular-nums">{stemCount} шт.</span>
                </label>
                <div className="flex gap-2">
                  {[7, 11, 19, 25, 35].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setStemCount(preset)}
                      className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer tabular-nums ${
                        stemCount === preset
                          ? 'bg-[#2c2725] text-white border-[#2c2725]'
                          : 'border-[#e0d3c9] text-[#6b5f59] hover:bg-[#faf6f3]'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="range"
                min={selectedFlower.min}
                max={51}
                step={2}
                value={stemCount}
                onChange={(e) => setStemCount(parseInt(e.target.value, 10))}
                className="w-full accent-[#7a3e30] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#938379] mt-1 tabular-nums">
                <span>минимум {selectedFlower.min} шт.</span>
                <span>роскошный пышный букет (51 шт.)</span>
              </div>
            </div>

            {/* Step 3: Greenery */}
            <div>
              <label className="block text-sm font-semibold text-[#2b2522] mb-3">
                3. Зелень и природные акценты:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GREENERY_OPTIONS.map((green) => {
                  const isSelected = selectedGreenery.id === green.id;
                  return (
                    <button
                      key={green.id}
                      type="button"
                      onClick={() => setSelectedGreenery(green)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#7a3e30] bg-[#faf4f0] ring-1 ring-[#7a3e30]'
                          : 'border-[#ebdcd3] hover:border-[#dbcabb] bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-[#2c2725]">{green.name}</span>
                        <span className="text-xs text-[#7a3e30] font-medium tabular-nums">
                          {green.price > 0 ? `+${green.price} ₽` : '0 ₽'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8a7a70] mt-1 leading-snug">{green.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Packaging */}
            <div>
              <label className="block text-sm font-semibold text-[#2b2522] mb-3">
                4. Оформление и упаковка:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PACKAGING_OPTIONS.map((pack) => {
                  const isSelected = selectedPackaging.id === pack.id;
                  return (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => setSelectedPackaging(pack)}
                      className={`p-3 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#7a3e30] bg-[#faf4f0] ring-1 ring-[#7a3e30]'
                          : 'border-[#ebdcd3] hover:border-[#dbcabb] bg-white'
                      }`}
                    >
                      <span className="text-xs font-medium text-[#2c2725] pr-2">{pack.name}</span>
                      <span className="text-xs text-[#7a3e30] font-semibold tabular-nums shrink-0">
                        {pack.price > 0 ? `+${pack.price} ₽` : 'Бесплатно'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Greeting Card Text */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-[#2b2522] flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#a85a48]" />
                  <span>5. Бесплатная открытка с вашими теплыми словами:</span>
                </label>
                <span className="text-[11px] text-[#8d7c72]">{cardText.length}/150</span>
              </div>
              <textarea
                value={cardText}
                maxLength={150}
                onChange={(e) => setCardText(e.target.value)}
                placeholder="Напишите послание, и мы аккуратно перепишем его от руки на фактурной бумаге..."
                rows={2}
                className="w-full p-3 bg-[#fdfbf9] border border-[#e2d5cb] rounded-xl text-xs sm:text-sm text-[#2c2725] placeholder:text-[#a39389] focus:outline-none focus:border-[#7a3e30] transition-colors"
              />
            </div>

          </div>

          {/* Right: Live Preview & Summary Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-5">
            <div className="bg-white p-6 rounded-2xl border border-[#ebdcd3] shadow-md">
              <div className="text-xs uppercase tracking-wider text-[#8b796e] font-semibold mb-3">
                Ваш рецепт букета
              </div>

              {/* Visual Preview */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#f4ebe3] mb-5 border border-[#e8ded6]">
                <img
                  src={selectedFlower.image}
                  alt={selectedFlower.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-xs uppercase tracking-wider font-medium text-[#ffdcd3]">
                    {selectedFlower.tone}
                  </span>
                  <h4 className="text-lg font-serif-display font-medium text-white">
                    {selectedFlower.name}
                  </h4>
                  <p className="text-xs text-white/80 mt-0.5">
                    {stemCount} шт. · {selectedGreenery.name}
                  </p>
                </div>
              </div>

              {/* Recipe breakdown */}
              <div className="space-y-2.5 text-xs text-[#524640] border-b border-[#f0e6de] pb-4 mb-4">
                <div className="flex justify-between">
                  <span>{selectedFlower.name} ({stemCount} шт.)</span>
                  <span className="font-medium tabular-nums">
                    {(stemCount * selectedFlower.pricePerStem).toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{selectedGreenery.name}</span>
                  <span className="font-medium tabular-nums">{selectedGreenery.price} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>{selectedPackaging.name}</span>
                  <span className="font-medium tabular-nums">
                    {selectedPackaging.price > 0 ? `${selectedPackaging.price} ₽` : '0 ₽'}
                  </span>
                </div>
                <div className="flex justify-between text-[#7a3e30]">
                  <span>Фирменная открытка с посланием</span>
                  <span className="font-semibold">Бесплатно</span>
                </div>
                <div className="flex justify-between text-[#7a3e30]">
                  <span>Подкормка Chrysal и аквапак</span>
                  <span className="font-semibold">В подарок</span>
                </div>
              </div>

              {/* Total & Action */}
              <div className="flex items-baseline justify-between mb-5">
                <span className="text-sm font-semibold text-[#29221f]">Итоговая стоимость:</span>
                <span className="text-2xl font-bold font-serif-display text-[#7a3e30] tabular-nums">
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>

              <button
                type="button"
                onClick={handleCreateAndAdd}
                className={`w-full py-3.5 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                  isSuccess
                    ? 'bg-[#3b6e4e] text-white'
                    : 'bg-[#2c2725] hover:bg-[#433b37] text-white'
                }`}
              >
                {isSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Букет добавлен в корзину!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#e8d5c8]" />
                    <span>Добавить букет в корзину</span>
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#88786f]">
                <Shield className="w-3.5 h-3.5 text-[#7a3e30]" />
                <span>Фото собранного букета перед отправкой в подарок</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

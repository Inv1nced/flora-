import { useState } from 'react';
import { CartItem } from '../data/flowers';
import { X, Trash2, ArrowRight, ShieldCheck, CheckCircle2, Clock, Calendar, MapPin, Phone, User } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+7 ');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('Сегодня (в течение 60-90 мин)');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Как можно скорее');
  const [orderNumber, setOrderNumber] = useState('');
  const [orderSummary, setOrderSummary] = useState<{ total: number; count: number } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeDeliveryThreshold = 3500;
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 390;
  const grandTotal = subtotal + deliveryFee;

  const handleProceedToCheckout = () => {
    setStep('checkout');
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNumber = `FL-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedOrderNumber);
    setOrderSummary({
      total: grandTotal,
      count: items.reduce((s, i) => s + i.quantity, 0),
    });
    setStep('success');
    onClearCart();
  };

  const handleReset = () => {
    setStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-[#ebdcd3] flex items-center justify-between bg-[#faf7f4]">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-serif-display font-medium text-[#2b2522]">
              {step === 'cart' && 'Ваша корзина'}
              {step === 'checkout' && 'Оформление доставки'}
              {step === 'success' && 'Заказ подтвержден'}
            </h3>
            {step === 'cart' && items.length > 0 && (
              <span className="text-xs text-[#8c7a6e] tabular-nums">
                ({items.length} {items.length === 1 ? 'букет' : 'букета'})
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="p-1.5 rounded-full hover:bg-[#ebdcd3] text-[#5e514a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          
          {/* STEP 1: CART ITEMS */}
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f6eee8] flex items-center justify-center text-[#997f71]">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h4 className="text-base font-serif-display text-[#2b2522]">Корзина пока пуста</h4>
                  <p className="text-xs text-[#82746b] mt-1 max-w-xs mx-auto">
                    Выберите авторский букет из каталога или соберите свою неповторимую композицию
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-5 py-2.5 bg-[#2c2725] text-white rounded-full text-xs font-medium hover:bg-[#453c37] transition-colors cursor-pointer"
                  >
                    Перейти к букетам
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Free delivery tracker */}
                  <div className="p-3 bg-[#faf6f3] border border-[#ebdcd3] rounded-xl text-xs text-[#5e5048]">
                    {subtotal >= freeDeliveryThreshold ? (
                      <div className="flex items-center gap-2 text-[#3b6e4e] font-medium">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Бесплатная экспресс-доставка активирована!</span>
                      </div>
                    ) : (
                      <div>
                        <span>До бесплатной доставки не хватает </span>
                        <span className="font-semibold text-[#7a3e30] tabular-nums">
                          {(freeDeliveryThreshold - subtotal).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Items list */}
                  <div className="divide-y divide-[#f2e9e2]">
                    {items.map((item) => (
                      <div key={item.product.id} className="py-3.5 flex gap-3.5 items-start">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-18 h-18 rounded-xl object-cover shrink-0 bg-[#f4ebe3] border border-[#e8dfd8]"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-[#29221f] leading-snug truncate">
                            {item.product.name}
                          </h4>
                          <div className="text-xs text-[#7a3e30] font-semibold mt-1 tabular-nums">
                            {item.product.price.toLocaleString('ru-RU')} ₽
                          </div>

                          {item.customCardText && (
                            <p className="text-[11px] text-[#86756b] italic mt-1 line-clamp-1">
                              Открытка: «{item.customCardText}»
                            </p>
                          )}

                          {/* Stepper & Remove */}
                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="flex items-center border border-[#d8c7bd] rounded-lg bg-[#faf6f3] px-1">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center text-xs text-[#4c4039] hover:text-black font-semibold cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-xs font-semibold tabular-nums text-[#2c2725]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center text-xs text-[#4c4039] hover:text-black font-semibold cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              aria-label="Удалить букет"
                              className="text-xs text-[#a6958b] hover:text-[#9e3f32] p-1 transition-colors cursor-pointer"
                              title="Удалить"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Free gifts notice */}
                  <div className="pt-2 border-t border-[#ebdcd3] space-y-1.5 text-xs text-[#73635a]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7a3e30]" />
                      <span>Аквапак с питательным раствором в подарок</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7a3e30]" />
                      <span>Фото букета перед отправкой в WhatsApp</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT FORM */}
          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handleConfirmOrder} className="space-y-4">
              <div className="bg-[#faf6f3] p-3 rounded-xl border border-[#ebdcd3] text-xs text-[#6e5d54]">
                Пожалуйста, укажите контактные данные для доставки цветов и отправки фото букета.
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2522] mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#7a3e30]" />
                  <span>Ваше имя или имя получателя *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Александра"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e0d3c9] rounded-xl text-xs sm:text-sm text-[#2c2725] focus:outline-none focus:border-[#7a3e30]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2522] mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#7a3e30]" />
                  <span>Контактный телефон *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (999) 000-00-00"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e0d3c9] rounded-xl text-xs sm:text-sm text-[#2c2725] focus:outline-none focus:border-[#7a3e30]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2522] mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7a3e30]" />
                  <span>Адрес доставки (улица, дом, кв./офис) *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="ул. Цветочная, д. 14, кв. 28"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e0d3c9] rounded-xl text-xs sm:text-sm text-[#2c2725] focus:outline-none focus:border-[#7a3e30]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2b2522] mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#7a3e30]" />
                    <span>Дата</span>
                  </label>
                  <select
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-2.5 py-2 bg-white border border-[#e0d3c9] rounded-xl text-xs text-[#2c2725] focus:outline-none focus:border-[#7a3e30]"
                  >
                    <option value="Сегодня">Сегодня</option>
                    <option value="Завтра">Завтра</option>
                    <option value="Послезавтра">Послезавтра</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2b2522] mb-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#7a3e30]" />
                    <span>Интервал</span>
                  </label>
                  <select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    className="w-full px-2.5 py-2 bg-white border border-[#e0d3c9] rounded-xl text-xs text-[#2c2725] focus:outline-none focus:border-[#7a3e30]"
                  >
                    <option value="Как можно скорее">Как можно скорее (60-90 мин)</option>
                    <option value="10:00 - 13:00">10:00 - 13:00</option>
                    <option value="13:00 - 16:00">13:00 - 16:00</option>
                    <option value="16:00 - 19:00">16:00 - 19:00</option>
                    <option value="19:00 - 22:00">19:00 - 22:00</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#7d6d64] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3b6e4e]" />
                <span>Оплата курьеру при получении картой или наличными</span>
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS STATE */}
          {step === 'success' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#e8f5ec] text-[#2e7d32] flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#3b6e4e] font-semibold">
                  Заказ успешно оформлен
                </span>
                <h4 className="text-2xl font-serif-display font-medium text-[#26201e] mt-1">
                  Заказ {orderNumber}
                </h4>
              </div>

              <div className="bg-[#faf6f3] p-4 rounded-2xl border border-[#ebdcd3] text-left text-xs space-y-2 text-[#564942]">
                <div className="flex justify-between">
                  <span className="text-[#847368]">Получатель:</span>
                  <span className="font-semibold text-[#2c2725]">{customerName || 'Клиент'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#847368]">Телефон:</span>
                  <span className="font-medium text-[#2c2725]">{customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#847368]">Адрес:</span>
                  <span className="font-medium text-[#2c2725] text-right truncate max-w-[200px]">{deliveryAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#847368]">Время доставки:</span>
                  <span className="font-medium text-[#2c2725]">{deliveryDate}, {deliveryTimeSlot}</span>
                </div>
                {orderSummary && (
                  <div className="pt-2 border-t border-[#ebdcd3] flex justify-between font-semibold text-sm text-[#2b2522]">
                    <span>Сумма к оплате:</span>
                    <span className="text-[#7a3e30] tabular-nums">{orderSummary.total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}
              </div>

              <div className="p-3 bg-[#f2ede7] rounded-xl text-xs text-[#6e5e55] leading-relaxed">
                🌸 Флорист уже подбирает самые свежие бутоны. Перед отправкой мы пришлем вам фото готового букета в мессенджер!
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 bg-[#2c2725] text-white rounded-xl text-xs font-medium hover:bg-[#433b37] transition-colors cursor-pointer"
              >
                Вернуться в магазин
              </button>
            </div>
          )}

        </div>

        {/* Footer Actions (Only for cart and checkout) */}
        {step !== 'success' && items.length > 0 && (
          <div className="p-5 border-t border-[#ebdcd3] bg-[#faf7f4] space-y-3">
            <div className="space-y-1.5 text-xs text-[#6b5c53]">
              <div className="flex justify-between">
                <span>Стоимость букетов:</span>
                <span className="font-medium tabular-nums">{subtotal.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка курьером:</span>
                <span className="font-medium tabular-nums">
                  {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#29221f] pt-2 border-t border-[#ebdcd3]">
                <span>Итого:</span>
                <span className="text-base text-[#7a3e30] font-bold tabular-nums">
                  {grandTotal.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#2c2725] hover:bg-[#433b37] text-white rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Оформить заказ</span>
                <ArrowRight className="w-4 h-4 text-[#dec9bd]" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 border border-[#d6c5b9] bg-white rounded-xl text-xs font-medium text-[#4a3e38] hover:bg-[#faf4ef] transition-colors cursor-pointer"
                >
                  Назад
                </button>
                <button
                  form="checkout-form"
                  type="submit"
                  className="flex-1 py-3 bg-[#2c2725] hover:bg-[#433b37] text-white rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                >
                  <span>Подтвердить заказ</span>
                  <CheckCircle2 className="w-4 h-4 text-[#dec9bd]" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

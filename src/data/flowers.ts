export interface FlowerProduct {
  id: string;
  name: string;
  category: 'roses' | 'seasonal' | 'hatbox' | 'mono' | 'dried';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  composition: string[];
  dimensions: {
    height: number; // cm
    width: number;  // cm
  };
  vaseLife: string; // e.g. "7–10 дней"
  badge?: string;
  colorTone: string;
  isPopular?: boolean;
}

export const CATEGORIES = [
  { id: 'all', label: 'Все букеты' },
  { id: 'roses', label: 'Розы & Пионы' },
  { id: 'seasonal', label: 'Полевые & Сезонные' },
  { id: 'hatbox', label: 'Шляпные коробки' },
  { id: 'mono', label: 'Монобукеты' },
  { id: 'dried', label: 'Сухоцветы & Эвкалипт' },
] as const;

export const FLOWER_PRODUCTS: FlowerProduct[] = [
  {
    id: 'blush-serenade',
    name: 'Нежная Серенада с пионами',
    category: 'roses',
    categoryLabel: 'Розы & Пионы',
    price: 4900,
    originalPrice: 5500,
    rating: 4.9,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=80',
    description: 'Пышный романтичный букет из кораллово-розовых пионов Sarah Bernhardt, кремовых кустовых роз и веточек серебристого эвкалипта.',
    composition: ['Пионы Sarah Bernhardt — 5 шт.', 'Кустовые пионовидные розы — 4 шт.', 'Эвкалипт цинерия — 3 ветки', 'Оксипеталум лавандовый — 2 шт.'],
    dimensions: { height: 45, width: 40 },
    vaseLife: '8–12 дней',
    badge: 'Хит сезона',
    colorTone: 'Розово-пудровый',
    isPopular: true,
  },
  {
    id: 'provence-morning',
    name: 'Утро в Провансе',
    category: 'seasonal',
    categoryLabel: 'Полевые & Сезонные',
    price: 3600,
    rating: 4.8,
    reviewsCount: 24,
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=80',
    description: 'Воздушная композиция в полевом стиле с садовой ромашкой, колокольчиками, французской лавандой и дикими травами.',
    composition: ['Ромашка садовая крупная — 9 шт.', 'Французская лаванда — 5 веток', 'Дельфиниум небесно-голубой — 3 шт.', 'Лагурус и злаки — 6 шт.'],
    dimensions: { height: 50, width: 35 },
    vaseLife: '10–14 дней',
    badge: 'Свежая поставка',
    colorTone: 'Сиренево-белый',
    isPopular: true,
  },
  {
    id: 'velvet-royale-box',
    name: 'Бархатный Шик в коробке',
    category: 'hatbox',
    categoryLabel: 'Шляпные коробки',
    price: 6800,
    originalPrice: 7400,
    rating: 5.0,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=900&q=80',
    description: 'Премиальная композиция в фактурной шляпной коробке цвета шалфея. Цветы находятся во флористической губке с водой и не требуют вазы.',
    composition: ['Французские розы сорта Kahala — 7 шт.', 'Белые ранункулюсы — 5 шт.', 'Кустовые гвоздики Caramel — 4 шт.', 'Шляпная коробка премиум — 1 шт.'],
    dimensions: { height: 35, width: 35 },
    vaseLife: '9–13 дней',
    badge: 'Премиум',
    colorTone: 'Персиково-кремовый',
    isPopular: true,
  },
  {
    id: 'hydrangea-cloud',
    name: 'Облако Небесной Гортензии',
    category: 'mono',
    categoryLabel: 'Монобукеты',
    price: 4200,
    rating: 4.9,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80',
    description: 'Объемное моно-сочетание трех шапок отборной голландской гортензии пастельного сапфирового и белоснежного оттенка в матовой упаковке.',
    composition: ['Крупная голландская гортензия — 3 соцветия', 'Дизайнерская матовая бумага — 1 уп.', 'Атласная лента ручной работы — 1 шт.'],
    dimensions: { height: 55, width: 45 },
    vaseLife: '7–11 дней',
    badge: 'Любимец флористов',
    colorTone: 'Голубой & Белоснежный',
    isPopular: true,
  },
  {
    id: 'sunset-glow',
    name: 'Закатное Сияние',
    category: 'roses',
    categoryLabel: 'Розы & Пионы',
    price: 5200,
    rating: 4.7,
    reviewsCount: 16,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    description: 'Теплый, согревающий авторский букет в теплых янтарных и коралловых оттенках. Напоминает закатное летнее солнце.',
    composition: ['Розы Cappuccino — 7 шт.', 'Кустовые пионовидные розы Juliet — 5 шт.', 'Эвкалипт Популус с ягодками — 3 ветки', 'Астильба персиковая — 3 шт.'],
    dimensions: { height: 48, width: 38 },
    vaseLife: '8–12 дней',
    colorTone: 'Медово-терракотовый',
  },
  {
    id: 'eucalyptus-cotton-nordic',
    name: 'Скандинавский Хлопок & Эвкалипт',
    category: 'dried',
    categoryLabel: 'Сухоцветы & Эвкалипт',
    price: 2900,
    rating: 4.9,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80',
    description: 'Долговечная интерьерная композиция из стабилизированного эвкалипта, натурального пушистого хлопка и сухоцветов льна.',
    composition: ['Ветки натурального хлопка — 5 шт.', 'Стабилизированный эвкалипт Baby Blue — 4 шт.', 'Лагурус молочный — 15 шт.', 'Сухоцветы льна — 10 шт.'],
    dimensions: { height: 42, width: 30 },
    vaseLife: 'До 2 лет',
    badge: 'Стойкость 2 года',
    colorTone: 'Бело-оливковый',
  },
  {
    id: 'white-truffle-tulips',
    name: 'Белые Махровые Тюльпаны',
    category: 'mono',
    categoryLabel: 'Монобукеты',
    price: 3200,
    rating: 4.8,
    reviewsCount: 27,
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=900&q=80',
    description: 'Монобукет из 25 пионовидных белых тюльпанов сорта White Heart. Хрустящие стебли, легкий весенний аромат свежести.',
    composition: ['Пионовидные белые тюльпаны — 25 шт.', 'Шелковая лента — 1 шт.', 'Крафтовая упаковка — 1 уп.'],
    dimensions: { height: 40, width: 32 },
    vaseLife: '7–10 дней',
    colorTone: 'Молочно-белый',
  },
  {
    id: 'garden-romance-basket',
    name: 'Корзина «Садовый Романс»',
    category: 'hatbox',
    categoryLabel: 'Шляпные коробки',
    price: 7900,
    originalPrice: 8600,
    rating: 5.0,
    reviewsCount: 50,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80',
    description: 'Богатая плетеная корзинка из натуральной лозы с изобилием садовых роз, маттиолы с пьянящим ароматом и эустомы.',
    composition: ['Садовые розы David Austin — 9 шт.', 'Маттиола сиреневая ароматная — 5 шт.', 'Белая эустома — 5 шт.', 'Плетеная корзина из лозы — 1 шт.'],
    dimensions: { height: 45, width: 48 },
    vaseLife: '10–14 дней',
    badge: 'Подарочный хит',
    colorTone: 'Лавандово-розовый',
    isPopular: true,
  },
  {
    id: 'crimson-velvet-roses',
    name: 'Бархатные Алые Розы Red Naomi',
    category: 'mono',
    categoryLabel: 'Монобукеты',
    price: 5900,
    rating: 4.9,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    description: 'Классика высокой флористики: 19 отборных роз сорта Red Naomi с крупным плотным бутоном и бархатистой текстурой лепестков.',
    composition: ['Розы Red Naomi Extra 70 см — 19 шт.', 'Атласная лента цвета бордо — 1 шт.'],
    dimensions: { height: 70, width: 35 },
    vaseLife: '9–14 дней',
    badge: 'Классика',
    colorTone: 'Глубокий рубиновый',
  }
];

export interface CartItem {
  product: FlowerProduct;
  quantity: number;
  customCardText?: string;
  isCustomBouquet?: boolean;
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  bouquetName: string;
  city: string;
}

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Екатерина Власова',
    date: 'Вчера',
    rating: 5,
    text: 'Заказывала «Нежную Серенаду» маме на юбилей. Цветы невероятно свежие, аромат на всю комнату! Перед доставкой прислали фото в WhatsApp, курьер приехал ровно в назначенное время.',
    bouquetName: 'Нежная Серенада с пионами',
    city: 'Москва'
  },
  {
    id: 'rev-2',
    author: 'Михаил Соколов',
    date: '3 дня назад',
    rating: 5,
    text: 'Очень удобный конструктор букета на сайте, подобрал розы и коробку. Девушка была в восторге, отдельное спасибо за аккуратную открытку с каллиграфией!',
    bouquetName: 'Бархатный Шик в коробке',
    city: 'Санкт-Петербург'
  },
  {
    id: 'rev-3',
    author: 'Анна Мельникова',
    date: 'Неделю назад',
    rating: 5,
    text: 'Гортензии простояли целых 12 дней благодаря подкормке, которую приложили к букету. Теперь за цветами только к вам!',
    bouquetName: 'Облако Небесной Гортензии',
    city: 'Москва'
  }
];

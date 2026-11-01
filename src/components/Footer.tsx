import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contacts" className="bg-[#241f1d] text-[#c9bfb8] pt-16 pb-12 border-t border-[#3b3431]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3b3431]">
          
          {/* Brand & Story (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-2xl font-serif-display font-medium text-white block">
              Флора & Лепесток
            </span>
            <p className="text-xs sm:text-sm text-[#a89b93] leading-relaxed max-w-sm">
              Цветочная мастерская с душой и вниманием к деталям. Создаем авторские композиции из свежих цветов прямо в день вашего праздника.
            </p>
            <div className="pt-2 text-xs text-[#8c7f77]">
              <span>Ежедневные утренние поставки с аукционов Нидерландов и Эквадора</span>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#d4c5bb] font-semibold">
              Разделы
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  Каталог букетов
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-white transition-colors">
                  Конструктор букета
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-white transition-colors">
                  Стандарты свежести и уход
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Отзывы клиентов
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#d4c5bb] font-semibold">
              Мастерская & Доставка
            </h4>
            <div className="space-y-2.5 text-xs text-[#a89b93]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#dec9bd] shrink-0 mt-0.5" />
                <span>г. Москва, ул. Большая Никитская, 22/2</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#dec9bd] shrink-0" />
                <span>Ежедневно с 08:00 до 22:00</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#dec9bd] shrink-0" />
                <a href="tel:+74959217144" className="text-white hover:underline tabular-nums">
                  +7 (495) 921-71-44
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#dec9bd] shrink-0" />
                <span>order@flora-lepestok.ru</span>
              </div>

              {/* Chat action button */}
              <div className="pt-2">
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#38312e] hover:bg-[#473f3b] text-white text-xs font-medium transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-[#debfae]" />
                  <span>Чат с флористом в Telegram</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#70645d]">
          <p>© {new Date().getFullYear()} «Флора & Лепесток». Все права защищены.</p>
          <p className="text-[11px]">Бережная доставка живых цветов в индивидуальных аквабоксах</p>
        </div>

      </div>
    </footer>
  );
}

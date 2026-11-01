import { Droplets, ThermometerSnowflake, Camera, Sparkles, Heart } from 'lucide-react';

export function CraftSection() {
  return (
    <section id="craft" className="py-16 sm:py-24 bg-white border-b border-[#ebdcd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-[#7a3e30] font-medium mb-2">
            <span>Стандарты мастерской</span>
            <span aria-hidden="true">·</span>
            <span>Контроль на каждом этапе</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#26201e]">
            Как мы сохраняем первозданную свежесть каждого бутона
          </h2>
          <p className="mt-3 text-sm text-[#665851] leading-relaxed">
            Мы не храним готовые букеты на витрине днями. Каждый заказ собирается непосредственно перед выездом курьера из цветов утренней поставки.
          </p>
        </div>

        {/* 4 Pillars of Craft */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 bg-[#faf6f3] rounded-2xl border border-[#ebdcd3] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white text-[#7a3e30] shadow-xs flex items-center justify-center mb-4">
                <ThermometerSnowflake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#29221f]">Холодильная камера +4°C</h3>
              <p className="mt-2 text-xs text-[#6e5f57] leading-relaxed">
                Специальный климатический режим с влажностью 85% замедляет дыхание цветов, продлевая их жизнь в вашей вазе до 2 недель.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#ebdcd3]/80 text-[11px] font-medium text-[#7a3e30]">
              01. Бережное хранение
            </div>
          </div>

          <div className="p-6 bg-[#faf6f3] rounded-2xl border border-[#ebdcd3] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white text-[#7a3e30] shadow-xs flex items-center justify-center mb-4">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#29221f]">Аквапак для перевозки</h3>
              <p className="mt-2 text-xs text-[#6e5f57] leading-relaxed">
                Стебли упаковываются во влажную мембрану с водой. Цветы не теряют тургор и не обезвоживаются во время дороги к вам.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#ebdcd3]/80 text-[11px] font-medium text-[#7a3e30]">
              02. Гидратация в пути
            </div>
          </div>

          <div className="p-6 bg-[#faf6f3] rounded-2xl border border-[#ebdcd3] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white text-[#7a3e30] shadow-xs flex items-center justify-center mb-4">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#29221f]">Фотоконтроль флориста</h3>
              <p className="mt-2 text-xs text-[#6e5f57] leading-relaxed">
                Перед отправкой курьера мы высылаем подробное фото и видео собранной композиции вам в WhatsApp или Telegram для одобрения.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#ebdcd3]/80 text-[11px] font-medium text-[#7a3e30]">
              03. Прозрачность и доверие
            </div>
          </div>

          <div className="p-6 bg-[#faf6f3] rounded-2xl border border-[#ebdcd3] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white text-[#7a3e30] shadow-xs flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#29221f]">Подкормка Chrysal</h3>
              <p className="mt-2 text-xs text-[#6e5f57] leading-relaxed">
                К каждому букету бесплатно прилагается пакетик профессионального голландского питательного концентрата и памятка по уходу.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#ebdcd3]/80 text-[11px] font-medium text-[#7a3e30]">
              04. Забота о стойкости
            </div>
          </div>

        </div>

        {/* Botanical Care Tips Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-[#f5ede7] rounded-3xl border border-[#ebdcd3] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white text-[#7a3e30] flex items-center justify-center shrink-0 shadow-xs">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-[#2b2522]">
                Простые секреты ухода за букетом дома
              </h4>
              <p className="text-xs text-[#695c55] mt-1">
                Подрезайте стебли острым ножом под углом 45°, используйте прохладную воду и меняйте её каждый день.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <span className="inline-block px-4 py-2 bg-white text-[#7a3e30] text-xs font-semibold rounded-full border border-[#ebdcd3]">
              Гарантия свежести 5 дней
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

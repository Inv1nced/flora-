import { ArrowRight, Clock, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { FlowerImage } from './FlowerImage';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenCustomizer: () => void;
}

export function Hero({ onExploreCatalog, onOpenCustomizer }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5ede7] via-[#faf8f5] to-[#faf8f5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#ebdcd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Text & Editorial Message */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-medium text-[#7a3e30] mb-4">
              <span>Сезонная авторская флористика</span>
              <span aria-hidden="true">·</span>
              <span>Поставки из Голландии и Эквадора</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-medium text-[#25201e] leading-[1.12] tracking-tight text-balance">
              Букеты со вкусом, которые трогают до глубины сердца
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#5e544f] leading-relaxed max-w-xl">
              Собираем цветочные истории из отборных пионов, садовых роз и полевых трав. Бережно доставим в аквабоксе с бесплатной открыткой и фотоотчетом перед вручением.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 bg-[#2c2725] hover:bg-[#433b37] text-white rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2 group cursor-pointer active:scale-95"
              >
                <span>Выбрать готовый букет</span>
                <ArrowRight className="w-4 h-4 text-[#e0cfc4] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCustomizer}
                className="px-6 py-3.5 bg-white hover:bg-[#f6eee7] text-[#382620] border border-[#d8c7bb] rounded-full text-sm font-medium transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#a85a48]" />
                <span>Собрать свой букет</span>
              </button>
            </div>

            {/* Trust Quote / Florist Note */}
            <div className="mt-8 pt-6 border-t border-[#ebd9cd]/80 flex items-center gap-3 text-xs text-[#736862]">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-[#e0cebf] shrink-0 border border-white">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                  alt="Главный флорист Анна"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-[#2c2725]">«Каждый цветок проходит тройную проверку свежести на утреннем приеме»</p>
                <p className="text-[#8c7e77]">Анна Романова, шеф-флорист мастерской</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Backing decorative frame */}
              <div className="absolute -inset-3 bg-[#f0e3d9] rounded-3xl transform -rotate-2 -z-10" />
              
              <div className="overflow-hidden rounded-2xl shadow-xl border border-white/60 aspect-[4/5] bg-white">
                <FlowerImage
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80"
                  alt="Премиальный букет пионов и роз"
                  className="w-full h-full object-cover"
                  categoryTone="Розово-пудровый"
                />
              </div>

              {/* Floating aesthetic feature tag */}
              <div className="absolute -bottom-5 left-6 right-6 sm:left-8 sm:right-8 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#ebd8cc] shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8b776c] font-medium block">
                    Букет недели
                  </span>
                  <span className="text-sm font-semibold text-[#29221f]">
                    Нежная Серенада с пионами
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-[#7a3e30] tabular-nums">
                    4 900 ₽
                  </span>
                  <span className="text-[11px] text-[#9c8477] block line-through tabular-nums">
                    5 500 ₽
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Proof & Trust Strip Below Hero Split */}
        <div className="mt-16 pt-8 border-t border-[#e8dfd8] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#f4ebe3] text-[#7a3e30] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#2c2725]">Доставка за 60 минут</h4>
              <p className="text-xs text-[#70645f] mt-0.5">Пунктуальные вежливые курьеры по всему городу</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#f4ebe3] text-[#7a3e30] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#2c2725]">Фото перед вручением</h4>
              <p className="text-xs text-[#70645f] mt-0.5">Согласуем букет в мессенджере перед выездом</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#f4ebe3] text-[#7a3e30] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#2c2725]">Открытка и подкормка</h4>
              <p className="text-xs text-[#70645f] mt-0.5">Бесплатно приложим открытку с вашими словами</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#f4ebe3] text-[#7a3e30] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#2c2725]">Утренняя поставка</h4>
              <p className="text-xs text-[#70645f] mt-0.5">Цветы хранятся при температуре +4°C</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

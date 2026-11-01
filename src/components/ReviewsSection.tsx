import { Star } from 'lucide-react';
import { REVIEWS } from '../data/flowers';

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs text-[#7a3e30] font-medium mb-2">
            <span>Впечатления клиентов</span>
            <span aria-hidden="true">·</span>
            <span>Рейтинг 4.9 на основе 480+ заказов</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#29221f]">
            Искренние слова тех, кто дарил и получал наши цветы
          </h2>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white rounded-2xl border border-[#ebdcd3] shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d49741] text-[#d49741]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#4c4039] leading-relaxed italic">
                  «{rev.text}»
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f2ebe5] flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-[#29221f] block">{rev.author}</span>
                  <span className="text-[11px] text-[#8c7a6e]">{rev.city}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#7a3e30] font-medium block truncate max-w-[140px]">
                    {rev.bouquetName}
                  </span>
                  <span className="text-[11px] text-[#a6968d]">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

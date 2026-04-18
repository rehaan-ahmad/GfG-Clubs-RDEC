import PageHeader from '@/components/shared/PageHeader';
import AnimatedSection from '@/components/shared/AnimatedSection';
import GlassCard from '@/components/shared/GlassCard';
import { getMerch } from '@/lib/data';

export default async function MerchPage() {
  const merch = await getMerch();

  return (
    <>
      <PageHeader
        eyebrow="Wear Your Club"
        title="Official Merch"
        subtitle="Rep your favourite student body with official merchandise — hoodies, tees, jerseys, and more."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Merch' }]}
      />

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {merch.length > 0 ? (
          <AnimatedSection
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            stagger={80}
          >
            {merch.map((item) => (
              <div key={item.id}>
                <GlassCard className="h-full flex flex-col p-6 group relative">
                  <span
                    className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      item.available
                        ? 'bg-green-500/20 text-green-600'
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {item.available ? 'Available' : 'Sold Out'}
                  </span>

                  <div className="w-full aspect-square bg-bg-alt rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-6xl opacity-30">👕</span>
                    )}
                  </div>

                  <h3 className="font-heading text-xl font-bold text-text mb-2 group-hover:text-accent transition-colors">
                    {item.name}
                  </h3>
                  {item.club && (
                    <p className="font-body text-xs font-semibold text-accent mb-2 uppercase tracking-wide">
                      {item.club.name}
                    </p>
                  )}
                  <p className="font-body text-sm text-text-muted line-clamp-2 mb-4">
                    {item.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-text/10">
                    {item.price_inr && (
                      <span className="font-heading text-2xl font-bold text-accent">
                        ₹{item.price_inr}
                      </span>
                    )}
                    {item.available && item.order_link ? (
                      <a
                        href={item.order_link}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2 rounded-lg bg-accent text-white font-button font-semibold hover:bg-opacity-90 transition-all"
                      >
                        Order Now
                      </a>
                    ) : (
                      <span className="px-5 py-2 rounded-lg bg-text/10 text-text-muted font-button font-semibold cursor-not-allowed">
                        Unavailable
                      </span>
                    )}
                  </div>
                </GlassCard>
              </div>
            ))}
          </AnimatedSection>
        ) : (
          <div className="text-center py-16 text-text-muted font-body text-lg">
            No merchandise available at the moment.
          </div>
        )}
      </div>
    </>
  );
}

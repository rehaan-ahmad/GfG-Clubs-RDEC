import Link from 'next/link';

export default function AppCTABanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 w-full">
      <div className="relative overflow-hidden rounded-2xl border border-text/10 bg-bg-alt px-8 py-14 md:px-16 md:py-16">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-3">
              Join Our Community
            </h2>
            <p className="font-body text-text-muted max-w-md">
              Connect with fellow students, stay updated on events, and be part of something bigger at RDEC.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/student-id"
              className="px-8 py-3 rounded-xl bg-accent text-white font-button text-lg font-semibold hover:bg-opacity-90 transition-all shadow-md text-center"
            >
              Apply for ID
            </Link>
            <Link
              href="/community"
              className="px-8 py-3 rounded-xl border border-accent text-accent font-button text-lg font-semibold hover:bg-accent hover:text-white transition-all text-center"
            >
              Social Links
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

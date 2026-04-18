import PageHeader from '@/components/shared/PageHeader';
import GlassCard from '@/components/shared/GlassCard';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Rameshawar Dayal Engineering College"
        subtitle="Empowering minds, shaping futures — since 2006."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About RDEC' }]}
      />

      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-16">
        <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <GlassCard hover={false} className="p-8">
              <h2 className="font-heading text-2xl font-bold text-text mb-4">About the College</h2>
              <p className="font-body text-text-muted leading-relaxed mb-4">
                Ram Devi Jindal Group of Institutions (RDEC) is a premier engineering college
                located in Haryana, India. Established with the vision of providing quality
                technical education, RDEC offers a range of undergraduate and postgraduate programs
                in engineering & technology.
              </p>
              <p className="font-body text-text-muted leading-relaxed">
                The college fosters an environment of innovation, research, and holistic
                development, producing graduates who are industry-ready and socially responsible.
              </p>
            </GlassCard>
          </div>
          <div>
            <AnimatedSection className="grid grid-cols-2 gap-4" stagger={100} delay={200}>
              <GlassCard hover={false} className="p-6 text-center">
                <div className="font-heading text-3xl font-bold text-accent mb-1">2009</div>
                <div className="font-body text-sm text-text-muted">Established</div>
              </GlassCard>
              <GlassCard hover={false} className="p-6 text-center">
                <div className="font-heading text-3xl font-bold text-accent mb-1">A+</div>
                <div className="font-body text-sm text-text-muted">NAAC Grade</div>
              </GlassCard>
              <GlassCard hover={false} className="p-6 text-center">
                <div className="font-heading text-3xl font-bold text-accent mb-1">9</div>
                <div className="font-body text-sm text-text-muted">Student Bodies</div>
              </GlassCard>
              <GlassCard hover={false} className="p-6 text-center">
                <div className="font-heading text-3xl font-bold text-accent mb-1">950+</div>
                <div className="font-body text-sm text-text-muted">Active Members</div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        <div>
          <h2 className="font-heading text-2xl font-bold text-text mb-6">Departments</h2>
          <AnimatedSection
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            stagger={60}
          >
            {[
              'Computer Science & Engineering',
              'Electronics & Communication',
              'Mechanical Engineering',
              'Civil Engineering',
              'Electrical Engineering',
              'Applied Sciences & Humanities',
            ].map((dept, i) => (
              <div key={i}>
                <GlassCard className="p-5">
                  <h3 className="font-body font-semibold text-text">{dept}</h3>
                </GlassCard>
              </div>
            ))}
          </AnimatedSection>
        </div>

        <div>
          <h2 className="font-heading text-2xl font-bold text-text mb-6">Contact Information</h2>
          <AnimatedSection>
            <GlassCard hover={false} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-body">
                <div>
                  <h4 className="font-semibold text-text mb-2">📍 Address</h4>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Rameshwar Dayal Engineering College,
                    <br />
                    Ghaziabad, India
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-text mb-2">📞 Phone</h4>
                  <p className="text-text-muted text-sm">+91 XXXXX XXXXX</p>
                </div>
                <div>
                  <h4 className="font-semibold text-text mb-2">📧 Email</h4>
                  <p className="text-text-muted text-sm">info@rdec.edu.in</p>
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>

        <div className="text-center">
          <a
            href="https://rdec.edu.in"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-10 py-4 rounded-xl bg-accent text-white font-button text-xl font-semibold hover:scale-[1.03] transition-transform shadow-xl"
          >
            Visit Official Website →
          </a>
        </div>
      </div>
    </>
  );
}

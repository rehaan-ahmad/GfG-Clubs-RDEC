import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-text/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <h3 className="font-heading text-2xl font-bold text-accent mb-2">RDEC Portal</h3>
          <p className="font-body text-text-muted">
            Official portal for RDEC student clubs and organizations.
          </p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end gap-6 font-body text-text font-medium">
          <Link href="/about" className="hover:text-accent transition-colors">
            About RDEC
          </Link>
          <Link href="/community" className="hover:text-accent transition-colors">
            Community Links
          </Link>
          <a
            href="https://rdec.edu.in"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition-colors"
          >
            Official Website
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center mt-12 py-6 border-t border-text/5 text-sm font-body tracking-wider text-text-muted uppercase">
        &copy; {new Date().getFullYear()} RDEC. All rights reserved.
      </div>
    </footer>
  );
}

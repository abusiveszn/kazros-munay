import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-navy border-t border-parchment/10">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-12">
          {/* Subscribe */}
          <div className="lg:w-1/2">
            <h4 className="text-parchment text-lg font-medium uppercase tracking-[0.08em] mb-4">
              Subscribe
            </h4>
            <form onSubmit={handleSubscribe} className="flex items-end gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-parchment/20 text-parchment py-2 px-0 focus:outline-none focus:border-gold transition-colors duration-200 text-sm placeholder:text-parchment/30"
                />
              </div>
              <button
                type="submit"
                className="text-gold text-sm font-medium bg-transparent border-none cursor-pointer hover:underline shrink-0"
              >
                Sign up
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div className="lg:w-1/2 flex justify-start lg:justify-end gap-8">
            {[
              { label: 'Products', id: 'products' },
              { label: 'About', id: 'about' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-parchment/50 hover:text-parchment text-sm bg-transparent border-none cursor-pointer transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="text-center border-t border-parchment/10 pt-8">
          <p className="text-parchment/30 text-xs mb-2">
            Copyright &copy; 2025 Kazros Munay LLC &mdash; All Rights Reserved.
          </p>
          <p className="text-parchment/20 text-[0.6875rem]">
            This website uses cookies to analyze traffic and optimize your experience.
          </p>
        </div>
      </div>
    </footer>
  );
}

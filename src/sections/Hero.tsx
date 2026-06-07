import { useRef, useEffect, useState } from 'react';
import HeroCarousel from './HeroCarousel';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [headerBg, setHeaderBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderBg(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="hero" className="relative w-full min-h-[100dvh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(10, 22, 40, 0.85) 0%, rgba(10, 22, 40, 0.3) 100%)',
        }}
      />

      {/* 3D Carousel */}
      <div className="absolute inset-0 z-[2] opacity-40">
        <HeroCarousel />
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-[5vw] transition-all duration-300 ${
          headerBg ? 'bg-navy/95 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <img 
          src="/images/logo.png" 
          alt="Kazros Munay Logo" 
          className="h-16 w-auto object-contain"
        />
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Products', id: 'products' },
            { label: 'About', id: 'about' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-parchment/60 hover:text-parchment text-[0.8125rem] font-normal uppercase tracking-[0.1em] transition-colors duration-300 bg-transparent border-none cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Hero Content */}
      <div className="relative z-[3] flex flex-col justify-end min-h-[100dvh] pb-[8vh] px-[5vw]">
        <div className="max-w-[600px]">
          <p className="section-label mb-4">Global Energy Solutions</p>
          <h1
            className="font-display text-[clamp(3rem,8vw,6rem)] font-normal leading-[0.95] tracking-[-0.02em] text-parchment mb-6"
          >
            Fueling the Future of Energy
          </h1>
          <p className="body-large text-parchment/70 max-w-[480px] mb-8">
            Your trusted partner in oil and gas solutions worldwide.
          </p>
          <button
            onClick={() => scrollTo('contact')}
            className="text-link-gold bg-transparent border-none cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center">
        <div className="w-[1px] h-10 bg-parchment/30 relative overflow-hidden">
          <div className="w-1 h-1 rounded-full bg-parchment/60 absolute left-1/2 -translate-x-1/2 animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
}

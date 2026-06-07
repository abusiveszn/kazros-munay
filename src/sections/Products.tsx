import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  code: string;
  name: string;
  description: string;
  details: string[];
  image: string;
}

const products: Product[] = [
  {
    code: 'EN590',
    name: 'EN590 Diesel (10ppm ULSD)',
    description:
      'Ultra-low sulfur diesel that meets European standards. Preferred for its cleaner combustion and compatibility with modern engines.',
    details: [
      'Ideal for fleets, heavy equipment, and marine applications',
      '10ppm sulfur content',
      'European EN590 specification',
    ],
    image: '/images/card-en590.jpg',
  },
  {
    code: 'JET A1',
    name: 'Jet A1 Aviation Fuel',
    description:
      'Kerosene-grade aviation fuel used globally in commercial airliners and cargo jets. Manufactured to stringent ASTM D1655 / DEF STAN 91-91 standards.',
    details: [
      'High thermal stability',
      'Wide temperature range usability',
      'ASTM D1655 / DEF STAN 91-91 certified',
    ],
    image: '/images/card-jeta1.jpg',
  },
  {
    code: 'D2',
    name: 'D2 Diesel Gas Oil',
    description:
      'A widely traded distillate fuel for road vehicles and off-road equipment. Less refined than EN590, with slightly higher sulfur content.',
    details: [
      'Economical and dependable for industrial use',
      'Used in various regions worldwide',
      'Suitable for road vehicles and off-road equipment',
    ],
    image: '/images/card-d2.jpg',
  },
  {
    code: 'D6',
    name: 'D6 Virgin Fuel Oil (Bunker Fuel)',
    description:
      'Heavy residual fuel used in large marine vessels and power generation. High BTU content; ideal for long-haul shipping.',
    details: [
      'Available FOB and CIF with flexible logistics',
      'High BTU content',
      'For remote fuel-hungry operations',
    ],
    image: '/images/card-d6.jpg',
  },
  {
    code: 'LNG',
    name: 'LNG (Liquefied Natural Gas)',
    description:
      'Natural gas cooled to liquid form for storage and transport. High efficiency, low emissions—used in power generation, transport, and industrial applications.',
    details: [
      'Global supply access',
      'ISO tank and terminal delivery options',
      'Low emissions fuel source',
    ],
    image: '/images/card-lng.jpg',
  },
];

const additionalProducts = [
  { name: 'Mazut M100', desc: 'Heavy fuel oil for Russian and Asian markets' },
  { name: 'Petroleum Coke (PetCoke)', desc: 'High-carbon fuel for cement and aluminum production' },
  { name: 'Bitumen (Asphalt)', desc: 'Sourced for road construction and industrial sealing' },
  { name: 'Crude Oil', desc: 'Spot transactions and long-term contracts via verified sources' },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, []);

  const isReversed = index % 2 !== 0;

  return (
    <div
      ref={cardRef}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-sand rounded-lg overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(10,22,40,0.08)] hover:-translate-y-1`}
    >
      <div ref={imageRef} className="lg:w-[45%] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 lg:h-full object-cover transition-transform duration-600 hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <div className="lg:w-[55%] p-8 lg:p-12 flex flex-col justify-center">
        <span className="inline-block self-start bg-gold text-navy text-[0.6875rem] font-medium uppercase px-3 py-1 rounded-full mb-4">
          {product.code}
        </span>
        <h3 className="text-navy text-xl font-medium uppercase tracking-[0.08em] mb-4">
          {product.name}
        </h3>
        <p className="text-navy/70 leading-relaxed mb-5">{product.description}</p>
        <ul className="space-y-2">
          {product.details.map((detail, i) => (
            <li key={i} className="text-navy/50 text-sm flex items-start gap-2">
              <span className="text-gold mt-1">&#8226;</span>
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="products" className="w-full bg-parchment pt-[clamp(5rem,10vh,8rem)] pb-20">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="section-label mb-3">Our Products</p>
          <h2 className="section-title mb-5">Premium Energy Commodities</h2>
          <p className="body-large text-navy/60 max-w-[560px] mx-auto">
            World-class fuel products delivered to global markets with reliability and precision.
          </p>
        </div>

        {/* Product Cards */}
        <div className="flex flex-col gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.code} product={product} index={index} />
          ))}
        </div>

        {/* Additional Products */}
        <div className="mt-12 bg-navy rounded-lg p-8 lg:p-12">
          <h3 className="text-parchment text-lg font-medium uppercase tracking-[0.08em] mb-8 text-center">
            Additional Refined Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalProducts.map((item) => (
              <div key={item.name} className="text-center">
                <h4 className="text-gold text-sm font-medium mb-2">{item.name}</h4>
                <p className="text-parchment/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

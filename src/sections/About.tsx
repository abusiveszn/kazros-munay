import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !imageRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="about" className="w-full bg-parchment">
      <div className="flex flex-col lg:flex-row">
        {/* Image Column */}
        <div ref={imageRef} className="lg:w-1/2 h-[400px] lg:h-auto lg:min-h-[600px]">
          <img
            src="/images/about-ship.jpg"
            alt="Oil tanker at sea"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Content Column */}
        <div
          ref={contentRef}
          className="lg:w-1/2 flex flex-col justify-center px-8 lg:px-[5vw] py-16 lg:py-24"
        >
          <p className="section-label mb-4">About Us</p>
          <h2 className="section-title mb-8">About Kazros Munay</h2>
          <p className="body-large text-navy/70 mb-8 max-w-[520px]">
            At Kazros Munay, we are committed to fueling the world through sustainable and
            forward-thinking energy solutions. We lead with innovation, prioritize efficiency, and
            hold environmental responsibility at the core of everything we do.
          </p>
          <p className="text-navy/60 leading-relaxed mb-8 max-w-[520px]">
            Our global network of partners and suppliers ensures reliable delivery of premium energy
            products to clients across more than 30 countries. From diesel and aviation fuel to
            liquefied natural gas, we provide comprehensive energy solutions tailored to meet the
            demands of modern industry.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-link-gold bg-transparent border-none cursor-pointer self-start"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

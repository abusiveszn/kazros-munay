import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: '15+', label: 'Years of Experience' },
  { value: '50+', label: 'Global Partners' },
  { value: '1M+', label: 'Barrels Traded' },
  { value: '30+', label: 'Countries Served' },
];

function AnimatedCounter({ value, triggered }: { value: string; triggered: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!triggered || !containerRef.current) return;

    const numericPart = parseInt(value.replace(/\D/g, ''), 10);
    const suffix = value.replace(/[0-9]/g, '');
    const duration = 1.5 + Math.random() * 1.5;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: numericPart,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayValue(Math.round(obj.val) + suffix);
      },
    });
  }, [triggered, value]);

  return (
    <div ref={containerRef} className="mono-data text-parchment">
      {displayValue}
    </div>
  );
}

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => setTriggered(true),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-navy py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center py-8 ${
                index < stats.length - 1 ? 'md:border-r md:border-parchment/15' : ''
              } ${index % 2 === 0 ? 'border-r border-parchment/15 md:border-r' : 'md:border-r'} ${
                index >= 2 ? 'border-t border-parchment/15 md:border-t-0' : ''
              }`}
            >
              <AnimatedCounter value={stat.value} triggered={triggered} />
              <p className="caption text-gold mt-3">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

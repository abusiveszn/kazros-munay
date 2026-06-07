import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const businessHours = [
  { day: 'Mon', hours: '09:00 am \u2013 05:00 pm' },
  { day: 'Tue', hours: '09:00 am \u2013 05:00 pm' },
  { day: 'Wed', hours: '09:00 am \u2013 05:00 pm' },
  { day: 'Thu', hours: '09:00 am \u2013 05:00 pm' },
  { day: 'Fri', hours: '09:00 am \u2013 05:00 pm' },
  { day: 'Sat', hours: 'Closed' },
  { day: 'Sun', hours: 'Closed' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [attachments, setAttachments] = useState(0);

  useEffect(() => {
    if (!formRef.current || !infoRef.current) return;

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      infoRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleAttach = () => {
    setAttachments((prev) => prev + 1);
  };

  return (
    <section ref={sectionRef} id="contact" className="w-full bg-navy py-[clamp(5rem,10vh,6rem)]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Form Column */}
          <div ref={formRef} className="lg:w-[55%]">
            <p className="section-label mb-3">Get in Touch</p>
            <h2 className="section-title-light mb-3">Contact Us</h2>
            <p className="body-large text-parchment/60 mb-10">Drop us a line!</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="peer w-full bg-transparent border-b border-parchment/20 text-parchment py-3 px-0 focus:outline-none focus:border-gold transition-colors duration-200 text-base"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-3 text-parchment/50 text-sm transition-all duration-200 peer-focus:top-[-16px] peer-focus:text-xs peer-focus:text-gold peer-not-placeholder-shown:top-[-16px] peer-not-placeholder-shown:text-xs"
                >
                  Name *
                </label>
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="peer w-full bg-transparent border-b border-parchment/20 text-parchment py-3 px-0 focus:outline-none focus:border-gold transition-colors duration-200 text-base"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-3 text-parchment/50 text-sm transition-all duration-200 peer-focus:top-[-16px] peer-focus:text-xs peer-focus:text-gold peer-not-placeholder-shown:top-[-16px] peer-not-placeholder-shown:text-xs"
                >
                  Email *
                </label>
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="peer w-full bg-transparent border-b border-parchment/20 text-parchment py-3 px-0 focus:outline-none focus:border-gold transition-colors duration-200 text-base resize-none"
                  placeholder=" "
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-3 text-parchment/50 text-sm transition-all duration-200 peer-focus:top-[-16px] peer-focus:text-xs peer-focus:text-gold peer-not-placeholder-shown:top-[-16px] peer-not-placeholder-shown:text-xs"
                >
                  Message *
                </label>
              </div>

              {/* Attachments */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleAttach}
                  className="text-gold text-sm font-medium bg-transparent border-none cursor-pointer hover:underline"
                >
                  Attach Files
                </button>
                <span className="text-parchment/40 text-sm">Attachments ({attachments})</span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-gold text-navy font-medium text-sm uppercase tracking-wider px-10 py-3.5 rounded-full hover:bg-[#d4b35a] transition-colors duration-300 cursor-pointer"
              >
                Send
              </button>

              <p className="text-parchment/30 text-xs mt-4">
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of
                Service apply.
              </p>
            </form>
          </div>

          {/* Info Column */}
          <div ref={infoRef} className="lg:w-[45%] space-y-10">
            {/* WhatsApp */}
            <div>
              <p className="text-parchment body-large mb-3">
                WhatsApp us at{' '}
                <a href="tel:+15599600842" className="text-gold hover:underline">
                  +1 (559) 960-0842
                </a>
              </p>
              <a
                href="https://wa.me/15599600842"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link-gold"
              >
                Message us on WhatsApp
              </a>
            </div>

            {/* Address */}
            <div>
              <h4 className="text-gold text-sm font-medium uppercase tracking-wider mb-3">
                Kazros Munay LLC
              </h4>
              <p className="text-parchment/60 leading-relaxed">
                1309 Coffeen Avenue STE 1200
                <br />
                Sheridan Wyoming 82801
              </p>
            </div>

            {/* Phone */}
            <div>
              <a href="tel:+15599600842" className="text-parchment/60 hover:text-gold transition-colors">
                (559) 960-0842
              </a>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-gold text-sm font-medium uppercase tracking-wider mb-4">Hours</h4>
              <div className="space-y-2">
                {businessHours.map((item) => (
                  <div key={item.day} className="flex justify-between text-sm">
                    <span className="text-parchment/50 w-10">{item.day}</span>
                    <span className="text-parchment/50">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-parchment/40 text-sm italic">
              We love our customers, so feel free to visit during normal business hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

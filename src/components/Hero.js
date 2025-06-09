import Image from "next/image";
import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import "../styles/Hero.css";

export default function Hero({ data }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('#hero');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="hero" className="max-w-5xl mx-auto px-4 mt-4 md:mt-8 mb-4 md:mb-8">
      <div className="relative rounded-xl overflow-hidden bg-white" style={{ height: 'min(500px, 80vh)' }}>
        <Image
          src={data.image}
          alt="Hero"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 p-4 md:p-8 pt-24 md:pt-32">
          <h1 className={`text-white font-extrabold text-4xl sm:text-5xl md:text-7xl text-center mb-4 md:mb-6 drop-shadow-lg ${isVisible ? 'fade-in' : ''}`}>
            {data.headline}
          </h1>
          <p className={`text-white text-lg sm:text-xl md:text-2xl text-center mb-8 md:mb-10 max-w-3xl drop-shadow-md ${isVisible ? 'fade-in' : ''}`} style={{ animationDelay: '0.2s' }}>
            {data.subtext}
          </p>
          <div className={`flex gap-4 md:gap-6 ${isVisible ? 'fade-in' : ''}`} style={{ animationDelay: '0.4s' }}>
            {data.socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                aria-label={social.name}
              >
                <div className="relative w-6 h-6 md:w-7 md:h-7">
                  <Image
                    src={social.icon}
                    alt={social.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
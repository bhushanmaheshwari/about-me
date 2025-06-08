import Image from "next/image";
import { useState, useEffect } from "react";

export default function CoreCompetencies({ data }) {
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

    const section = document.getElementById('core-competencies');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="core-competencies" className="max-w-5xl mx-auto px-4 mb-8">
      <h2 className={`font-bold text-xl md:text-2xl mb-8 text-center transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        Core Competencies
      </h2>
      <div className="flex gap-4 xs:gap-6 flex-wrap justify-center">
        {data.map((item, index) => (
          <div
            key={item.label}
            className={`group relative flex flex-col bg-white border border-gray-200 rounded-lg px-5 md:px-6 py-4 md:py-5 font-medium text-gray-900 
              transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg
              w-full sm:min-w-[200px] sm:w-auto`}
            style={{ 
              animationDelay: `${index * 100}ms`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease-out ${index * 100}ms`
            }}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative w-6 h-6 md:w-7 md:h-7">
                <Image 
                  src={item.icon} 
                  alt={item.label} 
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-sm md:text-base transition-colors duration-300">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
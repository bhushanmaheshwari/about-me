import Image from "next/image";
import { useState, useEffect } from "react";

export default function Certifications({ data }) {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Only start animations when section is properly visible
          if (entry.intersectionRatio >= 0.3) {
            setIsVisible(true);
            // Start revealing items one by one
            data.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 150); // 150ms delay between each item
            });
          }
        } else {
          setIsVisible(false);
          setVisibleItems([]);
        }
      },
      { 
        threshold: [0.3, 0.5, 0.7], // Multiple thresholds for better control
        rootMargin: '0px'
      }
    );

    const section = document.getElementById('certifications');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [data]);

  return (
    <section id="certifications" className="max-w-5xl mx-auto px-4 mb-8">
      <h2 className={`font-bold text-xl md:text-2xl mb-8 text-center transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        Education & Certifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((cert, index) => (
          <div
            key={cert.title}
            className={`bg-white border border-gray-200 rounded-xl p-4 transition-all duration-700 ease-out transform hover:-translate-y-1 hover:shadow-lg hover:border-[#607af9] group
              ${visibleItems.includes(index) 
                ? 'opacity-100 translate-x-0 translate-y-0' 
                : 'opacity-0 translate-y-8 ' + (index % 2 === 0 ? '-translate-x-8' : 'translate-x-8')}`}
            style={{ 
              transitionDelay: `${index * 150}ms`,
              transformOrigin: 'center',
              willChange: 'transform, opacity'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="flex w-12 h-12 items-center bg-[#f7f9fc] rounded-lg justify-center group-hover:bg-[#e5e8f4] transition-colors duration-300">
                <div className="relative w-6 h-6">
                  <Image
                    src={cert.icon}
                    alt={cert.title}
                    width={24}
                    height={24}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-center flex-1">
                <span className="text-base font-medium text-gray-900 group-hover:text-[#607af9] transition-colors duration-300">
                  {cert.title}
                </span>
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                  {cert.type}
                </span>
              </div>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label={`View ${cert.title} certification`}
                >
                  <svg 
                    className="w-5 h-5 text-gray-400 group-hover:text-[#607af9] transition-colors duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
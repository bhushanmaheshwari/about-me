import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "../styles/Experience.css";

export default function Experience({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const itemsRef = useRef([]);

  // Scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemsRef.current.findIndex(ref => ref === entry.target);
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...prev, index]);
            setActiveIndex(index);
          } else {
            setVisibleItems(prev => prev.filter(i => i !== index));
            if (activeIndex === index) {
              setActiveIndex(null);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    itemsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemsRef.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [activeIndex]);

  return (
    <section id="experience" className="max-w-5xl mx-auto px-4 mb-8">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-200 hidden md:block" />
        
        {/* Timeline items */}
        <div className="space-y-8 md:space-y-12">
          {data.map((item, index) => (
            <div
              key={item.title}
              ref={el => itemsRef.current[index] = el}
              className={`relative flex flex-col md:items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } transition-all duration-700 ease-out ${
                visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {/* Timeline Node with Year and Location */}
              <div 
                className={`relative md:absolute left-1/2 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 w-20 h-20 md:w-28 md:h-28 rounded-full bg-white border border-gray-200 flex flex-col items-center justify-center z-10 transition-all duration-700 ease-out mb-4 md:mb-0
                  ${activeIndex === index ? 'border-[#607af9] shadow-[0_0_0_2px_#607af9] scale-120' : ''}`}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <span className={`text-lg md:text-xl font-bold transition-colors duration-700 ease-out ${activeIndex === index ? 'text-[#607af9]' : 'text-gray-700'}`}>
                    {item.year}
                  </span>
                  <span className={`text-xs md:text-sm transition-colors duration-700 ease-out ${activeIndex === index ? 'text-gray-900' : 'text-gray-600'} mt-1`}>
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-4`}>
                <div 
                  className={`bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm transition-all duration-700 ease-out
                    ${activeIndex === index ? 'border-[#607af9] shadow-[0_0_0_2px_#607af9] bg-gray-50 translate-y-[-8px] scale-105' : ''}`}
                >
                  <div className="flex flex-col gap-2">
                    {/* Company and Role */}
                    <div className={`flex flex-col gap-1`}>
                      <span className={`text-sm font-medium text-gray-600 ${activeIndex === index ? 'text-gray-900' : ''}`}>
                        {item.company}
                      </span>
                      <h3 className={`font-bold text-base md:text-lg transition-colors duration-700 ease-out ${activeIndex === index ? 'text-[#607af9]' : 'text-gray-700'}`}>
                        {item.title}
                      </h3>
                    </div>

                    {/* Skills */}
                    <div className={`flex flex-wrap items-center gap-2 text-gray-600`}>
                      {item.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className={`text-xs md:text-sm px-2 py-1 rounded-full bg-gray-100 transition-colors duration-700 ease-out ${
                            activeIndex === index ? 'bg-[#607af9] bg-opacity-10 text-[#607af9]' : ''
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Separator */}
                    <div className={`h-px w-full transition-all duration-700 ease-out ${activeIndex === index ? 'bg-[#607af9]' : 'bg-gray-200'}`} />

                    {/* Description List */}
                    <ul className="space-y-1.5 mt-2">
                      {item.description.map((desc, i) => (
                        <li 
                          key={i} 
                          className={`text-xs md:text-sm transition-colors duration-700 ease-out ${activeIndex === index ? 'text-gray-900' : 'text-gray-600'} flex items-start gap-2 leading-relaxed`}
                        >
                          <div className="relative w-2.5 h-2.5 md:w-3 md:h-3 mt-1 flex-shrink-0">
                            <Image
                              src="/pointer.svg"
                              alt="chevron"
                              width={12}
                              height={12}
                              className={`transition-colors duration-700 ease-out ${activeIndex === index ? 'text-[#607af9]' : 'text-gray-400'}`}
                            />
                          </div>
                          <span dangerouslySetInnerHTML={{ __html: desc }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
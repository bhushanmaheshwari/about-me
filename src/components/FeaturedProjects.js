import Image from "next/image";
import { useState, useEffect } from "react";

export default function FeaturedProjects({ data }) {
  const [hoveredProject, setHoveredProject] = useState(null);
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

    const element = document.querySelector('#projects');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);
  
  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 mb-8">
      <h2 className="font-bold text-xl md:text-2xl text-gray-700 mb-6 animate-fade-in-up">Enterprise Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4">
        {data.map((proj, index) => (
          <div 
            key={proj.title} 
            className={`group bg-white rounded-2xl p-4 md:p-4 hover:shadow-lg border-2 hover:bg-gray-50 transition-all duration-400 transform hover:-translate-y-1 cursor-pointer animate-fade-in-up ${isVisible ? 'fade-in' : ''} ${hoveredProject === index ? 'border-blue-500' : 'border-transparent'}`}
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Responsive Image */}
            <div className="relative w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
              <Image 
                src={proj.image} 
                alt={proj.title} 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-400 ease-out"
                sizes="(max-width: 640px) 80px, (max-width: 768px) 80px, 96px"
                unoptimized={proj.image.endsWith('.svg')}
              />
            </div>
            
            {/* Content */}
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-sm mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                {proj.title}
              </h3>
              
              {/* Description on hover/click */}
              <div className={`transition-all duration-400 overflow-hidden ${hoveredProject === index ? 'max-h-24 opacity-100 mb-3' : 'max-h-0 opacity-0 mb-0'}`}>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {proj.desc}
                </p>
              </div>
              
              {/* Technologies - show all on hover/click */}
              <div className="flex flex-wrap justify-center gap-1">
                {hoveredProject === index ? (
                  // Show all technologies on hover/click
                  proj.technologies?.map((tech, techIndex) => (
                    <span 
                      key={tech} 
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full transition-all duration-300 font-medium"
                      style={{ 
                        animationDelay: `${techIndex * 50}ms`,
                      }}
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  // Show limited technologies normally
                  <>
                    {proj.technologies?.slice(0, 2).map((tech, techIndex) => (
                      <span 
                        key={tech} 
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-700 transition-all duration-300 font-medium"
                        style={{ 
                          animationDelay: `${index * 100 + techIndex * 100 + 300}ms`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.technologies?.length > 2 && (
                      <span className="text-xs text-gray-400 px-2 py-1 font-medium">
                        +{proj.technologies.length - 2} more
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
import Image from "next/image";
import { useState } from "react";

export default function FeaturedProjects({ data }) {
  const [hoveredProject, setHoveredProject] = useState(null);
  
  return (
    <section id="projects" className="max-w-5xl mx-auto px-4 mb-8">
      <h2 className="font-bold text-xl md:text-2xl mb-4 md:mb-6 animate-fade-in-up">Enterprise Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {data.map((proj, index) => (
          <div 
            key={proj.title} 
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="relative w-full h-44 group">
              <Image 
                src={proj.image} 
                alt={proj.title} 
                fill
                className="object-contain bg-white"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                unoptimized={proj.image.endsWith('.svg')}
              />
              <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center ${hoveredProject === index ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-white text-center p-4 transform translate-y-4 transition-transform duration-300">
                  <p className="text-sm">{proj.desc}</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="font-semibold text-base md:text-lg mb-3 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                {proj.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {proj.technologies?.map((tech, techIndex) => (
                  <span 
                    key={tech} 
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full animate-fade-in-up"
                    style={{ animationDelay: `${index * 100 + techIndex * 100 + 300}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
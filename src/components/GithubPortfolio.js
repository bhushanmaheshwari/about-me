import Image from "next/image";
import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import "../styles/GithubPortfolio.css";

export default function GithubPortfolio({ data }) {
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

    const element = document.querySelector('#github-portfolio');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Sort projects by order property
  const sortedData = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="github-portfolio" className="max-w-5xl mx-auto px-4 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedData.map((proj) => (
          <a
            key={proj.title}
            href={proj.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-48 hover:border-[#607af9] hover:shadow-md transition-all duration-300 stagger-animation ${isVisible ? 'fade-in' : ''}`}
          >
            <div className="relative w-full h-24 overflow-hidden">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                sizes="(max-width: 768px) 100vw, 160px"
              />
            </div>
            <div className="flex-1 flex flex-col p-3">
              <div className="font-bold text-base mb-1 text-gray-900 hover:text-[#607af9] transition-colors duration-300">
                {proj.title}
              </div>
              <div className="text-sm text-gray-600 line-clamp-2">
                {proj.desc}
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-6 text-center">
        <a
          href="https://github.com/bhushanmaheshwari"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gray-100 rounded-lg px-4 py-2 font-bold text-base text-gray-900 hover:bg-gray-200 hover:-translate-y-0.5 transition-all duration-300"
        >
          View All Projects on GitHub
        </a>
      </div>
    </section>
  );
}
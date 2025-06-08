import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar({ data, heroData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Image src={data.logo} alt="Logo" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="font-semibold text-base sm:text-lg">{data.title}</span>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 -mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {data.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-700 hover:text-[#607af9] font-medium text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            className="bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-2 text-sm hover:bg-gray-200 transition-colors duration-200"
          >
            {data.resume}
          </a>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-16 px-4">
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 p-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col gap-4">
              {data.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-700 hover:text-[#607af9] font-medium text-base py-2 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {/* Social Media Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-gray-600 italic text-sm text-center mb-4 pl-4 py-2">
                  "Great architecture isn't just scalable. It's thoughtful, ethical, and built for the people who use it."
                </h3>
                <div className="flex justify-center gap-6">
                  {heroData?.socialLinks?.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#607af9] hover:bg-[#47579E] p-3.5 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                      aria-label={social.name}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-5 h-5">
                        <Image
                          src={social.icon}
                          alt={social.name}
                          width={20}
                          height={20}
                          className="w-full h-full brightness-0 invert"
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Resume Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <a
                  href="/resume.pdf"
                  download
                  className="block bg-[#607af9] text-white font-semibold rounded-lg px-6 py-3.5 text-base hover:bg-[#47579E] transition-all duration-300 text-center transform hover:scale-[1.02]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {data.resume}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
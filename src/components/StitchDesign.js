"use client";
import { useRef, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import CoreCompetencies from "./CoreCompetencies";
import FeaturedProjects from "./FeaturedProjects";
import GithubPortfolio from "./GithubPortfolio";
import Experience from "./Experience";
import Certifications from "./Certifications";
import OnlineCourses from "./OnlineCourses";
import AboutMe from "./AboutMe";
import Footer from "./Footer";
import SectionHeader from "./SectionHeader";


export default function StitchDesign({ data }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll event to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar data={data.navbar} heroData={data.hero} />
      <main className="flex flex-col">
        {/* Section 1: Hero and Core Competencies */}
        <section className="bg-gradient-to-b from-white to-gray-50">
          <SectionFadeIn className="mb-16"><Hero data={data.hero} /></SectionFadeIn>
          <SectionFadeIn className="mb-24"><CoreCompetencies data={data.coreCompetencies} /></SectionFadeIn>
        </section>

        {/* Section 2: Projects */}
        <section className="bg-white py-12">
      <SectionHeader title="GitHub Portfolio" />

          <SectionFadeIn className="mb-24"><GithubPortfolio data={data.githubPortfolio} /></SectionFadeIn>
          <SectionFadeIn className="mb-24"><FeaturedProjects data={data.featuredProjects} /></SectionFadeIn>
        </section>

        {/* Section 3: About and Experience */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-12">
          <SectionHeader title="Experience"/>
          <SectionFadeIn className="mb-24"><Experience data={data.experience} /></SectionFadeIn>
          <SectionFadeIn className="mb-24"><Certifications data={data.certifications} /></SectionFadeIn>
          <SectionFadeIn className="mb-24"><OnlineCourses data={data.onlineCourses} /></SectionFadeIn>
          <SectionFadeIn className="mb-24"><AboutMe data={data.aboutMe} /></SectionFadeIn>
        </section>
      </main>
      <Footer data={data.footer} />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-[#607af9] text-white p-3 rounded-full shadow-lg transition-all duration-500 ease-in-out transform hover:scale-110 hover:bg-[#4256c9] ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </button>
    </div>
  );
}

// Enhanced Fade-in animation wrapper for sections
function SectionFadeIn({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-1000 ease-out ${className}`}
    >
      {children}
    </section>
  );
}
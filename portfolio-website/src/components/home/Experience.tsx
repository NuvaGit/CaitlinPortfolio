"use client";

import React, { useEffect, useRef, useState } from 'react';

const Experience = () => {
  const experiences = [
    {
      role: "Intern at The Legal Aid Board",
      company: "Medical Negligence Unit",
      period: "Aug 2024",
      description: "Analyzed client cases and medical reports",
      responsibilities: [
        "Analyzed client cases, including expert and medical reports",
        "Identified precedent cases relevant to ongoing matters",
        "Assisted in preparing legal documentation for court proceedings",
        "Conducted research on medical negligence case law and standards",
        "Collaborated with senior legal professionals on case strategy"
      ]
    },
    {
      role: "Property Management Assistant",
      company: "OBF Properties Ltd.",
      period: "Aug 2023 - Sept 2024",
      description: "Managed property viewings and tenant relations",
      responsibilities: [
        "Conducted tenant interviews and property viewings",
        "Coordinated with fire officer to ensure property compliance",
        "Maintained property records and documentation",
        "Handled tenant inquiries and resolved maintenance issues",
        "Assisted in drafting and reviewing lease agreements"
      ]
    },
    {
      role: "Street Team Member",
      company: "Bauer Media Audio Ireland",
      period: "2021 - Present",
      description: "Represented media channels at events",
      responsibilities: [
        "Executed event-specific marketing strategies",
        "Created engaging social media content",
        "Interacted with the public to promote media brands",
        "Collected and analyzed feedback from event participants",
        "Collaborated with team members to ensure successful event execution"
      ]
    },
    {
      role: "Legal Research Assistant",
      company: "University College Dublin Law Society",
      period: "2022 - 2023",
      description: "Supported academic research in various legal domains",
      responsibilities: [
        "Conducted literature reviews on specific legal topics",
        "Compiled and organized research materials and references",
        "Assisted in preparing presentations and academic papers",
        "Analyzed legal cases and statutes for research projects",
        "Participated in legal discussion groups and seminars"
      ]
    }
  ];

  // Refs for animation targets
  const sectionRef = useRef(null);
  const timelineRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const educationRef = useRef(null);
  const [backgroundElements, setBackgroundElements] = useState<React.ReactNode[]>([]);

  // Set up refs for experience items
  timelineRefs.current = experiences.map((_, i) => timelineRefs.current[i] || React.createRef());

  // Generate background elements on the client-side only
  useEffect(() => {
    const elements = Array.from({ length: 15 }, (_, i) => {
      const width = Math.random() * 400 + 100;
      const height = Math.random() * 400 + 100;
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const animationDelay = `${Math.random() * 5}s`;
      const animationDuration = `${Math.random() * 10 + 15}s`;

      return (
        <div 
          key={i}
          className="absolute rounded-full bg-white/5 blur-xl"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            top: top,
            left: left,
            animationDelay: animationDelay,
            animationDuration: animationDuration,
          }}
        />
      );
    });
    
    setBackgroundElements(elements);
  }, []);

  useEffect(() => {
    // Capture current refs values to use in cleanup
    const currentTimelineRefs = timelineRefs.current.map(ref => ref.current);
    const currentEducationRef = educationRef.current;
    
    // Observer callback function
    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Don't unobserve to allow re-animation when scrolling in and out
        } else {
          // Remove animation class when out of view to allow re-animation
          entry.target.classList.remove('animate-in');
        }
      });
    };

    // Create observer with options
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Trigger when at least 10% of the target is visible
    });

    // Observe timeline items
    currentTimelineRefs.forEach(ref => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // Observe education section
    if (currentEducationRef) {
      observer.observe(currentEducationRef);
    }

    // Clean up
    return () => {
      currentTimelineRefs.forEach(ref => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
      if (currentEducationRef) {
        observer.unobserve(currentEducationRef);
      }
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 relative overflow-hidden" ref={sectionRef}>
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundElements}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-3 text-white tracking-tight">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mx-auto mb-6"></div>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            A snapshot of my professional journey in the legal field and beyond.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline vertical line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400/40 via-purple-400/40 to-pink-400/40 rounded-full"></div>

            {experiences.map((exp, index) => (
              <div 
                key={index} 
                ref={timelineRefs.current[index]}
                className={`mb-20 md:mb-24 relative animate-item opacity-0 ${index % 2 === 0 ? 'slide-right' : 'slide-left'}`}
              >
                <div className={`flex items-center justify-between md:justify-normal ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:flex-row`}>
                  {/* Timeline dot with pulse animation */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse"></div>
                    <div className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white"></div>
                  </div>

                  {/* Content Card */}
                  <div 
                    className={`md:w-[calc(50%-2rem)] rounded-xl overflow-hidden transform transition-all duration-500 ${
                      index % 2 === 0 ? 'md:mr-10' : 'md:ml-10'
                    } w-full card-animate`}
                  >
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:bg-white/15 transition-all duration-300 shadow-xl border border-white/10">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-100 bg-blue-500/30 rounded-full mb-3">
                          {exp.period}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                        <p className="text-blue-200 font-medium">{exp.company}</p>
                      </div>
                      <p className="text-blue-100 mb-5">{exp.description}</p>
                      <div className="space-y-3">
                        <h4 className="font-medium text-white mb-3 text-lg">Key Responsibilities:</h4>
                        <ul className="space-y-3">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start responsibility-item opacity-0" style={{ animationDelay: `${i * 0.1 + 0.2}s` }}>
                              <div className="flex-shrink-0 mt-1 mr-3 w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                              <span className="text-blue-50">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20" ref={educationRef}>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/10 education-card opacity-0">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Education</h2>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Bachelor of Law with Politics (BCL)</h3>
                    <p className="text-blue-200 font-medium">University College Dublin</p>
                  </div>
                  <p className="text-sm text-blue-200 mt-1 md:mt-0 md:ml-4">2020 - 2024</p>
                </div>
                <div className="mt-6">
                  <h4 className="font-medium text-white mb-4 text-lg">Key Achievements:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Member of the UCD Law Society Moot Court Competition Team",
                      "Published research paper on property law reforms in Ireland",
                      "Dean's List for Academic Excellence (2022, 2023)",
                      "Volunteered with the UCD Student Legal Service Clinic"
                    ].map((achievement, i) => (
                      <div key={i} className="achievement-item opacity-0 flex" style={{ animationDelay: `${i * 0.15}s` }}>
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-blue-50">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeSlideRight {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeSlideLeft {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }
          70% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .slide-right.animate-in {
          animation: fadeSlideRight 0.7s forwards ease-out;
        }
        
        .slide-left.animate-in {
          animation: fadeSlideLeft 0.7s forwards ease-out;
        }
        
        .animate-in .responsibility-item {
          animation: fadeSlideUp 0.5s forwards ease-out;
        }
        
        .education-card.animate-in {
          animation: popIn 0.8s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-in .achievement-item {
          animation: fadeSlideUp 0.6s forwards ease-out;
        }
        
        /* Pre-animation states */
        .responsibility-item, .achievement-item {
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default Experience;
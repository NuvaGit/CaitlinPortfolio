import React from 'react';


const Experience = () => {
    const experiences = [
      {
        role: "Intern at The Legal Aid Board",
        company: "Medical Negligence Unit",
        period: "Aug 2024",
        description: "Analyzed client cases and medical reports",
        responsibilities: [
          "Analyzed client cases, including expert and medical reports",
          "Identified precedent cases relevant to ongoing matters"
        ]
      },
      {
        role: "Property Management Assistant",
        company: "OBF Properties Ltd.",
        period: "Aug 2023 - Sept 2024",
        description: "Managed property viewings and tenant relations",
        responsibilities: [
          "Conducted tenant interviews and property viewings",
          "Coordinated with fire officer to ensure property compliance"
        ]
      },
      {
        role: "Street Team Member",
        company: "Bauer Media Audio Ireland",
        period: "2021 - Present",
        description: "Represented media channels at events",
        responsibilities: [
          "Executed event-specific marketing strategies",
          "Created engaging social media content"
        ]
      }
    ];
    
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Professional Experience</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A snapshot of my professional journey in the legal field and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">{exp.role}</h3>
                <p className="text-blue-600 font-medium mb-3">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-4">{exp.period}</p>
                <p className="text-gray-700 mb-4">{exp.description}</p>
                <ul className="space-y-2 mb-4">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-teal-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Experience;
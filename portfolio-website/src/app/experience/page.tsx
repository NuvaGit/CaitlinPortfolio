import React from 'react';

export default function ExperiencePage() {
  const experiences = [
    {
      role: "Intern at The Legal Aid Board",
      company: "Medical Negligence Unit",
      period: "Aug 2024",
      description: "Contributed to the Medical Negligence Unit through case analysis and research.",
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
      description: "Managed various aspects of property operations and tenant relations.",
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
      description: "Represented media channels at public events and promotional activities.",
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
      description: "Supported academic research in various legal domains.",
      responsibilities: [
        "Conducted literature reviews on specific legal topics",
        "Compiled and organized research materials and references",
        "Assisted in preparing presentations and academic papers",
        "Analyzed legal cases and statutes for research projects",
        "Participated in legal discussion groups and seminars"
      ]
    }
  ];
    
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Professional Experience</h1>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 md:mt-0">{exp.period}</p>
                </div>
                
                <p className="text-gray-700 mb-4">{exp.description}</p>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Key Responsibilities:</h4>
                  <ul className="space-y-2">
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
              </div>
            ))}
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Education</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Bachelor of Law with Politics (BCL)</h3>
                  <p className="text-blue-600 font-medium">University College Dublin</p>
                </div>
                <p className="text-sm text-gray-500 mt-1 md:mt-0">2020 - 2024</p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium text-gray-800 mb-2">Key Achievements:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-teal-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Member of the UCD Law Society Moot Court Competition Team</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-teal-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Published research paper on property law reforms in Ireland</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-teal-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Dean's List for Academic Excellence (2022, 2023)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-teal-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Volunteered with the UCD Student Legal Service Clinic</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
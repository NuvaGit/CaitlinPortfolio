import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Legal Skills",
      icon: (
        <svg className="w-12 h-12 text-blue-200 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      skills: [
        { name: "Legal Research & Analysis", level: 90 },
        { name: "Academic Writing", level: 85 },
        { name: "Case Assessment", level: 80 },
        { name: "Legal Documentation", level: 85 }
      ]
    },
    {
      title: "Technical Skills",
      icon: (
        <svg className="w-12 h-12 text-blue-200 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      skills: [
        { name: "Digital Marketing", level: 75 },
        { name: "Social Media Management", level: 80 },
        { name: "Event Organization", level: 85 },
        { name: "Content Creation", level: 75 }
      ]
    },
    {
      title: "Soft Skills",
      icon: (
        <svg className="w-12 h-12 text-blue-200 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      skills: [
        { name: "Communication", level: 95 },
        { name: "Problem-Solving", level: 90 },
        { name: "Critical Thinking", level: 85 },
        { name: "Attention to Detail", level: 90 }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 relative overflow-hidden">
      {/* Abstract Background Elements (fewer, smaller than Experience) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 blur-xl"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-white">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mx-auto mb-6"></div>
          <p className="text-blue-100 max-w-2xl mx-auto">
            A range of professional capabilities developed through education and diverse experience.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-center mb-6">
                  {category.icon}
                  <h3 className="text-xl font-bold mb-2 text-white">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-blue-100 font-medium">{skill.name}</span>
                        <span className="text-blue-200 text-sm font-medium">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-white/20 text-blue-100 px-3 py-1 rounded-full text-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6 text-white">Additional Qualifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Languages", value: "English (Native), Irish (Intermediate)" },
                { label: "Certifications", value: "Legal Research Certification" },
                { label: "Software", value: "MS Office, Legal Research Databases" },
                { label: "Professional", value: "Member, Law Society of Ireland" }
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-blue-200 font-bold text-lg mb-1">{item.label}</div>
                  <p className="text-blue-100">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

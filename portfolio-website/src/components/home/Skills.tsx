const Skills = () => {
    const skillCategories = [
      {
        title: "Legal Skills",
        skills: ["Legal Research & Analysis", "Academic Writing", "Case Assessment", "Legal Documentation"]
      },
      {
        title: "Technical Skills",
        skills: ["Digital Marketing", "Social Media Management", "Event Organization", "Content Creation"]
      },
      {
        title: "Soft Skills",
        skills: ["Communication", "Problem-Solving", "Critical Thinking", "Attention to Detail"]
      }
    ];
  
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Skills & Expertise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A range of professional capabilities developed through education and diverse experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-700">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span key={i} className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Skills;
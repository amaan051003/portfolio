import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";

const SelectedWork = () => {
  const [showAll, setShowAll] = useState(false);
  
  const featuredProjects = projects.slice(0, 3);
  
  const visibleProjects = showAll ? projects : featuredProjects;

  return (
    <section 
      className="w-full max-w-[1680px] mx-auto px-5 py-24 md:px-10 lg:px-12 bg-background relative"
      id="work"
    >
      <div className="w-full max-w-[1680px] mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6">
          <div>
            <h3 className="section-label mb-6">
              03 / Selected Work
            </h3>
            <h2 className="font-heading font-medium text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-tight text-text-primary">
              Selected Work
            </h2>
          </div>
          
          <button 
            onClick={() => setShowAll(!showAll)}
            className="group flex items-center gap-3 text-sm font-hoves text-text-primary hover:text-accent transition-colors"
          >
            <span>{showAll ? "Show Less" : "View All"}</span>
            <div className="w-10 h-10 rounded-full border-subtle flex items-center justify-center group-hover:border-accent transition-colors">
              <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleProjects.map((project, index) => (
            <Link 
              key={project.id}
              to={`/work/${project.slug}`}
              className="group flex flex-col gap-5 focus-visible:outline-accent"
            >
              <div className="w-full relative aspect-[16/10] image-frame overflow-hidden bg-surface-muted">
                {project.previewImage ? (
                  <img 
                    src={project.previewImage} 
                    alt={`${project.title} preview`} 
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: project.previewColor }}>
                    <span className="opacity-50 text-xs font-mono">No Image</span>
                  </div>
                )}
                
                <div className="absolute top-4 right-4 text-[10px] font-mono tracking-wider text-white mix-blend-difference opacity-80">
                  {project.id}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="font-heading text-2xl md:text-3xl text-text-primary group-hover:text-accent transition-colors">
                  {project.title}
                </h4>
                
                <div className="flex flex-wrap items-center gap-2">
                  {project.technologies?.slice(0, 3).map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-md bg-surface border-subtle text-[10px] md:text-xs font-mono text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default SelectedWork;

import { useRef, useCallback } from 'react';

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  }, []);

  return (
    <div
      ref={cardRef}
      className={`project-card${project.featured ? ' featured' : ''}`}
      id={project.id}
      onMouseMove={handleMouseMove}
    >
      <div>
        <span className="project-emoji">{project.emoji}</span>
        <div className="project-name">{project.name}</div>
        <div className="project-desc" dangerouslySetInnerHTML={{ __html: project.description }} />
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className={`tag${tag.class ? ' ' + tag.class : ''}`}>
              {tag.name}
            </span>
          ))}
        </div>
        <div className="project-links">
          {project.links.map((link, i) => (
            <button key={i} className="proj-link">
              {link.label}
            </button>
          ))}
        </div>
      </div>
      {project.featured && (
        <div className="featured-badge">✦ Projet phare</div>
      )}
    </div>
  );
}

export default function Projects({ projects }) {
  return (
    <section className="section active" id="projects">
      <div className="section-header">
        <div className="section-title">
          Pro<span>jets</span>
        </div>
        <div className="section-sub">// {projects.length} réalisations</div>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

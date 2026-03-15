import { useEffect, useRef } from 'react';

function SkillBar({ skill }) {
  const fillRef = useRef(null);

  useEffect(() => {
    if (!fillRef.current) return;
    
    // Si l'utilisateur préfère pas d'animations
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      fillRef.current.classList.add('animated');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fillRef.current.classList.add('animated');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(fillRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-row">
      <div className="skill-name">
        <span className="skill-icon">{skill.icon}</span>
        {skill.name}
      </div>
      <div className="skill-bar-bg">
        <div
          ref={fillRef}
          className={`skill-bar-fill fill-${skill.color}`}
          style={{ width: `${skill.percentage}%` }}
        />
      </div>
      <div className="skill-pct">{skill.percentage}%</div>
    </div>
  );
}

function SkillGroupSection({ group }) {
  return (
    <div>
      <div className="skill-group-title">{group.title}</div>
      {group.skills ? (
        <div className="skills-list">
          {group.skills.map((skill, i) => (
            <SkillBar key={i} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="tools-grid">
          {group.tools.map((tool, i) => (
            <div key={i} className="tool-pill">
              {tool}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Skills({ skills }) {
  return (
    <section className="section active" id="skills">
      <div className="section-header">
        <div className="section-title">
          Compé<span>tences</span>
        </div>
        <div className="section-sub">// stack technique</div>
      </div>
      <div className="skills-groups">
        {skills.map((group, i) => (
          <SkillGroupSection key={i} group={group} />
        ))}
      </div>
    </section>
  );
}

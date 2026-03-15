import { useEffect, useRef } from 'react';

function TimelineEntry({ item, index }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    
    // Si l'utilisateur préfère pas d'animations
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      ref.current.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Ajout d'un délai basé sur l'index pour un effet cascade
          setTimeout(() => {
            if (ref.current) ref.current.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} className="tl-item">
      <div className={`tl-dot${item.muted ? ' muted-dot' : ''}`} />
      <div className={`tl-period${item.muted ? ' muted-period' : ''}`}>
        {item.period}
      </div>
      <div className="tl-role">{item.role}</div>
      <div className="tl-company">
        {item.company}
        {item.badge && (
          <span className="tl-company-badge">{item.badge}</span>
        )}
      </div>
      <div className="tl-desc" dangerouslySetInnerHTML={{ __html: item.description }} />
      <div className="tl-techs">
        {item.techs.map((tech, i) => (
          <span key={i} className="tl-tech">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Timeline({ timeline }) {
  return (
    <section className="section active" id="timeline">
      <div className="section-header">
        <div className="section-title">
          Par<span>cours</span>
        </div>
        <div className="section-sub">// expérience & formation</div>
      </div>
      <div className="timeline">
        {timeline.map((item, i) => (
          <TimelineEntry key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

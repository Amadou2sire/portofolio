export default function Home({ profile, onNavigate }) {
  return (
    <section className="section active" id="home">
      <div className="hero-greeting">{profile.greeting}</div>
      <div className="hero-name">
        {profile.hero_name.split(' ').map((part, i) => (
          <span key={i}>
            {part}
            {i < profile.hero_name.split(' ').length - 1 && <br />}
          </span>
        ))}
      </div>
      <div className="hero-role">
        {profile.hero_role}
        <span>{profile.hero_role_highlight}</span>
      </div>
      <p
        className="hero-bio"
        dangerouslySetInnerHTML={{ __html: profile.bio }}
      />
      <div className="hero-cta">
        <button className="btn-primary" onClick={() => onNavigate('projects')}>
          ◈ Voir mes projets
        </button>
        <button className="btn-ghost" onClick={() => onNavigate('contact')}>
          Discutons →
        </button>
      </div>
      <div className="hero-stats">
        {profile.stats.map((stat, i) => (
          <div className="stat" key={i}>
            <div className="stat-num">
              {stat.value}
              <span>{stat.suffix}</span>
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

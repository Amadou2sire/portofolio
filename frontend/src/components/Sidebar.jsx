import profileImg from '../assets/image.jfif';

export default function Sidebar({ profile, nav, activeSection, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="avatar-wrap" onDoubleClick={() => onNavigate('admin')} style={{ cursor: 'pointer' }}>
        <div className="avatar">
          <img src={profileImg} alt={profile.name} className="avatar-img" />
        </div>
        <div className="avatar-ring"></div>
      </div>
      <div className="name">{profile.name}</div>
      <div className="title-tag">{profile.title}</div>
      <div className="status">
        <div className="status-dot"></div>
        {profile.status}
      </div>

      <nav>
        <div className="nav-label">Navigation</div>
        {nav.map((item) => (
          <div
            key={item.id}
            className={`nav-item${activeSection === item.id ? ' active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span> {item.label}
            {item.count && <span className="nav-count">{item.count}</span>}
          </div>
        ))}
      </nav>

      <div className="socials">
        {profile.socials.map((s, i) => (
          <a key={i} className="social-btn" href={s.url}>
            {s.label}
          </a>
        ))}
      </div>
    </aside>
  );
}

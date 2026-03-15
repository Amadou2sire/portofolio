export default function Contact({ contact }) {
  return (
    <section className="section active" id="contact">
      <div className="section-header">
        <div className="section-title">
          Con<span>tact</span>
        </div>
        <div className="section-sub">// parlons de ton projet</div>
      </div>
      <div className="contact-grid">
        {contact.cards.map((card, i) => (
          <div key={i} className="contact-card">
            <div className="contact-icon">{card.icon}</div>
            <div>
              <div className="contact-label">{card.label}</div>
              <div className="contact-value">{card.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="availability-block">
        <div className="avail-icon">{contact.availability.icon}</div>
        <div>
          <div className="avail-title">{contact.availability.title}</div>
          <div className="avail-desc">
            {contact.availability.description}
          </div>
        </div>
      </div>
    </section>
  );
}

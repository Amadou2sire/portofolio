import { useState } from 'react';
import { updateData } from '../api';

export default function Admin({ data, onUpdate, onLogout }) {
  const [formData, setFormData] = useState(data);
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [activeTab, setActiveTab] = useState('profile');

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleDeepChange = (path, value) => {
    const newFormData = JSON.parse(JSON.stringify(formData));
    let current = newFormData;
    const keys = path.split('.');
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setFormData(newFormData);
  };

  const handleArrayChange = (section, index, field, value) => {
    const newArray = [...formData[section]];
    newArray[index] = { ...newArray[index], [field]: value };
    setFormData(prev => ({ ...prev, [section]: newArray }));
  };

  const addArrayItem = (section, template) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    try {
      await updateData(formData);
      onUpdate(formData);
      setStatus({ type: 'success', msg: '✅ Modifications enregistrées !' });
      setTimeout(() => setStatus({ type: '', msg: '' }), 3000);
    } catch (err) {
      setStatus({ type: 'error', msg: '❌ Erreur de connexion au serveur' });
    }
  };

  return (
    <div className="section-container admin-container">
      <div className="section-header">
        <span className="section-badge">ADMIN</span>
        <h2 className="section-title">Console de Gestion</h2>
        <button className="btn-ghost" onClick={onLogout} style={{ marginLeft: 'auto', fontSize: '12px' }}>Déconnexion</button>
      </div>

      <div className="admin-tabs">
        <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Profil</button>
        <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>Projets</button>
        <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>Compétences</button>
        <button className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>Parcours</button>
        <button className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>Contact</button>
      </div>

      <div className="admin-card">
        {activeTab === 'profile' && (
          <div className="admin-form">
            <h3 className="admin-subtitle">Informations de base</h3>
            <div className="input-group">
              <label>Nom complet</label>
              <input type="text" value={formData.profile.name} onChange={(e) => handleChange('profile', 'name', e.target.value)} />
            </div>
            <div className="input-group">
              <label>Initiales</label>
              <input type="text" value={formData.profile.initials} onChange={(e) => handleChange('profile', 'initials', e.target.value)} />
            </div>
            <div className="input-group">
              <label>Titre Professionnel</label>
              <input type="text" value={formData.profile.title} onChange={(e) => handleChange('profile', 'title', e.target.value)} />
            </div>
            <div className="input-group">
              <label>Phrase d'accueil (ex: Bonjour, je suis)</label>
              <input type="text" value={formData.profile.greeting} onChange={(part) => handleChange('profile', 'greeting', part.target.value)} />
            </div>
            <div className="input-group">
              <label>Nom Hero (Affichage large)</label>
              <input type="text" value={formData.profile.hero_name} onChange={(e) => handleChange('profile', 'hero_name', e.target.value)} />
            </div>
            <div className="input-grid">
              <div className="input-group">
                <label>Rôle (Texte principal)</label>
                <input type="text" value={formData.profile.hero_role} onChange={(e) => handleChange('profile', 'hero_role', e.target.value)} />
              </div>
              <div className="input-group">
                <label>Rôle Highlight (Couleur)</label>
                <input type="text" value={formData.profile.hero_role_highlight} onChange={(e) => handleChange('profile', 'hero_role_highlight', e.target.value)} />
              </div>
            </div>
            <div className="input-group">
              <label>Bio (HTML)</label>
              <textarea value={formData.profile.bio} onChange={(e) => handleChange('profile', 'bio', e.target.value)} />
            </div>

            <h3 className="admin-subtitle" style={{marginTop: '20px'}}>Statistiques (Stats)</h3>
            {formData.profile.stats.map((stat, sIdx) => (
              <div key={sIdx} className="admin-entry-card" style={{padding: '15px', marginBottom: '10px'}}>
                <div className="input-grid">
                  <div className="input-group">
                    <label>Valeur</label>
                    <input type="text" value={stat.value} onChange={(e) => {
                      const newStats = [...formData.profile.stats];
                      newStats[sIdx].value = e.target.value;
                      setFormData({...formData, profile: {...formData.profile, stats: newStats}});
                    }} />
                  </div>
                  <div className="input-group">
                    <label>Suffixe (ex: +, %)</label>
                    <input type="text" value={stat.suffix} onChange={(e) => {
                      const newStats = [...formData.profile.stats];
                      newStats[sIdx].suffix = e.target.value;
                      setFormData({...formData, profile: {...formData.profile, stats: newStats}});
                    }} />
                  </div>
                </div>
                <div className="input-group">
                  <label>Label (ex: Projets gérés)</label>
                  <input type="text" value={stat.label} onChange={(e) => {
                    const newStats = [...formData.profile.stats];
                    newStats[sIdx].label = e.target.value;
                    setFormData({...formData, profile: {...formData.profile, stats: newStats}});
                  }} />
                </div>
                <button className="btn-remove" onClick={() => {
                  const newStats = formData.profile.stats.filter((_, i) => i !== sIdx);
                  setFormData({...formData, profile: {...formData.profile, stats: newStats}});
                }}>Supprimer Stat</button>
              </div>
            ))}
            <button className="btn-ghost" onClick={() => {
              const newStats = [...formData.profile.stats, {value: '0', suffix: '+', label: 'Nouveau'}];
              setFormData({...formData, profile: {...formData.profile, stats: newStats}});
            }}>+ Ajouter une statistique</button>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="admin-form">
            <h3 className="admin-subtitle">Projets réalisés</h3>
            {formData.projects.map((project, idx) => (
              <div key={idx} className="admin-entry-card">
                <div className="entry-header">
                  <span>Projet #{idx + 1}</span>
                  <button className="btn-remove" onClick={() => removeArrayItem('projects', idx)}>Supprimer</button>
                </div>
                <div className="input-grid">
                  <div className="input-group"><label>Nom</label><input type="text" value={project.name} onChange={(e) => handleArrayChange('projects', idx, 'name', e.target.value)} /></div>
                  <div className="input-group"><label>Emoji</label><input type="text" value={project.emoji} onChange={(e) => handleArrayChange('projects', idx, 'emoji', e.target.value)} /></div>
                </div>
                <div className="input-group"><label>Description</label><textarea value={project.description} onChange={(e) => handleArrayChange('projects', idx, 'description', e.target.value)} /></div>
                
                <div className="nested-skills">
                  <label style={{marginBottom: '10px', display: 'block'}}>Tags / Technologies:</label>
                  {project.tags && project.tags.map((tag, tIdx) => (
                    <div key={tIdx} className="skill-item-row">
                      <input type="text" placeholder="Nom (ex: React)" value={tag.name} onChange={(e) => {
                        const newProjects = [...formData.projects];
                        newProjects[idx].tags[tIdx].name = e.target.value;
                        setFormData({...formData, projects: newProjects});
                      }} />
                      <input type="text" placeholder="Class (ex: lang-ts)" value={tag.class} onChange={(e) => {
                        const newProjects = [...formData.projects];
                        newProjects[idx].tags[tIdx].class = e.target.value;
                        setFormData({...formData, projects: newProjects});
                      }} style={{ width: '120px' }} />
                      <button className="btn-remove" onClick={() => {
                        const newProjects = [...formData.projects];
                        newProjects[idx].tags = newProjects[idx].tags.filter((_, i) => i !== tIdx);
                        setFormData({...formData, projects: newProjects});
                      }}>×</button>
                    </div>
                  ))}
                  <button className="btn-ghost" style={{fontSize: '11px', padding: '5px 10px'}} onClick={() => {
                    const newProjects = [...formData.projects];
                    if (!newProjects[idx].tags) newProjects[idx].tags = [];
                    newProjects[idx].tags.push({ name: 'Nouveau', class: '' });
                    setFormData({...formData, projects: newProjects});
                  }}>+ Ajouter un tag</button>
                </div>
              </div>
            ))}
            <button className="btn-ghost" onClick={() => addArrayItem('projects', { id: Date.now().toString(), name: 'Nouveau Projet', emoji: '🚀', description: '', tags: [], links: [], featured: false })}>+ Ajouter un projet</button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="admin-form">
            <h3 className="admin-subtitle">Catégories de compétences</h3>
            {formData.skills.map((group, gIdx) => (
              <div key={gIdx} className="admin-entry-card">
                <div className="entry-header">
                  <span>Groupe: {group.title}</span>
                  <button className="btn-remove" onClick={() => removeArrayItem('skills', gIdx)}>Supprimer Groupe</button>
                </div>
                <div className="input-group">
                  <label>Titre du groupe</label>
                  <input type="text" value={group.title} onChange={(e) => {
                    const newSkills = [...formData.skills];
                    newSkills[gIdx].title = e.target.value;
                    setFormData({...formData, skills: newSkills});
                  }} />
                </div>
                {group.skills && (
                  <div className="nested-skills">
                    <label>Compétences (%):</label>
                    {group.skills.map((s, sIdx) => (
                      <div key={sIdx} className="skill-item-row">
                        <input type="text" placeholder="Nom" value={s.name} onChange={(e) => {
                          const newSkills = [...formData.skills];
                          newSkills[gIdx].skills[sIdx].name = e.target.value;
                          setFormData({...formData, skills: newSkills});
                        }} />
                        <input type="number" placeholder="%" value={s.percentage} onChange={(e) => {
                          const newSkills = [...formData.skills];
                          newSkills[gIdx].skills[sIdx].percentage = parseInt(e.target.value);
                          setFormData({...formData, skills: newSkills});
                        }} style={{ width: '80px' }} />
                        <button className="btn-remove" onClick={() => {
                          const newSkills = [...formData.skills];
                          newSkills[gIdx].skills = newSkills[gIdx].skills.filter((_, i) => i !== sIdx);
                          setFormData({...formData, skills: newSkills});
                        }}>×</button>
                      </div>
                    ))}
                    <button className="btn-ghost" style={{fontSize: '11px', padding: '5px 10px'}} onClick={() => {
                      const newSkills = [...formData.skills];
                      if (!newSkills[gIdx].skills) newSkills[gIdx].skills = [];
                      newSkills[gIdx].skills.push({ name: 'Nouveau', icon: '•', percentage: 50, color: 'accent' });
                      setFormData({...formData, skills: newSkills});
                    }}>+ Ajouter Compétence</button>
                  </div>
                )}

                {group.tools && (
                  <div className="nested-skills">
                    <label>Liste des outils:</label>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px'}}>
                      {group.tools.map((tool, tIdx) => (
                        <div key={tIdx} style={{display: 'flex', gap: '4px'}}>
                          <input type="text" value={tool} onChange={(e) => {
                            const newSkills = [...formData.skills];
                            newSkills[gIdx].tools[tIdx] = e.target.value;
                            setFormData({...formData, skills: newSkills});
                          }} style={{ width: '150px' }} />
                          <button className="btn-remove" onClick={() => {
                            const newSkills = [...formData.skills];
                            newSkills[gIdx].tools = newSkills[gIdx].tools.filter((_, i) => i !== tIdx);
                            setFormData({...formData, skills: newSkills});
                          }}>×</button>
                        </div>
                      ))}
                    </div>
                    <button className="btn-ghost" style={{fontSize: '11px', padding: '5px 10px', marginTop: '10px'}} onClick={() => {
                      const newSkills = [...formData.skills];
                      if (!newSkills[gIdx].tools) newSkills[gIdx].tools = [];
                      newSkills[gIdx].tools.push('Nouvel outil');
                      setFormData({...formData, skills: newSkills});
                    }}>+ Ajouter Outil</button>
                  </div>
                )}
              </div>
            ))}
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn-ghost" onClick={() => addArrayItem('skills', { title: 'Nouveau Groupe (%)', skills: [], tools: null })}>+ Groupe Compétences</button>
              <button className="btn-ghost" onClick={() => addArrayItem('skills', { title: 'Nouveau Groupe (Liste)', skills: null, tools: [] })}>+ Groupe Outils</button>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="admin-form">
            <h3 className="admin-subtitle">Historique & Parcours</h3>
            {formData.timeline.map((item, idx) => (
              <div key={idx} className="admin-entry-card">
                <div className="entry-header">
                  <span>Étape #{idx + 1}</span>
                  <button className="btn-remove" onClick={() => removeArrayItem('timeline', idx)}>Supprimer</button>
                </div>
                <div className="input-grid">
                  <div className="input-group"><label>Période</label><input type="text" value={item.period} onChange={(e) => handleArrayChange('timeline', idx, 'period', e.target.value)} /></div>
                  <div className="input-group"><label>Poste/Diplôme</label><input type="text" value={item.role} onChange={(e) => handleArrayChange('timeline', idx, 'role', e.target.value)} /></div>
                </div>
                <div className="input-group"><label>Entreprise/Lieu</label><input type="text" value={item.company} onChange={(e) => handleArrayChange('timeline', idx, 'company', e.target.value)} /></div>
                <div className="input-group"><label>Description</label><textarea value={item.description} onChange={(e) => handleArrayChange('timeline', idx, 'description', e.target.value)} /></div>
              </div>
            ))}
            <button className="btn-ghost" onClick={() => addArrayItem('timeline', { period: '2024', role: 'Nouveau', company: '', description: '', techs: [], muted: false, badge: '' })}>+ Ajouter une étape</button>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="admin-form">
            <h3 className="admin-subtitle">Disponibilité</h3>
            <div className="input-group">
              <label>Titre Disponibilité</label>
              <input type="text" value={formData.contact.availability.title} onChange={(e) => handleDeepChange('contact.availability.title', e.target.value)} />
            </div>
            <div className="input-group">
              <label>Description Disponibilité</label>
              <textarea value={formData.contact.availability.description} onChange={(e) => handleDeepChange('contact.availability.description', e.target.value)} />
            </div>

            <h3 className="admin-subtitle" style={{marginTop: '20px'}}>Cartes de Contact</h3>
            {formData.contact.cards.map((card, idx) => (
              <div key={idx} className="admin-entry-card" style={{padding: '15px', marginBottom: '10px'}}>
                <div className="input-grid">
                  <div className="input-group">
                    <label>Icone</label>
                    <input type="text" value={card.icon} onChange={(e) => {
                      const newCards = [...formData.contact.cards];
                      newCards[idx].icon = e.target.value;
                      setFormData({...formData, contact: {...formData.contact, cards: newCards}});
                    }} />
                  </div>
                  <div className="input-group">
                    <label>Label</label>
                    <input type="text" value={card.label} onChange={(e) => {
                      const newCards = [...formData.contact.cards];
                      newCards[idx].label = e.target.value;
                      setFormData({...formData, contact: {...formData.contact, cards: newCards}});
                    }} />
                  </div>
                </div>
                <div className="input-group">
                  <label>Valeur / Lien</label>
                  <input type="text" value={card.value} onChange={(e) => {
                    const newCards = [...formData.contact.cards];
                    newCards[idx].value = e.target.value;
                    setFormData({...formData, contact: {...formData.contact, cards: newCards}});
                  }} />
                </div>
                <button className="btn-remove" onClick={() => {
                  const newCards = formData.contact.cards.filter((_, i) => i !== idx);
                  setFormData({...formData, contact: {...formData.contact, cards: newCards}});
                }}>Supprimer Carte</button>
              </div>
            ))}
            <button className="btn-ghost" onClick={() => {
              const newCards = [...formData.contact.cards, {icon: '📩', label: 'Nouveau', value: ''}];
              setFormData({...formData, contact: {...formData.contact, cards: newCards}});
            }}>+ Ajouter une carte de contact</button>
          </div>
        )}

        <div className="admin-actions">
          <button className="btn-primary" onClick={handleSave}>Enregistrer les modifications</button>
          {status.msg && <span className={`admin-status ${status.type}`}>{status.msg}</span>}
        </div>
      </div>
    </div>
  );
}

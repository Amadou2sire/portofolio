import { useState } from 'react';

export default function Login({ onLogin, onCancel }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const expectedUser = import.meta.env.VITE_ADMIN_USERNAME;
    const expectedPass = import.meta.env.VITE_ADMIN_PASSWORD;

    if (username === expectedUser && password === expectedPass) {
      onLogin();
    } else {
      setError('Identifiants invalides');
    }
  };

  return (
    <div className="section active" id="login">
      <div className="admin-container" style={{ maxWidth: '400px', margin: '100px auto' }}>
        <div className="section-header">
          <span className="section-badge">SÉCURITÉ</span>
          <h2 className="section-title">Accès <span>Restreint</span></h2>
        </div>
        
        <div className="admin-card">
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="input-group">
              <label>Nom d'utilisateur</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Identifiant"
                autoFocus
              />
            </div>
            <div className="input-group">
              <label>Mot de passe</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
              />
            </div>
            
            {error && <div style={{ color: '#ff4d4d', fontSize: '12px', marginBottom: '15px' }}>{error}</div>}
            
            <div className="admin-actions">
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Se connecter</button>
              <button type="button" onClick={onCancel} className="btn-ghost" style={{ width: '100%', marginTop: '10px' }}>Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

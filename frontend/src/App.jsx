import { useState, useEffect } from 'react';
import { fetchAll } from './api';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Login from './components/Login';

export default function App() {
  const [data, setData] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchAll()
      .then(setData)
      .catch((err) => {
        console.error('API error:', err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="loading-screen">
        <span>⚠️ Impossible de contacter Supabase — Vérifiez vos clés API dans le fichier .env</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        Chargement du portfolio…
      </div>
    );
  }

  const navigate = (id) => setActiveSection(id);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Home profile={data.profile} onNavigate={navigate} />;
      case 'projects':
        return <Projects projects={data.projects} />;
      case 'skills':
        return <Skills skills={data.skills} />;
      case 'timeline':
        return <Timeline timeline={data.timeline} />;
      case 'contact':
        return <Contact contact={data.contact} />;
      case 'admin':
        if (!isAuthenticated) {
          return (
            <Login 
              onLogin={() => setIsAuthenticated(true)} 
              onCancel={() => setActiveSection('home')} 
            />
          );
        }
        return (
          <Admin 
            data={data} 
            onUpdate={setData} 
            onLogout={() => {
              setIsAuthenticated(false);
              setActiveSection('home');
            }} 
          />
        );

      default:
        return <Home profile={data.profile} onNavigate={navigate} />;
    }
  };

  const dynamicNav = data.nav.map(item => ({
    ...item,
    count: item.id === 'projects' ? data.projects.length.toString() : item.count
  }));

  return (
    <div className="shell">
      <Sidebar
        profile={data.profile}
        nav={dynamicNav}
        activeSection={activeSection}
        onNavigate={navigate}
      />
      <main className="main">{renderSection()}</main>
    </div>
  );
}

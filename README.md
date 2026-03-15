# CV Portfolio Développeur

Un portfolio professionnel et dynamique basé sur l'architecture suivante :
- **Backend / API** : FastAPI (Python)
- **Frontend / Client** : React + Vite.js (JavaScript, CSS Natif avec IntersectionObserver pour les animations)

## Structure du projet

- `backend/` : API REST
  - `main.py` : Serveur Uvicorn & app FastAPI (expose les endpoints API)
  - `data.py` : Données brutes du portfolio (profil, expériences, portfolio, contact...)
  - `venv/` : Environnement virtuel contenant les dépendances FastAPI, Uvicorn et Pydantic
- `frontend/` : Application UI avec Vite.js
  - `src/App.jsx` : Squelette central qui orchestre les requêtes de l'API
  - `src/index.css` : Design system (variables CSS, "Dark & Sharp theme")
  - `src/components/` : Composants du CV (`Home`, `Projects`, `Skills`, `Timeline`, `Contact`, `Sidebar`)

## Comment démarrer le projet ?

Ce projet comprend deux serveurs locaux indépendants (Frontend + Backend). 
Il vous faut ouvrir **deux terminaux séparés**.

### 1. Démarrer le Serveur Backend (FastAPI)

Dans votre premier terminal, naviguez dans le sous-dossier `backend` :

```cmd
cd backend
```

Si votre environnement virtuel est en place (`venv/`), exécutez le serveur en tapant via l'interpréteur du venv :
```cmd
venv\Scripts\python.exe -m uvicorn main:app --reload
```
L'API devrait maintenant être à l'écoute sur **http://127.0.0.1:8000**

### 2. Démarrer le Serveur Frontend (React)

Dans un second terminal, naviguez dans le sous-dossier `frontend` :

```cmd
cd frontend
```

Ensuite, lancez le serveur de développement :
```cmd
npm run dev
```

### 3. Configuration de la sécurité (Admin)

Le dossier `frontend` contient un fichier `.env.example`. 
1. Créez un fichier `.env` dans le dossier `frontend`.
2. Copiez le contenu de `.env.example` et définissez vos identifiants.
3. Pour accéder à la console d'administration, **double-cliquez sur l'avatar** dans la barre latérale du portfolio.


Ouvrez la page **http://localhost:5173** (ou celle qui vous est octroyée) depuis votre explorateur pour visualiser le projet.

## Crédits & Orchestration
Ce design, la stratégie de branding, l'architecture, la configuration de l'API et le code HTML/CSS/JS ont été générés et dirigés via la compétence d'orchestration Multi-Agent interactive **JarvisBot**.

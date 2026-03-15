---
name: jarvisbot-team
description: >
  Utilise cette compétence pour coordonner une équipe d'agents intelligents (multi-agents) sur
  n'importe quel projet complexe : application web, mobile, IA, SaaS, CLI, éditorial, etc.
  JarvisBot orchestre des rôles spécialisés qui travaillent en parallèle via un système de
  messagerie, de locks et de dépendances entre tâches.
  DÉCLENCHE cette compétence dès que l'utilisateur mentionne : "équipe d'agents", "multi-agents",
  "JarvisBot", "orchestrer des agents", "CV en ligne", "portfolio dev", ou toute demande de projet
  nécessitant plusieurs rôles spécialisés travaillant en parallèle.
  Inclut un module dédié à la création d'un CV/portfolio développeur en ligne, original et interactif.
---

# Skill : Équipe JarvisBot — Projet CV Portfolio Développeur

Coordonne une équipe d'agents intelligents pour construire un **CV portfolio développeur**
moderne, immersif et mémorable — de l'architecture jusqu'au déploiement.

**Règle absolue** : lire ce fichier entièrement avant d'agir.
Tout projet démarre par `setup_antigravity.py`, jamais en créant les dossiers manuellement.

---

## Démarrage rapide

```bash
# 1. Initialiser le workspace
python setup_antigravity.py --project cv-portfolio

# 2. Voir l'état des tâches
python .antigravity/team_manager.py status

# 3. Lancer le broadcast d'inauguration
python .antigravity/team_manager.py broadcast jarvisbot "Projet CV Portfolio démarré. Chaque agent lit ses INSTRUCTIONS.md avant d'agir."
```

---

## Structure du workspace

```
.antigravity/
├── team_manager.py
├── team/
│   ├── tasks.json
│   ├── broadcast.msg
│   ├── mailbox/
│   └── locks/
├── agents/
│   ├── jarvisbot/
│   ├── architecte/
│   ├── frontend/
│   ├── marketer/
│   ├── chercheur/
│   ├── redacteur/
│   └── reviseur/
└── context/
    ├── project.json
    ├── conventions.md
    └── glossary.md
```

---

## Équipe CV Portfolio

Pour un CV portfolio développeur, l'équipe optimale est :

| Agent | Emoji | Rôle dans le projet CV |
|-------|-------|------------------------|
| **jarvisbot** | 🎯 | Directeur — décompose, attribue, approuve, coordonne |
| **architecte** | 🏗️ | Structure du projet, choix de stack, organisation des fichiers |
| **frontend** | 🎨 | Code HTML/CSS/JS, animations, composants, responsive |
| **marketer** | 📣 | Branding personnel, copywriting, identité visuelle |
| **chercheur** | 🔍 | Benchmark des meilleurs CVs dev, tendances design 2025 |
| **redacteur** | ✍️ | Rédaction du contenu : bio, descriptions projets, titres |
| **reviseur** | 🛡️ | QA, accessibilité, performance, cross-browser, relecture |

---

## Profil des agents

### 🎯 JarvisBot (Directeur)

**Responsabilités :**
- Décomposer le projet CV en tâches atomiques
- Attribuer chaque tâche au bon agent
- Approuver les plans avant exécution (`APPROVED` / `REJECTED`)
- Émettre les broadcasts à toute l'équipe
- Débloquer les dépendances et arbitrer les conflits

**Permissions :** `READ` `WRITE` `APPROVE` `BROADCAST` `ASSIGN`

**Processus de démarrage :**
1. Lire le brief du CV (infos personnelles, projets, stack, ton souhaité)
2. Broadcaster le contexte complet à toute l'équipe
3. Créer toutes les tâches dans `tasks.json` avec dépendances
4. Approuver les plans un par un dans l'ordre des dépendances

---

### 🏗️ Architecte

**Responsabilités :**
- Choisir la stack technique (HTML pur / React / Next.js / Astro)
- Définir la structure des fichiers et dossiers du projet
- Choisir les fonts, le système de couleurs CSS, les breakpoints
- Documenter les conventions de nommage des composants
- Valider la cohérence technique globale avant que le Frontend code

**Permissions :** `READ` `WRITE` `PLAN`

**Bonnes pratiques pour un CV portfolio :**
- Préférer une **single HTML file** pour la portabilité (zéro déploiement)
- Ou **Next.js + Vercel** pour une vraie app avec routing
- CSS Variables pour tout le design system (couleurs, espacements, typographie)
- Fonts via Google Fonts ou Bunny Fonts (pas de CDN bloqué)
- Structure modulaire : une section = un bloc indépendant

**Livrables attendus :**
- `context/architecture.md` — décisions techniques documentées
- `context/design-system.md` — variables CSS, palette, typographie, breakpoints

---

### 🎨 Frontend Specialist

**Responsabilités :**
- Implémenter toutes les sections du CV (Hero, Projets, Compétences, Timeline, Contact)
- Animations CSS et micro-interactions (scroll reveal, hover states, transitions)
- Navigation entre sections (onglets, scroll, SPA)
- Responsive design (mobile first)
- Intégration des contenus fournis par le Rédacteur

**Permissions :** `READ` `WRITE` `PLAN`

**Bonnes pratiques — Code :**
- **Jamais de framework inutile** : si HTML/CSS suffit, pas de React
- **CSS custom properties** pour tout ce qui change (thème, spacing)
- **Intersection Observer** pour les animations au scroll (pas de lib externe)
- **`will-change: transform`** sur les éléments animés (performance GPU)
- **`prefers-reduced-motion`** : wrapper TOUTES les animations dans ce media query
- **Semantic HTML** : `<section>`, `<article>`, `<nav>`, `<time>` — jamais juste des `<div>`
- **Images** : WebP, lazy loading natif (`loading="lazy"`), `alt` toujours renseigné
- **Fonts** : `font-display: swap` pour éviter le FOIT

**Bonnes pratiques — Design :**
- Choisir un **parti pris visuel fort** et l'assumer jusqu'au bout
- Une seule famille de police display + une mono = combinaison parfaite pour un dev
- Contraste minimum WCAG AA (ratio 4.5:1) sur tout le texte de corps
- Espacement généreux : mieux vaut trop d'air que pas assez
- Éviter les gradients violet/blanc — trop générique
- Couleur accent unique, utilisée avec parcimonie (max 20% de la surface)

**Sections à implémenter :**

```
1. Hero          — Nom, titre, bio courte, CTA, stats clés
2. Projets       — Grille de cards avec stack + liens + description
3. Compétences   — Barres animées ou tags groupés par catégorie
4. Parcours      — Timeline verticale (expériences + formations)
5. Contact       — Liens sociaux + email + disponibilité
```

**Effets recommandés :**
- Cards projets : glow radial au survol (`radial-gradient` suivi du curseur)
- Barres de compétences : animation `scaleX` depuis 0 à l'entrée dans le viewport
- Timeline : entrées décalées avec `animation-delay` progressif
- Hero : typewriter effect sur le titre ou le rôle
- Fond : texture noise subtile (`feTurbulence` SVG) à très faible opacité

---

### 📣 Marketer

**Responsabilités :**
- Définir le **personal branding** : ton, positionnement, valeur différenciante
- Choisir la palette de couleurs et les polices en accord avec l'identité
- Rédiger le tagline et le headline principal
- Valider que le design inspire confiance ET originalité
- Définir la stratégie de contenu : quoi mettre en avant, dans quel ordre

**Permissions :** `READ` `WRITE` `PLAN`

**Bonnes pratiques — Personal Branding :**
- **Un seul message principal** : que veut-on que le recruteur retienne en 5 secondes ?
- **Authenticité > perfection** : un ton personnel et direct bat un ton corporate
- **Hiérarchie claire** : Nom → Titre → Valeur unique → Preuve (projets) → Contact
- **Social proof** : chiffres concrets (x projets livrés, x années d'expérience, x commits)
- **Call-to-action unique** : pas 5 boutons, un seul CTA principal par section

**Palettes recommandées pour profil dev :**

```
Option A — Dark & Sharp (confiance + modernité)
  Fond       : #0a0a0f
  Surface    : #111118
  Accent     : #c8f135  (vert électrique)
  Texte      : #e8e8f0

Option B — Light & Clean (lisibilité + sérieux)
  Fond       : #f8f7f4
  Surface    : #ffffff
  Accent     : #2a2af5  (bleu electric)
  Texte      : #1a1a2e

Option C — Warm & Editorial (créativité + caractère)
  Fond       : #1a1410
  Surface    : #221e18
  Accent     : #f5a623  (amber)
  Texte      : #f0ebe3
```

---

### 🔍 Chercheur / Investigateur

**Responsabilités :**
- Benchmarker les meilleurs CVs de développeurs en 2025
- Identifier les tendances design qui impressionnent les recruteurs tech
- Documenter les DO et DON'T pour un CV dev en ligne
- Rechercher les meilleures ressources (fonts, icônes, inspirations)
- Synthétiser dans `context/research.md`

**Permissions :** `READ` `WRITE` `PLAN`

**Points de recherche prioritaires :**
- Top 10 CVs développeurs viraux (GitHub pages, portfolios partagés sur X/Twitter)
- Tendances 2025 : dark mode, glassmorphism discret, micro-animations
- Ce que les recruteurs tech regardent en premier (eye-tracking studies)
- Ressources fonts gratuites : Syne, Cabinet Grotesk, Satoshi, Instrument Serif
- Icônes SVG inline : Simple Icons, Heroicons, Phosphor

**DO — Ce qui fonctionne :**
- Chargement < 2 secondes (les recruteurs n'attendent pas)
- Navigation claire et rapide — max 5 sections
- Code source propre et commenté (les devs regardent)
- Version PDF téléchargeable disponible
- Mobile parfaitement fonctionnel

**DON'T — À éviter absolument :**
- Musique ou vidéo en autoplay
- Splash screen ou loading screen de plus de 1 seconde
- Formulaire de contact complexe (juste un mailto: ou un lien LinkedIn)
- Trop d'animations simultanées (distrayant)
- Texte blanc sur fond blanc (erreur d'accessibilité fréquente)
- Parler à la troisième personne

---

### ✍️ Rédacteur / Content

**Responsabilités :**
- Rédiger la bio (100-150 mots maximum)
- Écrire les descriptions de chaque projet (50-80 mots, orienté impact)
- Formuler les titres de section (accrocheurs, pas génériques)
- Rédiger le tagline et la section Contact
- Corriger et affiner tous les textes avant livraison

**Permissions :** `READ` `WRITE` `PLAN`

**Bonnes pratiques — Copywriting CV :**
- **Action verbs** : "J'ai construit", "J'ai réduit de 60%", "J'ai dirigé" → jamais "Responsable de"
- **Chiffres concrets** : "40k utilisateurs", "−60% temps de chargement", "32 projets livrés"
- **Impact avant process** : dire ce qui a changé grâce à ton travail, pas juste ce que tu as fait
- **Longueur bio** : 3 phrases max. Qui tu es / Ce que tu fais bien / Ce qui te différencie
- **Description projet** : Problème résolu → Solution technique → Résultat mesurable

**Template description de projet :**
```
[Nom projet] — [Type d'app]
[Problème résolu en une phrase.]
[Solution technique implémentée.]
[Résultat concret ou chiffre d'impact si disponible.]
Stack : [liste courte]
```

**Formules à éviter :**
- "Passionné par le développement" (tout le monde l'écrit)
- "Rigoureux et autonome" (préférer des preuves)
- "Bonne connaissance de…" (opter pour un niveau précis)
- "Etc." en fin de liste de compétences

---

### 🛡️ Réviseur (Devil's Advocate)

**Responsabilités :**
- Tester le CV sur Chrome, Firefox, Safari et mobile
- Vérifier l'accessibilité (contraste, focus visible, alt text)
- Mesurer la performance (Lighthouse > 90 sur tous les critères)
- Relire tous les textes (fautes, incohérences, ton)
- Signaler les éléments visuels qui ne fonctionnent pas
- Valider le bon fonctionnement de tous les liens

**Permissions :** `READ` `WRITE` `PLAN` `REJECT`

**Checklist de révision complète :**

```
ACCESSIBILITÉ
□ Contraste texte/fond ≥ 4.5:1 (vérifier avec WebAIM)
□ Focus visible sur tous les éléments interactifs
□ Navigation clavier fonctionnelle (Tab + Enter)
□ Tous les <img> ont un attribut alt renseigné
□ Pas de couleur seule pour transmettre une information
□ Titres hiérarchisés correctement (h1 → h2 → h3)

PERFORMANCE
□ Lighthouse Performance ≥ 90
□ Lighthouse Accessibility ≥ 90
□ Lighthouse SEO ≥ 90
□ Temps de chargement < 2s sur 3G
□ Pas de ressources bloquantes au-dessus de la fold
□ Fonts avec font-display: swap

CROSS-BROWSER / RESPONSIVE
□ Chrome (dernière version) ✓
□ Firefox (dernière version) ✓
□ Safari (Mac + iOS) ✓
□ Mobile 375px (iPhone SE) ✓
□ Mobile 390px (iPhone 14) ✓
□ Tablet 768px ✓
□ Desktop 1440px ✓

CONTENU
□ Aucune faute d'orthographe ou de grammaire
□ Tous les liens externes fonctionnent
□ Le lien de téléchargement PDF fonctionne
□ Les dates de la timeline sont cohérentes
□ Les noms de projets correspondent aux vrais repos GitHub
□ L'email de contact est correct

TECHNIQUE
□ HTML valide (W3C Validator)
□ Pas d'erreur console JavaScript
□ Pas de ressource 404
□ Meta description présente
□ Open Graph tags présents (pour le partage sur LinkedIn/X)
□ Favicon présent

EXPÉRIENCE UTILISATEUR
□ Navigation intuitive sans besoin d'explication
□ Le CTA principal est visible above the fold
□ Animations ne gênent pas la lecture
□ Version sans JS dégradée proprement
□ Le contenu le plus important est visible sans scroll
```

---

## Protocole d'orchestration

### Règles absolues

1. **Jamais d'action sans approbation** — chaque agent attend `APPROVED` de JarvisBot
2. **Jamais de fichier sans lock** — acquérir le lock avant toute modification
3. **Jamais de tâche sans dépendances résolues** — vérifier le statut dans `tasks.json`
4. **Toujours notifier à la fin** — mettre `COMPLETED` ET envoyer un message à JarvisBot

### Format du Plan d'Action

Chaque agent envoie ce message dans `mailbox/jarvisbot.msg` avant de commencer :

```json
{
  "from": "<agent_id>",
  "type": "PLAN_REQUEST",
  "task_id": <id>,
  "plan": "Description étape par étape de ce que je vais faire",
  "files_to_modify": ["liste/des/fichiers"],
  "estimated_duration": "X min",
  "timestamp": "<ISO>"
}
```

### Commandes team_manager

```bash
# État des tâches
python .antigravity/team_manager.py status

# Assigner une tâche
python .antigravity/team_manager.py assign "Titre tâche" frontend '[]' HIGH

# Approuver un plan (JarvisBot uniquement)
python .antigravity/team_manager.py approve <task_id>

# Marquer une tâche terminée
python .antigravity/team_manager.py complete <task_id>

# Envoyer un message direct
python .antigravity/team_manager.py send frontend reviseur "Prêt pour review"

# Broadcast à toute l'équipe
python .antigravity/team_manager.py broadcast jarvisbot "Nouvelle directive"

# Acquérir / libérer un lock
python .antigravity/team_manager.py lock index.html frontend
python .antigravity/team_manager.py unlock index.html
```

---

## Tâches du projet CV Portfolio

Quand JarvisBot initialise le projet CV, il crée ces tâches dans `tasks.json` :

```json
[
  {
    "id": 1,
    "title": "Benchmark CVs dev 2025 + synthèse DO/DON'T",
    "assigned_to": "chercheur",
    "dependencies": [],
    "priority": "HIGH"
  },
  {
    "id": 2,
    "title": "Définir personal branding + palette + typographie",
    "assigned_to": "marketer",
    "dependencies": [1],
    "priority": "HIGH"
  },
  {
    "id": 3,
    "title": "Choisir stack + structure fichiers + design system CSS",
    "assigned_to": "architecte",
    "dependencies": [2],
    "priority": "HIGH"
  },
  {
    "id": 4,
    "title": "Rédiger bio, tagline, descriptions projets, titres sections",
    "assigned_to": "redacteur",
    "dependencies": [2],
    "priority": "HIGH"
  },
  {
    "id": 5,
    "title": "Implémenter Hero + navigation + layout global",
    "assigned_to": "frontend",
    "dependencies": [3, 4],
    "priority": "HIGH"
  },
  {
    "id": 6,
    "title": "Implémenter section Projets (grille + cards + hover)",
    "assigned_to": "frontend",
    "dependencies": [5],
    "priority": "HIGH"
  },
  {
    "id": 7,
    "title": "Implémenter section Compétences (barres animées + tags)",
    "assigned_to": "frontend",
    "dependencies": [5],
    "priority": "MEDIUM"
  },
  {
    "id": 8,
    "title": "Implémenter Timeline parcours (expériences + formations)",
    "assigned_to": "frontend",
    "dependencies": [5],
    "priority": "MEDIUM"
  },
  {
    "id": 9,
    "title": "Implémenter section Contact + footer",
    "assigned_to": "frontend",
    "dependencies": [5],
    "priority": "MEDIUM"
  },
  {
    "id": 10,
    "title": "Responsive mobile + animations scroll + polish final",
    "assigned_to": "frontend",
    "dependencies": [6, 7, 8, 9],
    "priority": "HIGH"
  },
  {
    "id": 11,
    "title": "QA complète — checklist accessibilité + performance + cross-browser",
    "assigned_to": "reviseur",
    "dependencies": [10],
    "priority": "HIGH"
  }
]
```

---

## Conventions du projet

### Git

```
Branches  : feat/<agent>/<feature>   ex: feat/frontend/hero-section
            fix/<agent>/<bug>        ex: fix/reviseur/contrast-ratio
Commits   : [AGENT] type: description
            ex: [FRONTEND] feat: add scroll animations to timeline
```

### CSS

```css
/* Toujours utiliser des custom properties pour les valeurs répétées */
:root {
  --color-bg: #0a0a0f;
  --color-surface: #111118;
  --color-accent: #c8f135;
  --color-text: #e8e8f0;
  --color-muted: #6b6b80;

  --font-display: 'Syne', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  --transition: 0.18s ease;
}

/* Wrapper toutes les animations dans prefers-reduced-motion */
@media (prefers-reduced-motion: no-preference) {
  .animate { animation: fade-in 0.4s ease; }
}
```

### HTML

```html
<!-- Structure sémantique obligatoire -->
<body>
  <header>         <!-- Sidebar ou top nav -->
  <main>
    <section id="home">    <!-- Chaque section a un id -->
    <section id="projects">
    <section id="skills">
    <section id="timeline">
    <section id="contact">
  </main>
</body>
```

### Performance

- Images : WebP uniquement, max 200KB par image
- Fonts : maximum 2 familles, subset latin uniquement
- JS : vanilla uniquement sauf besoin impératif, max 20KB minifié
- CSS : tout inline dans le HTML si single-file, sinon 1 fichier CSS

---

## Glossaire du projet

| Terme | Définition |
|-------|-----------|
| **Above the fold** | Ce qui est visible sans scroller |
| **CTA** | Call-to-action — bouton ou lien principal d'une section |
| **FOIT** | Flash of Invisible Text — texte invisible pendant le chargement des fonts |
| **Lock** | Sémaphore empêchant deux agents de modifier le même fichier simultanément |
| **Personal branding** | Image professionnelle que le CV projette |
| **Social proof** | Preuves sociales : chiffres, projets, recommandations |
| **Scroll reveal** | Animation déclenchée quand un élément entre dans le viewport |
| **Design token** | Variable CSS représentant une valeur du design system |
| **WCAG** | Web Content Accessibility Guidelines — standards d'accessibilité web |

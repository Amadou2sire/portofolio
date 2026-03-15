import json
import os

DATA_FILE = os.path.join(os.path.dirname(__file__), "database.json")

def load_data():
    if not os.path.exists(DATA_FILE):
        return {
            "profile": {
                "initials": "AS",
                "name": "Amadou Siré Soumaré",
                "title": "// Développeur Fullstack - QA Tester",
                "status": "Disponible pour missions",
                "greeting": "👋 Bonjour, je suis",
                "hero_name": "Amadou Siré Soumaré",
                "hero_role": "Développeur Fullstack & ",
                "hero_role_highlight": "QA Specialist",
                "bio": "Développeur Fullstack polyvalent avec une double compétence en gestion de projets web et en Assurance Qualité (QA).",
                "stats": [
                    {"value": "4", "suffix": "+", "label": "Années d'expérience"},
                    {"value": "20", "suffix": "+", "label": "Projets gérés"},
                    {"value": "100", "suffix": "%", "label": "Engagement Qualité"}
                ],
                "socials": [
                    {"label": "Email", "url": "mailto:beydisoumare@outlook.com"},
                    {"label": "LI", "url": "#"},
                    {"label": "GH", "url": "#"}
                ]
            },
            "projects": [
                {
                    "id": "p1",
                    "emoji": "🛡️",
                    "name": "FormFlowValidator",
                    "description": "Plateforme SaaS pour auditer et valider automatiquement les tunnels de souscription.",
                    "tags": [{"name": "Python", "class": "lang-py"}, {"name": "FastAPI", "class": ""}],
                    "links": [{"label": "⌥ Pipeline QA", "url": "#"}],
                    "featured": True
                }
            ],
            "skills": [
                {
                    "title": "Backend",
                    "skills": [{"name": "Python", "icon": "🐍", "percentage": 90, "color": "accent"}],
                    "tools": None
                }
            ],
            "timeline": [],
            "contact": {
                "cards": [{"icon": "📧", "label": "Email", "value": "beydisoumare@outlook.com"}],
                "availability": {"title": "Disponible", "description": "Disponible pour missions."}
            },
            "nav": [
                {"id": "home", "icon": "⌂", "label": "Accueil"},
                {"id": "projects", "icon": "◈", "label": "Projets"},
                {"id": "skills", "icon": "◎", "label": "Compétences"},
                {"id": "timeline", "icon": "◷", "label": "Parcours"},
                {"id": "contact", "icon": "◉", "label": "Contact"}
            ]
        }
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

from pydantic import BaseModel


class Profile(BaseModel):
    initials: str
    name: str
    title: str
    status: str
    greeting: str
    hero_name: str
    hero_role: str
    hero_role_highlight: str
    bio: str
    stats: list[dict]
    socials: list[dict]


class Project(BaseModel):
    id: str
    emoji: str
    name: str
    description: str
    tags: list[dict]
    links: list[dict]
    featured: bool = False


class Skill(BaseModel):
    name: str
    icon: str
    percentage: int
    color: str  # "accent", "accent2", "accent3"


class SkillGroup(BaseModel):
    title: str
    skills: list[Skill] | None = None
    tools: list[str] | None = None


class TimelineItem(BaseModel):
    period: str
    role: str
    company: str
    badge: str | None = None
    description: str
    techs: list[str]
    muted: bool = False


class ContactCard(BaseModel):
    icon: str
    label: str
    value: str


class Availability(BaseModel):
    icon: str
    title: str
    description: str


class ContactInfo(BaseModel):
    cards: list[ContactCard]
    availability: Availability

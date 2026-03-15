const API_BASE = 'http://127.0.0.1:8000';

export async function fetchAll() {
  const res = await fetch(`${API_BASE}/api/all`);
  if (!res.ok) throw new Error('API unreachable');
  return res.json();
}

export async function fetchProfile() {
  const res = await fetch(`${API_BASE}/api/profile`);
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/api/projects`);
  return res.json();
}

export async function fetchSkills() {
  const res = await fetch(`${API_BASE}/api/skills`);
  return res.json();
}

export async function fetchTimeline() {
  const res = await fetch(`${API_BASE}/api/timeline`);
  return res.json();
}

export async function fetchContact() {
  const res = await fetch(`${API_BASE}/api/contact`);
  return res.json();
}

export async function fetchNav() {
  const res = await fetch(`${API_BASE}/api/nav`);
  return res.json();
}

export async function updateData(data) {
  const res = await fetch(`${API_BASE}/api/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Update failed');
  return res.json();
}

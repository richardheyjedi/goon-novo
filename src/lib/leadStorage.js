const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const GOOGLE_SHEETS_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL
  || 'https://script.google.com/macros/s/AKfycbzks6oA7uxb_Z4VZqgWsOTcffIdfLlIBySlTSbx_gDrmj4Nbzh4pJGR76IsALa4JkaU/exec';
const FALLBACK_KEY = 'goon_leads_fallback_v1';

const isConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

function getFallbackLeads() {
  try {
    const stored = JSON.parse(localStorage.getItem(FALLBACK_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function saveFallbackLead(data) {
  const lead = { id: crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`, created_at: new Date().toISOString(), ...data, localFallback: true };
  localStorage.setItem(FALLBACK_KEY, JSON.stringify([lead, ...getFallbackLeads()].slice(0, 100)));
  return lead;
}

async function request(path, { method = 'GET', body, token } = {}) {
  if (!isConfigured) throw new Error('Supabase não configurado.');
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${token || SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(detail.message || `Erro do Supabase (${response.status}).`);
  }
  return response.status === 204 ? null : response.json();
}

async function sendLeadToGoogleSheets(data) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) return;

  const createdAt = new Date().toISOString();

  await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      ...data,
      nome: data.name,
      telefone: data.phone,
      faturamento: data.revenue,
      created_at: createdAt,
      data: createdAt,
      timestamp: createdAt,
      source: 'goon-novo',
    }),
  });
}

export async function getLeads(token) {
  return (await request('leads?select=id,created_at,name,phone,revenue,instagram&order=created_at.desc', { token })) || [];
}

export async function saveLead(data) {
  try {
    await request('leads', { method: 'POST', body: data });
    try {
      await sendLeadToGoogleSheets(data);
    } catch (sheetsError) {
      console.error('Lead salvo no Supabase, mas não enviado ao Google Sheets:', sheetsError.message);
    }
    window.dispatchEvent(new CustomEvent('goon-leads-updated'));
    return { ...data, storedIn: 'supabase' };
  } catch (error) {
    console.error('Não foi possível salvar no Supabase:', error.message);
    const fallback = saveFallbackLead(data);
    window.dispatchEvent(new CustomEvent('goon-leads-updated'));
    return { ...fallback, storedIn: 'local-fallback' };
  }
}

export async function deleteLead(id, token) {
  await request(`leads?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE', token });
  window.dispatchEvent(new CustomEvent('goon-leads-updated'));
}

export async function clearLeads(token) {
  await request('leads?created_at=gte.1970-01-01T00:00:00.000Z', { method: 'DELETE', token });
  window.dispatchEvent(new CustomEvent('goon-leads-updated'));
}

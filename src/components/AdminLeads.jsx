import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { clearLeads, deleteLead, getLeads } from '../lib/leadStorage';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

function formatDate(value) {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value));
}

function csvCell(value) {
  return `"${String(value || '').replaceAll('"', '""')}"`;
}

export default function AdminLeads() {
  const [isVisible, setIsVisible] = useState(() => window.location.hash === '#admin');
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  const refresh = useCallback(async () => {
    if (!session) return;
    setLoadingLeads(true);
    try {
      setLeads(await getLeads(session.access_token));
      setError('');
    } catch (requestError) {
      setError(requestError.message || 'Não foi possível carregar os leads.');
    } finally {
      setLoadingLeads(false);
    }
  }, [session]);

  useEffect(() => {
    const onHashChange = () => setIsVisible(window.location.hash === '#admin');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthLoading(false);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isVisible]);

  useEffect(() => {
    if (!session) {
      setLeads([]);
      return;
    }
    refresh();
    const onUpdate = () => refresh();
    window.addEventListener('goon-leads-updated', onUpdate);
    return () => window.removeEventListener('goon-leads-updated', onUpdate);
  }, [session, refresh]);

  const filteredLeads = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('pt-BR');
    if (!normalized) return leads;
    return leads.filter((lead) => [lead.name, lead.phone, lead.revenue, lead.instagram]
      .some((value) => String(value || '').toLocaleLowerCase('pt-BR').includes(normalized)));
  }, [leads, query]);

  if (!isVisible) return null;

  const close = () => {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    setIsVisible(false);
  };

  const login = async (event) => {
    event.preventDefault();
    setError('');
    setAuthLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (authError) setError('E-mail ou senha inválidos.');
    setAuthLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setLeads([]);
  };

  const remove = async (id) => {
    if (!window.confirm('Excluir este lead?')) return;
    try { await deleteLead(id, session.access_token); } catch (requestError) { setError(requestError.message); }
  };

  const removeAll = async () => {
    if (!leads.length || !window.confirm('Excluir todos os leads do banco?')) return;
    try { await clearLeads(session.access_token); } catch (requestError) { setError(requestError.message); }
  };

  const exportCsv = () => {
    const rows = [['Data', 'Nome', 'Telefone', 'Faturamento', 'Instagram'], ...filteredLeads.map((lead) => [formatDate(lead.created_at), lead.name, lead.phone, lead.revenue, lead.instagram])];
    const content = `\uFEFF${rows.map((row) => row.map(csvCell).join(';')).join('\n')}`;
    const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `goon-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isSupabaseConfigured) {
    return <div className="admin-shell"><button className="admin-close" onClick={close}>×</button><div className="admin-login"><h1>Configuração ausente</h1><p>Configure as variáveis do Supabase para acessar a central.</p></div></div>;
  }

  if (authLoading && !session) {
    return <div className="admin-shell"><div className="admin-empty"><p>Verificando acesso…</p></div></div>;
  }

  if (!session) {
    return (
      <div className="admin-shell">
        <button className="admin-close" onClick={close} aria-label="Fechar central">×</button>
        <form className="admin-login" onSubmit={login}>
          <span className="eyebrow">Acesso restrito</span>
          <h1>Central de leads</h1>
          <p>Entre com o usuário administrador cadastrado no Supabase.</p>
          <label htmlFor="admin-email">E-mail</label>
          <input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" required />
          <label htmlFor="admin-password">Senha</label>
          <input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
          {error && <span className="admin-error" role="alert">{error}</span>}
          <button className="btn btn-primary" type="submit" disabled={authLoading}>{authLoading ? 'Entrando…' : 'Entrar'}</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-shell admin-dashboard">
      <header className="admin-header">
        <div><span className="eyebrow">Área administrativa</span><h1>Central de leads</h1><p>{leads.length} {leads.length === 1 ? 'lead armazenado' : 'leads armazenados'} no Supabase</p></div>
        <div className="admin-header-actions"><button className="btn btn-ghost" onClick={logout}>Sair</button><button className="admin-close" onClick={close} aria-label="Fechar central">×</button></div>
      </header>
      <div className="admin-toolbar">
        <input type="search" placeholder="Buscar por nome, telefone ou Instagram" value={query} onChange={(event) => setQuery(event.target.value)} />
        <button className="btn btn-ghost" onClick={exportCsv} disabled={!filteredLeads.length}>Exportar CSV</button>
        <button className="btn admin-danger" onClick={removeAll} disabled={!leads.length}>Limpar todos</button>
      </div>
      {error && <div className="admin-notice admin-error" role="alert">{error}</div>}
      {loadingLeads ? <div className="admin-empty"><p>Carregando leads…</p></div> : filteredLeads.length ? (
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Data</th><th>Nome</th><th>Telefone</th><th>Faturamento</th><th>Instagram</th><th></th></tr></thead><tbody>
          {filteredLeads.map((lead) => <tr key={lead.id}><td>{formatDate(lead.created_at)}</td><td><strong>{lead.name}</strong></td><td><a href={`tel:${lead.phone}`}>{lead.phone}</a></td><td>{lead.revenue}</td><td>{lead.instagram}</td><td><button className="admin-delete" onClick={() => remove(lead.id)} aria-label={`Excluir lead ${lead.name}`}>Excluir</button></td></tr>)}
        </tbody></table></div>
      ) : <div className="admin-empty"><span>00</span><p>Nenhum lead encontrado.</p></div>}
    </div>
  );
}

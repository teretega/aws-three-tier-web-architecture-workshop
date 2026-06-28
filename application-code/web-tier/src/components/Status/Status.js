import React, { useCallback, useEffect, useState } from 'react';
import { API_URL, checkWebHealth, checkApiHealth, checkDatabaseHealth } from '../../api';
import {
  PageHeader,
  StatusGrid,
  StatusCard,
  EnvCard,
  RefreshBtn,
} from './Status.styled';

function Status() {
  const [loading, setLoading] = useState(true);
  const [web, setWeb] = useState(null);
  const [api, setApi] = useState(null);
  const [db, setDb] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const [webRes, apiRes, dbRes] = await Promise.all([
      checkWebHealth().catch((e) => ({ ok: false, error: e.message })),
      checkApiHealth().catch((e) => ({ ok: false, error: e.message })),
      checkDatabaseHealth().catch((e) => ({ ok: false, error: e.message })),
    ]);
    setWeb(webRes);
    setApi(apiRes);
    setDb(dbRes);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <>
      <PageHeader>
        <h1>System Status</h1>
        <p>Live health checks across all three architecture tiers</p>
      </PageHeader>

      <StatusGrid>
        <StatusCard $ok={web?.ok}>
          <div className="label">Tier 1</div>
          <div className="name">Web Tier (Nginx + React)</div>
          <div className="state">{web?.ok ? 'Healthy' : 'Unavailable'}</div>
          <div className="detail">GET /health → {web?.body?.trim() || web?.error || '—'}</div>
        </StatusCard>

        <StatusCard $ok={api?.ok}>
          <div className="label">Tier 2</div>
          <div className="name">App Tier (Node.js)</div>
          <div className="state">{api?.ok ? 'Healthy' : 'Unavailable'}</div>
          <div className="detail">
            GET {API_URL}/health → {api?.body ? JSON.stringify(api.body) : api?.error || '—'}
          </div>
        </StatusCard>

        <StatusCard $ok={db?.ok}>
          <div className="label">Tier 3</div>
          <div className="name">Database (MySQL)</div>
          <div className="state">{db?.ok ? 'Connected' : 'Unavailable'}</div>
          <div className="detail">
            {db?.ok
              ? `${db.count} transaction record(s) readable`
              : db?.error || 'Could not query transactions table'}
          </div>
        </StatusCard>
      </StatusGrid>

      <EnvCard>
        <h3>Environment</h3>
        <dl>
          <dt>API URL</dt>
          <dd>{API_URL}</dd>
          <dt>Platform</dt>
          <dd>Emraay Cloud Platform</dd>
          <dt>Workshop</dt>
          <dd>AWS Three-Tier Web Architecture</dd>
          <dt>Products</dt>
          <dd>Emraay Bank · Emraay Airlines</dd>
        </dl>
      </EnvCard>

      <RefreshBtn onClick={refresh} disabled={loading}>
        {loading ? 'Checking…' : 'Refresh Status'}
      </RefreshBtn>
    </>
  );
}

export default Status;

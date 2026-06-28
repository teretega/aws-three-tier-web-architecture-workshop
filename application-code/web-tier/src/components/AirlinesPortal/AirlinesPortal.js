import React, { useCallback, useEffect, useState } from 'react';
import { getTransactions, addTransaction, deleteAllTransactions } from '../../api';
import {
  AirlinesShell,
  PortalHeader,
  StatsRow,
  StatBox,
  FormCard,
  FormRow,
  Field,
  BtnAdd,
  BtnClear,
  ListCard,
  RecordList,
  RecordItem,
  EmptyState,
  PremiumBadge,
} from './AirlinesPortal.styled';

function AirlinesPortal() {
  const [records, setRecords] = useState([]);
  const [fare, setFare] = useState('');
  const [route, setRoute] = useState('');
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const data = await getTransactions();
    setRecords(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const totalRevenue = records.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);

  async function handleAdd(e) {
    e.preventDefault();
    if (!fare.trim() || !route.trim()) return;
    setLoading(true);
    await addTransaction(fare, route);
    setFare('');
    setRoute('');
    await load();
    setLoading(false);
  }

  async function handleClear() {
    if (!window.confirm('Cancel all bookings?')) return;
    setLoading(true);
    await deleteAllTransactions();
    await load();
    setLoading(false);
  }

  return (
    <AirlinesShell>
      <PortalHeader>
        <div className="brand">
          <img src={`${process.env.PUBLIC_URL}/images/emraay-airlines-logo.svg`} alt="Emraay Airlines" />
          <div>
            <h1>Emraay Airlines</h1>
            <span>Charter Bookings · Luxury Private Charter</span>
          </div>
        </div>
        <BtnClear onClick={handleClear} disabled={loading || records.length === 0}>
          Cancel All
        </BtnClear>
      </PortalHeader>

      <StatsRow>
        <StatBox>
          <div className="label">Active Bookings</div>
          <div className="value">{records.length}</div>
        </StatBox>
        <StatBox $color="#1e40af">
          <div className="label">Charter Revenue</div>
          <div className="value">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
        </StatBox>
        <StatBox>
          <div className="label">Fleet Status</div>
          <div className="value" style={{ fontSize: '1rem', color: '#2563eb' }}>● Available</div>
        </StatBox>
      </StatsRow>

      <FormCard>
        <h2>New Charter Booking</h2>
        <form onSubmit={handleAdd}>
          <FormRow>
            <Field>
              <label htmlFor="fare">Fare ($)</label>
              <input
                id="fare"
                type="text"
                placeholder="25000"
                value={fare}
                onChange={(e) => setFare(e.target.value)}
              />
            </Field>
            <Field>
              <label htmlFor="route">Route</label>
              <input
                id="route"
                type="text"
                placeholder="Toronto → Dubai, New York → London…"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
              />
            </Field>
            <BtnAdd type="submit" disabled={loading}>
              Book Flight
            </BtnAdd>
          </FormRow>
        </form>
      </FormCard>

      <ListCard>
        <div className="list-header">
          <h2>Charter Bookings</h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{records.length} booking(s)</span>
        </div>
        <RecordList>
          {records.length === 0 ? (
            <EmptyState>
              <p>No bookings yet. Same API, different product — that&apos;s the power of three-tier architecture.</p>
            </EmptyState>
          ) : (
            records.map((r) => (
              <RecordItem key={r.id} $positive={false}>
                <span className="id">#{r.id}</span>
                <span className="primary">${r.amount}</span>
                <span className="secondary">✈ {r.description}</span>
                <PremiumBadge>Premium</PremiumBadge>
              </RecordItem>
            ))
          )}
        </RecordList>
      </ListCard>
    </AirlinesShell>
  );
}

export default AirlinesPortal;

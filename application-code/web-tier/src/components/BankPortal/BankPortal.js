import React, { useCallback, useEffect, useState } from 'react';
import { getTransactions, addTransaction, deleteAllTransactions } from '../../api';
import {
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
} from '../shared/Portal.styled';

function BankPortal() {
  const [records, setRecords] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const data = await getTransactions();
    setRecords(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const totalVolume = records.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);

  async function handleAdd(e) {
    e.preventDefault();
    if (!amount.trim() || !description.trim()) return;
    setLoading(true);
    await addTransaction(amount, description);
    setAmount('');
    setDescription('');
    await load();
    setLoading(false);
  }

  async function handleClear() {
    if (!window.confirm('Delete all transactions?')) return;
    setLoading(true);
    await deleteAllTransactions();
    await load();
    setLoading(false);
  }

  return (
    <>
      <PortalHeader>
        <div className="brand">
          <img src={`${process.env.PUBLIC_URL}/images/emraay-bank-logo.svg`} alt="Emraay Bank" />
          <div>
            <h1>Emraay Bank</h1>
            <span>Live Transactions · Banking Excellence</span>
          </div>
        </div>
        <BtnClear onClick={handleClear} disabled={loading || records.length === 0}>
          Clear All
        </BtnClear>
      </PortalHeader>

      <StatsRow>
        <StatBox>
          <div className="label">Transactions</div>
          <div className="value">{records.length}</div>
        </StatBox>
        <StatBox $color="#059669">
          <div className="label">Total Volume</div>
          <div className="value">${totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </StatBox>
        <StatBox>
          <div className="label">API Status</div>
          <div className="value" style={{ fontSize: '1rem', color: '#059669' }}>● Live</div>
        </StatBox>
      </StatsRow>

      <FormCard>
        <h2>New Transaction</h2>
        <form onSubmit={handleAdd}>
          <FormRow>
            <Field>
              <label htmlFor="amount">Amount ($)</label>
              <input
                id="amount"
                type="text"
                placeholder="100.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Field>
            <Field>
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                placeholder="Salary deposit, payment, transfer…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
            <BtnAdd type="submit" disabled={loading}>
              Add Transaction
            </BtnAdd>
          </FormRow>
        </form>
      </FormCard>

      <ListCard>
        <div className="list-header">
          <h2>Recent Transactions</h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{records.length} record(s)</span>
        </div>
        <RecordList>
          {records.length === 0 ? (
            <EmptyState>
              <p>No transactions yet. Add one above to see the database tier in action.</p>
            </EmptyState>
          ) : (
            records.map((r) => (
              <RecordItem key={r.id}>
                <span className="id">#{r.id}</span>
                <span className="primary">+${r.amount}</span>
                <span className="secondary">{r.description}</span>
                <span className="badge">Posted</span>
              </RecordItem>
            ))
          )}
        </RecordList>
      </ListCard>
    </>
  );
}

export default BankPortal;

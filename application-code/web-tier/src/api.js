const API_URL = process.env.REACT_APP_API_URL || '/api';

async function fetchWithRetry(url, options = {}, retries = 3) {
  try {
    return await fetch(url, options);
  } catch (err) {
    if (retries === 1) throw err;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return fetchWithRetry(url, options, retries - 1);
  }
}

export async function getTransactions() {
  const res = await fetchWithRetry(`${API_URL}/transaction`);
  const data = await res.json();
  return data.result || [];
}

export async function addTransaction(amount, desc) {
  const res = await fetchWithRetry(`${API_URL}/transaction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, desc }),
  });
  return res.json();
}

export async function deleteAllTransactions() {
  const res = await fetchWithRetry(`${API_URL}/transaction`, { method: 'DELETE' });
  return res.json();
}

export async function checkWebHealth() {
  const res = await fetch('/health');
  return { ok: res.ok, status: res.status, body: await res.text() };
}

export async function checkApiHealth() {
  const res = await fetchWithRetry(`${API_URL}/health`);
  const body = await res.json();
  return { ok: res.ok, status: res.status, body };
}

export async function checkDatabaseHealth() {
  try {
    const res = await fetchWithRetry(`${API_URL}/transaction`);
    const data = await res.json();
    return { ok: res.ok && Array.isArray(data.result), status: res.status, count: data.result?.length ?? 0 };
  } catch {
    return { ok: false, status: 0, count: 0 };
  }
}

export { API_URL };

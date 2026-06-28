import styled from 'styled-components';

export const PortalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      height: 48px;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 800;
      color: ${({ theme }) => theme.primaryDark};
    }

    span {
      display: block;
      font-size: 0.8rem;
      color: ${({ theme }) => theme.textSecondary};
      font-weight: 500;
    }
  }
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const StatBox = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radiusMd};
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;

  .label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 0.35rem;
  }

  .value {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${({ $color, theme }) => $color || theme.primaryDark};
  }
`;

export const FormCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radiusLg};
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.textPrimary};
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  gap: 1rem;
  align-items: end;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 0.35rem;
  }

  input {
    width: 100%;
    padding: 0.65rem 0.85rem;
    border: 1px solid #e2e8f0;
    border-radius: ${({ theme }) => theme.radiusSm};
    font-size: 0.9rem;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.primary};
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }
  }
`;

export const BtnAdd = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.primaryDeeper} 100%);
  color: white;
  border: none;
  padding: 0.65rem 1.25rem;
  border-radius: ${({ theme }) => theme.radiusSm};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;

export const BtnClear = styled.button`
  background: white;
  color: ${({ theme }) => theme.error};
  border: 1px solid #fecaca;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radiusSm};
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.errorBg};
  }
`;

export const ListCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radiusLg};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  overflow: hidden;

  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #e2e8f0;
    background: #f8fafc;

    h2 {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 700;
    }
  }
`;

export const RecordList = styled.div`
  max-height: 420px;
  overflow-y: auto;
`;

export const RecordItem = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr 2fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.15s;

  &:hover {
    background: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }

  .id {
    font-size: 0.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.textSecondary};
  }

  .primary {
    font-weight: 700;
    font-size: 1rem;
    color: ${({ $positive, theme }) => ($positive !== false ? theme.success : theme.textPrimary)};
  }

  .secondary {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.textSecondary};
  }

  .badge {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    background: ${({ theme }) => theme.successBg};
    color: ${({ theme }) => theme.success};
    text-align: center;
  }
`;

export const EmptyState = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};

  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;

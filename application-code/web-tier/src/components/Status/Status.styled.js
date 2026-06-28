import styled from 'styled-components';

export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 800;
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.textMutedOnDark};
  }
`;

export const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const StatusCard = styled.div`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.glassBorder};
  border-radius: ${({ theme }) => theme.radiusLg};
  padding: 1.5rem;

  .label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.textMutedOnDark};
    margin-bottom: 0.5rem;
  }

  .name {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  .state {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ $ok, theme }) => ($ok ? theme.success : theme.error)};

    &::before {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: currentColor;
    }
  }

  .detail {
    margin-top: 0.75rem;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.textMutedOnDark};
    word-break: break-all;
  }
`;

export const EnvCard = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid ${({ theme }) => theme.glassBorder};
  border-radius: ${({ theme }) => theme.radiusLg};
  padding: 1.5rem;

  h3 {
    margin: 0 0 1rem;
    font-size: 1rem;
  }

  dl {
    margin: 0;
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  dt {
    color: ${({ theme }) => theme.textMutedOnDark};
  }

  dd {
    margin: 0;
    font-family: monospace;
    color: ${({ theme }) => theme.accentLight};
  }
`;

export const RefreshBtn = styled.button`
  display: block;
  margin: 1.5rem auto 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.primaryDeeper} 100%);
  color: white;
  border: none;
  padding: 0.65rem 1.25rem;
  border-radius: ${({ theme }) => theme.radiusMd};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;

import styled from 'styled-components';

export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 800;
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.textMutedOnDark};
    font-size: 1rem;
    line-height: 1.6;
  }
`;

export const DiagramCard = styled.div`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.glassBorder};
  border-radius: ${({ theme }) => theme.radiusXl};
  padding: 1.5rem;
  margin-bottom: 2rem;

  img {
    width: 100%;
    border-radius: ${({ theme }) => theme.radiusMd};
  }
`;

export const TierGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const TierCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid ${({ theme }) => theme.glassBorder};
  border-radius: ${({ theme }) => theme.radiusLg};
  padding: 1.5rem;
  border-top: 3px solid ${({ $color }) => $color};

  .tier-num {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ $color }) => $color};
    margin-bottom: 0.5rem;
  }

  h3 {
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
  }

  p {
    margin: 0 0 1rem;
    font-size: 0.875rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.textMutedOnDark};
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    font-size: 0.8rem;
    padding: 0.35rem 0;
    color: ${({ theme }) => theme.accentLight};
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);

    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: '→ ';
      color: ${({ theme }) => theme.accent};
    }
  }
`;

export const FlowSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.glassBorder};
  border-radius: ${({ theme }) => theme.radiusLg};

  h3 {
    margin: 0 0 1rem;
    font-size: 1rem;
  }

  ol {
    margin: 0;
    padding-left: 1.25rem;
    color: ${({ theme }) => theme.textMutedOnDark};
    line-height: 1.8;
    font-size: 0.9rem;
  }
`;

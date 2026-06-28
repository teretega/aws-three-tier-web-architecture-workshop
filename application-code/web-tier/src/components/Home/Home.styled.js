import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
  margin-bottom: 3rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const Badge = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.primaryDeeper} 100%);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  margin-bottom: 1rem;
  letter-spacing: 0.04em;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 1rem;

  span {
    color: ${({ theme }) => theme.accent};
  }
`;

export const HeroText = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.textMutedOnDark};
  margin: 0 0 1.5rem;
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const BtnPrimary = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.primaryDeeper} 100%);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: ${({ theme }) => theme.radiusMd};
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.45);
  }
`;

export const BtnOutline = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border: 2px solid ${({ theme }) => theme.glassBorder};
  border-radius: ${({ theme }) => theme.radiusMd};
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.45);
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const GlassCard = styled.div`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.glassBorder};
  border-radius: ${({ theme }) => theme.radiusXl};
  padding: 1.5rem;
  overflow: hidden;

  img {
    width: 100%;
    border-radius: ${({ theme }) => theme.radiusMd};
  }
`;

export const StatusRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
`;

export const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid ${({ theme }) => theme.glassBorder};
  color: ${({ theme }) => theme.textMutedOnDark};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $ok, theme }) => ($ok ? theme.success : theme.error)};
    box-shadow: 0 0 6px ${({ $ok, theme }) => ($ok ? theme.success : theme.error)};
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  text-align: center;
`;

export const SectionSub = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.textMutedOnDark};
  margin: 0 0 2rem;
  font-size: 0.95rem;
`;

export const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const BrandCard = styled(Link)`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.glassBorder};
  border-radius: ${({ theme }) => theme.radiusXl};
  padding: 2rem;
  transition: transform 0.2s, background 0.2s, border-color 0.2s;
  text-align: left;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 255, 255, 0.35);
  }

  img {
    height: 48px;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    color: white;
  }

  p {
    margin: 0 0 1rem;
    font-size: 0.9rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.textMutedOnDark};
  }

  span {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ theme }) => theme.accent};
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  text-align: center;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid ${({ theme }) => theme.glassBorder};
  border-radius: ${({ theme }) => theme.radiusLg};

  strong {
    display: block;
    font-size: 1.75rem;
    font-weight: 800;
    color: ${({ theme }) => theme.accent};
    margin-bottom: 0.25rem;
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.textMutedOnDark};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

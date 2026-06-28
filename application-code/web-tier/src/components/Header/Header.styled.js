import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.glassBorder};

  ${({ $variant }) =>
    $variant === 'light'
      ? css`
          background: rgba(255, 255, 255, 0.92);
          border-bottom-color: #e2e8f0;
        `
      : css`
          background: ${({ theme }) => theme.glassBg};
        `}
`;

export const HeaderInner = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 1.5rem;
  height: ${({ theme }) => theme.headerHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  img {
    height: 40px;
    width: auto;
  }
`;

export const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;

  strong {
    font-size: 1rem;
    font-weight: 700;
    color: ${({ $variant, theme }) => ($variant === 'light' ? theme.primaryDark : theme.textOnDark)};
  }

  span {
    font-size: 0.7rem;
    color: ${({ $variant, theme }) => ($variant === 'light' ? theme.textSecondary : theme.textMutedOnDark)};
    letter-spacing: 0.04em;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  padding: 0.5rem 0.85rem;
  border-radius: ${({ theme }) => theme.radiusSm};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $variant, theme }) => ($variant === 'light' ? theme.textSecondary : theme.textMutedOnDark)};
  transition: color 0.2s, background 0.2s;

  &:hover {
    color: ${({ $variant, theme }) => ($variant === 'light' ? theme.primaryDark : theme.textOnDark)};
    background: ${({ $variant, theme }) =>
      $variant === 'light' ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255, 255, 255, 0.08)'};
  }

  &.active {
    color: ${({ $variant, theme }) => ($variant === 'light' ? theme.primary : theme.accent)};
    background: ${({ $variant, theme }) =>
      $variant === 'light' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.12)'};
  }
`;

export const MobileNav = styled.nav`
  display: none;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

export const MobileNavLink = styled(NavLink)`
  padding: 0.35rem 0.6rem;
  font-size: 0.75rem;
`;

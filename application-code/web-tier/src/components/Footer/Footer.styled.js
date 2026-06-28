import styled, { css } from 'styled-components';

export const FooterBar = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.glassBorder};
  margin-top: auto;

  ${({ $variant }) =>
    $variant === 'light'
      ? css`
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #cbd5e1;
        `
      : css`
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(8px);
          color: ${({ theme }) => theme.textMutedOnDark};
        `}
`;

export const FooterInner = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const FooterBrand = styled.div`
  img {
    height: 36px;
    margin-bottom: 0.75rem;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.6;
    max-width: 320px;
  }
`;

export const FooterCol = styled.div`
  h4 {
    margin: 0 0 0.75rem;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #94a3b8;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    font-size: 0.875rem;
    line-height: 1.8;
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  padding: 1rem 1.5rem;
  font-size: 0.75rem;
  color: #94a3b8;
`;

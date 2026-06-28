import styled, { css } from 'styled-components';

export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  ${({ $variant }) =>
    $variant === 'light'
      ? css`
          background: linear-gradient(135deg, ${({ theme }) => theme.bgLight} 0%, ${({ theme }) => theme.bgLightAlt} 100%);
          color: ${({ theme }) => theme.textPrimary};
        `
      : css`
          background: linear-gradient(135deg, ${({ theme }) => theme.bgDarkStart} 0%, ${({ theme }) => theme.bgDarkMid} 50%, ${({ theme }) => theme.bgDarkEnd} 100%);
          color: ${({ theme }) => theme.textOnDark};
        `}
`;

export const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 1.5rem 1rem 2rem;
  }
`;

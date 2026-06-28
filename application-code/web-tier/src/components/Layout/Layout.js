import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Shell, Main } from './Layout.styled';

function Layout({ children, variant = 'dark' }) {
  return (
    <Shell $variant={variant}>
      <Header variant={variant} />
      <Main>{children}</Main>
      <Footer variant={variant} />
    </Shell>
  );
}

export default Layout;

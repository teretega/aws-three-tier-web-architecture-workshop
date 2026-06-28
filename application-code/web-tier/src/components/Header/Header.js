import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  HeaderBar,
  HeaderInner,
  Brand,
  BrandText,
  Nav,
  NavLink,
  MobileNav,
  MobileNavLink,
} from './Header.styled';

const links = [
  { to: '/', label: 'Home' },
  { to: '/bank', label: 'Bank' },
  { to: '/airlines', label: 'Airlines' },
  { to: '/architecture', label: 'Architecture' },
  { to: '/status', label: 'Status' },
];

function Header({ variant = 'dark' }) {
  const { pathname } = useLocation();

  const isActive = (to) => {
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to);
  };

  return (
    <HeaderBar $variant={variant}>
      <HeaderInner>
        <Brand to="/">
          <img src={`${process.env.PUBLIC_URL}/images/emraay-airlines-logo.svg`} alt="Emraay" />
          <BrandText $variant={variant}>
            <strong>Emraay Cloud</strong>
            <span>AWS 3-TIER WORKSHOP</span>
          </BrandText>
        </Brand>

        <Nav>
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} $variant={variant} className={isActive(to) ? 'active' : ''}>
              {label}
            </NavLink>
          ))}
        </Nav>

        <MobileNav>
          {links.slice(0, 3).map(({ to, label }) => (
            <MobileNavLink key={to} to={to} $variant={variant} className={isActive(to) ? 'active' : ''}>
              {label}
            </MobileNavLink>
          ))}
        </MobileNav>
      </HeaderInner>
    </HeaderBar>
  );
}

export default Header;

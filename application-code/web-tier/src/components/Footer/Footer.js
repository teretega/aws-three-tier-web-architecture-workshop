import React from 'react';
import { Link } from 'react-router-dom';
import { FooterBar, FooterInner, FooterBrand, FooterCol, FooterBottom } from './Footer.styled';

function Footer({ variant = 'dark' }) {
  return (
    <FooterBar $variant={variant}>
      <FooterInner>
        <FooterBrand>
          <img src={`${process.env.PUBLIC_URL}/images/emraay-bank-logo.svg`} alt="Emraay Bank" />
          <p>
            Emraay Cloud Platform — a hands-on AWS three-tier architecture workshop powering
            Emraay Bank and Emraay Airlines.
          </p>
        </FooterBrand>

        <FooterCol>
          <h4>Products</h4>
          <ul>
            <li><Link to="/bank">Emraay Bank Portal</Link></li>
            <li><Link to="/airlines">Emraay Airlines Bookings</Link></li>
            <li><Link to="/architecture">Architecture Overview</Link></li>
          </ul>
        </FooterCol>

        <FooterCol>
          <h4>Workshop</h4>
          <ul>
            <li><Link to="/status">System Status</Link></li>
            <li>Web Tier · React + Nginx</li>
            <li>App Tier · Node.js</li>
            <li>Data Tier · MySQL</li>
          </ul>
        </FooterCol>
      </FooterInner>

      <FooterBottom>
        © {new Date().getFullYear()} Emraay Group · DevOps Training Workshop · All rights reserved
      </FooterBottom>
    </FooterBar>
  );
}

export default Footer;

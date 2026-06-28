import React, { useEffect, useState } from 'react';
import architecture from '../../assets/3TierArch.png';
import { checkWebHealth, checkApiHealth, checkDatabaseHealth } from '../../api';
import {
  Hero,
  Badge,
  HeroTitle,
  HeroText,
  HeroActions,
  BtnPrimary,
  BtnOutline,
  GlassCard,
  StatusRow,
  StatusPill,
  SectionTitle,
  SectionSub,
  BrandGrid,
  BrandCard,
  StatsGrid,
  StatCard,
} from './Home.styled';

function Home() {
  const [health, setHealth] = useState({ web: null, api: null, db: null });

  useEffect(() => {
    async function loadHealth() {
      const [web, api, db] = await Promise.all([
        checkWebHealth().catch(() => ({ ok: false })),
        checkApiHealth().catch(() => ({ ok: false })),
        checkDatabaseHealth().catch(() => ({ ok: false })),
      ]);
      setHealth({ web: web.ok, api: api.ok, db: db.ok });
    }
    loadHealth();
    const interval = setInterval(loadHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Hero>
        <div>
          <Badge>AWS 3-TIER WORKSHOP</Badge>
          <HeroTitle>
            Welcome to <span>Emraay Cloud</span> Platform
          </HeroTitle>
          <HeroText>
            Build enterprise-grade infrastructure the Emraay way. One three-tier architecture
            powers both Emraay Bank and Emraay Airlines — web, application, and database layers
            working together at scale.
          </HeroText>
          <HeroActions>
            <BtnPrimary to="/bank">Explore Bank Portal →</BtnPrimary>
            <BtnOutline to="/architecture">View Architecture</BtnOutline>
          </HeroActions>
          <StatusRow>
            <StatusPill $ok={health.web}>Web Tier</StatusPill>
            <StatusPill $ok={health.api}>App Tier</StatusPill>
            <StatusPill $ok={health.db}>Database</StatusPill>
          </StatusRow>
        </div>

        <GlassCard>
          <img src={architecture} alt="AWS Three-Tier Architecture" />
        </GlassCard>
      </Hero>

      <SectionTitle>One Platform, Two Products</SectionTitle>
      <SectionSub>
        The same Node.js API and MySQL database serve multiple Emraay brands
      </SectionSub>

      <BrandGrid>
        <BrandCard to="/bank">
          <img src={`${process.env.PUBLIC_URL}/images/emraay-bank-logo.svg`} alt="Emraay Bank" />
          <h3>Emraay Bank</h3>
          <p>
            Live transaction portal with secure CRUD operations. Banking Excellence
            powered by Aurora MySQL.
          </p>
          <span>Open Bank Portal →</span>
        </BrandCard>

        <BrandCard to="/airlines">
          <img src={`${process.env.PUBLIC_URL}/images/emraay-airlines-logo.svg`} alt="Emraay Airlines" />
          <h3>Emraay Airlines</h3>
          <p>
            Private charter booking records sharing the same backend. Luxury aviation
            meets cloud architecture.
          </p>
          <span>Open Airlines Portal →</span>
        </BrandCard>
      </BrandGrid>

      <StatsGrid>
        <StatCard>
          <strong>3</strong>
          <span>Architecture Tiers</span>
        </StatCard>
        <StatCard>
          <strong>2</strong>
          <span>Emraay Products</span>
        </StatCard>
        <StatCard>
          <strong>1</strong>
          <span>Shared API</span>
        </StatCard>
      </StatsGrid>
    </>
  );
}

export default Home;

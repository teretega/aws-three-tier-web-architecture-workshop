import React from 'react';
import architecture from '../../assets/3TierArch.png';
import {
  PageHeader,
  DiagramCard,
  TierGrid,
  TierCard,
  FlowSection,
} from './Architecture.styled';

const tiers = [
  {
    num: 'Tier 1',
    title: 'Web Tier',
    color: '#60a5fa',
    description: 'Public-facing layer that serves the React UI and proxies API requests through Nginx.',
    items: ['React.js SPA', 'Nginx reverse proxy', 'Application Load Balancer (AWS)', 'Auto Scaling Group'],
  },
  {
    num: 'Tier 2',
    title: 'Application Tier',
    color: '#3b82f6',
    description: 'Internal Node.js API that handles business logic and communicates with the database.',
    items: ['Express.js REST API', 'Transaction CRUD endpoints', 'Internal Load Balancer (AWS)', 'Health checks at /health'],
  },
  {
    num: 'Tier 3',
    title: 'Database Tier',
    color: '#059669',
    description: 'Persistent data store for all Emraay products. MySQL locally, Aurora MySQL in AWS.',
    items: ['MySQL / Aurora MySQL', 'transactions table', 'Multi-AZ (AWS production)', 'Automated backups'],
  },
];

function Architecture() {
  return (
    <>
      <PageHeader>
        <h1>Three-Tier Architecture</h1>
        <p>
          How Emraay Bank and Emraay Airlines share a scalable, available cloud infrastructure
        </p>
      </PageHeader>

      <DiagramCard>
        <img src={architecture} alt="AWS Three-Tier Architecture Diagram" />
      </DiagramCard>

      <TierGrid>
        {tiers.map((tier) => (
          <TierCard key={tier.title} $color={tier.color}>
            <div className="tier-num">{tier.num}</div>
            <h3>{tier.title}</h3>
            <p>{tier.description}</p>
            <ul>
              {tier.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TierCard>
        ))}
      </TierGrid>

      <FlowSection>
        <h3>Request Flow</h3>
        <ol>
          <li>User opens Emraay Bank or Airlines portal in the browser (Web Tier)</li>
          <li>React sends API request to <code>/api/transaction</code> via Nginx proxy</li>
          <li>Nginx forwards to the Node.js app on port 4000 (App Tier)</li>
          <li>Express queries the MySQL <code>transactions</code> table (Database Tier)</li>
          <li>Response travels back through App → Web → Browser</li>
        </ol>
      </FlowSection>
    </>
  );
}

export default Architecture;

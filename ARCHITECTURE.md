# Architecture — Emraay Cloud Platform Deployment

## Reference Architecture (AWS Workshop)

![Architecture Diagram](https://github.com/aws-samples/aws-three-tier-web-architecture-workshop/blob/main/application-code/web-tier/src/assets/3TierArch.png)

Architecture Overview — Internet traffic enters the VPC through the Internet Gateway and reaches an internet-facing ALB, which distributes requests across 2+ EC2 instances in the Web tier. An internal ALB then routes requests from the Web tier to 2+ EC2 instances in the App tier, which read/write to the primary database. A read-only replica holds a continuously synced copy of the primary. Running 2+ instances per tier, across Availability Zones, plus a standby DB replica, means no single component is a single point of failure.

## My Implementation

| Tier | Component | Subnet | Notes |
|---|---|---|---|
| Web | Nginx | Public | Serves the React production build (static files); listens on port 80; must be public to be reachable from browsers |
| App | Node.js + pm2 | Public | pm2 keeps the Node process alive/auto-restarting; reachable directly on port 4000 from Postman and from the frontend's `REACT_APP_API_URL` |
| Data | RDS (MySQL) | Private | No internet route; only reachable by resources carrying the App tier's security group on port 3306 |

![ Implementation Diagram](docs/our-architecture.png)

## Instructions, and Why

| Assignment says | We did instead | Why |
|---|---|---|
| Set RDS to "Publicly accessible" | RDS in a private subnet, not publicly accessible | A publicly accessible database has a public IP address, meaning anyone on the internet can attempt to connect to it directly (port 3306). Security groups are a backup layer of defense, but the safest design removes the attack surface entirely by never giving the database a route to/from the internet in the first place — only resources inside the VPC, carrying the right security group, can reach it. |
| Run the backend with `node index.js`, kept alive manually via `screen`/`tmux` | Run the backend under pm2 | A raw foreground Node process has no automatic recovery: if it crashes (uncaught exception, out-of-memory) or the SSH session drops in a way that kills the process, the API silently goes down with nothing to restart it. pm2 monitors the process and restarts it immediately on crash, and can be configured to relaunch automatically if the whole server reboots. |
| Run the frontend with `npm start` (React's development server) on port 3000 | Run `npm run build` and serve the static output with Nginx on port 80 | The React dev server is built for local development — it includes hot-reloading and debugging tooling, has no production-grade caching/compression, and isn't hardened for real traffic. `npm run build` compiles the app into optimized static HTML/JS/CSS, and Nginx serves those files efficiently, which is the standard pattern for serving any production single-page app. |

## Scaling Path

What we'd add to move from this build toward the full reference architecture:

1. Add a second EC2 instance per tier, in a second Availability Zone, for redundancy
2. Put an ALB in front of the Web tier (internet-facing) and the App tier (internal), so traffic is distributed across instances instead of hitting one fixed server
3. Move the App tier into a private subnet, reachable only through the Web tier's Nginx (which would proxy `/api/` requests to it) — removing its current direct public exposure on port 4000
4. Upgrade from a single RDS MySQL instance to Aurora MySQL with a read replica, for read scaling and faster failover
5. Add real TLS (HTTPS) using a registered domain name and a certificate (e.g. via AWS Certificate Manager if fronted by an ALB, or Let's Encrypt directly on Nginx)

## Scaling Path

> **Note:** This section is forward-looking only — none of the items below are implemented or required for this assignment. They describe what I'd add if this deployment needed to handle real production traffic, to show we understand *why* the full AWS reference architecture (Section 1) includes them.

What I'd add to move from this build toward the full reference architecture:
...
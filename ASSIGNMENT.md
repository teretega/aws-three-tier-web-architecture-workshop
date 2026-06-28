# AWS Three-Tier Web Architecture — Student Assignment

Deploy the **Emraay Cloud Platform** — a three-tier web application with a React frontend, Node.js API, and MySQL database on AWS. You will provision RDS, deploy the backend on EC2, deploy the frontend on a second EC2 instance, and verify the full stack end to end.

> **Note:** This assignment uses EC2 and RDS on AWS. Docker Compose is included in the repo for instructor local testing only — you do **not** need Docker for this assignment.

---

## Prerequisites

- An AWS account with access to RDS and EC2
- An SSH key pair for EC2
- [Postman](https://www.postman.com/downloads/) installed on your laptop
- A GitHub account (you will fork the repo)

**Repository:**

```bash
https://github.com/emraay-devops/aws-three-tier-web-architecture-workshop.git
```

Fork this repository to your GitHub account before you begin.

---

## Architecture Overview

| Tier | Component | Your deployment |
|------|-----------|-----------------|
| **Web** | React (`web-tier`) | `frontend-server` EC2 — port **3000** |
| **App** | Node.js / Express (`app-tier`) | `backend-server` EC2 — port **4000** |
| **Database** | MySQL | **Amazon RDS** |

The frontend talks to the backend over HTTP. The backend reads and writes to the RDS MySQL database.

---

## Part 1 — Create an RDS Database

1. Open the **RDS Dashboard** in AWS.
2. Click **Create database**.
3. Choose **Standard create**.
4. Select **MySQL** as the engine.
5. Choose a DB instance class: **`db.t3.micro`** (free tier eligible).
6. Set database credentials:
   - Master username: `admin`
   - Master password: create a strong password and save it
7. Configure connectivity and security:
   - Set the database to **Publicly accessible** (for this lab).
   - Attach or create a **VPC security group** that allows inbound **MySQL (3306)** from your backend EC2 security group (or your backend’s private IP during setup).
8. Launch the database and wait until status is **Available**.

### Note the RDS endpoint

After creation, copy the endpoint. It will look like:

```text
your-db-name.xxxxxxxxxxxx.ca-central-1.rds.amazonaws.com
```

You will need this to connect from your backend server.

### Deliverable

- Screenshot of your **running RDS database** in the AWS console.

---

## Part 2 — Deploy the Backend Server

### 2.1 Launch and connect to EC2

1. Create an **Ubuntu 22.04** EC2 instance named `backend-server`.
2. Ensure its security group allows:
   - **SSH (22)** from your IP
   - **Custom TCP 4000** from your IP (for Postman) and from your frontend server’s security group
3. SSH into the instance:

```bash
ssh -i your-key.pem ubuntu@YOUR_BACKEND_PUBLIC_IP
```

### 2.2 Install Node.js 18

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v   # should show v18.x
```

### 2.3 Clone the repository

```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/aws-three-tier-web-architecture-workshop.git
cd aws-three-tier-web-architecture-workshop/application-code/app-tier
```

Replace `YOUR-GITHUB-USERNAME` with your fork.

### 2.4 Install MySQL client

You only need the client to connect to RDS — do **not** install a local MySQL server.

```bash
sudo apt-get update
sudo apt-get install mysql-client -y
```

### 2.5 Connect to RDS and create the database

```bash
mysql -h YOUR_RDS_ENDPOINT -u admin -p
```

Replace `YOUR_RDS_ENDPOINT` with your RDS endpoint. Enter your RDS password when prompted.

Run the following SQL:

```sql
CREATE DATABASE apidb;

USE apidb;

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SHOW DATABASES;
SHOW TABLES;
```

Type `exit` to leave the MySQL shell.

### Deliverable

- Screenshot showing **`transactions`** in your `apidb` database (`SHOW TABLES` output).

### 2.6 Configure database connection

Open `DbConfig.js` in the `app-tier` directory and set your RDS credentials:

```javascript
module.exports = Object.freeze({
    DB_HOST : 'YOUR_RDS_ENDPOINT',
    DB_USER : 'admin',
    DB_PWD : 'YOUR_RDS_PASSWORD',
    DB_DATABASE : 'apidb'
});
```

Replace the placeholder values with your actual RDS endpoint, username, password, and database name.

> **Alternative (optional):** You can export environment variables instead of editing the file:
>
> ```bash
> export DB_HOST=YOUR_RDS_ENDPOINT
> export DB_USER=admin
> export DB_PWD=YOUR_RDS_PASSWORD
> export DB_DATABASE=apidb
> ```

### 2.7 Install dependencies and start the API

```bash
npm install
node index.js
```

You should see:

```text
AB3 backend app listening at http://localhost:4000
```

Leave this running, or use `screen` / `tmux` to keep it alive after disconnecting.

### 2.8 Test with Postman

From your laptop, send a **GET** request to:

```text
http://YOUR_BACKEND_PUBLIC_IP:4000/health
```

Expected response:

```json
"This is the health check"
```

Optional — test transactions:

| Method | URL | Body (JSON) |
|--------|-----|-------------|
| GET | `http://YOUR_BACKEND_IP:4000/transaction` | — |
| POST | `http://YOUR_BACKEND_IP:4000/transaction` | `{"amount":"100","desc":"Test payment"}` |

### Deliverable

- Screenshot of the successful **`/health`** response in Postman.

---

## Part 3 — Deploy the Frontend Server

### 3.1 Launch and connect to EC2

1. Create a second **Ubuntu 22.04** EC2 instance named `frontend-server`.
2. Ensure its security group allows:
   - **SSH (22)** from your IP
   - **Custom TCP 3000** from anywhere (`0.0.0.0/0`) so you can open the app in your browser
3. SSH into the instance.

### 3.2 Install Node.js 18

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3.3 Clone the repository

```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/aws-three-tier-web-architecture-workshop.git
cd aws-three-tier-web-architecture-workshop/application-code/web-tier
```

### 3.4 Connect the frontend to your backend

Create a `.env` file in the `web-tier` directory:

```bash
nano .env
```

Add this line (replace with your backend server’s **public IP**):

```env
REACT_APP_API_URL=http://YOUR_BACKEND_PUBLIC_IP:4000
```

Save and exit.

> **Important:** Do **not** edit hardcoded IP addresses in source files. The app reads the backend URL from `REACT_APP_API_URL` at build/start time.

### 3.5 Install dependencies and start the app

```bash
npm install
HOST=0.0.0.0 npm start
```

`HOST=0.0.0.0` allows the app to accept connections from your browser via the EC2 public IP.

### 3.6 Open the application

In your browser:

```text
http://YOUR_FRONTEND_PUBLIC_IP:3000
```

Because the app uses hash routing, use these paths:

| Page | URL |
|------|-----|
| **Home (landing page)** | `http://YOUR_FRONTEND_IP:3000/#/` |
| **Emraay Bank portal** | `http://YOUR_FRONTEND_IP:3000/#/bank` |
| **Emraay Airlines portal** | `http://YOUR_FRONTEND_IP:3000/#/airlines` |
| **Architecture overview** | `http://YOUR_FRONTEND_IP:3000/#/architecture` |
| **System status** | `http://YOUR_FRONTEND_IP:3000/#/status` |

Use the top navigation bar to move between pages.

### 3.7 Test the database connection from the UI

1. Go to **Bank** (`/#/bank`).
2. Add at least **3 transactions** (amount + description).
3. Confirm they appear in the list.
4. Open **Airlines** (`/#/airlines`) — the same records appear because both products share one API and database.
5. Check **Status** (`/#/status`) — Web, App, and Database tiers should show healthy.

If data does not save, verify:

- Backend is running on port 4000
- `.env` has the correct backend IP
- You restarted the frontend after creating or changing `.env`
- RDS security group allows port 3306 from the backend server
- Backend security group allows port 4000 from the frontend server

---

## Deliverables Checklist

Submit the following:

| # | Deliverable |
|---|-------------|
| 1 | Screenshot of your **running RDS database** in AWS |
| 2 | Screenshot of **`SHOW TABLES`** showing the `transactions` table in `apidb` |
| 3 | Screenshot of Postman **`/health`** success response |
| 4 | Screenshot of the **Emraay Cloud Platform home page** (`/#/`) |
| 5 | Screenshot of the **Emraay Bank portal** (`/#/bank`) with at least **3 transactions** entered |
| 6 | Screenshot of your **forked GitHub repository** |
| 7 | **Public URL** of your application (e.g. `http://YOUR_FRONTEND_IP:3000/#/`) |

---

## Troubleshooting

| Problem | Things to check |
|---------|-----------------|
| Postman cannot reach backend | Backend security group allows port 4000 from your IP |
| Browser cannot reach frontend | Frontend security group allows port 3000; you used `HOST=0.0.0.0 npm start` |
| Frontend loads but API fails | `.env` file correct; restart frontend after editing `.env` |
| Backend crashes on startup | `DbConfig.js` credentials match RDS; RDS is **Available** |
| MySQL connection refused | RDS security group allows 3306 from backend EC2 security group |
| CORS errors | Backend includes CORS middleware (already configured in `index.js`) |

---

## Optional — For Instructors (Local Docker Testing)

To run the full stack locally with Docker Compose (not required for students):

```bash
docker compose up --build -d
```

Open **http://localhost:8080/#/**

---

## Reference

- Workshop repo: [emraay-devops/aws-three-tier-web-architecture-workshop](https://github.com/emraay-devops/aws-three-tier-web-architecture-workshop)
- AWS workshop: [AWS Three Tier Web Architecture](https://catalog.us-east-1.prod.workshops.aws/workshops/85cd2bb2-7f79-4e96-bdee-8078e469752a/en-US)

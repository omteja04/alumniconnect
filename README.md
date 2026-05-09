<div align="center">

# Smart Alumni Connect & Job Referral System

[![System Status](https://img.shields.io/badge/Status-Architected-brightgreen?style=for-the-badge)](https://github.com/)
[![Architecture](https://img.shields.io/badge/Architecture-Serverless-orange?style=for-the-badge)](https://aws.amazon.com/lambda/)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Tailwind-blue?style=for-the-badge)](https://reactjs.org/)

<br>

```mermaid
graph TD
    %% Define Styles
    classDef default fill:#1e293b,stroke:#475569,stroke-width:1px,color:#f8fafc;
    classDef frontend fill:#1e40af,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef aws fill:#b45309,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef db fill:#065f46,stroke:#10b981,stroke-width:2px,color:#fff;
    classDef ml fill:#5b21b6,stroke:#8b5cf6,stroke-width:2px,color:#fff;
    classDef ext fill:#991b1b,stroke:#ef4444,stroke-width:2px,color:#fff;
    
    %% Users
    Student([🎓 Student])
    Alumni([💼 Alumni])
    
    %% Frontend Layer
    subgraph Frontend["Frontend Layer (Vercel)"]
        RP[React.js App & Tailwind CSS]
    end
    
    %% AWS Edge & API
    subgraph Edge["AWS Edge & Gateway"]
        R53[Amazon Route 53 DNS]
        CF[Amazon CloudFront CDN]
        APIG[Amazon API Gateway]
    end
    
    %% Backend Layer
    subgraph Backend["Backend Layer (Serverless)"]
        NodeExp[Node.js + Express.js Lambda]
    end
    
    %% ML & Engine
    subgraph Engine["Intelligent Engines"]
        ML[ML / NLP Engine<br/>Resume Parsing & Scoring]
    end
    
    %% Integrations
    subgraph Integration["Integrations"]
        SNOW[ServiceNow<br/>Workflow Automation]
    end
    
    %% Data & Storage
    subgraph Storage["Data & Storage Layer"]
        Mongo[(MongoDB<br/>User Data & Jobs)]
        DDB[(DynamoDB / RDS<br/>Transactions & ACKs)]
        S3[(AWS S3<br/>Resumes & Media)]
    end
    
    %% Connections
    Student <-->|HTTPS| RP
    Alumni <-->|HTTPS| RP
    
    RP -->|DNS/Routing| R53
    R53 --> CF
    CF --> APIG
    APIG -->|Triggers| NodeExp
    
    %% Backend workflows
    NodeExp -.->|Read/Write Profile| Mongo
    NodeExp -.->|Store State/ACKs| DDB
    NodeExp -->|Upload via Presigned URL| S3
    
    NodeExp -->|Async Event Trigger| ML
    ML -->|Fetch Resume| S3
    ML -.->|Write Readiness Score| Mongo
    
    NodeExp -->|API Sync| SNOW
    SNOW -.->|Webhook Status Update| NodeExp
    
    %% Apply Styles
    class Student,Alumni frontend;
    class RP frontend;
    class R53,CF,APIG,NodeExp aws;
    class Mongo,DDB,S3 db;
    class ML ml;
    class SNOW ext;
```

<br><br>

> *A next-generation, AI-powered platform designed to seamlessly connect students with alumni for mentorship and job referrals. The system evaluates student readiness using NLP-based resume parsing and streamlines referral processes using ServiceNow workflows.*

</div>

<br><br>

## System Architecture Overview
The platform adopts a modern, decoupled **serverless architecture** to ensure maximum scalability, cost-efficiency, and low latency.

<br>

### 1. Frontend Layer
<br>

| Feature | Description |
| :--- | :--- |
| **Framework** | React.js for dynamic UI rendering. |
| **Styling** | Tailwind CSS for a highly responsive, utility-first design system. |
| **Hosting & CI/CD** | Deployed via **Vercel** to leverage its global edge CDN. |
| **Interfaces** | **Student Portal** (Dashboard, Upload, Jobs, Mentorship, Readiness Score, Notifications) <br> **Alumni Portal** (Dashboard, Requests, ACKs, Post Jobs, Notifications) |

<br>

### 2. Backend Layer
<br>

| Feature | Description |
| :--- | :--- |
| **Framework** | Node.js paired with Express.js for robust routing and middleware support. |
| **Compute** | Fully serverless execution on **AWS Lambda**. |
| **Gateway** | **Amazon API Gateway** to route HTTP requests, manage rate limits, and provide a secure edge. |

<br>

### 3. Database & Storage Layer (Polyglot Persistence)
<br>

| Service | Purpose |
| :--- | :--- |
| **MongoDB Atlas** | Serves as the primary Document DB for flexible storage (User Profiles, Unstructured Job Listings, Mentorship Data). |
| **AWS DynamoDB / RDS** | Handles structured, fast transactional data requiring ACID compliance (Referral state tracking, Acknowledgements). |
| **Amazon S3** | Secure object storage for large static files (PDF Resumes, Profile Avatars). |

<br>

### 4. Core Integrations & Engines
<br>

| Integration | Functionality |
| :--- | :--- |
| **ServiceNow Integration** | A dedicated pipeline linking backend events to ServiceNow workflows. Handles automated job referral tracking, IT ticketing for support, and real-time status synchronization. |
| **ML / NLP Engine** | An intelligent microservice that: <br> • Parses uploaded PDF/DOCX resumes. <br> • Extracts key skills and calculates a **Placement Readiness Score**. <br> • Dynamically maps student profiles to Recommended Jobs from the MongoDB job board. |

<br><br>

## User Workflows (Data Flow)

<br>

<ol>
  <li>
    <b>Upload & Request:</b> A student logs in, uploads their resume (saved directly to AWS S3 via pre-signed URL), and requests mentorship or a job referral.
  </li>
  <br>
  <li>
    <b>Analysis:</b> The ML Engine triggers automatically, parses the resume, calculates the Readiness Score, and updates the student's MongoDB profile. Recommended jobs are instantly suggested.
  </li>
  <br>
  <li>
    <b>Alumni Interaction:</b> An alumnus receives the request in their portal. They can review the profile and trigger a <code>Mentorship ACK</code> or <code>Referral Acknowledged</code> action.
  </li>
  <br>
  <li>
    <b>ServiceNow Tracking:</b> Acknowledged referrals are pushed to ServiceNow via API, creating a tracked workflow ticket that syncs status back to the user dashboards.
  </li>
</ol>

<br><br>

## DevOps & Infrastructure

<br>

| Category | Technology |
| :--- | :--- |
| **Version Control** | Git & GitHub |
| **CI/CD Pipelines** | Managed completely by **GitHub Actions** (Linting, Testing, and Deployments to AWS/Vercel) |
| **API Testing** | Centralized **Postman** collections for automated contract and integration testing |
| **DNS / Routing** | Managed by **AWS Route 53**, providing custom domain routing to Vercel (Frontend) and API Gateway (Backend) |

<br><br>

## API Design Considerations

<br>

<ul>
  <li><b>RESTful Endpoints:</b> Resource-oriented paths (<code>/api/v1/students</code>, <code>/api/v1/referrals</code>).</li>
  <br>
  <li><b>Stateless Authentication:</b> JWT (JSON Web Tokens) validated via API Gateway Custom Authorizers.</li>
  <br>
  <li><b>Idempotency:</b> Crucial for state-changing operations like ACKs to prevent duplicate ServiceNow tickets.</li>
  <br>
  <li><b>Asynchronous Communication:</b> Long-running tasks (like Resume NLP Parsing) return a <code>202 Accepted</code> status while processing in the background (AWS SQS/SNS), with clients polling or utilizing WebSockets for completion status.</li>
</ul>

<br><br>

## Interactive Architecture Documentation

For a visual, animated representation of the architecture and data flows, please view the included HTML file:

<div align="center">
  <br>
  <b><a href="./architecture.html">Open architecture.html</a></b> in your browser or double click it in your file explorer.
  <br><br>
</div>

> Note: The HTML file includes interactive Mermaid.js diagrams and a polished UI built with Tailwind CSS.

---
<div align="center">
  <i>Designed & Architected for high performance, seamless integration, and intelligent student-alumni networking.</i>
</div>

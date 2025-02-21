# 🏗️ Application Architecture

This document provides an overview of how **Kraken Web UI** is structured and how its components interact.

---

## ⚙️ **Technology Stack**

Kraken Web UI is built using the following technologies:

- **Frontend:** [Next.js](https://nextjs.org/) (React framework)
- **Backend:** Next.js API Routes
- **Database:** [MongoDB](https://www.mongodb.com/)
- **State Management:** Local state (React hooks)
- **Containerization:** Docker
- **CI/CD:** GitHub Actions
- **Testing:** [Jest](https://jestjs.io/) (unit & integration tests)
- **Code Quality:** [ESLint](https://eslint.org/) (linting), [Prettier](https://prettier.io/) (formatting)

---

## 🏛️ **System Architecture Overview**

The system follows a **modular, component-based architecture**, separating concerns between **Frontend, Backend, and Database**.

```
┌──────────┐       ┌───────────────┐        ┌──────────┐
│ Frontend │ <-->  │ API (Next.js) │ <-->   │ MongoDB  │
└──────────┘       └───────────────┘        └──────────┘
```

1. **Frontend (Next.js)**

   - Renders UI components.
   - Handles user interactions.
   - Calls API routes for data.

2. **Backend (Next.js API)**

   - Provides RESTful API endpoints.
   - Interacts with MongoDB.
   - Performs business logic.

3. **Database (MongoDB)**

   - Stores sensor data and configurations.
   - Queries and updates data.

---

## 🔄 **Data Flow**

1. The user interacts with the **UI** (e.g., adds a sensor).
2. The **Frontend** sends a request to the **Next.js API**.
3. The API processes the request and communicates with **MongoDB**.
4. The response is sent back to the **Frontend**, updating the UI.

---

## 📂 **Main Directories and Responsibilities**

- **`src/components/`** → UI components.
- **`src/models/`** → Database schemas.
- **`src/actions/`** → Logic for interacting with the backend.
- **`tests/`** → Automated tests using Jest.
- **`.eslintrc.json` / `.prettierignore`** → Code linting & formatting configurations.

---

## 🚀 **Deployment & CI/CD**

- The project is deployed using **GitHub Actions** and **Docker**.
- The CI/CD pipeline includes:
  1. **Code Quality Checks**
     - Runs **ESLint** to ensure best practices.
     - Runs **Prettier** to format the code.
  2. **Automated Testing**
     - Runs **Jest tests** for both unit and integration testing.
  3. **Docker Build & Deployment**
     - Builds and pushes Docker images.
     - Deploys the latest version.

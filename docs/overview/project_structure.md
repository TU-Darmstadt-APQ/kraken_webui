    kraken_webui
        ├── docs                 # Documentation files (Markdown)
        ├── public               # Static files (icons, images)
        ├── src                  # Project source code
        │   ├── actions          # Actions to communicate with the server
        │   ├── app              # NextJS main application
        │   ├── components       # React components and modules
        │   │    ├── mongodb     # MongoDB CRUD operations
        │   │    └── UI          # Custom UI-components
        │   ├── hooks            # Custom hooks
        │   ├── models           # MongoDB database models
        │   ├── styles           # CSS modules for components
        │   ├── types.ts         # TypeScript global types
        |   └── global.css       # Global project styles
        └── tests                # Application tests

# 🏗️ Project Structure

This document provides an overview of the **Kraken Web UI** project structure.  
Understanding the directory layout will help you navigate the codebase more efficiently.

---

## 📌 Overview

Kraken Web UI is a **Next.js-based** web interface for managing sensor configurations.  
It follows a modular architecture, separating **UI components, and database operations**.

---

## 📂 Folder Breakdown

### 🔹 `docs/` - Documentation

Contains all Markdown documentation files, structured for MkDocs.

### 🔹 `public/` - Static Files

Stores static assets like icons, images, and fonts that are publicly accessible.

### 🔹 `src/` - Source Code

The core of the application, containing UI components, database logic etc.

- **`actions/`** → Handles communication with the backend server.
- **`app/`** → The main Next.js application logic.
- **`components/`** → Reusable React components:
  - `mongodb/` → MongoDB CRUD operations.
  - `UI/` → Custom UI components.
- **`hooks/`** → Custom React hooks for state and effects.
- **`models/`** → MongoDB schemas and database models.
- **`styles/`** → CSS modules for component styling.
- **`types.ts`** → TypeScript type definitions.
- **`global.css`** → Global project styles.

### 🔹 `tests/` - Application Tests

- **`Frontend_Tests/`** → Unit tests for React UI components.
- **`mongo/`** → MongoDB-related tests and database setup scripts.
- **`Schema_tests/`** → Validation tests for MongoDB schemas.

---

## 🔎 Where to Find Things?

- Need to **create a new UI component**? → Go to `src/components/UI/`.
- Looking for **database models**? → Check `src/models/`.
- Want to **style a component**? → Use `src/styles/`.

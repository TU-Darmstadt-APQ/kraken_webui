This project uses **GitHub Actions** for Continuous Integration (CI) and Continuous Deployment (CD).  
The configuration is defined in the **[`.github/workflows/ci.yml`](https://github.com/TU-Darmstadt-APQ/kraken_webui/blob/dev/.github/workflows/ci.yml)** file.

## 📌 **CI/CD Pipeline Overview**

The pipeline includes the following **automated steps**:

- Checkout the code
- Set up Node.js
- Install dependencies
- Run Jest tests
- Build and push Docker images to GitHub Container Registry

---

## 🔹 **CI/CD Triggers**

This pipeline runs automatically on the following events:

- **Push to `master` or `dev` branches** 🛠️
- **Pull requests** 📥

You can also **manually trigger** the pipeline in the **GitHub Actions** tab.

---

## 🛠️ **Technologies Used**

The CI/CD pipeline utilizes:

- **GitHub Actions** → Workflow automation.
- **ESLint** → Linting JavaScript/TypeScript code.
- **Prettier** → Enforcing code formatting rules.
- **Jest** → Running unit tests.
- **Docker** → Building and pushing containerized applications.

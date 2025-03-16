This project uses **Docker** to simplify the deployment and ensure consistency across different environments.

## 📌 Why Use Docker?

- Eliminates "works on my machine" issues.
- Packages all dependencies into a single container.
- Simplifies deployment across different environments.

---

## 📂 **Dockerfile Overview**

The **Dockerfile** is located in the root directory and follows a **multi-stage build** approach:

1. **`base`** → Sets up the **Node.js** environment.
2. **`deps`** → Installs **project dependencies**.
3. **`builder`** → Builds the **Next.js application**.
4. **`runner`** → Runs the **optimized application container**.

---

## 🛠️ **Building and Running the Docker Container**

### **Build the Docker Image**

```bash
docker build -t kraken-webui .
```

This command creates a Docker image with all dependencies included.

### **Run the Container**

```bash
docker run -p 3000:3000 kraken-webui
```

This starts a container that runs the application on **port 3000**.

---

## 🛑 **Stopping and Removing Containers**

To stop the running container:

```bash
docker stop <container_id>
```

To remove the container:

```bash
docker rm <container_id>
```

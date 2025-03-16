# Troubleshooting Guide

This document provides solutions for common issues that may arise while working with **Kraken Web UI**.

---

## General Issues

### ❌ Issue: `npm install` fails

**Possible causes:**

- Incorrect Node.js version.
- Conflicting dependencies.

**Solution:**

```bash
rm -rf node_modules package-lock.json
npm install
```

Make sure you are using the correct Node.js version:

```bash
node -v
```

If needed, update your Node.js version.

---

## Next.js Issues

### ❌ Issue: Application does not start with `npm run dev`

**Error:** `Error: Cannot find module 'next'`  
**Solution:**

1. Ensure dependencies are installed:
   ```bash
   npm install
   ```
2. Check if you have the correct **Node.js version**:
   ```bash
   node -v
   ```
3. Try **clearing Next.js cache** and restart:
   ```bash
   rm -rf .next
   npm run dev
   ```

---

## MongoDB Issues

### ❌ Issue: Database connection error

**Error:** `MongoServerSelectionError: Could not connect to any servers`  
**Solution:**

1. Check if MongoDB is running:
   ```bash
   docker ps
   ```
   If it's not running, start it:
   ```bash
   docker-compose up -d
   ```
2. Verify the connection string in `.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/sensor_config
   ```
3. Restart the database service:
   ```bash
   docker restart mongo
   ```

---

## Docker Issues

### ❌ Issue: Docker container fails to start

**Error:** `port is already allocated`  
**Solution:**

1. Find the process using port 3000:

```bash
lsof -i :3000
```

2. Kill the process:

```bash
kill -9 <PID>
```

3. Restart the container:

```bash
docker-compose up --force-recreate --build -d
```

---

## MkDocs Issues

### ❌ Issue: Documentation site does not load

**Solution:**

1. Make sure **MkDocs is installed**:
   ```bash
   pip install mkdocs-material
   ```
2. Run the documentation server:
   ```bash
   mkdocs serve
   ```
3. Open [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## Need More Help?

If you encounter an issue not listed here, check the logs and open a GitHub issue.

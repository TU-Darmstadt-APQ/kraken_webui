# 📖 Documentation Guide

The project contains built-in documentation written in Markdown and displayed using **MkDocs** with the **Material** theme.

---

## 🛠️ How to run the documentation (development mode)

1. **Go to the project root:**

   `cd kraken_webui`

2. **Make sure `mkdocs-material` is installed:**  
   (install it in a virtual environment or with pipx)

```bash
python -m venv /env
source env/bin/activate
pip install -r requirements.txt
```

3. **Start the local documentation server:**

   `mkdocs serve`

4. **Open it in your browser:**

   [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🛠️ Additional commands

- **Build the static site:**  
   `mkdocs build`
  The result will be in the `site/` folder.

- **Deploy to GitHub Pages:**  
   _(requires a configured GitHub repository)_  
   `mkdocs gh-deploy`

---

## 💡 Useful Tips

- The Markdown documentation files are located in the `docs/` folder.
- The structure and navigation are configured in the `mkdocs.yml` file.
- Changes in Markdown files are automatically reflected when refreshing the page.

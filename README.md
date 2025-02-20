# Kraken Web UI

An open source web ui to configure sensors with a gui and displaying the existing configuration. This project uses Next.js in order to leverage the advantages of React.

# How to Install and Run Kraken Web UI

- Clone the repository
  `git clone https://github.com/TU-Darmstadt-APQ/kraken_webui.git`

- Go into the app folder
  `cd kraken_webui/kraken-webui-app/`

- Install all node module updates via npm
  `npm update`

- Start the dev server locally for development
  `npm run dev`

- Open the app in your browser
  `http://localhost:3000`

# How to Use Kraken Web UI

Coming soon...

# Documentation

For detailed documentation, please visit our Documentation website http://127.0.0.1:8000/overview/

# CI/CD

This project uses GitHub Actions for CI/CD. The configuration is located in the [.github/workflows/ci.yml](.github/workflows/ci.yml) file. The CI pipeline includes the following steps:

- Checkout the code
- Set up Node.js
- Install dependencies
- Run Jest tests
- Build and push Docker images to GitHub Container Registry

To trigger the CI pipeline, push changes to the `master` or `dev` branches, or create a pull request.

# Dockerfile

The Dockerfile for this project is located in the root directory. It consists of multiple stages:

- `base`: Sets up the base image with Node.js.
- `deps`: Installs the project dependencies.
- `builder`: Builds the Next.js application.
- `runner`: runs the application.

To build and run the Docker image locally, use the following commands:

## Build the Docker image

```bash
docker build -t kraken-webui .
```

# Run the Docker container

```bash
docker run -p 3000:3000 kraken-webui
```

# License

See the LICENSE file for license rights and limitations (MIT).

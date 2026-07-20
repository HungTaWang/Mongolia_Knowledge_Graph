# Mongolia Knowledge Graph

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-19.x-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-6.x-blue.svg)
![Vite](https://img.shields.io/badge/vite-8.x-blue.svg)

## 📖 Overview

**Mongolia Knowledge Graph** is an interactive, web-based visualization tool designed to explore and represent historical and geographical data related to Mongolia. Built with modern web technologies such as React, TypeScript, and Vite, the application utilizes `react-force-graph` and `react-simple-maps` to render complex 2D and 3D network graphs and interactive maps.

This project aims to provide an intuitive interface for researchers, historians, and enthusiasts to navigate interconnected knowledge seamlessly.

## ✨ Features

- **Interactive Graphs:** Experience both 2D and 3D force-directed graphs to visualize relationships between historical entities.
- **Geospatial Mapping:** Integrated map views to contextualize historical data geographically.
- **Modern Tech Stack:** Fast development and optimized production builds powered by Vite.
- **Type Safety:** Robust development experience utilizing TypeScript.
- **GitHub Pages Integration:** Automated deployment pipeline via GitHub Actions.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- `npm` (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HungTaWang/Mongolia_Knowledge_Graph.git
   cd Mongolia_Knowledge_Graph
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Development

To start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173/`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The generated static files will be located in the `dist` directory.

## 📦 Deployment

This project is configured to be automatically deployed to **GitHub Pages** using GitHub Actions.

### Automated Deployment

1. Navigate to your repository on GitHub.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, ensure the **Source** is set to **GitHub Actions**.
4. Whenever changes are pushed to the `main` branch, the deployment workflow will automatically trigger, build the project, and publish the `dist` folder to your GitHub Pages site.

*Note: The `base` path in `vite.config.ts` has been configured as `/Mongolia_Knowledge_Graph/` to ensure assets load correctly on GitHub Pages.*

## 🛠️ Tech Stack

- **Framework:** [React](https://react.dev/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Visualizations:** [react-force-graph](https://github.com/vasturiano/react-force-graph), [react-simple-maps](https://www.react-simple-maps.io/), [Three.js](https://threejs.org/)
- **Linting:** [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

## 📄 License

This project is licensed under the MIT License.

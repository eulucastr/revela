# 📸 Revela

> **Relive your memories in analog digital albums.**

Revela is a desktop application designed to organize and display your photos with a nostalgic yet modern aesthetic. Escape cold digital galleries and organize your memories into albums that bring back the feeling of flipping through a real photo album, with the flexibility of modern technology.

## ✨ Features

- **Personalized Albums:** Organize your photos into thematic albums.
- **Minimalist Interface:** Total focus on your photos with a clean and elegant design.
- **Fluid Interaction:** Smooth hover animations and layout transitions using Framer Motion.
- **Free Arrangement:** Easily reorganize your photos with drag-and-drop support.
- **"Paper" Aesthetic:** Visuals inspired by physical albums with subtle textures and shadows.

## 🚀 Technologies

This project was built using the following technologies:

- **[Electron](https://www.electronjs.org/):** Framework for cross-platform desktop applications.
- **[React](https://reactjs.org/):** Library for user interfaces.
- **[TypeScript](https://www.typescriptlang.org/):** Static typing for better development safety.
- **[Vite](https://vitejs.dev/):** Ultra-fast build tool.
- **[SASS/SCSS](https://sass-lang.com/):** CSS preprocessor for dynamic and organized styles.
- **[Framer Motion](https://www.framer.com/motion/):** Animation library for React.
- **[dnd-kit](https://dndkit.com/):** Toolkit for drag-and-drop functionality.

## 🛠️ Getting Started

Follow the instructions below to run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/eulucastr/revela.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running

To start the application in development mode:
```bash
npm start
```

## 📦 Available Scripts

- `npm start`: Starts the Electron application using Electron Forge.
- `npm run lint`: Runs ESLint to check for code style errors.
- `npm run test`: Runs unit tests using Jest.
- `npm run package`: Packages the application for distribution.
- `npm run make`: Generates application installers.

## 📂 Project Structure

- `src/main.ts`: Entry point for the Electron main process.
- `src/renderer.tsx`: Entry point for the renderer process (React).
- `src/components`: Reusable React components.
- `src/styles`: SCSS files for global and component styling.
- `src/assets`: Static resources like icons and textures.

---

Developed with ❤️ by [Lucas Torres](https://github.com/lucas-torres-dev)

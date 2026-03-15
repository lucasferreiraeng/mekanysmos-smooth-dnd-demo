# @mekanysmos/react-smooth-dnd Demo

Interactive demo showcasing [@mekanysmos/react-smooth-dnd](https://github.com/lucasferreiraeng/mekanysmos-react-smooth-dnd) — a modernized fork of `react-smooth-dnd` with functional components, hooks, TypeScript support, and a polymorphic `as` prop.

**Live Demo:** [https://lucasferreiraeng.github.io/mekanysmos-smooth-dnd-demo/](https://lucasferreiraeng.github.io/mekanysmos-smooth-dnd-demo/)

## Demo Categories

- **Showcase** — Card board (Kanban-style), form elements
- **Basic Sortables** — Default options, scroller, horizontal
- **Groups** — Cross-group drag-and-drop, copy draggable
- **Nested Groups** — Nested vertical sortable
- **Advanced Options** — Lock axis, drag delay, drag handle, CSS classes, animation duration

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or Yarn

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will build the project and publish it to GitHub Pages at [https://lucasferreiraeng.github.io/mekanysmos-smooth-dnd-demo/](https://lucasferreiraeng.github.io/mekanysmos-smooth-dnd-demo/).

**To set up GitHub Pages for your fork:**

1. Go to your repository Settings > Pages
2. Set "Source" to "Deploy from a branch"
3. Select the `gh-pages` branch and `/ (root)` folder
4. Run `npm run deploy` to publish

## Tech Stack

- **React 18** with TypeScript
- **@mekanysmos/react-smooth-dnd** for drag-and-drop
- **Webpack 4** bundler
- **gh-pages** for deployment

## Library

This demo uses [`@mekanysmos/react-smooth-dnd`](https://github.com/lucasferreiraeng/mekanysmos-react-smooth-dnd), which provides:

- **Container** — Drop container component
- **Draggable** — Draggable item wrapper
- Full TypeScript support with element-aware prop inference
- Polymorphic `as` prop for rendering as any HTML element
- Ref forwarding support
- Backward compatibility with the legacy render prop pattern

## License

MIT

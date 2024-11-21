# 3D Character Viewer

A Next.js + Three.js application that displays animated 3D characters with dynamic lighting and interactive controls. Perfect for previewing and testing 3D character animations in a web browser.

![Demo Preview](./docs/images/image.gif)

## ✨ Features

- **Interactive 3D Viewer**
  - Real-time character animation playback
  - Orbit controls for camera movement
  - Dynamic lighting with moving light sources
  - Real-time shadow rendering with quality controls

- **Advanced Material System**
  - PBR (Physically Based Rendering) materials
  - Environment mapping for realistic reflections
  - Adjustable material properties (metalness, roughness, etc.)

- **Comprehensive GUI Controls**
  - Character position, rotation, and scale
  - Light intensity and shadow quality
  - Animation playback controls
  - Camera controls

## 🔧 Requirements

- Node.js 18.0.0 or higher
- Modern web browser with WebGL support
- npm or yarn package manager

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/harukaapps/3d-character-viewer.git
cd 3d-character-viewer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 Controls

### Model Controls
- **Scale**: Adjust character size (0.1 - 5.0)
- **Position**: Move character in 3D space
  - X: Left/Right (-3 to 3)
  - Y: Up/Down (-3 to 3)
  - Z: Forward/Backward (-3 to 3)
- **Rotation**: Rotate character around Y axis

### Lighting Controls
- **Spot Light**: Adjust main light intensity
- **Moving Lights**: Control dynamic light brightness
- **Shadows**: Customize shadow quality and softness

### Camera Controls
- **Left Mouse**: Rotate camera
- **Right Mouse**: Pan camera
- **Mouse Wheel**: Zoom in/out

## 🛠 Development

This project uses:
- [Next.js](https://nextjs.org/) 13+ - React Framework
- [Three.js](https://threejs.org/) - 3D Graphics Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [dat.GUI](https://github.com/dataarts/dat.gui) - Control Interface

## 📝 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 👤 Author

[@haruka_apps](https://github.com/harukaapps)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

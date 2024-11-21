# Animated Character Viewer - Technical Documentation

## 📁 Project Structure

```
/
├── app/
│   ├── components/
│   │   └── ThreeScene.tsx    # Main 3D scene component
│   ├── layout.tsx            # App layout with metadata
│   └── page.tsx              # Main page component
├── public/                   # Static assets
├── docs/
│   ├── images/              # Documentation images
│   └── DOCUMENTATION.md     # Technical documentation
└── README.md                # Project overview
```

## 🔧 Component Architecture

### ThreeScene.tsx

The core component responsible for 3D scene rendering and interaction management.

#### Initialization Flow

1. **Scene Setup**
   ```typescript
   const scene = new THREE.Scene();
   const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
   const renderer = new THREE.WebGLRenderer({ antialias: true });
   ```

2. **Lighting Configuration**
   ```typescript
   const spotLight = new THREE.SpotLight(0xffffff, 1.0);
   const pointLight1 = new THREE.PointLight(0xffffff, 1.5);
   const pointLight2 = new THREE.PointLight(0xffffff, 1.5);
   ```

3. **Shadow Setup**
   ```typescript
   renderer.shadowMap.enabled = true;
   renderer.shadowMap.type = THREE.PCFSoftShadowMap;
   ```

#### Key Features Implementation

1. **GLB Model Loading**
   ```typescript
   const loader = new GLTFLoader();
   loader.load(MODEL_URL, (gltf) => {
     const model = gltf.scene;
     // Model setup and animation
   });
   ```

2. **Animation System**
   - AnimationMixer for character animations
   - Clock-based timing system
   - Dynamic light movement

3. **GUI Controls**
   - Model transformation
   - Lighting parameters
   - Shadow quality settings

## 🎨 Material System

### Physical Based Rendering (PBR)

```typescript
const material = new THREE.MeshPhysicalMaterial({
  metalness: 0.9,
  roughness: 0.1,
  clearcoat: 0.5,
  clearcoatRoughness: 0.1,
  envMapIntensity: 1.0
});
```

Properties:
- metalness: 0.0 - 1.0
- roughness: 0.0 - 1.0
- clearcoat: 0.0 - 1.0
- envMapIntensity: 0.0 - 3.0

## 💡 Lighting System

### Light Types

1. **Spot Light**
   - Position: Above scene
   - Intensity: 1.0
   - Shadow mapping enabled

2. **Moving Point Lights**
   - Circular motion pattern
   - Customizable radius and speed
   - Dynamic intensity control

### Shadow Configuration

```typescript
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
spotLight.shadow.bias = -0.0001;
spotLight.shadow.radius = 4;
```

## 🎮 Control System

### OrbitControls

```typescript
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
```

### GUI Controls Structure

```typescript
const params = {
  // Model
  scale: 2.0,
  rotationY: 0,
  
  // Lighting
  spotLightIntensity: 1.0,
  movingLightIntensity: 1.5,
  
  // Shadows
  shadowRadius: 4,
  shadowMapSize: 2048
};
```

## ⚡ Performance Optimization

1. **Shadow Map Quality Levels**
   - Low: 512x512
   - Medium: 1024x1024
   - High: 2048x2048
   - Ultra: 4096x4096

2. **Animation Optimization**
   - RequestAnimationFrame for smooth rendering
   - Delta time based animations
   - Proper disposal of unused resources

3. **Memory Management**
   ```typescript
   // Cleanup example
   useEffect(() => {
     return () => {
       scene.dispose();
       renderer.dispose();
       // Dispose materials, geometries, and textures
     };
   }, []);
   ```

## 🌐 Browser Compatibility

Minimum Requirements:
- WebGL 2.0 support
- Modern JavaScript features (ES6+)
- Recommended browsers:
  - Chrome 90+
  - Firefox 88+
  - Safari 14+

## 📦 Dependencies

```json
{
  "dependencies": {
    "three": "^0.160.0",
    "@types/three": "^0.160.0",
    "next": "14.0.4",
    "react": "^18.2.0",
    "dat.gui": "^0.7.9"
  }
}
```

## 🔍 Debugging Tips

1. Enable Three.js debug mode:
   ```typescript
   THREE.Debug.enable();
   ```

2. Monitor performance:
   ```typescript
   const stats = new Stats();
   document.body.appendChild(stats.dom);
   ```

3. Common issues:
   - Shadow artifacts: Adjust shadow bias
   - Performance issues: Lower shadow map resolution
   - Model loading fails: Check CORS and file paths

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';

export default function ThreeScene() {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const light1Ref = useRef<THREE.PointLight | null>(null);
    const light2Ref = useRef<THREE.PointLight | null>(null);
    const statsRef = useRef<Stats | null>(null);
    const sphereRef = useRef<THREE.Mesh | null>(null);
    const modelRef = useRef<THREE.Group | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Stats（FPS表示）の初期化
        const stats = new Stats();
        stats.dom.style.position = 'absolute';
        stats.dom.style.left = '10px';
        stats.dom.style.top = '10px';
        mountRef.current.appendChild(stats.dom);
        statsRef.current = stats;

        // シーンの設定
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        sceneRef.current = scene;

        // カメラの設定
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        cameraRef.current = camera;

        // レンダラーの設定
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true; // シャドウマップを有効化
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // ソフトシャドウを使用
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // OrbitControlsの設定
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controlsRef.current = controls;

        // 環境光の追加（暗めに設定）
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // 強度を下げる
        scene.add(ambientLight);

        // キューブ用のスポットライト
        const spotLight = new THREE.SpotLight(0xffffff, 1.0);
        spotLight.position.set(0, 5, 0);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048; // シャドウマップの解像度を上げる
        spotLight.shadow.mapSize.height = 2048;
        spotLight.shadow.camera.near = 0.1;
        spotLight.shadow.camera.far = 20;
        spotLight.shadow.bias = -0.0001; // シャドウアクネを軽減
        spotLight.shadow.radius = 4; // シャドウのぼかし
        scene.add(spotLight);

        // 移動する光源1
        const light1 = new THREE.PointLight(0xffffff, 1.5);
        light1.castShadow = true;
        light1.shadow.mapSize.width = 1024;
        light1.shadow.mapSize.height = 1024;
        light1.shadow.camera.near = 0.1;
        light1.shadow.camera.far = 10;
        light1.shadow.bias = -0.0001;
        light1.shadow.radius = 4;
        scene.add(light1);
        light1Ref.current = light1;

        // 移動する光源2
        const light2 = new THREE.PointLight(0xffffff, 1.5);
        light2.castShadow = true;
        light2.shadow.mapSize.width = 1024;
        light2.shadow.mapSize.height = 1024;
        light2.shadow.camera.near = 0.1;
        light2.shadow.camera.far = 10;
        light2.shadow.bias = -0.0001;
        light2.shadow.radius = 4;
        scene.add(light2);
        light2Ref.current = light2;

        // 立方体のサイズ
        const size = 3;

        // 立方体の各面の定義
        const faces = [
            {
                // 前面（透明）
                position: [0, 0, size/2] as [number, number, number],
                rotation: [0, 0, 0] as [number, number, number],
                material: new THREE.MeshPhongMaterial({
                    color: 0xFFFFFF,
                    transparent: true,
                    opacity: 0.1,
                    side: THREE.DoubleSide,
                    shininess: 80
                })
            },
            {
                // 背面
                position: [0, 0, -size/2] as [number, number, number],
                rotation: [0, Math.PI, 0] as [number, number, number],
                materials: [
                    new THREE.MeshPhongMaterial({
                        color: 0x000000,
                        side: THREE.FrontSide,
                        shininess: 80
                    }),
                    new THREE.MeshPhongMaterial({
                        color: 0xCCCCCC,
                        emissive: 0x666666,
                        side: THREE.BackSide
                    })
                ]
            },
            {
                // 右面
                position: [size/2, 0, 0] as [number, number, number],
                rotation: [0, Math.PI/2, 0] as [number, number, number],
                materials: [
                    new THREE.MeshPhongMaterial({
                        color: 0x000000,
                        side: THREE.FrontSide,
                        shininess: 80
                    }),
                    new THREE.MeshPhongMaterial({
                        color: 0x00FF00,
                        emissive: 0x006600,
                        side: THREE.BackSide
                    })
                ]
            },
            {
                // 左面
                position: [-size/2, 0, 0] as [number, number, number],
                rotation: [0, -Math.PI/2, 0] as [number, number, number],
                materials: [
                    new THREE.MeshPhongMaterial({
                        color: 0x000000,
                        side: THREE.FrontSide,
                        shininess: 80
                    }),
                    new THREE.MeshPhongMaterial({
                        color: 0x4169E1,
                        emissive: 0x002266,
                        side: THREE.BackSide
                    })
                ]
            },
            {
                // 上面
                position: [0, size/2, 0] as [number, number, number],
                rotation: [-Math.PI/2, 0, 0] as [number, number, number],
                materials: [
                    new THREE.MeshPhongMaterial({
                        color: 0x000000,
                        side: THREE.FrontSide,
                        shininess: 80
                    }),
                    new THREE.MeshPhongMaterial({
                        color: 0xCCCCCC,
                        emissive: 0x666666,
                        side: THREE.BackSide
                    })
                ]
            },
            {
                // 下面
                position: [0, -size/2, 0] as [number, number, number],
                rotation: [Math.PI/2, 0, 0] as [number, number, number],
                materials: [
                    new THREE.MeshPhongMaterial({
                        color: 0x000000,
                        side: THREE.FrontSide,
                        shininess: 80
                    }),
                    new THREE.MeshPhongMaterial({
                        color: 0xCCCCCC,
                        emissive: 0x666666,
                        side: THREE.BackSide
                    })
                ]
            }
        ];

        // 立方体の各面を作成
        const geometry = new THREE.PlaneGeometry(size, size);
        faces.forEach(face => {
            if ('materials' in face) {
                // 黒と色付きの二重の面
                const blackMesh = new THREE.Mesh(geometry, face.materials[0]);
                blackMesh.position.set(...face.position);
                blackMesh.rotation.set(...face.rotation);
                blackMesh.receiveShadow = true;
                scene.add(blackMesh);

                const colorMesh = new THREE.Mesh(geometry, face.materials[1]);
                colorMesh.position.set(...face.position);
                colorMesh.rotation.set(...face.rotation);
                colorMesh.receiveShadow = true;
                scene.add(colorMesh);
            } else {
                // 透明な面
                const mesh = new THREE.Mesh(geometry, face.material);
                mesh.position.set(...face.position);
                mesh.rotation.set(...face.rotation);
                mesh.receiveShadow = true;
                scene.add(mesh);
            }
        });

        // 金属球の作成
        const sphereGeometry = new THREE.SphereGeometry(0.6, 32, 32); // サイズを0.3から0.6に
        const sphereMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 1.0,
            roughness: 0.1,
            clearcoat: 0.5,
            clearcoatRoughness: 0.05,
            side: THREE.FrontSide
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(-size/2 + 1.0, size/2 - 1.0, -size/2 + 1.0); // 位置も調整
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        sphereRef.current = sphere;
        scene.add(sphere);

        // 環境マップ用のキューブカメラ
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
        const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
        scene.add(cubeCamera);

        // メタリックな球体の追加
        sphereMaterial.envMap = cubeRenderTarget.texture;

        // GUIコントロールパネルの設定
        const gui = new GUI();
        gui.domElement.style.position = 'absolute';
        gui.domElement.style.right = '10px';
        gui.domElement.style.top = '10px';

        // アニメーションパラメータ
        const params = {
            timeScale: 1.0,
            autoRotate: true,
            rotationSpeed: 0.01,
            light1Radius: 0.8,
            light2Radius: 0.8,
            light1Speed: 1.0,
            light2Speed: -1.0,
            cameraDistance: 5,
            spotLightIntensity: 1.0,
            movingLightIntensity: 1.5,
            shadowRadius: 4,
            shadowMapSize: 2048,
            shadowBias: -0.0001,
            shadowDarkness: 0.5
        };

        // アニメーション制御
        const animationFolder = gui.addFolder('Animation');
        animationFolder.add(params, 'timeScale', 0.1, 2.0, 0.1).name('Time Scale');
        animationFolder.add(params, 'autoRotate').name('Auto Rotate');
        animationFolder.add(params, 'rotationSpeed', -5, 5, 0.01).name('Rotation Speed')
            .onChange((value: number) => {
                if (controlsRef.current) {
                    controlsRef.current.autoRotateSpeed = value;
                }
            });

        // 光源の移動パラメータ
        const lightAnimFolder = gui.addFolder('Light Animation');
        lightAnimFolder.add(params, 'light1Radius', 0.2, 2.0, 0.1).name('Light 1 Radius');
        lightAnimFolder.add(params, 'light2Radius', 0.2, 2.0, 0.1).name('Light 2 Radius');
        lightAnimFolder.add(params, 'light1Speed', -2.0, 2.0, 0.1).name('Light 1 Speed');
        lightAnimFolder.add(params, 'light2Speed', -2.0, 2.0, 0.1).name('Light 2 Speed');

        // カメラ設定
        const cameraFolder = gui.addFolder('Camera');
        cameraFolder.add(params, 'cameraDistance', 5, 20, 0.5).name('Distance')
            .onChange((value: number) => {
                if (cameraRef.current) {
                    cameraRef.current.position.setLength(value);
                }
            });

        // 球体のマテリアル制御
        const sphereFolder = gui.addFolder('Sphere Material');
        sphereFolder.add(sphereMaterial, 'metalness', 0, 1, 0.1).name('Metalness');
        sphereFolder.add(sphereMaterial, 'roughness', 0, 1, 0.1).name('Roughness');
        sphereFolder.add(sphereMaterial, 'clearcoat', 0, 1, 0.1).name('Clearcoat');
        sphereFolder.add(sphereMaterial, 'clearcoatRoughness', 0, 1, 0.01).name('Clearcoat Roughness');
        sphereFolder.addColor({ color: '#E0E0E0' }, 'color')
            .onChange((value: string) => {
                sphereMaterial.color.setStyle(value);
            })
            .name('Color');

        // 光源と影の制御
        const lightFolder = gui.addFolder('Lights & Shadows');
        lightFolder.add(params, 'spotLightIntensity', 0, 3, 0.1).name('Spot Light')
            .onChange((value) => {
                spotLight.intensity = value;
            });
        lightFolder.add(params, 'movingLightIntensity', 0, 3, 0.1).name('Moving Lights')
            .onChange((value) => {
                if (light1Ref.current) light1Ref.current.intensity = value;
                if (light2Ref.current) light2Ref.current.intensity = value;
            });
        lightFolder.add(params, 'shadowRadius', 0, 10, 0.5).name('Shadow Blur')
            .onChange((value) => {
                spotLight.shadow.radius = value;
                if (light1Ref.current) light1Ref.current.shadow.radius = value;
                if (light2Ref.current) light2Ref.current.shadow.radius = value;
            });
        lightFolder.add(params, 'shadowBias', -0.01, 0.01, 0.0001).name('Shadow Bias')
            .onChange((value) => {
                spotLight.shadow.bias = value;
                if (light1Ref.current) light1Ref.current.shadow.bias = value;
                if (light2Ref.current) light2Ref.current.shadow.bias = value;
            });
        lightFolder.add(params, 'shadowMapSize', [512, 1024, 2048, 4096]).name('Shadow Quality')
            .onChange((value) => {
                spotLight.shadow.mapSize.width = value;
                spotLight.shadow.mapSize.height = value;
                if (light1Ref.current) {
                    light1Ref.current.shadow.mapSize.width = value / 2;
                    light1Ref.current.shadow.mapSize.height = value / 2;
                }
                if (light2Ref.current) {
                    light2Ref.current.shadow.mapSize.width = value / 2;
                    light2Ref.current.shadow.mapSize.height = value / 2;
                }
                // シャドウマップを更新
                spotLight.shadow.map?.dispose();
                spotLight.shadow.map = null;
                if (light1Ref.current) {
                    light1Ref.current.shadow.map?.dispose();
                    light1Ref.current.shadow.map = null;
                }
                if (light2Ref.current) {
                    light2Ref.current.shadow.map?.dispose();
                    light2Ref.current.shadow.map = null;
                }
            });
        lightFolder.open();

        // GLBモデルのロード
        const loader = new GLTFLoader();
        loader.load(
            'https://ucarecdn.com/7cdd70ab-6459-42e8-b845-7a57fbdea401/tripo_retarget_8fbce00cfea64a699fd9afb0bc5a1c70.glb',
            (gltf) => {
                const model = gltf.scene;
                model.scale.set(2.0, 2.0, 2.0);

                // モデルの境界ボックスを計算
                const box = new THREE.Box3().setFromObject(model);
                const height = box.max.y - box.min.y;
                // モデルの足が床に接するように位置を調整
                model.position.set(0, -box.min.y * model.scale.y, 0);

                model.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                scene.add(model);

                // モデル調整用のGUIフォルダー
                const modelFolder = gui.addFolder('Model Controls');
                // スケール調整
                modelFolder.add(model.scale, 'x', 0.1, 5.0, 0.1)
                    .name('Scale')
                    .onChange((value) => {
                        model.scale.set(value, value, value);
                    });
                // 位置調整
                modelFolder.add(model.position, 'x', -3, 3, 0.1).name('Position X');
                modelFolder.add(model.position, 'y', -3, 3, 0.1).name('Position Y');
                modelFolder.add(model.position, 'z', -3, 3, 0.1).name('Position Z');
                // 回転調整
                modelFolder.add(model.rotation, 'y', -Math.PI, Math.PI, 0.1).name('Rotation Y');
                modelFolder.open();

                // アニメーションの設定
                const mixer = new THREE.AnimationMixer(model);
                const animations = gltf.animations;
                if (animations && animations.length > 0) {
                    const action = mixer.clipAction(animations[0]);
                    action.play();
                }

                // アニメーションミキサーの参照を保存
                const mixerRef = { current: mixer };

                // アニメーション更新関数を修正
                const clock = new THREE.Clock();
                const animate = () => {
                    if (mixerRef.current) {
                        const delta = clock.getDelta();  // 正しい時間の差分を取得
                        mixerRef.current.update(delta);
                    }
                    
                    // 既存のアニメーション処理
                    if (params.autoRotate) {
                        scene.rotation.y += params.rotationSpeed;
                    }

                    // 光源のアニメーション
                    const time = clock.getElapsedTime() * params.timeScale;  // 経過時間を正しく取得
                    if (light1Ref.current) {
                        light1Ref.current.position.x = Math.cos(time * params.light1Speed) * params.light1Radius;
                        light1Ref.current.position.z = Math.sin(time * params.light1Speed) * params.light1Radius;
                    }
                    if (light2Ref.current) {
                        light2Ref.current.position.x = Math.cos(time * params.light2Speed) * params.light2Radius;
                        light2Ref.current.position.z = Math.sin(time * params.light2Speed) * params.light2Radius;
                    }

                    controls.update();
                    renderer.render(scene, camera);
                    requestAnimationFrame(animate);
                };

                // アニメーションを開始
                animate();
            },
            undefined,
            (error) => {
                console.error('GLBモデルの読み込みに失敗しました:', error);
            }
        );

        // 環境マップの更新関数
        function updateEnvironmentMap() {
            if (sphere && cubeCamera) {
                sphere.visible = false;
                cubeCamera.position.copy(sphere.position);
                cubeCamera.update(renderer, scene);
                sphere.visible = true;
            }
        }

        // アニメーションループ
        let animationFrameId: number;
        let time = 0;
        
        function animate() {
            time += 0.02 * params.timeScale;

            // Stats更新
            if (statsRef.current) {
                statsRef.current.update();
            }

            // モデルの回転アニメーション（オプション）
            if (modelRef.current) {
                modelRef.current.rotation.y += 0.005;
            }

            // 光源1の移動（円運動）
            if (light1Ref.current) {
                const radius = params.light1Radius;
                const speed = params.light1Speed;
                light1Ref.current.position.x = radius * Math.cos(time * speed);
                light1Ref.current.position.z = radius * Math.sin(time * speed);
                light1Ref.current.position.y = size/2 - 0.2;  // Y位置を固定
            }

            // 光源2の移動（円運動）
            if (light2Ref.current) {
                const radius = params.light2Radius;
                const speed = params.light2Speed;
                light2Ref.current.position.x = radius * Math.cos(time * speed + Math.PI);
                light2Ref.current.position.z = radius * Math.sin(time * speed + Math.PI);
                light2Ref.current.position.y = size/2 - 0.2;  // Y位置を固定
            }

            // オートローテーション
            if (controlsRef.current) {
                controlsRef.current.autoRotate = params.autoRotate;
            }

            // 環境マップの更新
            updateEnvironmentMap();

            // レンダリング
            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }

            if (controlsRef.current) {
                controlsRef.current.update();
            }

            animationFrameId = requestAnimationFrame(animate);
        }

        // 初回レンダリング
        renderer.render(scene, camera);
        animate();

        // リサイズハンドラ
        const handleResize = () => {
            if (cameraRef.current && rendererRef.current && mountRef.current) {
                const width = window.innerWidth;
                const height = window.innerHeight;

                cameraRef.current.aspect = width / height;
                cameraRef.current.updateProjectionMatrix();

                rendererRef.current.setSize(width, height);
            }
        };

        window.addEventListener('resize', handleResize);

        // クリーンアップ
        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) {
                if (rendererRef.current) {
                    mountRef.current.removeChild(rendererRef.current.domElement);
                }
                if (statsRef.current) {
                    mountRef.current.removeChild(statsRef.current.dom);
                }
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            gui.destroy();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100vh', position: 'relative' }} />;
}

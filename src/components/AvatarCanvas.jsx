import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";


function AvatarModel({
  modelPath,
  position,
  scale,
}) {
  const { scene } = useGLTF(modelPath);

  return (
    <group
      position={position}
      scale={scale}
    >
      <primitive object={scene} />
    </group>
  );
}


function AvatarCanvas({
  modelPath,
  position = [0, -1.45, 0],
  scale = 2.18,
}) {
  return (
    <Canvas
      camera={{
        position: [
          0,
          0.65,
          5.35,
        ],
        fov: 35,
      }}
      gl={{
        antialias: true,
        alpha: true,
      }}
      dpr={[1, 2]}
    >
      {/* Base lighting */}
      <ambientLight
        intensity={1.4}
      />

      <directionalLight
        position={[
          4,
          6,
          5,
        ]}
        intensity={2.5}
      />

      {/* Blue accent light */}
      <pointLight
        position={[
          -4,
          2,
          3,
        ]}
        intensity={25}
        color="#185fa5"
        distance={10}
      />

      {/* Purple accent light */}
      <pointLight
        position={[
          4,
          1,
          2,
        ]}
        intensity={18}
        color="#534ab7"
        distance={9}
      />

      {/* Avatar */}
      <AvatarModel
        modelPath={modelPath}
        position={position}
        scale={scale}
      />

      {/* Same interaction for every avatar */}
      <OrbitControls
        enablePan={false}
        enableZoom
        enableRotate
        minDistance={3.2}
        maxDistance={8}
        minPolarAngle={0.55}
        maxPolarAngle={2.55}
        target={[
          0,
          0.15,
          0,
        ]}
      />

      <Environment preset="city" />
    </Canvas>
  );
}


export default AvatarCanvas;
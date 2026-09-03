import { Canvas } from "@react-three/fiber";

import {
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";


const AvatarModel = () => {
  const { scene } = useGLTF(
    "/models/graduation-avatar.glb"
  );

  return (
    <group
      position={[0, -1.45, 0]}
      scale={2.18}
    >
      <primitive object={scene} />
    </group>
  );
};


const EducationAvatar = () => (
  <div className="education-avatar">
    <Canvas
      camera={{
        position: [0, 0.65, 5.35],
        fov: 35,
      }}
      gl={{
        antialias: true,
        alpha: true,
      }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={1.4} />

      <directionalLight
        position={[4, 6, 5]}
        intensity={2.5}
      />

      <pointLight
        position={[-4, 2, 3]}
        intensity={25}
        color="#185fa5"
        distance={10}
      />

      <pointLight
        position={[4, 1, 2]}
        intensity={18}
        color="#534ab7"
        distance={9}
      />

      <AvatarModel />

      <OrbitControls
        enablePan={false}
        enableZoom
        enableRotate
        minDistance={3.2}
        maxDistance={8}
        minPolarAngle={0.55}
        maxPolarAngle={2.55}
        target={[0, 0.15, 0]}
      />

      <Environment preset="city" />
    </Canvas>
  </div>
);


useGLTF.preload(
  "/models/graduation-avatar.glb"
);


export default EducationAvatar;
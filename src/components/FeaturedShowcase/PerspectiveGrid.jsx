import { Grid } from "@react-three/drei";

const PerspectiveGrid = () => {
  return (
    <Grid
      position={[0, -1.2, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      args={[20, 20]}
      cellSize={0.6}
      cellThickness={0.6}
      cellColor="rgba(255, 255, 255, 0.03)"
      sectionSize={3}
      sectionThickness={1}
      sectionColor="rgba(255, 255, 255, 0.05)"
      fadeDistance={15}
      fadeStrength={1}
      infiniteGrid
    />
  );
};

export default PerspectiveGrid;
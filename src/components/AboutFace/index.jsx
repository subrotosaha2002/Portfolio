import AvatarCanvas from "../AvatarCanvas";


const AboutFace = () => (
  <div className="about-face">
    <AvatarCanvas
      modelPath="/models/bitmoji-3d.glb"
      position={[0, -1.45, 0]}
      scale={2.18}
    />
  </div>
);


export default AboutFace;
import { MicroMouse } from "./compositions/MicroMouse";
import "./index.css";
import { Composition } from "remotion";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MicroMouse"
      component={MicroMouse}
      durationInFrames={30}
      fps={30}
      width={1280}
      height={720}
    />
  );
};

import { Composition } from "remotion";
import { MicroMouse } from "./compositions/MicroMouse";
import { pathShowMaze, ShowMaze } from "./compositions/ShowMaze";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ShowMaze"
        component={ShowMaze}
        durationInFrames={pathShowMaze.length + 10}
        fps={30}
        width={1280}
        height={960}
      />
      <Composition
        id="MicroMouse"
        component={MicroMouse}
        durationInFrames={30}
        fps={30}
        width={1280}
        height={960}
      />
    </>
  );
};

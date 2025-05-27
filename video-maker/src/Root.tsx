import { Composition } from "remotion";
import { MicroMouse } from "./compositions/MicroMouse";
import { pathShowMaze, ShowMaze } from "./compositions/ShowMaze";
import Manifesto from "./paths/manifesto.json";
import "./index.css";

const fnSum = (acc: number, cur: number) => acc + cur;
const trainingDuration = Manifesto.map(({ path }) => path.length).reduce(
  fnSum,
  0,
);

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
        durationInFrames={trainingDuration}
        fps={30}
        width={1280}
        height={960}
      />
    </>
  );
};

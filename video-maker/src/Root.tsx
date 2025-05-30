import { Composition } from "remotion";
import { TrainingComposition } from "./compositions/Training";
import { pathShowMaze, SampleComposition } from "./compositions/Sample";
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
        id="Sample"
        component={SampleComposition}
        durationInFrames={pathShowMaze.length + 10}
        fps={30}
        width={1280}
        height={960}
      />
      <Composition
        id="Training"
        component={TrainingComposition}
        durationInFrames={trainingDuration}
        fps={120}
        width={1280}
        height={960}
      />
    </>
  );
};

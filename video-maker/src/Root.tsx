import { Composition } from "remotion";
import { TrainingComposition } from "./compositions/Training";
import { SEQUENCES_SLIDE } from "./compositions/Slides/sequences";
import { pathShowMaze, SampleComposition } from "./compositions/Sample";
import { SlidesComposition } from "./compositions/Slides";
import { MAZE_ADDITIONAL_FRAME } from "./constants/config";
import Manifesto from "./paths/manifesto.json";
import { getStatsPath } from "./utils/getStatsPath";
import "./index.css";

const fnSum = (acc: number, cur: number) => acc + cur;

const trainingDuration = Manifesto.map(({ path }) => getStatsPath(path, 5))
  .map((path) => path.length + MAZE_ADDITIONAL_FRAME)
  .reduce(fnSum, 0);

const slidesDuration = SEQUENCES_SLIDE.map(
  ({ durationInFrames }) => durationInFrames,
).reduce(fnSum, 0);

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
        fps={30}
        width={1280}
        height={960}
      />
      <Composition
        id="Slides"
        component={SlidesComposition}
        durationInFrames={slidesDuration}
        fps={30}
        width={1280}
        height={960}
      />
    </>
  );
};

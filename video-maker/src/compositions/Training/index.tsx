import { Sequence } from "remotion";
import { MicroMouseTraining } from "./sequences/training";
import Manifesto from "../../paths/manifesto.json";
import { mappingManifestSkipFive } from "../../utils/mappingManifest";
import { TRAINING_MAZE } from "../../utils/maze";

const MANIFEST_TAKEN = Manifesto.map(mappingManifestSkipFive);

export const TrainingComposition = () => (
  <>
    {MANIFEST_TAKEN.map(({ episode, path, histogram, duration, from }) => (
      <Sequence key={episode} from={from} durationInFrames={duration}>
        <MicroMouseTraining
          data={TRAINING_MAZE}
          episode={episode}
          path={path}
          histogram={histogram}
        />
      </Sequence>
    ))}
  </>
);

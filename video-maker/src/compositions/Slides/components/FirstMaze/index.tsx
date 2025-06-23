import { useCurrentFrame } from "remotion";
import { SeqProps } from "../../../../compositions/Slides/types";
import { TRAINING_MAZE } from "../../../../utils/maze";
import Manifesto from "../../../../paths/manifesto.json";
import { mappingManifest } from "../../../../utils/mappingManifest";
import { DarkSlide } from "../../../../components/Slide";
import Maze from "../../../../components/Maze";
import { Anchor } from "../../../../components/Anchor";

const FIRST_EPISODE = Manifesto.map(mappingManifest)[0];

const Component = (props: SeqProps) => {
  const frame = useCurrentFrame();

  return (
    <DarkSlide {...props}>
      <Maze data={TRAINING_MAZE} path={FIRST_EPISODE.path} />
      {frame - (props.from ?? 0) > 50 ? <Anchor /> : null}
    </DarkSlide>
  );
};

export const FirstMazeSequence = {
  durationInFrames: 120,
  Component,
};

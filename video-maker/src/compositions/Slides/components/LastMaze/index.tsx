import { useCurrentFrame } from "remotion";
import { SeqProps } from "../../../../compositions/Slides/types";
import { TRAINING_MAZE } from "../../../../utils/maze";
import Manifesto from "../../../../paths/manifesto.json";
import { mappingManifest } from "../../../../utils/mappingManifest";
import { DarkSlide } from "../../../../components/Slide";
import Maze from "../../../../components/Maze";
import { Anchor } from "../../../../components/Anchor";

const LAST_EPISODE = Manifesto.map(mappingManifest)[Manifesto.length - 1];

const Component = (props: SeqProps) => {
  const frame = useCurrentFrame();

  return (
    <DarkSlide {...props}>
      <Maze data={TRAINING_MAZE} path={LAST_EPISODE.path} />
      {frame - (props.from ?? 0) > 50 ? <Anchor /> : null}
    </DarkSlide>
  );
};

export const LastMazeSequence = {
  durationInFrames: LAST_EPISODE.path.length + 60,
  Component,
};

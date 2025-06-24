import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { TRAINING_MAZE } from "../../../../utils/maze";
import Maze from "../../../../components/Maze";
import { Audio, staticFile, useCurrentFrame } from "remotion";
import { Highlight } from "../../../../components/Highlight";

const Component = (props: SeqProps) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - (props.from ?? 0);

  return (
    <DarkSlide {...props}>
      <Maze data={TRAINING_MAZE} path={[]} />
      <Anchor />
      {relativeFrame > 150 ? <Highlight x="24%" y="84%" /> : null}
      {relativeFrame > 170 ? <Highlight x="46.75%" y="45%" /> : null}
      <Audio src={staticFile("audio/maze.opus")} />
    </DarkSlide>
  );
};

export const EnvironmentSequence = {
  durationInFrames: 510,
  Component,
};

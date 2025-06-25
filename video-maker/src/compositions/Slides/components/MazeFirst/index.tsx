import { Audio, staticFile, useCurrentFrame } from "remotion";
import { SeqProps } from "../../../../compositions/Slides/types";
import { TRAINING_MAZE } from "../../../../utils/maze";
import Manifesto from "../../../../paths/manifesto.json";
import { mappingManifest } from "../../../../utils/mappingManifest";
import { DarkSlide } from "../../../../components/Slide";
import Maze from "../../../../components/Maze";
import { Anchor } from "../../../../components/Anchor";
import Statistics from "../../../../components/Maze/components/Statistics";

const FIRST_EPISODE = Manifesto.map(mappingManifest)[0];

const Component = (props: SeqProps) => {
  const frame = useCurrentFrame();

  return (
    <DarkSlide name="Maze First" {...props}>
      <Statistics
        episode={1}
        path={FIRST_EPISODE.path}
        histogram={FIRST_EPISODE.histogram}
      />
      <Maze data={TRAINING_MAZE} path={FIRST_EPISODE.path} />
      {frame - (props.from ?? 0) > 50 ? <Anchor /> : null}
      <Audio src={staticFile("audio/revealing.ogg")} />
    </DarkSlide>
  );
};

export const MazeFirstSequence = {
  durationInFrames: 20 * 30,
  Component,
};

import { ReactNode } from "react";
import { Img, staticFile } from "remotion";
import { Chapter, DarkSlide } from "../../components/Slide";
import { Anchor } from "../../components/Anchor";
import Maze from "../../components/Maze";
import { LastMazeSequence } from "./components/LastMaze";
import { RewardsSequence } from "./components/Rewards";
import { TRAINING_MAZE } from "../../utils/maze";
import { SeqProps } from "./types";
import { MicroMouseSequence } from "./components/MicroMouse";

export const SEQUENCES_SLIDE: Array<{
  durationInFrames: number;
  Component: (props: SeqProps) => ReactNode;
}> = [
  {
    durationInFrames: 20,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Chapter text="Aprendizado por Reforço" subtitle="por Johny W. Alves" />
      </DarkSlide>
    ),
  },
  {
    durationInFrames: 50,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Img src={staticFile("renata.jpg")} alt="" className="w-6xl" />
        <Anchor />
      </DarkSlide>
    ),
  },
  MicroMouseSequence,
  {
    durationInFrames: 60,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Maze data={TRAINING_MAZE} path={[]} />
      </DarkSlide>
    ),
  },
  RewardsSequence,
  LastMazeSequence,
];

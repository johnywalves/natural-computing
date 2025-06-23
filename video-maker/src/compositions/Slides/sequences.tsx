import { ReactNode } from "react";
import { Img, staticFile } from "remotion";
import { Chapter, DarkSlide } from "../../components/Slide";
import { Anchor } from "../../components/Anchor";
import Maze from "../../components/Maze";
import { FirstMazeSequence } from "./components/FirstMaze";
import { LastMazeSequence } from "./components/LastMaze";
import { RewardsSequence } from "./components/Rewards";
import { TRAINING_MAZE } from "../../utils/maze";
import { SeqProps } from "./types";
import { MicroMouseSequence } from "./components/MicroMouse";
import { LoopSequence } from "./components/Loop";
import { VacuumCleaner } from "./components/VacuumCleaner";

export const SEQUENCES_SLIDE: Array<{
  durationInFrames: number;
  Component: (props: SeqProps) => ReactNode;
}> = [
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
  FirstMazeSequence,
  {
    durationInFrames: 50,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Img src={staticFile("bulb.svg")} alt="" className="w-full" />
        <Chapter text="Aprendizado por Reforço" />
        <Anchor />
      </DarkSlide>
    ),
  },
  {
    durationInFrames: 50,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Img src={staticFile("johnywalves.jpg")} alt="" className="w-full" />
        <Anchor />
      </DarkSlide>
    ),
  },
  LoopSequence(),
  LoopSequence("environment"),
  VacuumCleaner,
  {
    durationInFrames: 60,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Maze data={TRAINING_MAZE} path={[]} />
      </DarkSlide>
    ),
  },
  LoopSequence("action"),
  {
    durationInFrames: 50,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Img src={staticFile("go_board.png")} alt="" className="h-full" />
        <Anchor />
      </DarkSlide>
    ),
  },
  LoopSequence("state"),
  LoopSequence("reward"),
  LoopSequence("agent"),
  RewardsSequence,
  LastMazeSequence,
];

import { ReactNode } from "react";
import { Img, staticFile } from "remotion";
import { Chapter, DarkSlide } from "../../components/Slide";
import { Anchor } from "../../components/Anchor";
import { FirstMazeSequence } from "./components/FirstMaze";
import { LastMazeSequence } from "./components/LastMaze";
import { RewardsSequence } from "./components/Rewards";
import { SeqProps } from "./types";
import { MicroMouseSequence } from "./components/MicroMouse";
import { LoopSequence } from "./components/Loop";
import { VacuumCleaner } from "./components/VacuumCleaner";
import { ChallengeSequence } from "./components/Challenge";
import { EnvironmentSequence } from "./components/Environment";
import { DirectionSequence } from "./components/Direction";

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
  ChallengeSequence,
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
  EnvironmentSequence,
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
  DirectionSequence,
  LoopSequence("state"),
  LoopSequence("reward"),
  RewardsSequence,
  LoopSequence("agent"),
  LastMazeSequence,
];

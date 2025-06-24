import { ReactNode } from "react";
import { Audio, Img, staticFile } from "remotion";
import { Chapter, DarkSlide } from "../../components/Slide";
import { Anchor } from "../../components/Anchor";
import { FirstMazeSequence } from "./components/FirstMaze";
import { LastMazeSequence } from "./components/LastMaze";
import { RewardsSequence } from "./components/Rewards";
import { SeqProps } from "./types";
import { MicroMouseSequence } from "./components/MicroMouse";
import { getLoopSequence } from "./components/Loop";
import { VacuumCleaner } from "./components/VacuumCleaner";
import { ChallengeSequence } from "./components/Challenge";
import { EnvironmentSequence } from "./components/Environment";
import { DirectionSequence } from "./components/Direction";

export const SEQUENCES_SLIDE: Array<{
  durationInFrames: number;
  Component: (props: SeqProps) => ReactNode;
}> = [
  {
    durationInFrames: 30,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Img src={staticFile("renata.jpg")} alt="" className="w-6xl" />
      </DarkSlide>
    ),
  },
  {
    durationInFrames: 220,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Img src={staticFile("renata.jpg")} alt="" className="w-6xl" />
        <Anchor />
        <Audio src={staticFile("audio/renata.opus")} />
      </DarkSlide>
    ),
  },
  MicroMouseSequence,
  ChallengeSequence,
  FirstMazeSequence,
  {
    durationInFrames: 320,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Img src={staticFile("bulb.svg")} alt="" className="w-full" />
        <Chapter text="Aprendizado por Reforço" />
        <Anchor />
        <Audio src={staticFile("audio/rl.opus")} />
      </DarkSlide>
    ),
  },
  {
    durationInFrames: 360,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Img src={staticFile("johnywalves.jpg")} alt="" className="w-full" />
        <Anchor />
        <Audio src={staticFile("audio/johny.opus")} />
      </DarkSlide>
    ),
  },
  {
    durationInFrames: 530,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        {getLoopSequence()}
        <Audio src={staticFile("audio/markov.opus")} />
      </DarkSlide>
    ),
  },
  {
    durationInFrames: 50,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>{getLoopSequence("environment")}</DarkSlide>
    ),
  },
  VacuumCleaner,
  EnvironmentSequence,
  {
    durationInFrames: 165,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        {getLoopSequence("action")}
        <Audio src={staticFile("audio/actions.opus")} />
      </DarkSlide>
    ),
  },
  {
    durationInFrames: 140,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Img src={staticFile("go_board.png")} alt="" className="h-full" />
        <Anchor />
        <Audio src={staticFile("audio/go.opus")} />
      </DarkSlide>
    ),
  },
  {
    durationInFrames: 170,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Img src={staticFile("nes.png")} alt="" className="h-full" />
        <Anchor />
        <Audio src={staticFile("audio/nes.opus")} />
      </DarkSlide>
    ),
  },
  DirectionSequence,
  {
    durationInFrames: 310,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        {getLoopSequence("state")}
        <Audio src={staticFile("audio/state.opus")} />
      </DarkSlide>
    ),
  },
  {
    durationInFrames: 50,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>{getLoopSequence("reward")}</DarkSlide>
    ),
  },
  RewardsSequence,
  {
    durationInFrames: 50,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>{getLoopSequence("agent")}</DarkSlide>
    ),
  },
  LastMazeSequence,
];

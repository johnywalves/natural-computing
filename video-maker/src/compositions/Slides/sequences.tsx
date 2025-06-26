import { ReactNode } from "react";
import { Audio, Img, staticFile } from "remotion";
import { DarkSlide } from "../../components/Slide";
import { Anchor } from "../../components/Anchor";
import { MazeFirstSequence } from "./components/MazeFirst";
import { LastMazeSequence } from "./components/LastMaze";
import { RewardsSequence } from "./components/Rewards";
import { SeqProps } from "./types";
import { MicroMouseSequence } from "./components/MicroMouse";
import { getLoopSequence } from "./components/Loop";
import { VacuumCleaner } from "./components/VacuumCleaner";
import { ChallengeSequence } from "./components/Challenge";
import { DirectionSequence } from "./components/Direction";
import { NESSequence } from "./components/NES";
import { RLSequence } from "./components/RL";
import { MazeThirtySequence } from "./components/MazeThirty";
import { BostonDynamicsSequence } from "./components/BostonDynamics";
import { EnvironmentSequence } from "./components/Environment";
import { MazeStateSequence } from "./components/MazeState";
import { LearnWalkSequence } from "./components/LearnWalk";
import { QTableSequence } from "./components/QTable";
import { BookSequence } from "./components/Book";
import { ReferencesSequence } from "./components/References";
import { ThanksSequence } from "./components/Thanks";
import { JohnySequence } from "./components/Johny";
import { GOSequence } from "./components/GO";
import { EquationSequence } from "./components/Equation";
import { BlocksSequence } from "./components/Blocks";
import { QTableZeroSequence } from "./components/QTableZero";
import { MazeHundredSequence } from "./components/MazeHundred";

export const SEQUENCES_SLIDE: Array<{
  durationInFrames: number;
  Component: (props: SeqProps) => ReactNode;
}> = [
  {
    durationInFrames: 30,
    Component: (props: SeqProps) => (
      <DarkSlide name="Opening" {...props}>
        <Img src={staticFile("renata.jpg")} alt="" className="w-6xl" />
      </DarkSlide>
    ),
  },
  {
    durationInFrames: 510,
    Component: (props: SeqProps) => (
      <DarkSlide name="Renata" {...props}>
        <Img src={staticFile("renata.jpg")} alt="" className="w-6xl" />
        <Anchor />
        <Audio volume={2} src={staticFile("audio/renata.ogg")} />
      </DarkSlide>
    ),
  },
  MicroMouseSequence,
  ChallengeSequence,
  MazeFirstSequence,
  RLSequence,
  JohnySequence,
  {
    durationInFrames: 170,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        {getLoopSequence()}
        <Audio src={staticFile("audio/markov.ogg")} />
      </DarkSlide>
    ),
  },
  {
    durationInFrames: 700,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        {getLoopSequence("environment")}
        <Audio src={staticFile("audio/environment.ogg")} />
      </DarkSlide>
    ),
  },
  VacuumCleaner,
  EnvironmentSequence,
  MazeThirtySequence,
  {
    durationInFrames: 190,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        {getLoopSequence("action")}
        <Audio src={staticFile("audio/actions.ogg")} />
      </DarkSlide>
    ),
  },
  GOSequence,
  NESSequence,
  DirectionSequence,
  {
    durationInFrames: 320,
    Component: (props: SeqProps) => (
      <DarkSlide name="State" {...props}>
        {getLoopSequence("state")}
        <Audio src={staticFile("audio/state.ogg")} />
      </DarkSlide>
    ),
  },
  LearnWalkSequence,
  BostonDynamicsSequence,
  MazeStateSequence,
  {
    durationInFrames: 180,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        {getLoopSequence("reward")}
        <Audio src={staticFile("audio/reward.ogg")} />
      </DarkSlide>
    ),
  },
  RewardsSequence,
  {
    durationInFrames: 480,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        {getLoopSequence("agent")}
        <Audio src={staticFile("audio/agent.ogg")} />
      </DarkSlide>
    ),
  },
  QTableZeroSequence,
  MazeHundredSequence,
  QTableSequence,
  EquationSequence,
  BlocksSequence,
  LastMazeSequence,
  BookSequence,
  ReferencesSequence,
  ThanksSequence,
];

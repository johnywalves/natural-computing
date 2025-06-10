import { ReactNode } from "react";
import { Img, staticFile } from "remotion";
import { Chapter, DarkSlide, LightSlide } from "../../components/Slide";
import { Anchor } from "../../components/Anchor";
import { LastMazeSequence } from "./components/LastMaze";
import { SeqProps } from "./types";

export const SEQUENCES_SLIDE: Array<{
  durationInFrames: number;
  Component: (props: SeqProps) => ReactNode;
}> = [
  {
    durationInFrames: 20,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Chapter text="Aprendizado por Reforço" />
      </DarkSlide>
    ),
  },
  {
    durationInFrames: 20,
    Component: (props: SeqProps) => (
      <DarkSlide {...props}>
        <Chapter text="Aprendizado por Reforço" subtitle="por Johny W. Alves" />
        <Anchor />
      </DarkSlide>
    ),
  },
  {
    durationInFrames: 50,
    Component: (props: SeqProps) => (
      <LightSlide {...props}>
        <Img src={staticFile("renata.jpg")} alt="" className="w-5xl" />
        <Anchor />
      </LightSlide>
    ),
  },
  LastMazeSequence,
];

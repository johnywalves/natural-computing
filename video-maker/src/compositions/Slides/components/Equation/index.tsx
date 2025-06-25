import { Audio, Img, staticFile } from "remotion";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";

export const EquationSequence = {
  durationInFrames: 140,
  Component: (props: SeqProps) => (
    <DarkSlide name="Equation" {...props}>
      <Img src={staticFile("go_board.png")} alt="" className="h-full" />
      <Anchor />
      <Audio src={staticFile("audio/go.opus")} />
    </DarkSlide>
  ),
};

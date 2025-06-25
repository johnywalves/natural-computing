import { Audio, Img, staticFile } from "remotion";
import { Chapter, DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";

export const RLSequence = {
  durationInFrames: 320,
  Component: (props: SeqProps) => (
    <DarkSlide name="RL" {...props}>
      <Img src={staticFile("bulb.svg")} alt="" className="w-full" />
      <Chapter text="Aprendizado por Reforço" />
      <Anchor />
      <Audio src={staticFile("audio/rl.opus")} />
    </DarkSlide>
  ),
};

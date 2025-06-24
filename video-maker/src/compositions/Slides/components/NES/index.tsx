import { Audio, Img, staticFile } from "remotion";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";

export const NESSequence = {
  durationInFrames: 170,
  Component: (props: SeqProps) => (
    <DarkSlide {...props}>
      <Img src={staticFile("nes.png")} alt="" className="h-[50%]" />
      <Anchor />
      <Audio src={staticFile("audio/nes.opus")} />
    </DarkSlide>
  ),
};

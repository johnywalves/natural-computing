import { Audio, Img, staticFile } from "remotion";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";

export const NESSequence = {
  durationInFrames: 300,
  Component: (props: SeqProps) => (
    <DarkSlide name="NES" {...props}>
      <Img src={staticFile("nes.png")} alt="" className="h-[50%]" />
      <Anchor />
      <Audio src={staticFile("audio/nes.ogg")} />
    </DarkSlide>
  ),
};

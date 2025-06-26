import { Audio, Img, staticFile } from "remotion";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";

export const CulturalSequence = {
  durationInFrames: 650,
  Component: (props: SeqProps) => (
    <DarkSlide name="Cultural" {...props}>
      <Img src={staticFile("alpha_go.jpg")} alt="" className="h-[95%]" />
      <Anchor />
      <Audio src={staticFile("audio/cultural.ogg")} />
    </DarkSlide>
  ),
};

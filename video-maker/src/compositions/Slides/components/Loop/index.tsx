import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { TRAINING_MAZE } from "../../../../utils/maze";
import Maze from "../../../../components/Maze";
import { Img, staticFile } from "remotion";

const Component = (props: SeqProps) => {
  return (
    <DarkSlide {...props}>
      <div className=" relative w-[30rem] h-[30rem]">
        <Maze data={TRAINING_MAZE} path={[]} />
      </div>

      <Img src={staticFile("renata_square.jpg")} alt="" className="w-[30rem]" />

      <Anchor />
    </DarkSlide>
  );
};

export const LoopSequence = {
  durationInFrames: 270,
  Component,
};

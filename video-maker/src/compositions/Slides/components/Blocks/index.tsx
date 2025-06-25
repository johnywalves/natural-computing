import { Audio, staticFile } from "remotion";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import Block from "../../../../components/Maze/components/Block";

const BlockRender = ({ model }: { model: number }) => (
  <Block
    x={0}
    y={0}
    mouse={0}
    path={0}
    model={model}
    revealModel={true}
    revealPosition={false}
  />
);

export const BlocksSequence = {
  durationInFrames: 140,
  Component: (props: SeqProps) => (
    <DarkSlide name="Blocks" {...props}>
      <div className="absolute left-[-50%] top-[-50%] w-[200%] h-[30rem] flex align-center justify-center">
        <BlockRender model={5} />
      </div>
      <Anchor />
    </DarkSlide>
  ),
};

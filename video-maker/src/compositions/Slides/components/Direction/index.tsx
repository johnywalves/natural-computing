import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { Audio, staticFile, useCurrentFrame } from "remotion";
import { ReactNode } from "react";

const WrapperItem = ({
  relativeFrame,
  moment,
  children,
}: {
  relativeFrame: number;
  moment: number;
  children: ReactNode;
}) => {
  return (
    <div
      className="w-72 h-72 flex items-center justify-center"
      style={{ opacity: relativeFrame > moment ? 1 : 0 }}
    >
      {children}
    </div>
  );
};

const Component = (props: SeqProps) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - (props.from ?? 0);

  return (
    <DarkSlide name="Directions" {...props}>
      <div className="grid grid-cols-2 gap-32">
        <WrapperItem relativeFrame={relativeFrame} moment={100}>
          <div className="arrow" />
        </WrapperItem>

        <WrapperItem relativeFrame={relativeFrame} moment={120}>
          <div className="arrow south" />
        </WrapperItem>

        <WrapperItem relativeFrame={relativeFrame} moment={142}>
          <div className="arrow east" />
        </WrapperItem>

        <WrapperItem relativeFrame={relativeFrame} moment={170}>
          <div className="arrow west" />
        </WrapperItem>
      </div>
      <Anchor />
      <Audio src={staticFile("audio/directions.ogg")} />
    </DarkSlide>
  );
};

export const DirectionSequence = {
  durationInFrames: 280,
  Component,
};

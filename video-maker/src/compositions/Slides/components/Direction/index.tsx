import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { useCurrentFrame } from "remotion";
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
      className="w-72 h-72 bg-red-600"
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
    <DarkSlide {...props}>
      <div className="grid grid-cols-2 gap-24">
        <WrapperItem relativeFrame={relativeFrame} moment={0}>
          <></>
        </WrapperItem>

        <WrapperItem relativeFrame={relativeFrame} moment={30}>
          <></>
        </WrapperItem>

        <WrapperItem relativeFrame={relativeFrame} moment={60}>
          <></>
        </WrapperItem>

        <WrapperItem relativeFrame={relativeFrame} moment={90}>
          <></>
        </WrapperItem>
      </div>
      <Anchor />
    </DarkSlide>
  );
};

export const DirectionSequence = {
  durationInFrames: 120,
  Component,
};

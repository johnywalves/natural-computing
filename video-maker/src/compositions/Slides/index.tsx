import { ReactNode } from "react";
import { Chapter, DarkSlide, LightSlide } from "../../components/Slide";
import { Anchor } from "../../components/Anchor";
import { Img, SequenceProps, staticFile } from "remotion";

type SeqProps = SequenceProps & React.RefAttributes<HTMLDivElement>;

const SEQUENCES: Array<{
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
];

let prevFrom = 0;

const ArrangedSequences = SEQUENCES.map(({ durationInFrames, ...rest }) => {
  const from = prevFrom;
  prevFrom = prevFrom + durationInFrames;

  return {
    durationInFrames,
    from,
    ...rest,
  };
});

export const SlidesComposition = () => {
  return (
    <>
      {ArrangedSequences.map(({ Component, ...rest }) => (
        <Component {...rest} />
      ))}
    </>
  );
};

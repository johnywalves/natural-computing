import { SEQUENCES_SLIDE } from "./sequences";

let prevFrom = 0;

const ArrangedSequences = SEQUENCES_SLIDE.map(
  ({ durationInFrames, ...rest }) => {
    const from = prevFrom;
    prevFrom = prevFrom + durationInFrames;

    return {
      durationInFrames,
      from,
      ...rest,
    };
  },
);

export const SlidesComposition = () => {
  return (
    <>
      {ArrangedSequences.map(({ Component, ...rest }) => (
        <Component {...rest}>
          <></>
        </Component>
      ))}
    </>
  );
};

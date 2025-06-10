import { AbsoluteFill, Sequence, SequenceProps } from "remotion";
import { TEXT_SLIDE } from "../../constants/colors";
import { ReactNode } from "react";

const textNeonStyle = (color: string) => ({
  color,
  textShadow: `0 0 16px ${color}, 0 0 32px ${color}80, 0 0 64px ${color}80`,
});

export const Chapter = ({
  text,
  subtitle,
}: {
  text: string;
  subtitle?: string;
}) => (
  <div className="flex flex-col gap-10">
    <h1
      className="text-[19vh] font-semibold item self-start"
      style={textNeonStyle(TEXT_SLIDE)}
    >
      {text}
    </h1>

    {subtitle ? (
      <p className="text-5xl self-end" style={textNeonStyle(TEXT_SLIDE)}>
        {subtitle}
      </p>
    ) : null}
  </div>
);

export const DarkSlide = ({
  children,
  ...rest
}: SequenceProps &
  React.RefAttributes<HTMLDivElement> & { children?: ReactNode }) => (
  <Sequence {...rest}>
    <AbsoluteFill className="bg-gray-800 flex flex-row items-center justify-center p-18 relative gap-12">
      {children}
    </AbsoluteFill>
  </Sequence>
);

export const LightSlide = ({
  children,
  ...rest
}: SequenceProps &
  React.RefAttributes<HTMLDivElement> & { children?: ReactNode }) => (
  <Sequence {...rest}>
    <AbsoluteFill className="bg-amber-200 flex flex-row items-center justify-center p-18 relative gap-12">
      {children}
    </AbsoluteFill>
  </Sequence>
);

import { AbsoluteFill, Sequence, SequenceProps } from "remotion";
import { TEXT_SLIDE } from "../../constants/colors";
import { CSSProperties, ReactNode } from "react";
import { textNeonStyle } from "../../utils/stylesFunctions";

export const Chapter = ({
  text,
  subtitle,
}: {
  text: string;
  subtitle?: string;
}) => (
  <div className="flex flex-col gap-10 p-15">
    <h1
      className="text-[13.5rem] text-center font-semibold item self-start"
      style={textNeonStyle(TEXT_SLIDE)}
    >
      {text}
    </h1>

    {subtitle ? (
      <p className="text-6xl self-end" style={textNeonStyle(TEXT_SLIDE)}>
        {subtitle}
      </p>
    ) : null}
  </div>
);

export const DarkSlide = ({
  children,
  style,
  ...rest
}: SequenceProps &
  React.RefAttributes<HTMLDivElement> & {
    style?: CSSProperties;
    children?: ReactNode;
  }) => (
  <Sequence {...rest}>
    <AbsoluteFill
      className="bg-gray-800 flex flex-row items-center justify-center p-18 gap-12"
      style={style}
    >
      {children}
    </AbsoluteFill>
  </Sequence>
);

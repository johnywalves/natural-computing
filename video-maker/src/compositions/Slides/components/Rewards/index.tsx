import { ReactNode } from "react";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import Neon from "../../../../components/Neon";
import Mouse from "../../../../components/Mouse";
import { Audio, staticFile, useCurrentFrame } from "remotion";

const Criteria = ({
  points,
  title,
  opacity,
  children,
}: {
  points: string;
  title: string;
  opacity: number;
  children: ReactNode;
}) => {
  return (
    <div
      className="grid gap-10"
      style={{ gridTemplateColumns: "1fr 2fr", opacity }}
    >
      {children}
      <div className="flex flex-col gap-5 justify-center items-center text-gray-100">
        <p className="text-7xl font-bold">
          {points} ponto{Math.abs(Number(points)) !== 1 ? "s" : ""}
        </p>
        <p className="text-4xl font-light">{title}</p>
      </div>
    </div>
  );
};

const Wall = () => (
  <div className="h-full w-3">
    <Neon />
  </div>
);

const Line = ({ className = "" }: { className?: string }) => (
  <div className={`h-3 ${className}`}>
    <Neon />
  </div>
);

const Movement = ({
  className,
  delay,
  children,
}: {
  className?: string;
  delay: number;
  children: ReactNode;
}) => (
  <div
    className={`animate-run flex flex-col h-full w-full bg-gray-800 ${className}`}
    style={{ animationDelay: `${delay}s`, gridArea: "1/1" }}
  >
    {children}
  </div>
);

const MouseContent = ({ className }: { className: string }) => (
  <Mouse
    opacity={1}
    className={`absolute left-[50%] top-[50%] ${className}`}
    style={{
      width: "4rem",
      height: "4rem",
      transform: "translate(-50%, -50%)",
    }}
  />
);

const Crash = () => (
  <div className="flex flex-row justify-between w-[16rem] h-[16rem] py-6 px-12">
    <Wall />
    <div className="h-full w-full relative">
      <MouseContent className="animate-crash" />
    </div>
    <Wall />
  </div>
);

const Pass = () => (
  <div className="flex flex-row justify-between w-[15rem] h-[15rem] pl-3 py-6">
    <div className="grid h-full w-[4.5rem] overflow-hidden">
      <Movement className="items-end" delay={1.32}>
        <Neon style={{ width: "0.75rem" }} />
      </Movement>

      <Movement className="items-end" delay={0.66}>
        <Neon style={{ height: "calc(100% - 0.75rem)", width: "0.75rem" }} />
        <Neon style={{ height: "0.75rem" }} />
      </Movement>

      <Movement className="items-end" delay={0}>
        <Neon style={{ width: "0.75rem" }} />
      </Movement>
    </div>

    <div className="h-full w-full relative">
      <MouseContent className="animate-pass" />
    </div>

    <div className="grid h-full w-[4.5rem] overflow-hidden">
      <Movement className="animate-run justify-end" delay={1.32}>
        <Neon style={{ height: "0.75rem" }} />
        <Neon style={{ height: "50%", width: "0.75rem" }} />
      </Movement>

      <Movement className="animate-run" delay={0.66}>
        <Neon style={{ height: "50%", width: "0.75rem" }} />
        <Neon style={{ height: "0.75rem" }} />
      </Movement>

      <Movement className="animate-run" delay={0}>
        <Neon style={{ width: "0.75rem" }} />
      </Movement>
    </div>
  </div>
);

const Finish = () => (
  <div className="overflow-hidden relative flex flex-col justify-between w-[16rem] h-[16rem] p-6">
    <Line className="w-[50%]" />
    <div className="h-[12rem] flex flex-row justify-between">
      <Wall />
      <Wall />
    </div>
    <Line className="w-full" />

    <MouseContent className="animate-finish" />
  </div>
);

const Component = (props: SeqProps) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - (props.from ?? 0);

  return (
    <DarkSlide name="Rewards" {...props}>
      <div className="flex flex-col gap-12">
        <Criteria
          points="-1"
          title="Bater na parede"
          opacity={relativeFrame > 140 ? 1 : 0}
        >
          <Crash />
        </Criteria>

        <Criteria
          points="-0.1"
          title="Mover caminho livre"
          opacity={relativeFrame > 520 ? 1 : 0}
        >
          <Pass />
        </Criteria>

        <Criteria
          points="+100"
          title="Chegar ao centro"
          opacity={relativeFrame > 1000 ? 1 : 0}
        >
          <Finish />
        </Criteria>
      </div>
      <Anchor />
      <Audio src={staticFile("audio/rewardsteps.ogg")} />
    </DarkSlide>
  );
};

export const RewardsSequence = {
  durationInFrames: 1650,
  Component,
};

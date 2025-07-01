import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import Neon from "../../../../components/Neon";
import { BINARY_MODEL_BORDER } from "../../../../constants/models";
import { Audio, staticFile } from "remotion";

const models = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const BlockRender = ({
  model,
  showNumber,
}: {
  model: number;
  showNumber?: boolean;
}) => {
  const binaries = BINARY_MODEL_BORDER[model];

  return (
    <div className="flex flex-col w-32 h-36 justify-between gap-0">
      <div className="h-2 w-full">{binaries[0] ? <Neon /> : null}</div>

      <div className="flex flex-row w-32 h-32 items-center justify-between">
        <div className="w-2 h-full">{binaries[3] ? <Neon /> : null}</div>
        {showNumber ? (
          <p className="text-[#eeeeee] text-4xl ">{model}</p>
        ) : null}
        <div className="w-2 h-full">{binaries[1] ? <Neon /> : null}</div>
      </div>

      <div className="h-2 w-full">{binaries[2] ? <Neon /> : null}</div>
    </div>
  );
};

export const BlocksSequence = {
  durationInFrames: 640,
  Component: (props: SeqProps) => (
    <DarkSlide name="Blocks" {...props}>
      <div className="absolute w-[60rem] h-[60rem] grid grid-cols-4 gap-8">
        {models.map((model) => (
          <BlockRender key={model} model={model} showNumber />
        ))}
      </div>
      <Anchor />
      <Audio src={staticFile("audio/blocks.ogg")} />
    </DarkSlide>
  ),
};

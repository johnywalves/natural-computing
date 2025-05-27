import { AbsoluteFill } from "remotion";
import { MicroMouseTrainingProps } from "./type";
import Statistics from "../../../../components/Maze/components/Statistics";
import Maze from "../../../../components/Maze";

export const MicroMouseTraining = ({
  episode,
  data,
  path,
}: MicroMouseTrainingProps) => {
  return (
    <AbsoluteFill className="bg-gray-800 flex flex-row items-start justify-between p-8 relative gap-12">
      <Statistics episode={episode} path={path} />
      <Maze data={data} path={path} />
    </AbsoluteFill>
  );
};

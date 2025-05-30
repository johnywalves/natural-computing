import { HistogramItem } from "../../../../types/HistogramItem";
import { MazeProps } from "../../../../components/Maze/components/types";

export type MicroMouseTrainingProps = {
  episode: number;
  histogram: Array<HistogramItem>;
} & MazeProps;

import { HistogramItem } from "../../../../types/HistogramItem";
import { PathPros } from "../types";

export type StatisticsProps = {
  episode: number;
  path: Array<PathPros>;
  histogram: Array<HistogramItem>;
};

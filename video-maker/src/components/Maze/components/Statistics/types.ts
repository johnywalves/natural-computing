import { HistogramItem } from "../../../../types/HistogramItem";

export type StatisticsProps = {
  episode: number;
  path: Array<Array<number>>;
  histogram: Array<HistogramItem>;
};

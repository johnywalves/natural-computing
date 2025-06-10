import { HistogramItem } from "../types/HistogramItem";
import { MAZE_ADDITIONAL_FRAME } from "../constants/config";
import { getStatsPath } from "./getStatsPath";

type mappingManifestParam = {
  episode: number;
  path: Array<Array<number>>;
};

let prevFrom = 0;
const history: Array<HistogramItem> = [];

export const mappingManifestSkipFive = ({
  episode,
  path,
}: mappingManifestParam) => {
  const statsPath = getStatsPath(path, 5);

  const from = prevFrom;
  const histogram = [...history];
  const duration = statsPath.length;

  prevFrom = prevFrom + duration + MAZE_ADDITIONAL_FRAME;
  history.push({ duration });

  return {
    episode,
    path: statsPath,
    histogram,
    duration: duration + MAZE_ADDITIONAL_FRAME,
    from,
  };
};

export const mappingManifest = ({ episode, path }: mappingManifestParam) => {
  const statsPath = getStatsPath(path);

  const from = prevFrom;
  const histogram = [...history];
  const duration = statsPath.length;

  prevFrom = prevFrom + duration + MAZE_ADDITIONAL_FRAME;
  history.push({ duration });

  return {
    episode,
    path: statsPath,
    histogram,
    duration: duration + MAZE_ADDITIONAL_FRAME,
    from,
  };
};

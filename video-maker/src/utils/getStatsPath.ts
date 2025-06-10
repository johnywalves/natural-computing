export const getStatsPath = (path: Array<Array<number>>, skip: number = 1) => {
  let count = 0;
  let stopCount = 0;

  return path
    .map((pos, idx) => {
      const [x, y] = pos;

      count = count + 1;

      const hasPrev = idx !== 0;
      const isStop =
        hasPrev && path[idx - 1][0] === x && path[idx - 1][1] === y;
      if (isStop) {
        stopCount = stopCount + 1;
      }

      return { x, y, count, stopCount };
    })
    .filter((_, idx) => idx % skip === 0);
};

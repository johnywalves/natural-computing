export const getStatsPath = (path: Array<Array<number>>) => {
  let count = 0;
  return path
    .map((pos) => {
      const [x, y] = pos;
      count = count + 1;
      return { x, y, count };
    })
    .filter((_, idx) => idx % 5 === 0);
};

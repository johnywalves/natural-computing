import { useCurrentFrame } from "remotion";

export const useRelativeFrame = (from: number = 0) => {
  const frame = useCurrentFrame();
  return frame - (from ?? 0);
};

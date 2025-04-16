import { AbsoluteFill } from "remotion";
import Maze from "./components/Maze";

export const MyComposition = () => {
  return (
    <AbsoluteFill className="bg-white flex items-center justify-center p-8">
      <Maze />
    </AbsoluteFill>
  );
};

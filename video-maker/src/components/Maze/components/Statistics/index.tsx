import { useCurrentFrame } from "remotion";
import { StatisticsProps } from "./types";

const Statistics = ({ path }: StatisticsProps) => {
  const frame = useCurrentFrame();

  const successInSteps = path.length;

  return (
    <div className="text-white">
      <p>
        <span className="font-light">Passos:</span> <strong>{frame + 1}</strong>
      </p>
      <p>
        <span className="font-light">Sucesso:</span>{" "}
        <strong>{successInSteps}</strong>
      </p>
    </div>
  );
};

export default Statistics;

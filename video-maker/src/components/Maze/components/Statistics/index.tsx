import { useCurrentFrame } from "remotion";
import { StatisticsProps } from "./types";

const Info = ({ label, value }: { label: string; value: number }) => (
  <p className="text-4xl">
    <span className="font-light">{label}:</span>{" "}
    <strong>{String(value)}</strong>
  </p>
);

const Statistics = ({ episode, path }: StatisticsProps) => {
  const frame = useCurrentFrame();
  const successInSteps = path.length;

  return (
    <div className="text-white">
      <Info label="Episódio" value={episode} />
      <Info label="Passos" value={frame + 1} />
      <Info label="Sucesso" value={successInSteps} />
    </div>
  );
};

export default Statistics;

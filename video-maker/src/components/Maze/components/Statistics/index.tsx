import { useCurrentFrame } from "remotion";
import { StatisticsProps } from "./types";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
    <div className="flex flex-col justify-between">
      <div className="text-white">
        <Info label="Episódio" value={episode} />
        <Info label="Passos" value={frame + 1} />
        <Info label="Sucesso" value={successInSteps} />
      </div>

      {/* <LineChart
        width={250}
        height={500}
        data={[{ length: 1500 }, { length: 800 }]}
      >
        <XAxis />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line dataKey="length" stroke="#8ae013" />
      </LineChart> */}
    </div>
  );
};

export default Statistics;

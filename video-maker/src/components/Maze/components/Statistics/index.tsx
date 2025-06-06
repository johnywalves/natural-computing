import { useCurrentFrame } from "remotion";
import { StatisticsProps } from "./types";
import { CartesianGrid, Line, LineChart } from "recharts";
import { LINE_STATISTICS } from "../../../../constants/colors";

const Info = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-row justify-between text-4xl">
    <p className="font-light">{label}:</p>{" "}
    <p>
      <strong>{String(value)}</strong>
    </p>
  </div>
);

const Statistics = ({ episode, path, histogram }: StatisticsProps) => {
  const frame = useCurrentFrame();
  const list = path.slice(0, frame + 1);
  const currentIndex = Math.min(list.length - 1, frame);
  const currentStep = list[currentIndex];
  const data =
    episode !== 1 ? [...histogram, { duration: currentStep.count }] : [];

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="text-gray-100">
        <Info label="Episódio" value={episode} />
        <Info label="Passos" value={currentStep.count} />
        {list.length <= frame ? (
          <Info label="Sucesso" value={currentStep.count} />
        ) : null}
      </div>

      <LineChart width={300} height={500} data={data}>
        <CartesianGrid stroke="#eee" strokeDasharray="5" />
        <Line
          type="monotone"
          dataKey="duration"
          stroke={LINE_STATISTICS}
          strokeWidth={5}
        />
      </LineChart>
    </div>
  );
};

export default Statistics;

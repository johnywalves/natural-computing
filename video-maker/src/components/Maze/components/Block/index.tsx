import { BLOCK_HEIGHT, BLOCK_WIDTH } from "../../../../constants/sizes";
import Path from "../../../Path";
import Mouse from "../../../Mouse";

const Block = ({
  model,
  mouse,
  path,
}: {
  model?: number;
  mouse: number;
  path: number;
}) => {
  return (
    <div
      className={`flex justify-center items-center font-bold uppercase ${BLOCK_WIDTH} ${BLOCK_HEIGHT}`}
    >
      {model ? model.toString(16) : null}
      {mouse ? <Mouse opacity={mouse} /> : null}
      {path ? <Path opacity={path} /> : null}
    </div>
  );
};

export default Block;

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
      className="flex justify-center items-center font-bold uppercase text-white "
      style={{ ...BLOCK_WIDTH, ...BLOCK_HEIGHT }}
    >
      {model ? (
        model.toString(10)
      ) : (
        <>
          {mouse ? (
            <Mouse opacity={mouse} />
          ) : (
            <>{path ? <Path opacity={path} /> : null}</>
          )}
        </>
      )}
    </div>
  );
};

export default Block;

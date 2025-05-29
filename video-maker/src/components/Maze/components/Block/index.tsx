import { BLOCK_HEIGHT, BLOCK_WIDTH } from "../../../../constants/sizes";
import Path from "../../../Path";
import Mouse from "../../../Mouse";
import { BlockProps } from "./types";

const Block = ({
  x,
  y,
  model,
  mouse,
  path,
  revealModel = false,
  revealPosition = false,
}: BlockProps) => {
  return (
    <div
      className="flex justify-center items-center font-bold uppercase text-white"
      style={{ ...BLOCK_WIDTH, ...BLOCK_HEIGHT }}
    >
      {revealPosition ? (
        <>
          {x}, {y}
        </>
      ) : (
        <>
          {model && revealModel ? (
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
        </>
      )}
    </div>
  );
};

export default Block;

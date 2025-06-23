import { CSSProperties } from "react";
import { ArrowProps } from "./types";

const styleCenter: CSSProperties = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const Arrow = ({ height, width, text, style, isRight }: ArrowProps) => {
  const styleArrow = {
    ...styleCenter,
    transform: `${styleCenter.transform} ${isRight ? "rotate(180deg)" : ""}`,
  };
  const styleText = {
    ...styleCenter,
    transform: `${styleCenter.transform} ${isRight ? "translateX(-3rem)" : "translateX(2rem)"}`,
  };

  return (
    <div className="relative" style={{ ...style, height, width }}>
      <svg
        version="1.1"
        viewBox="0 0 512 256"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full absolute"
        style={styleArrow}
      >
        <g fill="#fff" strokeLinecap="round" strokeLinejoin="round">
          <rect
            x="189.14"
            y="70.971"
            width="319.71"
            height="114.06"
            strokeWidth="8.4028"
          />
          <path
            transform="matrix(1.538 -.015839 .015839 1.538 -100.15 -149.23)"
            d="m196.28 258.64-131.5-77.685 133.03-75.042z"
          />
        </g>
      </svg>
      <p className="absolute text-4xl font-bold" style={styleText}>
        {text}
      </p>
    </div>
  );
};
